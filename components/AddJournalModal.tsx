'use client';

import React, { useState } from 'react';
import { X, Plus, Loader2, Star, BrainCircuit } from 'lucide-react';
import { JournalAction, EmotionalState } from '@/types';

interface AddJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EMOTIONS: { value: EmotionalState; label: string; icon: string; desc: string }[] = [
  { value: 'disciplined', label: 'Disciplined', icon: '🎯', desc: 'Strictly followed checklist & valuation' },
  { value: 'neutral', label: 'Neutral', icon: '⚖️', desc: 'Calm, methodical balance sheet allocation' },
  { value: 'excited', label: 'Excited', icon: '🚀', desc: 'High conviction or market euphoria' },
  { value: 'fomo', label: 'FOMO Alert', icon: '⚠️', desc: 'Felt urge because price was surging' },
  { value: 'anxious', label: 'Anxious', icon: '😰', desc: 'Second-guessing allocation sizing' },
];

export default function AddJournalModal({ isOpen, onClose, onSuccess }: AddJournalModalProps) {
  const [symbol, setSymbol] = useState('');
  const [action, setAction] = useState<JournalAction>('BUY');
  const [price, setPrice] = useState('');
  const [conviction, setConviction] = useState(4);
  const [emotion, setEmotion] = useState<EmotionalState>('disciplined');
  const [thesis, setThesis] = useState('');
  const [lessons, setLessons] = useState('');
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
      cleanSym = `${cleanSym}.NS`;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setError('Please provide a valid trade price');
      return;
    }

    if (!thesis.trim()) {
      setError('Thesis rationale is required to combat hindsight bias');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: cleanSym,
          action,
          price: numPrice,
          conviction_level: conviction,
          emotional_state: emotion,
          thesis_rationale: thesis.trim(),
          lessons_learned: lessons.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save entry');
      }

      onSuccess();
      onClose();
      // Reset
      setSymbol('');
      setPrice('');
      setThesis('');
      setLessons('');
      setConviction(4);
      setEmotion('disciplined');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error creating entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Log Decision Journal</h2>
              <p className="text-xs text-slate-400">Capture your mindset and thesis in the moment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Symbol, Action & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Symbol *</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. TCS, RELIANCE"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Action *</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value as JournalAction)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
                <option value="HOLD">HOLD</option>
                <option value="WATCH">WATCH</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Price (₹) *</label>
              <input
                type="number"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ Execution price"
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Conviction Level (Stars) */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium">Conviction Level</label>
              <span className="text-emerald-400 font-semibold">{conviction} / 5</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setConviction(lvl)}
                  className="p-1 rounded text-slate-500 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-5 h-5 ${
                      lvl <= conviction ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Emotional State Picker */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Emotional Mindset (Be Honest)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EMOTIONS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setEmotion(item.value)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    emotion === item.value
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Thesis Rationale */}
          <div className="space-y-1">
            <label className="text-slate-300 font-medium">
              Why are you making this decision? (Your Thesis) *
            </label>
            <textarea
              rows={3}
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              placeholder="e.g. Valuation multiple is in bottom quartile of historical range; Debt/Equity is 0.15; order book grew 18% YoY. Willing to hold for 3-5 years..."
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Lessons / Post-Mortem Notes */}
          <div className="space-y-1">
            <label className="text-slate-300 font-medium">
              Post-Mortem / Key Lessons (Optional)
            </label>
            <textarea
              rows={2}
              value={lessons}
              onChange={(e) => setLessons(e.target.value)}
              placeholder="What would make you exit? What did you learn if closing a position?"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
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
              <span>Save Journal Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
