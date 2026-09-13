'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AddJournalModal from '@/components/AddJournalModal';
import { InvestmentJournalEntry, JournalAction } from '@/types';
import {
  BookOpen,
  Plus,
  Trash2,
  Star,
  ShieldCheck,
  BrainCircuit,
  Loader2,
  ArrowLeft,
  ExternalLink,
  Target,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export default function JournalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<InvestmentJournalEntry[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionFilter, setActionFilter] = useState<string>('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchJournal = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/journal');
      if (res.status === 401) {
        router.push('/login?redirectTo=/journal');
        return;
      }
      const data = await res.json();
      setEntries(data.entries || []);
      if (data.notice) {
        setNotice(data.notice);
      }
    } catch (err) {
      console.error('Failed to fetch journal:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login?redirectTo=/journal');
      } else {
        setUserEmail(user.email ?? null);
        fetchJournal();
      }
    });
  }, [router, fetchJournal]);

  const handleDelete = async (id: string, symbol: string) => {
    if (!confirm(`Delete journal entry for ${symbol}?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/journal?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEntries = entries.filter((e) => {
    if (actionFilter === 'ALL') return true;
    return e.action === actionFilter;
  });

  // Calculate Behavioral Stats
  const totalDecisions = entries.length;
  const disciplinedCount = entries.filter((e) => e.emotional_state === 'disciplined').length;
  const fomoCount = entries.filter((e) => e.emotional_state === 'fomo').length;
  const disciplinedPercent = totalDecisions > 0 ? (disciplinedCount / totalDecisions) * 100 : 100;
  const avgConviction =
    totalDecisions > 0
      ? (entries.reduce((sum, e) => sum + e.conviction_level, 0) / totalDecisions).toFixed(1)
      : '0.0';

  const getActionBadge = (act: JournalAction) => {
    switch (act) {
      case 'BUY':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'SELL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'HOLD':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'WATCH':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  const getEmotionEmoji = (emo: string) => {
    switch (emo) {
      case 'disciplined':
        return '🎯 Disciplined';
      case 'excited':
        return '🚀 Excited';
      case 'fomo':
        return '⚠️ FOMO Alert';
      case 'anxious':
        return '😰 Anxious';
      case 'neutral':
      default:
        return '⚖️ Neutral';
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Behavioral Discipline &bull; {userEmail}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Investment Decision Journal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Capture your thesis in the moment to eliminate hindsight bias and master emotional discipline
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
            <Plus className="h-4 w-4" /> Log Decision
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            {notice} — Run migration <code className="font-mono">00004_create_journal.sql</code> in your Supabase SQL Editor.
          </span>
        </div>
      )}

      {/* Psychology & Discipline Scorecards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Logged Entries
          </span>
          <p className="text-2xl font-bold text-white font-mono">{totalDecisions}</p>
          <span className="text-[11px] text-slate-500">Historical investment thoughts</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" /> Disciplined Ratio
          </span>
          <p className="text-2xl font-bold text-emerald-400 font-mono">
            {disciplinedPercent.toFixed(0)}%
          </p>
          <span className="text-[11px] text-slate-500">{disciplinedCount} methodical choices</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400" /> Avg Conviction
          </span>
          <p className="text-2xl font-bold text-amber-400 font-mono">{avgConviction} / 5</p>
          <span className="text-[11px] text-slate-500">Confidence baseline</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-rose-400" /> FOMO Alerts
          </span>
          <p className="text-2xl font-bold text-rose-400 font-mono">{fomoCount}</p>
          <span className="text-[11px] text-slate-500">Impulsive urges recorded</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
          {['ALL', 'BUY', 'SELL', 'HOLD', 'WATCH'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActionFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                actionFilter === tab
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Showing {filteredEntries.length} of {entries.length} entries
        </span>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
          <span className="text-xs">Loading journal entries...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && entries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
            <BookOpen className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">Your Decision Journal is Empty</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Before you hit the buy or sell button on your broker terminal, log your reasons here.
              Reviewing your documented thoughts prevents hindsight distortion when stocks oscillate.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Log Your First Entry
          </button>
        </div>
      )}

      {/* Journal Cards Feed */}
      {!loading && filteredEntries.length > 0 && (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-lg hover:border-slate-700/80 transition-all"
            >
              {/* Card Header: Symbol, Action, Price, Emotion, Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono border ${getActionBadge(
                      entry.action
                    )}`}
                  >
                    {entry.action}
                  </span>
                  <div>
                    <Link
                      href={`/stocks/${encodeURIComponent(entry.symbol)}`}
                      className="text-base font-bold text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{entry.symbol}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                    <span className="text-xs text-slate-500 font-mono ml-2">
                      @ ₹{entry.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Emotion Pill */}
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                    {getEmotionEmoji(entry.emotional_state)}
                  </span>

                  {/* Conviction Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= entry.conviction_level
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-slate-500 font-mono">
                    {new Date(entry.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>

                  <button
                    onClick={() => handleDelete(entry.id, entry.symbol)}
                    disabled={deletingId === entry.id}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pre-trade Thesis Rationale */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Documented Rationale (Pre-Decision)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  {entry.thesis_rationale}
                </p>
              </div>

              {/* Lessons Learned / Post-Mortem */}
              {entry.lessons_learned && (
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                    Post-Mortem & Retrospective Lessons
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
                    {entry.lessons_learned}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Journal Modal */}
      <AddJournalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchJournal}
      />
    </div>
  );
}
