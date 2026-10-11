import React from 'react'
import { motion } from 'framer-motion'
import { FinancialHealthMetrics } from '../types/finance'

interface HealthScoreRingProps {
  metrics: FinancialHealthMetrics
  size?: number
}

export const HealthScoreRing: React.FC<HealthScoreRingProps> = ({
  metrics,
  size = 190,
}) => {
  // Score out of 10 for editorial display (like 8.8 in reference image)
  const scoreOutOfTen = (metrics.score / 10).toFixed(1)

  // Segment stroke properties
  const strokeWidth = 14
  const radius = 70
  const circumference = 2 * Math.PI * radius // ~439.8

  // We have 4 segments representing the 4 pillars of the financial health score:
  // 1. Liquidity, 2. Burn discipline, 3. Savings, 4. Runway
  const segments = [
    {
      label: 'Liquidity Solvency',
      color: '#FDE047', // Yellow
      value: Math.min(100, (metrics.currentBalance / 4000) * 100),
      icon: '💧',
    },
    {
      label: 'Burn Discipline',
      color: '#4ADE80', // Mint green
      value: metrics.dynamicDailyAllowance > 0 ? 85 : 20,
      icon: '🛡️',
    },
    {
      label: 'Savings Cushion',
      color: '#F472B6', // Pink
      value: metrics.savingsProgressPercent,
      icon: '🌱',
    },
    {
      label: 'Commitments Safe',
      color: '#C084FC', // Lavender purple
      value: metrics.unpaidCommitmentsTotal < metrics.currentBalance ? 90 : 30,
      icon: '🔒',
    },
  ]

  // Render segmented circular arcs
  return (
    <div
      className="relative flex flex-col items-center justify-center p-3.5 bg-white/80 backdrop-blur-md rounded-[28px] border border-black/8 shadow-xs"
      style={{ width: size + 20 }}
      role="region"
      aria-label={`Financial Health Score: ${metrics.score} out of 100`}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 180 180"
          width={size}
          height={size}
          className="transform -rotate-90 block"
        >
          {/* Background track circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(24, 24, 27, 0.06)"
            strokeWidth={strokeWidth}
          />

          {/* Segment 1: Liquidity */}
          <motion.circle
            cx="90"
            cy="90"
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

          {/* Segment 2: Burn discipline */}
          <motion.circle
            cx="90"
            cy="90"
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

          {/* Segment 3: Savings */}
          <motion.circle
            cx="90"
            cy="90"
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

          {/* Segment 4: Commitments */}
          <motion.circle
            cx="90"
            cy="90"
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

        {/* Center Display: Score, Grade & Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
          <motion.span
            key={scoreOutOfTen}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-extrabold tracking-tight font-display text-zinc-900 leading-none"
          >
            {scoreOutOfTen}
          </motion.span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
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

      {/* Mini Legend Indicators */}
      <div className="flex items-center justify-center gap-1 mt-2.5">
        {segments.map((seg, idx) => (
          <span
            key={idx}
            className="w-2.5 h-2.5 rounded-full inline-block shadow-2xs"
            style={{ backgroundColor: seg.color }}
            title={seg.label}
          />
        ))}
      </div>
    </div>
  )
}
