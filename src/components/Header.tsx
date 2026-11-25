import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/productsConveyors';
import { getProductsByCategory, getProductPath } from '../data/cmsRegistry';
import { TURNKEY_SOLUTIONS, INDUSTRIES } from '../data/turnkeyAndIndustries';
import { ENGINEERING_SERVICES, EXPORT_PAGES } from '../data/servicesExportProjectsResources';

type MenuKey = 'products' | 'turnkey' | 'industries' | 'services' | 'export';
type Item = { slug: string; title: string; shortBenefit: string };
type SimpleKey = Exclude<MenuKey, 'products'>;

const MENUS: Record<SimpleKey, { all: string; path: string; base: string; headline: string; desc: string; cta: string; items: Item[] }> = {
  turnkey: { all: 'Turnkey Lines', path: '/turnkey-solutions', base: '/turnkey-solutions/', headline: 'Turnkey process and packaging lines', desc: 'One team accountable for the whole line, from design to commissioning.', cta: 'All turnkey lines', items: TURNKEY_SOLUTIONS },
  industries: { all: 'Industries', path: '/industries', base: '/industries/', headline: 'Industries served globally', desc: 'Regulated and high-throughput sectors, built to the standards that apply.', cta: 'All industries', items: INDUSTRIES },
  services: { all: 'Services', path: '/engineering-services', base: '/engineering-services/', headline: 'Engineering, 3D simulation and automation', desc: 'Layout design, throughput modeling and controls, done in-house in Chennai.', cta: 'All services', items: ENGINEERING_SERVICES },
  export: { all: 'Export', path: '/export-and-compliance', base: '/export-and-compliance/', headline: 'Export readiness, FAT and after-sales', desc: 'Compliance, witnessed testing, shipping and support for every destination.', cta: 'Export and compliance', items: EXPORT_PAGES },
};

const NAV: { label: string; to: string; key?: MenuKey }[] = [
  { label: 'About', to: '/about-us/' },
  { label: 'Products', to: '/products/', key: 'products' },
  { label: 'Turnkey Lines', to: '/turnkey-solutions/', key: 'turnkey' },
  { label: 'Industries', to: '/industries/', key: 'industries' },
  { label: 'Services', to: '/engineering-services/', key: 'services' },
  { label: 'Export', to: '/export-and-compliance/', key: 'export' },
  { label: 'Projects', to: '/projects/' },
  { label: 'Resources', to: '/resources/' },
  { label: 'Contact', to: '/contact-us/' },
];

