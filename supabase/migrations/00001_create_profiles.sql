-- ==============================================================================
-- Migration: 00001_create_profiles.sql
-- Description: Create profiles table with RLS and automated signup trigger
-- ==============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  display_name text,
  experience_level text default 'beginner' check (experience_level in ('beginner', 'intermediate', 'advanced')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- RLS Policies: Only the authenticated user can access and modify their profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (user_id = auth.uid() or id = auth.uid());

create policy "Users can update their own profile"
  on public.profiles for update
  using (user_id = auth.uid() or id = auth.uid());

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (user_id = auth.uid() or id = auth.uid());

-- Trigger function: automatically insert a row in public.profiles when auth.users is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, user_id, display_name, experience_level)
  values (
    new.id,
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'beginner'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
