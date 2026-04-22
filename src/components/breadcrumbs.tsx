import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-text-soft">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link to={item.to} params={item.params} className="font-medium hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-brand-teal" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-text-soft/60" />}
          </span>
        );
      })}
    </nav>
  );
}
