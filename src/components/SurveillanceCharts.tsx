/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const diseaseTrendData = [
  { month: 'Oct', isaRisk: 4.2, vhsVRate: 2.1, seaLice: 6.5 },
  { month: 'Nov', isaRisk: 3.8, vhsVRate: 1.9, seaLice: 5.8 },
  { month: 'Dec', isaRisk: 3.1, vhsVRate: 1.5, seaLice: 4.9 },
  { month: 'Jan', isaRisk: 2.9, vhsVRate: 1.8, seaLice: 5.2 },
  { month: 'Feb', isaRisk: 2.5, vhsVRate: 1.2, seaLice: 4.1 },
  { month: 'Mar', isaRisk: 2.4, vhsVRate: 1.1, seaLice: 3.8 },
];

const regionalOutbreakData = [
  { region: 'Pacific NW (EPA Sector 10)', riskCount: 12, resolved: 38 },
  { region: 'Gulf of Maine (EPA Sector 4)', riskCount: 8, resolved: 45 },
  { region: 'British Columbia (DFO North)', riskCount: 15, resolved: 52 },
  { region: 'Bay of Fundy (DFO East)', riskCount: 6, resolved: 29 },
  { region: 'Vancouver Island (DFO South)', riskCount: 10, resolved: 41 },
];

export const SurveillanceCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-slate-900/60 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Pathogen Incidence Trends</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Monthly in-silico qPCR marker concentration (Copies / mL)</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-teal-50/80 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-xs">
            Real-Time SRA Stream
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={diseaseTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="isaRisk" name="ISA Virus Index" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="vhsVRate" name="VHSV Viral Load" stroke="#e8710a" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="seaLice" name="Sea Lice Biomarker" stroke="#9334e6" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-slate-900/60 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Regional Outbreak & Audit Distribution</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active risk flags vs. successfully audited sites (EPA/NEPA & DFO)</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-lg border border-white/40 dark:border-slate-700 shadow-xs">
            US & Canada Zones
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionalOutbreakData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis dataKey="region" stroke="#94a3b8" fontSize={10} interval={0} angle={-15} textAnchor="end" height={45} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="riskCount" name="Active Risk Flags" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Audited & Cleared" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
