import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Official store badges. Plain <img> because next/image's optimizer rejects SVGs by default.
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
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-opacity hover:opacity-90"
        aria-label="Get it on Google Play"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- PNG badge; keep in lockstep with the App Store asset */}
        <img
          src="/brand/google-play-badge.png"
          alt="Get it on Google Play"
          width={150}
          height={56}
          className="h-[56px] w-auto"
        />
      </a>
    </div>
  );
}
