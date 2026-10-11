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
  const svgHeight = 160
  const paddingX = 30
  const paddingY = 20

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
    <div className="neo-card p-6 bg-white border border-black/10">
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900">
            30-Day Runway Forecast
          </h3>
          <p className="text-xs text-zinc-500">
            Past burn trajectory vs. projected end-of-month runway.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-500">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" />
            Wallet Curve
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            Day {currentDay} Pin
          </span>
        </div>
      </div>

      {/* SVG Wavy Chart with Hatched Pattern */}
      <div className="relative mt-4 w-full overflow-hidden rounded-2xl bg-[#FAF7F2] p-2 border border-black/5">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 sm:h-52 overflow-visible"
        >
          {/* Hatched striped deficit danger band at bottom */}
          <rect
            x={paddingX}
            y={getY(1500)}
            width={svgWidth - 2 * paddingX}
            height={getY(0) - getY(1500)}
            fill="rgba(239, 68, 68, 0.05)"
            strokeDasharray="4 4"
          />

          {/* ₹0 Base Axis Line */}
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="rgba(24, 24, 27, 0.15)"
            strokeWidth="1.5"
          />

          {/* ₹5,000 Midline */}
          <line
            x1={paddingX}
            y1={getY(5000)}
            x2={svgWidth - paddingX}
            y2={getY(5000)}
            stroke="rgba(24, 24, 27, 0.07)"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <text
            x={paddingX + 4}
            y={getY(5000) - 4}
            className="text-[9px] fill-zinc-400 font-semibold"
          >
            ₹5k Midpoint
          </text>

          {/* Area Fill */}
          <path d={areaPath} fill="rgba(244, 114, 182, 0.12)" />

          {/* Smooth Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#EC4899"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Current Day Vertical Indicator Line */}
          <line
            x1={getX(currentDay)}
            y1={paddingY}
            x2={getX(currentDay)}
            y2={svgHeight - paddingY}
            stroke="#18181B"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Current Day Pin Marker */}
          <circle
            cx={getX(currentDay)}
            cy={getY(currentPoint.balance)}
            r="6.5"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            className="drop-shadow-sm"
          />

          {/* Data Badge above current day */}
          <g
            transform={`translate(${Math.min(
              svgWidth - 90,
              Math.max(30, getX(currentDay) - 40)
            )}, ${Math.max(15, getY(currentPoint.balance) - 34)})`}
          >
            <rect
              width="80"
              height="22"
              rx="8"
              fill="#18181B"
              className="drop-shadow-md"
            />
            <text
              x="40"
              y="15"
              fill="#FFFFFF"
              textAnchor="middle"
              className="text-[10px] font-bold"
            >
              Day {currentDay}: ₹{currentPoint.balance}
            </text>
          </g>

          {/* Milestone Day Markers along x-axis */}
          {[1, 5, 10, 15, 20, 25, 30].map((d) => (
            <text
              key={d}
              x={getX(d)}
              y={svgHeight - 4}
              textAnchor="middle"
              className="text-[10px] font-bold fill-zinc-400"
            >
              D{d}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 font-medium">
        <span>Starting ₹10,000 on Day 1</span>
        <span
          className={`font-bold ${
            effectiveMetrics.projectedEndBalance >= 0
              ? 'text-emerald-700'
              : 'text-rose-700'
          }`}
        >
          Forecast on Day 30: ₹{effectiveMetrics.projectedEndBalance}
        </span>
      </div>
    </div>
  )
}
