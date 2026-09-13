'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MarketQuote } from '@/types';
import {
  Scale,
  ArrowLeft,
  Search,
  Loader2,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Info,
} from 'lucide-react';

const PRESETS = [
  { label: 'TCS vs Infosys (IT)', a: 'TCS.NS', b: 'INFY.NS' },
  { label: 'HDFC Bank vs ICICI Bank (Banking)', a: 'HDFCBANK.NS', b: 'ICICIBANK.NS' },
  { label: 'Reliance vs ONGC (Energy)', a: 'RELIANCE.NS', b: 'ONGC.NS' },
  { label: 'Tata Motors vs Maruti (Auto)', a: 'TATAMOTORS.NS', b: 'MARUTI.NS' },
];

export default function ComparePage() {
  const [symA, setSymA] = useState('TCS.NS');
  const [symB, setSymB] = useState('INFY.NS');
  const [quoteA, setQuoteA] = useState<MarketQuote | null>(null);
  const [quoteB, setQuoteB] = useState<MarketQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComparison = useCallback(async (a: string, b: string) => {
    setLoading(true);
    setError(null);

    let cleanA = a.trim().toUpperCase();
    let cleanB = b.trim().toUpperCase();
    if (!cleanA.includes('.')) cleanA = `${cleanA}.NS`;
    if (!cleanB.includes('.')) cleanB = `${cleanB}.NS`;

    try {
      const [resA, resB] = await Promise.all([
        fetch(`/api/stocks/${encodeURIComponent(cleanA)}`),
        fetch(`/api/stocks/${encodeURIComponent(cleanB)}`),
      ]);

      if (!resA.ok) throw new Error(`Could not fetch data for ${cleanA}`);
      if (!resB.ok) throw new Error(`Could not fetch data for ${cleanB}`);

      const dataA = await resA.json();
      const dataB = await resB.json();

      setQuoteA(dataA.quote);
      setQuoteB(dataB.quote);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading comparison');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComparison(symA, symB);
  }, [fetchComparison, symA, symB]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComparison(symA, symB);
  };

  const formatMarketCap = (num?: number) => {
    if (!num) return 'Not Disclosed';
    const cr = num / 10000000;
    if (cr >= 100000) {
      return `₹ ${(cr / 100000).toFixed(2)} Lakh Cr`;
    }
    return `₹ ${cr.toFixed(0)} Cr`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400 mb-2">
            <Scale className="h-3.5 w-3.5" />
            <span>Peer Valuation Benchmarking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            2-Stock Comparison Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare Indian peers side-by-side on valuation multiples, balance sheet profiles, and price performance
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
      </div>

      {/* Selector Toolbar & Presets */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-xl">
        <form onSubmit={handleCustomSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs text-slate-300 font-medium">Stock A (Ticker)</label>
            <input
              type="text"
              value={symA}
              onChange={(e) => setSymA(e.target.value)}
              placeholder="e.g. TCS.NS"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white uppercase font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs text-slate-300 font-medium">Stock B (Ticker)</label>
            <input
              type="text"
              value={symB}
              onChange={(e) => setSymB(e.target.value)}
              placeholder="e.g. INFY.NS"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white uppercase font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center justify-center gap-1.5 h-9"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Compare</span>
            </button>
          </div>
        </form>

        {/* Popular Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-500">Popular Battles:</span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setSymA(p.a);
                setSymB(p.b);
                fetchComparison(p.a, p.b);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
          {error}
        </div>
      )}

      {/* Comparison Grid Table */}
      {quoteA && quoteB && !loading && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl">
            {/* Headers */}
            <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/80 p-5 text-center items-center">
              <div className="text-left">
                <span className="text-xs font-mono font-bold text-emerald-400">{quoteA.symbol}</span>
                <h2 className="text-lg font-bold text-white leading-tight mt-0.5">{quoteA.name}</h2>
                <span className="text-[11px] text-slate-500">{quoteA.sector || 'General'}</span>
              </div>

              <div className="text-center font-bold text-xs uppercase tracking-widest text-slate-500">
                <span>Metric Benchmark</span>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-blue-400">{quoteB.symbol}</span>
                <h2 className="text-lg font-bold text-white leading-tight mt-0.5">{quoteB.name}</h2>
                <span className="text-[11px] text-slate-500">{quoteB.sector || 'General'}</span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-800/80 text-xs">
              {/* Price & Day Change */}
              <div className="grid grid-cols-3 p-4 items-center hover:bg-slate-800/20 transition-colors">
                <div className="font-mono text-left">
                  <span className="text-base font-bold text-white">
                    ₹{quoteA.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <div
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      (quoteA.change || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {(quoteA.change || 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>
                      {(quoteA.change || 0) >= 0 ? '+' : ''}
                      {quoteA.changePercent?.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="text-center text-slate-400 font-medium">Market Price (Today)</div>

                <div className="font-mono text-right">
                  <span className="text-base font-bold text-white">
                    ₹{quoteB.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <div
                    className={`text-[11px] font-semibold flex items-center justify-end gap-1 ${
                      (quoteB.change || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {(quoteB.change || 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>
                      {(quoteB.change || 0) >= 0 ? '+' : ''}
                      {quoteB.changePercent?.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Market Cap */}
              <div className="grid grid-cols-3 p-4 items-center hover:bg-slate-800/20 transition-colors">
                <div className="font-mono text-left font-bold text-slate-200">
                  {formatMarketCap(quoteA.marketCap)}
                </div>
                <div className="text-center text-slate-400 font-medium">Market Capitalization</div>
                <div className="font-mono text-right font-bold text-slate-200">
                  {formatMarketCap(quoteB.marketCap)}
                </div>
              </div>

              {/* P/E Ratio */}
              <div className="grid grid-cols-3 p-4 items-center hover:bg-slate-800/20 transition-colors">
                <div className="font-mono text-left font-bold text-white">
                  {quoteA.peRatio ? `${quoteA.peRatio.toFixed(1)}x` : 'Not Disclosed'}
                </div>
                <div className="text-center text-slate-400 font-medium">P/E Ratio (TTM)</div>
                <div className="font-mono text-right font-bold text-white">
                  {quoteB.peRatio ? `${quoteB.peRatio.toFixed(1)}x` : 'Not Disclosed'}
                </div>
              </div>

              {/* P/B Ratio */}
              <div className="grid grid-cols-3 p-4 items-center hover:bg-slate-800/20 transition-colors">
                <div className="font-mono text-left font-bold text-white">
                  {quoteA.pbRatio ? `${quoteA.pbRatio.toFixed(2)}x` : 'Not Disclosed'}
                </div>
                <div className="text-center text-slate-400 font-medium">Price-to-Book (P/B)</div>
                <div className="font-mono text-right font-bold text-white">
                  {quoteB.pbRatio ? `${quoteB.pbRatio.toFixed(2)}x` : 'Not Disclosed'}
                </div>
              </div>

              {/* Dividend Yield */}
              <div className="grid grid-cols-3 p-4 items-center hover:bg-slate-800/20 transition-colors">
                <div className="font-mono text-left text-slate-300">
                  {quoteA.dividendYield !== undefined ? `${quoteA.dividendYield.toFixed(2)}%` : '0.00%'}
                </div>
                <div className="text-center text-slate-400 font-medium">Dividend Yield</div>
                <div className="font-mono text-right text-slate-300">
                  {quoteB.dividendYield !== undefined ? `${quoteB.dividendYield.toFixed(2)}%` : '0.00%'}
                </div>
              </div>

              {/* 52-Week Range */}
              <div className="grid grid-cols-3 p-4 items-center hover:bg-slate-800/20 transition-colors">
                <div className="font-mono text-left text-[11px] text-slate-400">
                  ₹{quoteA.week52Low?.toLocaleString('en-IN')} — ₹{quoteA.week52High?.toLocaleString('en-IN')}
                </div>
                <div className="text-center text-slate-400 font-medium">52-Week Range</div>
                <div className="font-mono text-right text-[11px] text-slate-400">
                  ₹{quoteB.week52Low?.toLocaleString('en-IN')} — ₹{quoteB.week52High?.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Direct Deep Dive Action Links */}
              <div className="grid grid-cols-3 p-5 items-center bg-slate-950/40">
                <div className="text-left">
                  <Link
                    href={`/stocks/${encodeURIComponent(quoteA.symbol)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                  >
                    <span>Full Analysis ({quoteA.symbol})</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div className="text-center text-[11px] text-slate-500">
                  Inspect charts & AI Evidence
                </div>

                <div className="text-right">
                  <Link
                    href={`/stocks/${encodeURIComponent(quoteB.symbol)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                  >
                    <span>Full Analysis ({quoteB.symbol})</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Peer Comparison Rule: Cheap vs Durable</span>
            </div>
            <p>
              A stock with a lower P/E ratio is not automatically better. High-quality businesses that consistently earn a Return on Capital Employed (ROCE) above 20% naturally command a &quot;growth premium&quot;. Always check cash conversion and debt burden before judging value.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
