# V Tech Manufacturing — Architecture, CMS Schema, Deployment & Launch Guide

## 1. Site Architecture & Sitemap Tree (67 Indexed URLs)
- `/` — Home (12-section export landing page)
- `/about-us/` — Company Story, Chennai Plant Machinery, 5-Stage QC, Leadership
- `/projects/` — Filterable Export Case Studies (Region, Industry, Equipment Type)
- `/resources/` — Technical Guides, Comparison Matrices, Gated Catalogs, Live Sitemap & CMS Schema Explorer
- `/contact-us/` — Full RFQ Form, Chennai HQ, Port Proximity, Live Global Time-Zone Overlap Converter
- `/privacy-policy/` & `/terms-of-use/` & `*` (404 Page)
- `/turnkey-solutions/` + 5 turnkey line pages (`/liquid-filling-packaging-lines/`, `/powder-dosing-bagging-lines/`, `/warehouse-intralogistics-automation/`, `/bulk-chemical-drum-handling/`, `/automotive-ev-assembly-lines/`)
- `/products/` + 4 category landings + 33 product pages:
  - `/products/conveyor-material-handling/` (13 models)
  - `/products/liquid-filling-machinery/` (7 models)
  - `/products/powder-packaging-machinery/` (5 models)
  - `/products/warehouse-eol-automation/` (8 models)
- `/industries/` + 6 industry pages
- `/export-and-compliance/` + 3 compliance/FAT/spares pages
- `/engineering-services/` + 4 engineering lifecycle pages

## 2. Design System Tokens
- **Primary Royal Blue**: `#1a2a8c`
- **Deep Navy (Dark Bands & Mega-Footer)**: `#1a2a4e`
- **Canvas & Structural Surfaces**: `#ffffff` and `#f5f7fa` with `1px` `#e2e8f0` hairline dividers
- **Safety Orange (CTAs Only)**: `#ff6a13` (Hover: `#e55a08`)
- **Typography**: `Plus Jakarta Sans` (Display) + `Public Sans` (Body) + `IBM Plex Mono` (`tabular-nums` for spec tables)

## 3. Headless CMS Content Types (Sanity / Strapi Ready)
Also exposed via `GET /api/cms/schema` and inside `/resources/` → **Headless CMS Schema**:
1. `product`: name, slug, categoryRef, shortBenefit, overview, heroImage, keyFeatures, specs (`metric` + `imperial`), customizationOptions, applications, industries, compliance, leadTime, faqs, relatedProducts, datasheetPdf, seo.
2. `turnkeySolution`: title, slug, problemStatement, throughputMetric, throughputImperial, stages, includedMachines, caseStudySnippet, fatAndInstallation, seo.
3. `industry`: title, slug, overview, challenges, standards, recommendedMachines, recommendedTurnkey, caseStudy, seo.
4. `projectCaseStudy`: title, country, region, industryRef, productType, challenge, solution, results, machinesUsed, gallery.
5. `engineeringService`: title, slug, methodology, deliverables, toolsUsed, sampleOutputs.
6. `resourceArticle`: title, slug, type, summary, body, comparisonRows, gatedAssetId.

## 4. Environment Variables (`.env.example`)
- `APP_URL`: Canonical origin for `sitemap.xml`, `robots.txt`, and OpenGraph URLs.
- `CRM_WEBHOOK_URL`: Server-only HTTPS webhook URL for forwarding `/api/rfq` payloads to HubSpot / Zoho / Google Sheets.
- `SALES_NOTIFICATION_EMAIL`: Destination inbox for RFQ routing.
- `VITE_WHATSAPP_NUMBER`: International click-to-chat number (digits only).
- `VITE_CALENDLY_URL`: Optional external Calendly link for engineering consultations.
- `VITE_GA4_MEASUREMENT_ID` & `VITE_GTM_CONTAINER_ID`: Conversion telemetry (`rfq_submit`, `datasheet_download`, `whatsapp_click`, `virtual_tour_booking`).
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`: Optional headless CMS sync credentials.

## 5. Production Build & Deployment
1. Install dependencies: `npm install`
2. Build static client bundle: `npm run build` (outputs to `dist/` and copies `src/assets/`).
3. Start production Express server: `NODE_ENV=production npm start` (runs `server.ts` on port `3000`, serving `dist/`, `/api/*`, `/sitemap.xml`, `/robots.txt`, and SPA fallback).
4. Recommended trailing-slash redirect rule at CDN/reverse-proxy layer: 301 redirect non-trailing paths (excluding `/api/*`, `/sitemap.xml`, `/robots.txt`, `/assets/*`) to trailing-slash canonical URLs.

## 6. Pre-Launch Checklist
- [ ] Replace all `[PLACEHOLDER]` fields (street address, phone number, ISO certificate #, leadership names, verified client names/metrics).
- [ ] Configure `CRM_WEBHOOK_URL` and `VITE_WHATSAPP_NUMBER` in production environment secrets.
- [ ] Verify `/sitemap.xml` and `/robots.txt` in Google Search Console.
- [ ] Test `/api/rfq` submission and gated datasheet download end-to-end.
- [ ] Verify Lighthouse Core Web Vitals (LCP < 2.5s, CLS < 0.05) and WCAG AA contrast.
