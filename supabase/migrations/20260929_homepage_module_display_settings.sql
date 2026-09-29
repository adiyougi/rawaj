alter table public.homepage_modules add column if not exists settings jsonb not null default '{}'::jsonb;
update public.homepage_modules set settings='{"limit":10}'::jsonb where slug='blog' and (settings is null or settings='{}'::jsonb);
update public.homepage_modules set settings='{"brandMode":"logo-label-rating","grayscale":true}'::jsonb where slug='brands' and (settings is null or settings='{}'::jsonb);
