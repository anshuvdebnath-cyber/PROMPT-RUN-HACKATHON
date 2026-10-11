import React, { useState } from 'react'
import {
  Sparkles, LineChart, CreditCard, ShieldCheck, ReceiptText,
  Menu, X, RotateCcw, CalendarDays, ChevronRight, Wallet,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FinanceProvider } from './context/FinanceContext'
import { useFinance } from './context/useFinance'
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
import { Mascot } from './components/Mascot'

type ActiveTab = 'simulator' | 'runway' | 'commitments' | 'savings' | 'ledger'

const NAV: { id: ActiveTab; label: string; hint: string; icon: React.ReactNode; bg: string; fg: string; accent: string }[] = [
  { id: 'simulator',   label: 'Simulator',      hint: 'Test spends',   icon: <Sparkles size={17} />,    bg: '#FFF3C4', fg: '#854D0E', accent: '#FACC15' },
  { id: 'runway',      label: 'Runway',         hint: '30-day curve',  icon: <LineChart size={17} />,   bg: '#FFE4E6', fg: '#9F1239', accent: '#FB7185' },
  { id: 'commitments', label: 'Bills & Subs',   hint: 'Fixed costs',   icon: <CreditCard size={17} />,  bg: '#E9E4FF', fg: '#5B21B6', accent: '#8B5CF6' },
  { id: 'savings',     label: 'Safety Net',     hint: 'Buffer + shocks', icon: <ShieldCheck size={17} />, bg: '#D9F5E5', fg: '#065F46', accent: '#22C55E' },
  { id: 'ledger',      label: 'Ledger',         hint: 'History',       icon: <ReceiptText size={17} />, bg: '#DDF0FF', fg: '#0C4A6E', accent: '#0EA5E9' },
]

const SCENARIOS = [
  { key: 'fresh', label: 'Fresh', emoji: '🌱', bg: '#D9F5E5', fg: '#065F46' },
  { key: 'mid', label: 'Mid squeeze', emoji: '⚡', bg: '#FFF3C4', fg: '#854D0E' },
  { key: 'survivor', label: 'Survivor', emoji: '🔥', bg: '#FFE4E6', fg: '#9F1239' },
] as const

function SidebarBody({ activeTab, setActiveTab, onNavigate }: { activeTab: ActiveTab; setActiveTab: (t: ActiveTab) => void; onNavigate?: () => void }) {
  const { currentDay, effectiveMetrics, loadPresetScenario, resetAll } = useFinance()
  const pct = Math.round(((currentDay - 1) / 29) * 100)

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 pt-1 pb-5">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: '#221C15' }}>
          💸
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-[17px] leading-tight truncate">Broke But<br />Functional</p>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-3)' }}>₹10k · 30 days</p>
        </div>
      </div>

      {/* Month progress */}
      <div className="mx-1 mb-5 p-4 rounded-[20px]" style={{ background: 'var(--canvas-inset)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: 'var(--text-2)' }}>
            Day {currentDay} / 30
          </span>
          <span className="text-[11px] font-extrabold tabular-nums px-2 py-0.5 rounded-full bg-white border border-black/5">
            {30 - currentDay}d left
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-white overflow-hidden border border-black/5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg,#FACC15,#FB923C,#FB7185)' }}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Mascot mood={effectiveMetrics.mascotMood} size={34} />
          <p className="text-xs font-semibold leading-snug truncate" style={{ color: 'var(--text-2)' }}>
            {effectiveMetrics.riskLevel} risk · {effectiveMetrics.survivalProbability}% odds
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 px-1" aria-label="Primary">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => { setActiveTab(n.id); onNavigate?.() }}
            className={`side-nav-btn ${activeTab === n.id ? 'active' : ''}`}
            style={{ ['--nav-accent' as string]: n.accent } as React.CSSProperties}
            aria-current={activeTab === n.id ? 'page' : undefined}
          >
            <span className="nav-icon" style={{ ['--nav-bg' as string]: n.bg, ['--nav-fg' as string]: n.fg } as React.CSSProperties}>
              {n.icon}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block leading-tight">{n.label}</span>
              <span className={`block text-[11px] font-semibold leading-tight ${activeTab === n.id ? 'text-white/60' : ''}`} style={activeTab === n.id ? undefined : { color: 'var(--text-3)' }}>
                {n.hint}
              </span>
            </span>
            {activeTab === n.id && <span className="nav-dot w-2 h-2 rounded-full shrink-0" />}
          </button>
        ))}
      </nav>

      {/* Scenarios */}
      <div className="mt-auto pt-5 px-1">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] px-2 mb-2" style={{ color: 'var(--text-3)' }}>
          Jump in time
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => loadPresetScenario(s.key)}
              className="py-2 px-1 rounded-xl text-[11px] font-extrabold border border-black/5 bg-white hover:scale-[1.03] transition-transform cursor-pointer truncate"
              style={{ color: s.fg, background: s.bg }}
              title={`Load ${s.label}`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={resetAll}
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold text-zinc-500 hover:text-zinc-800 hover:bg-white border border-dashed border-black/10 transition-colors cursor-pointer"
        >
          <RotateCcw size={12} /> Reset month
        </button>
      </div>
    </div>
  )
}

