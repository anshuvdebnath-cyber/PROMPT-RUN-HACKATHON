import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Calendar, Sparkles } from 'lucide-react'
import { useFinance } from '../../context/useFinance'

export const HeaderBar: React.FC = () => {
  const { currentDay, advanceDay, setDay, simulation } = useFinance()
  const daysLeft = Math.max(0, 30 - currentDay)

  return (
    <header className="w-full pb-6 border-b border-black/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-zinc-900 text-white">
            Sprint Control
          </span>
          <span className="text-xs text-zinc-500 font-semibold">
            {daysLeft === 0 ? 'Month Completed!' : `${daysLeft} days remaining`}
          </span>
          {simulation.isActive && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-300 text-amber-950 border border-amber-400 animate-pulse flex items-center gap-1">
              <Sparkles size={11} />
              Simulating
            </span>
          )}
        </div>
        <h2 className="text-2xl font-extrabold font-display text-zinc-900 tracking-tight mt-1">
          Survive the Month · Day {currentDay}
        </h2>
      </div>

      {/* Day Slider & Advance Action */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-2xl border border-black/8 shadow-2xs w-full md:w-64">
          <Calendar size={14} className="text-zinc-400 shrink-0" />
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={advanceDay}
          disabled={currentDay >= 30}
          className="px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Next Day</span>
          <ChevronRight size={14} />
        </motion.button>
      </div>
    </header>
  )
}
