# File System Traversal Guide

This guide maps each page and component to its exact source file to eliminate multi-step chain searches and unnecessary token expenditure.

---

## Page & Component Ownership Map

### 1. Root Application Shell

- **[src/app/layout.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/app/layout.tsx)**: Root HTML layout. Configures fonts (Space Grotesk), metadata, OpenGraph, JSON-LD schema, viewport `themeColor`, and conditional Vercel Analytics for Cloudflare deployments.
- **[src/app/globals.css](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/app/globals.css)**: Tailwind CSS v4 entry point, custom theme tokens (`--color-royal-purple`, `--color-electric-violet`, `--color-deep-midnight`), glassmorphism utilities, and base background resets.
- **[src/app/providers.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/app/providers.tsx)**: Client-side context and toast providers (Notistack SnackbarProvider).

### 2. Main Page (`/`) — [src/app/page.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/app/page.tsx)

The single-page portfolio coordinates the vertical sections and manages active scroll-spy state:

- **Section `#hero`**  
  Controlled by **[src/components/Hero.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/Hero.tsx)**  
  _Features_: Bio, career titles, quick email-copy action button with clipboard feedback, social profile links (GitHub, Twitter/X, Quora), down-arrow scroll trigger.

- **Section `#skills`**  
  Controlled by **[src/components/TechStackGrid.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/TechStackGrid.tsx)**  
  _Features_: Full-width edge-to-edge bento grid with crosshair plus markers, official SVG tech stack icons, and hover tooltips.

- **Section `#backend`**  
  Controlled by **[src/components/PersonalProjects.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/PersonalProjects.tsx)**  
  _Features_: Personal engineering builds and prototypes (Kolapay, SafeRoute Signal, Mini Assessment Engine, Sort X, Edupeerhub API, Android TV Remote, Mailing API). Interactive spotlight border cards, pill tags, and pagination ("Load More").

- **Section `#freelance`**  
  Controlled by **[src/components/FreelanceWork.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/FreelanceWork.tsx)**  
  _Features_: Commercial client work (KDK Phones & Gadgets, Klaro.ng). Cards with internal pill tags, responsive typography, and spotlight hover borders.

- **Section `#contact`**  
  Controlled by **[src/components/ContactSection.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/ContactSection.tsx)** and **[src/components/ContactForm.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/ContactForm.tsx)**  
  _Features_: Direct email copy widget, quick links, and client-side contact submission form with input validation and feedback alerts.

### 3. Persistent Overlays & Global Widgets

- **[src/components/Navigation.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/Navigation.tsx)**: Floating glass navigation pill with scroll spy indicator and mobile drawer.
- **[src/components/InteractiveBackground.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/InteractiveBackground.tsx)** & **[src/components/DotGrid.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/DotGrid.tsx)**: Fixed WebGL interactive canvas rendering interactive ambient particle grid with pointer shockwave physics.
- **[src/components/StatusIndicator.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/StatusIndicator.tsx)**: Fixed health status indicator polling `/api/status` every 90 seconds.
- **[src/components/BackToTop.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/BackToTop.tsx)**: Smooth scroll-to-top trigger button.
- **[src/components/KeepAndroidOpenPopup.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/KeepAndroidOpenPopup.tsx)**: Fixed bottom notification card supporting the Keep Android Open movement.
- **[src/components/SpotlightBorder.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/SpotlightBorder.tsx)**: Reusable mouse-tracking reactive border highlight component.
- **[src/components/Tooltip.tsx](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/components/Tooltip.tsx)**: Reusable, zero-dependency dark frosted glass tooltip.

### 4. Server API Proxy Handlers

- **`POST /api/contact`** — **[src/app/api/contact/route.ts](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/app/api/contact/route.ts)**: Forwards contact messages to `https://mail.mikatech.top/api/mail` with the server-side `authv1` secret key.
- **`GET /api/status`** — **[src/app/api/status/route.ts](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/app/api/status/route.ts)**: Queries `https://mail.mikatech.top/api` health check, forwards errors cleanly, and handles upstream logging.

### 5. Services & Client Helpers

- **[src/services/api.ts](file:///home/kendoestech/Documents/Github/portfolio-frontend/src/services/api.ts)**: Client-side fetch helper for the contact form.

---

## Directory Structure & Traversal Lanes

```text
portfolio-frontend/
├── .agents/
│   ├── rules/
│   │   └── .md                  # User agent rules & guidelines
│   ├── antipatterns.md          # Prohibited patterns ledger
│   └── skills/                  # Specialized project skills (ponytail, antislop, etc.)
├── public/
│   ├── logos/                   # Official SVG/PNG tech stack logos
│   ├── fonts/                   # Local fonts
│   ├── favicon.png              # Site favicon
│   ├── llms.txt                 # LLM discovery information
│   ├── robots.txt               # Crawler directives
│   └── sitemap.xml              # SEO XML sitemap
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts     # POST contact proxy
│   │   │   └── status/
│   │   │       └── route.ts     # GET status proxy
│   │   ├── globals.css          # Tailwind CSS styles & design tokens
│   │   ├── layout.tsx           # Root layout & head metadata
│   │   ├── page.tsx             # Home single-page layout
│   │   └── providers.tsx        # Toast/Notistack provider
│   ├── assets/                  # High-res client logos (kdk-logo.png, klaro-logo.png)
│   ├── components/              # Vertical UI section components (see map above)
│   └── services/                # API client helpers
├── env.d.ts                     # Cloudflare worker environment types
├── open-next.config.ts          # OpenNext build configuration
├── package.json                 # Dependencies and build/deploy scripts
├── wrangler.jsonc               # Cloudflare Workers & Pages deployment configuration
└── fs-traversal-guide.md        # This file
```
