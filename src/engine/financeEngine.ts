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

  const daysElapsed = Math.max(1, currentDay)
  // Amortize early-month spending over the first week so a single Day-1
  // lunch isn't mistaken for a daily habit (prevents instant Critical Doom).
  const burnDenominator = Math.max(7, daysElapsed)
  const rawBurnRate = spentSoFar / burnDenominator
  // Early in the month (first 7 days), blend actual burn rate with recommended daily allowance pace
  const burnWeight = Math.min(1, daysElapsed / 7)
  const targetPace = dynamicDailyAllowance > 0 ? dynamicDailyAllowance : 120
  const dailyBurnRate = Math.round(burnWeight * rawBurnRate + (1 - burnWeight) * targetPace)

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
    currentDay,
    spentSoFar,
    dailyBurnRate
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
 * Intelligent Gen-Z mood and relatable quip selector.
 * Pace-aware: compares actual daily burn against the safe cap so every
 * meaningful spend visibly moves the mascot, with quips citing real numbers.
 */
/**
 * Helper to compute instantaneous mascot reaction to a specific expense amount
 */
export function getMoodForExpenseAmount(amount: number): MascotMood {
  if (amount <= 100) return 'excited'
  if (amount <= 300) return 'joyful'
  if (amount <= 600) return 'grateful'
  if (amount <= 1100) return 'stressed'
  if (amount <= 2000) return 'angry'
  return 'hurt'
}

/**
 * Intelligent Gen-Z mood and relatable quip selector.
 * Directly and sensitively tracks monthly expenses, liquid cash balance,
 * daily allowance, and burn pace so every spend visibly moves the mascot.
 */
function selectMascotMoodAndQuip(
  score: number,
  risk: FinancialHealthMetrics['riskLevel'],
  balance: number,
  allowance: number,
  projectedEnd: number,
  day: number,
  spent: number,
  burnRate: number
): { mood: MascotMood; quip: string } {
  const burnRatio = allowance > 0 ? burnRate / allowance : burnRate > 0 ? 99 : 0
  const overspending = burnRatio > 1.25

  // 1. Critical exhaustion / Tears
  if (balance <= 0) {
    return {
      mood: 'hurt',
      quip: 'Down bad. Real wallet balance is ₹0. Instant panic mode activated!',
    }
  }

  if (balance < 800 || spent >= 8800) {
    return {
      mood: 'hurt',
      quip: `Wallet is literally in tears. Only ₹${balance.toLocaleString('en-IN')} left with ${30 - day} days to go!`,
    }
  }

  // 2. High danger / Critical Doom / Heavy Spends
  if (risk === 'Critical Doom' || balance < 2200 || spent >= 6800 || projectedEnd < -500) {
    return {
      mood: 'angry',
      quip: `Emergency alert! Burned ₹${spent.toLocaleString('en-IN')} out of ₹10k. Only ₹${balance.toLocaleString('en-IN')} left! Freeze spending now!`,
    }
  }

  // 3. Stressed / Sweating / High burn
  if (risk === 'High Alert' || balance < 4500 || spent >= 4500 || overspending || allowance < 120) {
    return {
      mood: 'stressed',
      quip: `Sweating bullets. Torched ₹${spent.toLocaleString('en-IN')} so far (₹${burnRate}/day vs a ₹${allowance} cap). Instant ramen diet inbound.`,
    }
  }

  // 4. Grateful / Mindful middle ground
  if (risk === 'Moderate' || balance < 7000 || spent >= 2200 || allowance < 220) {
    return {
      mood: 'grateful',
      quip: `Floating along. Spent ₹${spent.toLocaleString('en-IN')} so far. Not broke, but definitely mindful of upcoming bills.`,
    }
  }

  // 5. Joyful / Smooth living
  if (balance < 8800 || spent >= 800) {
    return {
      mood: 'joyful',
      quip: `Vibes immaculate. ₹${spent.toLocaleString('en-IN')} spent with solid buffer left. Commitments covered and guilt-free daily allowance is steady.`,
    }
  }

  // 6. Excited / Peak condition (Day 1 - fresh ₹10k pool)
  return {
    mood: 'excited',
    quip: `Financial god tier! Fresh ₹${balance.toLocaleString('en-IN')} pool intact. Dynamic cap is ₹${allowance}/day. Peak vibes!`,
  }
}
