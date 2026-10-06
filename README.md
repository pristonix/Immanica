# Immanica HR Solutions Website

Responsive static corporate website with a working auto-play carousel, current EEC 2026 content, Labour Code-aware service descriptions, transparent logo, mobile navigation and Docker support.

The duplicate full-screen startup logo/splash has been removed so the site opens directly into the branded header and hero.

## Run with Docker

```bash
docker compose up -d --build
```

Open http://localhost:8080

## Run without Docker

Open `index.html` directly, or serve the folder through any static web server.

Startup branding fix: the header now uses compact logo artwork without the embedded slogan, and “Empowering People. Elevating Business.” is rendered once as a dedicated header tagline to prevent duplicate startup display.
