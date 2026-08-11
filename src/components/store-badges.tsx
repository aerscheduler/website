import { APP_STORE_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Official App Store badge (same asset as the previous marketing site).
 * Plain <img> because next/image's optimizer rejects SVGs by default.
 *
 * TODO(android): the Google Play badge lives just below, commented out. The
 * /brand/google-play-badge.png asset is intentionally still in the repo so
 * restoring it is uncomment-only.
 */
export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-opacity hover:opacity-90"
        aria-label="Download on the App Store"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG badge; optimizer blocks SVGs */}
        <img
          src="/brand/app-store-badge.svg"
          alt="Download on the App Store"
          width={140}
          height={42}
          className="h-[42px] w-auto"
        />
      </a>
      {/* TODO(android): restore alongside PLAY_STORE_URL in lib/site.ts
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-opacity hover:opacity-90"
        aria-label="Get it on Google Play"
      >
        <img
          src="/brand/google-play-badge.png"
          alt="Get it on Google Play"
          width={150}
          height={56}
          className="h-[56px] w-auto"
        />
      </a>
      */}
    </div>
  );
}
