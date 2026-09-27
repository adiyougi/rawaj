# Rawaj delivery TODO

Only business decisions and production-environment inputs remain here. Engineering should not wait for them.

## Business approval

- Confirm fulfillment mode for each Master Catalog service: in-house, local partner, international supplier, or flexible.
- Commercially approve the verified Master Catalog services that Rawaj actually wants to sell. Verified records remain unpublished until approval.
- The production catalog currently contains 76 technically verified production-service records. The two creative templates (visual identity and social content) remain legacy review items rather than being falsely marked as technically verified production services.
- Confirm package composition and commercial naming. Packages remain RFQ-only.
- Provide approved portfolio media and factual project information before publishing case studies as real completed work.

## Production configuration

- Confirm the public company contact/address/legal copy before launch.
- Configure the server-only Supabase elevated credential in the production environment for the RFQ server endpoint. Never commit it to the repository.

## Completed safeguards

- Legacy service records are not published.
- Public service reads require approved verification status.
- No service prices are stored in the active catalog.
- Master Catalog templates are validated in CI for RFQ specifications and rich content coverage.
