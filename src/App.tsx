import React from 'react'
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

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-zinc-900 pb-16">
      {/* Top Navigation & Timeline Scrubber */}
      <Navbar />

      {/* Hero Emotional Mascot Banner & Health Ring */}
      <HeroVibeBanner />

      {/* Core Dynamic Financial Metric Cards */}
      <MetricCards />

      {/* Main Responsive Grid Workspace (Laptop & Tablet Optimized) */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): What-If Simulator + Forecast Curve + Savings */}
          <section className="lg:col-span-7 flex flex-col gap-6" aria-label="Simulation and Projections">
            <WhatIfSimulator />
            <CashflowChart />
            <SavingsTracker />
          </section>

          {/* Right Column (5 cols): Commitments + Life Curveballs + Transaction Ledger */}
          <aside className="lg:col-span-5 flex flex-col gap-6" aria-label="Commitments and Ledger">
            <CommitmentsManager />
            <SurpriseEvents />
            <ExpenseLedger />
          </aside>
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Day 30 Final Celebration / Debrief Modal */}
      <SurvivalCelebration />

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-6 border-t border-black/5 text-center text-xs text-zinc-500">
        <p className="font-semibold text-zinc-600">
          Broke But Functional — Survive the Month • Gen Z Personal Finance Simulation
        </p>
        <p className="mt-1 text-[11px] text-zinc-400">
          Engineered for PROMPT RUN Hackathon · Powered by FAIE-Optimized Core Web Vitals
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
