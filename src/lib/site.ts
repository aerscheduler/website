/** Marketing site constants — app.aerscheduler.com is the product host. */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.aerscheduler.com";

export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/aerscheduler/id6444074155";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aerscheduler.app&hl=en_US&gl=US";

export const PRICE_PER_AIRCRAFT = 20;
export const TRIAL_DAYS = 14;

export const SITE_NAME = "AerScheduler";
export const SITE_TAGLINE = "The command deck for your flight school.";
export const SUPPORT_EMAIL = "support@aerscheduler.com";
