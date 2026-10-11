import React, { useMemo, useState } from 'react'
import DOMPurify from 'dompurify'
import {
  Commitment,
  SavingsGoal,
  SimulationState,
  Subscription,
  Transaction,
  TransactionCategory,
  UnexpectedEvent,
} from '../types/finance'
import {
  DEFAULT_COMMITMENTS,
  DEFAULT_SAVINGS_GOALS,
  DEFAULT_SUBSCRIPTIONS,
  DEFAULT_TRANSACTIONS,
} from '../data/mockData'
import {
  calculateBalance,
  calculateTotalSpent,
  evaluateFinancialHealth,
  INITIAL_MONTHLY_BUDGET,
} from '../engine/financeEngine'
import { runWhatIfSimulation } from '../engine/simulationEngine'
import { FinanceContext, ToastMessage } from './useFinance'

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDay, setCurrentDay] = useState<number>(1)
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS)
  const [commitments, setCommitments] = useState<Commitment[]>(DEFAULT_COMMITMENTS)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(DEFAULT_SUBSCRIPTIONS)
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(DEFAULT_SAVINGS_GOALS)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const [simulation, setSimulation] = useState<SimulationState>({
    isActive: false,
    proposedAmount: 0,
    proposedTitle: '',
    proposedCategory: 'Food & Dining',
    proposedType: 'expense',
    simulatedMetrics: null,
    impactSummary: null,
  })

  // Tracks auto-posted subscription renewals ("${subId}@day${n}") so each
  // renewal hits the ledger exactly once, even if the user scrubs the slider.
  const [chargedRenewals, setChargedRenewals] = useState<string[]>([])

  // Sanitize helper to protect against XSS or HTML injection in inputs
  const sanitizeText = (input: string): string => {
    return DOMPurify.sanitize(input.trim())
  }

  const addToast = (
    title: string,
    type: ToastMessage['type'] = 'info',
    description?: string
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    setToasts((prev) => [...prev, { id, title, type, description }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Savings total
  const totalSavings = useMemo(() => {
    return savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0)
  }, [savingsGoals])

  const totalSavingsTarget = useMemo(() => {
    return savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0)
  }, [savingsGoals])

  // Derive Real Financial Health Metrics
  const metrics = useMemo(() => {
    const balance = calculateBalance(INITIAL_MONTHLY_BUDGET, transactions)
    const spent = calculateTotalSpent(transactions)
    return evaluateFinancialHealth(
      currentDay,
      balance,
      spent,
      commitments,
      subscriptions,
      totalSavings,
      totalSavingsTarget
    )
  }, [currentDay, transactions, commitments, subscriptions, totalSavings, totalSavingsTarget])

  // Effective metrics (displays simulation values if simulation preview is active)
  const effectiveMetrics = useMemo(() => {
    if (simulation.isActive && simulation.simulatedMetrics) {
      return simulation.simulatedMetrics
    }
    return metrics
  }, [simulation, metrics])

  // Handlers
  const addTransaction = (
    rawTitle: string,
    rawAmount: number,
    category: TransactionCategory,
    type: 'expense' | 'income',
    customDay?: number
  ) => {
    const title = sanitizeText(rawTitle) || (type === 'income' ? 'Income' : 'Expense')
    const amount = Math.max(1, Math.round(Number(rawAmount) || 0))
    const day = customDay !== undefined ? Math.max(1, Math.min(30, customDay)) : currentDay

    const newTx: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      day,
      title,
      amount,
      category,
      type,
      timestamp: new Date().toISOString(),
    }

    setTransactions((prev) => [newTx, ...prev])
    addToast(
      `${type === 'expense' ? 'Spent' : 'Received'} ₹${amount}`,
      type === 'expense' ? 'info' : 'success',
      `"${title}" recorded on Day ${day}`
    )
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id))
    addToast('Transaction removed', 'info')
  }

  const toggleCommitmentPaid = (id: string) => {
    setCommitments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.isPaid
          addToast(
            nextState ? `Paid ₹${c.amount}` : `Marked unpaid: ${c.title}`,
            nextState ? 'success' : 'info'
          )
          return { ...c, isPaid: nextState }
        }
        return c
      })
    )
  }

  const toggleCommitmentPaused = (id: string) => {
    setCommitments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.isPaused
          addToast(
            nextState ? `Paused ${c.title}` : `Resumed ${c.title}`,
            nextState ? 'warning' : 'info'
          )
          return { ...c, isPaused: nextState }
        }
        return c
      })
    )
  }

  const toggleSubscriptionActive = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.isActive
          addToast(
            nextState ? `Renewed ${s.name}` : `Paused ${s.name} (+₹${s.amount}/mo saved)`,
            nextState ? 'info' : 'success'
          )
          return { ...s, isActive: nextState }
        }
        return s
      })
    )
  }

  const advanceDay = () => {
    if (currentDay >= 30) {
      addToast('Month Complete! You survived all 30 days! 🎉', 'success')
      return
    }
    const nextDay = currentDay + 1
    setCurrentDay(nextDay)

    // Real product behavior: active subscriptions renewing today auto-charge
    // the ledger (each exactly once), so time visibly moves money → balance →
    // allowance → risk → mascot. Slider scrubbing never backfills.
    const dueRenewals = subscriptions.filter(
      (s) =>
        s.isActive &&
        s.renewalDay === nextDay &&
        !chargedRenewals.includes(`${s.id}@day${nextDay}`)
    )
    if (dueRenewals.length > 0) {
      const now = new Date().toISOString()
      const renewalTxs: Transaction[] = dueRenewals.map((s) => ({
        id: `auto-renew-${s.id}-day${nextDay}`,
        day: nextDay,
        title: `🔁 ${s.name} Renewed`,
        amount: s.amount,
        category: 'Subscriptions' as TransactionCategory,
        type: 'expense' as const,
        timestamp: now,
      }))
      setTransactions((prev) => [...renewalTxs, ...prev])
      setChargedRenewals((prev) => [
        ...prev,
        ...dueRenewals.map((s) => `${s.id}@day${nextDay}`),
      ])
      const total = dueRenewals.reduce((sum, s) => sum + s.amount, 0)
      addToast(
        `Auto-renewed ${dueRenewals.length} subscription${dueRenewals.length > 1 ? 's' : ''} (−₹${total})`,
        'warning',
        dueRenewals.map((s) => s.name).join(', ') + ` charged on Day ${nextDay}`
      )
    }

    // Overdue commitments become visible consequences the day they lapse
    const newlyOverdue = commitments.filter(
      (c) => !c.isPaid && !c.isPaused && c.dueDay === currentDay
    )
    if (newlyOverdue.length > 0) {
      addToast(
        `⚠️ ${newlyOverdue.length} bill${newlyOverdue.length > 1 ? 's' : ''} now overdue`,
        'danger',
        newlyOverdue.map((c) => `${c.title} (₹${c.amount}, due Day ${c.dueDay})`).join('; ')
      )
    }

    addToast(`Advanced to Day ${nextDay} of 30`, 'info')
  }

  const setDay = (day: number) => {
    const clamped = Math.max(1, Math.min(30, day))
    setCurrentDay(clamped)
  }

  const depositToSavings = (goalId: string, amount: number) => {
    if (amount <= 0 || metrics.currentBalance < amount) {
      addToast('Insufficient funds to transfer into savings stash', 'danger')
      return
    }

    setSavingsGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g))
    )

    // Add a transaction representing transfer
    addTransaction('Stashed into Savings Cushion', amount, 'Savings & Investments', 'expense')
    addToast(`Transferred ₹${amount} to savings cushion! 🛡️`, 'success')
  }

  const triggerSurpriseEvent = (event: UnexpectedEvent) => {
    if (event.amount < 0) {
      addTransaction(
        `🚨 ${event.title}`,
        Math.abs(event.amount),
        event.category,
        'expense'
      )
      addToast(`Shock Event: ${event.title}`, 'danger', event.consequenceText)
    } else {
      addTransaction(
        `✨ ${event.title}`,
        event.amount,
        event.category,
        'income'
      )
      addToast(`Surprise Inflow: ${event.title}`, 'success', event.consequenceText)
    }
  }

  const startSimulation = (
    amount: number,
    rawTitle: string,
    category: TransactionCategory,
    type: 'expense' | 'income'
  ) => {
    const title = sanitizeText(rawTitle) || 'Simulated Action'
    const res = runWhatIfSimulation({
      currentDay,
      transactions,
      commitments,
      subscriptions,
      savingsAmount: totalSavings,
      savingsTarget: totalSavingsTarget,
      proposedAmount: amount,
      proposedTitle: title,
      proposedCategory: category,
      proposedType: type,
    })

    setSimulation({
      isActive: true,
      proposedAmount: amount,
      proposedTitle: title,
      proposedCategory: category,
      proposedType: type,
      simulatedMetrics: res.simulatedMetrics,
      impactSummary: {
        balanceDelta: res.balanceDelta,
        dailyAllowanceDelta: res.dailyAllowanceDelta,
        scoreDelta: res.scoreDelta,
        survivalDelta: res.survivalDelta,
        verdict: res.verdict,
        riskChange: res.riskChange,
      },
    })
  }

  const commitSimulation = () => {
    if (!simulation.isActive || simulation.proposedAmount <= 0) return
    addTransaction(
      simulation.proposedTitle,
      simulation.proposedAmount,
      simulation.proposedCategory,
      simulation.proposedType
    )
    clearSimulation()
    addToast('Simulation committed to actual ledger!', 'success')
  }

  const clearSimulation = () => {
    setSimulation({
      isActive: false,
      proposedAmount: 0,
      proposedTitle: '',
      proposedCategory: 'Food & Dining',
      proposedType: 'expense',
      simulatedMetrics: null,
      impactSummary: null,
    })
  }

  const loadPresetScenario = (preset: 'fresh' | 'mid' | 'survivor') => {
    clearSimulation()
    setChargedRenewals([])
    if (preset === 'fresh') {
      setCurrentDay(1)
      setTransactions(DEFAULT_TRANSACTIONS)
      setCommitments(DEFAULT_COMMITMENTS)
      setSubscriptions(DEFAULT_SUBSCRIPTIONS)
      setSavingsGoals(DEFAULT_SAVINGS_GOALS)
      addToast('Reset to Day 1: The Fresh Start', 'info')
    } else if (preset === 'mid') {
      setCurrentDay(15)
      setCommitments((prev) =>
        prev.map((c) => (c.dueDay <= 10 ? { ...c, isPaid: true } : c))
      )
      setTransactions([
        {
          id: 'preset-mid-1',
          day: 3,
          title: 'Hostel Rent Split',
          amount: 3500,
          category: 'Bills & Utilities',
          type: 'expense',
          timestamp: '2026-10-03',
        },
        {
          id: 'preset-mid-2',
          day: 8,
          title: 'Groceries & Meal Prepping',
          amount: 1100,
          category: 'Food & Dining',
          type: 'expense',
          timestamp: '2026-10-08',
        },
        {
          id: 'preset-mid-3',
          day: 12,
          title: 'Sudden Pharmacy Meds',
          amount: 650,
          category: 'Unexpected & Emergency',
          type: 'expense',
          timestamp: '2026-10-12',
        },
      ])
      addToast('Loaded Scenario: Mid-Month Squeeze (Day 15)', 'warning')
    } else {
      // survivor
      setCurrentDay(26)
      setCommitments((prev) => prev.map((c) => ({ ...c, isPaid: true })))
      setTransactions([
        {
          id: 'surv-1',
          day: 5,
          title: 'Rent & Bills Cleared',
          amount: 4500,
          category: 'Bills & Utilities',
          type: 'expense',
          timestamp: '2026-10-05',
        },
        {
          id: 'surv-2',
          day: 15,
          title: 'Living & Food Expenses',
          amount: 3200,
          category: 'Food & Dining',
          type: 'expense',
          timestamp: '2026-10-15',
        },
        {
          id: 'surv-3',
          day: 22,
          title: 'Laptop Charger Replacement',
          amount: 950,
          category: 'Shopping & Essentials',
          type: 'expense',
          timestamp: '2026-10-22',
        },
      ])
      addToast('Loaded Scenario: Paycheck Survivor (Day 26 - ₹1,350 left!)', 'danger')
    }
  }

  const resetAll = () => {
    loadPresetScenario('fresh')
  }

  return (
    <FinanceContext.Provider
      value={{
        currentDay,
        transactions,
        commitments,
        subscriptions,
        savingsGoals,
        simulation,
        metrics,
        effectiveMetrics,
        toasts,
        addTransaction,
        deleteTransaction,
        toggleCommitmentPaid,
        toggleCommitmentPaused,
        toggleSubscriptionActive,
        advanceDay,
        setDay,
        depositToSavings,
        triggerSurpriseEvent,
        startSimulation,
        commitSimulation,
        clearSimulation,
        loadPresetScenario,
        resetAll,
        dismissToast,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

