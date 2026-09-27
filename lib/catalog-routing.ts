export type CatalogRoute = {
  departmentSlug:string;
  categorySlug:string;
  provenanceDoc:string;
};

const paper="docs/print-catalog/paper-printing-sources.md";
const paperExpanded="docs/print-catalog/paper-products-expansion-sources.md";
const packaging="docs/print-catalog/labels-packaging-sources.md";
const flexiblePackaging="docs/print-catalog/flexible-packaging-bags-sources.md";
const large="docs/print-catalog/large-format-signage-sources.md";
const specialty="docs/print-catalog/textile-specialty-sources.md";
const reflective="docs/print-catalog/large-format-signage-sources.md";
const exhibitions="docs/print-catalog/exhibition-display-sources.md";

export const catalogRouting:Record<string,CatalogRoute>={
  cards:{departmentSlug:"paper-printing",categorySlug:"paper-business-stationery",provenanceDoc:paper},
  letterheads:{departmentSlug:"paper-printing",categorySlug:"paper-business-stationery",provenanceDoc:paper},
  envelopes:{departmentSlug:"paper-printing",categorySlug:"paper-business-stationery",provenanceDoc:paper},
  "presentation-folders":{departmentSlug:"paper-printing",categorySlug:"paper-business-stationery",provenanceDoc:paperExpanded},
  notepads:{departmentSlug:"paper-printing",categorySlug:"paper-business-stationery",provenanceDoc:paperExpanded},
  invoices:{departmentSlug:"paper-printing",categorySlug:"paper-business-forms",provenanceDoc:paper},
  flyers:{departmentSlug:"paper-printing",categorySlug:"paper-marketing",provenanceDoc:paper},
  brochures:{departmentSlug:"paper-printing",categorySlug:"paper-marketing",provenanceDoc:paper},
  menus:{departmentSlug:"paper-printing",categorySlug:"paper-marketing",provenanceDoc:paperExpanded},
  postcards:{departmentSlug:"paper-printing",categorySlug:"paper-marketing",provenanceDoc:paperExpanded},
  "door-hangers":{departmentSlug:"paper-printing",categorySlug:"paper-marketing",provenanceDoc:paperExpanded},
  "hang-tags":{departmentSlug:"paper-printing",categorySlug:"paper-product-branding",provenanceDoc:paperExpanded},
  tickets:{departmentSlug:"paper-printing",categorySlug:"paper-events",provenanceDoc:paperExpanded},
  "greeting-invitations":{departmentSlug:"paper-printing",categorySlug:"paper-events",provenanceDoc:paperExpanded},
  "wall-calendars":{departmentSlug:"paper-printing",categorySlug:"paper-calendars",provenanceDoc:paperExpanded},
  "desk-calendars":{departmentSlug:"paper-printing",categorySlug:"paper-calendars",provenanceDoc:paperExpanded},
  catalogs:{departmentSlug:"paper-printing",categorySlug:"paper-publications",provenanceDoc:paper},
  "booklet-saddle":{departmentSlug:"paper-printing",categorySlug:"paper-publications",provenanceDoc:paper},
  "book-perfect":{departmentSlug:"paper-printing",categorySlug:"paper-publications",provenanceDoc:paper},
  "book-wire-o":{departmentSlug:"paper-printing",categorySlug:"paper-publications",provenanceDoc:paper},
  "book-spiral":{departmentSlug:"paper-printing",categorySlug:"paper-publications",provenanceDoc:paper},
  notebooks:{departmentSlug:"paper-printing",categorySlug:"paper-publications",provenanceDoc:paperExpanded},

  stickers:{departmentSlug:"packaging-labels",categorySlug:"packaging-stickers",provenanceDoc:packaging},
  "roll-labels":{departmentSlug:"packaging-labels",categorySlug:"packaging-product-labels",provenanceDoc:packaging},
  "sheet-labels":{departmentSlug:"packaging-labels",categorySlug:"packaging-product-labels",provenanceDoc:packaging},
  "folding-carton":{departmentSlug:"packaging-labels",categorySlug:"packaging-folding-cartons",provenanceDoc:packaging},
  "corrugated-box":{departmentSlug:"packaging-labels",categorySlug:"packaging-corrugated",provenanceDoc:packaging},
  "paper-shopping-bag":{departmentSlug:"packaging-labels",categorySlug:"packaging-main",provenanceDoc:flexiblePackaging},
  "industrial-paper-sack":{departmentSlug:"packaging-labels",categorySlug:"packaging-main",provenanceDoc:flexiblePackaging},
  "premade-flexible-pouch":{departmentSlug:"packaging-labels",categorySlug:"packaging-main",provenanceDoc:flexiblePackaging},
  "flexible-rollstock":{departmentSlug:"packaging-labels",categorySlug:"packaging-main",provenanceDoc:flexiblePackaging},

  "rigid-uv-print":{departmentSlug:"digital-printing",categorySlug:"large-rigid",provenanceDoc:"docs/print-catalog/rigid-display-sources.md"},
  "pvc-foam-board":{departmentSlug:"digital-printing",categorySlug:"large-rigid",provenanceDoc:"docs/print-catalog/rigid-display-sources.md"},
  "acm-printed-panel":{departmentSlug:"digital-printing",categorySlug:"large-rigid",provenanceDoc:"docs/print-catalog/rigid-display-sources.md"},
  "coroplast-sign":{departmentSlug:"digital-printing",categorySlug:"large-rigid",provenanceDoc:"docs/print-catalog/rigid-display-sources.md"},
  "foam-board-display":{departmentSlug:"digital-printing",categorySlug:"large-rigid",provenanceDoc:"docs/print-catalog/rigid-display-sources.md"},

  "retractable-banner-stand":{departmentSlug:"exhibitions-displays",categorySlug:"display-banner-stands",provenanceDoc:exhibitions},
  "tension-fabric-banner":{departmentSlug:"exhibitions-displays",categorySlug:"display-fabric",provenanceDoc:exhibitions},
  "pop-up-backwall":{departmentSlug:"exhibitions-displays",categorySlug:"display-backwalls",provenanceDoc:exhibitions},
  "seg-fabric-frame":{departmentSlug:"exhibitions-displays",categorySlug:"display-seg",provenanceDoc:exhibitions},
  "seg-lightbox":{departmentSlug:"exhibitions-displays",categorySlug:"display-seg",provenanceDoc:exhibitions},
  "table-cover":{departmentSlug:"exhibitions-displays",categorySlug:"display-tables-counters",provenanceDoc:exhibitions},
  "trade-show-counter":{departmentSlug:"exhibitions-displays",categorySlug:"display-tables-counters",provenanceDoc:exhibitions},
  "event-tent":{departmentSlug:"exhibitions-displays",categorySlug:"display-outdoor",provenanceDoc:exhibitions},
  "event-flag":{departmentSlug:"exhibitions-displays",categorySlug:"display-outdoor",provenanceDoc:exhibitions},
  "hanging-display":{departmentSlug:"exhibitions-displays",categorySlug:"display-hanging",provenanceDoc:exhibitions},
  "modular-exhibit":{departmentSlug:"exhibitions-displays",categorySlug:"display-modular",provenanceDoc:exhibitions},

  banner:{departmentSlug:"digital-printing",categorySlug:"large-banners",provenanceDoc:large},
  "mesh-banner":{departmentSlug:"digital-printing",categorySlug:"large-banners",provenanceDoc:large},
  flex:{departmentSlug:"digital-printing",categorySlug:"large-backlit",provenanceDoc:large},
  "vinyl-graphics":{departmentSlug:"digital-printing",categorySlug:"large-vinyl",provenanceDoc:large},
  "window-graphics":{departmentSlug:"digital-printing",categorySlug:"large-windows",provenanceDoc:large},
  "wall-graphics":{departmentSlug:"digital-printing",categorySlug:"large-walls",provenanceDoc:large},
  "floor-graphics":{departmentSlug:"digital-printing",categorySlug:"large-floors",provenanceDoc:large},
  "vehicle-wrap":{departmentSlug:"digital-printing",categorySlug:"large-vehicles",provenanceDoc:large},

  lightbox:{departmentSlug:"signage",categorySlug:"signage-lightboxes",provenanceDoc:large},
  letters:{departmentSlug:"signage",categorySlug:"signage-channel-letters",provenanceDoc:large},
  "dimensional-letters":{departmentSlug:"signage",categorySlug:"signage-dimensional",provenanceDoc:large},
  "acrylic-sign":{departmentSlug:"signage",categorySlug:"signage-rigid",provenanceDoc:large},
  "reflective-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "traffic-regulatory-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "traffic-warning-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "traffic-guide-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "parking-reflective-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "work-zone-reflective-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "street-name-reflective-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  "facility-safety-reflective-sign":{departmentSlug:"signage",categorySlug:"signage-reflective-safety",provenanceDoc:reflective},
  facade:{departmentSlug:"facades",categorySlug:"facades-acp",provenanceDoc:large},

  "textile-sublimation":{departmentSlug:"textile-promotional",categorySlug:"specialty-sublimation",provenanceDoc:specialty},
  "sublimation-hard-goods":{departmentSlug:"textile-promotional",categorySlug:"specialty-sublimation",provenanceDoc:specialty},
  "dtf-apparel":{departmentSlug:"textile-promotional",categorySlug:"specialty-dtf-dtg",provenanceDoc:specialty},
  "dtg-apparel":{departmentSlug:"textile-promotional",categorySlug:"specialty-dtf-dtg",provenanceDoc:specialty},
  "screen-print-apparel":{departmentSlug:"textile-promotional",categorySlug:"specialty-screen",provenanceDoc:specialty},
  embroidery:{departmentSlug:"textile-promotional",categorySlug:"specialty-embroidery",provenanceDoc:specialty},
  "heat-transfer-vinyl":{departmentSlug:"textile-promotional",categorySlug:"specialty-heat-transfer",provenanceDoc:specialty},
  "uv-direct-object":{departmentSlug:"textile-promotional",categorySlug:"specialty-uv",provenanceDoc:specialty},
  "uv-dtf":{departmentSlug:"textile-promotional",categorySlug:"specialty-uv",provenanceDoc:specialty},

  "laser-cutting":{departmentSlug:"laser-acrylic",categorySlug:"laser-cutting",provenanceDoc:specialty},
  "laser-engraving":{departmentSlug:"laser-acrylic",categorySlug:"laser-engraving",provenanceDoc:specialty},
  awards:{departmentSlug:"laser-acrylic",categorySlug:"laser-awards",provenanceDoc:specialty},

  identity:{departmentSlug:"design-content",categorySlug:"design-identity",provenanceDoc:""},
  "social-content":{departmentSlug:"design-content",categorySlug:"design-content",provenanceDoc:""}
};
