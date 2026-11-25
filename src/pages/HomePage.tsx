import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, FileDown, Calendar, ShieldCheck, Cog, Globe2, Wrench, CheckCircle2, Quote } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';
import { GatedDownloadModal, SchedulerModal } from '../components/Modals';
import { IMG_HERO, PRODUCT_CATEGORIES } from '../data/productsConveyors';
import { TURNKEY_SOLUTIONS, INDUSTRIES } from '../data/turnkeyAndIndustries';
import { PROJECTS, RESOURCES, TESTIMONIALS } from '../data/servicesExportProjectsResources';

const EXPORT_HUBS = [
  { id: 'usa', region: 'North America (USA & Canada)', cx: 215, cy: 155, voltage: '480V / 3-Ph / 60Hz · UL508A Ready', ports: 'Newark, Houston, Savannah, Los Angeles', focus: 'FDA-compliant spice/nutraceutical auger lines, servo piston fillers, and warehouse dock automation.' },
  { id: 'europe', region: 'Europe (UK, Germany, Benelux)', cx: 485, cy: 125, voltage: '400V / 3-Ph / 50Hz · CE 2006/42/EC', ports: 'Rotterdam, Hamburg, Felixstowe, Antwerp', focus: 'CE-certified modular washdown conveyors, beverage accumulation tables, and FMCG capping/labeling.' },
  { id: 'middle-east', region: 'Middle East (UAE, Saudi Arabia, Oman)', cx: 565, cy: 195, voltage: '400V / 50Hz · ATEX Zone 1/2 Options', ports: 'Jebel Ali, Dammam, Jeddah, Sohar', focus: 'ATEX drum/IBC chemical filling, lubricant bottling lines, and cold-store AS/RS pallet shuttles.' },
  { id: 'africa', region: 'Africa (Nigeria, Kenya, South Africa, Egypt)', cx: 515, cy: 270, voltage: '400V / 50Hz · Heavy-Duty Tropicalized', ports: 'Apapa/Lagos, Mombasa, Durban, Alexandria', focus: 'Edible oil bottling, 25–50 kg grain/fertilizer bagging lines, and rugged turnkey packaging plants.' },
  { id: 'sea', region: 'Southeast Asia (Vietnam, Malaysia, Singapore)', cx: 735, cy: 235, voltage: '380–415V / 50Hz · cGMP & ESD Options', ports: 'Ho Chi Minh, Port Klang, Singapore, Jakarta', focus: 'EV battery assembly conveyor loops, cGMP stickpack lines, and high-density shuttle warehouses.' },
  { id: 'australia', region: 'Australia & Oceania', cx: 815, cy: 335, voltage: '415V / 50Hz · AS/NZS Safety Guarding', ports: 'Melbourne, Sydney, Brisbane, Auckland', focus: 'E-commerce parcel diverter sorters, telescopic container loaders, and food washdown conveyors.' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Consult', detail: 'Audit SKUs, line speeds (BPM/PPH), footprint, and destination electrical/safety norms.' },
  { num: '02', title: 'Design & 3D Sim', detail: 'Deliver 3D SolidWorks GA layouts and FlexSim throughput bottleneck modeling.' },
  { num: '03', title: 'Build', detail: 'CNC fiber laser cutting, TIG SS316L fabrication, and EPLAN UL/CE panel wiring in Chennai.' },
  { num: '04', title: 'FAT', detail: '48-hour loaded test run witnessed in person, via live 4K video, or SGS/TUV inspection.' },
  { num: '05', title: 'Ship', detail: 'VCI anti-rust sealing, ISPM-15 fumigated sea crating, and FOB/CIF/DAP export clearance.' },
  { num: '06', title: 'Commission', detail: 'Match-marked reassembly, laser alignment, Site Acceptance Test (SAT), and operator training.' },
  { num: '07', title: 'Support', detail: '24×6 remote VPN PLC triage, 48-hr DHL air spares, and optional multi-year AMC.' },
];

const STATS = [
  { value: '28+', label: 'Countries shipped to' },
  { value: '33', label: 'Standard machine models' },
  { value: '48 hr', label: 'Witnessed factory acceptance test' },
  { value: '25–35%', label: 'CapEx saving vs. Western OEMs' },
];

const WHY_POINTS = [
  { icon: Cog, title: 'Custom SPM and layout engineering', desc: 'Every line is tailored to your building columns, container shapes and viscosity, backed by 3D SolidWorks and FlexSim simulation.' },
  { icon: Globe2, title: 'India cost-to-quality advantage', desc: 'In-house CNC fiber laser, press-brake and SS316L TIG fabrication cut lead times and CapEx by 25–35% against Western OEMs.' },
  { icon: ShieldCheck, title: 'CE, UL508A, cGMP and ATEX readiness', desc: '400V/50Hz or 480V/60Hz control cabinets, EN 10204 3.1 metallurgy certificates and Zone 1/2 builds, ready for local inspection.' },
  { icon: Wrench, title: 'Witnessed video FAT, 48-hour spares', desc: 'A 48-hour live-streamed or SGS/TUV factory acceptance test before dispatch, then VPN PLC diagnostics and DHL air spares.' },
];
const WHY_BRANDS = ['Siemens', 'Rockwell', 'SEW-Eurodrive', 'Festo', 'Intralox'];

/* ---------- helpers ---------- */
function useInView<T extends HTMLElement>(threshold = 0.3) {
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

/** Picks the item's own image if the data file has one, otherwise falls back to a machinery photo. */
const catImg = (i: number) => PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length]?.image ?? IMG_HERO;
const imgOf = (o: unknown, i: number) => (o as { image?: string }).image ?? catImg(i);

/** One calm entrance per block as it scrolls into view. */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`${className} ${seen ? 'vt-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/* Original section wrapper: still used by the (unchanged) machinery section */
function Chapter({ id, title, intro, action, children }: { id: string; title: string; intro?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-slate-200 py-14 sm:py-20">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-sm leading-relaxed text-slate-600">{intro}</p>}
        </div>
        {action}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/* Full-width section band */
function Band({ id, tone = 'light', title, intro, action, children }: { id: string; tone?: 'light' | 'soft' | 'dark'; title: string; intro?: string; action?: ReactNode; children: ReactNode }) {
  const bg = tone === 'dark' ? 'bg-[#0a1450] text-white' : tone === 'soft' ? 'bg-slate-50' : 'bg-white';
  return (
    <section id={id} className={`scroll-mt-6 ${bg}`}>
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1] ${tone === 'dark' ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
            {intro && <p className={`mt-4 text-base leading-relaxed ${tone === 'dark' ? 'text-blue-100' : 'text-slate-600'}`}>{intro}</p>}
          </div>
          {action}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function GhostLink({ to, children, onDark = false }: { to: string; children: ReactNode; onDark?: boolean }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${onDark ? 'border-white/40 text-white hover:bg-white hover:text-[#0a1450]' : 'border-[#1a2a8c] text-[#1a2a8c] hover:bg-[#1a2a8c] hover:text-white'}`}>
      {children} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

