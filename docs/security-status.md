# Security status

Verified against the live Supabase project on 2026-09-27.

## Enforced

- Public service reads require both `is_published = true` and `verification_status = 'approved'`.
- Legacy services are unpublished.
- Quote request tables deny public browser access; administrative access is protected by the private admin authorization function.
- The public RFQ route writes through a server-only elevated Supabase credential and validates request payloads.
- `admin_users` supports `owner`, `admin`, and `editor`; only the owner can manage administrative membership through RLS.
- The first existing administrator was promoted to owner so the role-management flow has a protected root account.
- Elevated database helpers live in the private schema, use an empty search path, and are not executable by anonymous users.
- No active service record stores a price.

## Advisor follow-up

Supabase Security Advisor currently reports two items:

1. `admin_bootstrap` has RLS enabled and intentionally has no policies. Direct anon/auth table access was previously revoked; the bootstrap path is handled through the controlled claim flow.
2. Leaked-password protection is disabled in Supabase Auth. This is a project-level Auth setting and should be enabled in the Supabase dashboard before production launch.

## Production secret

The application expects the elevated Supabase credential only as a server environment variable. Never expose it through a `NEXT_PUBLIC_` variable or commit it to Git.
