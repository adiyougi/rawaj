-- Publish fully documented Master Catalog drafts with a replaceable local placeholder.
-- The placeholder can be replaced per service from the admin service editor.
update public.services
set hero_url='/images/service-placeholder.svg',
    verification_status='approved',
    review_status='approved',
    approved_at=coalesce(approved_at,now()),
    is_published=true
where verification_status='verified'
  and is_published=false
  and hero_url is null
  and template_key is not null
  and jsonb_array_length(coalesce(specifications,'[]'::jsonb))>0
  and jsonb_array_length(coalesce(source_refs,'[]'::jsonb))>0
  and length(coalesce(short_description,''))>=30
  and length(coalesce(description,''))>=50;
