import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Flame, ShieldCheck, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const MetricCards: React.FC = () => {
  const { effectiveMetrics, simulation, currentDay } = useFinance()
  const daysLeft = Math.max(1, 30 - currentDay + 1)

  return (
    <section className="w-full my-4" aria-label="Key financial metrics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Liquid Balance */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-[26px] p-5 bg-[#FEFCE8] border border-amber-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
              Liquid Balance
            </span>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-amber-900 shadow-2xs">
              <Wallet size={16} />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-3xl font-extrabold text-zinc-900 font-display tracking-tight">
                ₹{effectiveMetrics.currentBalance.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-amber-900/70 font-bold">
                / ₹10k
              </span>
            </div>
            <p className="text-[11px] font-semibold text-amber-900/70 mt-0.5">
              Available liquid spending pool
            </p>
          </div>

          {simulation.isActive && simulation.impactSummary && (
            <div
              className={`mt-2 text-[10px] font-extrabold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 w-fit ${
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
        </motion.div>

        {/* Card 2: Dynamic Safe Daily Allowance */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-[26px] p-5 bg-[#FFF1F2] border border-rose-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-950">
              Safe Daily Cap
            </span>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-rose-900 shadow-2xs">
              <Flame size={16} />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-3xl font-extrabold text-zinc-900 font-display tracking-tight">
                ₹{effectiveMetrics.dynamicDailyAllowance}
              </span>
              <span className="text-xs text-rose-900/70 font-bold">
                / day
              </span>
            </div>
            <p className="text-[11px] font-semibold text-rose-900/70 mt-0.5">
              Target spend for {daysLeft} remaining days
            </p>
          </div>

          {simulation.isActive && simulation.impactSummary && (
            <div
              className={`mt-2 text-[10px] font-extrabold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 w-fit ${
                simulation.impactSummary.dailyAllowanceDelta < 0
                  ? 'bg-rose-200 text-rose-950'
                  : 'bg-emerald-200 text-emerald-950'
              }`}
            >
              <span>
                {simulation.impactSummary.dailyAllowanceDelta < 0 ? 'Drops by ' : 'Adds '}
                ₹{Math.abs(simulation.impactSummary.dailyAllowanceDelta)}/day
              </span>
            </div>
          )}
        </motion.div>

        {/* Card 3: Survival Probability */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-[26px] p-5 bg-[#ECFDF5] border border-emerald-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
              Survival Rate
            </span>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-emerald-900 shadow-2xs">
              <ShieldCheck size={16} />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl font-extrabold text-zinc-900 font-display tracking-tight">
                {effectiveMetrics.survivalProbability}%
              </span>
              <span
                className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
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
            <p className="text-[11px] font-semibold text-emerald-900/70 mt-0.5">
              Projected Day 30: ₹{effectiveMetrics.projectedEndBalance}
            </p>
          </div>
        </motion.div>

        {/* Card 4: Upcoming Liabilities */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-[26px] p-5 bg-[#F5F3FF] border border-purple-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950">
              Fixed Obligations
            </span>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-purple-900 shadow-2xs">
              <CreditCard size={16} />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-3xl font-extrabold text-zinc-900 font-display tracking-tight">
                ₹{effectiveMetrics.unpaidCommitmentsTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-purple-900/70 font-bold">
                reserved
              </span>
            </div>
            <p className="text-[11px] font-semibold text-purple-900/70 mt-0.5">
              Protected pool for rent & bills
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
