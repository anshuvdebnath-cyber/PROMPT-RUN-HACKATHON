import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, RotateCcw, Calendar, Sparkles } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const Navbar: React.FC = () => {
  const { currentDay, advanceDay, setDay, loadPresetScenario, resetAll, simulation } =
    useFinance()

  const daysRemaining = Math.max(0, 30 - currentDay)
  const progress = ((currentDay - 1) / 29) * 100

  return (
    <header role="banner">
      {/* ── Brand row ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-4xl select-none leading-none" role="img" aria-label="Money with wings">
            💸
          </span>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight"
                style={{ color: 'var(--text-1)' }}
              >
                Broke But Functional
              </h1>
              <span
                className="pill"
                style={{ background: 'var(--butter)', borderColor: 'var(--butter-accent)', color: '#7A5E00' }}
              >
                ₹10k · 30-Day Challenge
              </span>
            </div>
            <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-3)' }}>
              Survive the month, balance commitments, master real Gen Z trade-offs.
            </p>
          </div>
        </div>

        {/* Scenario Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
            Load Scenario:
          </span>
          {[
            { key: 'fresh',    label: '🌱 Fresh', bg: 'var(--mint)',  border: 'var(--mint-accent)',  text: '#0A5C30' },
            { key: 'mid',      label: '⚡ D15',    bg: 'var(--butter)', border: 'var(--butter-accent)', text: '#7A5E00' },
            { key: 'survivor', label: '🔥 D26',    bg: 'var(--rose)',  border: 'var(--rose-accent)',  text: '#8B1A2C' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => loadPresetScenario(s.key as Parameters<typeof loadPresetScenario>[0])}
              className="pill transition-all hover:scale-105 cursor-pointer"
              style={{ background: s.bg, borderColor: s.border, color: s.text }}
              title={`Load ${s.label} scenario`}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={resetAll}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            style={{ background: 'var(--canvas-inset)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
            title="Reset all data"
            aria-label="Reset state"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── Timeline Scrubber Card ─────────────────────────────────────── */}
      <div
        className="card p-5 flex flex-col md:flex-row items-center gap-5"
        style={{ borderRadius: 'var(--r-lg)' }}
      >
        {/* Day badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
            style={{ background: '#1A1A1A', color: '#fff' }}
          >
            <Calendar size={14} />
            Day {currentDay} of 30
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>
            {daysRemaining === 0 ? '🎉 Month complete!' : `${daysRemaining}d left`}
          </span>

          {simulation.isActive && (
            <span
              className="pill animate-pulse"
              style={{ background: '#FFF176', borderColor: '#F5C842', color: '#7A5E00' }}
            >
              <Sparkles size={11} />
              Simulating
            </span>
          )}
        </div>

        {/* Slider + progress */}
        <div className="flex-1 w-full min-w-0 px-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--text-3)' }}>D1</span>
            <div className="relative flex-1">
              {/* Progress track */}
              <div
                className="absolute top-1/2 left-0 h-1.5 rounded-full pointer-events-none -translate-y-1/2 transition-all duration-300"
                style={{ width: `${progress}%`, background: '#1A1A1A', zIndex: 1 }}
              />
              <input
                type="range"
                min={1}
                max={30}
                value={currentDay}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full relative"
                style={{ zIndex: 2, position: 'relative' }}
                aria-label="Select day of the month"
              />
            </div>
            <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--text-3)' }}>D30</span>
          </div>
        </div>

        {/* Advance Day Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={advanceDay}
          disabled={currentDay >= 30}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          style={{ background: '#1A1A1A', color: '#fff' }}
        >
          Advance to Day {Math.min(30, currentDay + 1)}
          <ChevronRight size={15} />
        </motion.button>
      </div>
    </header>
  )
}
