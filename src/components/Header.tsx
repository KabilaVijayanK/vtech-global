import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/productsConveyors';
import { getProductsByCategory, getProductPath } from '../data/cmsRegistry';
import { TURNKEY_SOLUTIONS, INDUSTRIES } from '../data/turnkeyAndIndustries';
import { ENGINEERING_SERVICES, EXPORT_PAGES } from '../data/servicesExportProjectsResources';

type MenuKey = 'products' | 'turnkey' | 'industries' | 'services' | 'export' | null;

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCatSlug, setActiveCatSlug] = useState(PRODUCT_CATEGORIES[0].slug);
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const activeCategory =
    PRODUCT_CATEGORIES.find((c) => c.slug === activeCatSlug) || PRODUCT_CATEGORIES[0];
  const activeProducts = getProductsByCategory(activeCategory.slug);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark/Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#1a2a8c]"
          aria-label="V Tech Manufacturing Home"
        >
          <img
            src="/assets/aistudio/logo__1__0c301533.png"
            alt="V Tech Manufacturing"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Zone 2: Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-4 text-[13.5px] font-medium text-slate-700 xl:flex 2xl:gap-5"
        >
           <Link
            to="/about-us/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              pathname.startsWith('/about-us') ? 'font-semibold text-[#1a2a8c]' : ''
            }`}
          >
            About
          </Link>
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'products' ? null : 'products')}
            onMouseEnter={() => setOpenMenu('products')}
            className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              openMenu === 'products' || pathname.startsWith('/products')
                ? 'font-semibold text-[#1a2a8c]'
                : ''
            }`}
          >
            Products <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'turnkey' ? null : 'turnkey')}
            onMouseEnter={() => setOpenMenu('turnkey')}
            className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              openMenu === 'turnkey' || pathname.startsWith('/turnkey-solutions')
                ? 'font-semibold text-[#1a2a8c]'
                : ''
            }`}
          >
            Turnkey Lines <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'industries' ? null : 'industries')}
            onMouseEnter={() => setOpenMenu('industries')}
            className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              openMenu === 'industries' || pathname.startsWith('/industries')
                ? 'font-semibold text-[#1a2a8c]'
                : ''
            }`}
          >
            Industries <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
            onMouseEnter={() => setOpenMenu('services')}
            className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              openMenu === 'services' || pathname.startsWith('/engineering-services')
                ? 'font-semibold text-[#1a2a8c]'
                : ''
            }`}
          >
            Services <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'export' ? null : 'export')}
            onMouseEnter={() => setOpenMenu('export')}
            className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              openMenu === 'export' || pathname.startsWith('/export-and-compliance')
                ? 'font-semibold text-[#1a2a8c]'
                : ''
            }`}
          >
            Export <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <Link
            to="/projects/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              pathname.startsWith('/projects') ? 'font-semibold text-[#1a2a8c]' : ''
            }`}
          >
            Projects
          </Link>

          <Link
            to="/resources/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              pathname.startsWith('/resources') ? 'font-semibold text-[#1a2a8c]' : ''
            }`}
          >
            Resources
          </Link>

         

          <Link
            to="/contact-us/"
            onMouseEnter={() => setOpenMenu(null)}
            className={`whitespace-nowrap shrink-0 py-1.5 transition-colors hover:text-[#1a2a8c] ${
              pathname.startsWith('/contact-us') ? 'font-semibold text-[#1a2a8c]' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/contact-us/"
            className="hidden whitespace-nowrap shrink-0 rounded-lg bg-[#ff6a13] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#e55a08] sm:inline-flex"
          >
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu / Dropdowns */}
      {openMenu === 'products' && (
        <div
          onMouseLeave={() => setOpenMenu(null)}
          className="hidden border-t border-slate-200 bg-white shadow-lg xl:block"
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-8 py-6">
            <div className="col-span-3 space-y-1 border-r border-slate-100 pr-4">
              <Link
                to="/products/"
                className="mb-2 flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#1a2a8c] hover:bg-[#f5f7fa]"
              >
                All 4 Product Categories <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onMouseEnter={() => setActiveCatSlug(cat.slug)}
                  onClick={() => setActiveCatSlug(cat.slug)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    activeCatSlug === cat.slug
                      ? 'bg-[#1a2a8c] text-white'
                      : 'text-slate-700 hover:bg-[#f5f7fa]'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-75" />
                </button>
              ))}
            </div>

            <div className="col-span-6">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                <Link
                  to={`/products/${activeCategory.slug}/`}
                  className="text-sm font-bold text-[#1a2a8c] hover:underline"
                >
                  {activeCategory.title}
                </Link>
                <span className="text-xs text-slate-500">{activeProducts.length} Systems</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                {activeProducts.map((prod) => (
                  <Link
                    key={prod.slug}
                    to={getProductPath(prod)}
                    className="rounded px-2 py-1 text-[13px] text-slate-700 transition-colors hover:bg-[#f5f7fa] hover:text-[#1a2a8c]"
                  >
                    {prod.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-3 flex flex-col justify-between rounded-xl border border-slate-200 bg-[#f5f7fa] p-4">
              <div>
                <img
                  src={activeCategory.image}
                  alt={activeCategory.title}
                  className="mb-3 aspect-[4/3] w-full rounded-lg object-cover"
                />
                <p className="text-xs font-semibold text-[#1a2a8c]">{activeCategory.shortTitle}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{activeCategory.tagline}</p>
              </div>
              <Link
                to={`/products/${activeCategory.slug}/`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a8c] hover:underline"
              >
                Explore Category <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {openMenu && openMenu !== 'products' && (
        <div
          onMouseLeave={() => setOpenMenu(null)}
          className="hidden border-t border-slate-200 bg-white shadow-lg xl:block"
        >
          <div className="mx-auto max-w-[1400px] px-8 py-6">
            {openMenu === 'turnkey' && (
              <div className="grid grid-cols-3 gap-4">
                <Link
                  to="/turnkey-solutions/"
                  className="col-span-3 mb-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a2a8c] hover:underline"
                >
                  All Turnkey Process & Packaging Lines <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                {TURNKEY_SOLUTIONS.map((sol) => (
                  <Link
                    key={sol.slug}
                    to={`/turnkey-solutions/${sol.slug}/`}
                    className="rounded-lg border border-slate-200 p-3.5 transition-colors hover:border-[#1a2a8c] hover:bg-[#f5f7fa]"
                  >
                    <p className="text-sm font-semibold text-slate-900">{sol.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{sol.shortBenefit}</p>
                  </Link>
                ))}
              </div>
            )}

            {openMenu === 'industries' && (
              <div className="grid grid-cols-3 gap-4">
                <Link
                  to="/industries/"
                  className="col-span-3 mb-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a2a8c] hover:underline"
                >
                  All Industries Served Globally <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                {INDUSTRIES.map((ind) => (
                  <Link
                    key={ind.slug}
                    to={`/industries/${ind.slug}/`}
                    className="rounded-lg border border-slate-200 p-3.5 transition-colors hover:border-[#1a2a8c] hover:bg-[#f5f7fa]"
                  >
                    <p className="text-sm font-semibold text-slate-900">{ind.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{ind.shortBenefit}</p>
                  </Link>
                ))}
              </div>
            )}

            {openMenu === 'services' && (
              <div className="grid grid-cols-4 gap-4">
                <Link
                  to="/engineering-services/"
                  className="col-span-4 mb-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a2a8c] hover:underline"
                >
                  Engineering, 3D Simulation & Automation Services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                {ENGINEERING_SERVICES.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/engineering-services/${svc.slug}/`}
                    className="rounded-lg border border-slate-200 p-3.5 transition-colors hover:border-[#1a2a8c] hover:bg-[#f5f7fa]"
                  >
                    <p className="text-sm font-semibold text-slate-900">{svc.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{svc.shortBenefit}</p>
                  </Link>
                ))}
              </div>
            )}

            {openMenu === 'export' && (
              <div className="grid grid-cols-3 gap-4">
                <Link
                  to="/export-and-compliance/"
                  className="col-span-3 mb-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a2a8c] hover:underline"
                >
                  Global Export Readiness, FAT & After-Sales SLA <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                {EXPORT_PAGES.map((exp) => (
                  <Link
                    key={exp.slug}
                    to={`/export-and-compliance/${exp.slug}/`}
                    className="rounded-lg border border-slate-200 p-3.5 transition-colors hover:border-[#1a2a8c] hover:bg-[#f5f7fa]"
                  >
                    <p className="text-sm font-semibold text-slate-900">{exp.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{exp.shortBenefit}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="max-h-[82vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-5 xl:hidden">
          <div className="space-y-4">
            <div>
              <Link to="/products/" className="block py-1 text-sm font-bold text-[#1a2a8c]">
                Products (4 Categories)
              </Link>
              <div className="mt-1 grid grid-cols-1 gap-1 pl-3">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}/`}
                    className="py-1 text-sm text-slate-700"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <Link to="/turnkey-solutions/" className="block py-1 text-sm font-bold text-[#1a2a8c]">
                Turnkey Solutions
              </Link>
              <div className="mt-1 grid grid-cols-1 gap-1 pl-3">
                {TURNKEY_SOLUTIONS.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/turnkey-solutions/${s.slug}/`}
                    className="py-1 text-sm text-slate-700"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-800">
              <Link to="/about-us/" className="py-1.5">About Us</Link>
              <Link to="/industries/" className="py-1.5">Industries</Link>
              <Link to="/engineering-services/" className="py-1.5">Engineering Services</Link>
              <Link to="/export-and-compliance/" className="py-1.5">Export & Compliance</Link>
              <Link to="/projects/" className="py-1.5">Projects</Link>
              <Link to="/resources/" className="py-1.5">Resources</Link>
              <Link to="/contact-us/" className="py-1.5">Contact Us</Link>
            </div>

            <Link
              to="/contact-us/"
              className="block w-full rounded-lg bg-[#ff6a13] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
