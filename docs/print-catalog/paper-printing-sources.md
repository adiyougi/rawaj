# Rawaj Master Print Catalog — Paper Printing Sources

Updated: 2026-09-27

This file records the evidence used for the first verified service-template batch. It is a technical provenance file, not customer-facing copy.

## Carbonless / NCR forms

### Koehler Paper — reacto carbonless paper
- https://www.koehlerpaper.com/en/products/Carbonless-paper/functionality-of-carbonless-paper.php
- https://www.koehlerpaper.com/en/products/Carbonless-paper/Top-sheet-reacto-CB.php
- https://www.koehlerpaper.com/en/products/Carbonless-paper/Middle-sheet-reacto-CFB.php
- https://www.koehlerpaper.com/en/products/Carbonless-paper/carbonless-paper.php

Verified:
- CB is the top sheet with microcapsule coating on the back.
- CF is the bottom receiving sheet.
- CFB is used as a middle sheet in multipart sets and both receives and transfers the copy.
- Carbonless paper is pressure-sensitive and is used for invoices, delivery notes, orders, repair orders and similar forms.
- Therefore NCR must not inherit generic coated-paper or lamination options from brochures/cards.

### Mitsubishi HiTec Paper — Giroform technical data
- https://www.mitsubishi-paper.com/fileadmin/user_upload/downloads/Giroform/Technical_Datasheets_giroform.pdf

Verified:
- CFB is pressure-sensitive carbonless stock used as the middle sheet of multipart forms.
- Technical grammages differ from ordinary commercial coated stocks.

### PrintPlace — Carbonless Forms
- https://www.printplace.com/products/carbonless-forms

Verified ordering dimensions:
- 2-, 3- and 4-part sets.
- Standard copy sequences include white/yellow, white/yellow/pink and white/yellow/pink/gold.
- Black or full-color print.
- Loose sets, padded sets with cardboard back, and booklet with wrap-around cover.
- Glued-edge selection.
- Sequential numbering in black or red.

### PrintPapa — Carbonless Forms
- https://www.printpapa.com/eshop/pc/Carbonless-Forms-c171.htm

Verified:
- Edge gluing and sequential numbering are standard production options.
- Hole drilling and shrink-wrapped bundles are available on multiple products.

### Formax Printing — padded carbonless forms
- https://www.formaxprinting.com/blog/does-your-business-use-handwritten-forms-explore-the-improved-function-and-convenience-of-padded-forms-in-a-wraparound-cover

Verified:
- Carbonless sets can be bound into pads.
- Perforation is commonly used for removal; in some workflows the last ply remains attached.
- Wrap-around covers prevent writing pressure from transferring into the next unused set.
- Sequential numbering is common for control and reference.

## Business cards

### 4over — standard / foil business cards
- https://4over.com/standard-business-cards
- https://4over.com/foil-worx-business-cards
- https://4over.com/round-4-corner-business-cards

Verified:
- Coated and uncoated card stocks; specialty stocks are product-specific.
- 4/0 and 4/4 color configurations.
- Rounded corners, square/round shapes on supported products.
- Spot UV, UV or matte coating on applicable products.
- Silk/velvet lamination on applicable specialty products.
- Metallic foil colors on foil products.
- CMYK / 300 dpi / bleed requirements are production-file constraints, not customer-facing finishing choices.

### MOO — business cards
- https://www.moo.com/us/business-cards/moo-size

Verified:
- Multiple card sizes and premium stock families.
- Foil and spot UV are special-finish options.
- Rounded corners are available.

## Brochures and flyers

### PrintingCenterUSA — brochure printing/templates
- https://www.printingcenterusa.com/printing/brochure-printing
- https://www.printingcenterusa.com/templates/brochure
- https://www.printingcenterusa.com/blog/getting-started-with-pamphlet-printing/

Verified:
- Half, tri, Z, double-parallel and right-angle fold families.
- Gloss, matte and uncoated paper families.
- Fold availability depends on flat size and stock.

### PrintPlace — brochures
- https://www.printplace.com/products/brochures
- https://www.printplace.com/blog/8-folding-styles-brochure-printing/

Verified:
- Half, tri, Z, gate, double-parallel, accordion and roll folds.
- Matte, gloss and high-gloss coatings are differentiated finishing choices.
- Heavier card stocks can require scoring rather than direct folding.

### 4over — specialty folds
- https://4over.com/specialty-folds-brochures

Verified:
- Gatefold, roll fold, reverse/double parallel, double gatefold, accordion and French fold are real commercial products.
- Coated and uncoated stocks and aqueous/UV coating options vary by product.

## Letterheads and envelopes

### UPrinting — letterheads
- https://www.uprinting.com/letterhead-printing.html

Verified:
- Common letterhead sizes include Letter, A4, half, Legal and Tabloid.
- Uncoated stock is used because it supports handwriting and office printers.
- Front-only and two-sided printing are offered.
- Bundling/shrink-wrapping can be a delivery option.

### 4over — envelopes
- https://4over.com/offset-envelopes
- https://4over.com/digital-envelopes
- https://4over.com/variable-addressing-envelopes

Verified:
- Uncoated opaque and linen envelope stocks.
- Window/non-window variants.
- Long-side / short-side opening on larger envelopes.
- Digital and offset production paths.
- Variable addressing is a real production option.

### Blake Envelopes — ISO paper/envelope sizes
- https://blake-envelopes.com/media/wysiwyg/downloads/ISO-paper-sizes.pdf

Verified:
- ISO C-series is intended for envelopes and is dimensionally related to A-series stationery.

## Books, booklets and catalogs

### Printivity — saddle stitch and booklet printing
- https://www.printivity.com/booklets/saddle-stitched-booklets
- https://www.printivity.com/landing/booklets

Verified:
- Saddle stitch is made from folded sheets stapled through the fold.
- Heavier cover stock can be paired with lighter interior stock.
- Uncoated interior stock is appropriate when the publication needs to be written on.
- Perfect bound, spiral and Wire-O are distinct binding families.
- Cover lamination, UV coating and other finishing options are product-dependent.

### PrintingCenterUSA — book printing/binding
- https://www.printingcenterusa.com/printing/book-printing
- https://www.printingcenterusa.com/blog/self-publish-your-own-book/
- https://www.printingcenterusa.com/images/files/Book_Printing_Guide0_Final_.pdf

Verified:
- Saddle stitch, perfect bound, spiral and Wire-O should be modeled as different binding choices.
- Saddle-stitch page counts are constrained by folded-sheet construction.
- Perfect binding creates a glued square spine that can carry printed spine content.
- Spiral and Wire-O support lay-flat use cases.

## Modeling rules established from this batch

1. A service may expose only specifications that apply to that product family.
2. Material, printing process, finishing, binding, folding and installation are separate concepts.
3. NCR forms never inherit brochure/card lamination or coated-stock options.
4. Pricing is intentionally excluded. Every service remains quote-only.
5. Production constraints such as CMYK, bleed and DPI belong to prepress guidance rather than customer finishing choices unless the user is uploading print-ready artwork.
6. New templates remain research-only until evidence is recorded here or in a later family-specific provenance file.
