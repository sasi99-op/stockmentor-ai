-- ==============================================================================
-- Migration: 00002_create_watchlists.sql
-- Description: Create watchlists table with RLS policies
-- ==============================================================================

create table if not exists public.watchlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  symbol text not null,
  company_name text not null,
  exchange text check (exchange in ('NSE', 'BSE')) default 'NSE',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, symbol)
);

-- Enable Row Level Security (RLS)
alter table public.watchlists enable row level security;

-- Policies: Authenticated users can only read, add, and delete their own items
create policy "Users can view their own watchlist"
  on public.watchlists for select
  using (user_id = auth.uid());

create policy "Users can insert into their own watchlist"
  on public.watchlists for insert
  with check (user_id = auth.uid());

create policy "Users can delete from their own watchlist"
  on public.watchlists for delete
  using (user_id = auth.uid());
