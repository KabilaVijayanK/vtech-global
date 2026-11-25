import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Factory, ShieldCheck, Users } from 'lucide-react';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';
import { IMG_HERO, PRODUCT_CATEGORIES } from '../data/productsConveyors';

/* ------------------------------ data ------------------------------ */
const STATS = [
  { value: '28+', label: 'Countries shipped to' },
  { value: '33', label: 'Standard machine models' },
  { value: '5', label: 'Quality control stages' },
  { value: '48 hr', label: 'Witnessed factory acceptance test' },
];

const PILLARS = [
  { icon: Factory, title: 'In-house manufacturing control', desc: '[PLACEHOLDER: 45,000 sq.ft.] integrated fabrication, machining, panel wiring and FAT testing facility in Chennai, minutes from the Chennai and Ennore deep-water export ports.' },
  { icon: ShieldCheck, title: 'Global component parity', desc: 'Every PLC, servo motor, gearmotor and pneumatic valve comes from Siemens, Rockwell, SEW-Eurodrive, Festo or Intralox, so your local maintenance team can source spares anywhere.' },
  { icon: Users, title: 'Single-point accountability', desc: 'From 3D SolidWorks layout simulation through video FAT, sea crating and on-site commissioning, one dedicated project engineer owns your line throughput guarantee.' },
];

const MACHINERY = [
  { title: 'CNC fiber laser cutting', spec: '3,000 × 1,500 mm bed, up to 12 mm stainless steel' },
  { title: 'CNC hydraulic press brake', spec: '8-axis, 3,200 mm bending length' },
  { title: 'VMC and CNC turning centers', spec: 'Vertical machining center plus precision CNC turning' },
  { title: 'Orbital and pulsed TIG welding', spec: 'Dedicated bays for sanitary SS316L manifolds' },
  { title: 'Blasting and electropolishing', spec: 'Glass-bead blasting and electropolishing finishing room' },
  { title: 'Turnkey line FAT bay', spec: '45-meter bay with electrical load testing' },
];

const QC_STAGES = [
  { num: '01', title: 'Incoming metallurgy', detail: 'PMI and EN 10204 3.1 verification for SS304, SS316L and aluminum profiles.' },
  { num: '02', title: 'Dimensional metrology', detail: 'Laser-cut and CNC-machined tolerances checked against SolidWorks GD&T.' },
  { num: '03', title: 'Weld and surface Ra', detail: 'Dye-penetrant weld tests and Ra ≤ 0.6 µm profilometer checks on pharma parts.' },
  { num: '04', title: 'Electrical and safety', detail: 'Megger insulation, earth continuity, thermal load test and E-stop PLd check.' },
  { num: '05', title: '48-hour witnessed FAT', detail: 'Full-speed trial using client containers before VCI sea crating.' },
];

const TEAM = [
  { role: 'Managing Director and Chief Engineer', name: '[PLACEHOLDER: Founder / MD Name]', focus: '20+ years of turnkey packaging and process automation' },
  { role: 'Head of Controls and Robotics', name: '[PLACEHOLDER: Controls Lead Name]', focus: 'Siemens and Rockwell PLC, SCADA, WCS and vision systems' },
  { role: 'Head of Fabrication and Quality', name: '[PLACEHOLDER: QA Manager Name]', focus: 'ISO 9001:2015, CE technical files and SS316L metallurgy' },
  { role: 'International Exports and Proposals', name: '[PLACEHOLDER: Export Head Name]', focus: 'Global RFQ estimation, Incoterms and SAT commissioning' },
];

const BRANDS = ['SIEMENS Automation', 'ALLEN-BRADLEY', 'SEW-EURODRIVE', 'FESTO Pneumatics', 'INTRALOX Belting', 'ENDRESS+HAUSER'];

/* ---------------------------- helpers ----------------------------- */
const catImg = (i: number) => PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length]?.image ?? IMG_HERO;

