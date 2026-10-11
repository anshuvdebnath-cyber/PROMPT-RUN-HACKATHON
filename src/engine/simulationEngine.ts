import {
  Commitment,
  FinancialHealthMetrics,
  Subscription,
  Transaction,
  TransactionCategory,
} from '../types/finance'
import {
  calculateBalance,
  calculateTotalSpent,
  evaluateFinancialHealth,
  INITIAL_MONTHLY_BUDGET,
} from './financeEngine'

export interface SimulationRequest {
  currentDay: number
  transactions: Transaction[]
  commitments: Commitment[]
  subscriptions: Subscription[]
  savingsAmount: number
  savingsTarget: number
  proposedAmount: number
  proposedTitle: string
  proposedCategory: TransactionCategory
  proposedType: 'expense' | 'income'
}

export interface SimulationResult {
  currentMetrics: FinancialHealthMetrics
  simulatedMetrics: FinancialHealthMetrics
  balanceDelta: number
  dailyAllowanceDelta: number
  scoreDelta: number
  survivalDelta: number
  monthlyForecastDelta: number
  savingsGoalImpact: string
  verdict: string
  riskChange: string
  suggestedMascotMood: FinancialHealthMetrics['mascotMood']
}

export function runWhatIfSimulation(req: SimulationRequest): SimulationResult {
  const currentBalance = calculateBalance(INITIAL_MONTHLY_BUDGET, req.transactions)
  const currentSpent = calculateTotalSpent(req.transactions)

  const currentMetrics = evaluateFinancialHealth(
    req.currentDay,
    currentBalance,
    currentSpent,
    req.commitments,
    req.subscriptions,
    req.savingsAmount,
    req.savingsTarget
  )

  const hypotheticalTx: Transaction = {
    id: 'simulated-tx',
    day: req.currentDay,
    title: req.proposedTitle,
    amount: req.proposedAmount,
    category: req.proposedCategory,
    type: req.proposedType,
    isSimulated: true,
    timestamp: new Date().toISOString(),
  }

  const simulatedTransactions = [...req.transactions, hypotheticalTx]
  const simulatedBalance = calculateBalance(INITIAL_MONTHLY_BUDGET, simulatedTransactions)
  // For burn rate projection: keep historical non-simulated spending to project forward rate,
  // while applying the one-off purchase directly to liquid balance
  const simulatedSpent = currentSpent

  const simulatedMetrics = evaluateFinancialHealth(
    req.currentDay,
    simulatedBalance,
    simulatedSpent,
    req.commitments,
    req.subscriptions,
    req.savingsAmount,
    req.savingsTarget
  )

  const balanceDelta = simulatedMetrics.currentBalance - currentMetrics.currentBalance
  const dailyAllowanceDelta =
    simulatedMetrics.dynamicDailyAllowance - currentMetrics.dynamicDailyAllowance
  const scoreDelta = simulatedMetrics.score - currentMetrics.score
  const survivalDelta =
    simulatedMetrics.survivalProbability - currentMetrics.survivalProbability

  let riskChange = 'Unchanged'
  if (simulatedMetrics.riskLevel !== currentMetrics.riskLevel) {
    riskChange = `${currentMetrics.riskLevel} → ${simulatedMetrics.riskLevel}`
  }

  // Generate tailored Gen Z simulation commentary
  let verdict = ''
  let suggestedMascotMood = simulatedMetrics.mascotMood

  if (req.proposedType === 'income') {
    verdict = `🎉 Nice! This gives you an extra +₹${req.proposedAmount}. Your daily spending room goes up by +₹${dailyAllowanceDelta}/day!`
    suggestedMascotMood = 'excited'
  } else {
    // Expense
    const daysLeft = Math.max(1, 30 - req.currentDay + 1)
    if (simulatedMetrics.currentBalance < 0) {
      verdict = `🛑 Hard STOP! Spending ₹${req.proposedAmount} will overdraft your ₹10k pool by ₹${Math.abs(simulatedMetrics.currentBalance)}. You will enter debt!`
      suggestedMascotMood = 'angry'
    } else if (simulatedMetrics.riskLevel === 'Critical Doom') {
      verdict = `🚨 Severe Risk! This wipes out your survival buffer. Daily allowance crashes to ₹${simulatedMetrics.dynamicDailyAllowance}/day for the next ${daysLeft} days.`
      suggestedMascotMood = 'stressed'
    } else if (Math.abs(dailyAllowanceDelta) >= 80) {
      verdict = `⚠️ Heavy toll: Daily cap drops from ₹${currentMetrics.dynamicDailyAllowance} to ₹${simulatedMetrics.dynamicDailyAllowance}/day for ${daysLeft} days. Are you sure?`
      suggestedMascotMood = 'angry'
    } else if (Math.abs(dailyAllowanceDelta) >= 30) {
      verdict = `🧐 Mild dent: You lose ~₹${Math.abs(dailyAllowanceDelta)}/day from your guilt-free spending, but commitments remain covered.`
      suggestedMascotMood = 'stressed'
    } else {
      verdict = `✅ Completely safe: ₹${req.proposedAmount} barely moves the needle. Your daily cap only shifts by -₹${Math.abs(dailyAllowanceDelta)}.`
      suggestedMascotMood = 'joyful'
    }
  }

  const monthlyForecastDelta =
    simulatedMetrics.projectedEndBalance - currentMetrics.projectedEndBalance

  let savingsGoalImpact = 'Savings cushion safe'
  if (simulatedBalance < req.savingsAmount) {
    savingsGoalImpact = `Threatens ₹${req.savingsAmount} emergency savings cushion!`
  } else if (req.proposedType === 'income') {
    savingsGoalImpact = `Can accelerate ₹${req.savingsTarget} savings target!`
  } else {
    savingsGoalImpact = `₹${req.savingsAmount} savings buffer remains protected.`
  }

  return {
    currentMetrics,
    simulatedMetrics,
    balanceDelta,
    dailyAllowanceDelta,
    scoreDelta,
    survivalDelta,
    monthlyForecastDelta,
    savingsGoalImpact,
    verdict,
    riskChange,
    suggestedMascotMood,
  }
}
