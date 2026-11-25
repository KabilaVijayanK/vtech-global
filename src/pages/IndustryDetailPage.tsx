import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { IndustryItem } from '../data/types';
import { ALL_PRODUCTS, getProductPath } from '../data/cmsRegistry';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';
import { SchedulerModal } from '../components/Modals';

interface IndustryDetailPageProps {
  industry: IndustryItem;
}

/** Height of the site header. Sticky elements sit just below it. Change if your header differs. */
const HEADER_OFFSET = 72;

/* ---------------------------- helpers ----------------------------- */
function useInView<T extends HTMLElement>(threshold = 0.12) {
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
    <div ref={ref} className={`${className} ${seen ? 'ig-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
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

function SectionTitle({ eyebrow, title, intro, center = false, light = false }: { eyebrow: string; title: string; intro?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={center ? 'flex justify-center' : ''}><Eyebrow light={light}>{eyebrow}</Eyebrow></div>
      <h2 className={`mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem] ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-blue-100' : 'text-slate-600'}`}>{intro}</p>}
    </div>
  );
}

const CSS = `
@keyframes ig-rise{to{opacity:1;transform:none}}
.ig-fade{opacity:0;transform:translateY(20px);animation:ig-rise .9s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes ig-kb{from{transform:scale(1.1)}to{transform:scale(1)}}
.ig-settle{animation:ig-kb 2.2s cubic-bezier(.2,.7,.2,1) forwards}
.ig-zoom img{transition:transform 1200ms cubic-bezier(.2,.7,.2,1)}
.ig-zoom:hover img{transform:scale(1.07)}
@media (prefers-reduced-motion:reduce){.ig-root *{animation:none!important;transition:none!important}.ig-fade{opacity:1!important;transform:none!important}}
`;

