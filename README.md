# Clean Cut Canterbury — Property Services Website

Official website for **Clean Cut Canterbury Property Services** — lawn & garden care and complete cleaning services (window, carpet, commercial, residential and post-build) across Canterbury, New Zealand.

## Live site
**https://cleancutcanterbury.co.nz** — served via GitHub Pages from this repository.

The custom domain is set by the `CNAME` file in the repo root. DNS is managed at Porkbun:
the apex points at GitHub Pages (4 A + 4 AAAA records) and `www` is a CNAME to
`surinder-oss.github.io`. Any push to `main` redeploys the live site.

## Structure
```
index.html          Single-page site (HTML + CSS + JS, no build step)
./
  logo.png          Colour logo (transparent background)
  logo-white.png    White logo for dark footer
  logo-card.jpg     Brand reference
  favicon.png       Site icon
```

## Features
- Fully responsive, mobile-first design
- Animated hero scene (lawnmower cutting grass, sparkling windows, sun, clouds, birds)
- Animated service icons, scroll reveals, counters and a trust marquee
- Six services: Lawn & Garden Care, Window Cleaning, Carpet Cleaning, Commercial, Residential, Post-Build
- Free-quote form that opens a pre-filled email to `cleancutcanterbury@gmail.com`
- Click-to-call, WhatsApp and email quick actions
- SEO meta + Open Graph tags

## Editing
Everything is in `index.html`. No frameworks or build tools required — edit and refresh.

## Contact
- Tiger: 0210 637 580
- Mani: 021 471 573
- Email: cleancutcanterbury@gmail.com
- Facebook: https://www.facebook.com/people/CleanCut-Canterbury/61579174259259/
