import { HistoricalDataPoint, IMarketDataProvider, MarketQuote, MarketSearchItem } from '@/types';
import { INDIAN_STOCKS } from '../data/indianStocks';

interface YahooCrumbSession {
  cookie: string;
  crumb: string;
  expiresAt: number;
}

export class YahooFinanceAdapter implements IMarketDataProvider {
  public readonly providerName = 'Yahoo Finance (Unofficial / Delayed)';
  private crumbSession: YahooCrumbSession | null = null;
  private isFetchingSession = false;

  private async getCrumbSession(): Promise<YahooCrumbSession | null> {
    if (this.crumbSession && Date.now() < this.crumbSession.expiresAt) {
      return this.crumbSession;
    }

    if (this.isFetchingSession) {
      // Avoid parallel stampede
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (this.crumbSession) return this.crumbSession;
    }

    this.isFetchingSession = true;
    try {
      const headers = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      };

      const cookieRes = await fetch('https://fc.yahoo.com', {
        headers,
        cache: 'no-store',
      });
      const setCookieHeader = cookieRes.headers.get('set-cookie');

      if (!setCookieHeader) {
        this.isFetchingSession = false;
        return null;
      }

      // Extract cookie
      const cookie = setCookieHeader.split(';')[0];

      const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
        headers: {
          ...headers,
          Cookie: cookie,
        },
        cache: 'no-store',
      });

      if (!crumbRes.ok) {
        this.isFetchingSession = false;
        return null;
      }

      const crumb = await crumbRes.text();
      if (!crumb || crumb.includes('Too Many') || crumb.length > 50) {
        this.isFetchingSession = false;
        return null;
      }

      this.crumbSession = {
        cookie,
        crumb,
        expiresAt: Date.now() + 1000 * 60 * 60 * 4, // 4 hours validity
      };

      this.isFetchingSession = false;
      return this.crumbSession;
    } catch {
      this.isFetchingSession = false;
      return null;
    }
  }

  /**
   * Search Indian equities on NSE and BSE
   */
  async searchSymbols(query: string): Promise<MarketSearchItem[]> {
    const q = query.trim().toUpperCase();
    if (!q) return [];

    const results: MarketSearchItem[] = [];
    const seenSymbols = new Set<string>();

    // 1. Fast match against curated Indian stocks
    for (const item of INDIAN_STOCKS) {
      if (
        item.cleanSymbol.includes(q) ||
        item.symbol.includes(q) ||
        item.name.toUpperCase().includes(q)
      ) {
        results.push({
          symbol: item.symbol,
          name: item.name,
          exchange: item.exchange,
        });
        seenSymbols.add(item.symbol);
      }
    }

    // 2. Query Yahoo Finance Search API for broader coverage
    try {
      const searchUrl = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(
        query
      )}&quotesCount=10&newsCount=0`;

      const res = await fetch(searchUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const data = await res.json();
        const quotes = data.quotes || [];

        for (const item of quotes) {
          const sym = item.symbol as string;
          if (!sym) continue;

          // Filter strictly for Indian equities
          const isNSE = sym.endsWith('.NS') || item.exchDisp === 'NSE';
          const isBSE = sym.endsWith('.BO') || item.exchDisp === 'BSE' || item.exchDisp === 'Bombay';

          if ((isNSE || isBSE) && !seenSymbols.has(sym)) {
            results.push({
              symbol: sym,
              name: item.longname || item.shortname || sym,
              exchange: isBSE ? 'BSE' : 'NSE',
            });
            seenSymbols.add(sym);
          }
        }
      }
    } catch (err) {
      console.warn('Yahoo search lookup error:', err);
    }

    return results.slice(0, 8);
  }

  /**
   * Fetch quote and fundamental metrics for a symbol
   */
  async getQuote(rawSymbol: string): Promise<MarketQuote | null> {
    if (!rawSymbol) return null;

    let symbol = rawSymbol.trim().toUpperCase();
    // Default to NSE (.NS) if no exchange suffix provided
    if (!symbol.includes('.')) {
      symbol = `${symbol}.NS`;
    }

    const exchange: 'NSE' | 'BSE' = symbol.endsWith('.BO') ? 'BSE' : 'NSE';
    const metadata = INDIAN_STOCKS.find(
      (s) => s.symbol === symbol || s.cleanSymbol === symbol.replace('.NS', '').replace('.BO', '')
    );

    // Try fetching with crumb for comprehensive fundamentals
    const session = await this.getCrumbSession();
    if (session) {
      try {
        const quoteUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(
          symbol
        )}&crumb=${encodeURIComponent(session.crumb)}`;

        const quoteRes = await fetch(quoteUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
            Cookie: session.cookie,
          },
          next: { revalidate: 30 }, // 30s cache
        });

        if (quoteRes.ok) {
          const quoteData = await quoteRes.json();
          const q = quoteData.quoteResponse?.result?.[0];

          if (q) {
            return {
              symbol: q.symbol || symbol,
              name: q.longName || q.shortName || metadata?.name || symbol,
              exchange,
              price: q.regularMarketPrice,
              change: q.regularMarketChange,
              changePercent: q.regularMarketChangePercent,
              currency: 'INR',
              isDelayed: true,
              dataSourceNotice:
                'Market data provided via Yahoo Finance delayed feed. Unofficial and delayed by 15 mins. For educational research only.',
              lastUpdated: new Date(
                (q.regularMarketTime || Date.now() / 1000) * 1000
              ).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
              marketCap: q.marketCap,
              peRatio: q.trailingPE || q.forwardPE,
              pbRatio: q.priceToBook,
              week52High: q.fiftyTwoWeekHigh,
              week52Low: q.fiftyTwoWeekLow,
              dayHigh: q.regularMarketDayHigh,
              dayLow: q.regularMarketDayLow,
              volume: q.regularMarketVolume,
              dividendYield: q.trailingAnnualDividendYield
                ? q.trailingAnnualDividendYield * 100
                : undefined,
              sector: metadata?.sector,
              industry: metadata?.industry,
              summary: metadata?.summary,
            };
          }
        }
      } catch (err) {
        console.warn('Quote fetch with crumb failed, falling back to chart API:', err);
      }
    }

    // Resilient Fallback: v8 Chart API (no crumb required)
    try {
      const chartUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        symbol
      )}?interval=1d&range=1mo`;

      const chartRes = await fetch(chartUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        },
        next: { revalidate: 30 },
      });

      if (chartRes.ok) {
        const chartData = await chartRes.json();
        const meta = chartData.chart?.result?.[0]?.meta;

        if (meta) {
          const prevClose = meta.chartPreviousClose || meta.regularMarketPrice;
          const currentPrice = meta.regularMarketPrice;
          const change = currentPrice - prevClose;
          const changePercent = prevClose ? (change / prevClose) * 100 : 0;

          return {
            symbol: meta.symbol || symbol,
            name: meta.longName || meta.shortName || metadata?.name || symbol,
            exchange,
            price: currentPrice,
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
            currency: 'INR',
            isDelayed: true,
            dataSourceNotice:
              'Market data provided via Yahoo Finance delayed feed. Unofficial and delayed by 15 mins. For educational research only.',
            lastUpdated: new Date(
              (meta.regularMarketTime || Date.now() / 1000) * 1000
            ).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            week52High: meta.fiftyTwoWeekHigh,
            week52Low: meta.fiftyTwoWeekLow,
            dayHigh: meta.regularMarketDayHigh,
            dayLow: meta.regularMarketDayLow,
            volume: meta.regularMarketVolume,
            sector: metadata?.sector,
            industry: metadata?.industry,
            summary: metadata?.summary,
          };
        }
      }
    } catch (err) {
      console.error('Yahoo chart fallback failed:', err);
    }

    return null;
  }

  /**
   * Fetch historical OHLCV chart bars
   */
  async getHistoricalChart(rawSymbol: string, range: string = '1mo'): Promise<HistoricalDataPoint[]> {
    if (!rawSymbol) return [];

    let symbol = rawSymbol.trim().toUpperCase();
    if (!symbol.includes('.')) {
      symbol = `${symbol}.NS`;
    }

    const intervalMap: Record<string, string> = {
      '1d': '5m',
      '5d': '15m',
      '1mo': '1d',
      '6mo': '1d',
      '1y': '1d',
      '5y': '1wk',
      'max': '1mo',
    };

    const interval = intervalMap[range] || '1d';

    try {
      const chartUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        symbol
      )}?interval=${interval}&range=${range}`;

      const res = await fetch(chartUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        },
        next: { revalidate: range === '1d' ? 60 : 300 }, // 1m cache for intraday, 5m for historical
      });

      if (!res.ok) {
        return [];
      }

      const data = await res.json();
      const result = data.chart?.result?.[0];
      if (!result || !result.timestamp || !result.indicators?.quote?.[0]) {
        return [];
      }

      const timestamps: number[] = result.timestamp;
      const quote = result.indicators.quote[0];
      const isIntraday = range === '1d' || range === '5d';

      const points: HistoricalDataPoint[] = [];
      const seenTimes = new Set<string | number>();

      for (let i = 0; i < timestamps.length; i++) {
        const o = quote.open?.[i];
        const h = quote.high?.[i];
        const l = quote.low?.[i];
        const c = quote.close?.[i];
        const v = quote.volume?.[i] ?? 0;

        // Skip incomplete or null candle bars
        if (o == null || h == null || l == null || c == null) {
          continue;
        }

        const time: string | number = isIntraday
          ? timestamps[i]
          : new Date(timestamps[i] * 1000).toISOString().split('T')[0];

        if (seenTimes.has(time)) {
          continue;
        }
        seenTimes.add(time);

        points.push({
          time,
          open: Number(Number(o).toFixed(2)),
          high: Number(Number(h).toFixed(2)),
          low: Number(Number(l).toFixed(2)),
          close: Number(Number(c).toFixed(2)),
          volume: Math.round(v),
        });
      }

      // Ensure chronological ordering
      return points.sort((a, b) => {
        if (typeof a.time === 'number' && typeof b.time === 'number') {
          return a.time - b.time;
        }
        return String(a.time).localeCompare(String(b.time));
      });
    } catch (err) {
      console.error('Yahoo Finance getHistoricalChart failed:', err);
      return [];
    }
  }
}

