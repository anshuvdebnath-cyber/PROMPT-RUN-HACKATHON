export type TransactionCategory =
  | 'Food & Dining'
  | 'Transport & Commute'
  | 'Entertainment & Outings'
  | 'Bills & Utilities'
  | 'Shopping & Essentials'
  | 'Unexpected & Emergency'
  | 'Subscriptions'
  | 'Savings & Investments'
  | 'Side Gig / Inflow'

export type MascotMood =
  | 'excited'
  | 'joyful'
  | 'grateful'
  | 'energized'
  | 'sensitive'
  | 'confused'
  | 'bored'
  | 'stressed'
  | 'angry'
  | 'insecure'
  | 'hurt'
  | 'guilty'

export interface Transaction {
  id: string
  day: number
  title: string
  amount: number
  category: TransactionCategory
  type: 'expense' | 'income'
  isSimulated?: boolean
  timestamp: string
}

export interface Commitment {
  id: string
  title: string
  amount: number
  dueDay: number
  category: 'rent' | 'wifi' | 'debt' | 'utility' | 'groceries'
  isPaid: boolean
  isPaused?: boolean
  description: string
}

export interface Subscription {
  id: string
  name: string
  amount: number
  renewalDay: number
  isActive: boolean
  category: 'music' | 'ott' | 'fitness' | 'cloud' | 'gaming'
}

export interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  color: string
}

export interface UnexpectedEvent {
  id: string
  title: string
  description: string
  amount: number // Negative = unexpected expense shock, Positive = windfall reward
  category: TransactionCategory
  severity: 'low' | 'medium' | 'high' | 'critical' | 'bonus'
  suggestedDay: number
  consequenceText: string
}

export interface FinancialHealthMetrics {
  score: number // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  riskLevel: 'Safe' | 'Moderate' | 'High Alert' | 'Critical Doom'
  survivalProbability: number // 0 to 100%
  currentBalance: number
  spentSoFar: number
  dynamicDailyAllowance: number
  burnRateDaily: number
  unpaidCommitmentsTotal: number
  projectedEndBalance: number
  savingsProgressPercent: number
  mascotMood: MascotMood
  quip: string
}

export interface SimulationState {
  isActive: boolean
  proposedAmount: number
  proposedTitle: string
  proposedCategory: TransactionCategory
  proposedType: 'expense' | 'income'
  simulatedMetrics: FinancialHealthMetrics | null
  impactSummary: {
    balanceDelta: number
    dailyAllowanceDelta: number
    scoreDelta: number
    survivalDelta: number
    verdict: string
    riskChange: string
  } | null
}
