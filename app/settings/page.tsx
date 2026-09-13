'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ExperienceLevel } from '@/types';
import {
  Settings,
  ArrowLeft,
  User,
  ShieldCheck,
  Check,
  Loader2,
  AlertCircle,
  Bookmark,
  Briefcase,
  BookOpen,
} from 'lucide-react';

const LEVELS: { value: ExperienceLevel; title: string; desc: string; badge: string }[] = [
  {
    value: 'beginner',
    title: 'Beginner Investor',
    badge: 'Foundations',
    desc: 'Focus on core definitions (P/E, Dividend Yield), annual report structure, and fundamental checklists.',
  },
  {
    value: 'intermediate',
    title: 'Intermediate Investor',
    badge: 'Valuation & Debt',
    desc: 'Emphasis on sector median benchmarking, operating EBITDA margins, interest coverage, and working capital cycles.',
  },
  {
    value: 'advanced',
    title: 'Advanced Investor',
    badge: 'Forensics & Moats',
    desc: 'In-depth forensic audit red flags, promoter pledging scrutiny, Return on Capital Employed (ROCE), and FCF conversion.',
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login?redirectTo=/settings');
      } else {
        setUserEmail(user.email ?? null);
        setUserId(user.id);
        fetch('/api/profile')
          .then((res) => res.json())
          .then((data) => {
            if (data.profile) {
              setDisplayName(data.profile.display_name || '');
              setExperienceLevel(data.profile.experience_level || 'beginner');
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }
    });
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName.trim(),
          experience_level: experienceLevel,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to update profile');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Investor Settings</h1>
            <p className="text-xs text-slate-400">Personalize your learning depth and profile metadata</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mb-2" />
          <span className="text-xs">Loading profile settings...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Name */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Public Display Name</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">How should StockMentor address you?</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Sasi, ValueHunter, RetailCompounder"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none max-w-md"
              />
            </div>
          </div>

          {/* Experience Level Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Investor Experience Level</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrates how explanations and educational checklists are framed
              </p>
            </div>

            <div className="space-y-3">
              {LEVELS.map((lvl) => {
                const isSelected = experienceLevel === lvl.value;
                return (
                  <button
                    key={lvl.value}
                    type="button"
                    onClick={() => setExperienceLevel(lvl.value)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{lvl.title}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                            isSelected
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {lvl.badge}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-400">{lvl.desc}</p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                          : 'border-slate-700 bg-slate-950 text-transparent'
                      }`}
                    >
                      <Check className="w-3 h-3 font-bold" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Security Information Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentication & Security</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500">Registered Email</span>
                <p className="mt-1 font-mono text-slate-200 truncate">{userEmail}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500">Supabase User UID</span>
                <p className="mt-1 font-mono text-slate-400 text-[11px] truncate">{userId}</p>
              </div>
            </div>
          </div>

          {/* Quick Hub Links */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Quickly jump to your private data:</span>
            <div className="flex items-center gap-2">
              <Link
                href="/watchlist"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
              >
                <Bookmark className="w-3 h-3" />
                <span>Watchlist</span>
              </Link>
              <Link
                href="/portfolio"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
              >
                <Briefcase className="w-3 h-3" />
                <span>Portfolio</span>
              </Link>
              <Link
                href="/journal"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                <span>Journal</span>
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
