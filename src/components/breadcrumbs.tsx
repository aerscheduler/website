import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const withHome: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(withHome)} />
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {withHome.map((item, index) => {
            const last = index === withHome.length - 1;
            return (
              <li key={item.href} className="inline-flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="size-3.5 shrink-0 opacity-50" aria-hidden />
                )}
                {last ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-foreground">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
