# O'Brien customer portal demonstration

Static GitHub Pages presentation portal. It uses simulated browser-only accounts and localStorage. It is not production authentication and must not contain confidential documents.

## Demo accounts

- Group manager: `group@demo.obrienac.com` / `MorganDemo!`
- Location manager with all seven proposal locations: `manager@demo.obrienac.com` / `LocationDemo!`
- O'Brien administrator: `admin@demo.obrienac.com` / `ObrienDemo!`

## Documents

No customer PDFs are committed. Use **Select local PDF** during the presentation. The browser creates a local object URL; the file is not uploaded. Local selections must be made again on another device or after a new browser session.

## Local test

Serve this directory with any static server, then open `index.html`. Hash routes support refreshes and the repository base path.

## GitHub Pages

The `deploy-portal-demo.yml` workflow uploads only `portal-demo/`. GitHub Pages must use **GitHub Actions** as its build source. The expected URL is `https://obrien-ac.github.io/obrien-customer-portal-demo/`.

## Future production path

Replace the account, data and document adapters with real authentication, server-enforced organization permissions, private object storage, shared status/audit records, invitations and notifications. Do not reuse the simulated credentials in production.
