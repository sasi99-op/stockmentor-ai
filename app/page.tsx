import React from 'react';
import Link from 'next/link';
import StockSearchBar from '@/components/StockSearchBar';
import IndexTicker from '@/components/IndexTicker';
import {
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Search,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const popularIndianStocks = [
    { symbol: 'RELIANCE.NS', name: 'Reliance' },
    { symbol: 'TCS.NS', name: 'TCS' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
    { symbol: 'INFY.NS', name: 'Infosys' },
    { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
    { symbol: 'ITC.NS', name: 'ITC' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      {/* Live Index Ticker across top */}
      <IndexTicker />

      <div className="mx-auto max-w-4xl text-center space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All 6 Core Systems Live &bull; Indian Equities (NSE/BSE)</span>
        </div>

        {/* App Title & One-Line Pitch */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          StockMentor <span className="text-emerald-400">AI</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          AI-powered stock-market education and self-guided investing assistant
          for Indian retail investors. Objective balance sheet analysis without advisory bias.
        </p>

        {/* Philosophy Core Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-slate-400">
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
            <span>Strictly Zero Buy/Sell Tips</span>
          </div>
        </div>

        {/* Live Search Bar Component */}
        <div className="mx-auto max-w-2xl pt-4">
          <StockSearchBar placeholder="Search 2,000+ Indian stocks (e.g. RELIANCE, TCS, INFY, TATAMOTORS)..." />

          {/* Quick stock shortcuts */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="text-[11px] text-slate-500">Popular on NSE:</span>
            {popularIndianStocks.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/stocks/${encodeURIComponent(stock.symbol)}`}
                className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-xs text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                {stock.name}
              </Link>
            ))}
          </div>

          <p className="mt-2 text-xs text-slate-500 text-center px-2">
            * 15-minute delayed public exchange feed &bull; Strictly for self-guided educational research &bull; Zero synthetic numbers.
          </p>
        </div>

        {/* Platform Modules Grid (All 6 Core Systems) */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Platform Features & Tools
            </h2>
            <span className="text-xs text-emerald-400 font-mono">100% Production Ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
            {/* 1. Stock Research */}
            <Link
              href="/stocks"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-emerald-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-emerald-400">
                <Search className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Stock Research Hub</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Valuation multiples, 52W range sliders, and TradingView charts.
              </p>
              <span className="mt-3 inline-block rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-medium border border-emerald-500/20">
                Interactive Charts
              </span>
            </Link>

            {/* 2. Markets Pulse */}
            <Link
              href="/markets"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-blue-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-blue-400">
                <TrendingUp className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Markets Overview</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Live Nifty 50, Sensex, sector heatmap, and FII vs DII flow guide.
              </p>
              <span className="mt-3 inline-block rounded bg-blue-500/10 text-blue-400 px-2 py-0.5 text-[10px] font-medium border border-blue-500/20">
                Live Indices
              </span>
            </Link>

            {/* 3. Investor Academy */}
            <Link
              href="/learn"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-purple-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-purple-400">
                <GraduationCap className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Investor Academy</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                4 Indian market modules, forensic red flags, and interactive quizzes.
              </p>
              <span className="mt-3 inline-block rounded bg-purple-500/10 text-purple-400 px-2 py-0.5 text-[10px] font-medium border border-purple-500/20">
                Interactive Quizzes
              </span>
            </Link>

            {/* 4. Decision Journal */}
            <Link
              href="/journal"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-amber-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-amber-400">
                <BookOpen className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Decision Journal</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Pre-trade rationale, conviction stars, and FOMO emotion tracking.
              </p>
              <span className="mt-3 inline-block rounded bg-amber-500/10 text-amber-400 px-2 py-0.5 text-[10px] font-medium border border-amber-500/20">
                Eliminate Bias
              </span>
            </Link>

            {/* 5. Portfolio Tracker */}
            <Link
              href="/portfolio"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-emerald-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-emerald-400">
                <Briefcase className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">Portfolio & Thesis</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Live ₹ portfolio valuation, P&L calculations, and thesis drawer.
              </p>
              <span className="mt-3 inline-block rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-medium border border-emerald-500/20">
                RLS Protected
              </span>
            </Link>

            {/* 6. AI Assistant */}
            <Link
              href="/ai-assistant"
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between text-cyan-400">
                <Sparkles className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">AI Evidence Assistant</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Plain-English concept explorer for ROCE, FCF, P/E, and moats.
              </p>
              <span className="mt-3 inline-block rounded bg-cyan-500/10 text-cyan-400 px-2 py-0.5 text-[10px] font-medium border border-cyan-500/20">
                Non-Advisory AI
              </span>
            </Link>
          </div>
        </div>

        {/* Commitment to Objective Education Notice */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-left">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-300">
                Our Non-Negotiable Commitment to Objective Education
              </p>
              <p className="text-slate-400">
                StockMentor AI never provides stock recommendations, buy/sell calls, target prices, or return promises.
                The platform empowers you to analyze financial metrics, balance sheet durability, and regulatory disclosures so you can make informed decisions independently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
