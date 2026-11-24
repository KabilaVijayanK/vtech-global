import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, FileDown, Calendar, ShieldCheck, Cog, Globe2, Wrench, CheckCircle2 } from 'lucide-react';
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

function GhostLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#1a2a8c] px-4 py-2 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-[#1a2a8c] hover:text-white">
      {children} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

type Slide = { tag: string; nav: string; title: string; text: string; img: string; align: 'left' | 'center' | 'right'; to: string; cta: string };

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

const CSS = `
.vt-grid{background-image:linear-gradient(rgba(26,42,140,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,42,140,.07) 1px,transparent 1px);background-size:40px 40px;animation:vt-pan 24s linear infinite}
@keyframes vt-pan{to{background-position:40px 40px}}
.vt-belt{background:repeating-linear-gradient(90deg,#1a2a8c 0 18px,#2b3fb0 18px 20px);animation:vt-run 1.2s linear infinite}
@keyframes vt-run{to{background-position-x:20px}}
.vt-box{position:absolute;bottom:12px;left:0;background:#fff;border:2px solid #1a2a8c;border-radius:3px;animation:vt-travel 16s linear infinite}
@keyframes vt-travel{from{transform:translateX(-60px)}to{transform:translateX(100vw)}}
.vt-in>*{opacity:0;transform:translateY(16px);animation:vt-rise .7s cubic-bezier(.2,.7,.2,1) forwards}
.vt-in>*:nth-child(2){animation-delay:.1s}.vt-in>*:nth-child(3){animation-delay:.2s}.vt-in>*:nth-child(4){animation-delay:.3s}
@keyframes vt-rise{to{opacity:1;transform:none}}
.vt-flow{stroke-dasharray:6 6;animation:vt-dash 1s linear infinite}
@keyframes vt-dash{to{stroke-dashoffset:-12}}
.vt-pulse{transform-box:fill-box;transform-origin:center;animation:vt-ping 2s ease-out infinite}
@keyframes vt-ping{from{opacity:.5;transform:scale(1)}to{opacity:0;transform:scale(3)}}
.vt-line{transform:scaleY(0);transform-origin:top;transition:transform 2.6s cubic-bezier(.6,0,.2,1)}
.vt-on .vt-line{transform:scaleY(1)}
.vt-step{opacity:.25;transform:translateY(12px);transition:opacity .6s,transform .6s}
.vt-on .vt-step{opacity:1;transform:none;transition-delay:calc(var(--i)*.3s)}
.vt-node{background:#fff;border:2px solid #1a2a8c;transition:background .3s}
.vt-on .vt-node{background:#1a2a8c;transition-delay:calc(var(--i)*.3s)}
.vt-panel{transition:flex .55s cubic-bezier(.2,.7,.2,1)}
.vt-reveal{opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.vt-open .vt-reveal{opacity:1;transform:none;transition-delay:.2s}
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
@media (prefers-reduced-motion:reduce){.vt-root *{animation:none!important;transition:none!important}.vt-line{transform:none}.vt-step{opacity:1;transform:none}.vt-reveal,.vt-word,.vt-fade,.vt-accent{opacity:1!important;transform:none!important}}
`;

