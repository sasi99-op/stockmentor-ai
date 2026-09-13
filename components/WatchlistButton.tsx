'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface WatchlistButtonProps {
  symbol: string;
  companyName: string;
  exchange: 'NSE' | 'BSE';
}

export default function WatchlistButton({
  symbol,
  companyName,
  exchange,
}: WatchlistButtonProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);

      if (session?.user) {
        // Check if item is currently in watchlist
        fetch('/api/watchlist')
          .then((r) => r.json())
          .then((data) => {
            if (data.watchlist) {
              const exists = data.watchlist.some(
                (item: { symbol: string }) => item.symbol.toUpperCase() === symbol.toUpperCase()
              );
              setIsSaved(exists);
            }
          })
          .catch((err) => console.error('Error checking watchlist status:', err));
      }
    });
  }, [symbol]);

  const handleToggle = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirectTo=/stocks/${encodeURIComponent(symbol)}`);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        // Delete from watchlist
        const res = await fetch(`/api/watchlist?symbol=${encodeURIComponent(symbol)}`, {
          method: 'DELETE',
        });
        if (res.ok) setIsSaved(false);
      } else {
        // Add to watchlist
        const res = await fetch('/api/watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbol, company_name: companyName, exchange }),
        });
        if (res.ok) setIsSaved(true);
      }
    } catch (err) {
      console.error('Watchlist toggle error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        isSaved
          ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
          : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
      ) : isSaved ? (
        <>
          <Check className="h-3.5 w-3.5 text-amber-400" />
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <Bookmark className="h-3.5 w-3.5" />
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
}
