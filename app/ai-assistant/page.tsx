'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Search,
  BookOpen,
  Loader2,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

const SUGGESTED_CONCEPTS = [
  { label: 'P/E Ratio', query: 'pe-ratio' },
  { label: 'P/B Ratio', query: 'pb-ratio' },
  { label: 'ROCE vs ROE', query: 'roce' },
  { label: 'Free Cash Flow (FCF)', query: 'free-cash-flow' },
  { label: 'Debt to Equity', query: 'debt-to-equity' },
  { label: 'Promoter Pledging', query: 'promoter-pledging' },
];

export default function AIAssistantPage() {
  const [concept, setConcept] = useState('pe-ratio');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async (queryToRun?: string) => {
    const targetQuery = queryToRun || concept;
    if (!targetQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ai/analyze?concept=${encodeURIComponent(targetQuery.trim())}`);
      if (!res.ok) {
        throw new Error(`AI Engine returned ${res.status}`);
      }
      const data = await res.json();
      setExplanation(data.explanation || 'No explanation generated.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to retrieve explanation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Non-Advisory Educational AI</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          StockMentor AI Knowledge Engine
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Demystify Indian balance sheets, valuation ratios, and corporate filings. Master the metrics before deploying hard-earned capital.
        </p>
      </div>

      {/* Interactive Search & Concept Selection */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ask about any financial metric (e.g. ROCE, EBITDA, Free Cash Flow)..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Explain</span>
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Popular:
          </span>
          {SUGGESTED_CONCEPTS.map((item) => (
            <button
              key={item.query}
              onClick={() => {
                setConcept(item.label);
                handleQuery(item.query);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Explanation Results */}
      {explanation && (
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Educational Breakdown
            </span>
            <span className="text-[11px] text-slate-500 font-mono">StockMentor AI v2.0</span>
          </div>

          <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-3 leading-relaxed whitespace-pre-line">
            {explanation}
          </div>

          {/* Prompt to Test on Real Equities */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Ready to test this against live Indian stocks?</span>
            <div className="flex items-center gap-2">
              <Link
                href="/stocks/RELIANCE.NS"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                RELIANCE.NS &rarr;
              </Link>
              <Link
                href="/stocks/TCS.NS"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                TCS.NS &rarr;
              </Link>
              <Link
                href="/stocks/HDFCBANK.NS"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                HDFCBANK.NS &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Philosophical Guardrail Info Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          <span>Non-Advisory AI Guardrails in Action</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          StockMentor AI strictly enforces objective educational synthesis. Queries asking for &quot;stocks to buy tomorrow&quot; or &quot;guaranteed 20% return ideas&quot; will be redirected towards balance sheet evaluation, margin of safety principles, and audited ROCE trends.
        </p>
      </div>
    </div>
  );
}
