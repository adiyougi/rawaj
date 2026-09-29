-- Private RFQ attachments for Rawaj
-- Applied to Supabase project amcqkwoyunxporlafeua on 2026-09-29.

create table if not exists public.quote_attachments (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  file_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  file_size bigint not null check (file_size > 0 and file_size <= 20971520),
  created_at timestamptz not null default now()
);

alter table public.quote_attachments enable row level security;

drop policy if exists quote_team_read_attachments on public.quote_attachments;
create policy quote_team_read_attachments
on public.quote_attachments
for select
to authenticated
using ((select private.can_manage_quotes()));

drop policy if exists quote_team_delete_attachments on public.quote_attachments;
create policy quote_team_delete_attachments
on public.quote_attachments
for delete
to authenticated
using ((select private.can_manage_quotes()));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values(
  'rawaj-quotes',
  'rawaj-quotes',
  false,
  20971520,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/postscript',
    'image/vnd.adobe.photoshop',
    'application/zip',
    'application/x-zip-compressed'
  ]
)
on conflict (id) do update
set public=false,
    file_size_limit=excluded.file_size_limit,
    allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists quote_team_read_storage on storage.objects;
create policy quote_team_read_storage
on storage.objects
for select
to authenticated
using (
  bucket_id='rawaj-quotes'
  and (select private.can_manage_quotes())
);

drop policy if exists quote_team_delete_storage on storage.objects;
create policy quote_team_delete_storage
on storage.objects
for delete
to authenticated
using (
  bucket_id='rawaj-quotes'
  and (select private.can_manage_quotes())
);

create index if not exists quote_attachments_request_idx
on public.quote_attachments(quote_request_id,created_at);
