import { createContext, useContext } from 'react'
import {
  Commitment,
  FinancialHealthMetrics,
  SavingsGoal,
  SimulationState,
  Subscription,
  Transaction,
  TransactionCategory,
  UnexpectedEvent,
} from '../types/finance'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type: 'info' | 'warning' | 'danger' | 'success'
}

export interface FinanceContextType {
  currentDay: number
  transactions: Transaction[]
  commitments: Commitment[]
  subscriptions: Subscription[]
  savingsGoals: SavingsGoal[]
  simulation: SimulationState
  metrics: FinancialHealthMetrics
  effectiveMetrics: FinancialHealthMetrics
  toasts: ToastMessage[]
  addTransaction: (
    title: string,
    amount: number,
    category: TransactionCategory,
    type: 'expense' | 'income',
    day?: number
  ) => void
  deleteTransaction: (id: string) => void
  toggleCommitmentPaid: (id: string) => void
  toggleCommitmentPaused: (id: string) => void
  toggleSubscriptionActive: (id: string) => void
  advanceDay: () => void
  setDay: (day: number) => void
  depositToSavings: (goalId: string, amount: number) => void
  triggerSurpriseEvent: (event: UnexpectedEvent) => void
  startSimulation: (
    amount: number,
    title: string,
    category: TransactionCategory,
    type: 'expense' | 'income'
  ) => void
  commitSimulation: () => void
  clearSimulation: () => void
  loadPresetScenario: (preset: 'fresh' | 'mid' | 'survivor') => void
  resetAll: () => void
  dismissToast: (id: string) => void
}

export const FinanceContext = createContext<FinanceContextType | null>(null)

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) {
    throw new Error('useFinance must be used within FinanceProvider')
  }
  return ctx
}
