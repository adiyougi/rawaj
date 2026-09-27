# Security follow-up

Updated: 2026-09-27

## Completed

- Moved privileged `SECURITY DEFINER` helpers out of the exposed `public` schema.
- Kept `public.claim_first_admin(text)` as a `SECURITY INVOKER` wrapper available only to authenticated users.
- Revoked direct anonymous execution of privileged helpers.
- Revoked Data API table privileges for `admin_bootstrap`; it intentionally has RLS enabled with no public policy.
- Updated `admin_read_own_profile` to use `(select auth.uid())` so PostgreSQL can use an initPlan.
- Re-ran Supabase Security Advisor: exposed `SECURITY DEFINER` warnings are cleared.
- Re-ran Supabase Performance Advisor: the `auth_rls_initplan` warning is cleared.

## Remaining platform setting

Supabase Auth currently reports **Leaked Password Protection Disabled**. This is a project-level Auth setting rather than an application schema migration. Enable leaked-password protection in the Supabase Auth password-security settings before production handoff.

Reference: https://supabase.com/docs/guides/auth/password-security

## Performance notes

The advisor currently reports unused indexes and multiple permissive policies. The database is newly seeded and has almost no traffic, so unused-index findings are not actionable yet. The duplicate permissive SELECT policies should be consolidated in a later policy-focused migration after regression tests cover anonymous storefront reads and authenticated admin reads.

Do not remove indexes solely because the advisor reports them unused at this stage.