export default function HomePage() {
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [schedulerMode, setSchedulerMode] = useState<'engineer' | 'tour' | null>(null);
  const [selectedHubId, setSelectedHubId] = useState('usa');
  const [cat, setCat] = useState(0);
  const [sol, setSol] = useState(0);
  const [quote, setQuote] = useState(0);
  const [procRef, procSeen] = useInView<HTMLDivElement>(0.15);
  const hub = EXPORT_HUBS.find((h) => h.id === selectedHubId) || EXPORT_HUBS[0];
  const turnkey = TURNKEY_SOLUTIONS[sol] || TURNKEY_SOLUTIONS[0];
  const t = TESTIMONIALS[quote] || TESTIMONIALS[0];

  const primary = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1a2a8c] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#14217a] hover:shadow-lg hover:shadow-blue-900/30';
  const outline = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#1a2a8c] bg-white px-5 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-blue-50';

  return (
    <div className="vt-root bg-white">
      <style>{CSS}</style>
      <SeoHead
        title="V Tech Manufacturing | Conveyor, Packaging & Turnkey Line Exporter India"
        description="V Tech Manufacturing (Chennai, India) engineers and exports conveyors, liquid filling, powder packaging, warehouse automation, and turnkey process lines globally."
      />

      <HeroSlider />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <main>
          {/* MACHINES: showcase stage + thumbnail selector */}
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

          {/* TURNKEY: tabs */}
          <Chapter id="turnkey" title="Turnkey lines, one team accountable" action={<GhostLink to="/turnkey-solutions/">All turnkey lines</GhostLink>}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col" role="tablist">
                {TURNKEY_SOLUTIONS.map((s, i) => (
                  <button key={s.slug} role="tab" aria-selected={sol === i} onClick={() => setSol(i)}
                    className={`min-w-[220px] rounded-2xl border p-4 text-left transition-all lg:min-w-0 ${sol === i ? 'border-[#1a2a8c] bg-[#1a2a8c] text-white shadow-lg shadow-blue-900/20' : 'border-slate-200 bg-white hover:border-[#1a2a8c]'}`}>
                    <p className="text-sm font-bold">{s.title}</p>
                    <p className={`mt-1 font-mono text-xs ${sol === i ? 'text-blue-100' : 'text-slate-500'}`}>{s.throughputMetric}</p>
                  </button>
                ))}
              </div>
              <div key={turnkey.slug} className="vt-in rounded-3xl border border-slate-200 bg-blue-50/50 p-6 sm:p-8 lg:col-span-8">
                <p className="font-mono text-xs font-semibold text-[#1a2a8c]">{turnkey.throughputMetric}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{turnkey.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{turnkey.shortBenefit}</p>
                <div className="mt-6 flex flex-wrap items-center gap-y-3" aria-label="Line stages">
                  {turnkey.stages.map((s, k) => (
                    <div key={s.title} className="flex items-center">
                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#1a2a8c] ring-1 ring-blue-200">{s.title}</span>
                      {k < turnkey.stages.length - 1 && <svg width="30" height="8" aria-hidden="true"><line x1="0" y1="4" x2="30" y2="4" stroke="#1a2a8c" strokeWidth="2" className="vt-flow" /></svg>}
                    </div>
                  ))}
                </div>
                <Link to={`/turnkey-solutions/${turnkey.slug}/`} className={`${primary} mt-7`}>View line diagram and specs <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Chapter>

          {/* INDUSTRIES: tiles that fill blue on hover */}
          <Chapter id="industries" title="Built for regulated, high-throughput industries" intro="Each sector page lists the standards we build to.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((ind) => (
                <Link key={ind.slug} to={`/industries/${ind.slug}/`} className="group relative flex min-h-[170px] flex-col justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1a2a8c] hover:bg-[#1a2a8c]">
                  <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-[#1a2a8c] transition-all group-hover:rotate-45 group-hover:text-white" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-500 transition-colors group-hover:text-blue-100">{ind.standards.map((s) => s.code).join(', ')}</p>
                    <h3 className="mt-2 pr-6 text-lg font-bold text-slate-900 transition-colors group-hover:text-white">{ind.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors group-hover:text-blue-50">{ind.shortBenefit}</p>
                </Link>
              ))}
            </div>
          </Chapter>

          {/* WHY: 2x2 with hairline cross */}
          <Chapter id="why" title="European-grade components. Indian engineering value." intro="Built in our integrated Chennai works with Siemens, Rockwell, SEW-Eurodrive, Festo, and Intralox sub-assemblies, delivering 25–35% CapEx savings without compromising spares availability."
            action={<div className="flex flex-wrap gap-3"><button type="button" onClick={() => setSchedulerMode('engineer')} className={primary}><Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer</button><Link to="/export-and-compliance/certifications-and-standards/" className={outline}>Compliance matrix</Link></div>}>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {[
                { icon: Cog, title: 'Custom SPM and layout engineering', desc: 'Every line is tailored to your building columns, container shapes, and viscosity, backed by 3D SolidWorks and FlexSim simulation.' },
                { icon: Globe2, title: 'India cost-to-quality advantage', desc: 'In-house CNC fiber laser, press-brake, and SS316L TIG fabrication cut lead times and CapEx by 25–35% vs. Western OEMs.' },
                { icon: ShieldCheck, title: 'CE, UL508A, cGMP and ATEX readiness', desc: '400V/50Hz or 480V/60Hz control cabinets, EN 10204 3.1 metallurgy certs, and hazardous Zone 1/2 builds ready for local inspection.' },
                { icon: Wrench, title: 'Witnessed video FAT and 48-hr global spares', desc: 'Full 48-hour live-streamed or SGS/TUV Factory Acceptance Test before dispatch, plus VPN PLC diagnostics and DHL spares.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group bg-white p-7 transition-colors hover:bg-blue-50">
                  <Icon className="h-7 w-7 text-[#1a2a8c] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </Chapter>

          {/* PROCESS: zigzag timeline */}
          <Chapter id="process" title="From inquiry to commissioned production in 7 stages">
            <div ref={procRef} className={`relative ${procSeen ? 'vt-on' : ''}`}>
              <div className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-blue-100 lg:left-1/2 lg:-translate-x-1/2" />
              <div className="vt-line absolute bottom-0 left-[11px] top-0 w-0.5 bg-[#1a2a8c] lg:left-1/2 lg:-translate-x-1/2" />
              <div className="space-y-8">
                {PROCESS_STEPS.map((st, i) => (
                  <div key={st.num} className={`vt-step relative pl-12 lg:w-1/2 ${i % 2 ? 'lg:ml-auto lg:pl-12' : 'lg:pl-0 lg:pr-12 lg:text-right'}`} style={{ ['--i' as string]: i }}>
                    <span className={`vt-node absolute left-0 top-1 h-6 w-6 rounded-full ${i % 2 ? 'lg:-left-3' : 'lg:left-auto lg:-right-3'}`} style={{ ['--i' as string]: i }} />
                    <p className="font-mono text-xs font-bold text-[#1a2a8c]">{st.num}</p>
                    <h3 className="text-lg font-bold text-slate-900">{st.title}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-600 lg:inline-block">{st.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Chapter>

          {/* PROJECTS: one feature + two stacked */}
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

          {/* EXPORT MAP */}
          <Chapter id="exports" title="Direct exports from Chennai Port to 6 continents">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="rounded-3xl border border-slate-200 bg-blue-50/50 p-4 sm:p-6 lg:col-span-7">
                <svg viewBox="0 0 960 420" className="h-auto w-full" role="img" aria-label="V Tech export regions map">
                  <g fill="#dbe4fb" stroke="#c3d0f5" strokeWidth="1">
                    <path d="M90,70 L280,60 L315,135 L250,210 L175,205 L125,145 Z" />
                    <path d="M235,225 L310,245 L295,355 L245,380 L215,305 Z" />
                    <path d="M430,75 L540,65 L560,145 L440,155 Z" />
                    <path d="M445,175 L555,170 L585,260 L520,355 L465,300 L435,225 Z" />
                    <path d="M555,80 L840,75 L865,185 L765,255 L685,260 L635,235 L565,195 Z" />
                    <path d="M750,295 L875,290 L885,375 L765,380 Z" />
                  </g>
                  {EXPORT_HUBS.map((h) => {
                    const on = h.id === selectedHubId;
                    return <path key={`arc-${h.id}`} d={`M660,222 Q ${(660 + h.cx) / 2},${Math.min(222, h.cy) - 48} ${h.cx},${h.cy}`} fill="none" stroke={on ? '#1a2a8c' : '#93a3d9'} strokeWidth={on ? 2.5 : 1.25} className={on ? 'vt-flow' : ''} style={on ? undefined : { strokeDasharray: '4 4' }} />;
                  })}
                  <circle cx="660" cy="222" r="7" fill="#1a2a8c" stroke="#fff" strokeWidth="2" />
                  <text x="660" y="242" textAnchor="middle" className="fill-slate-900 text-[10px] font-bold">Chennai HQ</text>
                  {EXPORT_HUBS.map((h) => {
                    const on = h.id === selectedHubId;
                    return (
                      <g key={h.id} className="cursor-pointer" onClick={() => setSelectedHubId(h.id)}>
                        {on && <circle cx={h.cx} cy={h.cy} r="11" fill="#1a2a8c" className="vt-pulse" />}
                        <circle cx={h.cx} cy={h.cy} r={on ? 11 : 7} fill={on ? '#1a2a8c' : '#6f82cf'} stroke="#fff" strokeWidth="2" />
                        <text x={h.cx} y={h.cy - 16} textAnchor="middle" className={`text-[10px] font-semibold ${on ? 'fill-[#1a2a8c]' : 'fill-slate-600'}`}>{h.region.split(' (')[0]}</text>
                      </g>
                    );
                  })}
                </svg>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {EXPORT_HUBS.map((h) => (
                    <button key={h.id} type="button" onClick={() => setSelectedHubId(h.id)} aria-pressed={selectedHubId === h.id} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${selectedHubId === h.id ? 'bg-[#1a2a8c] text-white' : 'border border-blue-100 bg-white text-slate-700 hover:bg-blue-50'}`}>{h.region.split(' (')[0]}</button>
                  ))}
                </div>
              </div>
              <div key={hub.id} className="vt-in rounded-3xl border border-slate-200 p-6 sm:p-8 lg:col-span-5">
                <h3 className="text-2xl font-bold text-slate-900">{hub.region}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{hub.focus}</p>
                <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-xs">
                  <div><dt className="font-semibold text-slate-500">Electrical and safety build</dt><dd className="mt-0.5 font-mono font-medium text-slate-900">{hub.voltage}</dd></div>
                  <div><dt className="font-semibold text-slate-500">Primary destination ports</dt><dd className="mt-0.5 text-slate-800">{hub.ports}</dd></div>
                </dl>
                <Link to="/export-and-compliance/fat-shipping-and-installation/" className={`${outline} mt-6 !px-4 !py-2.5 !text-xs`}>Incoterms and sea packing details <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </Chapter>

          {/* PROOF: one big quote with switcher */}
          <Chapter id="proof" title="Trusted by plant heads and EPC procurement teams">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <blockquote key={t.country} className="vt-in flex flex-col justify-between rounded-3xl bg-blue-50/60 p-7 sm:p-10 lg:col-span-8">
                <div>
                  <p className="font-mono text-xs font-semibold text-[#1a2a8c]">{t.outcome}</p>
                  <p className="mt-4 text-xl font-medium leading-relaxed text-slate-900 sm:text-2xl">“{t.quote}”</p>
                </div>
                <footer className="mt-8 text-sm"><p className="font-bold text-slate-900">{t.author}</p><p className="text-slate-500">{t.company}, {t.country}</p></footer>
              </blockquote>
              <div className="flex gap-2 lg:col-span-4 lg:flex-col">
                {TESTIMONIALS.map((x, i) => (
                  <button key={x.country} type="button" onClick={() => setQuote(i)} aria-pressed={quote === i} className={`flex-1 rounded-2xl border p-4 text-left text-sm transition-all ${quote === i ? 'border-[#1a2a8c] bg-white shadow-md' : 'border-slate-200 hover:border-[#1a2a8c]'}`}>
                    <p className="font-bold text-slate-900">{x.company}</p><p className="text-xs text-slate-500">{x.country}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 py-4">
              <p className="px-6 text-xs font-semibold text-slate-500">Component ecosystem. [PLACEHOLDER] Client logos available on request under NDA.</p>
              <div className="mt-3 flex w-max gap-12 whitespace-nowrap px-6 text-sm font-bold text-[#1a2a8c]" style={{ animation: 'vt-marq 28s linear infinite' }}>
                {[0, 1].flatMap((r) => ['SIEMENS Automation', 'ALLEN-BRADLEY', 'SEW-EURODRIVE', 'FESTO Pneumatics', 'INTRALOX Belting', 'ENDRESS+HAUSER'].map((n) => <span key={`${r}-${n}`}>{n}</span>))}
              </div>
            </div>
          </Chapter>

          {/* LIBRARY: index rows */}
          <Chapter id="library" title="Selection guides, comparison matrices and export briefs" action={<GhostLink to="/resources/">Browse all resources</GhostLink>}>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {RESOURCES.map((r) => (
                <Link key={r.id} to="/resources/" className="group grid grid-cols-1 gap-1 py-5 transition-all hover:bg-blue-50 hover:pl-4 sm:grid-cols-[150px_1fr_1.2fr_auto] sm:items-center sm:gap-6">
                  <p className="text-xs font-medium text-slate-500">{r.type}, {r.readTime}</p>
                  <h3 className="text-base font-bold text-slate-900">{r.title}</h3>
                  <p className="text-sm text-slate-600">{r.summary}</p>
                  <ArrowRight className="hidden h-4 w-4 text-[#1a2a8c] transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </Chapter>

          {/* QUOTE */}
          <section id="quote" className="scroll-mt-6 pb-16 pt-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#1a2a8c] text-white">
              <div className="vt-grid absolute inset-0 opacity-20 invert" />
              <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                  <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Ready to engineer your next production or warehouse line?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-blue-100">Share your target capacity, container size, and destination port. Get a technical proposal, 2D concept footprint, and FOB/CIF quotation from our Chennai engineering team.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={() => setSchedulerMode('engineer')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1a2a8c] transition-transform hover:-translate-y-0.5"><Calendar className="h-4 w-4" /> Talk to an engineer</button>
                    <button type="button" onClick={() => setCatalogModalOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10"><FileDown className="h-4 w-4" /> Download 2026 catalog</button>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-2 text-slate-900 lg:col-span-7">
                  <RfqForm compact heading="Quick export RFQ" subheading="Prefilled for rapid budgetary and engineering review." />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <GatedDownloadModal isOpen={catalogModalOpen} onClose={() => setCatalogModalOpen(false)} assetId="vtech-master-catalog-2026" assetTitle="V Tech 2026 Master Machinery & Turnkey Catalog" />
      <SchedulerModal mode={schedulerMode} onClose={() => setSchedulerMode(null)} />
    </div>
  );
}