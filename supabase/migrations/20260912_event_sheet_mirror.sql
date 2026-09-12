begin;
-- Apply after the base sync, article image and event category migrations.
-- One transaction updates the sheet snapshot and hides missing sheet records.
create or replace function public.sync_event_sheet(rows jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if rows is null or jsonb_typeof(rows) <> 'array' then
    raise exception 'Expected an array of events';
  end if;
  perform pg_advisory_xact_lock(609122026);
  if exists (
    select 1 from jsonb_array_elements(rows) r
    where coalesce(r->>'sheet_event_id', '') !~ '^[A-Za-z0-9_-]{1,80}$'
  ) then
    raise exception 'Invalid sheet event ID';
  end if;
  insert into public.events (
    sheet_event_id, title, summary, description, event_date, event_time,
    location, image_url, article_image_url, registration_url, is_upcoming,
    status, speakers, acknowledgements, category, sub_pillar, audience
  )
  select sheet_event_id, title, summary, description, event_date, event_time,
    location, image_url, article_image_url, registration_url, is_upcoming,
    status, speakers, acknowledgements, category, sub_pillar, audience
  from jsonb_populate_recordset(null::public.events, rows)
  on conflict (sheet_event_id) do update set
    title = excluded.title, summary = excluded.summary,
    description = excluded.description, event_date = excluded.event_date,
    event_time = excluded.event_time, location = excluded.location,
    image_url = excluded.image_url, article_image_url = excluded.article_image_url,
    registration_url = excluded.registration_url, is_upcoming = excluded.is_upcoming,
    status = excluded.status, speakers = excluded.speakers,
    acknowledgements = excluded.acknowledgements, category = excluded.category,
    sub_pillar = excluded.sub_pillar, audience = excluded.audience;

  update public.events e set status = 'Archived'
  where e.sheet_event_id is not null and e.status <> 'Archived'
    and not exists (
      select 1 from jsonb_array_elements(rows) r
      where r->>'sheet_event_id' = e.sheet_event_id
    );
end;
$$;
revoke all on function public.sync_event_sheet(jsonb) from public, anon, authenticated;
grant execute on function public.sync_event_sheet(jsonb) to service_role;
commit;
