import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock, MessageCircle, Calendar, Video } from 'lucide-react';
import SeoHead, { type BreadcrumbCrumb, trackConversionEvent } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import RfqForm from '../components/RfqForm';
import { SchedulerModal } from '../components/Modals';

const GLOBAL_ZONES = [
  { label: 'Chennai HQ (IST)', tz: 'Asia/Kolkata' },
  { label: 'New York (EST/EDT)', tz: 'America/New_York' },
  { label: 'London (GMT/BST)', tz: 'Europe/London' },
  { label: 'Frankfurt (CET/CEST)', tz: 'Europe/Berlin' },
  { label: 'Dubai (GST)', tz: 'Asia/Dubai' },
  { label: 'Singapore (SGT)', tz: 'Asia/Singapore' },
  { label: 'Melbourne (AEST)', tz: 'Australia/Melbourne' },
];

export default function ContactPage() {
  const [now, setNow] = useState(() => new Date());
  const [schedulerMode, setSchedulerMode] = useState<'engineer' | 'tour' | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(t);
  }, []);

  const formatTime = (tz: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
      }).format(now);
    } catch {
      return '--:--';
    }
  };

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Contact Us' },
  ];

  const whatsappNum = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '914400000000';
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    'Hello V Tech Manufacturing, I would like to request an export machinery quotation.'
  )}`;

  return (
    <>
      <SeoHead
        title="Contact V Tech Manufacturing | Global Export RFQ Desk Chennai, India"
        description="Submit an RFQ for conveyors, filling & packaging machinery, warehouse automation, or turnkey lines. Chennai headquarters, live time-zone desk, and WhatsApp."
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
            International Proposals &amp; Engineering Desk
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Request an Engineering Proposal or Book a Virtual Plant Tour
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200">
            Connect directly with our Chennai proposals engineers. Response SLA: under 1 business day across Americas, Europe, MENA, Africa, and APAC.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left 7 Columns: Full RFQ Form */}
          <div className="lg:col-span-7">
            <RfqForm />
          </div>

          {/* Right 5 Columns: Chennai HQ, Live Time-Zone Converter & Direct Actions */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <h2 className="text-lg font-bold text-slate-900">Chennai Headquarters &amp; Export Works</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                  <span>
                    <strong>V Tech Manufacturing</strong>
                    <br />
                    [PLACEHOLDER: Plot No. &amp; Industrial Estate, Ambattur / Sriperumbudur], Chennai – 600058, Tamil Nadu, India
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                  <a href="mailto:exports@vtechmanufacturing.com" className="font-medium text-[#1a2a8c] hover:underline">
                    exports@vtechmanufacturing.com
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                  <span>[PLACEHOLDER: +91 44 XXXX XXXX]</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                  <span>Mon – Sat · 09:00 – 18:00 IST (UTC +5:30)</span>
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversionEvent('whatsapp_click', { location: 'contact_page' })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Direct
                </a>
                <button
                  type="button"
                  onClick={() => setSchedulerMode('engineer')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a2a8c] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1a2a4e]"
                >
                  <Calendar className="h-4 w-4" /> Talk to an Engineer
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSchedulerMode('tour')}
                className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 hover:border-[#1a2a8c]"
              >
                <Video className="h-4 w-4 text-[#ff6a13]" /> Book a Virtual Chennai Factory Tour
              </button>
            </div>

            {/* Live Global Time-Zone Converter */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">
                Live Global Time-Zone Overlap (Chennai IST Reference)
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Our export proposals engineers schedule live FAT and technical reviews aligned to your local office hours.
              </p>
              <div className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-200">
                {GLOBAL_ZONES.map((z) => (
                  <div key={z.tz} className="flex items-center justify-between px-3.5 py-2 text-xs">
                    <span className="font-medium text-slate-700">{z.label}</span>
                    <span className="font-mono font-semibold text-[#1a2a8c] tabular-nums">
                      {formatTime(z.tz)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Proximity Card */}
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <h3 className="text-sm font-bold text-slate-900">Export Port &amp; Air Freight Proximity</h3>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                <li>• Chennai Port (INMAA): ~28 km (FOB Container Dispatch)</li>
                <li>• Ennore / Kattupalli Deep-Water Terminals: ~38 km</li>
                <li>• Chennai International Airport (MAA): ~22 km (48-hr Air Spares)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SchedulerModal mode={schedulerMode} onClose={() => setSchedulerMode(null)} />
    </>
  );
}
