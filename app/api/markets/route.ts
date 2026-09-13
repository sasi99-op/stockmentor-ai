import { NextResponse } from 'next/server';

interface MarketIndexItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface SectorPerformanceItem {
  sector: string;
  representativeSymbol: string;
  companyName: string;
  price: number;
  changePercent: number;
}

const INDICES_CONFIG = [
  { symbol: '^NSEI', name: 'Nifty 50' },
  { symbol: '^BSESN', name: 'BSE Sensex' },
  { symbol: '^NSEBANK', name: 'Nifty Bank' },
  { symbol: '^CNXIT', name: 'Nifty IT' },
];

const SECTORS_CONFIG = [
  { sector: 'Technology', symbol: 'TCS.NS', company: 'Tata Consultancy Services' },
  { sector: 'Banking & Financials', symbol: 'HDFCBANK.NS', company: 'HDFC Bank' },
  { sector: 'Energy & Petrochemicals', symbol: 'RELIANCE.NS', company: 'Reliance Industries' },
  { sector: 'Automobile', symbol: 'TATAMOTORS.NS', company: 'Tata Motors' },
  { sector: 'Consumer Goods / FMCG', symbol: 'HINDUNILVR.NS', company: 'Hindustan Unilever' },
  { sector: 'Healthcare & Pharma', symbol: 'SUNPHARMA.NS', company: 'Sun Pharma' },
];

export async function GET() {
  try {
    // 1. Fetch benchmark indices
    const indicesPromises = INDICES_CONFIG.map(async (item) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
          item.symbol
        )}?interval=1d&range=1d`;
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const data = await res.json();
          const meta = data.chart?.result?.[0]?.meta;
          if (meta && meta.regularMarketPrice) {
            const price = meta.regularMarketPrice;
            const prev = meta.chartPreviousClose || price;
            const change = price - prev;
            const changePercent = prev > 0 ? (change / prev) * 100 : 0;

            return {
              symbol: item.symbol,
              name: item.name,
              price: Number(price.toFixed(2)),
              change: Number(change.toFixed(2)),
              changePercent: Number(changePercent.toFixed(2)),
            };
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch index ${item.symbol}:`, err);
      }
      return null;
    });

    // 2. Fetch sector proxy leaders
    const sectorsPromises = SECTORS_CONFIG.map(async (item) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
          item.symbol
        )}?interval=1d&range=1d`;
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const data = await res.json();
          const meta = data.chart?.result?.[0]?.meta;
          if (meta && meta.regularMarketPrice) {
            const price = meta.regularMarketPrice;
            const prev = meta.chartPreviousClose || price;
            const change = price - prev;
            const changePercent = prev > 0 ? (change / prev) * 100 : 0;

            return {
              sector: item.sector,
              representativeSymbol: item.symbol,
              companyName: item.company,
              price: Number(price.toFixed(2)),
              changePercent: Number(changePercent.toFixed(2)),
            };
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch sector proxy ${item.symbol}:`, err);
      }
      return null;
    });

    const [rawIndices, rawSectors] = await Promise.all([
      Promise.all(indicesPromises),
      Promise.all(sectorsPromises),
    ]);

    const indices: MarketIndexItem[] = rawIndices.filter(
      (item): item is MarketIndexItem => item !== null
    );
    const sectors: SectorPerformanceItem[] = rawSectors.filter(
      (item): item is SectorPerformanceItem => item !== null
    );

    return NextResponse.json(
      {
        indices,
        sectors,
        lastUpdated: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
        disclaimer:
          'Benchmark index prices provided via 15-minute delayed public feed. Strictly for self-guided educational research.',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (err) {
    console.error('Error in /api/markets:', err);
    return NextResponse.json(
      { error: 'Failed to aggregate market overview metrics.' },
      { status: 500 }
    );
  }
}
