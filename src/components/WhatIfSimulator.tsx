import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Sliders, AlertTriangle, ArrowRight, Check, X } from 'lucide-react'
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
      tag: 'Food',
    },
    {
      title: 'Trendy Streetwear Drops',
      amount: 1800,
      category: 'Shopping & Essentials' as TransactionCategory,
      type: 'expense' as const,
      icon: '👟',
      tag: 'Shopping',
    },
    {
      title: 'Weekend Music Gig Entry',
      amount: 1200,
      category: 'Entertainment & Outings' as TransactionCategory,
      type: 'expense' as const,
      icon: '🎸',
      tag: 'Outing',
    },
    {
      title: 'Freelance UI Design Gig',
      amount: 2000,
      category: 'Side Gig / Inflow' as TransactionCategory,
      type: 'income' as const,
      icon: '💻',
      tag: 'Inflow',
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

  const handleQuickAdd = (delta: number) => {
    const nextAmount = Math.max(50, Math.min(10000, amount + delta))
    setAmount(nextAmount)
    if (simulation.isActive) {
      startSimulation(nextAmount, title, category, type)
    }
  }

  return (
    <div
      className="card p-6 sm:p-8 relative overflow-hidden"
      id="what-if-simulator"
      style={{ background: 'var(--canvas-card)' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-black/8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold shadow-2xs">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-zinc-900">
              What-If Decision Simulator
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium">
              Simulate spending or income trade-offs before pulling the trigger.
            </p>
          </div>
        </div>

        {simulation.isActive && (
          <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-300 text-amber-950 flex items-center gap-1.5 border border-amber-400 shadow-2xs animate-pulse">
            <Sliders size={13} />
            Live Sandbox Active
          </span>
        )}
      </div>

      {/* Quick Gen Z Preset Cards */}
      <div className="mt-6">
        <span className="text-[11px] font-extrabold uppercase tracking-wider block mb-3" style={{ color: 'var(--text-3)' }}>
          Quick Preset Scenarios:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickPresets.map((p, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectPreset(p)}
              className="p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer group"
              style={{ background: 'var(--canvas-inset)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xl">{p.icon}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-zinc-600 border border-black/5">
                  {p.tag}
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-xs font-bold text-zinc-900 block group-hover:text-amber-800 transition-colors">
                  {p.title}
                </span>
                <span className={`text-xs font-extrabold mt-0.5 block ${p.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {p.type === 'income' ? '+' : '-'}₹{p.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Simulation Controls */}
      <div className="mt-6 p-5 sm:p-6 rounded-[24px] border" style={{ background: 'var(--canvas-inset)', borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="text-xs font-extrabold block mb-1.5" style={{ color: 'var(--text-1)' }}>
              Decision Description
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekend Cafe Outing, New Jacket"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2"
              style={{ background: 'var(--canvas-card)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-extrabold text-zinc-700 block mb-1.5">
              Amount (₹)
            </label>
            <input
              type="number"
              min={10}
              max={10000}
              step={50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-extrabold focus:outline-none focus:ring-2"
              style={{ background: 'var(--canvas-card)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-extrabold text-zinc-700 block mb-1.5">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'expense' | 'income')}
              className="w-full px-3 py-2.5 rounded-xl text-xs font-extrabold focus:outline-none cursor-pointer"
              style={{ background: 'var(--canvas-card)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
            >
              <option value="expense">Expense (-)</option>
              <option value="income">Inflow (+)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleApplySimulation}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Simulate</span>
            </button>
          </div>
        </div>

        {/* Quick Amount Step Pills & Range Slider */}
        <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold" style={{ color: 'var(--text-3)' }}>Quick Adjust:</span>
            <button
              onClick={() => handleQuickAdd(100)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-black/10 hover:bg-zinc-100 text-zinc-800 shadow-2xs cursor-pointer"
            >
              +₹100
            </button>
            <button
              onClick={() => handleQuickAdd(250)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-black/10 hover:bg-zinc-100 text-zinc-800 shadow-2xs cursor-pointer"
            >
              +₹250
            </button>
            <button
              onClick={() => handleQuickAdd(500)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-black/10 hover:bg-zinc-100 text-zinc-800 shadow-2xs cursor-pointer"
            >
              +₹500
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-[11px] font-extrabold text-zinc-400">₹50</span>
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
              className="w-full accent-zinc-900 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
            />
            <span className="text-[11px] font-extrabold text-zinc-400">₹4k</span>
          </div>
        </div>
      </div>

      {/* Live Simulation Sandbox Outcome Card */}
      <AnimatePresence>
        {simulation.isActive && simulation.impactSummary && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-6 p-6 rounded-[26px] border-2 border-amber-300 bg-amber-50/80 shadow-md"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
              <div className="flex items-center gap-3.5">
                <Mascot mood={effectiveMetrics.mascotMood} size={55} />
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900">
                    Simulated Financial Consequence
                  </span>
                  <h4 className="text-lg font-extrabold text-zinc-900 font-display">
                    {simulation.impactSummary.verdict}
                  </h4>
                </div>
              </div>

              {simulation.impactSummary.riskChange !== 'Unchanged' && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-200 text-rose-950 border border-rose-300 flex items-center gap-1 shadow-2xs">
                  <AlertTriangle size={13} />
                  Risk Shift: {simulation.impactSummary.riskChange}
                </span>
              )}
            </div>

            {/* Side-by-Side Before vs After Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5 text-center">
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-[10px] font-extrabold text-zinc-400 block uppercase tracking-wider">
                  Liquid Balance
                </span>
                <span className="text-xs text-zinc-400 line-through font-semibold">
                  ₹{metrics.currentBalance.toLocaleString('en-IN')}
                </span>
                <span className="text-base font-extrabold text-zinc-900 block mt-0.5 font-display">
                  ₹{effectiveMetrics.currentBalance.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-[10px] font-extrabold text-zinc-400 block uppercase tracking-wider">
                  Safe Daily Cap
                </span>
                <span className="text-xs text-zinc-400 line-through font-semibold">
                  ₹{metrics.dynamicDailyAllowance}/d
                </span>
                <span className="text-base font-extrabold text-zinc-900 block mt-0.5 font-display">
                  ₹{effectiveMetrics.dynamicDailyAllowance}/d
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-[10px] font-extrabold text-zinc-400 block uppercase tracking-wider">
                  Survival Odds
                </span>
                <span className="text-xs text-zinc-400 line-through font-semibold">
                  {metrics.survivalProbability}%
                </span>
                <span className="text-base font-extrabold text-zinc-900 block mt-0.5 font-display">
                  {effectiveMetrics.survivalProbability}%
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-[10px] font-extrabold text-zinc-400 block uppercase tracking-wider">
                  Health Score
                </span>
                <span className="text-xs text-zinc-400 line-through font-semibold">
                  {metrics.score}/100
                </span>
                <span className="text-base font-extrabold text-zinc-900 block mt-0.5 font-display">
                  {effectiveMetrics.score}/100
                </span>
              </div>
            </div>

            {/* Gen Z Advice Callout */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/90 border border-amber-200/80 text-xs text-zinc-800 font-medium">
              💡 <span className="font-extrabold text-zinc-900">Trade-Off Analysis:</span>{' '}
              {effectiveMetrics.quip}
            </div>

            {/* Confirmation CTAs */}
            <div className="mt-5 pt-4 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={clearSimulation}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold text-zinc-700 hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <X size={14} />
                <span>Discard Simulation</span>
              </button>

              <button
                onClick={commitSimulation}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Check size={14} className="text-emerald-400" />
                <span>Confirm & Commit to Ledger</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
