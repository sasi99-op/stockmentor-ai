import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cleanSupabaseUrl } from './client';

/**
 * createClient (Server)
 * Creates a Supabase client for Server Components, Route Handlers, and Server Actions.
 * Reads and writes session tokens to HTTP-only cookies.
 */
export function createClient() {
  const cookieStore = cookies();
  const supabaseUrl = cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // The `set` method was called from a Server Component.
          // Ignored if middleware refreshes user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // The `remove` method was called from a Server Component.
          // Ignored if middleware refreshes user sessions.
        }
      },
    },
  });
}
