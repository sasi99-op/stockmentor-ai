import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { marketDataService } from '@/services/marketData/MarketDataService';
import { Bookmark, Search, ArrowRight, TrendingUp, TrendingDown, LogIn } from 'lucide-react';

export default async function WatchlistPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-amber-400">
          <Bookmark className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your Stock Watchlist</h1>
        <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
          Sign in to save and monitor your favorite Indian equities, track earnings dates, and evaluate balance sheet metrics over time.
        </p>
        <div className="pt-2">
          <Link
            href="/login?redirectTo=/watchlist"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            <LogIn className="h-4 w-4" /> Sign In to Access Watchlist
          </Link>
        </div>
      </div>
    );
  }

  // Fetch user's watchlist from Supabase
  const { data: items } = await supabase
    .from('watchlists')
    .select('*')
    .order('created_at', { ascending: false });

  const watchlistItems = items || [];

  // Fetch current live quotes for items in parallel
  const quotesMap = new Map<string, Awaited<ReturnType<typeof marketDataService.getQuote>>>();
  await Promise.all(
    watchlistItems.map(async (item) => {
      try {
        const quote = await marketDataService.getQuote(item.symbol);
        if (quote) quotesMap.set(item.symbol, quote);
      } catch {
        // Continue gracefully if one ticker fails
      }
    })
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400 mb-2">
            <Bookmark className="h-3.5 w-3.5" />
            <span>Saved Stocks ({watchlistItems.length})</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Investor Watchlist</h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalized monitoring list for Indian equities (NSE & BSE)
          </p>
        </div>

        <Link
          href="/stocks"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <Search className="h-4 w-4 text-emerald-400" />
          <span>Discover More Stocks</span>
        </Link>
      </div>

      {/* Empty State */}
      {watchlistItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-slate-500">
            <Bookmark className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">Your Watchlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              You haven&apos;t added any stocks yet. Search for companies like TCS, Reliance, or Infosys and click &quot;Add to Watchlist&quot; to monitor them here.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/stocks"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Browse Indian Equities <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Watchlist Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlistItems.map((item) => {
            const quote = quotesMap.get(item.symbol);
            const isPositive = (quote?.change || 0) >= 0;

            return (
              <Link
                key={item.id}
                href={`/stocks/${encodeURIComponent(item.symbol)}`}
                className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {item.symbol.replace('.NS', '').replace('.BO', '')}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold ${
                      item.exchange === 'NSE'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.exchange}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                  {item.company_name}
                </h3>

                {quote ? (
                  <div className="mt-4 flex items-baseline justify-between border-t border-slate-800/80 pt-3">
                    <span className="text-base font-bold text-white font-mono">
                      ₹ {quote.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold font-mono ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {quote.changePercent?.toFixed(2)}%
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 border-t border-slate-800/80 pt-3 text-[11px] text-slate-500">
                    Quote loading...
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
