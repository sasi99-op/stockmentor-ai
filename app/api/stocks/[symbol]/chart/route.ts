import { NextRequest, NextResponse } from 'next/server';
import { marketDataService } from '@/services/marketData/MarketDataService';

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol;

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const range = request.nextUrl.searchParams.get('range') || '1mo';

  try {
    const data = await marketDataService.getHistoricalChart(symbol, range);

    return NextResponse.json(
      {
        symbol,
        range,
        provider: marketDataService.providerName,
        count: data.length,
        data,
      },
      {
        headers: {
          'Cache-Control': range === '1d' ? 'public, max-age=60' : 'public, max-age=300',
        },
      }
    );
  } catch (err: unknown) {
    console.error(`Error in /api/stocks/${symbol}/chart:`, err);
    return NextResponse.json(
      { error: 'Failed to fetch historical chart data' },
      { status: 500 }
    );
  }
}
