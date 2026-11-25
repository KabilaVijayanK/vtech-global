import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle2, FileText, Wrench } from 'lucide-react';
import type { EngineeringService } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';
import { SchedulerModal } from '../components/Modals';

interface ServiceDetailPageProps {
  service: EngineeringService;
}

/** Height of the site header. Change if your header differs. */
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
    <div ref={ref} className={`${className} ${seen ? 'sv-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
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

function SectionTitle({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem] ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-blue-100' : 'text-slate-600'}`}>{intro}</p>}
    </div>
  );
}

/** Light blueprint grid used behind the hero and contact sections */
const BLUEPRINT: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(26,42,140,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,42,140,.07) 1px,transparent 1px),linear-gradient(rgba(26,42,140,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,42,140,.04) 1px,transparent 1px)',
  backgroundSize: '160px 160px,160px 160px,32px 32px,32px 32px',
};

const CSS = `
@keyframes sv-rise{to{opacity:1;transform:none}}
.sv-fade{opacity:0;transform:translateY(20px);animation:sv-rise .9s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes sv-kb{from{transform:scale(1.08)}to{transform:scale(1)}}
.sv-settle{animation:sv-kb 1.8s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes sv-marquee{to{transform:translateX(-50%)}}
.sv-marquee{animation:sv-marquee 45s linear infinite}
.sv-marquee:hover{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.sv-root *{animation:none!important;transition:none!important}.sv-fade{opacity:1!important;transform:none!important}}
`;

