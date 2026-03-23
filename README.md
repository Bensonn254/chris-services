# Chef Chrispine Catering Website

A modern, responsive portfolio site for Chef Chrispine's catering and private chef services in Nairobi.

## Features

- Responsive layout for desktop, tablet, and mobile
- Hero slideshow and gallery
- Signature dishes section
- FAQ with accessible toggles
- WhatsApp and call-to-book CTAs
- Netlify form with honeypot and thank-you page
- Cookie preferences panel with analytics consent control
- Clean URLs like `/services` and `/contact`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Local Development (Clean URLs)

Clean URLs need a server that falls back to `index.html`.

```bash
npm run dev
```

This starts a small local server on `http://127.0.0.1:5501` that supports `/home`, `/gallery`, etc.

Note: If you use Live Server and refresh a clean URL, you may get a 404. The dev server fixes that.

## Deployment (Netlify)

Netlify clean URLs are handled by the `_redirects` file:

```
/*    /index.html   200
```

Make sure this file is deployed so `/contact` and other paths resolve properly.

## Forms

The contact form uses Netlify Forms. Submissions appear in the Netlify dashboard.

Form success redirects to:

- `thank-you.html`

## Customization

- Update social links and phone in `index.html`
- Update menu items in the Signature Dishes section
- Replace images in `images/`
- Update Google Analytics ID in the `gtag.js` block
- Update Open Graph tags if the domain or share image changes

## Project Files

- `index.html` - Main page
- `styles.css` - Global styles
- `thank-you.html` - Form confirmation page
- `server.js` - Local dev server with SPA fallback
- `_redirects` - Netlify clean URL routing
- `favicon.svg`, `icon-192.svg`, `icon-512.svg` - App icons

## License

Copyright 2026 Chrispine Catering. All rights reserved.
