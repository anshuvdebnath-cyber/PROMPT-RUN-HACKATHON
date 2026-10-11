import React, { useState } from 'react'
import { Sparkles, LineChart, CreditCard, Zap, LayoutGrid } from 'lucide-react'
import { FinanceProvider } from './context/FinanceContext'
import { Navbar } from './components/Navbar'
import { HeroVibeBanner } from './components/HeroVibeBanner'
import { MetricCards } from './components/MetricCards'
import { WhatIfSimulator } from './components/WhatIfSimulator'
import { CashflowChart } from './components/CashflowChart'
import { CommitmentsManager } from './components/CommitmentsManager'
import { SavingsTracker } from './components/SavingsTracker'
import { SurpriseEvents } from './components/SurpriseEvents'
import { ExpenseLedger } from './components/ExpenseLedger'
import { ToastContainer } from './components/ToastContainer'
import { SurvivalCelebration } from './components/SurvivalCelebration'

type ActiveTab = 'simulator' | 'runway' | 'commitments' | 'activity' | 'all'

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator')

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-zinc-900 pb-12 w-full px-4 sm:px-8 max-w-[1550px] mx-auto">
      {/* Top Navigation & Timeline Scrubber */}
      <Navbar />

      {/* Hero Emotional Mascot Banner & Health Ring */}
      <HeroVibeBanner />

      {/* Core Dynamic Financial Metric Cards */}
      <MetricCards />

      {/* Workspace Tabs (Decluttered Navigation) */}
      <div className="my-5 flex items-center justify-between border-b border-black/8 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'simulator'
                ? 'bg-zinc-900 text-white shadow-sm scale-102'
                : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-black/5'
            }`}
          >
            <Sparkles size={14} className={activeTab === 'simulator' ? 'text-amber-400' : ''} />
            <span>What-If Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('runway')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'runway'
                ? 'bg-zinc-900 text-white shadow-sm scale-102'
                : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-black/5'
            }`}
          >
            <LineChart size={14} className={activeTab === 'runway' ? 'text-pink-400' : ''} />
            <span>Runway & Goals</span>
          </button>

          <button
            onClick={() => setActiveTab('commitments')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'commitments'
                ? 'bg-zinc-900 text-white shadow-sm scale-102'
                : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-black/5'
            }`}
          >
            <CreditCard size={14} className={activeTab === 'commitments' ? 'text-purple-400' : ''} />
            <span>Bills & Subscriptions</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'activity'
                ? 'bg-zinc-900 text-white shadow-sm scale-102'
                : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-black/5'
            }`}
          >
            <Zap size={14} className={activeTab === 'activity' ? 'text-amber-400' : ''} />
            <span>Life Shocks & Ledger</span>
          </button>
        </div>

        <button
          onClick={() => setActiveTab(activeTab === 'all' ? 'simulator' : 'all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            activeTab === 'all'
              ? 'bg-amber-300 text-zinc-900 border border-amber-400'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
          }`}
          title="Toggle split dashboard overview"
        >
          <LayoutGrid size={13} />
          <span>{activeTab === 'all' ? 'Focus Tab View' : 'All-in-One Grid'}</span>
        </button>
      </div>

      {/* Main Workspace (Clean, Spacious & Responsive) */}
      <main className="w-full mt-2">
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <WhatIfSimulator />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5">
              <SavingsTracker />
              <SurpriseEvents />
            </div>
          </div>
        )}

        {activeTab === 'runway' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <CashflowChart />
            </div>
            <div className="lg:col-span-4">
              <SavingsTracker />
            </div>
          </div>
        )}

        {activeTab === 'commitments' && (
          <div className="max-w-4xl mx-auto">
            <CommitmentsManager />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <SurpriseEvents />
            </div>
            <div className="lg:col-span-6">
              <ExpenseLedger />
            </div>
          </div>
        )}

        {activeTab === 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <section className="lg:col-span-7 flex flex-col gap-6" aria-label="Simulation and Projections">
              <WhatIfSimulator />
              <CashflowChart />
              <SavingsTracker />
            </section>

            <aside className="lg:col-span-5 flex flex-col gap-6" aria-label="Commitments and Ledger">
              <CommitmentsManager />
              <SurpriseEvents />
              <ExpenseLedger />
            </aside>
          </div>
        )}
      </main>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Day 30 Final Celebration / Debrief Modal */}
      <SurvivalCelebration />

      {/* Footer */}
      <footer className="w-full mt-14 pt-6 border-t border-black/8 text-center text-xs text-zinc-500">
        <p className="font-semibold text-zinc-600">
          Broke But Functional — Survive the Month • Gen Z Personal Finance Simulation
        </p>
        <p className="mt-1 text-[11px] text-zinc-400">
          Engineered for PROMPT RUN Hackathon · Ultra-Clean Editorial Neo-Brutalist Experience
        </p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  )
}
