import { createBrowserClient } from '@supabase/ssr';

export function cleanSupabaseUrl(url?: string): string {
  if (!url) return '';
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

/**
 * createClient (Browser)
 * Creates a Supabase client configured for client-side React components.
 * Automatically handles auth token storage in browser cookies.
 */
export function createClient() {
  const supabaseUrl = cleanSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Auth functions will be unavailable.');
  }

  return createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key'
  );
}
