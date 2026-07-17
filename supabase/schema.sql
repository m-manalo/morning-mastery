-- Morning Mastery Database Schema
-- Run this in your Supabase SQL editor (Dashboard -> SQL Editor -> New query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── devices ──────────────────────────────────────────────────────────────────
-- One row per device. Created automatically on first app open via anonymous auth.
-- Stores the device's anonymous Supabase user ID so we can tie push subscriptions
-- and (later) synced progress to a single device/account identity.
create table if not exists devices (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade not null unique,
  created_at    timestamptz default now() not null,
  last_seen_at  timestamptz default now() not null
);
alter table devices enable row level security;
-- A device can only read/write its own row
create policy "device owner" on devices
  for all using (auth.uid() = user_id);

-- ── push_subscriptions ───────────────────────────────────────────────────────
-- Stores the browser push subscription object for each device that has
-- enabled notifications. One row per device (upsert on change).
create table if not exists push_subscriptions (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references auth.users(id) on delete cascade not null unique,
  endpoint        text not null,
  p256dh          text not null,
  auth            text not null,
  notify_time     time not null default '08:00:00',  -- user's preferred local time (HH:MM)
  timezone        text not null default 'Europe/London', -- user's timezone for cron matching
  enabled         boolean not null default true,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);
alter table push_subscriptions enable row level security;
-- A device can only read/write its own subscription
create policy "subscription owner" on push_subscriptions
  for all using (auth.uid() = user_id);

-- ── progress (for future sync) ───────────────────────────────────────────────
-- Not used immediately — this is the foundation for cross-device sync later.
-- Mirrors the localStorage keys the app already uses, just stored server-side.
create table if not exists progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade not null unique,
  subjects      jsonb not null default '{}',   -- {science: {xp: 140}, ...}
  streak        jsonb not null default '{}',   -- {count: 7, lastPlayed: "...", ...}
  stats         jsonb not null default '{}',   -- {totalAnswered: 42, ...}
  updated_at    timestamptz default now() not null
);
alter table progress enable row level security;
create policy "progress owner" on progress
  for all using (auth.uid() = user_id);

-- ── Helper function: update updated_at automatically ─────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger push_subscriptions_updated_at
  before update on push_subscriptions
  for each row execute function update_updated_at();

create trigger progress_updated_at
  before update on progress
  for each row execute function update_updated_at();
