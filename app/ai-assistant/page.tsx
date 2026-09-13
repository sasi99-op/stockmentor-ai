import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center space-y-6">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
        <Sparkles className="h-7 w-7" />
      </div>
      <h1 className="text-3xl font-bold text-white">StockMentor AI Assistant</h1>
      <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
        Interactive educational assistant to explain financial jargon, interpret cash flow statements, and break down complex ratios.
      </p>

      <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Core Guardrails Embedded</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The AI will never answer questions like &quot;Should I buy stock X?&quot; or &quot;What is the target price?&quot;.
          Instead, it responds with &quot;Here are the debt-to-equity and interest coverage trends from company filings.&quot;
        </p>
      </div>

      <div className="inline-block rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs text-slate-400">
        Status: Scheduled for AI Integration Phase
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