/* ------------------------------ page ------------------------------ */
export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const [schedulerOpen, setSchedulerOpen] = useState<'engineer' | 'tour' | null>(null);

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Engineering Services', path: '/engineering-services/' },
    { label: service.title },
  ];

  const { methodology, deliverables, toolsUsed, sampleOutputs } = service;
  const toolLoop = toolsUsed.length ? [...toolsUsed, ...toolsUsed, ...toolsUsed, ...toolsUsed] : [];

  const stats = [
    { value: methodology.length, label: 'Engineering phases' },
    { value: deliverables.length, label: 'Technical deliverables' },
    { value: toolsUsed.length, label: 'Tools in the stack' },
    { value: sampleOutputs.length, label: 'Sample output types' },
  ];

  return (
    <div className="sv-root bg-white text-slate-900">
      <style>{CSS}</style>
      <SeoHead title={service.seoTitle} description={service.seoDescription} breadcrumbs={breadcrumbs} />

      {/* ============================ HERO (blueprint) ============================ */}
      <section className="relative overflow-hidden bg-[#f4f7ff]">
        <div aria-hidden="true" className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_30%,transparent_75%)]" style={BLUEPRINT} />
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div className="sv-fade"><Eyebrow>V Tech Engineering Capabilities</Eyebrow></div>
              <h1 className="sv-fade mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.6rem]" style={{ animationDelay: '.08s' }}>
                {service.title}
              </h1>
              <p className="sv-fade mt-6 max-w-xl text-lg leading-relaxed text-slate-600" style={{ animationDelay: '.16s' }}>{service.overview}</p>
              <div className="sv-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '.26s' }}>
                <a href="#sv-contact" className="inline-flex items-center gap-2 rounded-full bg-[#1a2a8c] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/30">
                  Request engineering scope <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button type="button" onClick={() => setSchedulerOpen('engineer')} className="inline-flex items-center gap-2 border-b border-[#1a2a8c]/50 pb-1 text-sm font-semibold text-[#1a2a8c] transition-colors hover:border-[#1a2a8c]">
                  <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
                </button>
              </div>
            </div>

            {/* Image in a drawing frame with corner marks */}
            <div className="sv-fade relative lg:col-span-6" style={{ animationDelay: '.2s' }}>
              <div className="relative p-4 sm:p-6">
                {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c) => (
                  <span key={c} aria-hidden="true" className={`absolute h-8 w-8 border-[#1a2a8c] ${c}`} />
                ))}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/20 ring-1 ring-slate-200">
                  <div className="sv-settle"><MachineVisual src={service.image} alt={`${service.title} by V Tech Manufacturing`} aspectClass="aspect-[4/3]" priority /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <dl className="mt-14 grid grid-cols-2 divide-slate-200 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm sm:grid-cols-4 sm:divide-x">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07} className={`px-6 py-6 ${i < 2 ? 'border-b border-slate-200 sm:border-b-0' : ''} ${i % 2 === 0 ? 'border-r border-slate-200 sm:border-r-0' : ''}`}>
                <dd className="text-4xl font-semibold tracking-tight text-[#1a2a8c]">{String(s.value).padStart(2, '0')}</dd>
                <dt className="mt-1 text-sm text-slate-500">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================ METHODOLOGY (process rail) ============================ */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionTitle eyebrow="Methodology" title="Engineering methodology" intro={`How ${service.title} moves from first requirement to released drawings.`} />

        <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.map((m, i) => (
            <li key={m.phase} className="relative pt-9">
              <span aria-hidden="true" className="absolute inset-x-0 top-[5px] h-px bg-slate-300" />
              <span aria-hidden="true" className="absolute left-0 top-0 h-[11px] w-[11px] rounded-full bg-[#1a2a8c] ring-4 ring-blue-100" />
              <Reveal delay={(i % 4) * 0.08}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1a2a8c]/40 hover:shadow-xl hover:shadow-slate-900/10">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition-colors group-hover:text-[#1a2a8c]">Phase {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900">{m.phase}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{m.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ============================ DELIVERABLES (dark, image bg) ============================ */}
      <section className="relative isolate overflow-hidden bg-[#0a1450] text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-25"><MachineVisual src={service.image} alt="" aspectClass="h-full w-full" /></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1450]/95 via-[#0a1450]/90 to-[#1a2a8c]/80" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky" style={{ top: HEADER_OFFSET + 32 }}>
              <SectionTitle light eyebrow="Deliverables" title="Technical deliverables" intro="What you receive at hand-over, ready for fabrication, approval and commissioning." />
              <p className="mt-8 text-7xl font-bold leading-none tracking-tight text-white/15">{String(deliverables.length).padStart(2, '0')}</p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {deliverables.map((d, i) => (
              <li key={d}>
                <Reveal delay={(i % 6) * 0.05} className="h-full">
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:bg-white/15">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1a2a8c]"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /></span>
                    <div>
                      <p className="font-mono text-xs font-semibold text-blue-200">D-{String(i + 1).padStart(2, '0')}</p>
                      <p className="mt-1 text-[15px] font-medium leading-relaxed">{d}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ TOOLS (marquee) ============================ */}
      {toolsUsed.length > 0 && (
        <section className="overflow-hidden py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Tool stack" title="Software, controls and fabrication stack" />
          </div>
          <div className="mt-12 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="sv-marquee flex w-max gap-3">
              {toolLoop.map((tool, i) => (
                <span key={`${tool}-${i}`} className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-6 py-3.5 text-base font-semibold text-slate-800 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#1a2a8c]"><Wrench className="h-4 w-4" aria-hidden="true" /></span>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================ SAMPLE OUTPUTS (drawing sheets) ============================ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle eyebrow="Sample outputs" title="Sample engineering outputs" intro="The formats and documents you can expect from this service." />
            <Link to="/projects/" className="group inline-flex items-center gap-2 self-start rounded-full border border-[#1a2a8c] px-6 py-3 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-[#1a2a8c] hover:text-white lg:self-auto">
              Explore completed engineering projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleOutputs.map((out, i) => (
              <li key={out.title}>
                <Reveal delay={(i % 6) * 0.06} className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a2a8c]/50 hover:shadow-2xl hover:shadow-slate-900/10">
                    <div className="flex-1 p-6 sm:p-7">
                      <span className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-[#1a2a8c]">
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />{out.format}
                      </span>
                      <h3 className="mt-5 text-xl font-semibold leading-snug text-slate-900">{out.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{out.detail}</p>
                    </div>
                    {/* Title block, like the corner of a drawing sheet */}
                    <div className="grid grid-cols-2 divide-x divide-slate-300 border-t border-slate-300 bg-slate-50 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <span className="px-6 py-2.5 sm:px-7">Sheet {String(i + 1).padStart(2, '0')} / {String(sampleOutputs.length).padStart(2, '0')}</span>
                      <span className="px-4 py-2.5">{out.format}</span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="sv-contact" className="relative overflow-hidden bg-[#f4f7ff]" style={{ scrollMarginTop: HEADER_OFFSET }}>
        <div aria-hidden="true" className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_50%,#000_20%,transparent_75%)]" style={BLUEPRINT} />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <Eyebrow>Request engineering scope</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">Start your {service.title} project</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Share your CAD layout, URS or control specification for an engineering estimate.</p>

            <ol className="mt-10 space-y-6">
              {['Share your CAD layout, URS or control specification', 'Our engineers review the scope and constraints', 'Receive an engineering estimate and plan'].map((t, i) => (
                <li key={t} className="flex items-center gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#1a2a8c] bg-white font-mono text-sm font-bold text-[#1a2a8c]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-base font-medium text-slate-800">{t}</span>
                </li>
              ))}
            </ol>

            <button type="button" onClick={() => setSchedulerOpen('engineer')} className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#1a2a8c] px-6 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-[#1a2a8c] hover:text-white">
              <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-blue-900/10 sm:p-3">
              <RfqForm
                defaultInterest={service.title}
                heading="Request Engineering Scope"
                subheading="Share your CAD layout, URS, or control specification for an engineering estimate."
              />
            </div>
          </div>
        </div>
      </section>

      <SchedulerModal mode={schedulerOpen} onClose={() => setSchedulerOpen(null)} />
    </div>
  );
}