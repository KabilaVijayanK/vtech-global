import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  FileDown,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Calendar,
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

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [unitFocus, setUnitFocus] = useState<'both' | 'metric' | 'imperial'>('both');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [schedulerOpen, setSchedulerOpen] = useState<'engineer' | 'tour' | null>(null);

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = ALL_PRODUCTS.filter((p) => product.relatedSlugs.includes(p.slug)).slice(0, 3);

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products/' },
    { label: category?.title || product.categorySlug, path: `/products/${product.categorySlug}/` },
    { label: product.name },
  ];

  return (
    <>
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

      {/* Hero Band */}
      <section className="border-b border-slate-200 bg-[#f5f7fa] py-10 sm:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-4 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1a2a8c]">
                  {category?.shortTitle} · Export Grade · Chennai, India
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {product.name} Manufacturer &amp; Exporter from India
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{product.shortBenefit}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.overview}</p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-700">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <Clock className="h-4 w-4 text-[#1a2a8c]" aria-hidden="true" />
                    Lead Time: {product.leadTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="h-4 w-4 text-[#1a2a8c]" aria-hidden="true" />
                    {product.compliance.slice(0, 2).join(' · ')}
                  </span>
                  <span className="font-mono font-semibold text-slate-900">Pricing: Request a Quote</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="#product-rfq"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#ff6a13] px-5 py-3 text-xs font-semibold text-white hover:bg-[#e55a08] whitespace-nowrap"
                  >
                    Request a Quote <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setDownloadOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-900 hover:border-[#1a2a8c] whitespace-nowrap"
                  >
                    <FileDown className="h-4 w-4 text-[#1a2a8c]" /> Download Technical Datasheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setSchedulerOpen('engineer')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-700 hover:text-[#1a2a8c] whitespace-nowrap"
                  >
                    <Calendar className="h-4 w-4 text-[#1a2a8c]" /> Talk to an Engineer
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                <MachineVisual
                  src={product.image}
                  alt={`${product.name} manufactured by V Tech Manufacturing`}
                  aspectClass="aspect-[4/3] lg:h-full lg:aspect-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Engineering Content + Sticky Quote Sidebar */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left 7 Columns: Specs, Features, Customization, Applications, FAQ */}
          <div className="space-y-12 lg:col-span-7">
            {/* Key Engineering Features */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Key Engineering Features</h2>
              <ul className="mt-4 space-y-3">
                {product.keyFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Table (Metric + Imperial) */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Technical Specifications
                </h2>
                <div className="inline-flex rounded-lg border border-slate-200 bg-[#f5f7fa] p-1 text-xs font-semibold">
                  {(['both', 'metric', 'imperial'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setUnitFocus(mode)}
                      className={`rounded-md px-3 py-1 capitalize transition-colors ${
                        unitFocus === mode
                          ? 'bg-white text-[#1a2a8c] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {mode === 'both' ? 'Metric + Imperial' : mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#f5f7fa] text-xs font-semibold text-slate-700">
                      <th className="px-4 py-3">Parameter</th>
                      {unitFocus !== 'imperial' && <th className="px-4 py-3">Metric Units</th>}
                      {unitFocus !== 'metric' && <th className="px-4 py-3">Imperial / US Units</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-xs tabular-nums">
                    {product.specs.map((row) => (
                      <tr key={row.parameter} className="bg-white">
                        <td className="px-4 py-3 font-sans text-sm font-medium text-slate-900">
                          {row.parameter}
                        </td>
                        {unitFocus !== 'imperial' && (
                          <td className="px-4 py-3 text-slate-700">{row.metric}</td>
                        )}
                        {unitFocus !== 'metric' && (
                          <td className="px-4 py-3 text-slate-700">{row.imperial}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                All specifications can be customized to destination voltage (400V/50Hz or 480V/60Hz) and plant layout constraints.
              </p>
            </div>

            {/* Customization & Applications */}
            <div className="grid grid-cols-1 gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Customization Options</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {product.customizationOptions.map((opt) => (
                    <li key={opt} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a13]" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">Applications &amp; Industries</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2a8c]" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-medium text-slate-500">
                  Sectors: {product.industries.join(' · ')}
                </p>
              </div>
            </div>

            {/* Compliance & Export Readiness */}
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <h2 className="text-lg font-bold text-slate-900">Global Compliance &amp; Export Readiness</h2>
              <div className="mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-500">Standards Supported</p>
                  <p className="mt-1 font-medium text-slate-900">{product.compliance.join(' · ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-500">FAT &amp; Shipping Terms</p>
                  <p className="mt-1 font-medium text-slate-900">
                    Video / SGS FAT · ISPM-15 Sea Crating · EXW / FOB Chennai / CIF / DAP
                  </p>
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {product.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.question} className="p-4 sm:p-5">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-slate-900"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Sticky Request a Quote Form */}
          <div id="product-rfq" className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <RfqForm
                defaultInterest={product.name}
                defaultIndustry={product.industries[0]}
                heading={`Quote: ${product.name}`}
                subheading="Receive pricing, CAD footprint, and FOB/CIF shipping schedule from our Chennai engineering desk."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-200 bg-[#f5f7fa] py-14">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Compatible &amp; Upstream/Downstream Machinery
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={getProductPath(rel)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-[#1a2a8c]"
                >
                  <MachineVisual src={rel.image} alt={rel.name} aspectClass="aspect-[16/10]" />
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1a2a8c]">
                      {rel.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{rel.shortBenefit}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a8c]">
                      View Specifications <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <GatedDownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        assetId={product.slug}
        assetTitle={`${product.name} — Technical Datasheet`}
      />

      <SchedulerModal mode={schedulerOpen} onClose={() => setSchedulerOpen(null)} />
    </>
  );
}
