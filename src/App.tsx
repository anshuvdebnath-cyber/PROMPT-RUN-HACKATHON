import React, { useState } from 'react'
import {
  Sparkles, LineChart, CreditCard, ShieldCheck, ReceiptText,
  Menu, X, RotateCcw, CalendarDays, ChevronRight, ChevronLeft, Wallet, Plus, SlidersHorizontal,
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
import { QuickExpenseModal } from './components/QuickExpenseModal'
import { MascotCompanion } from './components/MascotCompanion'
import { Mascot } from './components/Mascot'
import { TransactionCategory } from './types/finance'
import { getMoodForExpenseAmount } from './engine/financeEngine'

type ActiveTab = 'simulator' | 'runway' | 'commitments' | 'savings' | 'ledger'

const NAV: { id: ActiveTab; label: string; hint: string; icon: React.ReactNode; bg: string; fg: string; accent: string }[] = [
  { id: 'simulator',   label: 'Simulator',           hint: 'Test spends & vibes',  icon: <Sparkles size={18} />,    bg: '#FFF3C4', fg: '#854D0E', accent: '#FACC15' },
  { id: 'runway',      label: 'Runway Forecast',     hint: '30-day survival curve',icon: <LineChart size={18} />,   bg: '#FFE4E6', fg: '#9F1239', accent: '#FB7185' },
  { id: 'commitments', label: 'Bills & Subs',        hint: 'Fixed obligations',    icon: <CreditCard size={18} />,  bg: '#E9E4FF', fg: '#5B21B6', accent: '#8B5CF6' },
  { id: 'savings',     label: 'Safety Net',          hint: 'Buffer & shock fund',  icon: <ShieldCheck size={18} />, bg: '#D9F5E5', fg: '#065F46', accent: '#22C55E' },
  { id: 'ledger',      label: 'Daily Spends & Log',  hint: 'History & real cash',  icon: <ReceiptText size={18} />, bg: '#DDF0FF', fg: '#0C4A6E', accent: '#0EA5E9' },
]

const SCENARIOS = [
  { key: 'fresh', label: 'Fresh Start', emoji: '🌱', bg: '#D9F5E5', fg: '#065F46' },
  { key: 'mid', label: 'Mid Squeeze', emoji: '⚡', bg: '#FFF3C4', fg: '#854D0E' },
  { key: 'survivor', label: 'Survivor', emoji: '🔥', bg: '#FFE4E6', fg: '#9F1239' },
] as const

// Sleek modern SVG brand mark (replaces emoji logo)
const BrandLogo: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

function SidebarBody({ activeTab, setActiveTab, onNavigate, onOpenExpenseModal }: { activeTab: ActiveTab; setActiveTab: (t: ActiveTab) => void; onNavigate?: () => void; onOpenExpenseModal: () => void }) {
  const { currentDay, effectiveMetrics, loadPresetScenario, resetAll } = useFinance()
  const pct = Math.round(((currentDay - 1) / 29) * 100)

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Brand without emoji - Larger, bolder and more prominent */}
      <div className="flex items-center gap-3.5 px-2.5 pt-1.5 pb-5 border-b border-black/5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-amber-400/30 text-amber-300 shadow-sm" style={{ background: '#1C1917' }}>
          <BrandLogo size={24} />
        </div>
        <div className="min-w-0">
          <p className="font-display font-black text-[19px] sm:text-[20px] leading-tight tracking-tight text-zinc-900 truncate">
            Broke But<br />Functional
          </p>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] mt-0.5" style={{ color: 'var(--text-3)' }}>
            ₹10k · 30-Day Vibe
          </p>
        </div>
      </div>

      {/* Quick Add Button in Sidebar */}
      <div className="mx-1 mt-4 mb-3.5">
        <button
          onClick={() => { onOpenExpenseModal(); onNavigate?.() }}
          className="w-full py-2.5 px-3 rounded-2xl font-black text-xs text-white bg-rose-500 hover:bg-rose-600 shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Log Today's Spend</span>
        </button>
      </div>

      {/* Month progress card */}
      <div className="mx-1 mb-4 p-4 rounded-[22px] border border-black/6" style={{ background: 'var(--canvas-inset)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: 'var(--text-2)' }}>
            Day {currentDay} / 30
          </span>
          <span className="text-[11px] font-extrabold tabular-nums px-2.5 py-0.5 rounded-full bg-white border border-black/8 text-zinc-800 shadow-2xs">
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
        <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-black/5">
          <Mascot mood={effectiveMetrics.mascotMood} size={36} />
          <p className="text-xs font-bold leading-snug truncate" style={{ color: 'var(--text-2)' }}>
            {effectiveMetrics.riskLevel} risk · {effectiveMetrics.survivalProbability}% odds
          </p>
        </div>
      </div>

      {/* Primary Navigation */}
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
              <span className="block leading-tight font-extrabold text-[13.5px]">{n.label}</span>
              <span className={`block text-[11px] font-semibold leading-tight ${activeTab === n.id ? 'text-white/70' : ''}`} style={activeTab === n.id ? undefined : { color: 'var(--text-3)' }}>
                {n.hint}
              </span>
            </span>
            {activeTab === n.id && <span className="nav-dot w-2 h-2 rounded-full shrink-0" />}
          </button>
        ))}
      </nav>

      {/* Scenarios preset jump */}
      <div className="mt-auto pt-4 px-1 border-t border-black/5">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] px-2 mb-2" style={{ color: 'var(--text-3)' }}>
          Jump in timeline
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => loadPresetScenario(s.key)}
              className="py-2 px-1 rounded-xl text-[10.5px] font-black border border-black/5 bg-white hover:scale-[1.03] transition-transform cursor-pointer truncate shadow-2xs"
              style={{ color: s.fg, background: s.bg }}
              title={`Load ${s.label}`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={resetAll}
          className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-white border border-dashed border-black/10 transition-colors cursor-pointer"
        >
          <RotateCcw size={12} /> Reset to Day 1
        </button>
      </div>
    </div>
  )
}

