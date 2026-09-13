'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Award,
  ChevronRight,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Module {
  id: string;
  title: string;
  badge: string;
  summary: string;
  readTime: string;
  sections: { title: string; content: string[] }[];
  quiz: QuizQuestion[];
}

const MODULES: Module[] = [
  {
    id: 'market-ecosystem',
    title: 'Indian Equity Ecosystem',
    badge: 'Foundation',
    readTime: '6 min read',
    summary:
      'Understanding how NSE, BSE, NSDL, CDSL, and SEBI interact to safeguard Indian retail capital under T+1 settlement.',
    sections: [
      {
        title: '1. NSE vs BSE and Exchanges',
        content: [
          'BSE (Bombay Stock Exchange) is Asia’s oldest exchange (established 1875) with over 5,000 listed companies.',
          'NSE (National Stock Exchange) accounts for >90% of equity cash and derivatives turnover in India.',
          'Under SEBI Interoperability, shares purchased on NSE can be sold on BSE and vice versa if listed on both.',
        ],
      },
      {
        title: '2. NSDL & CDSL Depositories',
        content: [
          'Your broker (Zerodha, Groww, AngelOne, ICICI Direct) does NOT hold your shares.',
          'Shares are held electronically in your name inside government-regulated depositories: NSDL (promoted by NSE/IDBI) or CDSL (promoted by BSE/BSE-listed).',
          'Even if your brokerage firm fails financially, your shares in your Demat account remain 100% secure.',
        ],
      },
      {
        title: '3. T+1 Rolling Settlement',
        content: [
          'India became the second major market globally to implement full T+1 settlement.',
          'Shares bought on Monday trade day settle into your Demat account on Tuesday evening.',
          'Dividends and corporate actions are disbursed directly to your primary bank account registered via RTGS/NEFT.',
        ],
      },
    ],
    quiz: [
      {
        question: 'Who holds legal custody of your purchased shares in India?',
        options: [
          'Your stock broker app',
          'NSDL or CDSL Depositories in your Demat account',
          'The Reserve Bank of India',
          'NSE Clearing Corporation',
        ],
        correctIndex: 1,
        explanation:
          'Brokers act only as trading members; legal custody of electronic shares sits safely in Demat accounts maintained by NSDL or CDSL.',
      },
      {
        question: 'What happens to your shares if your brokerage firm goes bankrupt?',
        options: [
          'You lose all your investments',
          'Your shares remain safe with the depository (NSDL/CDSL)',
          'You can only recover 50% of the value',
          'The shares are liquidated by the government',
        ],
        correctIndex: 1,
        explanation:
          'Because shares reside in your depository participant (Demat) account with your PAN, a broker bankruptcy does not endanger your assets.',
      },
    ],
  },
  {
    id: 'annual-report',
    title: 'Decoding the Annual Report',
    badge: 'Fundamental Analysis',
    readTime: '9 min read',
    summary:
      'How to dissect 100-page corporate filings: Balance Sheet solvency, Cash Flow vs Accounting Profit, and Notes to Accounts.',
    sections: [
      {
        title: '1. Profit & Loss: Revenue vs Operating EBITDA',
        content: [
          'Top-Line: Revenue from Operations reflects real sales after GST and excise deductions.',
          'Operating EBITDA: Earnings before Interest, Tax, Depreciation, and Amortization. This measures pure operational health.',
          'Watch out for "Other Income": companies sometimes mask falling core operations with one-time gains from real estate sales or treasury yields.',
        ],
      },
      {
        title: '2. Cash Flow from Operations (CFO) vs Net Profit',
        content: [
          'Rule #1 of Indian Value Investing: Accounting profit does NOT equal cash in the bank account.',
          'Under accrual accounting, a company can book revenue before collecting payments. If Cash Flow from Operations is consistently lower than Net Profit for 3 years, customers are not paying on time.',
          'Free Cash Flow (FCF) = Operating Cash Flow minus Capital Expenditure (CapEx). FCF is what funds dividends, buybacks, and debt reduction.',
        ],
      },
      {
        title: '3. Notes to Accounts: Where Truth Hides',
        content: [
          'Always inspect the Auditor’s Report for "Emphasis of Matter" or "Qualified Opinions".',
          'Check Contingent Liabilities: pending tax disputes, legal claims, or corporate guarantees that could wipe out future earnings if ruled against the company.',
          'Verify related-party transactions (loans or advances given to promoter-owned private entities).',
        ],
      },
    ],
    quiz: [
      {
        question: 'Why is Free Cash Flow (FCF) considered more reliable than Net Profit?',
        options: [
          'Net profit includes taxes, whereas FCF does not',
          'Accounting profit can be altered by accruals, whereas FCF reflects actual cash realized after CapEx',
          'FCF is guaranteed by SEBI',
          'Dividends are calculated strictly from revenue',
        ],
        correctIndex: 1,
        explanation:
          'Net profit can record sales where cash has not been collected (receivables). Free Cash Flow reflects real disposable liquidity.',
      },
    ],
  },
  {
    id: 'forensic-red-flags',
    title: 'Forensic Red Flags & Governance',
    badge: 'Capital Protection',
    readTime: '8 min read',
    summary:
      'Spotting accounting irregularities, promoter share pledging, and aggressive debt restructuring before losses occur.',
    sections: [
      {
        title: '1. Promoter Pledging Danger Zone',
        content: [
          'Promoters sometimes pledge their company shares with lenders or NBFCs to borrow cash for other personal or real estate ventures.',
          'Danger: If the stock price drops, lenders demand additional collateral margin. If the promoter cannot pay, lenders dump shares on the open market, causing catastrophic crashes.',
          'StockMentor Rule: Treat promoter pledging above 15% as a high-risk factor requiring extreme caution.',
        ],
      },
      {
        title: '2. Auditor Resignations & Qualifications',
        content: [
          'Statutory auditors have legal liability under Indian Companies Act 2013.',
          'If a reputed auditor suddenly resigns citing "preoccupation" right before quarterly financial results, treat it as a potential red flag.',
          'Read the "Auditor Qualification" section in annual reports for disclaimers regarding unverified inventories or doubtful debt.',
        ],
      },
      {
        title: '3. High Trade Receivables Days (DSO)',
        content: [
          'Days Sales Outstanding (DSO) measures how many days it takes for customers to settle bills.',
          'If revenue grew 20% but trade receivables surged 70%, the company may be "channel stuffing" (pushing excess products onto distributors without real end-consumer demand).',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the primary risk of high promoter share pledging?',
        options: [
          'The company cannot pay dividends',
          'A stock decline can trigger margin calls where lenders dump shares, collapsing the price',
          'The government cancels the company’s operating license',
          'The company must delist from NSE',
        ],
        correctIndex: 1,
        explanation:
          'Pledged shares act as collateral. If stock falls, lenders sell pledged shares in the open market, accelerating panic selling.',
      },
    ],
  },
  {
    id: 'valuation-moats',
    title: 'Valuation Multiples & Economic Moats',
    badge: 'Margin of Safety',
    readTime: '7 min read',
    summary:
      'Comparing P/E against sector cycles, calculating ROCE against borrowing costs, and identifying durable competitive advantages.',
    sections: [
      {
        title: '1. P/E Multiple: Trailing vs Sector Baseline',
        content: [
          'A P/E of 25x in an asset-light Indian IT company (e.g. TCS, Infosys) represents a normal valuation band.',
          'The same 25x P/E in a cyclical commodity steel firm might represent an extreme cyclical peak.',
          'Always benchmark multiples against the 5-year median of the specific sector, never across unrelated industries.',
        ],
      },
      {
        title: '2. ROCE (Return on Capital Employed)',
        content: [
          'ROCE = EBIT / (Total Assets - Current Liabilities).',
          'If a company borrows capital at 9% in India and generates 22% ROCE year after year, it is compounding economic wealth for equity holders.',
          'A sustained high ROCE (>18%) without taking on excessive debt is the clearest mathematical hallmark of an economic moat.',
        ],
      },
      {
        title: '3. Pricing Power Test',
        content: [
          'Warren Buffett: "The single most important decision in evaluating a business is pricing power."',
          'If raw material costs rise 10% and the company can raise retail prices without losing customer volume, it possesses pricing power (e.g. FMCG brands, leading paints, specialty retail).',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does an ROCE of 24% signify when bank borrowing rates are 9% in India?',
        options: [
          'The company is taking too much debt',
          'The company earns significantly more on deployed capital than its cost of borrowing, creating wealth',
          'The company must cut dividend payments',
          'The company will face SEBI scrutiny',
        ],
        correctIndex: 1,
        explanation:
          'When ROCE comfortably exceeds borrowing costs, reinvested earnings compound intrinsic shareholder value.',
      },
    ],
  },
];

export default function LearnPage() {
  const [activeModuleId, setActiveModuleId] = useState(MODULES[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedQuiz, setRevealedQuiz] = useState<Record<string, boolean>>({});

  const currentModule = MODULES.find((m) => m.id === activeModuleId) || MODULES[0];

  const handleSelectAnswer = (quizKey: string, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [quizKey]: optIdx }));
    setRevealedQuiz((prev) => ({ ...prev, [quizKey]: true }));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>StockMentor Self-Guided Curriculum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Indian Investor Academy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structured modules designed to build independent balance sheet competence for Indian retail investors
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
      </div>

      {/* Module Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MODULES.map((mod, idx) => {
          const isActive = mod.id === activeModuleId;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                isActive
                  ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-slate-500">
                  0{idx + 1}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {mod.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{mod.title}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {mod.summary}
              </p>
              <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <span>Explore Module</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Reading View */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-8 shadow-xl">
        {/* Module Header */}
        <div className="border-b border-slate-800/80 pb-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase">
              {currentModule.badge}
            </span>
            <span className="text-xs text-slate-500 font-mono">&bull;</span>
            <span className="text-xs text-slate-400 font-mono">{currentModule.readTime}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {currentModule.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {currentModule.summary}
          </p>
        </div>

        {/* Lesson Sections */}
        <div className="space-y-6">
          {currentModule.sections.map((sec, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
            >
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{sec.title}</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {sec.content.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Interactive Knowledge Check Quiz */}
        {currentModule.quiz.length > 0 && (
          <div className="pt-6 border-t border-slate-800/80 space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Knowledge Check: Test Your Comprehension
              </h3>
            </div>

            <div className="space-y-5">
              {currentModule.quiz.map((q, qIdx) => {
                const quizKey = `${currentModule.id}-q${qIdx}`;
                const userChoice = selectedAnswers[quizKey];
                const isRevealed = revealedQuiz[quizKey];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={qIdx}
                    className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 space-y-3"
                  >
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle =
                          'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700';

                        if (isRevealed) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300';
                          } else if (optIdx === userChoice) {
                            btnStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-300';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(quizKey, optIdx)}
                            disabled={isRevealed}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="font-mono font-bold text-slate-400 mt-0.5">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span className="leading-relaxed flex-1">{opt}</span>
                            {isRevealed && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isRevealed && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                          isCorrect
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                        }`}
                      >
                        <span className="font-bold block">
                          {isCorrect ? '✓ Correct Answer!' : 'Explanation:'}
                        </span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Real-world stock cross-link */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Apply these concepts to live Indian market leaders:</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/stocks/TCS.NS"
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
            >
              Analyze TCS &rarr;
            </Link>
            <Link
              href="/stocks/HDFCBANK.NS"
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
            >
              Analyze HDFC Bank &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
