import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Flame, ShieldCheck, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const MetricCards: React.FC = () => {
  const { effectiveMetrics, simulation, currentDay } = useFinance()
  const daysLeft = Math.max(1, 30 - currentDay + 1)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Remaining Balance (Yellow Pastel) */}
        <motion.div
          whileHover={{ y: -3 }}
          className="neo-card p-5 bg-[#FEF08A]/70 border-amber-200/80 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Liquid Balance
            </span>
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-amber-900 shadow-xs">
              <Wallet size={16} />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 font-display">
              ₹{effectiveMetrics.currentBalance.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-amber-900 font-semibold">
              / ₹10,000
            </span>
          </div>

          {/* Simulation Delta Badge */}
          {simulation.isActive && simulation.impactSummary && (
            <div
              className={`mt-2 text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                simulation.impactSummary.balanceDelta < 0
                  ? 'bg-rose-200 text-rose-950'
                  : 'bg-emerald-200 text-emerald-950'
              }`}
            >
              {simulation.impactSummary.balanceDelta < 0 ? (
                <TrendingDown size={12} />
              ) : (
                <TrendingUp size={12} />
              )}
              <span>
                {simulation.impactSummary.balanceDelta < 0 ? '-' : '+'}₹
                {Math.abs(simulation.impactSummary.balanceDelta)} if committed
              </span>
            </div>
          )}

          <p className="mt-2 text-[11px] text-amber-900/80 font-medium">
            Starting ₹10k pool minus recorded expenses and savings deposits.
          </p>
        </motion.div>

        {/* Card 2: Dynamic Safe Daily Allowance (Pink Pastel) */}
        <motion.div
          whileHover={{ y: -3 }}
          className="neo-card p-5 bg-[#FCE7F3]/80 border-pink-200/80 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-900">
              Daily Safe Cap
            </span>
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-pink-900 shadow-xs">
              <Flame size={16} />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-zinc-900 font-display">
              ₹{effectiveMetrics.dynamicDailyAllowance}
            </span>
            <span className="text-xs text-pink-900 font-semibold">
              / day
            </span>
          </div>

          {/* Simulation Delta Badge */}
          {simulation.isActive && simulation.impactSummary && (
            <div
              className={`mt-2 text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                simulation.impactSummary.dailyAllowanceDelta < 0
                  ? 'bg-rose-200 text-rose-950'
                  : 'bg-emerald-200 text-emerald-950'
              }`}
            >
              <span>
                {simulation.impactSummary.dailyAllowanceDelta < 0 ? 'Drops by ' : 'Increases by '}
                ₹{Math.abs(simulation.impactSummary.dailyAllowanceDelta)}/day
              </span>
            </div>
          )}

          <p className="mt-2 text-[11px] text-pink-900/80 font-medium">
            Guaranteed safe daily spend for {daysLeft} remaining days without debt.
          </p>
        </motion.div>

        {/* Card 3: Survival Probability (Mint Pastel) */}
        <motion.div
          whileHover={{ y: -3 }}
          className="neo-card p-5 bg-[#DCFCE7]/80 border-emerald-200/80 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Survival Rate
            </span>
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-emerald-900 shadow-xs">
              <ShieldCheck size={16} />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-zinc-900 font-display">
              {effectiveMetrics.survivalProbability}%
            </span>
            <span className="text-xs text-emerald-900 font-semibold">
              likelihood
            </span>
          </div>

          {/* Risk Indicator */}
          <div className="mt-2">
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                effectiveMetrics.riskLevel === 'Safe'
                  ? 'bg-emerald-200 text-emerald-900'
                  : effectiveMetrics.riskLevel === 'Moderate'
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-rose-200 text-rose-900'
              }`}
            >
              Risk: {effectiveMetrics.riskLevel}
            </span>
          </div>

          <p className="mt-2 text-[11px] text-emerald-900/80 font-medium">
            Projected end-of-month balance: ₹{effectiveMetrics.projectedEndBalance}
          </p>
        </motion.div>

        {/* Card 4: Upcoming Obligations (Lilac Pastel) */}
        <motion.div
          whileHover={{ y: -3 }}
          className="neo-card p-5 bg-[#F3E8FF]/80 border-purple-200/80 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
              Fixed Obligations
            </span>
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-purple-900 shadow-xs">
              <CreditCard size={16} />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-zinc-900 font-display">
              ₹{effectiveMetrics.unpaidCommitmentsTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-purple-900 font-semibold">
              pending
            </span>
          </div>

          <div className="mt-2 text-[11px] text-purple-900/90 font-semibold flex items-center gap-1">
            <span>Burn rate: ~₹{effectiveMetrics.burnRateDaily}/day</span>
          </div>

          <p className="mt-2 text-[11px] text-purple-900/80 font-medium">
            Rent, utilities, and subscriptions protected in reserve.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
