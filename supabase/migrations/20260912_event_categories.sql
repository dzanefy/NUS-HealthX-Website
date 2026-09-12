begin;
alter table public.events
  add column if not exists category text not null default 'Other'
    check (category in ('Fireside Chats', 'Xeminars', 'Masterclasses', 'Case Study Fellowship', 'Research Fellowship', 'Other')),
  add column if not exists sub_pillar text not null default ''
    check (sub_pillar in ('', 'Coding for Medicine')),
  add column if not exists audience text not null default '';
commit;
