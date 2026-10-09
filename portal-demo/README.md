# O'Brien customer portal demonstration

Static GitHub Pages presentation portal. It uses simulated browser-only accounts and localStorage. It is not production authentication and must not contain confidential documents.

## Demo accounts

- Group manager: `group@demo.obrienac.com` / `MorganDemo!`
- Location manager with all seven proposal locations: `manager@demo.obrienac.com` / `LocationDemo!`
- O'Brien administrator: `admin@demo.obrienac.com` / `ObrienDemo!`

## Documents

The repository includes the approved proposal PDFs and clearly labeled BMW of Coconut Creek demonstration reports used by the portal. Because GitHub Pages is public hosting, these files are publicly retrievable and must not contain confidential information. The admin demo also supports selecting a local PDF for browser-only preview; local selections are never uploaded and must be reselected in another browser session.

## Local test

Serve this directory with any static server, then open `index.html`. Hash routes support refreshes and the repository base path.

## GitHub Pages

The root `deploy-pages.yml` workflow builds the copied website and packages this directory at `/portal-demo/`. GitHub Pages uses **GitHub Actions** as its build source. On the configured production domain, the login route is `https://obrien-ac.com/portal-demo/#/login`.

## Future production path

Replace the account, data and document adapters with real authentication, server-enforced organization permissions, private object storage, shared status/audit records, invitations and notifications. Do not reuse the simulated credentials in production.
