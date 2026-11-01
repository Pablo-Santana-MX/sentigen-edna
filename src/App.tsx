/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KPIGrid } from './components/KPIGrid';
import { SurveillanceCharts } from './components/SurveillanceCharts';
import { IngestorConsole } from './components/IngestorConsole';
import { AuditGenerator } from './components/AuditGenerator';
import { SampleTracker } from './components/SampleTracker';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onOpenAuditModal={() => setActiveTab('audits')}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <KPIGrid dateRange={dateRange} setDateRange={setDateRange} />
              <SurveillanceCharts />
            </div>
          )}

          {activeTab === 'ingestor' && <IngestorConsole />}

          {activeTab === 'audits' && <AuditGenerator />}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-slate-900/60 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Advanced Outbreak & Trend Analytics</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Deep-dive in-silico telemetry across US EPA and Canada DFO coastal sectors.</p>
              </div>
              <SurveillanceCharts />
            </div>
          )}

          {activeTab === 'samples' && <SampleTracker />}

          {activeTab === 'reports' && <AuditGenerator />}

          {activeTab === 'settings' && (
            <div className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] space-y-6 max-w-2xl overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Platform Settings & API Configurations</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manage NCBI E-utilities connection parameters and Qdrant RAG vector database settings.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">NCBI API Key (Polite Limit Upgrade)</label>
                  <input 
                    type="password" 
                    value="••••••••••••••••••••••••" 
                    readOnly 
                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-600 dark:text-slate-300"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Configured securely via environment secret.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Qdrant Vector Database Endpoint</label>
                  <input 
                    type="text" 
                    value="http://qdrant.internal.sentigen.edna:6333" 
                    readOnly 
                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-600 dark:text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gemini AI Compliance Auditor Model</label>
                  <input 
                    type="text" 
                    value="gemini-3.8-flash" 
                    readOnly 
                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-600 dark:text-slate-300"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