type Slide = { tag: string; nav: string; title: string; text: string; img: string; align: 'left' | 'center' | 'right'; to: string; cta: string };

/* ======================= HERO: UNCHANGED ======================= */
function HeroSlider() {
  const pick = (i: number) => PRODUCT_CATEGORIES[i]?.image ?? IMG_HERO;
  const slug = (i: number) => PRODUCT_CATEGORIES[i]?.slug;
  const slides: Slide[] = [
    { tag: 'Chennai, India · Export-grade process and packaging OEM', nav: 'Global solutions', title: 'Engineered process and packaging lines for global industry', text: 'V Tech designs, builds, and exports custom conveyors, liquid and powder machinery, warehouse automation, and turnkey lines to 28+ countries.', img: IMG_HERO, align: 'left', to: '/products/', cta: 'Our products' },
    { tag: 'Conveyors and material handling', nav: 'Conveyors', title: 'Conveyor systems built for heavy-duty, round-the-clock work', text: 'Modular washdown conveyors, accumulation tables, and dock automation, engineered to your layout and to CE or UL standards.', img: pick(0), align: 'center', to: slug(0) ? `/products/${slug(0)}/` : '/products/', cta: 'Explore conveyors' },
    { tag: 'Liquid filling and bottling', nav: 'Liquid filling', title: 'Servo liquid filling from 5 ml bottles to 1,000 L IBCs', text: 'Volumetric, flow-meter, and weighmetric fillers for food, pharma, FMCG, and chemical lines.', img: pick(1), align: 'right', to: slug(1) ? `/products/${slug(1)}/` : '/products/', cta: 'Explore fillers' },
    { tag: 'Turnkey lines', nav: 'Turnkey lines', title: 'One team accountable for your line, from design to commissioning', text: 'Witnessed 48-hour factory acceptance test, export packing, on-site commissioning, and 24×6 remote support.', img: pick(3), align: 'center', to: '/turnkey-solutions/', cta: 'See turnkey lines' },
  ];
  const n = slides.length;
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const go = (to: number) => { setPrev(idx); setIdx((to + n) % n); };
  const play = { animationPlayState: paused ? 'paused' : 'running' } as const;
  const s = slides[idx];
  const alignCls = s.align === 'left' ? 'items-start text-left' : s.align === 'right' ? 'ml-auto items-end text-right' : 'mx-auto items-center text-center';
  const arrow = 'absolute top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-white text-white backdrop-blur-sm hover:border-[#1a2a8c] hover:bg-[#1a2a8c] sm:h-14 sm:w-14';

  return (
    <section id="overview" className="bg-white">
      <div
        className="relative h-[640px] overflow-hidden bg-[#0a1450] sm:h-[700px] lg:h-[calc(100vh-72px)] lg:max-h-[800px] lg:min-h-[620px]"
        role="region" aria-roledescription="carousel" aria-label="Featured solutions"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      >
        {slides.map((x, i) => (
          <div key={x.nav} aria-hidden={i !== idx} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
            <img src={x.img} alt="" referrerPolicy="no-referrer" style={i === idx ? play : undefined} className={`h-full w-full object-cover ${i === idx ? 'vt-kb' : i === prev ? 'scale-110' : ''}`} />
            <div className={`absolute inset-0 transition-opacity duration-700 ${x.align === 'left' ? 'bg-gradient-to-r from-[#0a1450]/90 via-[#0a1450]/55 to-transparent' : x.align === 'right' ? 'bg-gradient-to-l from-[#0a1450]/90 via-[#0a1450]/55 to-transparent' : 'bg-[#0a1450]/60'}`} />
          </div>
        ))}

        <div className="relative z-20 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-16 pb-20 sm:px-24 lg:px-28">
          <div key={idx} className={`flex w-full max-w-3xl flex-col ${alignCls}`}>
            <span className="vt-fade inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm" style={{ animationDelay: '.05s' }}>
              <span className="h-2 w-2 rounded-full bg-blue-400" /> {s.tag}
            </span>
            <span className="vt-accent mt-6 block h-1 w-20 bg-blue-400" />
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {s.title.split(' ').map((w, k) => (
                <span key={k}>
                  <span className="inline-block overflow-hidden pb-1 align-bottom"><span className="vt-word inline-block" style={{ animationDelay: `${0.15 + k * 0.06}s` }}>{w}</span></span>{' '}
                </span>
              ))}
            </h1>
            <p className="vt-fade mt-5 max-w-2xl text-base leading-relaxed text-blue-50 sm:text-lg" style={{ animationDelay: '.7s' }}>{s.text}</p>
            <div className="vt-fade mt-8 flex flex-wrap gap-3" style={{ animationDelay: '.9s' }}>
              <Link to="/contact-us/" className="inline-flex items-center gap-2 whitespace-nowrap bg-[#1a2a8c] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white hover:text-[#1a2a8c]">Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to={s.to} className="inline-flex items-center gap-2 whitespace-nowrap bg-white px-7 py-4 text-sm font-bold text-[#1a2a8c] hover:bg-blue-50">{s.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>

        <button type="button" aria-label="Previous slide" onClick={() => go(idx - 1)} className={`${arrow} left-3 sm:left-6`}><ChevronLeft className="h-6 w-6" /></button>
        <button type="button" aria-label="Next slide" onClick={() => go(idx + 1)} className={`${arrow} right-3 sm:right-6`}><ChevronRight className="h-6 w-6" /></button>

        <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1500px] items-end gap-6">
            <div className="grid flex-1 grid-cols-4 gap-3">
              {slides.map((x, i) => (
                <button key={x.nav} type="button" onClick={() => go(i)} aria-label={`Show slide ${i + 1}: ${x.nav}`} aria-current={i === idx} className="group text-left">
                  <span className={`block truncate text-xs font-semibold ${i === idx ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{x.nav}</span>
                  <span className="mt-2 block h-[3px] overflow-hidden bg-white/25">
                    {i === idx
                      ? <span key={idx} onAnimationEnd={() => go(idx + 1)} style={play} className="vt-prog block h-full origin-left bg-white" />
                      : <span className={`block h-full origin-left bg-white ${i < idx ? 'scale-x-100' : 'scale-x-0'}`} />}
                  </span>
                </button>
              ))}
            </div>
            <p className="hidden font-mono text-sm tabular-nums text-white sm:block"><span className="text-xl font-bold">{String(idx + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1a2a8c]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-white/15 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/products/${c.slug}/`} className="flex items-center justify-between gap-3 px-5 py-5 text-white hover:bg-white/10 lg:px-10">
              <span className="text-sm font-semibold sm:text-base">{c.title}</span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-blue-200" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TURNKEY (REDESIGNED v2) ============================ */
function TurnkeySection({ sol, setSol }: { sol: number; setSol: (i: number) => void }) {
  const n = TURNKEY_SOLUTIONS.length;
  const [prev, setPrev] = useState(-1);
  const [hold, setHold] = useState(false);
  const s = TURNKEY_SOLUTIONS[sol] || TURNKEY_SOLUTIONS[0];
  const play = { animationPlayState: hold ? 'paused' : 'running' } as const;
  const pick = (i: number) => { if (i === sol) return; setPrev(sol); setSol(((i % n) + n) % n); };

  return (
    <section
      id="turnkey"
      className="relative scroll-mt-6 overflow-hidden bg-[#0a1450] text-white"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)} onBlur={() => setHold(false)}
    >
      {/* Fixed backdrop: no photo, so the card image is the only thing that changes */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(59,91,219,0.45),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(26,42,140,0.7),transparent_55%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">Turnkey lines, one team accountable</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">From the first layout drawing to the first sellable unit, a single V Tech project team owns the result.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* Selector with thumbnails and an auto-advance progress bar */}
          <div className="lg:col-span-4">
            <ul role="tablist" aria-label="Turnkey solutions" className="flex flex-col gap-2">
              {TURNKEY_SOLUTIONS.map((x, i) => {
                const on = sol === i;
                return (
                  <li key={x.slug}>
                    <button
                      type="button" role="tab" aria-selected={on}
                      onClick={() => pick(i)} onMouseEnter={() => pick(i)}
                      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-2.5 pr-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${on ? 'border-white/30 bg-white/10 shadow-lg shadow-black/20' : 'border-transparent hover:border-white/15 hover:bg-white/5'}`}
                    >
                      <span className={`h-14 w-20 shrink-0 overflow-hidden rounded-xl transition-all duration-500 ${on ? 'opacity-100 ring-2 ring-white/60' : 'opacity-50 grayscale group-hover:opacity-90 group-hover:grayscale-0'}`}>
                        <MachineVisual src={imgOf(x, i + 1)} alt="" aspectClass="h-full w-full" />
                      </span>
                      <span className={`min-w-0 flex-1 text-base font-semibold leading-snug transition-colors ${on ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{x.title}</span>
                      <ArrowRight className={`h-4 w-4 shrink-0 transition-all duration-300 ${on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} aria-hidden="true" />
                      {on && (
                        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
                          <span key={sol} onAnimationEnd={() => pick(sol + 1)} style={play} className="vt-prog block h-full origin-left bg-blue-400" />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6"><GhostLink to="/turnkey-solutions/" onDark>All turnkey lines</GhostLink></div>
          </div>

          {/* Image card: the photo lives here and cross-fades with a slow zoom */}
          <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a1450] shadow-2xl shadow-black/40 lg:col-span-8 lg:min-h-[600px]">
            {TURNKEY_SOLUTIONS.map((x, i) => (
              <div key={x.slug} aria-hidden={i !== sol} className={`absolute inset-0 transition-opacity duration-1000 ${i === sol ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
                <div style={i === sol ? play : undefined} className={`h-full w-full ${i === sol ? 'vt-kb' : i === prev ? 'scale-110' : ''}`}>
                  <MachineVisual src={imgOf(x, i + 1)} alt={`${x.title} turnkey production line built by V Tech`} aspectClass="h-full w-full" />
                </div>
              </div>
            ))}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a1450] via-[#0a1450]/85 to-transparent to-[75%]" />

            {/* Top: line counter and throughput */}
            <div key={`top-${s.slug}`} className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-5 sm:p-7">
              <span className="vt-fade rounded-full border border-white/25 bg-[#0a1450]/50 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
                Line {sol + 1} of {n}
              </span>
              <div className="vt-fade rounded-2xl border border-white/25 bg-[#0a1450]/55 px-4 py-3 backdrop-blur-md sm:text-right" style={{ animationDelay: '.1s' }}>
                <p className="text-xs font-medium text-blue-200">Rated throughput</p>
                <p className="mt-0.5 max-w-[14rem] text-sm font-bold leading-snug sm:text-base">{s.throughputMetric}</p>
              </div>
            </div>

            {/* Bottom: details sit on the image gradient */}
            <div key={s.slug} className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-8">
              <h3 className="vt-fade max-w-xl text-2xl font-bold leading-tight sm:text-3xl" style={{ animationDelay: '.05s' }}>{s.title}</h3>
              <p className="vt-fade mt-3 max-w-xl text-[15px] leading-relaxed text-blue-50" style={{ animationDelay: '.15s' }}>{s.shortBenefit}</p>

              <p className="vt-fade mt-6 text-sm font-semibold text-blue-100" style={{ animationDelay: '.25s' }}>What the line covers, in order</p>
              <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {s.stages.map((st, k) => (
                  <li key={st.title} className="vt-fade flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm font-medium backdrop-blur-md" style={{ animationDelay: `${0.3 + k * 0.07}s` }}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#1a2a8c]">{k + 1}</span>
                    <span className="leading-snug">{st.title}</span>
                  </li>
                ))}
              </ol>

              <div className="vt-fade mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: '.6s' }}>
                <Link to={`/turnkey-solutions/${s.slug}/`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1a2a8c] transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg">
                  View line diagram and specs <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/contact-us/" className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-sm font-semibold underline-offset-4 hover:underline">
                  Quote for this line <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ WHY (REDESIGNED) ============================ */
function WhySection({ onTalk }: { onTalk: () => void }) {
  return (
    <section id="why" className="scroll-mt-6 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:col-span-7 lg:text-[2.75rem] lg:leading-[1.1]">
            European-grade components.<br className="hidden sm:block" /> Indian engineering value.
          </h2>
          <p className="text-base leading-relaxed text-slate-600 lg:col-span-5">
            Built in our integrated Chennai works with sub-assemblies from the brands below, delivering 25–35% CapEx savings without compromising spares availability.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Image with overlapping stat */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem]">
                <MachineVisual src={imgOf(PRODUCT_CATEGORIES[2], 2)} alt="V Tech engineers assembling a stainless steel packaging machine at the Chennai works" aspectClass="aspect-[4/5]" />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl bg-[#1a2a8c] px-6 py-5 text-white shadow-xl shadow-blue-900/25 sm:left-8 sm:right-auto sm:pr-10">
                <p className="text-4xl font-extrabold leading-none sm:text-5xl">25–35%</p>
                <p className="text-sm leading-snug text-blue-100">lower CapEx<br />than Western OEMs</p>
              </div>
            </div>
          </div>

          {/* Four open points in a 2x2 grid */}
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
              {WHY_POINTS.map(({ icon: Icon, title, desc }, i) => (
                <li key={title} className="border-t border-slate-200 pb-6 pt-6">
                  <Reveal delay={i * 0.06}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1a2a8c]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                    <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{desc}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-slate-200 pt-6">
              <p className="text-sm font-semibold text-slate-500">Components we build around</p>
              <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-base font-bold text-[#1a2a8c]">
                {WHY_BRANDS.map((b) => <span key={b}>{b}</span>)}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={onTalk} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1a2a8c] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#14217a] hover:shadow-lg hover:shadow-blue-900/30">
                <Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer
              </button>
              <Link to="/export-and-compliance/certifications-and-standards/" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#1a2a8c] bg-white px-6 py-4 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-blue-50">
                See compliance matrix <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Auto-scrolling, seamless looping carousel. Pauses while hovered, focused or touched. */
function IndustryCarousel() {
  const box = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pos = el.scrollLeft;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const half = el.scrollWidth / 2;
      if (paused.current) {
        pos = el.scrollLeft;
      } else {
        pos += dt * 0.045; // ~45px per second
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const wrap = () => {
    const el = box.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
  };
  const nudge = (dir: number) => box.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  const hold = () => { window.clearTimeout(resumeTimer.current); paused.current = true; };
  const release = (delay = 0) => { window.clearTimeout(resumeTimer.current); resumeTimer.current = window.setTimeout(() => { paused.current = false; }, delay); };

  const list = [...INDUSTRIES, ...INDUSTRIES];
  const arrowCls = 'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 transition-colors hover:bg-[#1a2a8c] hover:text-white sm:flex';

  return (
    <div className="relative" onMouseEnter={hold} onMouseLeave={() => release(0)} onFocus={hold} onBlur={() => release(0)} onTouchStart={hold} onTouchEnd={() => release(2500)}>
      <button type="button" aria-label="Previous industries" onClick={() => nudge(-1)} className={`${arrowCls} left-3`}><ChevronLeft className="h-5 w-5" /></button>
      <button type="button" aria-label="Next industries" onClick={() => nudge(1)} className={`${arrowCls} right-3`}><ChevronRight className="h-5 w-5" /></button>
      <div ref={box} onScroll={wrap} className="flex gap-5 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden" aria-label="Industries we serve" role="region">
        {list.map((x, i) => {
          const clone = i >= INDUSTRIES.length;
          return (
            <Link key={`${x.slug}-${i}`} to={`/industries/${x.slug}/`} aria-hidden={clone} tabIndex={clone ? -1 : 0}
              className="vt-zoom group relative flex h-[460px] w-[290px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl bg-[#0a1450] shadow-lg shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/25 sm:w-[330px]">
              <div className="absolute inset-0"><MachineVisual src={imgOf(x, i % INDUSTRIES.length)} alt={`${x.title} production environment with V Tech machinery`} aspectClass="h-full w-full" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1450] via-[#0a1450]/70 to-[#0a1450]/10 transition-opacity duration-300 group-hover:from-[#0a1450]" />
              <div className="relative p-6 text-white sm:p-7">
                {/* Slot 1: standards chips, always one row */}
                <div className="flex h-7 gap-1.5 overflow-hidden">
                  {x.standards.slice(0, 2).map((s) => (
                    <span key={s.code} className="min-w-0 truncate rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold leading-none text-blue-100 backdrop-blur-sm">{s.code}</span>
                  ))}
                </div>
                {/* Slot 2: title, always two lines tall */}
                <h3 className="mt-4 line-clamp-2 h-[3.75rem] text-2xl font-bold leading-tight">{x.title}</h3>
                <span aria-hidden="true" className="mt-4 block h-px w-full bg-white/25 transition-all duration-500 group-hover:bg-blue-300" />
                {/* Slot 3: description, always three lines tall */}
                <p className="mt-4 line-clamp-3 h-[4.3rem] text-sm leading-relaxed text-blue-50/90">{x.shortBenefit}</p>
                {/* Slot 4: call to action, pinned to the same spot on every card */}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Explore sector <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const CSS = `
.vt-grid{background-image:linear-gradient(rgba(26,42,140,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,42,140,.07) 1px,transparent 1px);background-size:40px 40px;animation:vt-pan 24s linear infinite}
@keyframes vt-pan{to{background-position:40px 40px}}
.vt-in>*{opacity:0;transform:translateY(16px);animation:vt-rise .7s cubic-bezier(.2,.7,.2,1) forwards}
.vt-in>*:nth-child(2){animation-delay:.1s}.vt-in>*:nth-child(3){animation-delay:.2s}.vt-in>*:nth-child(4){animation-delay:.3s}
@keyframes vt-rise{to{opacity:1;transform:none}}
.vt-flow{stroke-dasharray:6 6;animation:vt-dash 1s linear infinite}
@keyframes vt-dash{to{stroke-dashoffset:-12}}
.vt-pulse{transform-box:fill-box;transform-origin:center;animation:vt-ping 2s ease-out infinite}
@keyframes vt-ping{from{opacity:.5;transform:scale(1)}to{opacity:0;transform:scale(3)}}
.vt-kb{animation:vt-kb 6.5s linear forwards}
@keyframes vt-kb{from{transform:scale(1)}to{transform:scale(1.1)}}
.vt-prog{animation:vt-prog 6.5s linear forwards}
@keyframes vt-prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.vt-word{transform:translateY(115%);animation:vt-up .85s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes vt-up{to{transform:none}}
.vt-fade{opacity:0;transform:translateY(16px);animation:vt-rise .8s cubic-bezier(.2,.7,.2,1) forwards}
.vt-accent{transform:scaleX(0);transform-origin:inherit;animation:vt-grow .7s .1s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes vt-grow{to{transform:scaleX(1)}}
@keyframes vt-marq{to{transform:translateX(-50%)}}
.vt-zoom img{transition:transform 900ms cubic-bezier(.2,.7,.2,1)}
.vt-zoom:hover img{transform:scale(1.07)}
@media (prefers-reduced-motion:reduce){.vt-root *{animation:none!important;transition:none!important}.vt-reveal,.vt-word,.vt-fade,.vt-accent{opacity:1!important;transform:none!important}}
`;

export default function HomePage() {
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [schedulerMode, setSchedulerMode] = useState<'engineer' | 'tour' | null>(null);
  const [selectedHubId, setSelectedHubId] = useState('usa');
  const [cat, setCat] = useState(0);
  const [sol, setSol] = useState(0);
  const [quote, setQuote] = useState(0);
  const hub = EXPORT_HUBS.find((h) => h.id === selectedHubId) || EXPORT_HUBS[0];
  const t = TESTIMONIALS[quote] || TESTIMONIALS[0];

  const primary = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1a2a8c] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#14217a] hover:shadow-lg hover:shadow-blue-900/30';

  return (
    <div className="vt-root bg-white">
      <style>{CSS}</style>
      <SeoHead
        title="V Tech Manufacturing | Conveyor, Packaging & Turnkey Line Exporter India"
        description="V Tech Manufacturing (Chennai, India) engineers and exports conveyors, liquid filling, powder packaging, warehouse automation, and turnkey process lines globally."
      />

      {/* HERO: UNCHANGED */}
      <HeroSlider />

      <main>
        {/* MACHINES: UNCHANGED */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Chapter id="machines" title="Four machinery divisions" intro="Choose a division to preview it." action={<GhostLink to="/products/">All 33 machine models</GhostLink>}>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <Link to={`/products/${PRODUCT_CATEGORIES[cat].slug}/`} key={PRODUCT_CATEGORIES[cat].slug} className="group relative block min-h-[380px] overflow-hidden rounded-[2rem] border border-slate-200 lg:col-span-7 lg:min-h-[540px]">
                <div className="absolute inset-0"><MachineVisual src={PRODUCT_CATEGORIES[cat].image} alt={PRODUCT_CATEGORIES[cat].title} aspectClass="h-full w-full" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a5c]/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-6 shadow-2xl sm:inset-x-6 sm:bottom-6 sm:max-w-md">
                  <div className="flex flex-wrap gap-1.5">
                    {PRODUCT_CATEGORIES[cat].industries.slice(0, 3).map((i: string) => (<span key={i} className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-[#1a2a8c]">{i}</span>))}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-slate-900">{PRODUCT_CATEGORIES[cat].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{PRODUCT_CATEGORIES[cat].tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a2a8c] px-5 py-2.5 text-sm font-semibold text-white group-hover:bg-[#14217a]">Explore division <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>

              <div className="flex flex-col gap-3 lg:col-span-5" role="tablist" aria-label="Machinery divisions">
                {PRODUCT_CATEGORIES.map((c, i) => (
                  <button key={c.slug} type="button" role="tab" aria-selected={cat === i} onClick={() => setCat(i)} onMouseEnter={() => setCat(i)}
                    className={`relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border p-3 pr-5 text-left ${cat === i ? 'border-[#1a2a8c] bg-blue-50 shadow-lg shadow-blue-900/10' : 'border-slate-200 bg-white hover:border-[#1a2a8c]'}`}>
                    {cat === i && <span className="absolute inset-y-0 left-0 w-1.5 bg-[#1a2a8c]" />}
                    <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl"><MachineVisual src={c.image} alt="" aspectClass="h-full w-full" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold leading-snug text-slate-900">{c.title}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">{c.industries.slice(0, 3).join(', ')}</p>
                    </div>
                    <ArrowRight className={`h-5 w-5 shrink-0 ${cat === i ? 'text-[#1a2a8c]' : 'text-slate-300'}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </Chapter>
        </div>

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

        {/* TURNKEY: redesigned */}
        <TurnkeySection sol={sol} setSol={setSol} />

        {/* INDUSTRIES: auto-scrolling carousel, pauses on hover */}
        <section id="industries" className="relative scroll-mt-6 overflow-hidden bg-slate-100 py-16 sm:py-24">
          <div aria-hidden="true" className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-200/50 blur-3xl" />
          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-1 w-14 rounded-full bg-[#1a2a8c]" />
                  <span className="text-sm font-semibold text-[#1a2a8c]">{INDUSTRIES.length} sectors, one build standard each</span>
                </div>
                <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#0a1450] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
                  Built for regulated,{' '}
                  <span className="whitespace-nowrap">high&#8209;throughput</span> industries
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-base leading-relaxed text-slate-600">Every sector page lists the exact standards we build to, from cGMP and 21 CFR Part 11 to ATEX and CE. Hover over a card to pause the scroll.</p>
                <div className="mt-5"><GhostLink to="/industries/">All industries</GhostLink></div>
              </div>
            </div>
          </div>
          <div className="relative mt-12"><IndustryCarousel /></div>
        </section>

        {/* WHY: redesigned */}
        <WhySection onTalk={() => setSchedulerMode('engineer')} />

        {/* PROCESS: sticky image on the left, ruled step list on the right */}
        <section id="process" className="scroll-mt-6 bg-slate-50">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">From inquiry to commissioned production in 7 stages</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">A fixed, documented path, so you know what happens next and who is responsible for it.</p>
                <div className="mt-8 overflow-hidden rounded-3xl">
                  <MachineVisual src={imgOf(PRODUCT_CATEGORIES[3], 3)} alt="V Tech project team reviewing a 3D line layout before factory build" aspectClass="aspect-[16/10]" />
                </div>
                <button type="button" onClick={() => setSchedulerMode('engineer')} className={`${primary} mt-6`}>Book a 30-minute consultation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
              </div>
            </div>
            <ol className="border-t border-slate-300 lg:col-span-7">
              {PROCESS_STEPS.map((st) => (
                <li key={st.num} className="border-b border-slate-300">
                  <Reveal delay={0.04} className="grid grid-cols-[72px_1fr] items-baseline gap-4 py-7 sm:grid-cols-[96px_1fr]">
                    <span className="text-5xl font-extrabold leading-none text-blue-200 sm:text-6xl">{st.num}</span>
                    <div><h3 className="text-xl font-bold text-slate-900">{st.title}</h3><p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{st.detail}</p></div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROJECTS: original layout restored */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Chapter id="projects" title="Featured export case studies" action={<GhostLink to="/projects/">Filter all projects</GhostLink>}>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              {PROJECTS.slice(0, 3).map((p, i) => (
                <article key={p.id} className={`group overflow-hidden rounded-3xl border border-slate-200 transition-colors hover:border-[#1a2a8c] ${i === 0 ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-2 sm:flex'}`}>
                  <div className={`overflow-hidden ${i === 0 ? '' : 'sm:w-2/5 sm:shrink-0'}`}>
                    <div className="transition-transform duration-700 group-hover:scale-105"><MachineVisual src={p.image} alt={p.title} aspectClass={i === 0 ? 'aspect-[16/10]' : 'aspect-[16/10] sm:h-full'} /></div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-medium text-slate-500">{p.country}, {p.industry}</p>
                    <h3 className={`mt-1.5 font-bold text-slate-900 ${i === 0 ? 'text-2xl' : 'text-base'}`}>{p.title}</h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                      {p.results.map((r) => (<li key={r} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1a2a8c]" aria-hidden="true" /><span>{r}</span></li>))}
                    </ul>
                    <Link to="/projects/" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a8c] hover:underline">Read full case study <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </Chapter>
        </div>

        {/* EXPORT MAP */}
        <Band id="exports" tone="dark" title="Direct exports from Chennai Port to 6 continents" intro="Select a region to see the electrical standard, safety build, and ports we ship to.">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <svg viewBox="0 0 960 420" className="h-auto w-full" role="img" aria-label="Map of V Tech export regions with shipping routes from Chennai">
                <g fill="#1c2a7a" stroke="#3a4cb0" strokeWidth="1">
                  <path d="M90,70 L280,60 L315,135 L250,210 L175,205 L125,145 Z" />
                  <path d="M235,225 L310,245 L295,355 L245,380 L215,305 Z" />
                  <path d="M430,75 L540,65 L560,145 L440,155 Z" />
                  <path d="M445,175 L555,170 L585,260 L520,355 L465,300 L435,225 Z" />
                  <path d="M555,80 L840,75 L865,185 L765,255 L685,260 L635,235 L565,195 Z" />
                  <path d="M750,295 L875,290 L885,375 L765,380 Z" />
                </g>
                {EXPORT_HUBS.map((h) => {
                  const on = h.id === selectedHubId;
                  return <path key={`arc-${h.id}`} d={`M660,222 Q ${(660 + h.cx) / 2},${Math.min(222, h.cy) - 48} ${h.cx},${h.cy}`} fill="none" stroke={on ? '#ffffff' : '#5c6fd1'} strokeWidth={on ? 2.5 : 1.25} className={on ? 'vt-flow' : ''} style={on ? undefined : { strokeDasharray: '4 4' }} />;
                })}
                <circle cx="660" cy="222" r="7" fill="#60a5fa" stroke="#fff" strokeWidth="2" />
                <text x="660" y="242" textAnchor="middle" className="fill-white text-[10px] font-bold">Chennai HQ</text>
                {EXPORT_HUBS.map((h) => {
                  const on = h.id === selectedHubId;
                  return (
                    <g key={h.id} className="cursor-pointer" onClick={() => setSelectedHubId(h.id)}>
                      {on && <circle cx={h.cx} cy={h.cy} r="11" fill="#60a5fa" className="vt-pulse" />}
                      <circle cx={h.cx} cy={h.cy} r={on ? 11 : 7} fill={on ? '#60a5fa' : '#8c9cdf'} stroke="#fff" strokeWidth="2" />
                      <text x={h.cx} y={h.cy - 16} textAnchor="middle" className={`text-[10px] font-semibold ${on ? 'fill-white' : 'fill-blue-200'}`}>{h.region.split(' (')[0]}</text>
                    </g>
                  );
                })}
              </svg>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {EXPORT_HUBS.map((h) => (
                  <button key={h.id} type="button" onClick={() => setSelectedHubId(h.id)} aria-pressed={selectedHubId === h.id} className={`border-b-2 pb-1 text-sm font-semibold transition-colors ${selectedHubId === h.id ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}>{h.region.split(' (')[0]}</button>
                ))}
              </div>
            </div>
            <div key={hub.id} className="vt-in flex flex-col border-white/20 lg:col-span-4 lg:border-l lg:pl-10">
              <h3 className="text-2xl font-bold">{hub.region}</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100">{hub.focus}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div><dt className="text-blue-300">Electrical and safety build</dt><dd className="mt-1 font-mono font-medium text-white">{hub.voltage}</dd></div>
                <div><dt className="text-blue-300">Primary destination ports</dt><dd className="mt-1 text-white">{hub.ports}</dd></div>
              </dl>
              <Link to="/export-and-compliance/fat-shipping-and-installation/" className="mt-8 inline-flex items-center gap-1.5 self-start border-b border-white pb-0.5 text-sm font-semibold">Incoterms and sea packing details <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Band>

        {/* PROOF */}
        <Band id="proof" title="Trusted by plant heads and EPC procurement teams">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <blockquote key={t.country} className="vt-in lg:col-span-8">
              <Quote className="h-12 w-12 text-blue-200" aria-hidden="true" />
              <p className="mt-4 text-2xl font-medium leading-snug text-slate-900 sm:text-3xl">{t.quote}</p>
              <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a2a8c] font-bold text-white" aria-hidden="true">{t.author.charAt(0)}</span>
                <span><span className="block font-bold text-slate-900">{t.author}</span><span className="text-slate-500">{t.company}, {t.country}</span></span>
                <span className="font-semibold text-[#1a2a8c] sm:ml-auto">{t.outcome}</span>
              </footer>
            </blockquote>
            <ul className="border-t border-slate-200 lg:col-span-4">
              {TESTIMONIALS.map((x, i) => (
                <li key={x.country} className="border-b border-slate-200">
                  <button type="button" onClick={() => setQuote(i)} aria-pressed={quote === i} className="group flex w-full items-center justify-between gap-3 py-4 text-left">
                    <span><span className={`block text-base font-bold transition-colors ${quote === i ? 'text-[#1a2a8c]' : 'text-slate-500 group-hover:text-slate-900'}`}>{x.company}</span><span className="text-xs text-slate-500">{x.country}</span></span>
                    <span className={`h-2 w-2 rounded-full ${quote === i ? 'bg-[#1a2a8c]' : 'bg-slate-200'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-14 overflow-hidden border-y border-slate-200 py-5">
            <p className="px-1 text-xs font-semibold text-slate-500">Component ecosystem. [PLACEHOLDER] Client logos available on request under NDA.</p>
            <div className="mt-3 flex w-max gap-12 whitespace-nowrap px-1 text-sm font-bold text-[#1a2a8c]" style={{ animation: 'vt-marq 28s linear infinite' }}>
              {[0, 1].flatMap((r) => ['SIEMENS Automation', 'ALLEN-BRADLEY', 'SEW-EURODRIVE', 'FESTO Pneumatics', 'INTRALOX Belting', 'ENDRESS+HAUSER'].map((n) => <span key={`${r}-${n}`}>{n}</span>))}
            </div>
          </div>
        </Band>

        {/* LIBRARY */}
        <Band id="library" tone="soft" title="Selection guides, comparison matrices and export briefs" action={<GhostLink to="/resources/">Browse all resources</GhostLink>}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {RESOURCES[0] && (
              <Link to="/resources/" className="vt-zoom group lg:col-span-6">
                <div className="overflow-hidden rounded-3xl"><MachineVisual src={imgOf(RESOURCES[0], 1)} alt={`Cover image for ${RESOURCES[0].title}`} aspectClass="aspect-[16/11]" /></div>
                <p className="mt-5 text-sm font-semibold text-[#1a2a8c]">{RESOURCES[0].type}  ·  {RESOURCES[0].readTime}</p>
                <h3 className="mt-2 text-2xl font-bold leading-snug text-slate-900 group-hover:text-[#1a2a8c]">{RESOURCES[0].title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{RESOURCES[0].summary}</p>
              </Link>
            )}
            <div className="divide-y divide-slate-200 self-start border-y border-slate-200 lg:col-span-6">
              {RESOURCES.slice(1).map((r, i) => (
                <Link key={r.id} to="/resources/" className="vt-zoom group flex gap-5 py-5">
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40"><MachineVisual src={imgOf(r, i + 2)} alt={`Cover image for ${r.title}`} aspectClass="h-full w-full" /></div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#1a2a8c]">{r.type}  ·  {r.readTime}</p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-slate-900 group-hover:text-[#1a2a8c]">{r.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">{r.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Band>

        {/* QUOTE CTA */}
        <section id="quote" className="relative scroll-mt-6 overflow-hidden bg-[#1a2a8c] text-white">
          <div className="absolute inset-0 opacity-20"><MachineVisual src={IMG_HERO} alt="" aspectClass="h-full w-full" /></div>
          <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:items-center lg:px-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Ready to engineer your next production or warehouse line?</h2>
              <p className="mt-4 text-sm leading-relaxed text-blue-100">Share your target capacity, container size, and destination port. Get a technical proposal, 2D concept footprint, and FOB/CIF quotation from our Chennai engineering team.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setSchedulerMode('engineer')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1a2a8c] transition-transform hover:-translate-y-0.5"><Calendar className="h-4 w-4" /> Talk to an engineer</button>
                <button type="button" onClick={() => setCatalogModalOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10"><FileDown className="h-4 w-4" /> Download 2026 catalog</button>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-2 text-slate-900 lg:col-span-7">
              <RfqForm compact heading="Quick export RFQ" subheading="Prefilled for rapid budgetary and engineering review." />
            </div>
          </div>
        </section>
      </main>

      <GatedDownloadModal isOpen={catalogModalOpen} onClose={() => setCatalogModalOpen(false)} assetId="vtech-master-catalog-2026" assetTitle="V Tech 2026 Master Machinery & Turnkey Catalog" />
      <SchedulerModal mode={schedulerMode} onClose={() => setSchedulerMode(null)} />
    </div>
  );
}