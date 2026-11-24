import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Cookie, Mail, MapPin, Phone, X } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/productsConveyors';
import { TURNKEY_SOLUTIONS, INDUSTRIES } from '../data/turnkeyAndIndustries';
import { ENGINEERING_SERVICES, EXPORT_PAGES } from '../data/servicesExportProjectsResources';
import { trackConversionEvent } from './SeoHead';

export default function Footer() {
  const [cookieChoice, setCookieChoice] = useState<'pending' | 'accepted' | 'essential'>('accepted');
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vtech_cookie_consent');
      if (!saved) {
        setCookieChoice('pending');
      }
    } catch {
      setCookieChoice('accepted');
    }
  }, []);

  const saveConsent = (choice: 'accepted' | 'essential') => {
    setCookieChoice(choice);
    setShowCookieSettings(false);
    try {
      localStorage.setItem('vtech_cookie_consent', choice);
    } catch {
      // ignore storage errors
    }
  };

  const whatsappNum = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '914400000000';
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    'Hello V Tech Manufacturing Export Desk, I would like to discuss a machinery / turnkey line requirement.'
  )}`;

  return (
    <>
      <footer className="bg-[#1a2a4e] text-slate-300">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand & Factory Details */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center rounded-lg bg-white px-3 py-2">
                <img
                  src="/assets/aistudio/logo__1__0c301533.png"
                  alt="V Tech Manufacturing"
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                V Tech Manufacturing engineers and exports industrial conveyors, liquid filling lines, powder packaging machinery, warehouse automation, and turnkey process plants from Chennai, India.
              </p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6a13]" aria-hidden="true" />
                  <span>
                    [PLACEHOLDER: Plot No. & Industrial Park, Ambattur / Sriperumbudur], Chennai – 600058, Tamil Nadu, India
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[#ff6a13]" aria-hidden="true" />
                  <a href="mailto:exports@vtechmanufacturing.com" className="hover:text-white">
                    exports@vtechmanufacturing.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#ff6a13]" aria-hidden="true" />
                  <span>[PLACEHOLDER: +91 44 XXXX XXXX] · Mon–Sat 09:00–18:00 IST</span>
                </p>
              </div>

              <div className="mt-5 text-xs text-slate-400">
                ISO 9001:2015 [PLACEHOLDER] · CE Ready · FDA/GMP SS316L · ATEX Option
              </div>
            </div>

            {/* Machinery Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Products</h3>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link to="/products/" className="hover:text-white">All Equipment</Link>
                </li>
                {PRODUCT_CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/products/${c.slug}/`} className="hover:text-white">
                      {c.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-white">Company</h3>
              <ul className="mt-3 space-y-2 text-xs">
                <li><Link to="/about-us/" className="hover:text-white">About V Tech</Link></li>
                <li><Link to="/projects/" className="hover:text-white">Export Projects</Link></li>
                <li><Link to="/resources/" className="hover:text-white">Resources & Guides</Link></li>
                <li><Link to="/contact-us/" className="hover:text-white">Contact & RFQ</Link></li>
              </ul>
            </div>

            {/* Turnkey Lines */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Turnkey Lines</h3>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link to="/turnkey-solutions/" className="hover:text-white">All Turnkey Lines</Link>
                </li>
                {TURNKEY_SOLUTIONS.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/turnkey-solutions/${s.slug}/`} className="hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Industries</h3>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link to="/industries/" className="hover:text-white">All Industries</Link>
                </li>
                {INDUSTRIES.map((i) => (
                  <li key={i.slug}>
                    <Link to={`/industries/${i.slug}/`} className="hover:text-white">
                      {i.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering & Export */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Engineering & Export</h3>
              <ul className="mt-3.5 space-y-2 text-xs">
                {ENGINEERING_SERVICES.map((svc) => (
                  <li key={svc.slug}>
                    <Link to={`/engineering-services/${svc.slug}/`} className="hover:text-white">
                      {svc.title}
                    </Link>
                  </li>
                ))}
                {EXPORT_PAGES.map((exp) => (
                  <li key={exp.slug}>
                    <Link to={`/export-and-compliance/${exp.slug}/`} className="hover:text-white">
                      {exp.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} V Tech Manufacturing (vtechmanufacturing.com). All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <Link to="/privacy-policy/" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms-of-use/" className="hover:text-white">Terms of Use</Link>
              <a href="/sitemap.xml" className="hover:text-white">XML Sitemap</a>
              <button
                type="button"
                onClick={() => setShowCookieSettings(true)}
                className="inline-flex items-center gap-1 hover:text-white"
              >
                <Cookie className="h-3.5 w-3.5" aria-hidden="true" /> Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Click-to-Chat */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversionEvent('whatsapp_click', { location: 'floating_button' })}
        aria-label="Chat on WhatsApp with V Tech Export Desk"
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-emerald-700"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp Export Desk</span>
      </a>

      {/* GDPR Cookie Banner / Settings */}
      {(cookieChoice === 'pending' || showCookieSettings) && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">Cookie & Analytics Preferences</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                We use essential cookies for RFQ form security and optional GA4 analytics cookies to measure global inquiry performance. Read our{' '}
                <Link to="/privacy-policy/" className="font-semibold text-[#1a2a8c] underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            {showCookieSettings && (
              <button
                type="button"
                onClick={() => setShowCookieSettings(false)}
                aria-label="Dismiss cookie settings"
                className="rounded p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => saveConsent('essential')}
              className="rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="rounded-lg bg-[#1a2a8c] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1a2a4e]"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}
    </>
  );
}
