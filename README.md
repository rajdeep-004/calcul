# Basic React Calculator

A lightweight React calculator that works as static files with **no build step required**. This makes it easy to serve globally from CDN/edge infrastructure and handle very high concurrency.

## Why this scales to 1M+ concurrent users

- **Static delivery only**: serve files from CDN/edge caches.
- **No shared server state**: each user computes in their browser.
- **Horizontal scale by default**: edge nodes absorb traffic spikes.
- **Simple operations**: compute cost is client-side and negligible.

## Run locally

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.
