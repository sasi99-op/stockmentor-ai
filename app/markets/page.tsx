'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  RefreshCw,
  Clock,
  Building2,
  Layers,
  ArrowUpRight,
  Loader2,
  Info,
} from 'lucide-react';

interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface SectorData {
  sector: string;
  representativeSymbol: string;
  companyName: string;
  price: number;
  changePercent: number;
}

export default function MarketsPage() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/markets');
      if (!res.ok) {
        throw new Error('Failed to load market overview');
      }
      const data = await res.json();
      setIndices(data.indices || []);
      setSectors(data.sectors || []);
      setLastUpdated(data.lastUpdated || '');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching market pulse');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>NSE & BSE Market Pulse</span>
            </span>
            {lastUpdated && (
              <span className="text-[11px] text-slate-500 font-mono">
                Updated: {lastUpdated} IST
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Indian Markets Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Macro benchmark tracking, sector performance, and institutional capital dynamics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <button
            onClick={fetchMarketData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && indices.length === 0 && (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
          <span className="text-xs">Fetching live index ticks from NSE & BSE feeds...</span>
        </div>
      )}

      {/* Benchmark Indices Grid */}
      {indices.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Headline Benchmark Indices</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {indices.map((idx) => {
              const isPos = idx.change >= 0;
              return (
                <div
                  key={idx.symbol}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all space-y-2 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{idx.name}</span>
                    <span className="text-[11px] font-mono text-slate-500">{idx.symbol}</span>
                  </div>

                  <div className="pt-1">
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {idx.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold font-mono ${
                      isPos ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPos ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isPos ? '+' : ''}
                      {idx.change.toFixed(2)} ({isPos ? '+' : ''}
                      {idx.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sector Performance Grid */}
      {sectors.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Key Sector Leaders & Movements</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sec) => {
              const isPos = sec.changePercent >= 0;
              return (
                <div
                  key={sec.sector}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{sec.sector}</span>
                    <span
                      className={`font-mono font-bold ${
                        isPos ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPos ? '+' : ''}
                      {sec.changePercent.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                    <div>
                      <p className="font-medium text-slate-200">{sec.companyName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{sec.representativeSymbol}</p>
                    </div>

                    <Link
                      href={`/stocks/${encodeURIComponent(sec.representativeSymbol)}`}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] transition-colors"
                    >
                      <span>Analyze</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Institutional Capital Dynamics Guide (FII vs DII) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>Understanding Institutional Capital: FII vs DII</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
              <span>Foreign Institutional Investors (FII / FPI)</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Global pension funds, hedge funds, and sovereign wealth funds. FII allocations are heavily influenced by US Federal Reserve interest rates, the US Dollar Index (DXY), and global risk appetites. When US bond yields rise, FIIs often pull liquidity from emerging markets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
              <span>Domestic Institutional Investors (DII)</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Indian mutual funds, insurance companies (LIC), and pension funds (EPFO). Over recent years, monthly Indian retail SIPs (&gt; ₹20,000+ Cr monthly) have transformed DIIs into a structural counterweight, absorbing foreign selling and reducing catastrophic volatility in Indian equities.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Self-Guided Investor Principle:</strong> Do not react to day-to-day macro headlines or index swings. Individual company fundamentals (Free Cash Flow, debt solvency, and pricing power) ultimately determine long-term intrinsic returns.
          </p>
        </div>
      </div>

      {/* Footnote latency disclaimer */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Clock className="w-3.5 h-3.5" />
        <span>Index quotes and sector changes reflect 15-minute delayed public exchange data. Strictly educational.</span>
      </div>
    </div>
  );
}
