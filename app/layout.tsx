import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'StockMentor AI | Self-Guided Indian Stock Market Education & Research',
  description:
    'AI-powered stock-market education and self-guided investing assistant for Indian retail investors (NSE/BSE). Evidence-based analysis with zero return predictions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 space-y-2">
            <p className="font-medium text-slate-400">
              StockMentor AI — Independent Stock Market Education & Research Platform
            </p>
            <p className="max-w-3xl mx-auto leading-relaxed text-slate-500">
              Important Notice: StockMentor AI is an educational technology tool, not a SEBI-registered
              Research Analyst or Investment Advisor. Nothing on this platform constitutes a buy, sell, or
              hold recommendation or financial advice. All analysis is strictly for evidence-based learning.
            </p>
            <p className="text-[11px] text-slate-600">
              NSE/BSE equity market data in development mode is provided via delayed endpoints and labeled accordingly.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