/* ------------------------------ page ------------------------------ */
export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const [schedulerOpen, setSchedulerOpen] = useState<'engineer' | 'tour' | null>(null);
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState('ig-challenges');

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Industries', path: '/industries/' },
    { label: industry.title },
  ];

  const { challenges, standards, caseStudy } = industry;
  const machines = industry.recommendedMachinePaths;
  const turnkeys = industry.recommendedTurnkeyPaths;
  const sel = machines[Math.min(selected, machines.length - 1)];

  /* Images: each machine's own photo (matched through its page path), falling back to the industry image */
  const imgFor = (path: string) => ALL_PRODUCTS.find((p) => getProductPath(p) === path)?.image ?? industry.image;
  const pics = Array.from(new Set([industry.image, ...machines.map((m) => imgFor(m.path))]));
  const pic = (i: number) => pics[i % pics.length];

  const jumpLinks = [
    { id: 'ig-challenges', label: 'Challenges' },
    { id: 'ig-compliance', label: 'Compliance' },
    { id: 'ig-machinery', label: 'Machinery' },
    { id: 'ig-case', label: 'Case study' },
  ];

  const stats = [
    { value: String(standards.length), label: 'Standards met by design' },
    { value: String(machines.length + turnkeys.length), label: `Machines and turnkey lines for ${industry.title}` },
    { value: caseStudy.metricResult, label: `Verified result, ${caseStudy.region}` },
  ];

  /* Highlight the pill of the section currently in view */
  useEffect(() => {
    const els = jumpLinks.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industry.title]);

  return (
    <div className="ig-root bg-white text-slate-900">
      <style>{CSS}</style>
      <SeoHead title={industry.seoTitle} description={industry.seoDescription} breadcrumbs={breadcrumbs} />

      {/* ============================ HERO (unchanged) ============================ */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="ig-settle absolute inset-0 -z-10">
          <MachineVisual src={industry.image} alt={`${industry.title} equipment by V Tech Manufacturing`} aspectClass="h-full w-full" priority />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/10" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-slate-950/70 to-transparent" />

        <div className="mx-auto flex min-h-[520px] max-w-[1400px] flex-col px-4 pb-28 pt-6 sm:px-6 lg:min-h-[600px] lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />

          <div className="mt-auto max-w-3xl pt-16">
            <div className="ig-fade"><Eyebrow light>Industries</Eyebrow></div>
            <h1 className="ig-fade mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]" style={{ animationDelay: '.08s' }}>
              {industry.title}
            </h1>
            <p className="ig-fade mt-6 line-clamp-3 max-w-xl text-lg leading-relaxed text-slate-200" style={{ animationDelay: '.16s' }}>
              {industry.overview}
            </p>
            <div className="ig-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '.26s' }}>
              <a href="#ig-contact" className="inline-flex items-center gap-2 rounded-full bg-[#1a2a8c] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/40">
                Request a proposal <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <button type="button" onClick={() => setSchedulerOpen('engineer')} className="group inline-flex items-center gap-2 border-b border-white/60 pb-1 text-sm font-semibold text-white transition-colors hover:border-white">
                <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW (image background) + floating stats card ============ */}
      <section className="relative isolate bg-[#0a1450] pt-px text-white">
        {/* Background image, tinted */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-30"><MachineVisual src={pic(1)} alt="" aspectClass="h-full w-full" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1450]/80 via-[#0a1450]/90 to-[#0a1450]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_20%,rgba(59,91,219,0.45),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>

        {/* Floating stats card, straddles hero and overview */}
        <div className="relative z-10 mx-auto -mt-14 max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 divide-y divide-slate-200 rounded-3xl bg-white text-slate-900 shadow-2xl shadow-slate-900/30 ring-1 ring-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="px-6 py-6 sm:px-8 sm:py-7">
                <dd className="text-2xl font-semibold leading-tight tracking-tight text-[#1a2a8c] sm:text-3xl">{s.value}</dd>
                <dt className="mt-2 text-sm text-slate-500">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow light>Overview</Eyebrow>
              <p className="mt-6 text-2xl font-light leading-snug tracking-tight sm:text-3xl lg:text-[2.1rem] lg:leading-[1.3]">{industry.overview}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {standards.map((s) => (
                  <span key={s.code} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">{s.code}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Image collage */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-5 gap-4">
                <div className="ig-zoom col-span-3 overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-black/40">
                  <MachineVisual src={pic(0)} alt={`${industry.title} equipment`} aspectClass="aspect-[3/4]" />
                </div>
                <div className="col-span-2 flex flex-col gap-4 pt-10">
                  <div className="ig-zoom overflow-hidden rounded-3xl border border-white/20 shadow-xl shadow-black/30">
                    <MachineVisual src={pic(1)} alt="" aspectClass="aspect-square" />
                  </div>
                  <div className="ig-zoom overflow-hidden rounded-3xl border border-white/20 shadow-xl shadow-black/30">
                    <MachineVisual src={pic(2)} alt="" aspectClass="aspect-[4/3]" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pill navigation */}
      <div className="sticky z-30 mx-auto mb-4 mt-8 w-fit max-w-full px-4" style={{ top: HEADER_OFFSET + 8 }}>
        <nav aria-label="On this page" className="flex gap-1 overflow-x-auto rounded-full bg-white/90 p-1.5 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200 backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {jumpLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${active === l.id ? 'bg-[#1a2a8c] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ============================ CHALLENGES (image + cards) ============================ */}
      <section id="ig-challenges" className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
        <SectionTitle eyebrow="Challenges" title={`Production and compliance challenges in ${industry.title}`} intro="The problems this industry faces on the floor, and what our engineering is built around." />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky" style={{ top: HEADER_OFFSET + 90 }}>
              <div className="ig-zoom relative overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/20">
                <MachineVisual src={pic(1)} alt={`${industry.title} production line`} aspectClass="aspect-[4/5]" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a1450]/95 via-[#0a1450]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <p className="text-6xl font-bold leading-none tracking-tight">{String(challenges.length).padStart(2, '0')}</p>
                  <p className="mt-3 text-lg font-semibold leading-snug">challenges we engineer around in {industry.title}</p>
                </div>
              </div>
            </div>
          </div>

          <ol className="space-y-4 lg:col-span-7">
            {challenges.map((ch, i) => (
              <li key={ch}>
                <Reveal delay={(i % 5) * 0.06}>
                  <div className="group flex items-start gap-5 rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1a2a8c]/40 hover:shadow-xl hover:shadow-slate-900/10 sm:gap-7 sm:p-8">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-mono text-lg font-bold text-[#1a2a8c] transition-colors group-hover:bg-[#1a2a8c] group-hover:text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-1 text-[17px] leading-relaxed text-slate-800">{ch}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ COMPLIANCE (image background) ============================ */}
      <section id="ig-compliance" className="relative isolate overflow-hidden bg-slate-950 text-white" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-35"><MachineVisual src={pic(2)} alt="" aspectClass="h-full w-full" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1450]/90 via-slate-950/85 to-[#0a1450]/95" />
        </div>
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionTitle center light eyebrow="Compliance" title="Standards met by design" intro="Compliance is engineered into the machine, not added on at inspection." />

          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((st, i) => (
              <li key={st.code}>
                <Reveal delay={(i % 6) * 0.06} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-5 -right-2 whitespace-nowrap text-7xl font-black tracking-tighter text-white/[0.06]">{st.code}</span>
                    <div className="relative">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1a2a8c] shadow-lg">
                        <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{st.code}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-blue-100">{st.detail}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ MACHINERY (photo selector) ============================ */}
      <section id="ig-machinery" className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
        <SectionTitle eyebrow="Machinery" title={`Recommended machinery for ${industry.title}`} intro="Select a machine to see its photo and the role it plays in this industry." />

        {sel && (
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <ul role="tablist" aria-label="Recommended machines" className="space-y-2.5 lg:col-span-5">
              {machines.map((m, i) => {
                const on = i === selected;
                return (
                  <li key={m.path}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setSelected(i)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-3 pr-5 text-left transition-all duration-300 ${
                        on ? 'border-transparent bg-[#1a2a8c] text-white shadow-xl shadow-blue-900/25' : 'border-slate-200 bg-white text-slate-900 hover:border-[#1a2a8c]/50 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-24 shrink-0 overflow-hidden rounded-xl">
                        <MachineVisual src={imgFor(m.path)} alt="" aspectClass="aspect-[4/3]" />
                      </span>
                      <span className="flex-1">
                        <span className={`block font-mono text-xs font-semibold ${on ? 'text-blue-200' : 'text-slate-400'}`}>{String(i + 1).padStart(2, '0')}</span>
                        <span className="block text-base font-semibold leading-snug">{m.label}</span>
                      </span>
                      <ArrowRight className={`h-4 w-4 shrink-0 transition-all ${on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div key={selected} role="tabpanel" className="ig-fade lg:col-span-7">
              <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#0a1450] text-white shadow-2xl shadow-blue-900/20">
                <div className="ig-zoom relative">
                  <MachineVisual src={imgFor(sel.path)} alt={sel.label} aspectClass="aspect-[3/1]" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a1450] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#0a1450]/70 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
                    Machine {String(selected + 1).padStart(2, '0')} of {String(machines.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <h3 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{sel.label}</h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-blue-100">{sel.role}</p>
                  </div>
                  <Link to={sel.path} className="group mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-all hover:-translate-y-0.5 hover:shadow-xl">
                    View specifications <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {turnkeys.length > 0 && (
          <div className="mt-16">
            <p className="text-sm font-semibold text-slate-500">Complete turnkey lines for {industry.title}</p>
            <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {turnkeys.map((t, i) => (
                <li key={t.path}>
                  <Reveal delay={(i % 6) * 0.06}>
                    <Link to={t.path} className="ig-zoom group relative block overflow-hidden rounded-3xl shadow-lg shadow-slate-900/10">
                      <MachineVisual src={pic(i + 1)} alt="" aspectClass="aspect-[16/10]" />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a1450]/95 via-[#0a1450]/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Turnkey line</p>
                          <p className="mt-1.5 text-lg font-semibold leading-snug">{t.label}</p>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1a2a8c] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ============================ CASE STUDY (image collage) ============================ */}
      <section id="ig-case" className="relative overflow-hidden bg-slate-50" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
        <div aria-hidden="true" className="absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <Reveal className="lg:col-span-6">
            <div className="relative pb-10 sm:pr-8">
              <div className="ig-zoom overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/20">
                <MachineVisual src={pic(3)} alt={`${caseStudy.title}`} aspectClass="aspect-[4/3]" />
              </div>
              <div className="absolute -bottom-0 right-0 hidden w-2/5 overflow-hidden rounded-3xl border-4 border-slate-50 shadow-2xl shadow-slate-900/25 sm:block">
                <MachineVisual src={pic(2)} alt="" aspectClass="aspect-[4/3]" />
              </div>
              <div className="absolute left-5 top-5 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Verified result</p>
                <p className="mt-1 text-xl font-bold leading-tight text-[#1a2a8c] sm:text-2xl">{caseStudy.metricResult}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <Eyebrow>Case study, {caseStudy.region}</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">{caseStudy.title}</h2>
            <p className="mt-6 flex items-start gap-3 text-base leading-relaxed text-slate-700 sm:text-lg">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
              <span>{caseStudy.summary}</span>
            </p>
            <a href="#ig-contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1a2a8c] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/30">
              Get a similar proposal <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============================ CONTACT (single card) ============================ */}
      <section id="ig-contact" className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8" style={{ scrollMarginTop: HEADER_OFFSET }}>
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200 lg:grid-cols-12">
            <div className="relative isolate overflow-hidden bg-[#0a1450] p-8 text-white sm:p-12 lg:col-span-5">
              <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="absolute inset-0 opacity-25"><MachineVisual src={pic(0)} alt="" aspectClass="h-full w-full" /></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1450]/90 to-[#1a2a8c]/85" />
              </div>
              <Eyebrow light>Start a conversation</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">Let's engineer your {industry.title} line</h2>
              <p className="mt-5 text-base leading-relaxed text-blue-100">Share your capacity, standards and destination port. Our Chennai engineering desk replies with a technical proposal and quotation.</p>
              <ul className="mt-8 space-y-3 text-sm font-medium">
                {['Technical proposal with 2D footprint', 'FOB / CIF quotation for your port', `Designed to ${standards.slice(0, 2).map((s) => s.code).join(' and ')}`].map((t) => (
                  <li key={t} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />{t}</li>
                ))}
              </ul>
              <button type="button" onClick={() => setSchedulerOpen('engineer')} className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white hover:text-[#0a1450]">
                <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
              </button>
            </div>
            <div className="p-2 sm:p-4 lg:col-span-7">
              <RfqForm
                defaultIndustry={industry.title}
                defaultInterest={`${industry.title} Automation Line`}
                heading={`Proposal: ${industry.title}`}
                subheading="Share your capacity and compliance needs. We reply with a technical proposal and FOB/CIF quotation."
              />
            </div>
          </div>
        </Reveal>
      </section>

      <SchedulerModal mode={schedulerOpen} onClose={() => setSchedulerOpen(null)} />
    </div>
  );
}