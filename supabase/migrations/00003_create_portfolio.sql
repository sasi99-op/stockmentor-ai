-- ==============================================================================
-- Migration: 00003_create_portfolio.sql
-- Description: Create portfolio_holdings table with RLS policies and thesis tracking
-- ==============================================================================

create table if not exists public.portfolio_holdings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  symbol text not null,
  company_name text not null,
  exchange text check (exchange in ('NSE', 'BSE')) default 'NSE',
  shares numeric not null check (shares > 0),
  buy_price numeric not null check (buy_price > 0),
  buy_date date not null default current_date,
  thesis_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.portfolio_holdings enable row level security;

-- Policies: Authenticated users can only read, add, update, and delete their own holdings
create policy "Users can view their own portfolio holdings"
  on public.portfolio_holdings for select
  using (user_id = auth.uid());

create policy "Users can insert into their own portfolio holdings"
  on public.portfolio_holdings for insert
  with check (user_id = auth.uid());

create policy "Users can update their own portfolio holdings"
  on public.portfolio_holdings for update
  using (user_id = auth.uid());

create policy "Users can delete from their own portfolio holdings"
  on public.portfolio_holdings for delete
  using (user_id = auth.uid());
