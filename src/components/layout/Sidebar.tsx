import React from 'react'
import {
  Sparkles,
  LineChart,
  CreditCard,
  ShieldCheck,
  ReceiptText,
  RotateCcw,
} from 'lucide-react'
import { useFinance } from '../../context/useFinance'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentDay, loadPresetScenario, resetAll, effectiveMetrics } = useFinance()
  const daysLeft = Math.max(0, 30 - currentDay)

  const navItems = [
    { id: 'simulator', label: 'What-If Simulator', icon: Sparkles, color: 'text-amber-500' },
    { id: 'runway', label: '30-Day Runway', icon: LineChart, color: 'text-pink-500' },
    { id: 'commitments', label: 'Bills & Subscriptions', icon: CreditCard, color: 'text-purple-500' },
    { id: 'savings', label: 'Savings & Shocks', icon: ShieldCheck, color: 'text-emerald-500' },
    { id: 'ledger', label: 'Expense Ledger', icon: ReceiptText, color: 'text-cyan-500' },
  ]

  return (
    <>
      {/* Desktop Sidebar (Fixed left navigation rail) */}
      <aside className="hidden lg:flex w-72 shrink-0 bg-white border-r border-black/8 p-6 flex-col justify-between min-h-screen sticky top-0 h-screen select-none">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-black/6">
            <span className="text-3xl" role="img" aria-label="Money">
              💸
            </span>
            <div>
              <h1 className="text-xl font-extrabold font-display text-zinc-900 tracking-tight leading-none">
                Broke But Functional
              </h1>
              <p className="text-[11px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                ₹10k · 30-Day Survival
              </p>
            </div>
          </div>

          {/* Month Timeline Card */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF7F2] border border-black/6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-zinc-900 font-display">
                Day {currentDay} of 30
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                {daysLeft}d left
              </span>
            </div>
            {/* Progress track */}
            <div className="w-full bg-zinc-200 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-zinc-900 rounded-full transition-all duration-300"
                style={{ width: `${(currentDay / 30) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-semibold mt-2">
              Safe Daily Spend: <span className="font-extrabold text-zinc-900">₹{effectiveMetrics.dynamicDailyAllowance}/day</span>
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 space-y-1.5" aria-label="Sidebar navigation">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block px-3 mb-2">
              Workspace Views
            </span>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <Icon size={16} className={isActive ? item.color : 'text-zinc-400'} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Scenario Quick Presets */}
          <div className="mt-6 pt-5 border-t border-black/6">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block px-3 mb-2">
              Test Scenarios
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => loadPresetScenario('fresh')}
                className="w-full px-3 py-2 text-left text-xs font-bold rounded-xl text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>🌱 Fresh Start</span>
                <span className="text-[10px] font-extrabold opacity-70">Day 1</span>
              </button>
              <button
                onClick={() => loadPresetScenario('mid')}
                className="w-full px-3 py-2 text-left text-xs font-bold rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>⚡ Mid-Month</span>
                <span className="text-[10px] font-extrabold opacity-70">Day 15</span>
              </button>
              <button
                onClick={() => loadPresetScenario('survivor')}
                className="w-full px-3 py-2 text-left text-xs font-bold rounded-xl text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>🔥 Survivor</span>
                <span className="text-[10px] font-extrabold opacity-70">Day 26</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-4 border-t border-black/6">
          <button
            onClick={resetAll}
            className="w-full px-3 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Budget State</span>
          </button>
        </div>
      </aside>

      {/* Mobile Floating Bottom Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-black/8 shadow-lg flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                isActive ? 'bg-zinc-900 text-white' : 'text-zinc-500'
              }`}
              title={item.label}
            >
              <Icon size={18} className={isActive ? item.color : ''} />
            </button>
          )
        })}
      </div>
    </>
  )
}
