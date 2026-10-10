# O'Brien customer portal demonstration

Static GitHub Pages presentation portal. It uses simulated browser-only accounts and localStorage. It is not production authentication and must not contain confidential documents.

## Demo accounts

- Group manager: `group@demo.obrienac.com` / `MorganDemo!`
- Location manager with all nine portfolio locations: `manager@demo.obrienac.com` / `LocationDemo!`
- O'Brien administrator: `admin@demo.obrienac.com` / `ObrienDemo!`

## Documents

The repository includes proposal metadata and clearly labeled BMW of Coconut Creek demonstration reports. The supplied Arrigo CDJR Sawgrass replacement proposal and Arrigo CDJR Margate maintenance proposal are attached to their matching location workspaces beside the previously supplied condition reports. Other confidential customer proposal PDFs are not committed or published through GitHub Pages; select those locally for browser-only preview.

## Local test

Serve this directory with any static server, then open `index.html`. Hash routes support refreshes and the repository base path.

## GitHub Pages

The root `deploy-pages.yml` workflow builds the copied website and packages this directory at `/portal-demo/`. GitHub Pages uses **GitHub Actions** as its build source. On the configured production domain, the login route is `https://obrien-ac.com/portal-demo/#/login`.

## Future production path

Replace the account, data and document adapters with real authentication, server-enforced organization permissions, private object storage, shared status/audit records, invitations and notifications. Do not reuse the simulated credentials in production.
