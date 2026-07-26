/**
 * Marketing site constants.
 *
 * APP_URL is where Google OAuth and signup/login CTAs land. Points at app —
 * once console is cut over onto that host, the handoff just works. Override
 * with NEXT_PUBLIC_APP_URL for local/staging against console if needed.
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.aerscheduler.com";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.aerscheduler.com";

export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

/**
 * Full-page Google OAuth via the API (no popup). Lands on APP_URL after Google
 * signs the user in — swapping APP_URL is all it takes to retarget console→app.
 */
export const GOOGLE_SIGNIN_URL = `${API_URL}/auth/google/start?return_to=${encodeURIComponent(APP_URL)}`;

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/aerscheduler/id6444074155";

/**
 * TODO(android): Android is off the marketing site until the app is back on
 * Google Play. The old Play developer account was closed for inactivity in
 * Oct 2024 and this listing now 404s, so every Android claim on the site was
 * unshippable. Search the repo for TODO(android) to restore: uncomment this
 * URL (the package name may change if com.aerscheduler.app can't be reclaimed),
 * re-add the Play badge in components/store-badges.tsx, and put "& Android"
 * back into the copy and JSON-LD.
 */
// export const PLAY_STORE_URL =
//   "https://play.google.com/store/apps/details?id=com.aerscheduler.app&hl=en_US&gl=US";

export const PRICE_PER_AIRCRAFT = 20;
export const TRIAL_DAYS = 14;

export const SITE_NAME = "AerScheduler";
export const SITE_TAGLINE = "The command deck for your flight school.";
export const SITE_URL = "https://www.aerscheduler.com";
export const SUPPORT_EMAIL = "support@aerscheduler.com";

/** Longer default meta description for SEO. */
export const SITE_DESCRIPTION =
  "Flight school management software for aircraft scheduling, billing, maintenance, and compliance. Native iOS app. Self-serve from $20/mo per aircraft.";
