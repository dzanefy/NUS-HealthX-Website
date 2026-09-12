begin;
alter table public.events
  add column if not exists sheet_event_id text unique,
  add column if not exists status text not null default 'Draft'
    check (status in ('Draft', 'Published', 'Archived')),
  add column if not exists summary text,
  add column if not exists speakers jsonb not null default '[]',
  add column if not exists acknowledgements text;

alter table public.events enable row level security;
drop policy if exists "Public can view events" on public.events;
drop policy if exists "Published events only" on public.events;
create policy "Public can view events" on public.events
  for select to anon, authenticated using (status = 'Published');
-- Restrictive policy also prevents any other read policy from exposing drafts.
create policy "Published events only" on public.events as restrictive
  for select to anon, authenticated using (status = 'Published');
grant select on public.events to anon, authenticated;
revoke insert, update, delete on public.events from anon, authenticated;
commit;
