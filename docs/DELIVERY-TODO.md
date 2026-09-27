# Rawaj delivery TODO

Only business decisions and production-environment inputs remain here. Engineering should not wait for them.

## Business approval

- Confirm fulfillment mode for each Master Catalog service: in-house, local partner, international supplier, or flexible.
- Commercially approve the verified Master Catalog services that Rawaj actually wants to sell. Verified records remain unpublished until approval.
- The Master Catalog service count is enforced by CI rather than maintained as a hard-coded TODO number. All catalog templates currently require dedicated RFQ specifications and reviewed rich content; new services remain commercially unpublished until Rawaj approves fulfillment and sale.
- Confirm package composition and commercial naming. Packages remain RFQ-only.
- Provide approved portfolio media and factual project information before publishing case studies as real completed work.

## Production configuration

- Confirm the public company contact/address/legal copy before launch.
- Configure the server-only Supabase elevated credential in the production environment for the RFQ server endpoint. Never commit it to the repository.

## Completed safeguards

- Legacy service records are not published.
- Public service reads require approved verification status.
- No service prices are stored in the active catalog.
- Master Catalog templates are validated in CI for RFQ specifications and rich content coverage.\n- Paper cups and Hardcover / Case-bound books now have documented technical provenance and dedicated RFQ models; commercial publication still requires an approved fulfillment route.
