import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle2, FileText, Globe2 } from 'lucide-react';
import type { ExportPageData } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import RfqForm from '../components/RfqForm';
import { SchedulerModal } from '../components/Modals';

interface ExportDetailPageProps {
  page: ExportPageData;
}

/** Height of the site header. Sticky elements sit just below it. Change if your header differs. */
const HEADER_OFFSET = 72;

const INCOTERMS = ['EXW', 'FOB Chennai', 'CIF', 'DAP'];

/* ---------------------------- helpers ----------------------------- */
function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`${className} ${seen ? 'ex-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-blue-200' : 'text-[#1a2a8c]'}`}>
      <span aria-hidden="true" className={`h-px w-8 ${light ? 'bg-blue-200' : 'bg-[#1a2a8c]'}`} />
      {children}
    </p>
  );
}

const CSS = `
@keyframes ex-rise{to{opacity:1;transform:none}}
.ex-fade{opacity:0;transform:translateY(18px);animation:ex-rise .85s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes ex-flow{to{stroke-dashoffset:-28}}
.ex-flow{stroke-dasharray:4 7;animation:ex-flow 2.2s linear infinite}
@keyframes ex-ping{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}
.ex-ping{transform-box:fill-box;transform-origin:center;animation:ex-ping 2.4s ease-out infinite}
@keyframes ex-spin{to{transform:rotate(360deg)}}
.ex-spin{transform-origin:260px 210px;animation:ex-spin 90s linear infinite}
@media (prefers-reduced-motion:reduce){.ex-root *{animation:none!important;transition:none!important}.ex-fade{opacity:1!important;transform:none!important}}
`;

/** Decorative shipping-route graphic, Chennai to destination ports. */
function RouteGraphic() {
  const origin = { x: 300, y: 250 };
  const ports = [
    { x: 110, y: 140 },
    { x: 170, y: 330 },
    { x: 440, y: 110 },
    { x: 455, y: 300 },
  ];
  return (
    <svg viewBox="0 0 520 420" className="h-full w-full" role="img" aria-label="Export shipping routes from Chennai, India to destination ports">
      <defs>
        <radialGradient id="ex-globe" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3b5bdb" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0a1450" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="210" r="195" fill="url(#ex-globe)" />
      <g fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1">
        <circle cx="260" cy="210" r="195" />
        <circle cx="260" cy="210" r="145" />
        <circle cx="260" cy="210" r="95" />
        <g className="ex-spin">
          <ellipse cx="260" cy="210" rx="195" ry="70" />
          <ellipse cx="260" cy="210" rx="195" ry="130" />
          <ellipse cx="260" cy="210" rx="70" ry="195" />
          <ellipse cx="260" cy="210" rx="130" ry="195" />
        </g>
        <line x1="65" y1="210" x2="455" y2="210" />
        <line x1="260" y1="15" x2="260" y2="405" />
      </g>
      {ports.map((p, i) => {
        const cx = (origin.x + p.x) / 2;
        const cy = Math.min(origin.y, p.y) - 70 - i * 6;
        return (
          <g key={i}>
            <path d={`M${origin.x} ${origin.y} Q${cx} ${cy} ${p.x} ${p.y}`} fill="none" stroke="#93b4ff" strokeWidth="1.6" strokeLinecap="round" className="ex-flow" style={{ animationDelay: `${i * 0.35}s` }} />
            <circle cx={p.x} cy={p.y} r="5" fill="#fff" />
            <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="#93b4ff" strokeWidth="1.5" className="ex-ping" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        );
      })}
      <circle cx={origin.x} cy={origin.y} r="9" fill="#fff" />
      <circle cx={origin.x} cy={origin.y} r="9" fill="none" stroke="#fff" strokeWidth="2" className="ex-ping" />
      <g transform={`translate(${origin.x + 16} ${origin.y + 4})`}>
        <rect x="0" y="-15" width="122" height="26" rx="13" fill="#0a1450" stroke="#fff" strokeOpacity="0.4" />
        <text x="61" y="2" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">Chennai, India</text>
      </g>
    </svg>
  );
}

