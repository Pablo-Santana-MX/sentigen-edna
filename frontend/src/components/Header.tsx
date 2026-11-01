/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon, Search, ShieldCheck, Menu } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenAuditModal: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onOpenAuditModal, onToggleSidebar }) => {
  return (
    <header className="h-16 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 dark:border-white/10 px-4 md:px-8 flex items-center justify-between gap-4 md:gap-8 transition-colors shrink-0 shadow-xs">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
          In-Silico Biovigilance Hub
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
          <ShieldCheck className="w-3 h-3" /> EPA & DFO Compliant
        </span>
      </div>

      <div className="hidden lg:flex items-center flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
        <input 
          type="text" 
          placeholder="Search eDNA accessions, species, or audit IDs..."
          className="w-full bg-white/60 dark:bg-slate-800/80 border border-white/60 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 transition-all shadow-xs"
        />
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <button 
          onClick={onOpenAuditModal}
          className="px-3.5 md:px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
        >
          Run AI Audit
        </button>
      </div>
    </header>
  );
};
