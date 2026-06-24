# CannaDabs 805 — Sovereign Web Presence

**CannaTrav · @cannadabs_805 · Central Coast, CA**

> "Where rosin is religion and the 805 terroir speaks in terpenes."

---

## Architecture

**Dual-lane site** — Gallery (educational, NFS) + Merch Engine (Stripe-safe e-commerce):

```
cannadabs805.com
├── index.html          → Entry point, age gate, smoke intro, full site
├── styles.css          → Full design system (Void Black / Acid Chartreuse / Neon Pink / Ice Blue)
├── main.js             → Age gate logic, smoke particle system, UI interactions
└── logo.png            → CannaDabs 805 brand mark
```

## Stack

- **Pure HTML/CSS/JS** — Zero frameworks. Sovereign infrastructure.
- **No build step required** — Drop on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
- **JSON-LD Schema** — Organization/LifestyleBrand typing. LLM-seeded. Merchant-safe.
- **Stripe-Compatible** — Cannabis education gallery ring-fenced from apparel e-commerce

## Features

- **Age Gate** — 21+ confirmation with session storage
- **Smoke Intro** — Canvas particle system, logo dissolves into smoke on load
- **Terpene Ticker** — Financial-terminal-style strain data feed (the signature element)
- **Resin Gallery** — Terpene bar charts, THCA readouts, process chains — NFS, no cart
- **Merch Grid** — 5-SKU Drop SS01: 2x Tees, Hoodie, Hat, Dab Mat
- **Responsive** — Mobile-first breakpoints

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#0A0A0A` | Base background |
| `--acid` | `#C8FF00` | Primary accent, rosin energy |
| `--pink` | `#FF3CAC` | Secondary, graffiti echo |
| `--ice` | `#00E5FF` | Tertiary, ice water hash |
| `--bone` | `#F0EDE6` | Primary text |
| Bebas Neue | Display | Headers, hero, merch |
| DM Sans | Body | Readable, dyslexia-friendly |
| Space Mono | Data | Terpene readouts, ticker |

## Deploy

```bash
# Netlify / Vercel / GitHub Pages
# Just push — no build config needed

# Or serve locally:
npx serve .
```

## Sovereignty Notes

- No Wix. No Shopify. No rented land.
- Payment processing: **Stripe** — apparel descriptions are clean, zero cannabis language
- Cannabis content: **Educational only** — JSON-LD schema identifies as LifestyleBrand
- "NFS" framing on gallery: regulatory defense, platform compliance

---

**Built by COAI (Chaotically Organized AI) · coaibakersfield.com**  
*Where Chaos Meets Clarity*