function useInView<T extends HTMLElement>(threshold = 0.2) {
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
    <div ref={ref} className={`${className} ${seen ? 'ab-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/** Router Link for pages, plain anchor for #hash jumps inside this page. */
function SmartLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  return to.startsWith('#')
    ? <a href={to} className={className}>{children}</a>
    : <Link to={to} className={className}>{children}</Link>;
}

function GhostLink({ to, children, onDark = false }: { to: string; children: ReactNode; onDark?: boolean }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${onDark ? 'border-white/40 text-white hover:bg-white hover:text-[#0a1450]' : 'border-[#1a2a8c] text-[#1a2a8c] hover:bg-[#1a2a8c] hover:text-white'}`}>
      {children} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

const CSS = `
@keyframes ab-rise{to{opacity:1;transform:none}}
.ab-fade{opacity:0;transform:translateY(16px);animation:ab-rise .8s cubic-bezier(.2,.7,.2,1) forwards}
.ab-kb{animation:ab-kb 6.5s linear forwards}
@keyframes ab-kb{from{transform:scale(1)}to{transform:scale(1.1)}}
.ab-prog{animation:ab-prog 6.5s linear forwards}
@keyframes ab-prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.ab-word{transform:translateY(115%);animation:ab-up .85s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes ab-up{to{transform:none}}
.ab-accent{transform:scaleX(0);transform-origin:inherit;animation:ab-grow .7s .1s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes ab-grow{to{transform:scaleX(1)}}
@keyframes ab-marq{to{transform:translateX(-50%)}}
.ab-zoom img{transition:transform 900ms cubic-bezier(.2,.7,.2,1)}
.ab-zoom:hover img{transform:scale(1.05)}
@media (prefers-reduced-motion:reduce){.ab-root *{animation:none!important;transition:none!important}.ab-word,.ab-fade,.ab-accent{opacity:1!important;transform:none!important}}
`;

/* ============================ HERO SLIDER ============================ */
type Slide = { tag: string; nav: string; title: string; text: string; img: string; align: 'left' | 'center' | 'right'; to: string; cta: string };

const SLIDES: Slide[] = [
  { tag: 'Chennai engineering works, India', nav: 'Our story', title: 'Solution partner for your global process and packaging lines', text: 'Founded in Chennai, India’s industrial and automotive engineering powerhouse, V Tech bridges the gap between high-cost European machinery and unreliable low-tier fabricators.', img: IMG_HERO, align: 'left', to: '#story', cta: 'Why V Tech' },
  { tag: 'Fabrication and testing', nav: 'Facilities', title: 'Fabrication, machining and testing under one roof', text: 'Fiber laser cutting, press-brake forming, orbital TIG welding and a dedicated 45-meter FAT bay, all in our Chennai works.', img: catImg(1), align: 'center', to: '#facilities', cta: 'See the machinery' },
  { tag: 'Quality control', nav: 'Quality', title: 'Five quality checkpoints before every machine is crated', text: 'From incoming metallurgy to a 48-hour witnessed factory acceptance test, every line passes the same documented path.', img: catImg(2), align: 'right', to: '#quality', cta: 'See the process' },
  { tag: 'People', nav: 'Leadership', title: 'One accountable project team, from quotation to site acceptance', text: 'Controls, fabrication, quality and export leads who stay with your line through commissioning.', img: catImg(3), align: 'center', to: '#leadership', cta: 'Meet the team' },
];

function AboutHero({ breadcrumbs }: { breadcrumbs: BreadcrumbCrumb[] }) {
  const n = SLIDES.length;
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const go = (to: number) => { setPrev(idx); setIdx((to + n) % n); };
  const play = { animationPlayState: paused ? 'paused' : 'running' } as const;
  const s = SLIDES[idx];
  const alignCls = s.align === 'left' ? 'items-start text-left' : s.align === 'right' ? 'ml-auto items-end text-right' : 'mx-auto items-center text-center';
  const arrow = 'absolute top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-white text-white backdrop-blur-sm hover:border-[#1a2a8c] hover:bg-[#1a2a8c] sm:h-14 sm:w-14';

  return (
    <section id="overview" className="bg-white">
      <div
        className="relative h-[680px] overflow-hidden bg-[#0a1450] sm:h-[720px] lg:h-[calc(100vh-72px)] lg:max-h-[800px] lg:min-h-[640px]"
        role="region" aria-roledescription="carousel" aria-label="About V Tech highlights"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      >
        {SLIDES.map((x, i) => (
          <div key={x.nav} aria-hidden={i !== idx} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
            <img src={x.img} alt="" referrerPolicy="no-referrer" style={i === idx ? play : undefined} className={`h-full w-full object-cover ${i === idx ? 'ab-kb' : i === prev ? 'scale-110' : ''}`} />
            <div className={`absolute inset-0 ${x.align === 'left' ? 'bg-gradient-to-r from-[#0a1450]/90 via-[#0a1450]/55 to-transparent' : x.align === 'right' ? 'bg-gradient-to-l from-[#0a1450]/90 via-[#0a1450]/55 to-transparent' : 'bg-[#0a1450]/60'}`} />
          </div>
        ))}

        {/* Breadcrumbs ride on the image */}
        <div className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-[#0a1450]/80 to-transparent">
          <div className="mx-auto max-w-[1500px] px-4 pb-6 pt-5 sm:px-8 lg:px-12"><Breadcrumbs items={breadcrumbs} dark /></div>
        </div>

        <div className="relative z-20 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-16 pb-20 pt-12 sm:px-24 lg:px-28">
          <div key={idx} className={`flex w-full max-w-3xl flex-col ${alignCls}`}>
            <span className="ab-fade inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm" style={{ animationDelay: '.05s' }}>
              <span className="h-2 w-2 rounded-full bg-blue-400" /> {s.tag}
            </span>
            <span className="ab-accent mt-6 block h-1 w-20 bg-blue-400" />
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {s.title.split(' ').map((w, k) => (
                <span key={k}>
                  <span className="inline-block overflow-hidden pb-1 align-bottom"><span className="ab-word inline-block" style={{ animationDelay: `${0.15 + k * 0.06}s` }}>{w}</span></span>{' '}
                </span>
              ))}
            </h1>
            <p className="ab-fade mt-5 max-w-2xl text-base leading-relaxed text-blue-50 sm:text-lg" style={{ animationDelay: '.7s' }}>{s.text}</p>
            <div className="ab-fade mt-8 flex flex-wrap gap-3" style={{ animationDelay: '.9s' }}>
              <Link to="/contact-us/" className="inline-flex items-center gap-2 whitespace-nowrap bg-[#1a2a8c] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white hover:text-[#1a2a8c]">Contact export desk <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <SmartLink to={s.to} className="inline-flex items-center gap-2 whitespace-nowrap bg-white px-7 py-4 text-sm font-bold text-[#1a2a8c] hover:bg-blue-50">{s.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></SmartLink>
            </div>
          </div>
        </div>

        <button type="button" aria-label="Previous slide" onClick={() => go(idx - 1)} className={`${arrow} left-3 sm:left-6`}><ChevronLeft className="h-6 w-6" /></button>
        <button type="button" aria-label="Next slide" onClick={() => go(idx + 1)} className={`${arrow} right-3 sm:right-6`}><ChevronRight className="h-6 w-6" /></button>

        <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1500px] items-end gap-6">
            <div className="grid flex-1 grid-cols-4 gap-3">
              {SLIDES.map((x, i) => (
                <button key={x.nav} type="button" onClick={() => go(i)} aria-label={`Show slide ${i + 1}: ${x.nav}`} aria-current={i === idx} className="group text-left">
                  <span className={`block truncate text-xs font-semibold ${i === idx ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{x.nav}</span>
                  <span className="mt-2 block h-[3px] overflow-hidden bg-white/25">
                    {i === idx
                      ? <span key={idx} onAnimationEnd={() => go(idx + 1)} style={play} className="ab-prog block h-full origin-left bg-white" />
                      : <span className={`block h-full origin-left bg-white ${i < idx ? 'scale-x-100' : 'scale-x-0'}`} />}
                  </span>
                </button>
              ))}
            </div>
            <p className="hidden font-mono text-sm tabular-nums text-white sm:block"><span className="text-xl font-bold">{String(idx + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      {/* Quick-jump bar, same pattern as the home page category bar */}
      <div className="bg-[#1a2a8c]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-white/15 lg:grid-cols-4">
          {[
            { label: 'Why V Tech', to: '#story' },
            { label: 'Our facilities', to: '#facilities' },
            { label: 'Quality control', to: '#quality' },
            { label: 'Leadership', to: '#leadership' },
          ].map((l) => (
            <a key={l.to} href={l.to} className="flex items-center justify-between gap-3 px-5 py-5 text-white hover:bg-white/10 lg:px-10">
              <span className="text-sm font-semibold sm:text-base">{l.label}</span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-blue-200" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================== FACILITIES (BENTO) ========================== */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1200, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* Tile footprints on the desktop mosaic; the last tile is the FAT bay feature tile */
const TILE_SPAN = [
  'sm:col-span-2 lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'sm:col-span-2 lg:col-span-4',
];

function FacilitiesSection() {
  const last = MACHINERY.length - 1;
  return (
    <section id="facilities" className="relative scroll-mt-6 overflow-hidden bg-[#0a1450] text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(59,91,219,0.4),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(26,42,140,0.7),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:col-span-7 lg:text-[2.75rem] lg:leading-[1.1]">Chennai fabrication and testing machinery</h2>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-blue-100">Vertical integration keeps lead times predictable and stainless weld quality consistent across export batches.</p>
            <p className="mt-3 text-sm font-semibold text-blue-200">Hover over a tile to see the specification.</p>
          </div>
        </div>

        {/* Mosaic: one big tile, two medium, three small */}
        <div className="mt-12 grid grid-cols-1 auto-rows-[270px] gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:auto-rows-[230px] lg:gap-5">
          {MACHINERY.map((m, i) => {
            const feature = i === last;
            return (
              <Reveal key={m.title} delay={i * 0.07} className={`${TILE_SPAN[i]} h-full`}>
                <article
                  tabIndex={0}
                  className={`group relative h-full overflow-hidden rounded-3xl border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${feature ? 'border-blue-300/40 bg-gradient-to-br from-[#1a2a8c] to-[#3b5bdb]' : 'border-white/10 bg-[#0a1450]'}`}
                >
                  <div className={`absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110 ${feature ? 'opacity-25 mix-blend-luminosity' : ''}`}>
                    <MachineVisual src={catImg(i)} alt={`${m.title} at the V Tech Chennai works`} aspectClass="h-full w-full" />
                  </div>
                  {!feature && <div className="absolute inset-0 bg-gradient-to-t from-[#0a1450] via-[#0a1450]/55 to-[#0a1450]/5 transition-opacity duration-300 group-hover:from-[#0a1450]" />}

                  <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#0a1450]/50 px-3 py-1 text-xs font-bold backdrop-blur-md">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1a2a8c]">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    {feature && (
                      <p className="text-6xl font-extrabold leading-none tracking-tight sm:text-7xl">
                        <CountUp to={45} /><span className="ml-1 text-3xl font-bold text-blue-100 sm:text-4xl">m</span>
                      </p>
                    )}
                    <h3 className={`font-bold leading-tight ${feature ? 'mt-3 text-xl' : i === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{m.title}</h3>
                    {/* Spec: always visible on touch screens, slides open on hover or focus on desktop */}
                    <div className="grid grid-rows-[1fr] transition-all duration-500 ease-out lg:grid-rows-[0fr] lg:group-focus-within:grid-rows-[1fr] lg:group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-2 text-sm leading-relaxed text-blue-100">{m.spec}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/contact-us/" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg">
            Request a plant visit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="text-sm text-blue-200">Live video walk-throughs available on request.</p>
        </div>
      </div>
    </section>
  );
}

/* ====================== QUALITY (STICKY IMAGE + SCROLL TIMELINE) ====================== */
function QualitySection() {
  const wrap = useRef<HTMLOListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [fill, setFill] = useState(0);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const trigger = window.innerHeight * 0.6;
      setFill(Math.max(0, Math.min(trigger - box.top, box.height)));
      let r = -1;
      items.current.forEach((li, i) => {
        if (li && li.getBoundingClientRect().top + 28 <= trigger) r = i;
      });
      setReached(r);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const done = reached >= QC_STAGES.length - 1;

  return (
    <section id="quality" className="scroll-mt-6 bg-slate-50">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left: stays in view while the checkpoints scroll past on the right */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">5-stage quality control and FAT process</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">Every machine passes the same five checkpoints, in the same order, before it is crated. Scroll to walk the line.</p>

            <div className="relative mt-8 overflow-hidden rounded-3xl">
              <MachineVisual src={catImg(3)} alt="V Tech quality engineers running a factory acceptance test" aspectClass="aspect-[4/3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1450]/90 via-[#0a1450]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm font-medium text-blue-100">Checkpoints cleared</p>
                  <p className="text-5xl font-extrabold leading-none tabular-nums">{Math.max(reached + 1, 0)}<span className="text-2xl font-bold text-blue-200"> / {QC_STAGES.length}</span></p>
                </div>
                <div className="mt-4 flex gap-1.5" aria-hidden="true">
                  {QC_STAGES.map((q, i) => (
                    <span key={q.num} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25">
                      <span className={`block h-full origin-left rounded-full bg-white transition-transform duration-700 ${reached >= i ? 'scale-x-100' : 'scale-x-0'}`} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/contact-us/" className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1a2a8c] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#14217a] hover:shadow-lg hover:shadow-blue-900/30">
              Book a virtual FAT walk-through <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right: the timeline scrolls. The rail fills and the nodes turn into ticks as each checkpoint is reached */}
        <ol ref={wrap} className="relative lg:col-span-7">
          <div aria-hidden="true" className="absolute bottom-0 left-[27px] top-0 w-0.5 -translate-x-1/2 bg-slate-200">
            <div className="w-full bg-gradient-to-b from-[#3b5bdb] to-[#1a2a8c]" style={{ height: fill }} />
          </div>

          {QC_STAGES.map((q, i) => {
            const on = reached >= i;
            return (
              <li key={q.num} ref={(el) => { items.current[i] = el; }} className="relative pb-20 pl-20 lg:pb-28">
                <span className={`absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-extrabold transition-all duration-500 ${on ? 'scale-110 border-[#1a2a8c] bg-[#1a2a8c] text-white shadow-lg shadow-blue-900/30' : 'border-slate-300 bg-white text-slate-400'}`}>
                  {on ? <Check className="h-6 w-6" aria-label="Passed" /> : q.num}
                </span>
                <div className={`transition-all duration-700 ${on ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-40'}`}>
                  <p className="text-sm font-semibold text-[#1a2a8c]">Checkpoint {i + 1} of {QC_STAGES.length}</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900 sm:text-[1.7rem]">{q.title}</h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600">{q.detail}</p>
                </div>
              </li>
            );
          })}

          <li className="relative pl-20">
            <span className={`absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${done ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'border-slate-300 bg-white text-slate-300'}`}>
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className={`transition-all duration-700 ${done ? 'opacity-100' : 'opacity-40'}`}>
              <h3 className="text-2xl font-bold text-slate-900 sm:text-[1.7rem]">Cleared for VCI sea crating</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600">Only machines that pass all five checkpoints leave the Chennai works.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ================================ PAGE ================================ */
export default function AboutPage() {
  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us' },
  ];
  const primary = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1a2a8c] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#14217a] hover:shadow-lg hover:shadow-blue-900/30';
  const outline = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#1a2a8c] bg-white px-5 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-blue-50';

  return (
    <div className="ab-root bg-white">
      <style>{CSS}</style>
      <SeoHead
        title="About V Tech Manufacturing | Process & Packaging OEM Chennai, India"
        description="Learn about V Tech Manufacturing in Chennai, India: CNC fabrication infrastructure, 5-stage quality control, engineering team, and global export footprint."
        breadcrumbs={breadcrumbs}
      />

      <AboutHero breadcrumbs={breadcrumbs} />

      <main>
        {/* STATS */}
        <section aria-label="V Tech at a glance" className="bg-[#1a2a8c]">
          <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="px-2 text-center lg:border-l lg:border-white/15 lg:first:border-l-0">
                <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-sm text-blue-100">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* STORY / WHY */}
        <section id="story" className="scroll-mt-6 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:col-span-7 lg:text-[2.75rem] lg:leading-[1.1]">
                One works, one standard,<br className="hidden sm:block" /> one team accountable
              </h2>
              <p className="text-base leading-relaxed text-slate-600 lg:col-span-5">
                We build export-grade conveyors, filling machinery and turnkey automation designed for decades of 24/7 operation. Fabrication, controls and testing stay under one roof, so what we promise at quotation is what ships from the dock.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="ab-zoom overflow-hidden rounded-[2rem]">
                    <MachineVisual src={catImg(2)} alt="V Tech engineers assembling a stainless steel machine at the Chennai works" aspectClass="aspect-[4/5]" />
                  </div>
                  <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl bg-[#1a2a8c] px-6 py-5 text-white shadow-xl shadow-blue-900/25 sm:left-8 sm:right-auto sm:pr-10">
                    <p className="text-4xl font-extrabold leading-none sm:text-5xl">28+</p>
                    <p className="text-sm leading-snug text-blue-100">countries shipped<br />from Chennai</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <ul className="divide-y divide-slate-200 border-y border-slate-200">
                  {PILLARS.map(({ icon: Icon, title, desc }, i) => (
                    <li key={title}>
                      <Reveal delay={i * 0.07} className="flex gap-5 py-7">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1a2a8c]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                        <div><h3 className="text-xl font-bold text-slate-900">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-slate-600">{desc}</p></div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact-us/" className={primary}>Contact export desk <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <Link to="/products/" className={outline}>Our products</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACILITIES */}
        <FacilitiesSection />

        {/* QUALITY: scroll timeline */}
        <QualitySection />

        {/* LEADERSHIP */}
        <section id="leadership" className="scroll-mt-6 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:col-span-7 lg:text-[2.75rem] lg:leading-[1.1]">Engineering and export leadership</h2>
              <p className="text-base leading-relaxed text-slate-600 lg:col-span-5">The people you will speak with from first quotation to site acceptance.</p>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {TEAM.map((t, i) => (
                <li key={t.role} className="border-t border-slate-200 pb-6 pt-7">
                  <Reveal delay={i * 0.07}>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1a2a8c] to-[#3b5bdb] text-white"><Users className="h-7 w-7" aria-hidden="true" /></span>
                    <p className="mt-6 text-sm font-semibold text-[#1a2a8c]">{t.role}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-slate-900">{t.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.focus}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className="mt-14 overflow-hidden border-y border-slate-200 py-5">
              <p className="px-1 text-xs font-semibold text-slate-500">Component ecosystem we build around</p>
              <div className="mt-3 flex w-max gap-12 whitespace-nowrap px-1 text-sm font-bold text-[#1a2a8c]" style={{ animation: 'ab-marq 28s linear infinite' }}>
                {[0, 1].flatMap((r) => BRANDS.map((b) => <span key={`${r}-${b}`}>{b}</span>))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA with quick RFQ */}
        <section id="quote" className="relative scroll-mt-6 overflow-hidden bg-[#1a2a8c] text-white">
          <div className="absolute inset-0 opacity-20"><MachineVisual src={IMG_HERO} alt="" aspectClass="h-full w-full" /></div>
          <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:items-center lg:px-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Schedule a live virtual walk-through of our Chennai plant</h2>
              <p className="mt-4 text-sm leading-relaxed text-blue-100">Meet our controls and mechanical leads live from the assembly floor, then get a technical proposal and FOB/CIF quotation from the Chennai engineering team.</p>
              <div className="mt-6"><GhostLink to="/products/" onDark>Browse machines</GhostLink></div>
            </div>
            <div className="rounded-2xl bg-white p-2 text-slate-900 lg:col-span-7">
              <RfqForm compact heading="Quick export RFQ" subheading="Prefilled for rapid budgetary and engineering review." />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}