'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Search, Scale, Briefcase } from 'lucide-react';

const DOCK_ITEMS = [
  { label: 'Home', href: '/', icon: LayoutDashboard },
  { label: 'Markets', href: '/markets', icon: TrendingUp },
  { label: 'Stocks', href: '/stocks', icon: Search },
  { label: 'Compare', href: '/compare', icon: Scale },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
];

export default function MobileQuickDock() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {DOCK_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
