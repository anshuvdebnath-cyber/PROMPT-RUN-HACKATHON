import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, RotateCcw, Calendar, Sparkles } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const Navbar: React.FC = () => {
  const { currentDay, advanceDay, setDay, loadPresetScenario, resetAll, simulation } =
    useFinance()

  const daysRemaining = Math.max(0, 30 - currentDay)

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3">
      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💸</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-display">
              Broke But Functional
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-200 text-amber-900 border border-amber-300">
              ₹10k · 30 Days
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Survive the month, balance commitments, and master real Gen Z trade-offs.
          </p>
        </div>

        {/* Preset Scenarios Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Scenarios:
          </span>
          <button
            onClick={() => loadPresetScenario('fresh')}
            className="px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors border border-emerald-300"
            title="Start from scratch on Day 1"
          >
            🌱 Fresh Start (Day 1)
          </button>
          <button
            onClick={() => loadPresetScenario('mid')}
            className="px-3 py-1.5 text-xs font-bold rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors border border-amber-300"
            title="Jump to mid-month squeeze with unexpected costs"
          >
            ⚡ Mid-Month (Day 15)
          </button>
          <button
            onClick={() => loadPresetScenario('survivor')}
            className="px-3 py-1.5 text-xs font-bold rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 transition-colors border border-rose-300"
            title="High stakes survival mode on Day 26"
          >
            🔥 Survivor (Day 26)
          </button>
          <button
            onClick={resetAll}
            className="p-1.5 rounded-full bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 transition-colors"
            title="Reset Everything"
            aria-label="Reset state"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* 30-Day Interactive Timeline Scrubber */}
      <div className="mt-4 p-3 bg-white/80 rounded-2xl border border-black/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-bold">
            <Calendar size={14} />
            <span>Day {currentDay} of 30</span>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            ({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining)
          </span>

          {simulation.isActive && (
            <span className="ml-auto md:ml-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-zinc-900 animate-pulse flex items-center gap-1">
              <Sparkles size={12} />
              SIMULATING WHAT-IF
            </span>
          )}
        </div>

        {/* Day Slider / Stepper Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-md px-2">
          <span className="text-[11px] font-bold text-zinc-400">D1</span>
          <input
            type="range"
            min={1}
            max={30}
            value={currentDay}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-full accent-zinc-900 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
            aria-label="Select day of the month"
          />
          <span className="text-[11px] font-bold text-zinc-400">D30</span>
        </div>

        {/* Advance Day CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={advanceDay}
          disabled={currentDay >= 30}
          className="w-full md:w-auto px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <span>Advance to Day {Math.min(30, currentDay + 1)}</span>
          <ChevronRight size={14} />
        </motion.button>
      </div>
    </header>
  )
}
