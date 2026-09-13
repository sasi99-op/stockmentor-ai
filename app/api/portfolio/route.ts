import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { marketDataService } from '@/services/marketData/MarketDataService';

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: holdings, error } = await supabase
    .from('portfolio_holdings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // If the table hasn't been created yet in Supabase SQL editor, gracefully return empty list
    console.warn('Portfolio fetch error (check migration status):', error.message);
    return NextResponse.json({
      holdings: [],
      totals: { totalInvested: 0, currentValue: 0, totalGainLoss: 0, totalGainLossPercent: 0 },
      notice: error.code === '42P01' ? 'Database table portfolio_holdings pending creation.' : undefined,
    });
  }

  if (!holdings || holdings.length === 0) {
    return NextResponse.json({
      holdings: [],
      totals: { totalInvested: 0, currentValue: 0, totalGainLoss: 0, totalGainLossPercent: 0 },
    });
  }

  // Fetch live quotes in parallel for current valuation
  const enrichedHoldings = await Promise.all(
    holdings.map(async (holding) => {
      const quote = await marketDataService.getQuote(holding.symbol);
      const currentPrice = quote?.price ?? Number(holding.buy_price);
      const totalCost = Number(holding.shares) * Number(holding.buy_price);
      const currentValue = Number(holding.shares) * currentPrice;
      const gainLoss = currentValue - totalCost;
      const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

      return {
        ...holding,
        current_price: currentPrice,
        total_cost: totalCost,
        current_value: currentValue,
        gain_loss: gainLoss,
        gain_loss_percent: gainLossPercent,
        pe_ratio: quote?.peRatio,
      };
    })
  );

  const totalInvested = enrichedHoldings.reduce((sum, h) => sum + h.total_cost, 0);
  const currentValue = enrichedHoldings.reduce((sum, h) => sum + h.current_value, 0);
  const totalGainLoss = currentValue - totalInvested;
  const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  return NextResponse.json({
    holdings: enrichedHoldings,
    totals: {
      totalInvested,
      currentValue,
      totalGainLoss,
      totalGainLossPercent,
    },
  });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { symbol, company_name, exchange, shares, buy_price, buy_date, thesis_notes } = body;

    if (!symbol || !shares || !buy_price) {
      return NextResponse.json(
        { error: 'Symbol, shares count, and buy price are required.' },
        { status: 400 }
      );
    }

    const numShares = Number(shares);
    const numPrice = Number(buy_price);

    if (isNaN(numShares) || numShares <= 0 || isNaN(numPrice) || numPrice <= 0) {
      return NextResponse.json(
        { error: 'Shares and buy price must be positive numbers.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('portfolio_holdings')
      .insert({
        user_id: user.id,
        symbol: symbol.toUpperCase(),
        company_name: company_name || symbol.toUpperCase(),
        exchange: exchange || 'NSE',
        shares: numShares,
        buy_price: numPrice,
        buy_date: buy_date || new Date().toISOString().split('T')[0],
        thesis_notes: thesis_notes || '',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ holding: data }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Holding ID parameter required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('portfolio_holdings')
    .delete()
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
