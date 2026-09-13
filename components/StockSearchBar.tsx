'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, TrendingUp, X } from 'lucide-react';
import { MarketSearchItem } from '@/types';

interface StockSearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function StockSearchBar({
  placeholder = 'Search Indian stocks (e.g. RELIANCE, TCS, INFY, TATAMOTORS)...',
  autoFocus = false,
  className = '',
}: StockSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MarketSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Search request failed:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/stocks/${encodeURIComponent(symbol)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelect(results[selectedIndex].symbol);
      } else if (results.length > 0) {
        handleSelect(results[0].symbol);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input Field */}
      <div className="relative flex items-center rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-md focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
        <div className="pl-4 pr-2 text-slate-400">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
          ) : (
            <Search className="h-5 w-5 text-slate-400" />
          )}
        </div>

        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="pr-3 pl-1">
          <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
            NSE / BSE
          </span>
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-800/80 flex items-center justify-between">
            <span>Matches ({results.length})</span>
            <span>Use ↑ ↓ to navigate</span>
          </div>

          <div className="space-y-0.5 pt-1">
            {results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.symbol}
                  onClick={() => handleSelect(item.symbol)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-emerald-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white tracking-wide">
                        {item.symbol.replace('.NS', '').replace('.BO', '')}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-[280px] sm:max-w-sm">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold font-mono ${
                        item.exchange === 'NSE'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {item.exchange}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No results notice */}
      {isOpen && query.trim().length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-slate-800 bg-slate-950 p-4 text-center text-xs text-slate-400 shadow-2xl">
          No Indian listed equities found matching &quot;{query}&quot;. Try searching by ticker like{' '}
          <button
            type="button"
            onClick={() => handleSelect('TCS.NS')}
            className="text-emerald-400 hover:underline"
          >
            TCS
          </button>{' '}
          or{' '}
          <button
            type="button"
            onClick={() => handleSelect('RELIANCE.NS')}
            className="text-emerald-400 hover:underline"
          >
            RELIANCE
          </button>
          .
        </div>
      )}
    </div>
  );
}
