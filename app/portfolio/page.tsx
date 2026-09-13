'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AddHoldingModal from '@/components/AddHoldingModal';
import {
  Briefcase,
  Plus,
  TrendingUp,
  TrendingDown,
  Trash2,
  Sparkles,
  Loader2,
  AlertCircle,
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';

interface EnrichedHolding {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  exchange: 'NSE' | 'BSE';
  shares: number;
  buy_price: number;
  buy_date: string;
  thesis_notes?: string;
  created_at: string;
  current_price: number;
  total_cost: number;
  current_value: number;
  gain_loss: number;
  gain_loss_percent: number;
  pe_ratio?: number;
}

interface PortfolioTotals {
  totalInvested: number;
  currentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

export default function PortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [holdings, setHoldings] = useState<EnrichedHolding[]>([]);
  const [totals, setTotals] = useState<PortfolioTotals>({
    totalInvested: 0,
    currentValue: 0,
    totalGainLoss: 0,
    totalGainLossPercent: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedThesisId, setExpandedThesisId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.status === 401) {
        router.push('/login?redirectTo=/portfolio');
        return;
      }
      const data = await res.json();
      setHoldings(data.holdings || []);
      if (data.totals) {
        setTotals(data.totals);
      }
      if (data.notice) {
        setNotice(data.notice);
      }
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login?redirectTo=/portfolio');
      } else {
        setUserEmail(user.email ?? null);
        fetchPortfolio();
      }
    });
  }, [router, fetchPortfolio]);

  const handleDelete = async (id: string, symbol: string) => {
    if (!confirm(`Are you sure you want to remove ${symbol} from your portfolio?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setHoldings((prev) => prev.filter((h) => h.id !== id));
        fetchPortfolio(); // recalculate totals
      }
    } catch (err) {
      console.error('Failed to delete holding:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const isPositive = totals.totalGainLoss >= 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>RLS Protected &bull; {userEmail}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Portfolio & Thesis Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track business quality, entry valuations, and test your ongoing investment thesis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Holding
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            {notice} — Please ensure migration <code className="font-mono">00003_create_portfolio.sql</code> has been executed in the Supabase SQL Editor.
          </span>
        </div>
      )}

      {/* Summary Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invested */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400">Total Invested</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">
            ₹{totals.totalInvested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-slate-500">Cumulative acquisition cost</span>
        </div>

        {/* Current Portfolio Value */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400">Current Value</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">
            ₹{totals.currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-slate-500">Based on delayed NSE/BSE feeds</span>
        </div>

        {/* Overall Gain / Loss */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400">Overall Gain / Loss</span>
          <div className="flex items-baseline gap-2">
            <p
              className={`text-xl sm:text-2xl font-bold font-mono ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isPositive ? '+' : ''}₹
              {totals.totalGainLoss.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? '+' : ''}
            {totals.totalGainLossPercent.toFixed(2)}%
          </span>
        </div>

        {/* Total Positions */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400">Tracked Companies</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">{holdings.length}</p>
          <span className="text-[11px] text-slate-500">Active investment theses</span>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
          <span className="text-xs">Valuating portfolio holdings...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && holdings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
            <Briefcase className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">No Holdings Logged Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Log your investments alongside your rationale (balance sheet strength, valuation multiple, growth drivers). Reviewing your thesis prevents impulsive emotional selling.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Your First Holding
          </button>
        </div>
      )}

      {/* Holdings Table */}
      {!loading && holdings.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Company / Symbol</th>
                  <th className="py-3.5 px-3 text-right">Shares</th>
                  <th className="py-3.5 px-3 text-right">Buy Price</th>
                  <th className="py-3.5 px-3 text-right">Current Price</th>
                  <th className="py-3.5 px-3 text-right">Current Value</th>
                  <th className="py-3.5 px-3 text-right">Gain / Loss</th>
                  <th className="py-3.5 px-4 text-center">Thesis & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {holdings.map((h) => {
                  const isHoldingPositive = h.gain_loss >= 0;
                  const isExpanded = expandedThesisId === h.id;

                  return (
                    <React.Fragment key={h.id}>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <Link
                            href={`/stocks/${encodeURIComponent(h.symbol)}`}
                            className="font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                          >
                            <span>{h.company_name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-slate-400">
                            <span className="text-emerald-400">{h.symbol}</span>
                            <span>&bull;</span>
                            <span>{h.exchange}</span>
                            <span>&bull;</span>
                            <span className="text-slate-500">{h.buy_date}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-slate-200">
                          {h.shares.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                          ₹{h.buy_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-white font-semibold">
                          ₹{h.current_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-white font-bold">
                          ₹{h.current_value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono">
                          <div
                            className={`font-semibold ${
                              isHoldingPositive ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isHoldingPositive ? '+' : ''}₹
                            {h.gain_loss.toLocaleString('en-IN', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div
                            className={`text-[11px] ${
                              isHoldingPositive ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isHoldingPositive ? '+' : ''}
                            {h.gain_loss_percent.toFixed(2)}%
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {h.thesis_notes && (
                              <button
                                onClick={() => setExpandedThesisId(isExpanded ? null : h.id)}
                                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
                                  isExpanded
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                }`}
                                title="View Thesis Notes"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Thesis</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </button>
                            )}

                            <Link
                              href={`/stocks/${encodeURIComponent(h.symbol)}`}
                              className="p-1.5 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                              title="Analyze with AI"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => handleDelete(h.id, h.symbol)}
                              disabled={deletingId === h.id}
                              className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                              title="Delete Holding"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Thesis Row */}
                      {isExpanded && h.thesis_notes && (
                        <tr className="bg-slate-950/80">
                          <td colSpan={7} className="py-3 px-6">
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs space-y-2">
                              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                                <span className="flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>Investment Thesis Rationale</span>
                                </span>
                                <Link
                                  href={`/stocks/${encodeURIComponent(h.symbol)}`}
                                  className="text-[11px] hover:underline flex items-center gap-1"
                                >
                                  <span>Re-evaluate with StockMentor AI &rarr;</span>
                                </Link>
                              </div>
                              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {h.thesis_notes}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Educational Thesis Principle Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>The Power of Thesis-Driven Investing</span>
        </div>
        <p className="leading-relaxed">
          Successful investors document their reasoning at entry: valuation margin of safety, debt profile, and competitive moats. When market fluctuations occur, review your documented thesis instead of the price ticker. If the business fundamentals remain intact, price swings represent opportunities rather than panic triggers.
        </p>
      </div>

      {/* Add Holding Modal */}
      <AddHoldingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPortfolio}
      />
    </div>
  );
}
