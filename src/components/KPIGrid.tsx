/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Activity, ShieldCheck, TrendingDown, TrendingUp, Calendar } from 'lucide-react';

interface KPIGridProps {
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ dateRange, setDateRange }) => {
  const kpis = [
    {
      title: 'Pathogen Threat Index',
      value: '2.4 / 10',
      change: '-0.8 pts vs last month',
      isPositive: true,
      status: 'Low Risk',
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-50/80 dark:bg-amber-950/40',
      description: 'In-silico screening across 42 active US/Canada coastal sites'
    },
    {
      title: 'Biodiversity Integrity Score',
      value: '91.8%',
      change: '+3.2% YoY growth',
      isPositive: true,
      status: 'Optimal Health',
      icon: Activity,
      color: 'text-teal-600 bg-teal-50/80 dark:bg-teal-950/40',
      description: 'Metabarcoding Shannon-Wiener index benchmark'
    },
    {
      title: 'Audit Compliance Rate',
      value: '98.5%',
      change: '100% EPA & DFO passed',
      isPositive: true,
      status: 'Fully Verified',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40',
      description: 'Automated secondary data mining verification'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Real-Time Biovigilance Command</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Continuous in-silico eDNA monitoring for coastal aquaculture and marine permits.</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white/50 dark:bg-slate-800/80 border border-white/60 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter (Q1 2026)</option>
            <option value="ytd">Year to Date (2026)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={index} 
              className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-slate-900/60 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{kpi.title}</span>
                  <div className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">{kpi.value}</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold ${kpi.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                    {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {kpi.change}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{kpi.description}</span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs">
                  {kpi.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
