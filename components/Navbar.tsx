'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  TrendingUp,
  LayoutDashboard,
  Search,
  Scale,
  Bookmark,
  Briefcase,
  GraduationCap,
  BookOpen,
  Sparkles,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isProtected?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: LayoutDashboard },
  { label: 'Markets', href: '/markets', icon: TrendingUp },
  { label: 'Stocks', href: '/stocks', icon: Search },
  { label: 'Compare', href: '/compare', icon: Scale },
  { label: 'Watchlist', href: '/watchlist', icon: Bookmark, isProtected: true },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase, isProtected: true },
  { label: 'Learn', href: '/learn', icon: GraduationCap },
  { label: 'Journal', href: '/journal', icon: BookOpen, isProtected: true },
  { label: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
  { label: 'Settings', href: '/settings', icon: Settings, isProtected: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        setDisplayName(
          (session.user.user_metadata?.display_name as string) ||
            session.user.email?.split('@')[0] ||
            null
        );
      } else {
        setUserEmail(null);
        setDisplayName(null);
      }
      setIsLoadingAuth(false);
    });

    // Subscribe to auth state updates
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        setDisplayName(
          (session.user.user_metadata?.display_name as string) ||
            session.user.email?.split('@')[0] ||
            null
        );
      } else {
        setUserEmail(null);
        setDisplayName(null);
      }
      setIsLoadingAuth(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    setDisplayName(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                StockMentor <span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                NSE • BSE Assistant
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5 opacity-70" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Compact Desktop Navigation for Medium Screens */}
        <nav className="hidden md:flex xl:hidden items-center gap-1">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoadingAuth ? (
            <div className="h-8 w-24 animate-pulse rounded bg-slate-800" />
          ) : userEmail ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200">
                <UserIcon className="h-3.5 w-3.5 text-emerald-400" />
                <span className="max-w-[130px] truncate font-medium">
                  {displayName || userEmail}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Log In</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 shadow-sm shadow-emerald-500/20"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-3">
            {userEmail ? (
              <div className="space-y-2">
                <div className="text-xs text-slate-400 truncate">
                  Logged in as: <span className="text-slate-200 font-medium">{userEmail}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
