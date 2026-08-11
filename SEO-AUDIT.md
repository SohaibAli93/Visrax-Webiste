# Visrax.com — Technical & Content SEO Audit (Final, Codebase-Verified)

**Stack:** Next.js 16 App Router · TypeScript · React 19 · Tailwind · Framer Motion / GSAP / Lenis · content in `src/lib/data.ts` (no CMS)
**Audit date:** August 2026 — final revision after codebase cross-check

Legend: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low · ✅ Verified against code / DONE

> **Revision note:** This is the final version. It corrects the original audit against the actual repo and adds **feasibility annotations** (`Codebase:` lines) checked against real source. Items already implemented (`metadataBase`) are marked DONE. Code snippets are illustrative — field names in the snippets are the *proposed* shape, not the current one; see the `Codebase:` notes for exactly what exists today.

---

## 1. Critical Issues (fix immediately)

### 1.1 🔴 Detail pages have Breadcrumb schema but no page-type schema
**Codebase:** Verified. `layout.tsx` emits `Organization` + `WebSite`; home (`src/app/page.tsx`) emits `SoftwareApplication`; `Breadcrumbs` (`src/components/seo/Breadcrumbs.tsx`) emits `BreadcrumbList` on every detail/listing page. No `Product`/`Service`/`Article`/`FAQPage` anywhere.

**Issue:** What's missing is **entity/page-type schema**: none of the 28 `[slug]` detail pages (5 platform + 7 capabilities + 11 industries + 5 solutions) or the 5 content pages (3 insights + 2 case studies) emit a `Product`, `Service`, `Article`, or `FAQPage` block describing what the page actually is.

**Why it matters:** Breadcrumbs help Google understand site hierarchy, but they say nothing about page *content type*. Entity-level schema is what builds rich results, clarifies page purpose, and disambiguates near-duplicate templated pages.

**Fix:** Add a typed schema per content type, alongside the existing `Breadcrumbs` output. The cleanest place is inside the shared `DetailTemplate` in `src/components/sections/PageTemplates.tsx` (it already receives the full `DetailPage`), so all 28 detail pages get it from one change.

