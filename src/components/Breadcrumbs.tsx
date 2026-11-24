import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbCrumb } from './SeoHead';

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-xs font-medium ${
          dark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 ${dark ? 'text-slate-400' : 'text-slate-400'}`}
                  aria-hidden="true"
                />
              )}
              {isLast || !item.path ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={dark ? 'text-white font-semibold' : 'text-[#1a2a8c] font-semibold'}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors hover:underline ${
                    dark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#1a2a8c]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
