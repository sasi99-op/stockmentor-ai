import { NextRequest, NextResponse } from 'next/server';
import { marketDataService } from '@/services/marketData/MarketDataService';

export async function GET(
  _request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol;

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const quote = await marketDataService.getQuote(symbol);

    if (!quote) {
      return NextResponse.json(
        { error: `Stock symbol "${symbol}" not found or data unavailable.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ quote });
  } catch (err: unknown) {
    console.error(`Error in /api/stocks/${symbol}:`, err);
    return NextResponse.json(
      { error: 'Failed to fetch quote data' },
      { status: 500 }
    );
  }
}
