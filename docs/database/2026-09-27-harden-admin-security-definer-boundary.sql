-- Applied to Supabase project rawaj on 2026-09-27.
-- Purpose: remove SECURITY DEFINER helpers from the exposed public API schema,
-- keep the bootstrap RPC callable only by authenticated users, and optimize auth.uid() RLS evaluation.
-- References:
-- https://supabase.com/docs/guides/database/postgres/row-level-security
-- https://supabase.com/docs/guides/database/functions
-- https://supabase.com/docs/guides/api/securing-your-api

create schema if not exists private;

alter function public.is_admin() set schema private;
alter function private.is_admin() set search_path = '';

alter function public.claim_first_admin(text) set schema private;
alter function private.claim_first_admin(text) set search_path = '';

revoke all on schema private from public;
grant usage on schema private to authenticated;

revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

revoke execute on function private.claim_first_admin(text) from public, anon;
grant execute on function private.claim_first_admin(text) to authenticated;

create function public.claim_first_admin(claim_secret text)
returns boolean
language sql
security invoker
set search_path = ''
as $$
  select private.claim_first_admin(claim_secret);
$$;

revoke execute on function public.claim_first_admin(text) from public, anon;
grant execute on function public.claim_first_admin(text) to authenticated;

drop policy if exists admin_read_own_profile on public.admin_users;
create policy admin_read_own_profile
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()));

revoke all on table public.admin_bootstrap from anon, authenticated;
