import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { CheckCircle2, Upload, AlertCircle, Send } from 'lucide-react';
import { EXPORT_COUNTRIES } from '../data/servicesExportProjectsResources';
import { trackConversionEvent } from './SeoHead';

interface RfqFormProps {
  defaultInterest?: string;
  defaultIndustry?: string;
  compact?: boolean;
  heading?: string;
  subheading?: string;
  dark?: boolean;
}

export default function RfqForm({
  defaultInterest = '',
  defaultIndustry = '',
  compact = false,
  heading = 'Request Engineering Quote & Line Proposal',
  subheading = 'Share your container, throughput, and destination country. Our Chennai proposals engineers respond within 1 business day.',
  dark = false,
}: RfqFormProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('United States');
  const [dialCode, setDialCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productInterest, setProductInterest] = useState(defaultInterest);
  const [industry, setIndustry] = useState(defaultIndustry || 'Food & Beverage');
  const [productHandled, setProductHandled] = useState('');
  const [capacity, setCapacity] = useState('');
  const [timeline, setTimeline] = useState('Within 3 Months');
  const [message, setMessage] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState<{
    ticketId: string;
    summary: string;
  } | null>(null);

  useEffect(() => {
    if (defaultInterest) setProductInterest(defaultInterest);
  }, [defaultInterest]);

  useEffect(() => {
    if (defaultIndustry) setIndustry(defaultIndustry);
  }, [defaultIndustry]);

  const handleCountryChange = (val: string) => {
    setCountry(val);
    const found = EXPORT_COUNTRIES.find((c) => c.name === val);
    if (found) setDialCode(found.code);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAttachmentName('');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('Drawing or specification file must be under 15 MB.');
      return;
    }
    setError('');
    setAttachmentName(`${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const resp = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          country,
          email,
          phone: `${dialCode} ${phone}`.trim(),
          productInterest,
          industry,
          productHandled,
          capacity,
          timeline,
          message,
          attachmentName,
          consent,
          _gotcha: honeypot,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.success) {
        setError(data.error || 'Unable to submit RFQ. Please verify your details.');
      } else {
        setConfirmation({
          ticketId: data.ticketId,
          summary: data.autoReplyPreview?.summary || 'Your RFQ has been routed to our international export engineering desk.',
        });
        trackConversionEvent('rfq_submit', {
          country,
          product_interest: productInterest || 'General',
          industry,
        });
      }
    } catch {
      setError('Network interruption while submitting RFQ. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div
        className={`rounded-xl border p-6 sm:p-8 ${
          dark ? 'border-white/15 bg-[#111c36] text-white' : 'border-emerald-200 bg-emerald-50/70 text-slate-900'
        }`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              RFQ Registered · Ticket {confirmation.ticketId}
            </p>
            <h3 className="mt-1 text-xl font-bold">Engineering Proposal Request Received</h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
              {confirmation.summary}
            </p>
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="mt-5 inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
            >
              Submit Another Line Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const labelClass = `block text-xs font-semibold mb-1.5 ${dark ? 'text-slate-200' : 'text-slate-700'}`;
  const inputClass = `w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a2a8c] ${
    dark
      ? 'border-white/15 bg-white/10 text-white placeholder:text-slate-400'
      : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border p-6 sm:p-8 ${
        dark ? 'border-white/15 bg-[#111c36] text-white' : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{heading}</h3>
        <p className={`mt-1.5 text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{subheading}</p>
      </div>

      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="rfq-website-url">Website</label>
        <input
          id="rfq-website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-800"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., David Carter"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Company / Organization *</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Pacific Foods LLC"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Destination Country *</label>
          <select
            required
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className={inputClass}
          >
            {EXPORT_COUNTRIES.map((c) => (
              <option key={c.name} value={c.name} className="text-slate-900">
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Work Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone / WhatsApp with Country Code *</label>
          <div className="flex gap-2">
            <input
              type="text"
              aria-label="Country Dial Code"
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
              className={`w-20 shrink-0 ${inputClass} font-mono`}
            />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="555 019 4820"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Machine or Turnkey Solution of Interest</label>
          <input
            type="text"
            value={productInterest}
            onChange={(e) => setProductInterest(e.target.value)}
            placeholder="e.g., Servo Piston Liquid Filler / Turnkey Line"
            className={inputClass}
          />
        </div>

        {!compact && (
          <>
            <div>
              <label className={labelClass}>Industry Vertical</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={inputClass}
              >
                {[
                  'Food & Beverage',
                  'Pharmaceuticals & Nutraceuticals',
                  'FMCG & Personal Care',
                  'Chemicals, Paints & Lubricants',
                  'Automotive & EV Manufacturing',
                  'Logistics, E-Commerce & Warehousing',
                ].map((ind) => (
                  <option key={ind} value={ind} className="text-slate-900">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Product Being Handled / Filled</label>
              <input
                type="text"
                value={productHandled}
                onChange={(e) => setProductHandled(e.target.value)}
                placeholder="e.g., 1L HDPE motor oil / 500g spice pouch"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Required Capacity / Line Speed</label>
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g., 60 BPM / 1,500 kg/hr / 2,000 PPH"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Target Procurement Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={inputClass}
              >
                <option value="Immediate (< 1 Month)" className="text-slate-900">Immediate (&lt; 1 Month)</option>
                <option value="Within 3 Months" className="text-slate-900">Within 3 Months</option>
                <option value="3–6 Months" className="text-slate-900">3–6 Months</option>
                <option value="6–12 Months (Budgetary)" className="text-slate-900">6–12 Months (Budgetary CapEx)</option>
              </select>
            </div>
          </>
        )}
      </div>

      {!compact && (
        <div className="mt-4">
          <label className={labelClass}>Attach Plant Layout / Container Drawing (PDF, DWG, STEP, JPG)</label>
          <label
            className={`flex cursor-pointer items-center justify-between rounded-lg border border-dashed px-4 py-3 text-xs transition-colors ${
              dark
                ? 'border-white/25 bg-white/5 text-slate-300 hover:border-white/40'
                : 'border-slate-300 bg-[#f5f7fa] text-slate-600 hover:border-[#1a2a8c]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-[#1a2a8c]" aria-hidden="true" />
              {attachmentName ? attachmentName : 'Select floor layout or bottle CAD drawing (max 15 MB)'}
            </span>
            <input
              type="file"
              accept=".pdf,.dwg,.dxf,.step,.stp,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="sr-only"
            />
            <span className="font-semibold text-[#1a2a8c]">Browse</span>
          </label>
        </div>
      )}

      <div className="mt-4">
        <label className={labelClass}>Project Scope, Power Supply (50Hz/60Hz) & Notes</label>
        <textarea
          rows={compact ? 2 : 3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Specify voltage (e.g. 480V/60Hz or 400V/50Hz), Incoterm preference (FOB Chennai / CIF / DAP), or container dimensions..."
          className={inputClass}
        />
      </div>

      <div className="mt-4 flex items-start gap-2.5">
        <input
          id={`consent-${compact ? 'c' : 'f'}`}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1a2a8c] focus:ring-[#1a2a8c]"
        />
        <label
          htmlFor={`consent-${compact ? 'c' : 'f'}`}
          className={`text-xs leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          I authorize V Tech Manufacturing to process this engineering inquiry and issue a formal proposal and technical documentation.
        </label>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6a13] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e55a08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6a13] disabled:opacity-60 sm:w-auto whitespace-nowrap"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {submitting ? 'Routing to Proposals Desk...' : 'Submit Engineering RFQ'}
        </button>
      </div>
    </form>
  );
}
