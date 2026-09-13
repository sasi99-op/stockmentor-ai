'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StockSearchBar from '@/components/StockSearchBar';
import { INDIAN_STOCKS } from '@/services/marketData/data/indianStocks';
import { Search, TrendingUp, Building2, ArrowRight, Filter, Layers } from 'lucide-react';

const SECTORS = [
  'ALL',
  'Technology',
  'Financials',
  'Energy',
  'Automobile',
  'Consumer Goods',
  'Healthcare',
  'Industrials & Defense',
  'Metals & Mining',
  'Basic Materials',
];

export default function StocksPage() {
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedExchange, setSelectedExchange] = useState<'ALL' | 'NSE' | 'BSE'>('ALL');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredStocks = INDIAN_STOCKS.filter((stock) => {
    // Sector filter
    if (selectedSector !== 'ALL') {
      if (!stock.sector.toLowerCase().includes(selectedSector.toLowerCase())) {
        return false;
      }
    }

    // Exchange filter
    if (selectedExchange !== 'ALL' && stock.exchange !== selectedExchange) {
      return false;
    }

    // Text filter
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase().trim();
      const matchSym = stock.symbol.toLowerCase().includes(q);
      const matchClean = stock.cleanSymbol.toLowerCase().includes(q);
      const matchName = stock.name.toLowerCase().includes(q);
      const matchSummary = stock.summary?.toLowerCase().includes(q);
      return matchSym || matchClean || matchName || matchSummary;
    }

    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Global Universe Search */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
          <Search className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Stock Research Hub</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Search over 2,000+ Indian equities on NSE & BSE. Access valuation multiples, TradingView charts, and AI evidence breakdowns.
        </p>

        <div className="pt-2">
          <StockSearchBar autoFocus placeholder="Type company name or ticker (e.g. TCS, RELIANCE, INFY)..." />
        </div>
      </div>

      {/* Interactive Curated Screener */}
      <div className="space-y-5">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>NIFTY 50 & Key Indian Equities</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Filter by sector or exchange to inspect fundamental ratios and balance sheet durability.
            </p>
          </div>

          {/* In-catalog Quick Filter Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter listed below..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Sector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
              <Layers className="w-3.5 h-3.5" /> Sector:
            </span>
            {SECTORS.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedSector === sec
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Exchange Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Exchange:
            </span>
            <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800 text-xs">
              {(['ALL', 'NSE', 'BSE'] as const).map((ex) => (
                <button
                  key={ex}
                  onClick={() => setSelectedExchange(ex)}
                  className={`px-2.5 py-0.5 rounded-md font-medium font-mono text-[11px] transition-all ${
                    selectedExchange === ex
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-slate-500 font-mono">
          Showing {filteredStocks.length} of {INDIAN_STOCKS.length} companies
        </div>

        {/* Stocks Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStocks.map((stock) => (
            <Link
              key={stock.symbol}
              href={`/stocks/${encodeURIComponent(stock.symbol)}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900 shadow-sm"
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

        {filteredStocks.length === 0 && (
          <div className="p-10 rounded-2xl border border-dashed border-slate-800 text-center space-y-2">
            <p className="text-sm font-medium text-slate-300">No stocks match your filter criteria.</p>
            <p className="text-xs text-slate-500">Try resetting your sector or search query.</p>
            <button
              onClick={() => {
                setSelectedSector('ALL');
                setSelectedExchange('ALL');
                setFilterQuery('');
              }}
              className="px-3 py-1.5 text-xs rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
