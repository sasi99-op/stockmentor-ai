'use client';

import React from 'react';
import { X, Printer, ShieldCheck, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AIThesisAnalysis } from '@/types';

interface ThesisExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AIThesisAnalysis;
}

export default function ThesisExportModal({
  isOpen,
  onClose,
  analysis,
}: ThesisExportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl my-8 overflow-hidden print:m-0 print:p-0 print:border-none print:shadow-none print:w-full print:max-w-none print:bg-white print:text-black">
        {/* Screen-only Action Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white">
              Printable Investment Thesis Dossier
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 space-y-6 bg-slate-900 text-slate-200 print:bg-white print:text-black print:p-6">
          {/* Header Banner */}
          <div className="border-b border-slate-700 pb-5 space-y-1 print:border-gray-300">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 print:text-emerald-700">
                StockMentor AI &bull; Independent Thesis Dossier
              </span>
              <span className="text-xs text-slate-400 font-mono print:text-gray-500">
                Date: {currentDate}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white print:text-black tracking-tight">
              {analysis.companyName}
            </h1>
            <p className="text-xs font-mono text-emerald-400 print:text-emerald-800">
              Ticker Symbol: {analysis.symbol}
            </p>
          </div>

          {/* Business Overview */}
          <div className="space-y-1.5">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 print:text-gray-600">
              Company Overview
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
              {analysis.businessSummary}
            </p>
          </div>

          {/* Valuation & Balance Sheet Stance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Valuation Assessment */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 print:border-gray-300 print:bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 print:text-gray-600">
                  Valuation Posture
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase print:text-emerald-800 print:border-emerald-300">
                  {analysis.valuationAssessment.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                {analysis.valuationEvidence}
              </p>
            </div>

            {/* Solvency Assessment */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 print:border-gray-300 print:bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 print:text-gray-600">
                  Solvency Profile
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase print:text-blue-800 print:border-blue-300">
                  {analysis.solvencyStatus.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                {analysis.solvencyEvidence}
              </p>
            </div>
          </div>

          {/* Self-Guided Thesis Questions */}
          <div className="space-y-2.5 p-4 rounded-xl border border-slate-800 bg-slate-950/40 print:border-gray-300 print:bg-gray-50">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Self-Guided Investor Due Diligence Checklist</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 print:text-gray-800 pt-1">
              {analysis.thesisQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 print:text-emerald-800 font-bold">
                    [{idx + 1}]
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Sector Risks */}
          <div className="space-y-2 p-4 rounded-xl border border-slate-800 bg-slate-950/40 print:border-gray-300 print:bg-gray-50">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 print:text-amber-800 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Key Sector Risk Factors</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400 print:text-gray-700 pt-1">
              {analysis.keyRisks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>&bull;</span>
                  <span className="leading-relaxed">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Non-Advisory Legal Footnote */}
          <div className="border-t border-slate-800 pt-4 text-[10px] text-slate-500 print:text-gray-500 space-y-1 leading-relaxed print:border-gray-300">
            <div className="flex items-center gap-1.5 font-semibold text-slate-400 print:text-gray-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>SEBI Non-Advisory Regulatory Disclosure</span>
            </div>
            <p>
              This document is produced algorithmically by StockMentor AI strictly for personal educational and
              analytical research. StockMentor AI is not registered as an Investment Adviser or Research Analyst with
              the Securities and Exchange Board of India (SEBI). This report does NOT contain buy, sell, or hold
              recommendations, price targets, or expected returns. Retail investors must verify facts directly with
              audited statutory filings on NSE/BSE and consult a certified financial advisor prior to allocating capital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
