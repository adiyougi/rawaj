# Rawaj Master Print Catalog — Large Format, Signage & Facades

Updated: 2026-09-27

This file documents the technical basis for Rawaj's large-format and signage RFQ models.

## Large-format application families

### HP — signage and display applications
- https://www.hp.com/us-en/printers/large-format/applications/signage.html
- https://www.hp.com/us-en/printers/large-format/applications/car-wraps.html
- https://www.hp.com/emea_middle_east-en/printers/large-format/applications.html

Verified:
- Indoor/outdoor banners and building wraps, backlit signage, vehicle wraps, window graphics, vinyl graphics, floor decals and acrylic signage are distinct commercial application families.
- Vehicle-wrap output can require cutting and lamination after printing.

## Vinyl, window, wall, floor and vehicle graphics

### Avery Dennison Graphics — technical information
- https://graphics.averydennison.com/en/home/resources-and-learning/product-resources/technical-information.html

Verified:
- Avery publishes distinct processing/application instructions for perforated windows, floor systems, vehicle wraps and wall graphics.
- These therefore should not share one generic vinyl RFQ.

### Avery Dennison — perforated window film
- https://graphics.averydennison.com/en/home/graphics-products/digitally-printable-films/high-performance-calendered-digital-vinyl-films/mpi-perforated-window-series.html
- https://graphics.averydennison.com/content/dam/averydennison/graphics/ap/en/Product-Data-Sheets/Digital/Digital-Imaging-Media/pds-mpi-2709-ap-en.pdf

Verified:
- One-way-vision films use perforation/open-area systems including 50/50 and 65/35.
- They are designed for transparent surfaces and can be used for compatible vehicle-window applications.
- A compatible optically clear overlaminate can be recommended in relevant systems to prevent water/dirt accumulation in perforations.

### Avery Dennison — floor marking
- https://graphics.averydennison.com/ap-en/home/graphics-products/digitally-printable-films/monomeric-calendered-digital-vinyl-films/mpi6021-anti-slip-floor-marking.html

Verified:
- Slip resistance is a functional property for floor graphics.
- Some direct-print floor systems explicitly need no overlaminate.
- Removable systems exist for short-term indoor applications such as retail, POS, safety and wayfinding.

### Avery Dennison — overlaminates
- https://graphics.averydennison.com/en/home/graphics-products/digitally-printable-films/overlaminate-films/dol-z-series.html
- https://graphics.averydennison.com/en/home/graphics-products/digitally-printable-films/overlaminate-films/dol-max-series.html

Verified:
- Gloss, matte, luster and optically-clear overlaminates are distinct.
- Vehicle/fleet, walls and outdoor signage use application-specific compatible protection systems.
- Conformability is especially relevant on complex 3D vehicle surfaces.

### ORAFOL — printable films and application guidance
- https://www.orafol.com/en/service/service/downloads
- https://www.orafol.com/en/europe/products/orajet-3105
- https://www.orafol.com/en/europe/products/orajet-3165
- https://www.orafol.com/en/europe/products/orajet-3169
- https://www.orafol.com/Produkte/Brosch%C3%BCren/EN/GS_SAP2001191%20Digital%20Printing%20Materials_EN_web.pdf

Verified:
- ORAFOL maintains separate vehicle-wrap, wall-art, window and floor application guidance.
- Printable PVC systems can be permanent or removable and vary by outdoor-life class.
- Polymeric and other high-performance film families are selected by duration and application demands.
- Compatible laminating/protection films are specified for many systems.

## Illuminated signs and channel letters

### SloanLED — Channel Letter
- https://sloanled.com/collection/signage/channel-letter-signage/

Verified:
- Face-lit, halo-lit and routed/block-acrylic letters are distinct lighting applications.
- LED selection is influenced by letter depth/size and required illumination.
- Electrical sizing, power supply, code compliance and final module layout belong to technical engineering/installation, not to the customer's decorative dropdowns.

### SloanLED — Sign Cabinet / Box
- https://sloanled.com/collection/signage/sign-cabinet-box-signage/
- https://sloanled.com/collection/signage/sign-cabinet-box-signage/signbox-3/
- https://sloanled.com/collection/signage/sign-cabinet-box-signage/posterbox-3/

Verified:
- Sign boxes may be single- or double-sided.
- Face/cabinet depth and sign geometry affect lighting layout.
- Edge-lit and internal/direct illumination systems are distinct.
- Indoor and outdoor applications require application-appropriate systems.

## Acrylic signage

### ACRYLITE — signage fabrication
- https://www.acrylite.co/resources/fabrication-manuals/create-signs-with-acrylite-premium-acrylic-sheet
- https://www.acrylite.co/products/brands/acrylite-led/sign-grade
- https://www.acrylite.co/products/brands/acrylite-led/light-guiding-edge-lit-sheet

Verified:
- Acrylic is used for display, illuminated and fabricated/formed signs.
- Sign-grade acrylic can be cut, routed, drilled, formed and cemented.
- Applications include channel letters, formed letters/shapes and back-painted signs.
- Light-guiding sheet supports slim edge-lit signs.

## ACP / ALUCOBOND façades

### 3A Composites — ALUCOBOND
- https://www.alucobond.com/en/media-centre/downloads/
- https://media.alucobond.com/pdf/alucobond/processing/alucobond-processing-ti-en.pdf
- https://www.alucobond.com/files/downloads/produkte/en/ALUCOBOND_processing_EN.pdf

Verified:
- Aluminum composite panels are used in architectural façade/cladding work.
- Routing-and-folding is a specific fabrication technique used for façade elements, fascia cladding, corners and shaped tray parts.
- Groove geometry, panel system, substructure and installation are technical execution details.
- Rawaj's RFQ therefore asks customers for dimensions, site, desired appearance and scope, while leaving structural/fabrication engineering to technical review.

## Rawaj modeling rules

1. Banner, mesh, backlit face, vinyl, window, wall, floor and vehicle graphics are separate service models.
2. Film class and adhesive/removability depend on surface, duration and geometry.
3. Vehicle film + overlaminate should be selected as a compatible system.
4. Floor graphics treat slip resistance as a system requirement.
5. Window perforation/protection is window-specific.
6. Channel-letter LED/electrical design is finalized by technical engineering.
7. ACP structural and routing/folding details are finalized after site/design review.
8. All services remain quote-only.
