import {
  Commitment,
  FinancialHealthMetrics,
  MascotMood,
  Subscription,
  Transaction,
} from '../types/finance'

export const INITIAL_MONTHLY_BUDGET = 10000
export const TOTAL_MONTH_DAYS = 30

/**
 * Calculates current liquid balance from starting budget and transaction ledger
 */
export function calculateBalance(
  initialBudget: number,
  transactions: Transaction[]
): number {
  return transactions.reduce((acc, tx) => {
    if (tx.type === 'income') return acc + tx.amount
    return acc - tx.amount
  }, initialBudget)
}

/**
 * Calculates total spent on actual expenses (excluding savings deposits or income)
 */
export function calculateTotalSpent(transactions: Transaction[]): number {
  return transactions
    .filter((tx) => tx.type === 'expense' && tx.category !== 'Savings & Investments')
    .reduce((sum, tx) => sum + tx.amount, 0)
}

/**
 * Computes remaining unpaid commitments and active subscriptions for remaining days
 */
export function calculateRemainingObligations(
  currentDay: number,
  commitments: Commitment[],
  subscriptions: Subscription[]
): {
  unpaidCommitments: number
  upcomingSubscriptions: number
  totalObligations: number
} {
  const unpaidCommitments = commitments
    .filter((c) => !c.isPaid && !c.isPaused)
    .reduce((sum, c) => sum + c.amount, 0)

  const upcomingSubscriptions = subscriptions
    .filter((s) => s.isActive && s.renewalDay >= currentDay)
    .reduce((sum, s) => sum + s.amount, 0)

  return {
    unpaidCommitments,
    upcomingSubscriptions,
    totalObligations: unpaidCommitments + upcomingSubscriptions,
  }
}

/**
 * Computes dynamic daily allowance guaranteed not to breach fixed commitments
 */
export function calculateDynamicDailyAllowance(
  currentBalance: number,
  totalObligations: number,
  savingsLocked: number,
  currentDay: number
): number {
  const daysRemaining = Math.max(1, TOTAL_MONTH_DAYS - currentDay + 1)
  const uncommittedBuffer = currentBalance - totalObligations - savingsLocked

  if (uncommittedBuffer <= 0) {
    return 0
  }

  return Math.max(0, Math.floor(uncommittedBuffer / daysRemaining))
}

/**
 * Projects end of month balance based on current pace and fixed commitments
 */
export function calculateProjectedEndBalance(
  currentBalance: number,
  dailyBurnRate: number,
  currentDay: number,
  totalObligations: number
): number {
  const daysRemaining = Math.max(0, TOTAL_MONTH_DAYS - currentDay)
  // Projected living expenses + future fixed obligations
  return Math.round(currentBalance - dailyBurnRate * daysRemaining - totalObligations)
}

/**
 * Determines financial health score (0-100) and associated risk classification
 */
