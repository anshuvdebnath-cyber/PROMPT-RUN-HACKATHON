import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Flame, ShieldCheck, ReceiptText, TrendingUp, TrendingDown } from 'lucide-react'
import { useFinance } from '../context/useFinance'

interface StatProps {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  bg: string
  fg: string
  soft: string
  badge?: React.ReactNode
  delay?: number
}

const Stat: React.FC<StatProps> = ({ label, value, sub, icon, bg, fg, soft, badge, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className="card p-4 sm:p-5 flex flex-col justify-between gap-3 min-w-0 min-h-[150px]"
  >
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] truncate" style={{ color: 'var(--text-3)' }}>
        {label}
      </span>
      <span className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg, color: fg }}>
        {icon}
      </span>
    </div>
    <div className="min-w-0">
      <p className="font-display font-bold leading-none truncate" style={{ fontSize: 'clamp(1.55rem, 4vw, 2.1rem)' }}>{value}</p>
      <p className="text-xs font-semibold mt-1 truncate" style={{ color: 'var(--text-2)' }}>{sub}</p>
      {badge && <div className="mt-2">{badge}</div>}
    </div>
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: soft }}>
      <div className="h-full w-full rounded-full opacity-60" style={{ background: fg }} />
    </div>
  </motion.div>
)

export const MetricCards: React.FC = () => {
  const { effectiveMetrics, simulation, currentDay } = useFinance()
  const daysLeft = Math.max(1, 30 - currentDay + 1)

  const delta = (d: number, suffix = '') => (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold"
      style={{ background: d < 0 ? '#FFE4E6' : '#D9F5E5', color: d < 0 ? '#9F1239' : '#065F46' }}
    >
      {d < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
      {d < 0 ? '-' : '+'}₹{Math.abs(d)}{suffix}
    </span>
  )

  const riskChip = (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold"
      style={
        effectiveMetrics.riskLevel === 'Safe'
          ? { background: '#D9F5E5', color: '#065F46' }
          : effectiveMetrics.riskLevel === 'Moderate'
            ? { background: '#FFF3C4', color: '#854D0E' }
            : { background: '#FFE4E6', color: '#9F1239' }
      }
    >
      {effectiveMetrics.riskLevel} risk
    </span>
  )

  return (
    <section aria-label="Key metrics">
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5">
        <Stat
          delay={0}
          label="Liquid balance"
          value={`₹${effectiveMetrics.currentBalance.toLocaleString('en-IN')}`}
          sub="Cash you can touch"
          icon={<Wallet size={18} />}
          bg="#FFF3C4" fg="#854D0E" soft="#FEF6DC"
          badge={simulation.isActive && simulation.impactSummary ? delta(simulation.impactSummary.balanceDelta) : undefined}
        />
        <Stat
          delay={0.06}
          label="Daily cap"
          value={`₹${effectiveMetrics.dynamicDailyAllowance}`}
          sub={`${daysLeft} days to cover`}
          icon={<Flame size={18} />}
          bg="#FFE4E6" fg="#9F1239" soft="#FFF0F1"
          badge={simulation.isActive && simulation.impactSummary ? delta(simulation.impactSummary.dailyAllowanceDelta, '/day') : undefined}
        />
        <Stat
          delay={0.12}
          label="Survival odds"
          value={`${effectiveMetrics.survivalProbability}%`}
          sub={`Ends at ₹${effectiveMetrics.projectedEndBalance.toLocaleString('en-IN')}`}
          icon={<ShieldCheck size={18} />}
          bg="#D9F5E5" fg="#065F46" soft="#EAF9F1"
          badge={riskChip}
        />
        <Stat
          delay={0.18}
          label="Locked bills"
          value={`₹${effectiveMetrics.unpaidCommitmentsTotal.toLocaleString('en-IN')}`}
          sub="Rent, Wi-Fi + dues"
          icon={<ReceiptText size={18} />}
          bg="#E9E4FF" fg="#5B21B6" soft="#F2EFFE"
        />
      </div>
    </section>
  )
}
