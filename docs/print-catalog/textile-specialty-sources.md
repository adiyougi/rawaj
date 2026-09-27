# Rawaj Master Print Catalog — Textile, Promotional & Specialty Printing

Updated: 2026-09-27

This file documents the evidence used for Rawaj's textile-decoration, specialty-printing and laser quote models.

## Dye sublimation — textiles

### Mimaki — Sublimation ink / textile process
- https://mimaki.com/supply/ink/sublimation.html
- https://mimaki.com/topics/product/inkjet_printer/sublimation-inkjet-printer.html

Verified:
- Traditional dye sublimation fixes dye into polyester under heat.
- Transfer sublimation prints to transfer paper first, then transfers by heat/pressure.
- Direct sublimation prints directly to pretreated polyester and then heat-fixes the image.
- Common polyester applications include apparel, flags, banners, sportswear and soft-signage textiles.
- Therefore Rawaj must capture polyester content / material and not advertise standard sublimation as a generic process for any fabric.

### Sawgrass — SubliJet system and hard goods
- https://www.sawgrassink.com/sublijet/
- https://shop.sawgrassink.com/pages/sublijet
- https://www.sawgrassink.com/Sawgrass/media/Documents/Tech%20Support/Guides/Sublimation-HeatPress-Settings.pdf

Verified:
- Traditional sublimation is used on polyester fabrics and polymer-coated hard goods.
- Typical hard goods include mugs, drinkware, coated metal/photo panels, phone cases, signage and other sublimation-ready blanks.
- Hard goods require a suitable polymer coating / sublimation-ready blank.
- Different products require product-specific heat/pressure/time settings, which remain a production detail rather than a customer-facing finishing option.

## DTF — Direct to Film

### Mimaki — TxF DTF
- https://mimaki.com/product/inkjet/dtf/txf150-75/
- https://indonesia.mimaki.com/archives/002/202305/DB30343-03_TxF150-75_EN_1.pdf

Verified:
- DTF prints to a transfer film using CMYK + white heat-transfer pigment ink.
- Hot-melt adhesive powder is applied and cured on the printed film before heat transfer to textiles.
- DTF can be used on cotton, polyester and blended fabrics, including dark garments.
- Actual compatible fabric can still depend on the film/powder system; pre-assessment is recommended.
- DTF therefore has a different RFQ model from sublimation and does not inherit polyester-only restrictions.

## DTG — Direct to Garment

### Epson — SureColor garment inks / DTG
- https://epson.com/For-Home/Ink/Epson-T55A-Ink-Pack/i/T55AA20
- https://epson.com/For-Work/Printers/Large-Format/SureColor-F2100-Direct-to-Garment-Printer/p/SCF2100WE
- https://news.epson.com/news/surecolor-f3070-industrial-dtg-printer

Verified:
- DTG systems use garment pigment inks, including white ink for dark garments.
- Epson documents broad use on cotton and cotton-polyester blends; some industrial systems also support linen/rayon workflows.
- 100% cotton/cellulose garments are commonly recommended for best compatibility on specific DTG systems.
- White/colour curing and pretreatment are production-process details; the customer RFQ only needs garment material, colour, print area and supply method.

## Screen printing

### Avient Specialty Inks — plastisol and water-based textile systems
- https://www.avientspecialtyinks.com/products-brand/avient-specialty-inks
- https://www.avientspecialtyinks.com/products-brand/wilflex/wilflex-white-inks
- https://www.avientspecialtyinks.com/products-brand/wilflex/wilflex-white-inks/wilflex-polyester-and-synthetics-white-inks
- https://www.avientspecialtyinks.com/sites/default/files/2024-03/Zodiac%20Aquarius%20-%20Product%20Bulletin%20and%20Color%20Card.pdf

Verified:
- Plastisol and water-based are distinct textile screen-printing ink families.
- Cotton, polyester, blends, nylon and performance/stretch fabrics need different ink choices.
- Polyester/synthetic garments can exhibit dye migration, driving low-bleed/migration-control ink selection.
- Water-based systems can provide soft-hand printing; high-solids systems target opacity/performance.
- Specialty screen effects include reflective, metallic/pearlescent, glitter/shimmer, glow and suede/texture effects.
- Rawaj therefore asks for garment material, garment colour, number of design colours and desired effect, while keeping mesh count/cure chemistry internal.

## Embroidery

