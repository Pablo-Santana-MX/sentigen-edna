/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';

const samples = [
  { id: 'SMP-2026-001', site: 'Acadia Net-Pen Sector A', region: 'US EPA Region 1', status: 'Verified', date: '2026-03-14', score: '94.2%' },
  { id: 'SMP-2026-002', site: 'Puget Sound Basin Alpha', region: 'US EPA Region 10', status: 'Verified', date: '2026-03-13', score: '89.5%' },
  { id: 'SMP-2026-003', site: 'Vancouver Island North Cage 4', region: 'Canada DFO Pacific', status: 'Pending Review', date: '2026-03-12', score: '82.1%' },
  { id: 'SMP-2026-004', site: 'Bay of Fundy Estuary Sector 2', region: 'Canada DFO Maritimes', status: 'Verified', date: '2026-03-10', score: '96.0%' },
  { id: 'SMP-2026-005', site: 'Gulf of Maine Transect 7', region: 'US EPA Region 1', status: 'Verified', date: '2026-03-08', score: '91.4%' },
];

export const SampleTracker: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-slate-900/60 flex items-center justify-between overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600" /> In-Silico Sample Tracking & Coastal Sites
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time tracking of virtual metabarcoding runs across 42 federal aquaculture lease sites.
          </p>
        </div>
        <span className="px-3 py-1 bg-teal-50/80 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-lg border border-teal-200/50 dark:border-teal-800/50">
          42 Sites Active
        </span>
      </div>

      <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/30 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-800/50">
                <th className="py-3 px-6 font-semibold">Sample ID</th>
                <th className="py-3 px-6 font-semibold">Coastal Site Name</th>
                <th className="py-3 px-6 font-semibold">Regulatory Region</th>
                <th className="py-3 px-6 font-semibold">Ingestion Date</th>
                <th className="py-3 px-6 font-semibold">Integrity Score</th>
                <th className="py-3 px-6 font-semibold">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/30 text-slate-700 dark:text-slate-300">
              {samples.map((s, idx) => (
                <tr key={idx} className="hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-teal-600 dark:text-teal-400">{s.id}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">{s.site}</td>
                  <td className="py-3.5 px-6 text-slate-500">{s.region}</td>
                  <td className="py-3.5 px-6 text-slate-500 font-mono">{s.date}</td>
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900 dark:text-white">{s.score}</td>
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      s.status === 'Verified' 
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50' 
                        : 'bg-amber-50/80 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/50'
                    }`}>
                      {s.status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
