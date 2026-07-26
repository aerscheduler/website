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

Docker image → ECR (`aerscheduler-website`) via `.github/workflows/main.yml` on GitHub release.
