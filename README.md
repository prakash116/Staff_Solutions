# StaffHiring — Permanent Staff Hiring & Recruitment Website

A premium, responsive marketing website for a business that places **permanent employees** with restaurants, hotels, cafes, offices, retail stores and other commercial establishments.

All editable business content lives in JSON files under `src/data/`. The UI never hardcodes business copy, prices, navigation or contact details.

> **Frontend-only build.** There is no backend, database, authentication or email delivery. The contact form validates input and shows a clearly labelled demo confirmation. See [Known limitations](#known-limitations).

## Technology stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components by default) |
| Language | TypeScript 5.9, `strict` + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 4 (CSS-first config in `src/app/globals.css`) |
| Animation | Framer Motion 14 (`MotionConfig reducedMotion="user"`) |
| 3D | Three.js 0.186 — lazy-loaded hero scene with CSS fallback |
| Icons | Lucide React 1.x |
| State | React Context (`ThemeContext`) + local hooks |
| Fonts | Bricolage Grotesque (display) + Figtree (body) via `next/font` |

## Getting started

Requires Node.js 20.9+ (developed on Node 26) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (eslint-config-next, flat config)
npm run typecheck  # tsc --noEmit
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying — it drives canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml`.

## Project structure

```
src/
  app/                      Routes (App Router)
    layout.tsx              Root layout: fonts, theme script, providers, header, footer
    page.tsx                Home
    about/ services/ staff-categories/ staff-categories/[slug]/ contact/ privacy/ terms/
    not-found.tsx sitemap.ts robots.ts globals.css
  components/
    layout/                 SiteHeader (server) → Header (client), MobileMenu, Footer, SocialIcon, ThemeScript
    home/                   Hero, ValueProposition, StaffCategoriesSection, ServicesSection, PricingSection,
                            HowItWorks, WhyChooseUs, TestimonialsSection, FAQSection, CTASection
    staff/                  StaffCategoryCard, StaffCategoryGrid (search + filter, client)
    services/               ServiceCard (compact + full variants)
    pricing/                PricingTable (ledger), PricingCard (detail page)
    faq/                    FAQAccordion (client)
    contact/                ContactForm (client), ContactFormLoader (reads ?category=)
    legal/                  LegalPage template
    visual/                 HeroVisual (chooser), ThreeScene (lazy), HeroFallback (CSS)
    ui/                     Button, GlassCard, SectionHeading, SectionWrapper, PageContainer, PageHero,
                            AnimatedSection/StaggerGroup/StaggerItem, Icon/IconBadge, Badge, SampleNotice, ThemeToggle
  context/ThemeContext.tsx  Theme state + persistence
  hooks/useTheme.ts
  providers/AppProviders.tsx
  data/                     *.json — ALL editable content
  lib/
    data.ts                 Typed selectors over the JSON (the only place that imports it)
    view-models.ts          Server-side formatting for client components
    formatters.ts           INR currency (Indian numbering), salary ranges, copyright
    validation.ts           Contact form rules
    contact-submission.ts   Single integration point for a future API
    seo.ts site-url.ts icons.ts cn.ts theme-constants.ts
  types/                    TypeScript interfaces for every data file
public/images/branding/     Logo mark (replace with the real logo)
```

## Editing content (JSON)

| File | What it controls |
| --- | --- |
| `site.json` | Brand name, logo, description, contact details, social links, `demoMode`, placeholder notice |
| `navigation.json` | Header links and the header CTA |
| `home.json` | Every homepage section's copy (hero, value proposition, how-it-works steps, CTAs…) |
| `about.json` | About page content |
| `services.json` | Service list (name, descriptions, business types, linked category IDs) |
| `staff-categories.json` | Staff category list |
| `pricing.json` | Currency, disclaimer, labels and per-category budget rows |
| `testimonials.json` | Testimonials; `enabled: false` hides the section, `isSample: true` labels it as preview |
| `faq.json` | FAQ accordion items |
| `contact.json` | Contact page copy, form labels, select options |
| `footer.json` | Footer description, column titles, legal links, copyright template |
| `seo.json` | Default + per-page titles/descriptions, OG image path, Twitter handle |
| `legal.json` | Privacy and Terms page content |

Every list item supports `active` (hide without deleting) and most support `featured` (show on the homepage). Optional fields (`image`, `notes`, `longDescription`, `typicalResponsibilities`, `whatsapp`, `line2`) can be omitted or set to `null` — the UI falls back gracefully.

TypeScript checks each file against its interface in `src/types/`; `npm run typecheck` will fail if a required field is missing or mistyped.

### Add a staff category

1. Add an object to `categories` in `src/data/staff-categories.json` with a unique `id` and URL-safe `slug`.
2. Choose an `icon` name that exists in `src/lib/icons.ts` (add a Lucide import there if you need a new one).
3. Optionally add a pricing row (below) and reference it via `pricingId`, or set `pricingId: null` to show "Budget discussed per requirement".
4. Optionally list the category's `id` in a service's `categoryIds` in `services.json`.

The detail page `/staff-categories/<slug>` and sitemap entry are generated automatically.

### Update prices

Edit `src/data/pricing.json`. Each row has:

- `salaryMin` / `salaryMax` — indicative monthly salary paid **by the business to the employee** (either may be `null`).
- `placementFee` — the recruitment fee charged separately. Leave `null` until confirmed; the UI then shows "On request" and never computes a fee.
- `dailyRate` — optional per-day booking rate (currently chef ₹1,500 and waiter ₹1,000). `null` shows "Not offered".
- `isEstimate` — `true` renders the "Estimate" marker; set `false` once confirmed.
- `notes` — short free text under the role name.

Currency formatting uses `Intl.NumberFormat("en-IN")`, so INR values use the Indian numbering system (₹1,00,000).

### Replace images

Put files under `public/images/staff/`, `public/images/services/` or `public/images/branding/` and reference them from JSON, e.g. `"image": "/images/staff/chef.webp"`. Cards render the image via `next/image` when present and fall back to the icon when `null`. Replace `public/images/branding/logo-mark.svg` with the real logo mark (or set `logo.mark` to `null` for a gradient placeholder). To add an Open Graph image, place it in `public/images/branding/` and set `seo.json → default.ogImage`.

### Update contact information

Edit `site.json → contact` (email, phone, WhatsApp, address, hours) and `site.json → social`. These feed the footer and the Contact page. Set a social link's `active` to `false` to hide it.

### Modify theme colors

Brand and semantic tokens are defined once in `src/app/globals.css`:

- Fixed brand values: `--brand-jade-black`, `--brand-cerulean`, `--brand-neon-rose`.
- Light-theme semantic tokens under `:root`, dark-theme under `[data-theme="dark"]` (`--background`, `--foreground`, `--primary`, `--accent`, `--surface`, `--border`, `--muted`, …).
- The `@theme inline` block maps those to Tailwind utilities (`bg-background`, `text-primary-text`, `border-border`, `rounded-card`, `shadow-glass`, …), so changing a CSS variable updates every component.

Theme is applied via `data-theme` on `<html>`, set before paint by `ThemeScript` and persisted in `localStorage` under `sh-theme`.

## Connecting a backend later

The JSON files are **static frontend data** compiled into the build — they are not a database or admin panel. The architecture is designed so the data source can be swapped without rewriting the UI:

1. **Data access is centralised** in `src/lib/data.ts`. Components call selectors such as `getStaffCategories()` or `getPricingForCategory()`. Replace the JSON imports with `fetch()` calls (make the selectors `async` and `await` them in Server Components) and nothing else changes.
2. **Types are the contract.** Keep your API responses shaped like the interfaces in `src/types/` (or map them in `data.ts`).
3. **Contact form submission** has a single integration point: `src/lib/contact-submission.ts → submitContactRequest()`. Replace the demo body with a `fetch("/api/contact", …)` (or a Route Handler / Server Action) and return `{ ok: true, mode: "live" }`. Then update `contact.json → form.demoNotice/successMessage` to remove the demo wording.
4. **Site URL** comes from `NEXT_PUBLIC_SITE_URL`.

## Known limitations

- **No backend.** The contact form validates and shows a demo-mode confirmation; nothing is sent or stored.
- **Sample content.** Company details, address, phone, prices, testimonials and legal pages are placeholders marked with a visible "sample content" notice while `site.json → demoMode` is `true`. Set it to `false` after replacing the content.
- **No real images yet.** All `image` fields are `null`; cards use icons until assets are supplied.
- **3D hero** renders only on screens ≥ 768px with WebGL available and no reduced-motion preference; otherwise the CSS card composition is shown. Two-finger/touch parallax is intentionally disabled.
- **Placement fees** are not configured (`null`) and display as "On request" until real figures are entered.
- No analytics, cookie consent, i18n or CMS integration.

## Performance notes

Lighthouse 13 against `next build && next start` (Oct 2026):

- **Desktop:** 100 / 100 / 100 / 100 (Performance, Accessibility, Best Practices, SEO) on every audited page.
- **Mobile:** Accessibility, Best Practices and SEO 100; Performance 82–95 depending on page and throttling mode, with CLS 0 and LCP equal to FCP (the limiting factor is first paint over simulated slow 4G, not a late-rendering element).

Decisions that keep it there — worth knowing before changing them:

- The hero entrance is CSS keyframes (`hero-rise` / `hero-enter`), not Framer Motion, and the headline/lead paragraph only translate (no opacity fade). Chrome delays the LCP timestamp of text that fades in from `opacity: 0`, and a JS-driven entrance cannot start until hydration finishes.
- Scroll reveals (`AnimatedSection`, `StaggerGroup`) are CSS transitions driven by `useReveal`: content is visible in the server HTML and only elements below the first viewport are hidden, in one batched layout read before any DOM write. Framer Motion is used only for exit animations (mobile menu, FAQ, form alert) via `LazyMotion` + `m`.
- The Three.js hero loads after `requestIdleCallback`, only on screens ≥ 768px, and uses `MeshStandardMaterial` (cheaper shader than Physical).
- `Bricolage Grotesque` is loaded with the weight axis only; adding `opsz`/`wdth` axes triples the preloaded font file.
- `experimental.inlineCss` was tested and rejected: Next duplicates the inlined stylesheet inside the RSC payload, growing the HTML ~2.5×.
#   S t a f f _ S o l u t i o n s  
 