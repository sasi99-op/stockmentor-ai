import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center space-y-6">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
        <GraduationCap className="h-7 w-7" />
      </div>
      <h1 className="text-3xl font-bold text-white">Stock Market Education</h1>
      <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
        Step-by-step guides on reading annual reports, deciphering balance sheets, understanding P/E vs PEG,
        and navigating SEBI regulatory protections.
      </p>
      <div className="inline-block rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs text-slate-400">
        Status: Scheduled for Later Phase
      </div>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
