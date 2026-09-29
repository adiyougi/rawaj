-- Rawaj homepage CMS additions. Production-applied migration mirrored in source control.
create table if not exists public.homepage_modules(slug text primary key,label text not null,enabled boolean not null default true,sort_order integer not null default 0,layout_variant text not null default 'default',title text,subtitle text,settings jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now());
create table if not exists public.homepage_ads(id uuid primary key default gen_random_uuid(),title text not null,subtitle text,media_url text,href text,sort_order int not null default 0,is_published boolean not null default true,created_at timestamptz not null default now());
create table if not exists public.faqs(id uuid primary key default gen_random_uuid(),question text not null,answer text not null,category text,sort_order int not null default 0,is_published boolean not null default true,created_at timestamptz not null default now());
create table if not exists public.contact_messages(id uuid primary key default gen_random_uuid(),name text not null,email text,phone text,message text not null,status text not null default 'new' check(status in('new','read','replied','archived')),created_at timestamptz not null default now());
alter table public.ticker_items add column if not exists category text not null default 'uncategorized';
alter table public.clients add column if not exists label text;alter table public.clients add column if not exists rating smallint;alter table public.clients add column if not exists description text;
alter table public.testimonials add column if not exists submission_status text not null default 'approved';
alter table public.homepage_modules enable row level security;alter table public.homepage_ads enable row level security;alter table public.faqs enable row level security;alter table public.contact_messages enable row level security;
create index if not exists homepage_ads_published_order_idx on public.homepage_ads(is_published,sort_order);
create index if not exists faqs_published_order_idx on public.faqs(is_published,sort_order);
create index if not exists contact_messages_status_created_idx on public.contact_messages(status,created_at desc);
create index if not exists testimonials_submission_status_idx on public.testimonials(submission_status,is_published,sort_order);
