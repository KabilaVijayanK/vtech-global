import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { ExportPageData } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import RfqForm from '../components/RfqForm';

interface ExportDetailPageProps {
  page: ExportPageData;
}

export default function ExportDetailPage({ page }: ExportDetailPageProps) {
  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Export & Compliance', path: '/export-and-compliance/' },
    { label: page.title },
  ];

  return (
    <>
      <SeoHead title={page.seoTitle} description={page.seoDescription} breadcrumbs={breadcrumbs} />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
            Export &amp; Global Compliance Desk
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200">{page.overview}</p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-10 lg:col-span-7">
            {page.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-xl font-bold text-slate-900">{sec.heading}</h2>
                <p className="mt-1.5 text-sm text-slate-600">{sec.summary}</p>
                <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-[#f5f7fa] text-xs font-semibold text-slate-700">
                        <th className="px-4 py-3">Protocol / Standard</th>
                        <th className="px-4 py-3">Specification</th>
                        <th className="px-4 py-3">Export Execution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {sec.rows.map((r) => (
                        <tr key={r.label} className="bg-white">
                          <td className="px-4 py-3 font-semibold text-slate-900">{r.label}</td>
                          <td className="px-4 py-3 font-mono font-medium text-[#1a2a8c]">{r.spec}</td>
                          <td className="px-4 py-3 text-slate-600">{r.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <h2 className="text-lg font-bold text-slate-900">Export Documentation &amp; SLA Checklist</h2>
              <ul className="mt-4 space-y-2.5">
                {page.checklist.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  to="/resources/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a2a8c] hover:underline"
                >
                  Download Buyer’s Guide to Importing Machinery from India <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <RfqForm
              defaultInterest={page.title}
              heading="Consult Our Export Logistics Desk"
              subheading="Verify HS codes, Incoterms (EXW/FOB Chennai/CIF/DAP), and FAT scheduling for your destination port."
            />
          </div>
        </div>
      </section>
    </>
  );
}
