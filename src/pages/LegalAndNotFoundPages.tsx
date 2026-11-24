import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';

export function PrivacyPolicyPage() {
  const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }];
  return (
    <>
      <SeoHead
        title="Privacy Policy | V Tech Manufacturing"
        description="GDPR-compliant privacy notice describing how V Tech Manufacturing handles B2B RFQ inquiries, technical drawings, and analytics cookies."
        breadcrumbs={breadcrumbs}
      />
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-xs text-slate-500">Effective Date: November 2026 · vtechmanufacturing.com</p>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
          <p>
            V Tech Manufacturing (&ldquo;V Tech&rdquo;, Chennai, India) respects the confidentiality of commercial inquiries, engineering drawings, and personal contact data submitted through our website.
          </p>
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you submit a Request for Quote (RFQ), download a technical specification sheet, or schedule an engineering call, we collect your name, business email, company name, country, telephone number, and technical project parameters.
          </p>
          <h2 className="text-lg font-bold text-slate-900">2. NDA &amp; Drawing Confidentiality</h2>
          <p>
            Uploaded CAD layouts, bottle schematics, and throughput specifications are used strictly to prepare engineering proposals and are never shared with third-party brokers. Mutual NDAs are executed on request prior to detailed URS review.
          </p>
          <h2 className="text-lg font-bold text-slate-900">3. Cookies &amp; Analytics</h2>
          <p>
            Essential cookies maintain form security. Optional analytics cookies (GA4/GTM) are activated only with your consent via our Cookie Settings control in the site footer.
          </p>
          <h2 className="text-lg font-bold text-slate-900">4. Data Requests</h2>
          <p>
            To update, export, or delete your business contact records under GDPR or applicable privacy frameworks, write to exports@vtechmanufacturing.com.
          </p>
        </div>
      </section>
    </>
  );
}

export function TermsOfUsePage() {
  const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Terms of Use' }];
  return (
    <>
      <SeoHead
        title="Terms of Use & Commercial Export Conditions | V Tech Manufacturing"
        description="Website terms of use, engineering specification disclaimers, and international export quotation terms for V Tech Manufacturing."
        breadcrumbs={breadcrumbs}
      />
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl font-extrabold text-slate-900">Terms of Use</h1>
        <p className="mt-2 text-xs text-slate-500">V Tech Manufacturing · Chennai, India</p>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
          <p>
            Technical specifications, footprints, and throughput rates displayed on vtechmanufacturing.com represent standard baseline engineering configurations. Final guaranteed performance parameters are defined in your formal V Tech Techno-Commercial Proposal and Factory Acceptance Test (FAT) protocol.
          </p>
          <h2 className="text-lg font-bold text-slate-900">1. Quotations &amp; Incoterms</h2>
          <p>
            All machinery is engineered to order; no fixed retail pricing is published online. Export offers are quoted under Incoterms 2020 (EXW, FOB Chennai, CIF, or DAP) with validity periods specified on each formal quotation.
          </p>
          <h2 className="text-lg font-bold text-slate-900">2. Intellectual Property</h2>
          <p>
            All CAD schematics, control architectures, photography, and V Tech brand assets remain the intellectual property of V Tech Manufacturing.
          </p>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page Not Found (404) | V Tech Manufacturing"
        description="The requested machinery or turnkey line page could not be located. Browse all V Tech Manufacturing divisions."
      />
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-sm font-bold text-[#ff6a13]">404 · ROUTE NOT FOUND</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          We Could Not Find That Equipment Page
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Explore our primary machinery divisions, turnkey process lines, or submit an engineering inquiry directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a2a8c] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1a2a4e]"
          >
            Back to Home
          </Link>
          <Link
            to="/products/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-900 hover:border-[#1a2a8c]"
          >
            Browse All Products <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/contact-us/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6a13] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#e55a08]"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
