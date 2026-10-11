import React from 'react'
import { motion } from 'framer-motion'
import { FinancialHealthMetrics } from '../types/finance'

interface HealthScoreRingProps {
  metrics: FinancialHealthMetrics
  size?: number
}

export const HealthScoreRing: React.FC<HealthScoreRingProps> = ({
  metrics,
  size = 145,
}) => {
  // Score out of 10 for editorial display (like 8.8 in reference image)
  const scoreOutOfTen = (metrics.score / 10).toFixed(1)

  // Segment stroke properties
  const strokeWidth = 12
  const radius = 54
  const circumference = 2 * Math.PI * radius // ~339.3

  return (
    <div
      className="relative flex flex-col items-center justify-center p-3.5 bg-white/90 backdrop-blur-md rounded-[26px] border border-black/8 shadow-xs"
      role="region"
      aria-label={`Financial Health Score: ${metrics.score} out of 100`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 140 140"
          width={size}
          height={size}
          className="transform -rotate-90 block"
        >
          {/* Background track circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(24, 24, 27, 0.07)"
            strokeWidth={strokeWidth}
          />

          {/* Segment 1: Liquidity (Yellow) */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#FDE047"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.22} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Segment 2: Burn discipline (Mint Green) */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#4ADE80"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.22} ${circumference}`}
            strokeDashoffset={-circumference * 0.25}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          />

          {/* Segment 3: Savings (Blush Pink) */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#F472B6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.22} ${circumference}`}
            strokeDashoffset={-circumference * 0.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          />

          {/* Segment 4: Commitments (Lavender) */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#C084FC"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.22} ${circumference}`}
            strokeDashoffset={-circumference * 0.75}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Display: Score & Grade */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
          <motion.span
            key={scoreOutOfTen}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-extrabold tracking-tight font-display text-zinc-900 leading-none"
          >
            {scoreOutOfTen}
          </motion.span>
          <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">
            Health Score
          </span>
          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 mt-1 rounded-full ${
              metrics.score >= 80
                ? 'bg-emerald-100 text-emerald-800'
                : metrics.score >= 60
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            Grade {metrics.grade}
          </span>
        </div>
      </div>
    </div>
  )
}
