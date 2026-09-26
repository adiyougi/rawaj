-- Mirrors Supabase migration add_service_catalog_review_metadata.
-- Applied to the connected Rawaj database on 2026-09-27.
-- These fields keep catalog provenance/review state explicit instead of hiding it in JSON.

alter table public.services
  add column if not exists template_key text,
  add column if not exists verification_status text not null default 'legacy',
  add column if not exists verification_notes text;

alter table public.services
  drop constraint if exists services_verification_status_check;

alter table public.services
  add constraint services_verification_status_check
  check (verification_status in ('research','verified','approved','legacy'));

create unique index if not exists services_template_key_unique
  on public.services(template_key)
  where template_key is not null;

comment on column public.services.template_key is
  'Internal link to the curated RFQ template. Hidden from storefront.';
comment on column public.services.verification_status is
  'Catalog review state: research, verified, approved, or legacy.';
comment on column public.services.verification_notes is
  'Internal catalog review notes; never storefront pricing.';