export function evaluateFinancialHealth(
  currentDay: number,
  balance: number,
  spentSoFar: number,
  commitments: Commitment[],
  subscriptions: Subscription[],
  savingsAmount: number,
  savingsTarget: number
): FinancialHealthMetrics {
  const daysElapsed = Math.max(1, currentDay)
  const dailyBurnRate = Math.round(spentSoFar / daysElapsed)

  const { totalObligations } = calculateRemainingObligations(
    currentDay,
    commitments,
    subscriptions
  )

  const dynamicDailyAllowance = calculateDynamicDailyAllowance(
    balance,
    totalObligations,
    savingsAmount,
    currentDay
  )

  const projectedEndBalance = calculateProjectedEndBalance(
    balance,
    dailyBurnRate,
    currentDay,
    totalObligations
  )

  // 1. Liquidity solvency score (0-40 pts)
  let liquidityScore = 0
  const coverageRatio = totalObligations > 0 ? balance / totalObligations : balance > 0 ? 2 : 0
  if (coverageRatio >= 2.0) liquidityScore = 40
  else if (coverageRatio >= 1.2) liquidityScore = 32
  else if (coverageRatio >= 1.0) liquidityScore = 24
  else if (coverageRatio >= 0.5) liquidityScore = 12
  else liquidityScore = Math.max(0, Math.round(coverageRatio * 20))

  // 2. Daily Burn Discipline score (0-30 pts)
  let burnScore = 0
  if (dynamicDailyAllowance > 0) {
    const burnRatio = dailyBurnRate / dynamicDailyAllowance
    if (burnRatio <= 0.8) burnScore = 30
    else if (burnRatio <= 1.0) burnScore = 25
    else if (burnRatio <= 1.3) burnScore = 15
    else if (burnRatio <= 1.7) burnScore = 8
    else burnScore = 2
  } else {
    burnScore = balance > 0 ? 5 : 0
  }

  // 3. Savings buffer score (0-20 pts)
  const savingsProgressPercent =
    savingsTarget > 0 ? Math.min(100, Math.round((savingsAmount / savingsTarget) * 100)) : 100
  const savingsScore = Math.round((savingsProgressPercent / 100) * 20)

  // 4. Survival runway score (0-10 pts)
  let runwayScore = 0
  if (projectedEndBalance >= 1500) runwayScore = 10
  else if (projectedEndBalance >= 500) runwayScore = 8
  else if (projectedEndBalance >= 0) runwayScore = 5
  else if (projectedEndBalance >= -1000) runwayScore = 2
  else runwayScore = 0

  const totalScore = Math.min(100, Math.max(0, liquidityScore + burnScore + savingsScore + runwayScore))

  // Assign Letter Grade
  let grade: FinancialHealthMetrics['grade'] = 'C'
  if (totalScore >= 90) grade = 'A+'
  else if (totalScore >= 80) grade = 'A'
  else if (totalScore >= 68) grade = 'B'
  else if (totalScore >= 50) grade = 'C'
  else if (totalScore >= 35) grade = 'D'
  else grade = 'F'

  // Assign Risk Level
  let riskLevel: FinancialHealthMetrics['riskLevel'] = 'Safe'
  if (projectedEndBalance < -500 || balance <= 0 || dynamicDailyAllowance < 40) {
    riskLevel = 'Critical Doom'
  } else if (projectedEndBalance < 0 || dynamicDailyAllowance < 80 || totalScore < 40) {
    riskLevel = 'High Alert'
  } else if (totalScore < 65 || dynamicDailyAllowance < 140) {
    riskLevel = 'Moderate'
  } else {
    riskLevel = 'Safe'
  }

  // Survival Probability
  let survivalProbability = 50
  if (riskLevel === 'Safe') {
    survivalProbability = Math.min(99, 85 + Math.round((totalScore - 70) * 0.45))
  } else if (riskLevel === 'Moderate') {
    survivalProbability = Math.min(84, 65 + Math.round((totalScore - 50) * 0.9))
  } else if (riskLevel === 'High Alert') {
    survivalProbability = Math.max(25, Math.min(64, 30 + Math.round((totalScore - 35) * 2)))
  } else {
    survivalProbability = Math.max(5, Math.min(24, Math.round((balance / 1000) * 10)))
  }

  // Determine Mascot Mood & Gen Z Quip
  const { mood, quip } = selectMascotMoodAndQuip(
    totalScore,
    riskLevel,
    balance,
    dynamicDailyAllowance,
    projectedEndBalance,
    currentDay
  )

  return {
    score: totalScore,
    grade,
    riskLevel,
    survivalProbability,
    currentBalance: balance,
    spentSoFar,
    dynamicDailyAllowance,
    burnRateDaily: dailyBurnRate,
    unpaidCommitmentsTotal: totalObligations,
    projectedEndBalance,
    savingsProgressPercent,
    mascotMood: mood,
    quip,
  }
}

/**
 * Intelligent Gen-Z mood and relatable quip selector
 */
function selectMascotMoodAndQuip(
  score: number,
  risk: FinancialHealthMetrics['riskLevel'],
  balance: number,
  allowance: number,
  projectedEnd: number,
  day: number
): { mood: MascotMood; quip: string } {
  if (balance <= 0) {
    return {
      mood: 'hurt',
      quip: 'Down bad. Real wallet balance is ₹0. Instant panic mode activated!',
    }
  }

  if (risk === 'Critical Doom') {
    if (balance < 500) {
      return {
        mood: 'sensitive',
        quip: `Wallet is literally in tears. Only ₹${balance} left with ${30 - day} days to go!`,
      }
    }
    return {
      mood: 'angry',
      quip: `Emergency alert! Projected to end month at -₹${Math.abs(projectedEnd)}. Freeze spending now!`,
    }
  }

  if (risk === 'High Alert') {
    return {
      mood: 'stressed',
      quip: `Sweating bullets. Daily cap shrunk to ₹${allowance}/day. Instant ramen diet inbound.`,
    }
  }

  if (risk === 'Moderate') {
    if (allowance < 180) {
      return {
        mood: 'insecure',
        quip: `Tight squeeze. One rogue coffee and the weekly budget folds. Tread lightly!`,
      }
    }
    return {
      mood: 'bored',
      quip: `Floating along. Not broke, but definitely can't afford main character energy today.`,
    }
  }

  // Safe status
  if (score >= 90) {
    return {
      mood: 'excited',
      quip: `Financial god tier! Dynamic cap is ₹${allowance}/day. Month survival rate at peak!`,
    }
  }

  if (score >= 80) {
    return {
      mood: 'joyful',
      quip: `Vibes immaculate. Commitments covered and guilt-free daily allowance is steady.`,
    }
  }

  return {
    mood: 'grateful',
    quip: `Solid pace. Bills are prepped and you are comfortably on track to day 30.`,
  }
}
