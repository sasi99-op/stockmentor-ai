import React from 'react';
import Link from 'next/link';
import { Settings, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/settings');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-xs text-slate-400">Manage your profile and learning preferences</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-200">Account Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
            <span className="text-slate-500">Email Address</span>
            <p className="mt-1 font-mono text-slate-200">{user.email}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
            <span className="text-slate-500">User ID</span>
            <p className="mt-1 font-mono text-slate-200 truncate">{user.id}</p>
          </div>
        </div>
      </div>

      <div className="pt-2">
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
