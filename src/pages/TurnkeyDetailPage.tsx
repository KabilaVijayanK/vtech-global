import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import type { TurnkeySolution } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';

interface TurnkeyDetailPageProps {
  solution: TurnkeySolution;
}

export default function TurnkeyDetailPage({ solution }: TurnkeyDetailPageProps) {
  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Turnkey Solutions', path: '/turnkey-solutions/' },
    { label: solution.title },
  ];

  return (
    <>
      <SeoHead
        title={solution.seoTitle}
        description={solution.seoDescription}
        breadcrumbs={breadcrumbs}
        faqs={solution.faqs}
      />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <div className="mt-3 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
                Single-Responsibility Turnkey Line
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {solution.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-200">{solution.overview}</p>
              <div className="mt-6 flex flex-wrap gap-6 border-t border-white/15 pt-5 text-xs">
                <div>
                  <span className="text-slate-400">Throughput (Metric): </span>
                  <span className="font-mono font-bold text-white">{solution.throughputMetric}</span>
                </div>
                <div>
                  <span className="text-slate-400">Throughput (Imperial): </span>
                  <span className="font-mono font-bold text-white">{solution.throughputImperial}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15">
                <MachineVisual src={solution.image} alt={solution.title} aspectClass="aspect-[16/10]" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Process Flow Line Diagram */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1a2a8c]">
              Industry Challenge Addressed
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{solution.problemStatement}</p>
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#1a2a8c]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Integrated Line Layout &amp; Process Flow Diagram
              </h2>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">
              Click any linked equipment module below to inspect individual machine specifications.
            </p>

            {/* Visual Stage-by-Stage Flow */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {solution.stages.map((st, idx) => (
                <div
                  key={st.step}
                  className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#1a2a8c]">
                        Stage 0{st.step}
                      </span>
                      {idx < solution.stages.length - 1 && (
                        <ArrowRight className="hidden h-4 w-4 text-slate-400 lg:block" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-slate-900">{st.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-[#ff6a13]">{st.machineName}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{st.detail}</p>
                  </div>
                  {st.machinePath && (
                    <Link
                      to={st.machinePath}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a8c] hover:underline"
                    >
                      Machine Specs <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Included Machinery + Case Study + FAT */}
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Machines Included in This Turnkey Line</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {solution.includedMachinePaths.map((m) => (
                    <Link
                      key={m.path}
                      to={m.path}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-[#f5f7fa] px-4 py-3 text-xs font-semibold text-slate-900 transition-colors hover:border-[#1a2a8c] hover:text-[#1a2a8c]"
                    >
                      <span>{m.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1a2a8c]">
                  Commissioned Export Case Study · {solution.caseStudySnippet.country}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {solution.caseStudySnippet.clientLabel}
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  <strong className="text-slate-800">Challenge:</strong> {solution.caseStudySnippet.challenge}
                </p>
                <p className="mt-2 text-xs text-slate-700">
                  <strong className="text-slate-900">Verified Outcome:</strong> {solution.caseStudySnippet.outcome}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">FAT, Shipping &amp; Site Commissioning</h2>
                <ul className="mt-3 space-y-2.5">
                  {solution.fatAndInstallation.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <RfqForm
                defaultInterest={solution.title}
                heading={`Request Turnkey Line Proposal`}
                subheading="Attach your floor plan or share target throughput for a 2D line layout and budgetary FOB/CIF quote."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
