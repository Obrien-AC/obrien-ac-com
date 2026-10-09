# O'Brien Air Conditioning - obrien-ac.com

Independent static copy of the O'Brien Air Conditioning website for
`https://obrien-ac.com`.

## Independence

- Source repository: `Obrien-AC/obrien-ac-com`
- Hosting: GitHub Pages only
- Canonical origin: `https://obrien-ac.com`
- The original `https://obrienac.com` repository, hosting, DNS and deployment are separate.
- This repository has no Cloudflare or Vercel deployment workflow and cannot deploy
  to the original website.
- No redirect is configured between the two domains.

## Customer portal

Customer Login opens the bundled static presentation portal at
`/portal-demo/#/login`. The portal uses simulated browser-only accounts and
`localStorage`; it is not production authentication or private document storage.
Its sample proposal PDFs are public static assets.

## Development

```bash
npm install
npm run build
```

The Next.js static export is written to `out/`. The GitHub Pages workflow copies
`portal-demo/` into `out/portal-demo/` before deployment.

## Domain

The repository includes `public/CNAME` for `obrien-ac.com`. Configure the apex DNS
records at the domain provider to GitHub Pages, then enable **Enforce HTTPS** in
the repository Pages settings after GitHub validates the certificate.
