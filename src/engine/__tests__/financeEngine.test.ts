import { describe, expect, it } from 'vitest'
import {
  calculateBalance,
  calculateDynamicDailyAllowance,
  calculateRemainingObligations,
  calculateTotalSpent,
  evaluateFinancialHealth,
  INITIAL_MONTHLY_BUDGET,
} from '../financeEngine'
import { runWhatIfSimulation } from '../simulationEngine'
import { Commitment, Subscription, Transaction } from '../../types/finance'

describe('Finance Engine Calculations', () => {
  const dummyCommitments: Commitment[] = [
    {
      id: 'c1',
      title: 'Shared Room Rent',
      amount: 3500,
      dueDay: 5,
      category: 'rent',
      isPaid: false,
      description: 'Hostel/PG share',
    },
    {
      id: 'c2',
      title: 'Wi-Fi Split',
      amount: 400,
      dueDay: 10,
      category: 'wifi',
      isPaid: false,
      description: 'Broadband quota',
    },
  ]

  const dummySubscriptions: Subscription[] = [
    {
      id: 's1',
      name: 'Spotify Premium Student',
      amount: 59,
      renewalDay: 12,
      isActive: true,
      category: 'music',
    },
    {
      id: 's2',
      name: 'Cloud Storage',
      amount: 130,
      renewalDay: 20,
      isActive: true,
      category: 'cloud',
    },
  ]

  it('calculates initial balance correctly as ₹10,000 with empty transactions', () => {
    const balance = calculateBalance(INITIAL_MONTHLY_BUDGET, [])
    expect(balance).toBe(10000)
  })

  it('accurately updates balance after expense and income transactions', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        day: 2,
        title: 'College Canteen',
        amount: 250,
        category: 'Food & Dining',
        type: 'expense',
        timestamp: '2026-10-01',
      },
      {
        id: '2',
        day: 3,
        title: 'Freelance Graphic Design Gig',
        amount: 1200,
        category: 'Side Gig / Inflow',
        type: 'income',
        timestamp: '2026-10-02',
      },
    ]

    const balance = calculateBalance(INITIAL_MONTHLY_BUDGET, transactions)
    expect(balance).toBe(10000 - 250 + 1200)

    const spent = calculateTotalSpent(transactions)
    expect(spent).toBe(250)
  })

  it('computes remaining obligations and excludes paid or paused commitments', () => {
    const { unpaidCommitments, upcomingSubscriptions, totalObligations } =
      calculateRemainingObligations(1, dummyCommitments, dummySubscriptions)

    expect(unpaidCommitments).toBe(3900)
    expect(upcomingSubscriptions).toBe(189)
    expect(totalObligations).toBe(4089)

    // When rent is marked as paid
    const updatedCommitments = dummyCommitments.map((c) =>
      c.id === 'c1' ? { ...c, isPaid: true } : c
    )
    const afterPaid = calculateRemainingObligations(
      1,
      updatedCommitments,
      dummySubscriptions
    )
    expect(afterPaid.unpaidCommitments).toBe(400)
  })

  it('calculates dynamic daily allowance taking obligations into account', () => {
    // ₹10,000 balance, ₹4,089 obligations, ₹1,000 savings lock, on Day 1 (30 days left)
    // Safe pool = 10000 - 4089 - 1000 = 4911
    // Daily cap = floor(4911 / 30) = 163
    const allowance = calculateDynamicDailyAllowance(10000, 4089, 1000, 1)
    expect(allowance).toBe(163)

    // On Day 16 (15 days left) with same uncommitted pool
    const allowanceMidMonth = calculateDynamicDailyAllowance(10000, 4089, 1000, 16)
    expect(allowanceMidMonth).toBe(Math.floor(4911 / 15)) // 327
  })

  it('handles negative or zero safe pool gracefully without negative allowance', () => {
    const allowance = calculateDynamicDailyAllowance(3000, 4000, 0, 1)
    expect(allowance).toBe(0)
  })

  it('evaluates comprehensive financial health metrics and assigns risk', () => {
    const metrics = evaluateFinancialHealth(
      1,
      10000,
      0,
      dummyCommitments,
      dummySubscriptions,
      500,
      1500
    )

    expect(metrics.score).toBeGreaterThan(60)
    expect(metrics.riskLevel).toBe('Safe')
    expect(metrics.survivalProbability).toBeGreaterThan(80)
    expect(metrics.mascotMood).toMatch(/joyful|excited|grateful/)
  })

  it('simulates what-if decisions and predicts consequences correctly', () => {
    // 1. Massive expense test (₹2,500 splash)
    const severeResult = runWhatIfSimulation({
      currentDay: 5,
      transactions: [],
      commitments: dummyCommitments,
      subscriptions: dummySubscriptions,
      savingsAmount: 500,
      savingsTarget: 1500,
      proposedAmount: 2500,
      proposedTitle: 'Designer Sneakers Sale',
      proposedCategory: 'Shopping & Essentials',
      proposedType: 'expense',
    })

    expect(severeResult.balanceDelta).toBe(-2500)
    expect(severeResult.dailyAllowanceDelta).toBeLessThan(0)
    expect(severeResult.verdict).toContain('Heavy toll')
    expect(severeResult.suggestedMascotMood).toBe('guilty')

    // 2. Moderate impulse test (₹1,200 concert ticket)
    const moderateResult = runWhatIfSimulation({
      currentDay: 5,
      transactions: [],
      commitments: dummyCommitments,
      subscriptions: dummySubscriptions,
      savingsAmount: 500,
      savingsTarget: 1500,
      proposedAmount: 1200,
      proposedTitle: 'Concert Ticket Earlybird',
      proposedCategory: 'Entertainment & Outings',
      proposedType: 'expense',
    })

    expect(moderateResult.balanceDelta).toBe(-1200)
    expect(moderateResult.dailyAllowanceDelta).toBeLessThan(0)
    expect(moderateResult.verdict).toContain('Mild dent')
  })
})