/**
 * Top bar equipped with:
 * 1. Compact Day Stepper (Day 1..30)
 * 2. Daily Spend Slider (Slide how much money you spent today for what)
 * 3. In-place persistent Morphing Mascot watching the spend slider live!
 */
function TopDayBar({ onOpenExpenseModal }: { onOpenExpenseModal: () => void }) {
  const { currentDay, setDay, advanceDay, addTransaction } = useFinance()

  const [sliderAmount, setSliderAmount] = useState<number>(140)
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining')
  const [itemNote, setItemNote] = useState<string>('Lunch & Snack')

  const sliderMood = getMoodForExpenseAmount(sliderAmount)
  const sliderPct = Math.min(100, (sliderAmount / 1500) * 100)

  const handleRecordSliderSpend = () => {
    if (sliderAmount <= 0) return
    const title = itemNote.trim() || `${category} spend`
    addTransaction(title, sliderAmount, category, 'expense', currentDay)
    setItemNote('')
  }

  return (
    <div className="card px-3.5 sm:px-5 py-3.5 flex flex-col gap-3.5 lg:flex-row lg:items-center justify-between" style={{ background: 'var(--canvas-card)' }}>
      {/* Left: Compact Timeline Stepper */}
      <div className="flex items-center justify-between lg:justify-start gap-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: 'var(--ink)' }}>
            <CalendarDays size={16} />
          </span>
          <div className="leading-tight">
            <p className="font-display font-black text-[15px]">Day {currentDay} <span className="font-semibold text-zinc-400">/ 30</span></p>
            <p className="text-[11px] font-bold" style={{ color: 'var(--text-3)' }}>
              {30 - currentDay}d remaining
            </p>
          </div>
        </div>

        {/* Stepper buttons (prev & next) */}
        <div className="flex items-center gap-1.5 ml-2">
          <button
            onClick={() => setDay(currentDay - 1)}
            disabled={currentDay <= 1}
            className="w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 disabled:opacity-30 flex items-center justify-center text-zinc-700 cursor-pointer transition-colors"
            title="Previous day"
            aria-label="Previous day"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={advanceDay}
            disabled={currentDay >= 30}
            className="w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 disabled:opacity-30 flex items-center justify-center text-zinc-700 cursor-pointer transition-colors"
            title="Next day"
            aria-label="Next day"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Center & Right: Daily Spend Slider ("How much money spent today for what") */}
      <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:mx-4 p-2.5 sm:p-3 rounded-2xl border" style={{ background: 'var(--canvas-inset)', borderColor: 'var(--border)' }}>
        {/* In-Place Morphing Mascot reacting to slider amount */}
        <div className="shrink-0 flex items-center justify-center">
          <Mascot mood={sliderMood} size={42} />
        </div>

        {/* Slider & amount controls */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <SlidersHorizontal size={12} /> Today's Spend:
            </span>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm text-zinc-900">
                ₹{sliderAmount}
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="text-[11px] font-bold py-0.5 px-2 rounded-lg bg-white border border-black/10 text-zinc-700 focus:outline-none cursor-pointer"
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transport & Commute">Transport & Commute</option>
                <option value="Shopping & Essentials">Shopping & Essentials</option>
                <option value="Entertainment & Outings">Entertainment</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Unexpected & Emergency">Emergency</option>
              </select>
            </div>
          </div>

          {/* Smooth Range Slider */}
          <div className="relative py-1">
            <div
              className="absolute top-1/2 left-0 h-2 rounded-full -translate-y-1/2 pointer-events-none transition-all"
              style={{
                width: `${sliderPct}%`,
                background: sliderAmount > 1000 ? '#FB7185' : sliderAmount > 500 ? '#F97316' : '#22C55E',
              }}
            />
            <input
              type="range"
              min={10}
              max={1500}
              step={10}
              value={sliderAmount}
              onChange={(e) => setSliderAmount(Number(e.target.value))}
              className="relative w-full cursor-pointer"
              style={{ zIndex: 2 }}
              aria-label="How much money spent today"
            />
          </div>
        </div>

        {/* Note input & Log button */}
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Note (e.g. Lunch)"
            value={itemNote}
            onChange={(e) => setItemNote(e.target.value)}
            className="w-24 sm:w-28 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-black/10 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
          <button
            onClick={handleRecordSliderSpend}
            className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs text-white bg-zinc-900 hover:bg-zinc-800 shadow-2xs transition-transform hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            Log ₹{sliderAmount}
          </button>
          <button
            onClick={onOpenExpenseModal}
            className="p-1.5 rounded-xl bg-white hover:bg-zinc-100 border border-black/10 text-zinc-600 transition-colors cursor-pointer"
            title="Open advanced expense form"
            aria-label="Open advanced expense form"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator')
  const [drawer, setDrawer] = useState(false)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const { currentDay } = useFinance()
  const active = NAV.find((n) => n.id === activeTab)!

  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--canvas)' }}>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold"
      >
        Skip to main content
      </a>

      <div className="mx-auto max-w-[1320px] px-3 sm:px-5 lg:px-6 py-3 sm:py-5 lg:flex lg:gap-6 lg:items-start">

        {/* ── Desktop sidebar: Wider, more prominent and impactful ── */}
        <aside className="hidden lg:block w-[290px] shrink-0 sticky top-5 h-[calc(100vh-40px)] rounded-[28px] border p-4 overflow-y-auto no-scrollbar shadow-card" style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border-soft)' }}>
          <FinanceSidebarWrap
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenExpenseModal={() => setIsExpenseModalOpen(true)}
          />
        </aside>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {drawer && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden" style={{ background: 'rgba(34,28,21,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setDrawer(false)}>
              <motion.div
                initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="absolute left-0 top-0 bottom-0 w-[300px] p-4 overflow-y-auto"
                style={{ background: 'var(--sidebar-bg)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end mb-2">
                  <button onClick={() => setDrawer(false)} className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center cursor-pointer" aria-label="Close menu">
                    <X size={16} />
                  </button>
                </div>
                <FinanceSidebarWrap
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onNavigate={() => setDrawer(false)}
                  onOpenExpenseModal={() => { setDrawer(false); setIsExpenseModalOpen(true) }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main column ── */}
        <div className="flex-1 min-w-0 space-y-3.5 sm:space-y-5 pb-24 lg:pb-10">
          {/* Mobile top bar without emoji */}
          <div className="lg:hidden card px-3.5 py-3 flex items-center gap-2.5">
            <button onClick={() => setDrawer(true)} className="w-9 h-9 rounded-2xl flex items-center justify-center cursor-pointer shrink-0" style={{ background: 'var(--ink)', color: '#fff' }} aria-label="Open menu">
              <Menu size={16} />
            </button>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-7 h-7 rounded-lg bg-zinc-900 text-amber-300 flex items-center justify-center shrink-0">
                <BrandLogo size={15} />
              </span>
              <div className="min-w-0">
                <p className="font-display font-black text-[15px] leading-tight truncate">Broke But Functional</p>
                <p className="text-[10px] font-bold" style={{ color: 'var(--text-3)' }}>Day {currentDay} · ₹10k Pool</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="px-3 py-1.5 rounded-xl font-extrabold text-[11px] bg-rose-500 text-white flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
            >
              <Plus size={13} /> Spend
            </button>
            <span className="chip-soft shrink-0 !text-[11px] !px-2.5" style={{ background: active.bg, color: active.fg }}>{active.label.split(' ')[0]}</span>
          </div>

          {/* Unified App Heading: Visible on all screens, perfectly accessible with a single h1 */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1 pt-1">
            <div>
              <h1 className="font-display font-black text-[28px] sm:text-[34px] lg:text-[40px] tracking-tight leading-none text-zinc-900">
                Hey, money pilot 👋
              </h1>
              <p className="text-[13.5px] sm:text-[14.5px] font-bold mt-1.5 sm:mt-2" style={{ color: 'var(--text-2)' }}>
                Keep your ₹10,000 alive for 30 days. No cap, pure financial survival.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-black px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" /> Log Today's Spend
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12px] font-extrabold px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-white border border-black/8 shadow-2xs" style={{ color: 'var(--text-2)' }}>
                <Wallet size={15} className="text-emerald-600" /> ₹10,000 start
              </div>
            </div>
          </div>

          <TopDayBar onOpenExpenseModal={() => setIsExpenseModalOpen(true)} />
          <HeroVibeBanner />
          <MetricCards />

          {/* Section title */}
          <div className="flex items-center gap-3 px-1 pt-1">
            <span className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0" style={{ background: active.bg, color: active.fg }}>
              {active.icon}
            </span>
            <div className="min-w-0">
              <h2 className="font-display font-black text-[18px] sm:text-[20px] leading-tight text-zinc-900">{active.label}</h2>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>{active.hint}</p>
            </div>
          </div>

          <main id="main-content" aria-label="Workspace" className="min-w-0">
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

          <p className="text-center text-[11px] font-extrabold pt-2 hidden lg:block" style={{ color: 'var(--text-3)' }}>
            Broke But Functional · Gen Z Finance Challenge · Prompt Run Hackathon
          </p>
        </div>
      </div>

      {/* ── Mobile Floating Action Button ── */}
      <button
        onClick={() => setIsExpenseModalOpen(true)}
        className="lg:hidden fixed bottom-20 left-4 z-40 px-4 py-2.5 rounded-full bg-zinc-900 text-white font-extrabold text-xs shadow-xl flex items-center gap-1.5 border border-white/20 active:scale-95 transition-transform cursor-pointer"
        aria-label="Add Daily Expense"
      >
        <Plus size={15} className="text-amber-400" />
        <span>+ Add Spend</span>
      </button>

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

      {/* Interactive Mascot Companion popping up in down-right section */}
      <MascotCompanion />

      {/* Global Modals & Notifications */}
      <QuickExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
      <ToastContainer />
      <SurvivalCelebration />
    </div>
  )
}

// Sidebar needs finance context — wrap so App (provider) stays on top
function FinanceSidebarWrap(props: { activeTab: ActiveTab; setActiveTab: (t: ActiveTab) => void; onNavigate?: () => void; onOpenExpenseModal: () => void }) {
  return <SidebarBody {...props} />
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  )
}
