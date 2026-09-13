'use client';

import React, { useState } from 'react';
import { AIThesisAnalysis } from '@/types';
import {
  Sparkles,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';

interface AIThesisAnalyzerProps {
  symbol: string;
  companyName: string;
}

export default function AIThesisAnalyzer({ symbol, companyName }: AIThesisAnalyzerProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIThesisAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState(true);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
      });

      if (!res.ok) {
        throw new Error(`Analysis engine returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        throw new Error('Analysis response was empty');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to analyze stock thesis');
    } finally {
      setLoading(false);
    }
  };

  const copyThesisText = () => {
    if (!analysis) return;
    const text = `StockMentor AI Thesis Evidence: ${analysis.companyName} (${analysis.symbol})
--------------------------------------------------
Valuation Assessment: ${analysis.valuationAssessment.toUpperCase()}
Evidence: ${analysis.valuationEvidence}

Solvency Profile: ${analysis.solvencyStatus.toUpperCase()}
Evidence: ${analysis.solvencyEvidence}

Self-Guided Investor Questions:
${analysis.thesisQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Key Sector Risks:
${analysis.keyRisks.map((r) => `• ${r}`).join('\n')}

Disclaimer: ${analysis.disclaimer}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getValuationBadge = (assessment: AIThesisAnalysis['valuationAssessment']) => {
    switch (assessment) {
      case 'growth_premium':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Growth Premium Valuation
          </span>
        );
      case 'undervalued':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Potential Margin of Safety Discount
          </span>
        );
      case 'speculative':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Elevated Speculative Multiple
          </span>
        );
      case 'fair':
      default:
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Historical Fair Range
          </span>
        );
    }
  };

  const getSolvencyBadge = (status: AIThesisAnalysis['solvencyStatus']) => {
    switch (status) {
      case 'conservative':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Conservative / Robust Liquidity
          </span>
        );
      case 'capital_heavy':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Capital Intensive
          </span>
        );
      case 'moderate':
      default:
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Moderate Leverage Structure
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                StockMentor AI Evidence Engine
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                Objective Research
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated financial statement reasoning for {companyName}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        {!analysis && (
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Evaluating Fundamentals...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Evidence</span>
              </>
            )}
          </button>
        )}

        {analysis && (
          <div className="flex items-center gap-2">
            <button
              onClick={copyThesisText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              title="Copy analysis to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Thesis</span>
                </>
              )}
            </button>
            <button
              onClick={runAnalysis}
              disabled={loading}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
              title="Refresh Analysis"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Pre-analysis Teaser */}
      {!analysis && !loading && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">1. Valuation Multiple Context</span>
            <p className="leading-relaxed text-[11px]">
              Benchmarks P/E and P/B multiples against median Indian sector ranges to quantify valuation stretch.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">2. Solvency & Debt Health</span>
            <p className="leading-relaxed text-[11px]">
              Analyzes capital expenditure demands, interest coverage, and balance sheet durability.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">3. Self-Guided Thesis Checklist</span>
            <p className="leading-relaxed text-[11px]">
              Generates 4 sector-specific probing questions to validate your independent thesis before allocating capital.
            </p>
          </div>
        </div>
      )}

      {/* Analysis Results View */}
      {analysis && expanded && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          {/* Top Section: Valuation & Solvency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Valuation Card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Valuation Posture
                </span>
                {getValuationBadge(analysis.valuationAssessment)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {analysis.valuationEvidence}
              </p>
            </div>

            {/* Solvency Card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Balance Sheet Profile
                </span>
                {getSolvencyBadge(analysis.solvencyStatus)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {analysis.solvencyEvidence}
              </p>
            </div>
          </div>

          {/* Self-Guided Thesis Questions Checklist */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Investor Self-Reflection Checklist
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {Object.values(checkedQuestions).filter(Boolean).length} /{' '}
                {analysis.thesisQuestions.length} answered
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Answer these questions before formulating your investment allocation:
            </p>

            <div className="space-y-2 pt-1">
              {analysis.thesisQuestions.map((question, idx) => {
                const isChecked = !!checkedQuestions[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleQuestion(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded border text-[10px] shrink-0 font-mono ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                          : 'border-slate-700 bg-slate-950 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className="leading-relaxed">{question}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sector & Macro Risks */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Key Sector Risk Factors to Track</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              {analysis.keyRisks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5">•</span>
                  <span className="leading-relaxed">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Actions: Log to Portfolio Thesis + Disclaimer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-[11px] leading-relaxed">
                Objective financial synthesis &bull; Strictly 0 buy/sell recommendations
              </span>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Log this stock into your Portfolio Thesis Tracker &rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
