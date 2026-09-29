alter table public.homepage_modules add column if not exists settings jsonb not null default '{}'::jsonb;
update public.homepage_modules set settings='{"limit":10}'::jsonb where slug='blog' and (settings is null or settings='{}'::jsonb);
update public.homepage_modules set settings='{"brandMode":"logo-label-rating","grayscale":true}'::jsonb where slug='brands' and (settings is null or settings='{}'::jsonb);


-- Normalize controls added by the final homepage composer pass.
update public.homepage_modules set settings=coalesce(settings,'{}'::jsonb)||'{"limit":10}'::jsonb where slug='services' and not (coalesce(settings,'{}'::jsonb)?'limit');
update public.homepage_modules set settings=coalesce(settings,'{}'::jsonb)||'{"cardVariant":"rating"}'::jsonb where slug='testimonials' and not (coalesce(settings,'{}'::jsonb)?'cardVariant');
update public.homepage_modules set settings=coalesce(settings,'{}'::jsonb)||'{"brandMode":"logo-label-rating","grayscale":true,"autoplay":true}'::jsonb where slug='brands';
update public.homepage_modules set settings=coalesce(settings,'{}'::jsonb)||'{"search":true}'::jsonb where slug='faq' and not (coalesce(settings,'{}'::jsonb)?'search');
