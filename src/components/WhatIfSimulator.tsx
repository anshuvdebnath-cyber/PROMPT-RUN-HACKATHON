import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, X, Sliders, AlertTriangle } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { TransactionCategory } from '../types/finance'
import { Mascot } from './Mascot'

export const WhatIfSimulator: React.FC = () => {
  const {
    simulation,
    startSimulation,
    commitSimulation,
    clearSimulation,
    effectiveMetrics,
    metrics,
  } = useFinance()

  const [amount, setAmount] = useState<number>(850)
  const [title, setTitle] = useState<string>('Weekend Cafe & Sizzler Outing')
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining')
  const [type, setType] = useState<'expense' | 'income'>('expense')

  const quickPresets = [
    {
      title: 'Midnight Zomato Treat',
      amount: 420,
      category: 'Food & Dining' as TransactionCategory,
      type: 'expense' as const,
      icon: '🍕',
    },
    {
      title: 'Trendy Streetwear Drops',
      amount: 1800,
      category: 'Shopping & Essentials' as TransactionCategory,
      type: 'expense' as const,
      icon: '👟',
    },
    {
      title: 'Weekend Music Gig Entry',
      amount: 1200,
      category: 'Entertainment & Outings' as TransactionCategory,
      type: 'expense' as const,
      icon: '🎸',
    },
    {
      title: 'Freelance UI Design Gig',
      amount: 2000,
      category: 'Side Gig / Inflow' as TransactionCategory,
      type: 'income' as const,
      icon: '💻',
    },
  ]

  const handleApplySimulation = () => {
    if (amount <= 0) return
    startSimulation(amount, title, category, type)
  }

  const handleSelectPreset = (p: typeof quickPresets[0]) => {
    setTitle(p.title)
    setAmount(p.amount)
    setCategory(p.category)
    setType(p.type)
    startSimulation(p.amount, p.title, p.category, p.type)
  }

  return (
    <div
      className="neo-card p-6 bg-white relative overflow-hidden border-2 border-black/10"
      id="what-if-simulator"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-zinc-900">
              What-If Decision Simulator
            </h3>
            <p className="text-xs text-zinc-500">
              Simulate spending or income trade-offs before pulling the trigger.
            </p>
          </div>
        </div>

        {simulation.isActive && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-950 flex items-center gap-1.5 animate-pulse">
            <Sliders size={13} />
            Live Sandbox Active
          </span>
        )}
      </div>

      {/* Quick Gen Z Preset Buttons */}
      <div className="mt-4">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
          Test Quick Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all flex items-center gap-1.5 border border-black/5"
            >
              <span>{p.icon}</span>
              <span>{p.title}</span>
              <span className="text-zinc-500 font-bold">
                ({p.type === 'income' ? '+' : '-'}₹{p.amount})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Simulation Controls */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-zinc-50/70 p-4 rounded-2xl border border-black/5">
        <div className="md:col-span-5">
          <label className="text-xs font-bold text-zinc-600 block mb-1">
            Decision Description
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Buying concert tickets"
            className="w-full px-3.5 py-2 rounded-xl text-sm font-medium bg-white border border-black/10 focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-bold text-zinc-600 block mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            min={10}
            max={10000}
            step={50}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3.5 py-2 rounded-xl text-sm font-bold bg-white border border-black/10 focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-zinc-600 block mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'expense' | 'income')}
            className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white border border-black/10 focus:outline-hidden"
          >
            <option value="expense">Expense (-)</option>
            <option value="income">Inflow (+)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            onClick={handleApplySimulation}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <Sparkles size={14} />
            <span>Simulate</span>
          </button>
        </div>
      </div>

      {/* Range Slider for quick tweaking */}
      <div className="mt-3 px-1 flex items-center gap-3">
        <span className="text-[11px] font-bold text-zinc-400">₹50</span>
        <input
          type="range"
          min={50}
          max={4000}
          step={50}
          value={amount}
          onChange={(e) => {
            const val = Number(e.target.value)
            setAmount(val)
            if (simulation.isActive) {
              startSimulation(val, title, category, type)
            }
          }}
          className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
        />
        <span className="text-[11px] font-bold text-zinc-400">₹4,000</span>
      </div>

      {/* Simulation Result & Consequence Preview Box */}
      <AnimatePresence>
        {simulation.isActive && simulation.impactSummary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-5 p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/70"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
              <div className="flex items-center gap-3">
                <Mascot mood={effectiveMetrics.mascotMood} size={50} />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Projected Outcome If Executed
                  </span>
                  <h4 className="text-base font-extrabold text-zinc-900 font-display">
                    {simulation.impactSummary.verdict}
                  </h4>
                </div>
              </div>

              {simulation.impactSummary.riskChange !== 'Unchanged' && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-200 text-rose-900 border border-rose-300 flex items-center gap-1">
                  <AlertTriangle size={13} />
                  Risk Shift: {simulation.impactSummary.riskChange}
                </span>
              )}
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200">
                <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                  Balance
                </span>
                <span className="text-xs text-zinc-500 line-through">
                  ₹{metrics.currentBalance}
                </span>
                <span className="text-sm font-extrabold text-zinc-900 block">
                  ₹{effectiveMetrics.currentBalance}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200">
                <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                  Daily Cap
                </span>
                <span className="text-xs text-zinc-500 line-through">
                  ₹{metrics.dynamicDailyAllowance}/d
                </span>
                <span className="text-sm font-extrabold text-zinc-900 block">
                  ₹{effectiveMetrics.dynamicDailyAllowance}/d
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200">
                <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                  Health Score
                </span>
                <span className="text-xs text-zinc-500 line-through">
                  {metrics.score}
                </span>
                <span className="text-sm font-extrabold text-zinc-900 block">
                  {effectiveMetrics.score}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200">
                <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                  Survival Rate
                </span>
                <span className="text-xs text-zinc-500 line-through">
                  {metrics.survivalProbability}%
                </span>
                <span className="text-sm font-extrabold text-zinc-900 block">
                  {effectiveMetrics.survivalProbability}%
                </span>
              </div>
            </div>

            {/* Decision Commit / Discard Actions */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-amber-200">
              <button
                onClick={clearSimulation}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 bg-white hover:bg-zinc-100 border border-black/10 flex items-center gap-1.5 transition-all"
              >
                <X size={14} />
                <span>Discard Simulation</span>
              </button>

              <button
                onClick={commitSimulation}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Check size={14} />
                <span>Confirm & Commit to Ledger</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
