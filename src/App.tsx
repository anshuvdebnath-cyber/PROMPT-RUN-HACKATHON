import React, { useState } from 'react'
import { Sparkles, LineChart, CreditCard, ShieldCheck, ReceiptText } from 'lucide-react'
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

type ActiveTab = 'simulator' | 'runway' | 'commitments' | 'savings' | 'ledger'

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator')

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-zinc-900 pb-16 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header & Day Progress */}
      <Navbar />

      {/* Hero Mascot Banner & Health Score Ring */}
      <HeroVibeBanner />

      {/* 4 Unclipped Pastel Metric Cards */}
      <MetricCards />

      {/* Decluttered Pill Tab Navigation */}
      <nav
        className="my-6 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-black/8 shadow-2xs flex items-center justify-start sm:justify-center overflow-x-auto gap-1"
        aria-label="Workspace view selector"
      >
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Sparkles size={14} className={activeTab === 'simulator' ? 'text-amber-400' : ''} />
          <span>What-If Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('runway')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'runway'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <LineChart size={14} className={activeTab === 'runway' ? 'text-pink-400' : ''} />
          <span>Runway Forecast</span>
        </button>

        <button
          onClick={() => setActiveTab('commitments')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'commitments'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <CreditCard size={14} className={activeTab === 'commitments' ? 'text-purple-400' : ''} />
          <span>Bills & Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveTab('savings')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'savings'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <ShieldCheck size={14} className={activeTab === 'savings' ? 'text-emerald-400' : ''} />
          <span>Savings & Shocks</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'ledger'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <ReceiptText size={14} className={activeTab === 'ledger' ? 'text-cyan-400' : ''} />
          <span>Expense Ledger</span>
        </button>
      </nav>

      {/* Main Responsive Workspace */}
      <main className="w-full mt-2">
        {activeTab === 'simulator' && (
          <div className="w-full">
            <WhatIfSimulator />
          </div>
        )}

        {activeTab === 'runway' && (
          <div className="w-full">
            <CashflowChart />
          </div>
        )}

        {activeTab === 'commitments' && (
          <div className="w-full">
            <CommitmentsManager />
          </div>
        )}

        {activeTab === 'savings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <SavingsTracker />
            <SurpriseEvents />
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="w-full">
            <ExpenseLedger />
          </div>
        )}
      </main>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Day 30 Victory Celebration Modal */}
      <SurvivalCelebration />

      {/* Footer */}
      <footer className="w-full mt-16 pt-6 border-t border-black/8 text-center text-xs text-zinc-500">
        <p className="font-semibold text-zinc-700">
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
