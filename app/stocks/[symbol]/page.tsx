import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marketDataService } from '@/services/marketData/MarketDataService';
import WatchlistButton from '@/components/WatchlistButton';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ShieldAlert,
  ArrowLeft,
  Building2,
  PieChart,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface StockDetailPageProps {
  params: {
    symbol: string;
  };
}

export default async function StockDetailPage({ params }: StockDetailPageProps) {
  const rawSymbol = decodeURIComponent(params.symbol);
  const quote = await marketDataService.getQuote(rawSymbol);

  if (!quote) {
    notFound();
  }

  const isPositive = (quote.change || 0) >= 0;

  // Format Indian Market Cap (Lakh Crores or Crores)
  const formatIndianCurrency = (num?: number) => {
    if (!num) return 'Not Disclosed';
    const cr = num / 10000000;
    if (cr >= 100000) {
      return `₹ ${(cr / 100000).toFixed(2)} Lakh Cr`;
    }
    return `₹ ${cr.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr`;
  };

  // Calculate 52-week price position percentage for visual slider
  const range52Position =
    quote.week52High && quote.week52Low && quote.price && quote.week52High > quote.week52Low
      ? Math.min(
          100,
          Math.max(
            0,
            ((quote.price - quote.week52Low) / (quote.week52High - quote.week52Low)) * 100
          )
        )
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <Link
          href="/stocks"
          className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Stocks
        </Link>
        <div className="flex items-center gap-1.5 text-slate-500 font-mono">
          <span>{quote.exchange}</span>
          <span>•</span>
          <span className="text-slate-300">{quote.symbol}</span>
        </div>
      </div>

      {/* Main Stock Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Company Title & Sector */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400">
                {quote.symbol.replace('.NS', '').replace('.BO', '')}
              </span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold font-mono ${
                  quote.exchange === 'NSE'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {quote.exchange}
              </span>
              {quote.sector && (
                <span className="rounded bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300">
                  {quote.sector}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {quote.name}
            </h1>

            {quote.industry && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                <span>{quote.industry}</span>
              </p>
            )}
          </div>

          {/* Pricing & Watchlist CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
            <div className="text-left lg:text-right">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                ₹ {quote.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div
                className={`flex items-center lg:justify-end gap-1.5 text-sm font-semibold mt-1 font-mono ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {quote.change?.toFixed(2)} ({isPositive ? '+' : ''}
                  {quote.changePercent?.toFixed(2)}%)
                </span>
                <span className="text-xs font-normal text-slate-400">Today</span>
              </div>
            </div>

            <WatchlistButton
              symbol={quote.symbol}
              companyName={quote.name}
              exchange={quote.exchange}
            />
          </div>
        </div>

        {/* Mandatory Data Disclaimer Notice */}
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span className="leading-relaxed">{quote.dataSourceNotice}</span>
          {quote.lastUpdated && (
            <span className="ml-auto font-mono text-[11px] text-slate-500 shrink-0">
              Updated: {quote.lastUpdated}
            </span>
          )}
        </div>
      </div>

      {/* Fundamental Metrics Grid */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
          <PieChart className="h-4 w-4 text-emerald-400" />
          <span>Core Valuation & Operating Metrics</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              Market Capitalization
            </span>
            <p className="mt-2 text-lg font-bold text-white font-mono">
              {formatIndianCurrency(quote.marketCap)}
            </p>
            <span className="text-[10px] text-slate-500">Total company equity value</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              P/E Ratio (TTM)
            </span>
            <p className="mt-2 text-lg font-bold text-white font-mono">
              {quote.peRatio ? quote.peRatio.toFixed(2) : 'Not Disclosed'}
            </p>
            <span className="text-[10px] text-slate-500">Price relative to trailing earnings</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              P/B Ratio
            </span>
            <p className="mt-2 text-lg font-bold text-white font-mono">
              {quote.pbRatio ? quote.pbRatio.toFixed(2) : 'Not Disclosed'}
            </p>
            <span className="text-[10px] text-slate-500">Price relative to book net worth</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              Dividend Yield
            </span>
            <p className="mt-2 text-lg font-bold text-white font-mono">
              {quote.dividendYield !== undefined
                ? `${quote.dividendYield.toFixed(2)}%`
                : '0.00%'}
            </p>
            <span className="text-[10px] text-slate-500">Annual dividend payout ratio</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <span className="text-xs text-slate-400">Day High</span>
            <p className="mt-2 text-lg font-bold text-white font-mono">
              ₹ {quote.dayHigh ? quote.dayHigh.toLocaleString('en-IN') : '—'}
            </p>
            <span className="text-[10px] text-slate-500">Intraday peak trade</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <span className="text-xs text-slate-400">Day Low</span>
            <p className="mt-2 text-lg font-bold text-white font-mono">
              ₹ {quote.dayLow ? quote.dayLow.toLocaleString('en-IN') : '—'}
            </p>
            <span className="text-[10px] text-slate-500">Intraday lowest trade</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:col-span-2">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>52-Week Range</span>
              <span className="font-mono text-slate-300">
                ₹ {quote.week52Low?.toLocaleString('en-IN')} — ₹{' '}
                {quote.week52High?.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Visual 52-Week Slider */}
            {range52Position !== null ? (
              <div className="space-y-1.5 pt-1">
                <div className="relative h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-full"
                    style={{ width: `${range52Position}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>52W Low</span>
                  <span className="text-emerald-400">{range52Position.toFixed(0)}% of 52W span</span>
                  <span>52W High</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Data unavailable</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Overview & Description */}
      {quote.summary && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-white">Business Summary</h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
            {quote.summary}
          </p>
        </div>
      )}

      {/* Educational Evidence Module (Non-Advisory) */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Lightbulb className="h-4 w-4 text-emerald-400" />
          <span>StockMentor Educational Evidence Guide</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <HelpCircle className="h-4 w-4 shrink-0" />
              <span>How to Interpret P/E</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A P/E of {quote.peRatio ? quote.peRatio.toFixed(1) : 'this stock'} indicates what investors
              pay for every ₹1 of profit. High P/E requires verifying whether past revenue growth justifies the multiple.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <HelpCircle className="h-4 w-4 shrink-0" />
              <span>Balance Sheet Durability</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              For manufacturing & capital-heavy businesses, monitor Debt-to-Equity and Interest Coverage.
              High debt during rising interest rates compresses equity margins.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <HelpCircle className="h-4 w-4 shrink-0" />
              <span>Margin of Safety Principle</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Avoid buying companies priced for perfection. A reasonable valuation acts as a cushion against
              unexpected operational or regulatory setbacks.
            </p>
          </div>
        </div>
      </div>

      {/* Formulate Your Thesis Sandbox */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-slate-300">
            <h3 className="text-sm font-bold text-white">
              Formulate Your Investment Thesis for {quote.name}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              StockMentor AI never provides buy/sell recommendations or targets. Use this evidence checklist
              to evaluate your own independent investment rationale:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pt-1">
              <li>Is the company generating consistent positive Free Cash Flow (FCF)?</li>
              <li>Does the company possess durable competitive pricing power in its industry?</li>
              <li>How does current valuation compare to its 5-year historical median?</li>
              <li>Are there any auditor qualifications or pledging of promoter shares?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal & SEBI Disclaimer */}
      <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-500">
        <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Disclaimer: All data shown for {quote.name} ({quote.symbol}) is sourced from delayed public feeds and
          is presented strictly for educational and self-directed analytical research. StockMentor AI is an
          educational technology tool and does not provide SEBI-registered financial advisory services.
        </p>
      </div>
    </div>
  );
}
