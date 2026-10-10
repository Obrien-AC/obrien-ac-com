# Independent website copy inventory

Inventory date: October 8, 2026

## Authoritative source

- Original repository: `Obrien-AC/obrien-ac-website`
- Source commit copied: `0e4af955a65fa79420e9836c8abc638471fe076b`
- Independent repository: `Obrien-AC/obrien-ac-com`
- Original repository, deployment and `obrienac.com` DNS were not modified.

The original source contains three public application routes:

| Route | Source | Independent behavior |
| --- | --- | --- |
| `/` | `app/(portal)/page.tsx` | Full static homepage and all anchored sections |
| `/membership/` | `app/membership/page.tsx` | Full membership experience; form uses the existing FormSubmit fallback because GitHub Pages cannot run `/api/membership` |
| `/portal/` | `app/portal/page.tsx` plus Cloudflare Worker API | Replaced by the safe static demo at `/portal-demo/#/login`; Customer Login links point there |

The homepage includes the utility/header navigation, hero, service explorer, service strip, standards section, replacement experience, project highlights, service area/location, calls to action and Nordwerk LLC credit. The membership route includes residential and commercial plans, benefits, enrollment/request forms, navigation, contact links and the same development credit.

## Assets and behavior

- 33 original public files totaling approximately 14 MB were inventoried.
- Website images, logos, icons, project photography and SVG marks are copied into the independent repository. The copied site does not load them from `obrienac.com`.
- React components, styling, fonts, transitions, interactive service/replacement tabs, project controls, menus and responsive breakpoints are source copies, with only domain, hosting and backend substitutions changed.
- Telephone, email, map and intentional attribution links remain external and functional.
- Canonical metadata, Open Graph, robots and sitemap use `https://obrien-ac.com`.

## Portal data inventory

The original repository has two distinct portal implementations:

1. A Cloudflare Worker portal using D1 for records, R2 for private PDFs and server-side cookie authentication.
2. A static presentation portal using browser `localStorage` and public demonstration files.

The available local D1 development database contains:

| Record type | Available count |
| --- | ---: |
| Organizations | 1 |
| Locations | 7 |
| Users | 2 |
| User-to-organization assignments | 1 |
| User-to-location assignments | 0 |
| Documents | 7 |
| Proposal versions | 7 |
| Agreements | 0 |
| Equipment records | 0 |
| Service visits | 0 |

User password hashes, salts, sessions and audit IP data were not copied or published. The Cloudflare configuration still contains a placeholder database ID, so no remote production D1 or R2 export was available from source configuration.

The independent static portal contains the safe presentation dataset:

- 1 demonstration organization and 9 locations.
- 3 simulated browser-only roles with all role/location mappings defined in source.
- 7 proposal records with versions, prices and statuses. Confidential proposal PDFs are selected locally and are not committed or published.
- 8 BMW of Coconut Creek demonstration equipment units.
- 5 clearly labeled BMW demonstration documents covering equipment, condition report, agreement, upcoming service and service history.
- 4 initial demonstration service appointments, activity records, local decisions and local unit service requests.
- Location imagery for all 9 authorized locations.
- 2 supplied Arrigo condition reports with verified dealership logos and building imagery, available from their location workspaces.
- Browser-local JSON export/import for statuses, activity, appointments, decisions and requests.

Local PDF selections are deliberately excluded from exports and remain only in the selecting browser. GitHub Pages cannot provide secure authentication, private PDFs, a shared database, server-side access control or real dispatch. Those functions require a protected backend and private object storage.

## Deployment isolation

The independent repository has its own GitHub Pages workflow and custom-domain setting for `obrien-ac.com`. Cloudflare, Vercel and original-site deployment configuration is excluded, so a push to this repository cannot deploy or overwrite `obrienac.com`.
