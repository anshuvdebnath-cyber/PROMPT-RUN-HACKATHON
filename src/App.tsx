import React, { useState } from 'react'
import { FinanceProvider } from './context/FinanceContext'
import { Sidebar } from './components/layout/Sidebar'
import { HeaderBar } from './components/dashboard/HeaderBar'
import { HeroVibeCard } from './components/dashboard/HeroVibeCard'
import { StatCards } from './components/dashboard/StatCards'
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
    <div className="min-h-screen bg-[#FAF7F2] text-zinc-900 flex flex-col lg:flex-row pb-20 lg:pb-0">
      {/* Permanent Left Sidebar on Desktop / Bottom Dock on Mobile */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Responsive Viewport */}
      <div className="flex-1 min-w-0 px-4 sm:px-8 py-6 sm:py-8 max-w-6xl mx-auto w-full">
        {/* Top Header Sprint Bar */}
        <HeaderBar />

        {/* Hero Mascot & Fin-Vibe Check */}
        <HeroVibeCard />

        {/* 4 Aligned Pastel KPI Cards */}
        <StatCards />

        {/* Active Workspace View */}
        <main className="w-full mt-6" aria-label="Main Workspace View">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
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

        {/* Day 30 Victory Modal */}
        <SurvivalCelebration />

        {/* Footer */}
        <footer className="w-full mt-16 pt-6 border-t border-black/8 text-center text-xs text-zinc-500">
          <p className="font-extrabold text-zinc-700">
            Broke But Functional — Survive the Month • Gen Z Personal Finance Challenge
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">
            Prompt Run Hackathon · Engineered for High-Fidelity Responsive Design
          </p>
        </footer>
      </div>
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
