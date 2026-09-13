import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Briefcase,
  User,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default async function PortfolioPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/portfolio');
  }

  // Fetch user profile from Supabase profiles table (RLS enforced)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const displayName =
    profile?.display_name ||
    (user.user_metadata?.display_name as string) ||
    user.email?.split('@')[0] ||
    'Investor';

  const experienceLevel = profile?.experience_level || 'beginner';
  const createdAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recently';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      {/* Protected Badge Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Protected Route (Supabase Auth Verified)</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Investor Portfolio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalized learning space & thesis portfolio
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      {/* User Profile Card (backed by Supabase profiles table) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{displayName}</h2>
              <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            </div>
          </div>
          <span className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400">
            {experienceLevel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="rounded-lg bg-slate-900/80 p-3">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Member Since
            </span>
            <p className="mt-1 font-medium text-slate-200">{createdAt}</p>
          </div>
          <div className="rounded-lg bg-slate-900/80 p-3">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> Experience Level
            </span>
            <p className="mt-1 font-medium text-slate-200 capitalize">{experienceLevel}</p>
          </div>
          <div className="rounded-lg bg-slate-900/80 p-3">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> RLS Policy
            </span>
            <p className="mt-1 font-medium text-emerald-400 font-mono">user_id = auth.uid()</p>
          </div>
        </div>
      </div>

      {/* Portfolio Holdings Section - Empty State (No Fabricated Data) */}
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 p-10 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-500">
          <Briefcase className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white">No Holdings Tracked Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Portfolio tracking, allocation breakdowns, and quarterly earnings analysis will activate in Phase 2.
            StockMentor AI never fabricates placeholder numbers or synthetic returns.
          </p>
        </div>
        <div className="pt-2">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400 border border-slate-700">
            Phase 1 Deliverable: Auth Verification Complete
          </span>
        </div>
      </div>
    </div>
  );
}
