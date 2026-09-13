'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface IndexItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function IndexTicker() {
  const [indices, setIndices] = useState<IndexItem[]>([]);

  useEffect(() => {
    fetch('/api/markets')
      .then((res) => res.json())
      .then((data) => {
        if (data.indices) {
          setIndices(data.indices);
        }
      })
      .catch(() => {
        // Silently fail if offline
      });
  }, []);

  if (indices.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 overflow-x-auto pb-1">
      <div className="flex items-center justify-center gap-3 min-w-max">
        {indices.map((idx) => {
          const isPos = idx.change >= 0;
          return (
            <Link
              key={idx.symbol}
              href="/markets"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors text-xs"
            >
              <span className="font-semibold text-slate-300">{idx.name}</span>
              <span className="font-mono text-white">
                {idx.price.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
              </span>
              <span
                className={`font-mono text-[11px] font-semibold flex items-center gap-0.5 ${
                  isPos ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPos ? '+' : ''}
                {idx.changePercent.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
