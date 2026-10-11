import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Flame, ShieldCheck, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { useFinance } from '../context/useFinance'

interface StatCardProps {
  label:    string
  value:    string
  sub?:     string
  icon:     React.ReactNode
  bg:       string
  accent:   string
  textClr:  string
  badge?:   React.ReactNode
  delay?:   number
}

const StatCard: React.FC<StatCardProps> = ({
  label, value, sub, icon, bg, accent, textClr, badge, delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
    className="flex flex-col justify-between rounded-[var(--r-xl)] p-6 sm:p-7 border"
    style={{
      background:   bg,
      borderColor:  accent,
      boxShadow:    'var(--shadow-card)',
      minHeight:    180,
      transition:   'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1)',
    }}
  >
    {/* Top row */}
    <div className="flex items-center justify-between mb-4">
      <span
        className="text-[11px] font-extrabold uppercase tracking-widest"
        style={{ color: textClr, opacity: 0.7 }}
      >
        {label}
      </span>
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.85)', color: textClr }}
      >
        {icon}
      </div>
    </div>

    {/* Value */}
    <div>
      <div
        className="font-display font-extrabold tracking-tight leading-none mb-1"
        style={{
          fontSize:   'clamp(1.8rem, 4vw, 2.8rem)',
          color:      'var(--text-1)',
        }}
      >
        {value}
      </div>
      {sub && (
        <p className="text-xs font-semibold mt-1.5" style={{ color: textClr, opacity: 0.75 }}>
          {sub}
        </p>
      )}
      {badge && <div className="mt-3">{badge}</div>}
    </div>
  </motion.div>
)

export const MetricCards: React.FC = () => {
  const { effectiveMetrics, simulation, currentDay } = useFinance()
  const daysLeft = Math.max(1, 30 - currentDay + 1)

  const deltaBadge = (delta: number, suffix = '') => (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold"
      style={{
        background: delta < 0 ? '#FFE4E6' : '#D4F5E2',
        color:      delta < 0 ? '#9F1239' : '#065F46',
      }}
    >
      {delta < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
      {delta < 0 ? '-' : '+'}₹{Math.abs(delta)}{suffix}
    </span>
  )

  return (
    <section aria-label="Key financial metrics">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* 1 – Liquid Balance */}
        <StatCard
          delay={0}
          label="Liquid Balance"
          value={`₹${effectiveMetrics.currentBalance.toLocaleString('en-IN')}`}
          sub="Active cash pool remaining"
          icon={<Wallet size={18} />}
          bg="var(--butter)"
          accent="var(--butter-accent)"
          textClr="#7A5E00"
          badge={
            simulation.isActive && simulation.impactSummary
              ? deltaBadge(simulation.impactSummary.balanceDelta, ' if committed')
              : undefined
          }
        />

        {/* 2 – Safe Daily Cap */}
        <StatCard
          delay={0.06}
          label="Safe Daily Cap"
          value={`₹${effectiveMetrics.dynamicDailyAllowance}`}
          sub={`Allowance for ${daysLeft} remaining days`}
          icon={<Flame size={18} />}
          bg="var(--rose)"
          accent="var(--rose-accent)"
          textClr="#9F1239"
          badge={
            simulation.isActive && simulation.impactSummary
              ? deltaBadge(simulation.impactSummary.dailyAllowanceDelta, '/day')
              : undefined
          }
        />

        {/* 3 – Survival Odds */}
        <StatCard
          delay={0.12}
          label="Survival Odds"
          value={`${effectiveMetrics.survivalProbability}%`}
          sub={`Projected D30: ₹${effectiveMetrics.projectedEndBalance.toLocaleString('en-IN')}`}
          icon={<ShieldCheck size={18} />}
          bg="var(--mint)"
          accent="var(--mint-accent)"
          textClr="#065F46"
          badge={
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold"
              style={{
                background:
                  effectiveMetrics.riskLevel === 'Safe'
                    ? '#D4F5E2'
                    : effectiveMetrics.riskLevel === 'Moderate'
                    ? '#FFF7C2'
                    : '#FFE4E6',
                color:
                  effectiveMetrics.riskLevel === 'Safe'
                    ? '#065F46'
                    : effectiveMetrics.riskLevel === 'Moderate'
                    ? '#7A5E00'
                    : '#9F1239',
              }}
            >
              {effectiveMetrics.riskLevel} Risk
            </span>
          }
        />

        {/* 4 – Fixed Obligations */}
        <StatCard
          delay={0.18}
          label="Fixed Obligations"
          value={`₹${effectiveMetrics.unpaidCommitmentsTotal.toLocaleString('en-IN')}`}
          sub="Reserved for rent & Wi-Fi"
          icon={<CreditCard size={18} />}
          bg="var(--lilac)"
          accent="var(--lilac-accent)"
          textClr="#4C1D95"
        />
      </div>
    </section>
  )
}
