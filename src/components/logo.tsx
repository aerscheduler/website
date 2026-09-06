import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The two-tone mark. Filenames are historical and inverted from the surface
 * they belong on:
 *
 * - `/brand/logo-white.png` - blue arch + navy wing. Use on light backgrounds.
 * - `/brand/logo-blue.png` - blue arch + white wing. Use on dark backgrounds;
 *   that white wing is what vanishes on a white page.
 */
const LOGO_ON_LIGHT = "/brand/logo-white.png";
const LOGO_ON_DARK = "/brand/logo-blue.png";

export function Logo({
  className,
  onDark = false,
  onClick,
}: {
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="AerScheduler home"
      onClick={onClick}
    >
      <Image
        src={onDark ? LOGO_ON_DARK : LOGO_ON_LIGHT}
        alt=""
        width={32}
        height={32}
        className="size-8 object-contain"
        priority
      />
      <span
        className={cn(
          "text-[15px] font-semibold tracking-tight",
          onDark ? "text-white" : "text-foreground"
        )}
      >
        AerScheduler
      </span>
    </Link>
  );
}