/* ------------------------------ page ------------------------------ */
export default function ExportDetailPage({ page }: ExportDetailPageProps) {
  const [schedulerOpen, setSchedulerOpen] = useState<'engineer' | 'tour' | null>(null);
  const [active, setActive] = useState('ex-sec-0');

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Export & Compliance', path: '/export-and-compliance/' },
    { label: page.title },
  ];

  const { sections, checklist } = page;
  const totalRows = sections.reduce((n, s) => n + s.rows.length, 0);

  const toc = [
    ...sections.map((s, i) => ({ id: `ex-sec-${i}`, label: s.heading })),
    { id: 'ex-checklist', label: 'Documentation and SLA checklist' },
  ];

  const stats = [
    { value: sections.length, label: 'Compliance areas' },
    { value: totalRows, label: 'Protocols and standards' },
    { value: checklist.length, label: 'Checklist items' },
  ];

  /* Highlight the contents entry of the section currently in view */
  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-25% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.title]);

  return (
    <div className="ex-root bg-white text-slate-900">
      <style>{CSS}</style>
      <SeoHead title={page.seoTitle} description={page.seoDescription} breadcrumbs={breadcrumbs} />

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-[#0a1450] text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(59,91,219,0.45),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(26,42,140,0.7),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />

          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="ex-fade"><Eyebrow light>Export and global compliance desk</Eyebrow></div>
              <h1 className="ex-fade mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]" style={{ animationDelay: '.08s' }}>
                {page.title}
              </h1>
              <p className="ex-fade mt-6 max-w-2xl text-lg leading-relaxed text-blue-100" style={{ animationDelay: '.16s' }}>{page.overview}</p>

              <div className="ex-fade mt-6 flex flex-wrap gap-2" style={{ animationDelay: '.22s' }}>
                {INCOTERMS.map((t) => (
                  <span key={t} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">{t}</span>
                ))}
              </div>

              <div className="ex-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '.3s' }}>
                <a href="#ex-contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1a2a8c] transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl">
                  Consult the export desk <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button type="button" onClick={() => setSchedulerOpen('engineer')} className="inline-flex items-center gap-2 border-b border-white/60 pb-1 text-sm font-semibold transition-colors hover:border-white">
                  <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
                </button>
              </div>
            </div>

            <div className="ex-fade lg:col-span-5" style={{ animationDelay: '.2s' }}>
              <div className="mx-auto aspect-[520/420] w-full max-w-[520px]"><RouteGraphic /></div>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-3 divide-x divide-white/15 border-t border-white/20 pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="px-3 first:pl-0 sm:px-8">
                <dd className="text-3xl font-semibold tracking-tight sm:text-5xl">{String(s.value).padStart(2, '0')}</dd>
                <dt className="mt-1 text-xs text-blue-200 sm:text-sm">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Mobile section pills */}
      <nav aria-label="On this page" className="sticky z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md lg:hidden" style={{ top: HEADER_OFFSET }}>
        <div className="flex gap-1 overflow-x-auto px-4 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} aria-current={active === t.id} className={`whitespace-nowrap px-3 py-3.5 text-sm font-semibold transition-colors ${active === t.id ? 'text-[#1a2a8c]' : 'text-slate-500'}`}>
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ======================== MAIN: contents + sections ======================== */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Sticky contents (desktop) */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky" style={{ top: HEADER_OFFSET + 24 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">On this page</p>
            <ul className="mt-4 border-l border-slate-200">
              {toc.map((t, i) => {
                const on = active === t.id;
                return (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className={`-ml-px flex items-start gap-3 border-l-2 py-2.5 pl-4 pr-2 text-sm font-medium leading-snug transition-colors ${on ? 'border-[#1a2a8c] text-[#1a2a8c]' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900'}`}>
                      <span className="font-mono text-xs opacity-70">{String(i + 1).padStart(2, '0')}</span>
                      <span>{t.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 rounded-2xl bg-[#0a1450] p-5 text-white">
              <Globe2 className="h-6 w-6 text-blue-300" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold leading-snug">Questions on HS codes, Incoterms or FAT scheduling?</p>
              <a href="#ex-contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-200 transition-colors hover:text-white">
                Ask the export desk <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>

        <div className="space-y-20 lg:col-span-9">
          {sections.map((sec, i) => (
            <section key={sec.heading} id={`ex-sec-${i}`} style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <Reveal>
                <div className="flex items-start gap-5">
                  <span className="hidden font-mono text-5xl font-light leading-none text-slate-200 sm:block">{String(i + 1).padStart(2, '0')}</span>
                  <div className="max-w-3xl">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{sec.heading}</h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{sec.summary}</p>
                  </div>
                </div>
              </Reveal>

              {/* Desktop table */}
              <div className="mt-8 hidden overflow-hidden rounded-3xl border border-slate-200 shadow-sm md:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4">Protocol / Standard</th>
                      <th className="px-6 py-4">Specification</th>
                      <th className="px-6 py-4">Export execution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sec.rows.map((r) => (
                      <tr key={r.label} className="align-top transition-colors hover:bg-blue-50/50">
                        <td className="w-1/4 px-6 py-5 text-[15px] font-semibold text-slate-900">{r.label}</td>
                        <td className="w-1/4 px-6 py-5">
                          <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-[#1a2a8c]">{r.spec}</span>
                        </td>
                        <td className="px-6 py-5 text-sm leading-relaxed text-slate-600">{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="mt-8 space-y-3 md:hidden">
                {sec.rows.map((r) => (
                  <li key={r.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-base font-semibold text-slate-900">{r.label}</p>
                    <span className="mt-2 inline-block rounded-md bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-[#1a2a8c]">{r.spec}</span>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{r.notes}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Checklist */}
          <section id="ex-checklist" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1450] p-7 text-white sm:p-10">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Export documentation and SLA checklist</h2>
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {checklist.map((c, i) => (
                    <li key={c}>
                      <Reveal delay={(i % 6) * 0.05} className="h-full">
                        <div className="flex h-full items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#1a2a8c]"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /></span>
                          <span className="pt-1.5 text-[15px] font-medium leading-snug">{c}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link to="/resources/" className="group mt-5 flex items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-[#1a2a8c]/50 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 sm:p-6">
              <span className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1a2a8c] transition-colors group-hover:bg-[#1a2a8c] group-hover:text-white"><FileText className="h-6 w-6" aria-hidden="true" /></span>
                <span className="text-base font-semibold leading-snug text-slate-900">Download Buyer’s Guide to Importing Machinery from India</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1a2a8c]" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>

      {/* ============================ CONTACT ============================ */}
      <section id="ex-contact" className="bg-slate-50" style={{ scrollMarginTop: HEADER_OFFSET }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <Eyebrow>Export logistics desk</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem]">Consult our export logistics desk</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Verify HS codes, Incoterms and FAT scheduling for your destination port.</p>

            <ul className="mt-8 space-y-4">
              {['Verify HS codes for your machine and spares', 'Confirm Incoterms for your shipment', 'Schedule FAT for your destination port'].map((t) => (
                <li key={t} className="flex items-center gap-4 text-base font-medium text-slate-800">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1a2a8c] shadow-sm ring-1 ring-slate-200"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /></span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {INCOTERMS.map((t) => (
                <span key={t} className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700">{t}</span>
              ))}
            </div>

            <button type="button" onClick={() => setSchedulerOpen('engineer')} className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#1a2a8c] px-6 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-[#1a2a8c] hover:text-white">
              <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-blue-900/10 sm:p-3">
              <RfqForm
                defaultInterest={page.title}
                heading="Consult Our Export Logistics Desk"
                subheading="Verify HS codes, Incoterms (EXW/FOB Chennai/CIF/DAP), and FAT scheduling for your destination port."
              />
            </div>
          </div>
        </div>
      </section>

      <SchedulerModal mode={schedulerOpen} onClose={() => setSchedulerOpen(null)} />
    </div>
  );
}