```tsx
// src/components/sections/PageTemplates.tsx  (illustrative)
// Inside <DetailTemplate>, alongside <Breadcrumbs>:
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',          // Platform/Capabilities
  name: page.title,
  description: page.metaDescription,
  brand: { '@type': 'Brand', name: 'Visrax' },
  category: 'AI Video Analytics Software',
  url: `https://visrax.com${basePath}/${page.slug}`,
}
```

Schema mapping per route type:

| Route | Schema type |
|---|---|
| `/platform/[slug]`, `/capabilities/[slug]` | `Product` or `SoftwareApplication` |
| `/solutions/[slug]` | `Service` |
| `/industries/[slug]` | `Service` + `about` referencing the industry as `Thing` |
| `/insights/[slug]` | `Article` (`headline`, `author`, `datePublished`, `dateModified`, `image`) |
| `/case-studies/[slug]` | `Article` with `articleSection: "Case Study"` |
| Any page with Q&A copy | `FAQPage` (only if the Q&A is visibly rendered on the page) |

**Field gaps to add to `src/lib/data.ts` before this is implementable:**
- `Article` schema needs `author` — the `Article` type in `data.ts` has no `author` field. Add one.
- `Product` `image` needs a per-page image — none exists yet. See 2.3.

**Crawlability trap:** Never mark up `FAQPage`/`HowTo` rich-result content that isn't visibly rendered on the page. Google has applied manual actions for this.

**Priority: 🔴 Critical**

---

### 1.2 🔴 Static, single-date `lastModified` in sitemap
**Codebase:** Verified. `src/app/sitemap.ts` hardcodes `lastModified: new Date("2026-07-13")` for every URL. The `DetailPage`/`Article` types in `data.ts` have **no** `updatedAt`/`publishedAt`/`date` field on detail pages (only `Article` has `date`).

**Issue:** A sitemap where every URL shares one lastmod date is a signal to Googlebot that lastmod is not trustworthy — it gets ignored, and Google falls back to its own crawl-based freshness signals.

**Fix:** Add `updatedAt`/`publishedAt` (ISO strings) to every entry in `src/lib/data.ts`, then derive dates dynamically. Reuse `absoluteUrl()` from `@/lib/site`:

```ts
// src/app/sitemap.ts  (illustrative)
import type { MetadataRoute } from 'next'
import { platformPages, capabilityPages, industryPages, solutionPages, insights, caseStudies } from '@/lib/data'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: absoluteUrl('/platform'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/capabilities'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/industries'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/solutions'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/insights'), lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: absoluteUrl('/case-studies'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/request-demo'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/company/about'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/company/careers'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: absoluteUrl('/company/contact'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/privacy'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/cookies'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const detailRoutes: MetadataRoute.Sitemap = [
    ...platformPages.map((p) => ({ url: absoluteUrl(`/platform/${p.slug}`), lastModified: p.updatedAt ?? p.publishedAt, changeFrequency: 'monthly' as const, priority: 0.85 })),
    ...capabilityPages.map((c) => ({ url: absoluteUrl(`/capabilities/${c.slug}`), lastModified: c.updatedAt ?? c.publishedAt, changeFrequency: 'monthly' as const, priority: 0.85 })),
    ...industryPages.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), lastModified: i.updatedAt ?? i.publishedAt, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...solutionPages.map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), lastModified: s.updatedAt ?? s.publishedAt, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...insights.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: a.updatedAt ?? a.date, changeFrequency: 'yearly' as const, priority: 0.7 })),
    ...caseStudies.map((c) => ({ url: absoluteUrl(`/case-studies/${c.slug}`), lastModified: c.updatedAt ?? c.date, changeFrequency: 'yearly' as const, priority: 0.75 })),
  ]

  return [...staticRoutes, ...detailRoutes]
}
```

**Priority: 🔴 Critical**

---

### 1.3 🔴 Animation stack (GSAP + Framer Motion + Lenis) is a high risk for INP/CLS
**Codebase:** Verified. `src/components/motion/SmoothScroll.tsx` instantiates `Lenis` + registers `gsap`/`ScrollTrigger` and runs from `layout.tsx` (line 52), so **every route** — including static `/insights/[slug]` pages — loads and runs GSAP + Lenis. It does respect `prefers-reduced-motion` (early return, line 10), which is good.

**Issue:** Running three animation/scroll libraries client-side is a common cause of poor **INP** (Lenis intercepts scroll/wheel events globally) and **CLS** (GSAP-animated elements without reserved space pre-hydration).

**Fix — concrete steps:**
1. **Scope smooth scroll to a Client Component wrapper around only the pages that need it** (home + showcase pages), not `layout.tsx` root:
   ```tsx
   // src/components/motion/SmoothScrollProvider.tsx  (new)
   'use client'
   import { ReactLenis } from 'lenis/react'
   export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
     return <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>{children}</ReactLenis>
   }
   ```
   `lenis/react` exports `ReactLenis` — confirm the installed `lenis@1.1.18` version exposes it (`node_modules/lenis/dist`); if not, wrap the existing Lenis instance in a `useEffect` inside the provider instead.
2. **Never block the main thread on load with GSAP ScrollTrigger setup for above-the-fold hero content** — hydrate hero text/CTA statically; animate only secondary content on scroll-into-view.
3. **Reserve space for every animated element** with fixed `min-height`/`aspect-ratio` — animate `transform`/`opacity` only, never `top`/`left`/`width`/`height`.
4. **Defer non-critical scripts** with `next/script` `strategy="lazyOnload"`.
5. Run `next build && next start` + Lighthouse/PageSpeed Insights on `/`, `/platform/[slug]`, and `/request-demo` — the demo form is the money page; INP there affects conversion.

**Priority: 🔴 Critical**

---

### 1.4 🔴 Confirm all `<Image>` usage has explicit dimensions
**Codebase:** Verified. `next/image` is imported in 11 components (Header, Footer, and 9 section/visual components). The images are **hardcoded in components, not stored in `data.ts`** — the `DetailPage`/`Article` types have no image fields at all. So this fix is about component hygiene, not data-layer typing as the original audit implied.

**Fix:** Audit each `<Image>` for required `width`/`height` (or `fill` + sized parent) and `alt`. If you introduce per-page images later (see 2.3), enforce them at the data layer:

```ts
// src/lib/data.ts  (only if you add image fields to DetailPage/Article)
type ImageAsset = {
  src: string
  alt: string        // required — see 4.5
  width: number
  height: number
}
```

Only set `priority` on true above-the-fold hero images (max 1–2 per page) — over-using it competes for bandwidth and hurts LCP.

**Priority: 🔴 Critical**

---

### 1.5 🔴 No analytics installed — SEO cannot be measured
**Codebase:** Verified. `src/app/layout.tsx` has no GA4/Plausible/GTM script. There is no way to measure organic traffic, conversions, or ranking impact.

**Why it matters:** Every other item in this audit assumes you can measure its impact. Without analytics you're optimizing blind.

**Fix:** Install privacy-respecting analytics (Plausible = lowest impact, ~1KB, no consent banner in most EU contexts; GA4 = funnel/CRM integration), deferred so it never competes with LCP:

```tsx
// src/app/layout.tsx  (add near end of <body>)
import Script from 'next/script'

