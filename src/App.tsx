import React, { useState } from 'react'
import { Sparkles, LineChart, CreditCard, ShieldCheck, ReceiptText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

const TABS: { id: ActiveTab; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'simulator',   label: 'What-If Simulator',  icon: <Sparkles size={14} />,    color: '#F5C842' },
  { id: 'runway',      label: 'Runway Forecast',     icon: <LineChart size={14} />,   color: '#F9A8B4' },
  { id: 'commitments', label: 'Bills & Subs',         icon: <CreditCard size={14} />,  color: '#B8A9F8' },
  { id: 'savings',     label: 'Savings & Shocks',    icon: <ShieldCheck size={14} />, color: '#6DD9A0' },
  { id: 'ledger',      label: 'Expense Ledger',      icon: <ReceiptText size={14} />, color: '#6EC6F8' },
]

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator')

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'var(--canvas)' }}
    >
      {/* ── Scrollable content column ─────────────────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-6 space-y-8">

        {/* 1. Navbar / Header */}
        <Navbar />

        {/* 2. Hero Mascot Banner */}
        <HeroVibeBanner />

        {/* 3. KPI Metric Cards */}
        <MetricCards />

        {/* 4. Tab Navigation */}
        <div className="w-full overflow-x-auto pb-1">
          <div className="tab-strip min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <span
                  style={{
                    color: activeTab === tab.id ? tab.color : 'currentColor',
                    transition: 'color 0.2s',
                  }}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Active Workspace Panel */}
        <main aria-label="Active workspace" className="w-full pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'simulator'   && <WhatIfSimulator />}
              {activeTab === 'runway'      && <CashflowChart />}
              {activeTab === 'commitments' && <CommitmentsManager />}
              {activeTab === 'savings'     && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SavingsTracker />
                  <SurpriseEvents />
                </div>
              )}
              {activeTab === 'ledger'      && <ExpenseLedger />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer
        className="w-full border-t text-center py-8 px-6"
        style={{ borderColor: 'var(--border)', background: 'var(--canvas)' }}
      >
        <p className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>
          Broke But Functional — Survive the Month
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
          Gen Z Personal Finance Challenge · Prompt Run Hackathon 2024
        </p>
      </footer>

      {/* Overlays */}
      <ToastContainer />
      <SurvivalCelebration />
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
