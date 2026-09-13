'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TrendingUp, UserPlus, AlertCircle, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { ExperienceLevel } from '@/types';

export default function SignupPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName.trim() || email.split('@')[0],
            experience_level: experienceLevel,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      // Check if email confirmation is required by Supabase project settings
      if (data.user && !data.session) {
        setSuccessMsg(
          'Registration successful! Please check your email inbox to confirm your account, then log in.'
        );
        setIsLoading(false);
        return;
      }

      // Direct sign-in if email confirmation is disabled in Supabase
      router.push('/portfolio');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred during registration.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Investor Profile</h1>
          <p className="text-xs text-slate-400">
            Start your self-guided equity education journey with StockMentor AI
          </p>
        </div>

        {/* Educational philosophy banner */}
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Learn with data & filings. No advisory tips, no return promises.</span>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {/* Signup Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Market Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="beginner">Beginner (Learning balance sheets & fundamentals)</option>
                <option value="intermediate">Intermediate (Comfortable with P/E, cash flows, ratios)</option>
                <option value="advanced">Advanced (Deep valuation models & multi-year cycles)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Register Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
