import { NextRequest, NextResponse } from 'next/server';
import { marketDataService } from '@/services/marketData/MarketDataService';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await marketDataService.searchSymbols(query);
    return NextResponse.json({ results });
  } catch (err: unknown) {
    console.error('Error in /api/stocks/search:', err);
    return NextResponse.json(
      { error: 'Failed to search stock symbols' },
      { status: 500 }
    );
  }
}
