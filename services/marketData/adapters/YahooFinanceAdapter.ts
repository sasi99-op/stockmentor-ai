import { IMarketDataProvider, MarketQuote, MarketSearchItem } from '@/types';
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
}
