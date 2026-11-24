import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, FileCheck2 } from 'lucide-react';

export default function ExitIntentOffer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let eligible = false;
    try {
      if (sessionStorage.getItem('vtech_exit_shown') === '1') return;
    } catch {
      // ignore sessionStorage error
    }

    const dwellTimer = window.setTimeout(() => {
      eligible = true;
    }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!eligible) return;
      if (e.clientY <= 4) {
        eligible = false;
        try {
          sessionStorage.setItem('vtech_exit_shown', '1');
        } catch {
          // ignore
        }
        setVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.clearTimeout(dwellTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-offer-title"
    >
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close consultation offer"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f7fa] text-[#1a2a8c]">
          <FileCheck2 className="h-5 w-5" />
        </div>

        <h3 id="exit-offer-title" className="mt-4 text-xl font-bold text-slate-900">
          Need a Custom Line Layout or Budgetary Export Quote?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Send us your target BPM/PPH throughput and bottle or pouch dimensions. Our Chennai engineering desk prepares a complimentary 2D concept layout and FOB/CIF budgetary proposal within 24 hours.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link
            to="/contact-us/"
            onClick={() => setVisible(false)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#ff6a13] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#e55a08]"
          >
            Request Free Line Proposal <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
