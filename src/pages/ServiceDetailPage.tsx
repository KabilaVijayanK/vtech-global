import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import type { EngineeringService } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import RfqForm from '../components/RfqForm';

interface ServiceDetailPageProps {
  service: EngineeringService;
}

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Engineering Services', path: '/engineering-services/' },
    { label: service.title },
  ];

  return (
    <>
      <SeoHead title={service.seoTitle} description={service.seoDescription} breadcrumbs={breadcrumbs} />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <div className="mt-3 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
                V Tech Engineering Capabilities
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-200">{service.overview}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15">
                <MachineVisual src={service.image} alt={service.title} aspectClass="aspect-[16/10]" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-10 lg:col-span-7">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Engineering Methodology</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.methodology.map((m) => (
                  <div key={m.phase} className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-5">
                    <h3 className="text-sm font-bold text-[#1a2a8c]">{m.phase}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-700">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Technical Deliverables</h2>
              <ul className="mt-4 space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Software, Controls &amp; Fabrication Stack</h2>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-800">
                {service.toolsUsed.map((tool) => (
                  <span key={tool} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#f5f7fa] px-3.5 py-2">
                    <Wrench className="h-3.5 w-3.5 text-[#1a2a8c]" aria-hidden="true" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Sample Engineering Outputs</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.sampleOutputs.map((out) => (
                  <div key={out.title} className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="font-mono text-xs font-semibold text-[#ff6a13]">{out.format}</p>
                    <h3 className="mt-1 text-sm font-bold text-slate-900">{out.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-600">{out.detail}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/projects/"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a2a8c] hover:underline"
              >
                Explore Completed Engineering Projects <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <RfqForm
              defaultInterest={service.title}
              heading="Request Engineering Scope"
              subheading="Share your CAD layout, URS, or control specification for an engineering estimate."
            />
          </div>
        </div>
      </section>
    </>
  );
}
