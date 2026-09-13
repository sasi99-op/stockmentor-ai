'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  AreaSeries,
  HistogramSeries,
  IChartApi,
  ISeriesApi,
  Time,
} from 'lightweight-charts';
import { HistoricalDataPoint } from '@/types';
import { BarChart3, LineChart, Loader2, AlertCircle, TrendingUp, Info } from 'lucide-react';

interface StockChartProps {
  symbol: string;
  companyName?: string;
}

type Timeframe = '1d' | '5d' | '1mo' | '6mo' | '1y' | '5y';
type ChartStyle = 'candle' | 'line';

interface HoveredPoint {
  timeStr: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

const TIMEFRAMES: { label: string; value: Timeframe }[] = [
  { label: '1D', value: '1d' },
  { label: '5D', value: '5d' },
  { label: '1M', value: '1mo' },
  { label: '6M', value: '6mo' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
];

export default function StockChart({ symbol, companyName }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mainSeriesRef = useRef<ISeriesApi<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const volumeSeriesRef = useRef<ISeriesApi<any> | null>(null);

  const [timeframe, setTimeframe] = useState<Timeframe>('1mo');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('candle');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<HistoricalDataPoint[]>([]);
  const [hovered, setHovered] = useState<HoveredPoint | null>(null);
  const [showEduGuide, setShowEduGuide] = useState<boolean>(false);

  // Fetch chart data when symbol or timeframe changes
  const fetchChartData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stocks/${encodeURIComponent(symbol)}/chart?range=${timeframe}`);
      if (!res.ok) {
        throw new Error(`Failed to load chart data (${res.status})`);
      }
      const json = await res.json();
      const rawData: HistoricalDataPoint[] = json.data || [];

      if (rawData.length === 0) {
        setError('No historical trading bars available for this timeframe.');
        setPoints([]);
      } else {
        // Deduplicate & sort
        const seen = new Set<string | number>();
        const clean: HistoricalDataPoint[] = [];
        for (const p of rawData) {
          if (!seen.has(p.time)) {
            seen.add(p.time);
            clean.push(p);
          }
        }
        setPoints(clean);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching chart');
      setPoints([]);
    } finally {
      setLoading(false);
    }
  }, [symbol, timeframe]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  // Initialize and update Lightweight Charts canvas
  useEffect(() => {
    if (!containerRef.current || points.length === 0) return;

    // Clear any previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
      mainSeriesRef.current = null;
      volumeSeriesRef.current = null;
    }

    const container = containerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 420,
      layout: {
        background: { type: ColorType.Solid, color: '#090d16' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(30, 41, 59, 0.45)' },
        horzLines: { color: 'rgba(30, 41, 59, 0.45)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: 'rgba(148, 163, 184, 0.4)',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: 'rgba(148, 163, 184, 0.4)',
          width: 1,
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: '#1e293b',
        scaleMargins: {
          top: 0.1,
          bottom: 0.22, // Space for volume at bottom
        },
      },
      timeScale: {
        borderColor: '#1e293b',
        timeVisible: timeframe === '1d' || timeframe === '5d',
        secondsVisible: false,
      },
    });

    chartInstanceRef.current = chart;

    // Add Main Series (Candlestick or Area)
    if (chartStyle === 'candle') {
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });

      candleSeries.setData(
        points.map((p) => ({
          time: p.time as Time,
          open: p.open,
          high: p.high,
          low: p.low,
          close: p.close,
        }))
      );
      mainSeriesRef.current = candleSeries;
    } else {
      const areaSeries = chart.addSeries(AreaSeries, {
        topColor: 'rgba(59, 130, 246, 0.35)',
        bottomColor: 'rgba(59, 130, 246, 0.00)',
        lineColor: '#3b82f6',
        lineWidth: 2,
      });

      areaSeries.setData(
        points.map((p) => ({
          time: p.time as Time,
          value: p.close,
        }))
      );
      mainSeriesRef.current = areaSeries;
    }

    // Add Volume Histogram Series
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // Overlay over same canvas with custom margins
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // volume takes bottom 20%
        bottom: 0,
      },
    });

    volumeSeries.setData(
      points.map((p) => ({
        time: p.time as Time,
        value: p.volume || 0,
        color: p.close >= p.open ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
      }))
    );
    volumeSeriesRef.current = volumeSeries;

    // Crosshair listener for legend update
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time || !param.seriesData) {
        setHovered(null);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mainData = param.seriesData.get(mainSeriesRef.current!) as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const volData = param.seriesData.get(volumeSeriesRef.current!) as any;

      let timeLabel = '';
      if (typeof param.time === 'number') {
        const d = new Date(param.time * 1000);
        timeLabel = d.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
      } else if (typeof param.time === 'string') {
        timeLabel = param.time;
      } else if (typeof param.time === 'object' && 'year' in param.time) {
        timeLabel = `${param.time.year}-${String(param.time.month).padStart(2, '0')}-${String(
          param.time.day
        ).padStart(2, '0')}`;
      }

      if (mainData) {
        setHovered({
          timeStr: timeLabel,
          open: mainData.open,
          high: mainData.high,
          low: mainData.low,
          close: mainData.close ?? mainData.value,
          volume: volData?.value,
        });
      }
    });

    chart.timeScale().fitContent();

    // Responsive auto-resize observer
    const handleResize = () => {
      if (containerRef.current && chartInstanceRef.current) {
        chartInstanceRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [points, chartStyle, timeframe]);

  // Summary stats for currently selected timeframe
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const periodChange = firstPoint && lastPoint ? lastPoint.close - firstPoint.open : 0;
  const periodPercent =
    firstPoint && lastPoint && firstPoint.open ? (periodChange / firstPoint.open) * 100 : 0;
  const isPeriodPositive = periodChange >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative">
      {/* Header bar: Symbol, Performance & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
              TradingView Canvas
            </span>
            {companyName && (
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {companyName}
              </span>
            )}
            <button
              onClick={() => setShowEduGuide(!showEduGuide)}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              title="How to read candlesticks"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Chart Guide</span>
            </button>
          </div>

          <div className="flex items-baseline gap-3 mt-1.5">
            {lastPoint ? (
              <>
                <span className="text-2xl font-bold text-slate-100 tracking-tight">
                  ₹{lastPoint.close.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`inline-flex items-center text-xs font-semibold ${
                    isPeriodPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPeriodPositive ? '+' : ''}₹
                  {periodChange.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  ({isPeriodPositive ? '+' : ''}
                  {periodPercent.toFixed(2)}%)
                  <span className="text-slate-500 text-[11px] font-normal ml-1">
                    over {timeframe.toUpperCase()}
                  </span>
                </span>
              </>
            ) : (
              <span className="text-slate-400 text-sm">Loading market price...</span>
            )}
          </div>
        </div>

        {/* Toolbar: Style switch + Timeframe selector */}
        <div className="flex items-center gap-2">
          {/* Chart Style Toggle */}
          <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setChartStyle('candle')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
                chartStyle === 'candle'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Candlestick Chart"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Candles</span>
            </button>
            <button
              onClick={() => setChartStyle('line')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
                chartStyle === 'line'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Area Line Chart"
            >
              <LineChart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Line</span>
            </button>
          </div>

          {/* Timeframe Buttons */}
          <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                disabled={loading && timeframe !== tf.value}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  timeframe === tf.value
                    ? 'bg-slate-800 text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 disabled:opacity-50'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Crosshair Stats Ribbon */}
      <div className="h-7 mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
        {hovered ? (
          <>
            <span className="text-slate-300 font-sans font-medium">{hovered.timeStr}</span>
            {hovered.open !== undefined && (
              <span>
                O: <span className="text-slate-200">₹{hovered.open.toFixed(2)}</span>
              </span>
            )}
            {hovered.high !== undefined && (
              <span>
                H: <span className="text-emerald-400">₹{hovered.high.toFixed(2)}</span>
              </span>
            )}
            {hovered.low !== undefined && (
              <span>
                L: <span className="text-rose-400">₹{hovered.low.toFixed(2)}</span>
              </span>
            )}
            {hovered.close !== undefined && (
              <span>
                C: <span className="text-slate-200">₹{hovered.close.toFixed(2)}</span>
              </span>
            )}
            {hovered.volume !== undefined && (
              <span className="hidden md:inline text-slate-500">
                Vol: {hovered.volume.toLocaleString('en-IN')}
              </span>
            )}
          </>
        ) : (
          <span className="text-slate-500 text-xs italic font-sans flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Hover over chart candles for precise Open, High, Low, Close & Volume
          </span>
        )}
      </div>

      {/* Educational Guide Drawer */}
      {showEduGuide && (
        <div className="my-3 p-4 bg-slate-950/80 border border-blue-500/20 rounded-xl text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-blue-400 flex items-center justify-between">
            <span>How to Read This Chart — Self-Guided Investor Rule</span>
            <button
              onClick={() => setShowEduGuide(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-slate-400">
            <div>
              <p className="font-medium text-slate-200">1. Candlestick Anatomy</p>
              <p className="mt-0.5 leading-relaxed">
                The thick body shows the open & close range. Green means buyers pushed close above open; red means sellers drove price lower. Wicks show extreme day highs & lows.
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-200">2. Bottom Volume Bars</p>
              <p className="mt-0.5 leading-relaxed">
                Bars at the bottom show trading volume. High volume candles indicate institutional conviction (mutual funds, FIIs); low volume rallies can signal weaker support.
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-200">3. Non-Advisory Principle</p>
              <p className="mt-0.5 leading-relaxed">
                Charts depict historical sentiment, not future performance. Always cross-verify price action against balance sheet solvency and cash flows before formulating a thesis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart Canvas Area */}
      <div className="relative mt-2 min-h-[420px] rounded-xl overflow-hidden bg-[#090d16]">
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#090d16]/70 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="text-xs text-slate-400 mt-2">Loading historical chart data...</span>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
            <p className="text-sm font-medium text-slate-300 mb-1">Chart Feed Notice</p>
            <p className="text-xs text-slate-500 max-w-sm mb-4">{error}</p>
            <button
              onClick={fetchChartData}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={containerRef} className="w-full h-[420px]" />
      </div>

      {/* Chart footer footnote */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          Powered by Lightweight Charts™ &bull; 15-min delayed feed for NSE/BSE &bull; Adjusted for corporate splits & dividends
        </span>
        <span className="hidden sm:inline">Volume bars at base</span>
      </div>
    </div>
  );
}
