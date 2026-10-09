# Independent deployment audit

Authoritative origin for this repository: `https://obrien-ac.com`

Source snapshot: `Obrien-AC/obrien-ac-website` commit
`0e4af955a65fa79420e9836c8abc638471fe076b`.

This copy preserves the source website design and assets while replacing its
Cloudflare deployment with GitHub Pages. The original Cloudflare Worker, Vercel
redirect configuration, D1/R2 portal code and original-domain deployment workflow
are intentionally excluded.

Customer Login stays on the copied site at `/portal-demo/#/login`. The bundled
portal is a static demonstration and does not provide server-enforced authentication
or private PDF storage. Membership requests use FormSubmit because GitHub Pages
does not execute server APIs.

No redirect to or from `obrienac.com` is configured. The two repositories and
deployments do not synchronize.
