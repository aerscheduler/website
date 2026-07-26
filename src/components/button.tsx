import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-semibold tracking-tight transition-all duration-200",
        "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-[15px]",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-sm hover:bg-[#1557b0] hover:-translate-y-px",
        variant === "secondary" &&
          "border border-border bg-white text-foreground shadow-sm hover:bg-muted hover:-translate-y-px",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        variant === "dark" &&
          "bg-brand-surface text-white shadow-sm hover:bg-brand-surface-2 hover:-translate-y-px",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
