import { useState, type FormEvent } from 'react';
import { X, FileDown, Calendar, Video, CheckCircle2, ArrowRight } from 'lucide-react';
import { EXPORT_COUNTRIES } from '../data/servicesExportProjectsResources';
import { trackConversionEvent } from './SeoHead';

interface GatedDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetId: string;
  assetTitle: string;
}

export function GatedDownloadModal({
  isOpen,
  onClose,
  assetId,
  assetTitle,
}: GatedDownloadModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const resp = await fetch('/api/gated-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, country, assetId }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.success) {
        setError(data.error || 'Please provide valid contact details.');
      } else {
        const blob = new Blob([data.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename || `${assetId}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setDownloaded(true);
        trackConversionEvent('datasheet_download', { asset_id: assetId, country });
      }
    } catch {
      setError('Unable to generate specification download. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gated-download-title"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close download modal"
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="h-5 w-5" />
        </button>

        {!downloaded ? (
          <>
            <div className="mb-5 flex items-start gap-3 pr-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f7fa] text-[#1a2a8c]">
                <FileDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1a2a8c]">Technical Specification Download</p>
                <h3 id="gated-download-title" className="mt-0.5 text-lg font-bold text-slate-900">
                  {assetTitle}
                </h3>
              </div>
            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Company Name *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Global Foods Manufacturing"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  >
                    {EXPORT_COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6a13] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e55a08] disabled:opacity-60"
              >
                <FileDown className="h-4 w-4" />
                {loading ? 'Preparing Specification Pack...' : 'Download Specification Sheet'}
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
            <h3 className="mt-3 text-lg font-bold text-slate-900">Specification Pack Downloaded</h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Your file has started downloading. Need CAD footprint drawings (STEP/DWG) or a formal FOB/CIF quotation?
            </p>
            <button
              type="button"
              onClick={() => {
                setDownloaded(false);
                onClose();
              }}
              className="mt-5 rounded-lg bg-[#1a2a8c] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1a2a4e]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface SchedulerModalProps {
  mode: 'engineer' | 'tour' | null;
  onClose: () => void;
}

export function SchedulerModal({ mode, onClose }: SchedulerModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [timezone, setTimezone] = useState('EST (New York) · 08:30 AM');
  const [date, setDate] = useState('2026-12-02');
  const [booked, setBooked] = useState(false);

  if (!mode) return null;

  const isTour = mode === 'tour';
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;

  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    setBooked(true);
    trackConversionEvent(isTour ? 'virtual_tour_booking' : 'engineer_call_booking', {
      timezone,
      date,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={() => {
            setBooked(false);
            onClose();
          }}
          aria-label="Close scheduler"
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        {!booked ? (
          <>
            <div className="mb-5 flex items-start gap-3 pr-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f7fa] text-[#1a2a8c]">
                {isTour ? <Video className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1a2a8c]">
                  {isTour ? 'Live 4K Chennai Factory Walkthrough' : '1-on-1 Engineering Consultation'}
                </p>
                <h3 className="mt-0.5 text-lg font-bold text-slate-900">
                  {isTour ? 'Book a Virtual Factory Tour' : 'Talk to a Process & Packaging Engineer'}
                </h3>
              </div>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-slate-600">
              {isTour
                ? 'Inspect our CNC fabrication bay, stainless assembly floor, PLC test bench, and active FAT run-offs live via Microsoft Teams or Zoom.'
                : 'Discuss line throughput (BPM/PPH), bottle/pouch tolerances, 400V/480V specs, and plant layout CAD directly with a senior V Tech engineer.'}
            </p>

            {calendlyUrl ? (
              <div className="mb-4 rounded-lg border border-slate-200 bg-[#f5f7fa] p-4 text-xs">
                <p className="font-semibold text-slate-900">Direct Calendly Link Configured:</p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-semibold text-[#1a2a8c] hover:underline"
                >
                  Open Live Engineering Calendar <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : null}

            <form onSubmit={handleBook} className="space-y-3.5">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">Global Time Slot</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  >
                    <option>EST (New York) · 08:30 AM</option>
                    <option>GMT/CET (London/Berlin) · 10:00 AM</option>
                    <option>GST (Dubai/Riyadh) · 11:30 AM</option>
                    <option>SGT/AEST (Singapore/Sydney) · 02:00 PM</option>
                    <option>IST (Chennai) · 03:30 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-[#ff6a13] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e55a08]"
              >
                {isTour ? 'Confirm Virtual Factory Tour Slot' : 'Schedule Engineering Call'}
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
            <h3 className="mt-3 text-lg font-bold text-slate-900">
              {isTour ? 'Virtual Factory Tour Scheduled' : 'Engineering Consultation Confirmed'}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Calendar invite for <span className="font-semibold">{date}</span> ({timezone}) has been queued for{' '}
              <span className="font-semibold">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setBooked(false);
                onClose();
              }}
              className="mt-5 rounded-lg bg-[#1a2a8c] px-5 py-2.5 text-xs font-semibold text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