const CSS = `
.vt-menu{animation:vt-menu .3s cubic-bezier(.2,.7,.2,1) both}
@keyframes vt-menu{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
.vt-fadein{animation:vt-fadein .25s ease-out both}
@keyframes vt-fadein{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.vt-menu,.vt-fadein{animation:none}}
`;

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeCatSlug, setActiveCatSlug] = useState(PRODUCT_CATEGORIES[0].slug);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  useEffect(() => { setOpenMenu(null); setMobileOpen(false); setMobileSection(null); }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false); } };
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); window.removeEventListener('scroll', onScroll); };
  }, []);

  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.slug === activeCatSlug) || PRODUCT_CATEGORIES[0];
  const activeProducts = getProductsByCategory(activeCategory.slug);
  const isActive = (to: string) => pathname.startsWith(to.replace(/\/$/, ''));

  return (
    <>
  {/* Utility bar (scrolls away normally, not sticky) */}
  <div className="hidden bg-[#1a2a8c] text-white xl:block">
    <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-2 text-xs">
      <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-300" /> ISO 9001 and CE ready · Exporting to 28+ countries from Chennai, India</p>
      <p className="flex items-center gap-5 text-blue-100">
        <span>24×6 remote PLC support</span>
        <Link to="/resources/" className="hover:text-white">Resources</Link>
        <Link to="/contact-us/" className="hover:text-white">Contact</Link>
      </p>
    </div>
  </div>

    <header
      ref={navRef}
      onMouseLeave={() => setOpenMenu(null)}
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-slate-200 ${scrolled ? 'shadow-[0_10px_30px_-14px_rgba(26,42,140,.35)]' : ''}`}
    >
      <style>{CSS}</style>

      {/* Main bar */}
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3`}>
        <Link to="/" className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-[#1a2a8c]" aria-label="V Tech Manufacturing Home">
          <img src="/assets/aistudio/logo__1__0c301533.png" alt="V Tech Manufacturing" className="h-16 w-auto object-contain" />
        </Link>

        <nav aria-label="Primary Navigation" className="hidden items-center gap-1 xl:flex">
          {NAV.map((n) => {
            const open = openMenu === n.key;
            const on = open || isActive(n.to);
            const cls = `group relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${on ? 'text-[#1a2a8c]' : 'text-slate-700 hover:text-[#1a2a8c]'}`;
            const bar = <span className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-[#1a2a8c] transition-transform duration-300 ${on ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />;
            return n.key ? (
              <button key={n.label} type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpenMenu(open ? null : n.key!)} onMouseEnter={() => setOpenMenu(n.key!)} className={cls}>
                {n.label} <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />{bar}
              </button>
            ) : (
              <Link key={n.label} to={n.to} onMouseEnter={() => setOpenMenu(null)} className={cls}>{n.label}{bar}</Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link to="/contact-us/" className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-[#1a2a8c] px-5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-[#14217a] hover:shadow-lg sm:inline-flex">
            Request a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#1a2a8c] hover:bg-blue-50 xl:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      {openMenu && (
        <>
          <div aria-hidden="true" onMouseEnter={() => setOpenMenu(null)} onClick={() => setOpenMenu(null)} className="vt-fadein absolute left-0 right-0 top-full -z-10 hidden h-screen bg-slate-900/25 xl:block" />
          <div className="vt-menu absolute left-0 right-0 top-full hidden border-t-2 border-t-[#1a2a8c] bg-white shadow-2xl xl:block">
            <div className="mx-auto max-w-[1400px] px-8 py-7">
              {openMenu === 'products' ? (
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-3 space-y-1.5">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const on = activeCatSlug === cat.slug;
                      return (
                        <button key={cat.slug} type="button" onMouseEnter={() => setActiveCatSlug(cat.slug)} onClick={() => setActiveCatSlug(cat.slug)} className={`relative flex w-full items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${on ? 'bg-blue-50 text-[#1a2a8c]' : 'text-slate-700 hover:bg-slate-50'}`}>
                          <span className={`absolute inset-y-0 left-0 w-1 bg-[#1a2a8c] transition-transform duration-300 ${on ? 'scale-y-100' : 'scale-y-0'}`} />
                          <span>{cat.shortTitle}</span>
                          <ArrowRight className={`h-4 w-4 transition-all duration-300 ${on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                        </button>
                      );
                    })}
                    <Link to="/products/" className="mt-3 inline-flex items-center gap-1.5 px-4 text-sm font-semibold text-[#1a2a8c] hover:underline">View all product categories <ArrowRight className="h-4 w-4" /></Link>
                  </div>

                  <div key={activeCategory.slug} className="vt-fadein col-span-5">
                    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                      <Link to={`/products/${activeCategory.slug}/`} className="text-base font-bold text-slate-900 hover:text-[#1a2a8c]">{activeCategory.title}</Link>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1a2a8c]">{activeProducts.length} systems</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-0.5">
                      {activeProducts.map((prod) => (
                        <Link key={prod.slug} to={getProductPath(prod)} className="group flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] text-slate-700 transition-all hover:translate-x-1 hover:bg-blue-50 hover:text-[#1a2a8c]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 transition-colors group-hover:bg-[#1a2a8c]" />{prod.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link to={`/products/${activeCategory.slug}/`} key={`img-${activeCategory.slug}`} className="vt-fadein group relative col-span-4 block min-h-[280px] overflow-hidden rounded-2xl">
                    <img src={activeCategory.image} alt={activeCategory.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0a1450]/95 via-[#0a1450]/40 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 block p-5 text-white">
                      <span className="block text-base font-bold leading-snug">{activeCategory.shortTitle}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-blue-100">{activeCategory.tagline}</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1a2a8c]">Explore category <ArrowRight className="h-3.5 w-3.5" /></span>
                    </span>
                  </Link>
                </div>
              ) : (
                (() => {
                  const m = MENUS[openMenu as SimpleKey];
                  return (
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-[#1a2a8c] p-6 text-white">
                        <div>
                          <h3 className="text-xl font-bold leading-tight">{m.headline}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-blue-100">{m.desc}</p>
                        </div>
                        <Link to={m.path + '/'} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a2a8c] hover:bg-blue-50">{m.cta} <ArrowRight className="h-4 w-4" /></Link>
                      </div>
                      <div className="col-span-9 grid grid-cols-3 gap-3">
                        {m.items.map((it) => (
                          <Link key={it.slug} to={`${m.base}${it.slug}/`} className="group relative rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1a2a8c] hover:bg-blue-50/60 hover:shadow-lg hover:shadow-blue-900/10">
                            <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-slate-300 transition-all group-hover:rotate-12 group-hover:text-[#1a2a8c]" aria-hidden="true" />
                            <p className="pr-6 text-sm font-bold text-slate-900 group-hover:text-[#1a2a8c]">{it.title}</p>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">{it.shortBenefit}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="vt-menu max-h-[calc(100vh-70px)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-5 xl:hidden">
          <div className="divide-y divide-slate-100">
            {NAV.map((n) => {
              if (!n.key) return <Link key={n.label} to={n.to} className={`block py-3.5 text-[15px] font-semibold ${isActive(n.to) ? 'text-[#1a2a8c]' : 'text-slate-800'}`}>{n.label}</Link>;
              const open = mobileSection === n.key;
              const links = n.key === 'products'
                ? PRODUCT_CATEGORIES.map((c) => ({ to: `/products/${c.slug}/`, label: c.title }))
                : MENUS[n.key as SimpleKey].items.map((i) => ({ to: `${MENUS[n.key as SimpleKey].base}${i.slug}/`, label: i.title }));
              return (
                <div key={n.label}>
                  <button type="button" aria-expanded={open} onClick={() => setMobileSection(open ? null : n.key!)} className={`flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold ${open || isActive(n.to) ? 'text-[#1a2a8c]' : 'text-slate-800'}`}>
                    {n.label}<ChevronDown className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="mb-3 space-y-0.5 border-l-2 border-blue-100 pl-4">
                        <Link to={n.to} className="block py-2 text-sm font-semibold text-[#1a2a8c]">View all {n.label.toLowerCase()}</Link>
                        {links.map((l) => (<Link key={l.to} to={l.to} className="block py-2 text-sm text-slate-700">{l.label}</Link>))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/contact-us/" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#1a2a8c] px-4 py-3.5 text-sm font-semibold text-white">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      )}
    </header>
    </>
  );
}