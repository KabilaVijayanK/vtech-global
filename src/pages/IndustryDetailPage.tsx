import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { IndustryItem } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';

interface IndustryDetailPageProps {
  industry: IndustryItem;
}

export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Industries', path: '/industries/' },
    { label: industry.title },
  ];

  return (
    <>
      <SeoHead title={industry.seoTitle} description={industry.seoDescription} breadcrumbs={breadcrumbs} />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <div className="mt-3 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
                Industry-Specific Engineering
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {industry.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-200">{industry.overview}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15">
                <MachineVisual src={industry.image} alt={industry.title} aspectClass="aspect-[16/10]" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-10 lg:col-span-7">
            {/* Industry Challenges */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">Production &amp; Compliance Challenges</h2>
              <ul className="mt-4 space-y-3">
                {industry.challenges.map((ch) => (
                  <li key={ch} className="flex items-start gap-3 text-sm text-slate-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6a13]" aria-hidden="true" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Standards */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">Compliance Standards Met by Design</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {industry.standards.map((st) => (
                  <div key={st.code} className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#1a2a8c]" aria-hidden="true" />
                      <h3 className="text-sm font-bold text-slate-900">{st.code}</h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{st.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Machinery & Turnkey Lines */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recommended Machinery &amp; Turnkey Lines</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {industry.recommendedMachinePaths.map((m) => (
                  <Link
                    key={m.path}
                    to={m.path}
                    className="group rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#1a2a8c]"
                  >
                    <p className="text-sm font-bold text-slate-900 group-hover:text-[#1a2a8c]">{m.label}</p>
                    <p className="mt-1 text-xs text-slate-600">{m.role}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a8c]">
                      View Specs <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {industry.recommendedTurnkeyPaths.map((t) => (
                  <Link
                    key={t.path}
                    to={t.path}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a2a8c] px-4 py-2 text-xs font-semibold text-[#1a2a8c] hover:bg-[#1a2a8c] hover:text-white"
                  >
                    {t.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Industry Case Study */}
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1a2a8c]">
                Sector Case Study · {industry.caseStudy.region}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{industry.caseStudy.title}</h3>
              <p className="mt-1 font-mono text-xs font-semibold text-[#ff6a13]">
                {industry.caseStudy.metricResult}
              </p>
              <p className="mt-2 text-sm text-slate-700">{industry.caseStudy.summary}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <RfqForm
              defaultIndustry={industry.title}
              defaultInterest={`${industry.title} Automation Line`}
              heading="Request Industry-Specific Proposal"
            />
          </div>
        </div>
      </section>
    </>
  );
}