<Script src="https://plausible.io/js/script.js" data-domain="visrax.com" strategy="lazyOnload" />
```

Also: add conversion tracking on `/request-demo` form submit (`src/components/forms/RequestDemoForm.tsx`, currently sets client-side `status = "success"`), and set up **Google Search Console** + **Bing Webmaster Tools** — free, and fastest way to see indexation/query data.

**Priority: 🔴 Critical**

---

## 2. High-Impact Improvements

### 2.1 🟠 Cross-silo internal linking is missing
**Codebase:** Verified. The four taxonomies in `data.ts` have zero cross-references — `DetailPage` has no `related*` fields, and `DetailTemplate` renders no related-content module.

**Fix:** Add a `relatedSlugs`-style field per entry in `src/lib/data.ts` and render a "Related" module mid-page on every detail page:

```ts
// src/lib/data.ts  (extend DetailPage type)
{
  slug: 'manufacturing',
  title: 'Manufacturing',
  relatedCapabilities: ['object-detection'],
  relatedSolutions: ['safety-compliance'],
  relatedPlatform: ['detection-tracking', 'live-monitoring'],
}
```

Render 3–6 contextual links mid-page (not a footer block) — in-content links pass more relevance signal than templated nav links.

**Priority: 🟠 High**

---

### 2.2 🟠 Differentiate titles/descriptions across templated routes
**Codebase:** Verified. `src/lib/metadata.ts` `createMetadata()` appends "| Visrax" to titles, so all 28 detail pages end up as "{Title} | Visrax" with no intent differentiation. The `DetailPage` type has a unique `metaDescription` per page (good), but title formulas are uniform.

**Fix:** Give each taxonomy its own title formula reflecting intent:

| Taxonomy | Title formula | Example |
|---|---|---|
| Capabilities | `{Capability} Software — AI-Powered {Benefit} \| Visrax` | "Object Detection Software — Real-Time AI Alerts \| Visrax" |
| Industries | `AI Video Monitoring for {Industry} \| Visrax` | "AI Video Monitoring for Manufacturing \| Visrax" |
| Solutions | `{Solution} Solutions — {Outcome} \| Visrax` | "Safety Compliance Solutions — Automated PPE Detection \| Visrax" |
| Platform | `{Platform Feature} \| Visrax Platform` | "Live Monitoring \| Visrax Platform" |

Titles ≤ 60 chars, descriptions ≤ 155 chars, each with a primary keyword + a differentiator.

**Priority: 🟠 High**

---

### 2.3 🟠 Dynamic per-page OG images instead of one static image
**Codebase:** Verified. `createMetadata()` uses `brandAssets.og` (`/brand/banner.png`) for every page — one generic card everywhere. No per-page OG images.

**Fix:** Use Next.js `ImageResponse` (`next/og`) per route segment:

```tsx
// src/app/capabilities/[slug]/opengraph-image.tsx  (new)
import { ImageResponse } from 'next/og'
import { capabilityPages } from '@/lib/data'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const capability = capabilityPages.find((c) => c.slug === params.slug)
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        background: '#0A0A0F', color: '#fff', padding: 80, justifyContent: 'center' }}>
        <div style={{ fontSize: 28, opacity: 0.6 }}>Visrax</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 20 }}>{capability?.title}</div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 20 }}>Vision. Intelligence. Impact.</div>
      </div>
    ),
    size,
  )
}
```
(`DetailPage` has no `tagline` field — use a static tagline or add one.) Repeat for the other `[slug]` segments. Generated at build time for static routes.

**Priority: 🟠 High**

---

### 2.4 🟠 Ensure `[slug]` routes are fully static-generated
**Codebase:** Verified. All `[slug]` pages (`platform`, `capabilities`, `industries`, `solutions`, `insights`, `case-studies`) already implement `generateStaticParams()` (e.g. `src/app/capabilities/[slug]/page.tsx:6`). No `dynamic = 'force-dynamic'` exists anywhere. Note: params are async in Next 16 (`params: Promise<{ slug: string }>`), so `generateMetadata`/component signature must `await params` — already handled.

**Fix (cheap hardening):** add to each detail page:
```tsx
export const dynamic = 'force-static'
export const dynamicParams = false   // real 404 for unknown slugs — avoids soft-404 crawl waste
```

**Priority: 🟠 High**

---

### 2.5 🟠 Listing pages need substantial unique copy
**Codebase:** Verified. `ListingPage` (`src/components/sections/PageTemplates.tsx:10`) renders only eyebrow + title + one-line description + card grid. No body copy, no FAQ.

**Fix:** Add 150–300 words of genuine intro copy above the grid on each hub page (`/platform`, `/capabilities`, `/industries`, `/solutions`) plus a category-level FAQ block (candidate for `FAQPage` schema, per 1.1). Gives anchor text for internal links to child pages (2.1).

**Priority: 🟠 High**

---

## 3. Content Gaps vs. Computer Vision / Video Analytics Competitors

| Gap | Why competitors have it | Priority |
|---|---|---|
| **Camera/VMS compatibility page** ("Which cameras work with Visrax") | Core differentiator is "works with existing cameras" — #1 buyer-qualifying question and long-tail keyword opportunity ("does Visrax work with Hikvision/Axis/Dahua cameras") | 🔴 Critical |
| **Comparison content** (Visrax vs. traditional CCTV, vs. named competitors) | Bottom-funnel, high-intent, high-conversion queries | 🟠 High |
| **Glossary / pillar content** ("What is video analytics," "Object detection vs. motion detection," "What is edge AI") | Top-of-funnel informational volume; builds topical authority | 🟠 High |
| **Integrations page** (VMS platforms, alerting tools, access control) | Enterprise buyers search by integration name | 🟡 Medium |
| **Trust/compliance page** (SOC 2, data privacy, encryption, on-prem vs. cloud) | Security-category buyers search compliance posture before shortlisting | 🟠 High |
| **Customer logos / testimonials / review platform presence** (G2, Capterra, TrustRadius) | E-E-A-T signal + enterprise buying-committee validation | 🟡 Medium |
| **Deeper case study library** (currently 2) | Thin vs. competitors publishing quantified outcomes per industry | 🟠 High |
| **Video/demo content with `VideoObject` schema** | Unlocks video rich results / video sitemap | 🟡 Medium |
| **Pricing/packaging guidance** | Reduces bounce from pricing-intent searches even in sales-led model | 🟡 Medium |
| **ROI/TCO calculator or whitepaper** | Common lead-gen and backlink asset in this niche | 🟢 Low |

**Priority overall: 🟠 High** — biggest lever for organic growth beyond the current detail-page taxonomy. Camera-compatibility page belongs in the critical tier (see Priority Summary).

---

## 4. Technical SEO Fixes

### 4.1 🟠 robots.ts — already correct; add non-indexable path disallows only
**Codebase: ✅ DONE for base structure.** `src/app/robots.ts` already allows all, references the sitemap, and sets the host. Only genuinely new work:

```ts
// src/app/robots.ts  — add the disallow array; everything else stays as-is
import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: getSiteUrl(),
  }
}
```
**Note:** The audit's proposed `/request-demo/thank-you` disallow is **not applicable** — there is no thank-you page. Form success is a client-side state change in `RequestDemoForm.tsx` (`status = "success"`), no separate URL. `src/app/api/` (contact + request-demo POST handlers) shouldn't be crawled — add `/api/` to disallow. Your API routes only handle `POST`, so `GET` already returns `405`, but the disallow is cheap insurance.

**Priority: 🟠 High**

### 4.2 🟡 Add `noindex` (not `disallow`) to legal boilerplate pages if they're thin
`/privacy`, `/terms`, `/cookies` — use meta robots if you want them out of the index (keeps link equity flowing):
```tsx
export const metadata = { robots: { index: false, follow: true } }
```
Optional/low-risk. **Priority: 🟢 Low**

### 4.3 🟡 RSS feed should cover case studies too
**Codebase:** Verified. `src/app/rss.xml/route.ts` emits only `insights`. Case studies are equally citable. Expand the feed (or add a second) to include `caseStudies`. **Priority: 🟡 Medium**

### 4.4 🟠 Canonical self-reference on paginated/filtered future states
Plan now, implement when `/insights`/`/case-studies` grow past their current sizes. **Priority: 🟡 Medium (plan now)**

### 4.5 🟠 Accessibility ↔ SEO: alt text discipline
**Codebase:** Verified. Images are hardcoded in components with `next/image`; no TypeScript-level enforcement of `alt`. Ensure every `<Image>` has a non-empty `alt`. **Priority: 🟠 High**

### 4.6 ✅ DONE — `metadataBase` already configured
**Codebase:** Verified. `src/app/layout.tsx` line 31: `metadataBase: new URL(getSiteUrl())`. Correctly resolves relative OG/Twitter image URLs. **Item closed.**

### 4.7 🟠 Verify rendered `<head>` output on the production build
After `next build && next start`, verify each page emits: single `<h1>`, correct `<title>`/meta description/canonical, absolute `og:*` URLs, `twitter:card`, `<html lang="en">`, viewport, exactly one JSON-LD block per type, no duplicate `hreflang`.

```
curl -s https://visrax.com/capabilities/object-detection | rg -i "<title>|canonical|og:image|application/ld\+json"
# Validate schema: https://validator.schema.org
# Validate rich results: https://search.google.com/test/rich-results
```

**Priority: 🟠 High**

---

## 5. On-Page SEO Framework (per taxonomy)

| Element | Rule |
|---|---|
| **H1** | Exactly one per page, contains primary keyword, not identical to title tag |
| **H2s** | Structure around sub-intents: "How it works," "Key features," "Who it's for," "FAQs" |
| **Title tag** | ≤ 60 chars, unique formula per taxonomy (see 2.2) |
| **Meta description** | ≤ 155 chars, includes CTA + differentiator ("existing cameras," "no hardware swap") |
| **URL slugs** | Already clean (`/capabilities/object-detection`) — keep as-is |

**Keyword targeting (head terms added):**

| Taxonomy | Example | Primary | Secondary |
|---|---|---|---|
| Capabilities | `object-detection` | "AI object detection software" | "real-time object detection camera," "computer vision object detection" |
| Industries | `manufacturing` | "AI video monitoring for manufacturing" | "manufacturing safety camera AI," "factory computer vision" |
| Solutions | `safety-compliance` | "AI safety compliance monitoring" | "automated PPE detection," "AI camera analytics" |
| Platform | `live-monitoring` | "live AI camera monitoring platform" | "real-time video monitoring software," "AI camera analytics" |
| Sitewide head terms | home / listing pages | "computer vision" | "AI camera analytics," "video analytics software" |
| Retrofit wedge | new camera-compat page | "AI camera upgrade without replacing hardware" | "retrofit CCTV with AI," "turn existing cameras into AI monitoring," "does Visrax work with Hikvision/Axis/Dahua cameras" |

---

## 6. Content Strategy — Next Pages/Articles to Build

Organized as a topic cluster around the "retrofit existing cameras" wedge (the strongest differentiated angle, currently under-leveraged):

1. **Pillar:** "AI Video Analytics: The Complete Guide" — links to every capability/solution page. Target: "video analytics."
2. **"Do I need new cameras for AI monitoring?" / camera compatibility resource** — target: "AI camera upgrade without replacing hardware," "retrofit CCTV with AI." **(🔴 Critical — core differentiator)**
3. **Comparison series:** "Visrax vs. Traditional CCTV," "AI Video Monitoring vs. Manned Security Guards" (ROI/cost angle).
4. **Industry-specific case studies** — at least one per `/industries/[slug]` page (11 industries, 2 case studies today — biggest content gap).
5. **Glossary/definitions cluster:** "What is Object Detection," "Object Detection vs. Motion Detection," "What is Edge AI Processing," "What is a VMS." Lower competition, high intent-adjacent, internally link into capability pages.
6. **Integration-specific landing pages** when integrations exist: "Visrax + [VMS name]."
7. **Compliance/trust page:** "How Visrax Handles Data Privacy & Security" — due-diligence queries + backlink magnet.

Sequence: **(2) camera compatibility → (4) case studies → (3) comparisons → (5) glossary → (1) pillar → (6) integrations.**

---

## 7. Local / Enterprise SEO Considerations

- **Not a storefront business** — `LocalBusiness`/`GeoCoordinates` not appropriate unless Visrax has a customer-facing office. If it does, add `Organization` → `address` + `PostalAddress`. Don't force local-pack optimization onto a B2B product.
- **Enterprise priorities instead:**
  - `sameAs` in `Organization` schema → LinkedIn, Crunchbase, G2/Capterra profiles once they exist (entity trust).
  - Third-party review platform presence (G2, Capterra, TrustRadius) — referral traffic + enterprise-buyer verification.
  - Expand `/company/about` with leadership bios, founding story, press mentions — E-E-A-T signal, important for a security-adjacent category.
  - Plan `hreflang` now even before translating: add `alternates.languages` self-referencing `en-US` so infrastructure is ready when a second locale is added.

---

## Priority Summary (do in this order)

1. 🔴 **Install analytics + Search Console** (1.5) — nothing else is measurable without it
2. 🔴 Fix sitemap `lastModified` + add `updatedAt` to `src/lib/data.ts` (1.2)
3. 🔴 Add per-page JSON-LD (Product/Service/Article/FAQ) (1.1)
4. 🔴 Audit Core Web Vitals — scope Lenis/GSAP, defer scripts, fix CLS sources (1.3)
5. 🔴 Enforce `alt`/`width`/`height` on all `<Image>` usage (1.4, 4.5)
6. 🔴 **Ship the camera-compatibility page** (Section 3/6) — core differentiator
7. 🟠 `dynamic = 'force-static'` + `dynamicParams = false` on all `[slug]` routes (2.4)
8. 🟠 Differentiate title/description formulas per taxonomy (2.2)
9. 🟠 Build cross-taxonomy `relatedSlugs` internal linking (2.1)
10. 🟠 Dynamic OG images per route (2.3)
11. 🟠 Add `/api/` disallow to robots.ts (4.1) + verify rendered `<head>` (4.7)
12. 🟡 Everything else in Sections 4 and 7 (metadataBase already done — skip 4.6)