function TopDayBar() {
  const { currentDay, setDay, advanceDay, simulation } = useFinance()
  const progress = ((currentDay - 1) / 29) * 100

  return (
    <div className="card px-4 sm:px-5 py-3.5 flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: 'var(--ink)' }}>
          <CalendarDays size={16} />
        </span>
        <div className="leading-tight">
          <p className="font-display font-bold text-[15px]">Day {currentDay} <span className="font-medium text-zinc-400">of 30</span></p>
          <p className="text-[11px] font-semibold" style={{ color: 'var(--text-3)' }}>
            {simulation.isActive ? '⚡ Sandbox previewing' : currentDay >= 30 ? '🎉 Month complete' : `${30 - currentDay} days to survive`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className="text-[11px] font-bold text-zinc-400 shrink-0">D1</span>
        <div className="relative flex-1 min-w-0 py-1">
          <div className="absolute top-1/2 left-0 h-2 rounded-full -translate-y-1/2 pointer-events-none transition-all" style={{ width: `${progress}%`, background: 'var(--ink)' }} />
          <input type="range" min={1} max={30} value={currentDay} onChange={(e) => setDay(Number(e.target.value))} aria-label="Select day" className="relative" style={{ zIndex: 2 }} />
        </div>
        <span className="text-[11px] font-bold text-zinc-400 shrink-0">D30</span>
      </div>
      <button
        onClick={advanceDay}
        disabled={currentDay >= 30}
        className="w-full md:w-auto shrink-0 flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-[13px] text-white disabled:opacity-35 transition-all hover:brightness-110 cursor-pointer"
        style={{ background: 'var(--ink)' }}
      >
        Next day <ChevronRight size={15} />
      </button>
    </div>
  )
}

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator')
  const [drawer, setDrawer] = useState(false)
  const active = NAV.find((n) => n.id === activeTab)!

  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--canvas)' }}>
      <div className="mx-auto max-w-[1280px] px-3 sm:px-5 lg:px-6 py-3 sm:py-5 lg:flex lg:gap-5 lg:items-start">

        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block w-[264px] shrink-0 sticky top-5 h-[calc(100vh-40px)] rounded-[26px] border p-4 overflow-y-auto no-scrollbar" style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border-soft)', boxShadow: 'var(--shadow-card)' }}>
          <FinanceSidebarWrap activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {drawer && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden" style={{ background: 'rgba(34,28,21,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setDrawer(false)}>
              <motion.div
                initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="absolute left-0 top-0 bottom-0 w-[290px] p-4 overflow-y-auto"
                style={{ background: 'var(--sidebar-bg)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end mb-2">
                  <button onClick={() => setDrawer(false)} className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center cursor-pointer" aria-label="Close menu">
                    <X size={16} />
                  </button>
                </div>
                <FinanceSidebarWrap activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={() => setDrawer(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main column ── */}
        <div className="flex-1 min-w-0 space-y-3.5 sm:space-y-5 pb-24 lg:pb-10">
          {/* Mobile top bar */}
          <div className="lg:hidden card px-4 py-3 flex items-center gap-3">
            <button onClick={() => setDrawer(true)} className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer shrink-0" style={{ background: 'var(--ink)', color: '#fff' }} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-2xl shrink-0">💸</span>
              <div className="min-w-0">
                <p className="font-display font-bold text-[15px] leading-tight truncate">Broke But Functional</p>
                <p className="text-[11px] font-semibold" style={{ color: 'var(--text-3)' }}>₹10k · 30-day survival</p>
              </div>
            </div>
            <span className="chip-soft shrink-0" style={{ background: active.bg, color: active.fg }}>{active.label}</span>
          </div>

          {/* Desktop greeting */}
          <div className="hidden lg:flex items-end justify-between gap-4 px-1">
            <div>
              <h1 className="font-display font-bold text-[28px] leading-tight">Hey, money pilot 👋</h1>
              <p className="text-[13.5px] font-medium" style={{ color: 'var(--text-2)' }}>
                Test a spend, watch your runway move. Small choices, big month.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-bold px-3.5 py-2 rounded-full bg-white border border-black/5" style={{ color: 'var(--text-2)' }}>
              <Wallet size={14} /> ₹10,000 start
            </div>
          </div>

          <TopDayBar />
          <HeroVibeBanner />
          <MetricCards />

          {/* Section title */}
          <div className="flex items-center gap-3 px-1 pt-1">
            <span className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0" style={{ background: active.bg, color: active.fg }}>
              {active.icon}
            </span>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-[17px] sm:text-[19px] leading-tight">{active.label}</h2>
              <p className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{active.hint}</p>
            </div>
          </div>

          <main aria-label="Workspace" className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === 'simulator' && <WhatIfSimulator />}
                {activeTab === 'runway' && <CashflowChart />}
                {activeTab === 'commitments' && <CommitmentsManager />}
                {activeTab === 'savings' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
                    <SavingsTracker />
                    <SurpriseEvents />
                  </div>
                )}
                {activeTab === 'ledger' && <ExpenseLedger />}
              </motion.div>
            </AnimatePresence>
          </main>

          <p className="text-center text-[11px] font-semibold pt-2 hidden lg:block" style={{ color: 'var(--text-3)' }}>
            Broke But Functional · Gen Z Finance Challenge · Prompt Run Hackathon
          </p>
        </div>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pt-2" style={{ background: 'linear-gradient(to top, var(--canvas) 70%, transparent)' }} aria-label="Mobile">
        <div className="card !rounded-[22px] px-2 py-2 flex items-center justify-between gap-1" style={{ boxShadow: 'var(--shadow-pop)' }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              className="flex-1 flex flex-col items-center gap-1 py-1.5 px-1 rounded-2xl cursor-pointer transition-all min-w-0"
              style={activeTab === n.id ? { background: 'var(--ink)', color: '#fff' } : { color: 'var(--text-3)' }}
              aria-current={activeTab === n.id ? 'page' : undefined}
            >
              {n.icon}
              <span className="text-[10px] font-extrabold leading-none truncate max-w-full">{n.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>

      <ToastContainer />
      <SurvivalCelebration />
    </div>
  )
}

// Sidebar needs finance context — wrap so App (provider) stays on top
function FinanceSidebarWrap(props: { activeTab: ActiveTab; setActiveTab: (t: ActiveTab) => void; onNavigate?: () => void }) {
  return <SidebarBody {...props} />
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  )
}
