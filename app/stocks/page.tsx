import React from 'react';
import Link from 'next/link';
import StockSearchBar from '@/components/StockSearchBar';
import { INDIAN_STOCKS } from '@/services/marketData/data/indianStocks';
import { Search, TrendingUp, Building2, ArrowRight } from 'lucide-react';

export default function StocksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Search */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
          <Search className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Stock Research Hub</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Search over 2,000+ Indian equities on NSE & BSE. Access valuation multiples, balance sheet health indicators, and educational evidence breakdowns.
        </p>

        <div className="pt-2">
          <StockSearchBar autoFocus placeholder="Type company name or ticker (e.g. TCS, RELIANCE, INFY)..." />
        </div>
      </div>

      {/* Featured Indian Bluechip Equities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>NIFTY 50 & Key Indian Equities</span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Click any company below to inspect its fundamental ratios and balance sheet durability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INDIAN_STOCKS.map((stock) => (
            <Link
              key={stock.symbol}
              href={`/stocks/${encodeURIComponent(stock.symbol)}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {stock.cleanSymbol}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold ${
                      stock.exchange === 'NSE'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {stock.exchange}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {stock.name}
                </h3>

                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {stock.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {stock.sector}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Detail <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
