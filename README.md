# Immanica HR Solutions — Render Static Site

This package is configured as a **Render Static Site**. It does not need Docker, Nginx, Node, Python, or a start command.

## Recommended deployment using `render.yaml`

1. Upload/push the contents of this folder to your GitHub repository.
2. In Render, choose **New > Blueprint**.
3. Connect the GitHub repository containing this `render.yaml` file.
4. Render will create `immanica-hr-static` with runtime `static` and publish `./site`.
5. After the new static URL works, move your custom domains from the old Web Service to this Static Site.

## Manual Render Static Site settings

If you prefer **New > Static Site** instead of Blueprint:

- Branch: `main`
- Root Directory: leave blank
- Build Command: `echo "Immanica static site - no build required"`
- Publish Directory: `site`
- Start Command: **none** (Static Sites do not use one)

## Custom domains

After the static site is live, add:

- `immanicahrsolutions.com`
- `www.immanicahrsolutions.com`

If Render says a domain is already in use, remove that domain from the old Web Service first, then add it to the new Static Site.

DNS can remain pointed at Render. For the apex/root domain, Render may instruct you to use `216.24.57.1`; for `www`, use the CNAME target Render shows for the **new static site**.

## Important

Do not deploy this package as a Render Web Service. Deploy it as a **Static Site** (or Blueprint with `runtime: static`). Static Sites are served by Render's CDN and do not use the free Web Service sleep/wake cycle.
