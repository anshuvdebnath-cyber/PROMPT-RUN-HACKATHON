import React from 'react'
import { useFinance } from '../context/useFinance'

export const CashflowChart: React.FC = () => {
  const { currentDay, transactions, effectiveMetrics } = useFinance()

  // Generate 30 data points representing remaining balance trajectory over 30 days
  const points = []
  let runningBalance = 10000

  for (let d = 1; d <= 30; d++) {
    // Subtract transactions that happened on day d
    const dayTxs = transactions.filter((tx) => tx.day === d)
    const daySpend = dayTxs.reduce((sum, tx) => {
      return tx.type === 'expense' ? sum + tx.amount : sum - tx.amount
    }, 0)

    if (d <= currentDay) {
      runningBalance -= daySpend
    } else {
      // Future projection based on remaining dynamic daily cap
      runningBalance -= effectiveMetrics.dynamicDailyAllowance
    }

    points.push({
      day: d,
      balance: Math.max(0, runningBalance),
      isPast: d <= currentDay,
      isCurrent: d === currentDay,
    })
  }

  // SVG coordinates mapping (width 600, height 180)
  const svgWidth = 600
  const svgHeight = 170
  const paddingX = 35
  const paddingY = 25

  const getX = (day: number) =>
    paddingX + ((day - 1) / 29) * (svgWidth - 2 * paddingX)
  const getY = (bal: number) =>
    svgHeight - paddingY - (bal / 10000) * (svgHeight - 2 * paddingY)

  // Build smooth bezier curve
  let pathD = `M ${getX(1)} ${getY(points[0].balance)}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = (getX(prev.day) + getX(curr.day)) / 2
    pathD += ` C ${midX} ${getY(prev.balance)}, ${midX} ${getY(curr.balance)}, ${getX(
      curr.day
    )} ${getY(curr.balance)}`
  }

  // Area fill path
  const areaPath = `${pathD} L ${getX(30)} ${svgHeight - paddingY} L ${getX(
    1
  )} ${svgHeight - paddingY} Z`

  const currentPoint = points[currentDay - 1] || points[0]

  return (
    <div className="card p-4 sm:p-6 min-w-0" style={{ background: 'var(--canvas-card)' }}>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-extrabold font-display text-zinc-900 leading-tight">
            30-Day Runway Forecast
          </h3>
          <p className="text-xs sm:text-[13px] text-zinc-500 font-medium">
            Past burn vs. projected end-of-month runway.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-zinc-600 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            Wallet Runway
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-zinc-600 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            Day {currentDay}
          </span>
        </div>
      </div>

      {/* SVG Wavy Chart with Soft Gradient */}
      <div className="relative mt-4 w-full overflow-hidden rounded-3xl p-2 sm:p-4 border min-w-0" style={{ background: 'var(--canvas-inset)', borderColor: 'var(--border)' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-48 sm:h-56 overflow-visible"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FB7185" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* ₹0 Base Axis Line */}
          <line
            x1={paddingX}
            y1={getY(0)}
            x2={svgWidth - paddingX}
            y2={getY(0)}
            stroke="#D4D4D8"
            strokeWidth="1.5"
          />

          {/* Area fill under curve */}
          <path d={areaPath} fill="url(#curveGradient)" />

          {/* Primary Wave Runway Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#E11D48"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Current Day Indicator Pin */}
          <g>
            <line
              x1={getX(currentPoint.day)}
              y1={paddingY}
              x2={getX(currentPoint.day)}
              y2={getY(0)}
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle
              cx={getX(currentPoint.day)}
              cy={getY(currentPoint.balance)}
              r="7"
              fill="#F59E0B"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          </g>

          {/* Day markers */}
          <text
            x={getX(1)}
            y={svgHeight - 6}
            fontSize="10"
            fontWeight="bold"
            fill="#A1A1AA"
            textAnchor="middle"
          >
            Day 1
          </text>
          <text
            x={getX(15)}
            y={svgHeight - 6}
            fontSize="10"
            fontWeight="bold"
            fill="#A1A1AA"
            textAnchor="middle"
          >
            Day 15
          </text>
          <text
            x={getX(30)}
            y={svgHeight - 6}
            fontSize="10"
            fontWeight="bold"
            fill="#A1A1AA"
            textAnchor="middle"
          >
            Day 30
          </text>
        </svg>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2.5 mt-4">
        <div className="p-3.5 rounded-2xl border min-w-0" style={{ background: 'var(--canvas-inset)', borderColor: 'var(--border)' }}>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
            Daily Burn
          </span>
          <span className="text-base sm:text-lg font-extrabold text-zinc-900 font-display block mt-0.5 truncate">
            ₹{effectiveMetrics.burnRateDaily}/day
          </span>
        </div>
        <div className="p-3.5 rounded-2xl border min-w-0" style={{ background: 'var(--canvas-inset)', borderColor: 'var(--border)' }}>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
            Projected End
          </span>
          <span className={`text-base sm:text-lg font-extrabold font-display block mt-0.5 truncate ${effectiveMetrics.projectedEndBalance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            ₹{effectiveMetrics.projectedEndBalance.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-black/5 min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
            Survival Odds
          </span>
          <span className="text-base sm:text-lg font-extrabold text-zinc-900 font-display block mt-0.5 truncate">
            {effectiveMetrics.survivalProbability}% ({effectiveMetrics.riskLevel})
          </span>
        </div>
      </div>
    </div>
  )
}
