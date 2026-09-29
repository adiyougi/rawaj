-- Canonical service URLs and backward-compatible aliases.
-- Customer-facing slugs use template_key, while previous master-* URLs keep working.

create table if not exists public.service_slug_aliases (
  alias text primary key,
  service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint service_slug_aliases_alias_check check (
    length(alias) between 1 and 180
    and alias = lower(alias)
    and alias ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  )
);

alter table public.service_slug_aliases enable row level security;

drop policy if exists public_read_published_service_aliases on public.service_slug_aliases;
create policy public_read_published_service_aliases
on public.service_slug_aliases
for select
to anon, authenticated
using (
  exists (
    select 1 from public.services s
    where s.id=service_id
      and s.is_published=true
      and s.verification_status='approved'
  )
);

insert into public.service_slug_aliases(alias,service_id)
select s.slug,s.id
from public.services s
where s.template_key is not null
  and s.slug<>s.template_key
  and s.slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
on conflict (alias) do update set service_id=excluded.service_id;

delete from public.services s
where s.template_key is null
  and s.verification_status='legacy'
  and s.is_published=false
  and not exists (select 1 from public.quote_request_items qi where qi.service_id=s.id)
  and not exists (select 1 from public.package_services ps where ps.service_id=s.id);

update public.services
set slug=template_key
where template_key is not null
  and slug<>template_key;

insert into public.service_slug_aliases(alias,service_id)
select 'laser',id from public.services where template_key='laser-cutting'
on conflict (alias) do update set service_id=excluded.service_id;

create index if not exists service_slug_aliases_service_idx
on public.service_slug_aliases(service_id);
