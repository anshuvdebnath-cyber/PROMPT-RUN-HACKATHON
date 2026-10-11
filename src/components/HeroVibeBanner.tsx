import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RefreshCw, Zap } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MASCOT_METADATA } from '../data/mascotData'
import { HealthScoreRing } from './HealthScoreRing'
import { MascotMood } from '../types/finance'

const MOOD_CYCLE: (MascotMood | 'live')[] = [
  'live',
  'excited',
  'joyful',
  'grateful',
  'stressed',
  'angry',
  'hurt',
]

export const HeroVibeBanner: React.FC = () => {
  const { effectiveMetrics, simulation } = useFinance()
  const [cycleIndex, setCycleIndex] = useState(0)

  const currentSelection = MOOD_CYCLE[cycleIndex]
  const isLive = currentSelection === 'live'

  const activeMood: MascotMood = isLive
    ? effectiveMetrics.mascotMood
    : currentSelection

  const meta = MASCOT_METADATA[activeMood] ?? MASCOT_METADATA.joyful

  const handleNextMood = () => {
    setCycleIndex((prev) => (prev + 1) % MOOD_CYCLE.length)
  }

  const handleResetToLive = () => {
    setCycleIndex(0)
  }

  const riskStyle =
    effectiveMetrics.riskLevel === 'Safe'
      ? { bg: '#D9F5E5', fg: '#065F46' }
      : effectiveMetrics.riskLevel === 'Moderate'
        ? { bg: '#FFF3C4', fg: '#854D0E' }
        : { bg: '#FFE4E6', fg: '#9F1239' }

  return (
    <section aria-label="Financial vibe status">
      <motion.div
        layout
        className="relative overflow-hidden border transition-colors duration-500"
        style={{
          background: meta.bg,
          borderColor: 'var(--border-soft)',
          borderRadius: 28,
          boxShadow: 'var(--shadow-card)',
        }}
        animate={{ backgroundColor: meta.bg }}
        transition={{ duration: 0.5 }}
      >
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center">
          {/* Mascot blob with 1-tap transition trigger */}
          <div className="flex md:flex-col items-center gap-2.5 shrink-0">
            <div
              className="relative w-[104px] h-[104px] sm:w-[124px] sm:h-[124px] rounded-[28px] bg-white/95 border border-black/5 flex items-center justify-center overflow-hidden cursor-pointer group shadow-xs"
              onClick={handleNextMood}
              title="Click to transition to next mood!"
            >
              <div className="absolute inset-0 dot-grid opacity-60" />
              <Mascot mood={activeMood} size={92} className="relative group-hover:scale-105 transition-transform" />
            </div>

            {/* Next Mood Step Button (replaces manual gallery modal) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNextMood}
                className="px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-white/95 hover:bg-white text-zinc-700 border border-black/8 shadow-2xs flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                title="Transition moods one by one"
              >
                <RefreshCw size={11} className="text-amber-500" />
                <span>{isLive ? 'Cycle Moods ↻' : `Mood ${cycleIndex}/6 ↻`}</span>
              </button>

              {!isLive && (
                <button
                  onClick={handleResetToLive}
                  className="px-2.5 py-1.5 rounded-full text-[11px] font-extrabold bg-zinc-900 text-amber-300 shadow-2xs flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer"
                  title="Return to real-time finance mood"
                >
                  <Zap size={10} /> Live
                </button>
              )}
            </div>
          </div>

          {/* Copy & Vibe Statements */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 flex-wrap mb-2.5">
              <span className="pill !bg-white/90">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.color }} />
                {meta.label} {!isLive && '(Demo)'}
              </span>
              <span className="pill !border-transparent" style={{ background: riskStyle.bg, color: riskStyle.fg }}>
                {effectiveMetrics.riskLevel} risk
              </span>
              {simulation.isActive && (
                <span className="pill animate-pulse !border-transparent" style={{ background: '#221C15', color: '#FDE68A' }}>
                  <Sparkles size={11} /> Sandbox on
                </span>
              )}
            </div>

            <motion.h2
              key={activeMood + 'vibe'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-black text-balance leading-[1.08] text-zinc-900"
              style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)' }}
            >
              {meta.vibe}
            </motion.h2>

            <div className="mt-2.5 inline-flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-black/5 text-left w-full md:max-w-[560px] shadow-xs">
              <span className="shrink-0 text-base">💡</span>
              <p className="text-[13px] leading-relaxed min-w-0" style={{ color: 'var(--text-2)' }}>
                <strong style={{ color: 'var(--text-1)' }}>Vibe check — </strong>
                {isLive ? effectiveMetrics.quip : meta.genZQuip}
              </p>
            </div>
          </div>

          {/* Health ring */}
          <div className="shrink-0 flex justify-center md:justify-end">
            <HealthScoreRing metrics={effectiveMetrics} size={110} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
