-- ==============================================================================
-- Migration: 00004_create_journal.sql
-- Description: Create investment_journals table with RLS policies
-- ==============================================================================

create table if not exists public.investment_journals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  symbol text not null,
  action text check (action in ('BUY', 'SELL', 'HOLD', 'WATCH')) not null,
  price numeric not null check (price >= 0),
  conviction_level integer check (conviction_level between 1 and 5) default 3,
  emotional_state text check (emotional_state in ('disciplined', 'excited', 'fomo', 'anxious', 'neutral')) default 'disciplined',
  thesis_rationale text not null,
  lessons_learned text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.investment_journals enable row level security;

-- Policies: Authenticated users can only read, add, update, and delete their own journal entries
create policy "Users can view their own journal entries"
  on public.investment_journals for select
  using (user_id = auth.uid());

create policy "Users can insert into their own journal entries"
  on public.investment_journals for insert
  with check (user_id = auth.uid());

create policy "Users can update their own journal entries"
  on public.investment_journals for update
  using (user_id = auth.uid());

create policy "Users can delete from their own journal entries"
  on public.investment_journals for delete
  using (user_id = auth.uid());
