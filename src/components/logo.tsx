import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="AerScheduler home"
    >
      <Image
        src={onDark ? "/brand/logo-white.png" : "/brand/logo-blue.png"}
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
