-- Restrict quote creation RPCs to trusted server code only.
-- Public clients submit through /api/quotes where request validation and IP rate limiting run.

revoke all on function public.create_quote_request(text,text,text,text,text,text,date,text,jsonb) from public, anon, authenticated;
revoke all on function public.create_quote_request_v2(text,text,text,text,text,text,date,text,jsonb) from public, anon, authenticated;

grant execute on function public.create_quote_request(text,text,text,text,text,text,date,text,jsonb) to service_role;
grant execute on function public.create_quote_request_v2(text,text,text,text,text,text,date,text,jsonb) to service_role;
