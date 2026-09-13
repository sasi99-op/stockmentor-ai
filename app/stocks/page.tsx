'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StockSearchBar from '@/components/StockSearchBar';
import { INDIAN_STOCKS } from '@/services/marketData/data/indianStocks';
import { Search, TrendingUp, Building2, ArrowRight, Filter, Layers, Sparkles, ChevronDown } from 'lucide-react';

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
  'Telecommunications',
  'Real Estate',
  'Media & Entertainment',
];

const THEMES = [
  { id: 'ALL', label: 'All Equities' },
  { id: 'NIFTY50', label: 'Nifty 50 Giants' },
  { id: 'NEXT50', label: 'Nifty Next 50' },
  { id: 'MIDCAP', label: 'High-Growth Midcaps' },
  { id: 'PSU_DEFENSE', label: 'PSU & Defense' },
  { id: 'GREEN_ENERGY', label: 'Green Energy & EV' },
];

export default function StocksPage() {
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedTheme, setSelectedTheme] = useState('ALL');
  const [selectedExchange, setSelectedExchange] = useState<'ALL' | 'NSE' | 'BSE'>('ALL');
  const [filterQuery, setFilterQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(24);

  const filteredStocks = INDIAN_STOCKS.filter((stock) => {
    // Theme filter
    if (selectedTheme === 'NIFTY50' && stock.category !== 'NIFTY50') return false;
    if (selectedTheme === 'NEXT50' && stock.category !== 'NEXT50') return false;
    if (selectedTheme === 'MIDCAP' && stock.category !== 'MIDCAP' && stock.category !== 'SMALLCAP') return false;
    if (selectedTheme === 'PSU_DEFENSE') {
      const isPSU =
        stock.industry.includes('PSU') ||
        stock.industry.includes('Public') ||
        stock.summary.includes('public') ||
        stock.summary.includes('Government') ||
        ['HAL.NS', 'BEL.NS', 'RVNL.NS', 'IRFC.NS', 'IRCTC.NS', 'MAZDOCK.NS', 'COCHINSHIP.NS', 'BDL.NS', 'BHEL.NS', 'SBIN.NS', 'NTPC.NS', 'COALINDIA.NS', 'ONGC.NS', 'IOC.NS', 'GAIL.NS', 'SAIL.NS', 'NMDC.NS'].includes(stock.symbol);
      const isDefense = stock.sector === 'Industrials & Defense' || stock.industry.includes('Defense');
      if (!isPSU && !isDefense) return false;
    }
    if (selectedTheme === 'GREEN_ENERGY') {
      const isGreen =
        ['SUZLON.NS', 'IREDA.NS', 'TATAPOWER.NS', 'ADANIGREEN.NS', 'NHPC.NS', 'SJVN.NS', 'EXIDEIND.NS'].includes(stock.symbol) ||
        stock.industry.includes('Renewable') ||
        stock.industry.includes('Wind') ||
        stock.industry.includes('Solar') ||
        stock.industry.includes('EV');
      if (!isGreen) return false;
    }

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

    // Text filter (supports clean symbol, name, summary, and alias keywords)
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase().trim();
      const matchSym = stock.symbol.toLowerCase().includes(q);
      const matchClean = stock.cleanSymbol.toLowerCase().includes(q);
      const matchName = stock.name.toLowerCase().includes(q);
      const matchSummary = stock.summary?.toLowerCase().includes(q);
      const matchAlias = stock.aliases?.some((a) => a.toLowerCase().includes(q));
      return matchSym || matchClean || matchName || matchSummary || matchAlias;
    }

    return true;
  });

  const visibleStocks = filteredStocks.slice(0, displayCount);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Global Universe Search */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 shadow-inner">
          <Search className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Stock Research Hub</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Search over 2,000+ Indian equities on NSE & BSE. Access valuation multiples, TradingView charts, balance sheet audits, and AI evidence breakdowns.
        </p>

        <div className="pt-2">
          <StockSearchBar autoFocus placeholder="Type company name or ticker (e.g. TCS, RELIANCE, ZOMATO, RVNL)..." />
        </div>
      </div>

      {/* Interactive Curated Screener */}
      <div className="space-y-5">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>NSE & BSE Curated Universe</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Filter by market index themes, sectors, or exchanges to inspect balance sheet durability.
            </p>
          </div>

          {/* In-catalog Quick Filter Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => {
                setFilterQuery(e.target.value);
                setDisplayCount(24);
              }}
              placeholder="Filter below (e.g. Zomato, Tata)..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800/60 pb-3">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Theme:
          </span>
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedTheme(theme.id);
                setDisplayCount(24);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedTheme === theme.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Sector Tabs & Exchange Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Sector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
              <Layers className="w-3.5 h-3.5" /> Sector:
            </span>
            {SECTORS.map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setSelectedSector(sec);
                  setDisplayCount(24);
                }}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSector === sec
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Exchange Switcher */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Exchange:
            </span>
            <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800 text-xs">
              {(['ALL', 'NSE', 'BSE'] as const).map((ex) => (
                <button
                  key={ex}
                  onClick={() => {
                    setSelectedExchange(ex);
                    setDisplayCount(24);
                  }}
                  className={`px-2.5 py-0.5 rounded-md font-medium font-mono text-[11px] transition-all ${
                    selectedExchange === ex
                      ? 'bg-slate-800 text-emerald-400 shadow-sm font-bold'
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
        <div className="text-xs text-slate-500 font-mono flex items-center justify-between">
          <span>
            Showing {visibleStocks.length} of {filteredStocks.length} equities ({INDIAN_STOCKS.length} total cataloged)
          </span>
          {visibleStocks.length < filteredStocks.length && (
            <span className="text-slate-400">
              Page 1 of {Math.ceil(filteredStocks.length / 24)}
            </span>
          )}
        </div>

        {/* Stocks Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibleStocks.map((stock) => (
            <Link
              key={stock.symbol}
              href={`/stocks/${encodeURIComponent(stock.symbol)}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-900 shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {stock.cleanSymbol}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {stock.category && (
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        {stock.category}
                      </span>
                    )}
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

        {/* Pagination / Load More Controls */}
        {visibleStocks.length < filteredStocks.length && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 24)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 text-emerald-400" />
              Load Next 24 Equities ({filteredStocks.length - visibleStocks.length} remaining)
            </button>
            <button
              onClick={() => setDisplayCount(filteredStocks.length)}
              className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all cursor-pointer"
            >
              Show All ({filteredStocks.length})
            </button>
          </div>
        )}

        {filteredStocks.length === 0 && (
          <div className="p-10 rounded-2xl border border-dashed border-slate-800 text-center space-y-3">
            <p className="text-sm font-medium text-slate-300">No stocks match your filter criteria.</p>
            <p className="text-xs text-slate-500">
              Try searching by ticker, or open any NSE/BSE stock using the search bar above.
            </p>
            <button
              onClick={() => {
                setSelectedSector('ALL');
                setSelectedTheme('ALL');
                setSelectedExchange('ALL');
                setFilterQuery('');
                setDisplayCount(24);
              }}
              className="px-4 py-1.5 text-xs rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
