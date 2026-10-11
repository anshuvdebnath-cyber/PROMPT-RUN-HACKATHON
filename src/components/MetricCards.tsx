import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Flame, ShieldCheck, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const MetricCards: React.FC = () => {
  const { effectiveMetrics, simulation, currentDay } = useFinance()
  const daysLeft = Math.max(1, 30 - currentDay + 1)

  return (
    <div className="w-full my-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Remaining Balance (Yellow Pastel) */}
        <motion.div
          whileHover={{ y: -2 }}
          className="neo-card p-4 bg-[#FEF08A]/75 border border-amber-200 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950">
              Liquid Balance
            </span>
            <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-amber-900 shadow-2xs">
              <Wallet size={14} />
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-display">
              ₹{effectiveMetrics.currentBalance.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-amber-950 font-bold">
              / ₹10k
            </span>
          </div>

          {simulation.isActive && simulation.impactSummary && (
            <div
              className={`mt-1.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                simulation.impactSummary.balanceDelta < 0
                  ? 'bg-rose-200 text-rose-950'
                  : 'bg-emerald-200 text-emerald-950'
              }`}
            >
              {simulation.impactSummary.balanceDelta < 0 ? (
                <TrendingDown size={11} />
              ) : (
                <TrendingUp size={11} />
              )}
              <span>
                {simulation.impactSummary.balanceDelta < 0 ? '-' : '+'}₹
                {Math.abs(simulation.impactSummary.balanceDelta)} if committed
              </span>
            </div>
          )}
        </motion.div>

        {/* Card 2: Dynamic Safe Daily Allowance (Pink Pastel) */}
        <motion.div
          whileHover={{ y: -2 }}
          className="neo-card p-4 bg-[#FCE7F3]/85 border border-pink-200 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-950">
              Safe Daily Cap
            </span>
            <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-pink-900 shadow-2xs">
              <Flame size={14} />
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-display">
              ₹{effectiveMetrics.dynamicDailyAllowance}
            </span>
            <span className="text-[11px] text-pink-950 font-bold">
              / day ({daysLeft}d left)
            </span>
          </div>

          {simulation.isActive && simulation.impactSummary && (
            <div
              className={`mt-1.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                simulation.impactSummary.dailyAllowanceDelta < 0
                  ? 'bg-rose-200 text-rose-950'
                  : 'bg-emerald-200 text-emerald-950'
              }`}
            >
              <span>
                {simulation.impactSummary.dailyAllowanceDelta < 0 ? 'Drops by ' : 'Adds '}
                ₹{Math.abs(simulation.impactSummary.dailyAllowanceDelta)}/d
              </span>
            </div>
          )}
        </motion.div>

        {/* Card 3: Survival Probability (Mint Pastel) */}
        <motion.div
          whileHover={{ y: -2 }}
          className="neo-card p-4 bg-[#DCFCE7]/85 border border-emerald-200 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-950">
              Survival Odds
            </span>
            <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-emerald-900 shadow-2xs">
              <ShieldCheck size={14} />
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-display">
              {effectiveMetrics.survivalProbability}%
            </span>
            <span
              className={`text-[10px] font-extrabold ml-1 px-1.5 py-0.2 rounded-full ${
                effectiveMetrics.riskLevel === 'Safe'
                  ? 'bg-emerald-200 text-emerald-900'
                  : effectiveMetrics.riskLevel === 'Moderate'
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-rose-200 text-rose-900'
              }`}
            >
              {effectiveMetrics.riskLevel}
            </span>
          </div>

          <div className="mt-1 text-[10px] text-emerald-950 font-bold">
            Projected D30: ₹{effectiveMetrics.projectedEndBalance}
          </div>
        </motion.div>

        {/* Card 4: Upcoming Obligations (Lilac Pastel) */}
        <motion.div
          whileHover={{ y: -2 }}
          className="neo-card p-4 bg-[#F3E8FF]/85 border border-purple-200 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-950">
              Liabilities Stash
            </span>
            <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-purple-900 shadow-2xs">
              <CreditCard size={14} />
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-display">
              ₹{effectiveMetrics.unpaidCommitmentsTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-purple-950 font-bold">
              locked
            </span>
          </div>

          <div className="mt-1 text-[10px] text-purple-950 font-bold">
            Burn pace: ~₹{effectiveMetrics.burnRateDaily}/day
          </div>
        </motion.div>
      </div>
    </div>
  )
}
