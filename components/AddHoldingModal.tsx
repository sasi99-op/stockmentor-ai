'use client';

import React, { useState } from 'react';
import { X, Plus, Loader2, Sparkles } from 'lucide-react';

interface AddHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddHoldingModal({ isOpen, onClose, onSuccess }: AddHoldingModalProps) {
  const [symbol, setSymbol] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [exchange, setExchange] = useState<'NSE' | 'BSE'>('NSE');
  const [shares, setShares] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [buyDate, setBuyDate] = useState(new Date().toISOString().split('T')[0]);
  const [thesisNotes, setThesisNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let cleanSym = symbol.trim().toUpperCase();
    if (!cleanSym) {
      setError('Please provide a stock symbol');
      return;
    }
    if (!cleanSym.includes('.')) {
      cleanSym = exchange === 'BSE' ? `${cleanSym}.BO` : `${cleanSym}.NS`;
    }

    const numShares = parseFloat(shares);
    const numPrice = parseFloat(buyPrice);

    if (isNaN(numShares) || numShares <= 0) {
      setError('Shares must be greater than 0');
      return;
    }
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Buy price must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: cleanSym,
          company_name: companyName.trim() || cleanSym,
          exchange,
          shares: numShares,
          buy_price: numPrice,
          buy_date: buyDate,
          thesis_notes: thesisNotes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add holding');
      }

      onSuccess();
      onClose();
      // Reset form
      setSymbol('');
      setCompanyName('');
      setShares('');
      setBuyPrice('');
      setThesisNotes('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error adding holding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Portfolio Holding</h2>
              <p className="text-xs text-slate-400">Log entry price and initial investment thesis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Symbol & Exchange */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <label className="text-slate-300 font-medium">Stock Symbol *</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. TCS, RELIANCE, INFY"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Exchange</label>
              <select
                value={exchange}
                onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE')}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="NSE">NSE</option>
                <option value="BSE">BSE</option>
              </select>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Company Name (Optional)</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Tata Consultancy Services"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Shares & Buy Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Quantity / Shares *</label>
              <input
                type="number"
                step="any"
                min="0.01"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                placeholder="e.g. 25"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Average Buy Price (₹) *</label>
              <input
                type="number"
                step="any"
                min="0.01"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="e.g. 3450.00"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Buy Date */}
          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Purchase Date</label>
            <input
              type="date"
              value={buyDate}
              onChange={(e) => setBuyDate(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Thesis Notes */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Investment Thesis Notes</span>
              </label>
              <span className="text-[10px] text-slate-500">Key reasons for allocation</span>
            </div>
            <textarea
              rows={3}
              value={thesisNotes}
              onChange={(e) => setThesisNotes(e.target.value)}
              placeholder="Why are you buying? (e.g. Low debt, consistent >20% ROCE, strong order book, pricing power in domestic market)..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Save Holding</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
