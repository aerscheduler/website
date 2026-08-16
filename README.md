# AerScheduler marketing site

Next.js (App Router) + Tailwind. Design tokens match the React product (`#1967D2`).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Env

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_APP_URL` | `https://app.aerscheduler.com` | Signup / sign-in destination |

## Pages

- `/` - landing
- `/product` - product deep-dive + mobile
- `/pricing` - per-aircraft pricing
- `/integrations` - Stripe / Google Calendar / QuickBooks
- `/features` - feature index + per-feature pages
- `/migrating/my-fbo` - MyFBO switching guide
- `/privacy` - privacy policy (canonical; referenced by the apps)
- `/terms-and-conditions` - terms (canonical; referenced by the apps)
- `/terms` - permanent redirect to `/terms-and-conditions`

## Deploy

Vercel, on push to `main`. There is no GitHub Actions workflow: `.github/workflows/`
is empty, and the Docker-image-to-ECR release flow this section used to describe went
away with the v3.0.0 marketing-site rebuild.

Pages are prerendered and served from the edge with a 300s stale time
(`x-nextjs-prerender: 1`, `x-nextjs-stale-time: 300`), so a change can take a few
minutes to appear even after the deployment is Ready.

Verifying a deploy actually landed: fetch the page and check `etag` and `age` across a
couple of requests. A fixed etag with a climbing age past 300s means you are still on
the old deployment, not a slow revalidation. A cache-busting query string proves
nothing here, because query strings are not part of the cache key for a prerendered
route.