### Wilcom EmbroideryStudio — fabric-dependent digitizing
- https://docs.wilcom.com/embroiderystudio/28/en/OnlineHelp/Digitizing/properties/properties-9.htm
- https://docs.wilcom.com/embroiderystudio/28/en/OnlineHelp/Quality/stabilizing/stabilizing-5.htm

Verified:
- Stretch knits, stable wovens and other fabrics need different density, pull compensation and underlay.
- Underlay stabilizes embroidery and reduces pull/puckering.
- Stitch engineering should be determined during digitizing rather than exposed as a customer choice.

### Madeira USA — backing/stabilizer
- https://www.madeirausa.com/e-zee-cut-away/
- https://www.madeirausa.com/_resources/common/userfiles/file/Backing%20Guide.pdf

Verified:
- Backing/stabilizer is a core part of machine embroidery.
- Fabric construction plus design size/density influence backing choice and weight.
- Cut-away is appropriate for unstable/stretchy fabrics such as knits, fleece and similar garments.
- The RFQ therefore captures item/fabric/placement/size; Rawaj chooses backing and stitch engineering.

## Heat-transfer vinyl

### Siser — HTV application instructions
- https://www.siserna.com/files/heat-transfer-vinyl-instructions.pdf

Verified:
- Different HTV products support different substrate sets, including cotton, poly/cotton and polyester; some products also support leather.
- Standard, metallic, sparkle/glitter and flock-like product families have distinct heat/pressure/peel instructions.
- Heat settings are production details and depend on the exact film/garment combination.

## UV direct-to-object printing

### Roland DG — VersaObject UV flatbeds
- https://www.rolanddga.com/products/printers/versaobject-co-i-lo
- https://www.rolanddga.com/products/printers/uvflatbed
- https://www.rolanddga.com/products/printers/versaobject

Verified:
- UV flatbeds print directly on dimensional objects, panels, promotional products and custom goods.
- Supported application materials include plastics, acrylic, metal, wood, leather and other substrates depending on ink/adhesion conditions.
- White, gloss and primer can be process channels/effects on supported systems.
- Objects may be flat, dimensional, cylindrical or curved depending on machine/fixture.
- Substrate adhesion testing and primer selection remain production-engineering tasks.

## UV DTF

### Roland DG — UV DTF Transfer System
- https://www.rolanddga.com/en/products/printers/uv-dtf-transfer-system
- https://www.rolanddga.com/products/printers/versaobject-mo-series

Verified:
- UV DTF prints UV graphics to a transfer sheet/film and then transfers them to the target object.
- It is specifically useful for irregularly shaped objects, uneven surfaces, rounded corners or objects difficult/impossible to place under a direct UV printer.
- UV DTF can customize bottles, mugs, phone cases, leather goods and promotional items.
- UV DTF should therefore be modeled separately from direct-to-object UV printing.

## Laser cutting / engraving / marking

### Trotec — laserable materials
- https://www.troteclaser.com/en/laser-machines/laser-and-engraving-materials
- https://www.troteclaser.com/en-us/laserable-materials
- https://www.troteclaser.com/en-ca/resources/faqs/what-materials-laser
- https://www.troteclaser.com/en/helpcenter/materials/material-usage-hints/anodised-aluminium
- https://www.troteclaser.com/en-us/laser-applications/personalization

Verified:
- Acrylic/PMMA, wood/MDF/plywood, paper/cardboard, leather/textiles and laserable plastics are common laser-cut/engrave materials.
- Anodized aluminium can be engraved; metals such as stainless steel and others may require fiber-laser or other marking configurations.
- Engraving, cutting and marking are distinct processes and material compatibility differs between them.
- Laser personalization is widely used for signs, labels, promotional items, gifts and awards.
- Therefore Rawaj asks for material, thickness, operation and file status, while laser source/power/speed remain engineering details.

## Rawaj modeling rules from this batch

1. Sublimation, DTF, DTG, screen print, embroidery and HTV are separate service models.
2. Standard sublimation never inherits cotton as a normal substrate option.
3. DTF can cover more textile types, but film/powder/fabric compatibility still requires assessment.
4. Screen-print ink choice is driven by substrate, garment colour, design and desired effect; mesh/cure settings stay internal.
5. Embroidery backing, underlay, stitch density and pull compensation are production engineering, not customer-facing choices.
6. UV DTF and direct-to-object UV are different workflows and stay separate.
7. Laser cutting and laser engraving/marking are modeled separately because compatible materials and processes differ.
8. All products remain RFQ-only.
