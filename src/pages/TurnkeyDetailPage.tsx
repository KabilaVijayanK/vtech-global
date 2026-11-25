import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Gauge,
  Globe2,
  Layers,
  Plus,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import type { TurnkeySolution } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';
import { SchedulerModal } from '../components/Modals';

interface TurnkeyDetailPageProps {
  solution: TurnkeySolution;
}

/** Height of the site header. The in-page tab bar sticks just below it. Change if your header differs. */
const HEADER_OFFSET = 72;

/* ---------------------------- helpers ----------------------------- */
function useInView<T extends HTMLElement>(threshold = 0.15) {
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
  const [ref, seen] = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`${className} ${seen ? 'tk-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

function SectionHead({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.1rem] lg:leading-[1.15]">{title}</h2>
      {intro && <p className="mt-3 text-base leading-relaxed text-slate-600">{intro}</p>}
    </div>
  );
}

const CSS = `
@keyframes tk-rise{to{opacity:1;transform:none}}
.tk-fade{opacity:0;transform:translateY(16px);animation:tk-rise .8s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes tk-kb{from{transform:scale(1.08)}to{transform:scale(1)}}
.tk-settle{animation:tk-kb 1.6s cubic-bezier(.2,.7,.2,1) forwards}
@media (prefers-reduced-motion:reduce){.tk-root *{animation:none!important;transition:none!important}.tk-fade{opacity:1!important;transform:none!important}}
`;

/* ------------------------------ page ------------------------------ */
export default function TurnkeyDetailPage({ solution }: TurnkeyDetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [schedulerOpen, setSchedulerOpen] = useState<'engineer' | 'tour' | null>(null);
  const [active, setActive] = useState('tk-flow');

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Turnkey Solutions', path: '/turnkey-solutions/' },
    { label: solution.title },
  ];

  const stages = solution.stages;
  const machines = solution.includedMachinePaths;
  const faqs = solution.faqs ?? [];
  const firstStage = stages[0];
  const lastStage = stages[stages.length - 1];
  const caseStudy = solution.caseStudySnippet;

  const tabs = [
    { id: 'tk-flow', label: 'Process flow' },
    { id: 'tk-machines', label: 'Machines included' },
    { id: 'tk-case', label: 'Case study' },
    { id: 'tk-fat', label: 'FAT and commissioning' },
    ...(faqs.length ? [{ id: 'tk-faq', label: 'FAQ' }] : []),
  ];

  /* Highlight the tab of the section currently in view */
  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solution.title]);

  /* At a glance: all values come from the solution content */
  const glance = [
    { label: 'Throughput (metric)', value: solution.throughputMetric },
    { label: 'Throughput (imperial)', value: solution.throughputImperial },
    { label: 'Integrated stages', value: `${stages.length} stages, ${machines.length} machines` },
    ...(firstStage && lastStage ? [{ label: 'Line runs from / to', value: `${firstStage.title} → ${lastStage.title}` }] : []),
  ];

  const primaryBtn = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg';
  const ghostBtn = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0a1450]';

  return (
    <div className="tk-root bg-white">
      <style>{CSS}</style>
      <SeoHead
        title={solution.seoTitle}
        description={solution.seoDescription}
        breadcrumbs={breadcrumbs}
        faqs={solution.faqs}
      />

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-[#0a1450] text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(59,91,219,0.45),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(26,42,140,0.7),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative mx-auto max-w-[1400px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />

          <div className="mt-5 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <span className="tk-fade inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-blue-400" /> Turnkey line, {stages.length} stages, Chennai India
              </span>
              <h1 className="tk-fade mt-4 text-2xl font-extrabold leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.3rem]" style={{ animationDelay: '.08s' }}>
                {solution.title}, turnkey supplier &amp; exporter from India
              </h1>
              <p className="tk-fade mt-3 line-clamp-3 max-w-2xl text-base leading-relaxed text-blue-50 sm:text-lg" style={{ animationDelay: '.16s' }}>
                {solution.overview}
              </p>

              <div className="tk-fade mt-6 flex flex-wrap gap-3" style={{ animationDelay: '.26s' }}>
                <a href="#turnkey-rfq" className={primaryBtn}>Request line proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <a href="#tk-flow" className={ghostBtn}><Layers className="h-4 w-4" aria-hidden="true" /> View process flow</a>
                <button type="button" onClick={() => setSchedulerOpen('engineer')} className={ghostBtn}><Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer</button>
              </div>
            </div>

            <div className="tk-fade relative lg:col-span-5" style={{ animationDelay: '.2s' }}>
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0a1450] shadow-2xl shadow-black/40">
                <div className="tk-settle">
                  <MachineVisual src={solution.image} alt={`${solution.title} by V Tech Manufacturing`} aspectClass="aspect-[16/10]" priority />
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-xl border border-white/25 bg-[#0a1450]/85 px-3.5 py-2.5 backdrop-blur-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1a2a8c]"><Gauge className="h-4 w-4" aria-hidden="true" /></span>
                  <p className="text-xs leading-snug"><span className="block text-blue-200">Throughput</span><span className="block text-sm font-bold">{solution.throughputMetric}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* At a glance */}
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-5 lg:grid-cols-4">
            {glance.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.07}>
                <dt className="text-xs text-blue-200">{g.label}</dt>
                <dd className="mt-0.5 text-base font-bold leading-snug sm:text-lg">{g.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Fact bar (content from the solution data) */}
      <div className="bg-[#1a2a8c] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <p className="flex items-center gap-3 px-5 py-4 text-sm font-semibold lg:px-8"><Layers className="h-5 w-5 shrink-0 text-blue-200" aria-hidden="true" /> {stages.length}-stage line, {machines.length} machines, one supplier</p>
          <p className="flex items-center gap-3 px-5 py-4 text-sm font-semibold lg:px-8"><ShieldCheck className="h-5 w-5 shrink-0 text-blue-200" aria-hidden="true" /> <span className="line-clamp-1">{solution.fatAndInstallation[0] ?? 'FAT before shipping'}</span></p>
          <p className="flex items-center gap-3 px-5 py-4 text-sm font-semibold lg:px-8"><Globe2 className="h-5 w-5 shrink-0 text-blue-200" aria-hidden="true" /> Exported to {caseStudy.country}, FOB or CIF quotation</p>
        </div>
      </div>

      {/* In-page tabs */}
      <nav aria-label="Turnkey sections" className="sticky z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md" style={{ top: HEADER_OFFSET }}>
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              aria-current={active === t.id}
              className={`relative whitespace-nowrap px-4 py-4 text-sm font-semibold transition-colors ${active === t.id ? 'text-[#1a2a8c]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {t.label}
              <span aria-hidden="true" className={`absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full bg-[#1a2a8c] transition-transform duration-300 ${active === t.id ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </div>
      </nav>

      {/* ======================== MAIN CONTENT ======================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="space-y-20 lg:col-span-7">
            {/* Process flow */}
            <div id="tk-flow" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <SectionHead title="Integrated line layout and process flow" intro="Follow the material from first stage to last. Open any linked machine for its full specifications." />

              {solution.problemStatement && (
                <div className="mt-8 flex items-start gap-4 rounded-3xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700"><AlertTriangle className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Industry challenge addressed</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-800">{solution.problemStatement}</p>
                  </div>
                </div>
              )}

              <ol className="relative mt-10">
                <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-slate-200" />
                {stages.map((st, i) => (
                  <li key={st.step} className="relative pb-10 pl-14 last:pb-0">
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2a8c] font-mono text-sm font-bold text-white ring-4 ring-white">
                      {String(st.step).padStart(2, '0')}
                    </span>
                    <Reveal delay={(i % 5) * 0.05}>
                      <div className="rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-[#1a2a8c]/40 hover:shadow-lg hover:shadow-blue-900/10 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-lg font-bold text-slate-900">{st.title}</h3>
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1a2a8c]">{st.machineName}</span>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{st.detail}</p>
                        {st.machinePath && (
                          <Link to={st.machinePath} className="group mt-4 inline-flex items-center gap-2 border-b border-[#1a2a8c] pb-0.5 text-sm font-semibold text-[#1a2a8c]">
                            View {st.machineName} specifications <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>

            {/* Machines included */}
            <div id="tk-machines" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <SectionHead title={`Machines included in the ${solution.title}`} />
              <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {machines.map((m, i) => {
                  const stage = stages.find((s) => s.machinePath === m.path);
                  return (
                    <li key={m.path} className="border-t border-slate-200 py-5">
                      <Reveal delay={(i % 6) * 0.05}>
                        <Link to={m.path} className="group flex items-start justify-between gap-4">
                          <span>
                            <span className="block text-[15px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-[#1a2a8c]">{m.label}</span>
                            {stage && <span className="mt-1 block text-sm text-slate-500">Stage {String(stage.step).padStart(2, '0')}: {stage.title}</span>}
                          </span>
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-all group-hover:border-[#1a2a8c] group-hover:bg-[#1a2a8c] group-hover:text-white">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </Link>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Case study */}
            <div id="tk-case" style={{ scrollMarginTop: HEADER_OFFSET + 70 }} className="relative overflow-hidden rounded-[2rem] bg-[#0a1450] p-7 text-white sm:p-10">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold text-blue-200">Commissioned export case study, {caseStudy.country}</p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{caseStudy.clientLabel}</h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-blue-200">Challenge</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-blue-50">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-200">Verified outcome</p>
                    <p className="mt-3 flex items-start gap-3 text-[15px] font-medium leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" aria-hidden="true" />
                      <span>{caseStudy.outcome}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAT */}
            <div id="tk-fat" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <SectionHead title="FAT, shipping and site commissioning" />
              <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {solution.fatAndInstallation.map((item, i) => (
                  <li key={item} className="border-t border-slate-200 py-5">
                    <Reveal delay={(i % 6) * 0.05} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1a2a8c]"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /></span>
                      <span className="text-[15px] leading-relaxed text-slate-800">{item}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            {faqs.length > 0 && (
              <div id="tk-faq" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
                <SectionHead title="Frequently asked questions" />
                <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <li key={faq.question}>
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                        >
                          <span className={`text-base font-bold transition-colors sm:text-lg ${isOpen ? 'text-[#1a2a8c]' : 'text-slate-900 group-hover:text-[#1a2a8c]'}`}>{faq.question}</span>
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-[#1a2a8c] bg-[#1a2a8c] text-white' : 'border-slate-300 text-slate-500 group-hover:border-[#1a2a8c]'}`}>
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </button>
                        <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <div className="overflow-hidden">
                            <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-slate-600">{faq.answer}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky quote form */}
          <div id="turnkey-rfq" className="scroll-mt-32 lg:col-span-5">
            <div className="lg:sticky" style={{ top: HEADER_OFFSET + 76 }}>
              <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-900/10">
                <RfqForm
                  defaultInterest={solution.title}
                  heading={`Proposal: ${solution.title}`}
                  subheading="Attach your floor plan or share target throughput for a 2D line layout and budgetary FOB/CIF quote."
                />
              </div>
              <p className="mt-4 flex items-center gap-2 px-2 text-sm text-slate-500"><ShieldCheck className="h-4 w-4 text-[#1a2a8c]" aria-hidden="true" /> Reply from the Chennai engineering desk, with a 2D line layout and FOB/CIF terms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CTA BAND ======================== */}
      <section className="relative overflow-hidden bg-[#1a2a8c] text-white">
        <div className="absolute inset-0 opacity-20"><MachineVisual src={solution.image} alt="" aspectClass="h-full w-full" /></div>
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Need the {solution.title} built to your layout?</h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100">Share your target throughput ({solution.throughputMetric}), floor plan and destination port. We reply with a line layout and quotation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setSchedulerOpen('engineer')} className={primaryBtn}><Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer</button>
            <a href="#turnkey-rfq" className={ghostBtn}>Request line proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <SchedulerModal mode={schedulerOpen} onClose={() => setSchedulerOpen(null)} />
    </div>
  );
}