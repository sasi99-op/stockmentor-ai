import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: entries, error } = await supabase
    .from('investment_journals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Journal fetch notice:', error.message);
    return NextResponse.json({
      entries: [],
      notice: error.code === '42P01' ? 'Database table investment_journals pending creation.' : undefined,
    });
  }

  return NextResponse.json({ entries: entries || [] });
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
    const {
      symbol,
      action,
      price,
      conviction_level,
      emotional_state,
      thesis_rationale,
      lessons_learned,
    } = body;

    if (!symbol || !action || price === undefined || !thesis_rationale) {
      return NextResponse.json(
        { error: 'Symbol, action, price, and thesis rationale are required.' },
        { status: 400 }
      );
    }

    const numPrice = Number(price);
    const conviction = Number(conviction_level) || 3;

    const { data, error } = await supabase
      .from('investment_journals')
      .insert({
        user_id: user.id,
        symbol: symbol.toUpperCase(),
        action,
        price: numPrice,
        conviction_level: Math.min(Math.max(conviction, 1), 5),
        emotional_state: emotional_state || 'disciplined',
        thesis_rationale,
        lessons_learned: lessons_learned || '',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ entry: data }, { status: 201 });
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
    return NextResponse.json({ error: 'Journal ID parameter required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('investment_journals')
    .delete()
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
