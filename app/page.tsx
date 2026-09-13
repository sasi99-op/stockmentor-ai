import React from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Phase 1: Foundation & Authentication Active</span>
        </div>

        {/* App Title & One-Line Pitch */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          StockMentor <span className="text-emerald-400">AI</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          AI-powered stock-market education and self-guided investing assistant
          for Indian retail investors (NSE/BSE).
        </p>

        {/* Philosophy Core Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Formulate Independent Thesis</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Audited Corporate Filings</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>No Tips or Return Predictions</span>
          </div>
        </div>

        {/* Search Bar Placeholder (Phase 1 Stub) */}
        <div className="mx-auto max-w-2xl pt-6">
          <div className="relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-sm focus-within:border-emerald-500/50 transition-all">
            <div className="flex flex-1 items-center gap-3 px-3 w-full">
              <Search className="h-5 w-5 text-slate-500 shrink-0" />
              <input
                type="text"
                disabled
                placeholder="Search Indian stocks (e.g. RELIANCE, TCS, INFY)..."
                className="w-full bg-transparent py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none cursor-not-allowed"
              />
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto px-2 sm:px-0">
              <span className="rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-400 border border-slate-700">
                Phase 2
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500 text-left px-2">
            * Stock search, financial statements, and valuation breakdowns activate in Phase 2. Zero synthetic or fabricated data is used.
          </p>
        </div>

        {/* Core Strict Architectural & Educational Notice */}
        <div className="mx-auto max-w-2xl rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-300">
                Our Non-Negotiable Commitment to Objective Education
              </p>
              <p className="text-slate-400">
                StockMentor AI never provides stock recommendations, buy/sell calls, target prices, or return promises.
                The platform empowers you to analyze financial metrics, balance sheet durability, and regulatory disclosures so you can make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Map (Stubbed Navigation Links) */}
        <div className="pt-8">
          <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Platform Modules (Stubs for Phase 1)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <Link
              href="/markets"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400">
                <TrendingUp className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Markets</h3>
              <p className="mt-1 text-xs text-slate-400">NSE / BSE indices and sector overview.</p>
              <span className="mt-3 inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                Coming in Phase 2
              </span>
            </Link>

            <Link
              href="/stocks"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400">
                <Search className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Stocks</h3>
              <p className="mt-1 text-xs text-slate-400">Company analysis & fundamental metrics.</p>
              <span className="mt-3 inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                Coming in Phase 2
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400">
                <Briefcase className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Portfolio</h3>
              <p className="mt-1 text-xs text-slate-400">Protected user area & profile settings.</p>
              <span className="mt-3 inline-block rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] border border-emerald-500/20">
                Auth Protected
              </span>
            </Link>

            <Link
              href="/ai-assistant"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400">
                <Sparkles className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">AI Assistant</h3>
              <p className="mt-1 text-xs text-slate-400">Evidence reasoning & thesis breakdown.</p>
              <span className="mt-3 inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                Scheduled Phase
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
