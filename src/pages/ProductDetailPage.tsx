import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  FileDown,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Globe2,
} from 'lucide-react';
import type { ProductItem } from '../data/types';
import { getCategoryBySlug, ALL_PRODUCTS, getProductPath } from '../data/cmsRegistry';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';
import { GatedDownloadModal, SchedulerModal } from '../components/Modals';

interface ProductDetailPageProps {
  product: ProductItem;
}

/** Height of the site header. The in-page tab bar sticks just below it. Change if your header differs. */
const HEADER_OFFSET = 72;

const SHIPPING_TERMS = ['Video / SGS FAT', 'ISPM-15 sea crating', 'EXW / FOB Chennai / CIF / DAP'];

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
    <div ref={ref} className={`${className} ${seen ? 'pd-fade' : 'opacity-0'}`} style={seen ? { animationDelay: `${delay}s` } : undefined}>
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
@keyframes pd-rise{to{opacity:1;transform:none}}
.pd-fade{opacity:0;transform:translateY(16px);animation:pd-rise .8s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes pd-kb{from{transform:scale(1.08)}to{transform:scale(1)}}
.pd-settle{animation:pd-kb 1.6s cubic-bezier(.2,.7,.2,1) forwards}
.pd-zoom img{transition:transform 900ms cubic-bezier(.2,.7,.2,1)}
.pd-zoom:hover img{transform:scale(1.06)}
@media (prefers-reduced-motion:reduce){.pd-root *{animation:none!important;transition:none!important}.pd-fade{opacity:1!important;transform:none!important}}
`;

/* ------------------------------ page ------------------------------ */
export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [unitFocus, setUnitFocus] = useState<'both' | 'metric' | 'imperial'>('both');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [schedulerOpen, setSchedulerOpen] = useState<'engineer' | 'tour' | null>(null);
  const [active, setActive] = useState('pd-features');

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = ALL_PRODUCTS.filter((p) => product.relatedSlugs.includes(p.slug)).slice(0, 3);

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products/' },
    { label: category?.title || product.categorySlug, path: `/products/${product.categorySlug}/` },
    { label: product.name },
  ];

  const tabs = [
    { id: 'pd-features', label: 'Features' },
    { id: 'pd-specs', label: 'Specifications' },
    { id: 'pd-options', label: 'Options and applications' },
    { id: 'pd-compliance', label: 'Compliance' },
    { id: 'pd-faq', label: 'FAQ' },
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
  }, [product.slug]);

  const glance = product.specs.slice(0, 4);
  const primaryBtn = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1a2a8c] transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg';
  const ghostBtn = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0a1450]';

  return (
    <div className="pd-root bg-white">
      <style>{CSS}</style>
      <SeoHead
        title={product.seoTitle}
        description={product.seoDescription}
        breadcrumbs={breadcrumbs}
        productSchema={{
          name: product.name,
          description: product.overview,
          image: product.image,
          category: category?.title || 'Industrial Machinery',
          sku: product.slug.toUpperCase(),
        }}
        faqs={product.faqs}
      />

      {/* ============================ HERO ============================ */}
      {/* ============================ HERO ============================ */}
<section className="relative overflow-hidden bg-[#0a1450] text-white">
  <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(59,91,219,0.45),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(26,42,140,0.7),transparent_55%)]" />
  <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

  <div className="relative mx-auto max-w-[1400px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8">
    <Breadcrumbs items={breadcrumbs} dark />

    <div className="mt-5 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <span className="pd-fade inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-blue-400" /> {category?.shortTitle || 'Machinery'}, export grade, Chennai India
        </span>
        <h1 className="pd-fade mt-4 text-2xl font-extrabold leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.3rem]" style={{ animationDelay: '.08s' }}>
          {product.name} manufacturer &amp; exporter from India
        </h1>
        <p className="pd-fade mt-3 text-base leading-relaxed text-blue-50 sm:text-lg" style={{ animationDelay: '.16s' }}>{product.shortBenefit}</p>
        <p className="pd-fade mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-blue-100" style={{ animationDelay: '.22s' }}>{product.overview}</p>

        <div className="pd-fade mt-6 flex flex-wrap gap-3" style={{ animationDelay: '.3s' }}>
          <a href="#product-rfq" className={primaryBtn}>Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <button type="button" onClick={() => setDownloadOpen(true)} className={ghostBtn}><FileDown className="h-4 w-4" aria-hidden="true" /> Download datasheet</button>
          <button type="button" onClick={() => setSchedulerOpen('engineer')} className={ghostBtn}><Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer</button>
        </div>
      </div>

      <div className="pd-fade relative lg:col-span-5" style={{ animationDelay: '.2s' }}>
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0a1450] shadow-2xl shadow-black/40">
          <div className="pd-settle">
            <MachineVisual
              src={product.image}
              alt={`${product.name} manufactured by V Tech Manufacturing`}
              aspectClass="aspect-[16/10]"
              priority
            />
          </div>
          {/* Lead-time badge now sits inside the image, so it adds no height */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-xl border border-white/25 bg-[#0a1450]/85 px-3.5 py-2.5 backdrop-blur-md">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1a2a8c]"><Clock className="h-4 w-4" aria-hidden="true" /></span>
            <p className="text-xs leading-snug"><span className="block text-blue-200">Lead time</span><span className="block text-sm font-bold">{product.leadTime}</span></p>
          </div>
        </div>
      </div>
    </div>

    {/* At a glance: compact strip */}
    {glance.length > 0 && (
      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-5 lg:grid-cols-4">
        {glance.map((g, i) => (
          <Reveal key={g.parameter} delay={i * 0.07}>
            <dt className="text-xs text-blue-200">{g.parameter}</dt>
            <dd className="mt-0.5 text-base font-bold leading-snug sm:text-lg">{g.metric}</dd>
          </Reveal>
        ))}
      </dl>
    )}
  </div>
</section>

      {/* Fact bar */}
      <div className="bg-[#1a2a8c] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <p className="flex items-center gap-3 px-5 py-4 text-sm font-semibold lg:px-8"><Clock className="h-5 w-5 text-blue-200" aria-hidden="true" /> Lead time: {product.leadTime}</p>
          <p className="flex items-center gap-3 px-5 py-4 text-sm font-semibold lg:px-8"><ShieldCheck className="h-5 w-5 text-blue-200" aria-hidden="true" /> {product.compliance.slice(0, 2).join(' · ')}</p>
          <p className="flex items-center gap-3 px-5 py-4 text-sm font-semibold lg:px-8"><Globe2 className="h-5 w-5 text-blue-200" aria-hidden="true" /> Pricing on request, FOB or CIF quotation</p>
        </div>
      </div>

      {/* In-page tabs */}
      <nav aria-label="Product sections" className="sticky z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md" style={{ top: HEADER_OFFSET }}>
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
            {/* Features */}
            <div id="pd-features" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <SectionHead title="Key engineering features" />
              <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {product.keyFeatures.map((feat, i) => (
                  <li key={feat} className="border-t border-slate-200 py-5">
                    <Reveal delay={(i % 6) * 0.05} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1a2a8c]"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /></span>
                      <span className="text-[15px] leading-relaxed text-slate-800">{feat}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div id="pd-specs" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHead title="Technical specifications" />
                <div role="group" aria-label="Unit system" className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
                  {(['both', 'metric', 'imperial'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setUnitFocus(mode)}
                      aria-pressed={unitFocus === mode}
                      className={`rounded-full px-4 py-2 capitalize transition-all ${unitFocus === mode ? 'bg-[#1a2a8c] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {mode === 'both' ? 'Metric + Imperial' : mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-[#0a1450] text-xs font-semibold text-white">
                      <th className="px-5 py-4">Parameter</th>
                      {unitFocus !== 'imperial' && <th className="px-5 py-4">Metric units</th>}
                      {unitFocus !== 'metric' && <th className="px-5 py-4">Imperial / US units</th>}
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs tabular-nums">
                    {product.specs.map((row, i) => (
                      <tr key={row.parameter} className={`transition-colors hover:bg-blue-50 ${i % 2 ? 'bg-slate-50' : 'bg-white'}`}>
                        <td className="px-5 py-4 font-sans text-sm font-semibold text-slate-900">{row.parameter}</td>
                        {unitFocus !== 'imperial' && <td className="px-5 py-4 text-slate-700">{row.metric}</td>}
                        {unitFocus !== 'metric' && <td className="px-5 py-4 text-slate-700">{row.imperial}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                All specifications can be customized to destination voltage (400V/50Hz or 480V/60Hz) and plant layout constraints.
              </p>
            </div>

            {/* Customization + applications */}
            <div id="pd-options" style={{ scrollMarginTop: HEADER_OFFSET + 70 }} className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Customization options</h2>
                <ul className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                  {product.customizationOptions.map((opt) => (
                    <li key={opt} className="flex items-start gap-3 py-3.5 text-[15px] leading-relaxed text-slate-800">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Applications and industries</h2>
                <ul className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-3 py-3.5 text-[15px] leading-relaxed text-slate-800">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1a2a8c]" aria-hidden="true" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.industries.map((ind) => (
                    <span key={ind} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1a2a8c]">{ind}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div id="pd-compliance" style={{ scrollMarginTop: HEADER_OFFSET + 70 }} className="relative overflow-hidden rounded-[2rem] bg-[#0a1450] p-7 text-white sm:p-10">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="relative">
                <h2 className="text-2xl font-bold sm:text-3xl">Global compliance and export readiness</h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-blue-200">Standards supported</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.compliance.map((c) => (
                        <span key={c} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-200">FAT and shipping terms</p>
                    <ul className="mt-3 space-y-2.5">
                      {SHIPPING_TERMS.map((s) => (
                        <li key={s} className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div id="pd-faq" style={{ scrollMarginTop: HEADER_OFFSET + 70 }}>
              <SectionHead title="Frequently asked questions" />
              <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {product.faqs.map((faq, idx) => {
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
          </div>

          {/* Sticky quote form */}
          <div id="product-rfq" className="scroll-mt-32 lg:col-span-5">
            <div className="lg:sticky" style={{ top: HEADER_OFFSET + 76 }}>
              <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-900/10">
                <RfqForm
                  defaultInterest={product.name}
                  defaultIndustry={product.industries[0]}
                  heading={`Quote: ${product.name}`}
                  subheading="Receive pricing, CAD footprint, and FOB/CIF shipping schedule from our Chennai engineering desk."
                />
              </div>
              <p className="mt-4 flex items-center gap-2 px-2 text-sm text-slate-500"><ShieldCheck className="h-4 w-4 text-[#1a2a8c]" aria-hidden="true" /> Reply from the Chennai engineering desk, with a 2D footprint and FOB/CIF terms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= RELATED PRODUCTS ===================== */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionHead title="Compatible and upstream / downstream machinery" intro="Machines that run in the same line as this one." />
              <Link to={`/products/${product.categorySlug}/`} className="inline-flex items-center gap-1.5 self-start whitespace-nowrap rounded-full border border-[#1a2a8c] px-4 py-2 text-sm font-semibold text-[#1a2a8c] transition-colors hover:bg-[#1a2a8c] hover:text-white sm:self-auto">
                All {category?.shortTitle || 'machines'} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProducts.map((rel, i) => (
                <Reveal key={rel.slug} delay={i * 0.08}>
                  <Link to={getProductPath(rel)} className="pd-zoom group block">
                    <div className="overflow-hidden rounded-3xl">
                      <MachineVisual src={rel.image} alt={rel.name} aspectClass="aspect-[16/11]" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#1a2a8c]">{rel.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{rel.shortBenefit}</p>
                    <span className="mt-4 inline-flex items-center gap-2 border-b border-[#1a2a8c] pb-0.5 text-sm font-semibold text-[#1a2a8c]">
                      View specifications <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================ CTA BAND ======================== */}
      <section className="relative overflow-hidden bg-[#1a2a8c] text-white">
        <div className="absolute inset-0 opacity-20"><MachineVisual src={product.image} alt="" aspectClass="h-full w-full" /></div>
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Need this {product.name} built to your layout?</h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100">Share your capacity, container size and destination port. We reply with a technical proposal and quotation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setSchedulerOpen('engineer')} className={primaryBtn}><Calendar className="h-4 w-4" aria-hidden="true" /> Talk to an engineer</button>
            <button type="button" onClick={() => setDownloadOpen(true)} className={ghostBtn}><FileDown className="h-4 w-4" aria-hidden="true" /> Download datasheet</button>
          </div>
        </div>
      </section>

      <GatedDownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        assetId={product.slug}
        assetTitle={`${product.name} — Technical Datasheet`}
      />

      <SchedulerModal mode={schedulerOpen} onClose={() => setSchedulerOpen(null)} />
    </div>
  );
}