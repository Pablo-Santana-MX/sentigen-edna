/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Activity, 
  Database, 
  FileText, 
  ShieldCheck, 
  BarChart3, 
  MapPin, 
  Settings, 
  Dna,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navItems = [
    { id: 'dashboard', label: 'Biovigilance Dashboard', icon: Activity },
    { id: 'ingestor', label: 'NCBI eDNA Ingestor', icon: Database },
    { id: 'audits', label: 'EPA / DFO Compliance', icon: ShieldCheck },
    { id: 'analytics', label: 'Outbreak & Trend Analytics', icon: BarChart3 },
    { id: 'samples', label: 'Sample Tracking', icon: MapPin },
    { id: 'reports', label: 'Audit Reports', icon: FileText },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl backdrop-saturate-150 
        border-r border-white/60 dark:border-white/10 flex flex-col shrink-0 
        transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
              <Dna className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white tracking-tight text-base">Sentigen eDNA</h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">RegTech SaaS v2.4</p>
            </div>
          </div>
          {isOpen && (
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Core Modules</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="bg-white/50 dark:bg-slate-800/60 rounded-xl p-3 border border-white/40 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">EPA / DFO Secure Link</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">NCBI SRA Pipeline: Synchronized</p>
          </div>
        </div>
      </aside>
    </>
  );
};
