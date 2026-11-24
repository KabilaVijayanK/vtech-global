import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileDown, BookOpen, GitBranch, Database, ArrowRight } from 'lucide-react';
import { RESOURCES, HEADLESS_CMS_SCHEMA } from '../data/servicesExportProjectsResources';
import { SITEMAP_TREE, flattenSitemapPaths } from '../data/cmsRegistry';
import type { SitemapNode } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { GatedDownloadModal } from '../components/Modals';

function SitemapBranch({ node, depth = 0 }: { node: SitemapNode; depth?: number }) {
  return (
    <li className={depth > 0 ? 'ml-4 border-l border-slate-200 pl-3' : ''}>
      <div className="flex flex-wrap items-center justify-between gap-2 py-1 text-xs">
        <Link to={node.path} className="font-semibold text-[#1a2a8c] hover:underline">
          {node.title}
        </Link>
        <span className="font-mono text-[11px] text-slate-500">
          {node.path} · {node.template}
        </span>
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="mt-1 space-y-0.5">
          {node.children.map((child) => (
            <SitemapBranch key={child.path} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<'guides' | 'sitemap' | 'cms'>('guides');
  const [downloadAsset, setDownloadAsset] = useState<{ id: string; title: string } | null>(null);

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Resources' },
  ];

  const totalRoutes = flattenSitemapPaths().length;

  return (
    <>
      <SeoHead
        title="Technical Resources, Comparison Guides & Catalogs | V Tech Manufacturing"
        description="Engineering comparison guides (Servo Piston vs Flow-Meter), downloadable 2026 machinery catalogs, export checklists, and CMS architecture."
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
            Engineering Knowledge Hub
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Technical Guides, Comparison Matrices &amp; Downloadable Catalogs
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200">
            Practical engineering references for plant directors, process engineers, and global procurement teams.
          </p>

          <div className="mt-7 inline-flex flex-wrap gap-1.5 rounded-lg bg-white/10 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('guides')}
              className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 transition-colors ${
                activeTab === 'guides' ? 'bg-white text-[#1a2a8c]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" /> Technical &amp; Comparison Guides
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sitemap')}
              className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 transition-colors ${
                activeTab === 'sitemap' ? 'bg-white text-[#1a2a8c]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <GitBranch className="h-3.5 w-3.5" /> Complete Sitemap Tree ({totalRoutes} URLs)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cms')}
              className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 transition-colors ${
                activeTab === 'cms' ? 'bg-white text-[#1a2a8c]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <Database className="h-3.5 w-3.5" /> Headless CMS Schema
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {activeTab === 'guides' && (
            <div className="space-y-10">
              {RESOURCES.map((res) => (
                <article
                  key={res.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {res.type} · {res.readTime}
                      </p>
                      <h2 className="mt-1.5 text-xl font-bold text-slate-900 sm:text-2xl">{res.title}</h2>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{res.summary}</p>
                    </div>
                    {res.downloadableAssetId && (
                      <button
                        type="button"
                        onClick={() =>
                          setDownloadAsset({ id: res.downloadableAssetId!, title: res.title })
                        }
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#ff6a13] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#e55a08] whitespace-nowrap"
                      >
                        <FileDown className="h-4 w-4" /> Download Specification PDF
                      </button>
                    )}
                  </div>

                  {res.comparisonRows && (
                    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 bg-[#f5f7fa] text-xs font-semibold text-slate-700">
                            <th className="px-4 py-3">Selection Criteria</th>
                            <th className="px-4 py-3 text-[#1a2a8c]">{res.optionALabel}</th>
                            <th className="px-4 py-3 text-[#1a2a8c]">{res.optionBLabel}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-xs">
                          {res.comparisonRows.map((row) => (
                            <tr key={row.criteria}>
                              <td className="px-4 py-3 font-semibold text-slate-900">{row.criteria}</td>
                              <td className="px-4 py-3 text-slate-700">{row.optionA}</td>
                              <td className="px-4 py-3 text-slate-700">{row.optionB}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="mt-5 space-y-2.5 text-sm leading-relaxed text-slate-700">
                    {res.content.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Full Website Architecture ({totalRoutes} Indexed Routes)
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Every URL slug below is live, canonicalized, and served dynamically in /sitemap.xml.
                  </p>
                </div>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-semibold text-[#1a2a8c] hover:bg-[#f5f7fa]"
                >
                  Open /sitemap.xml <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <ul className="space-y-2">
                {SITEMAP_TREE.map((node) => (
                  <SitemapBranch key={node.path} node={node} />
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'cms' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{HEADLESS_CMS_SCHEMA.cmsTarget}</h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Modular content types enabling non-technical teams to publish new machines, turnkey lines, projects, and guides without touching application code.
                  </p>
                </div>
                <a
                  href="/api/cms/schema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-semibold text-[#1a2a8c] hover:bg-[#f5f7fa]"
                >
                  Inspect JSON API (/api/cms/schema) <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {HEADLESS_CMS_SCHEMA.contentTypes.map((ct) => (
                  <div key={ct.name} className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-5">
                    <p className="font-mono text-xs font-bold text-[#ff6a13]">{ct.name}</p>
                    <h3 className="mt-1 text-base font-bold text-slate-900">{ct.title}</h3>
                    <ul className="mt-3 space-y-1 font-mono text-[11px] text-slate-700">
                      {ct.fields.map((f) => (
                        <li key={f}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <GatedDownloadModal
        isOpen={Boolean(downloadAsset)}
        onClose={() => setDownloadAsset(null)}
        assetId={downloadAsset?.id || ''}
        assetTitle={downloadAsset?.title || ''}
      />
    </>
  );
}
