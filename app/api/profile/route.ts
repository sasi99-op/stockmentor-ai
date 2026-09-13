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

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    profile: profile || {
      id: user.id,
      display_name: (user.user_metadata?.display_name as string) || null,
      experience_level: 'beginner',
      email: user.email,
    },
    email: user.email,
  });
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { display_name, experience_level } = body;

    const allowedLevels = ['beginner', 'intermediate', 'advanced'];
    if (experience_level && !allowedLevels.includes(experience_level)) {
      return NextResponse.json(
        { error: 'Invalid experience level. Must be beginner, intermediate, or advanced.' },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (display_name !== undefined) updates.display_name = display_name ? String(display_name).trim() : null;
    if (experience_level !== undefined) updates.experience_level = experience_level;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...updates,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Invalid request' },
      { status: 400 }
    );
  }
}
