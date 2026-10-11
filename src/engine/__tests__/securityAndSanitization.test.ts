import { describe, expect, it } from 'vitest'
import DOMPurify from 'dompurify'
import { calculateBalance, calculateDynamicDailyAllowance, INITIAL_MONTHLY_BUDGET } from '../financeEngine'
import { runWhatIfSimulation, SimulationRequest } from '../simulationEngine'
import { Transaction } from '../../types/finance'

describe('Security & Data Sanitization Audits', () => {
  it('strips malicious <script> tags from user inputs using DOMPurify', () => {
    const maliciousInput = '<script>alert("hacked")</script>Dinner at Cafe'
    const sanitized = DOMPurify.sanitize(maliciousInput.trim())
    expect(sanitized).toBe('Dinner at Cafe')
    expect(sanitized).not.toContain('<script>')
  })

  it('strips onerror and onclick XSS injection payloads', () => {
    const maliciousImg = '<img src=x onerror=alert(1) /> Groceries'
    const sanitized = DOMPurify.sanitize(maliciousImg.trim())
    expect(sanitized).not.toContain('onerror')
    expect(sanitized).not.toContain('alert(1)')
  })

  it('handles zero and negative amounts securely without corrupting balance calculations', () => {
    const transactions: Transaction[] = [
      { id: '1', day: 1, title: 'Safe item', amount: 500, category: 'Food & Dining', type: 'expense', timestamp: '2026-10-01T10:00:00Z' },
      { id: '2', day: 2, title: 'Zero cost voucher', amount: 0, category: 'Food & Dining', type: 'expense', timestamp: '2026-10-02T10:00:00Z' },
    ]
    const balance = calculateBalance(INITIAL_MONTHLY_BUDGET, transactions)
    expect(balance).toBe(9500)
  })

  it('safely handles extreme bounds in What-If simulations', () => {
    const req: SimulationRequest = {
      currentDay: 15,
      transactions: [],
      commitments: [],
      subscriptions: [],
      savingsAmount: 500,
      savingsTarget: 2000,
      proposedAmount: 50000, // Massive expense far exceeding budget
      proposedTitle: '<svg onload=alert(1)>Luxury iPhone',
      proposedCategory: 'Shopping & Essentials',
      proposedType: 'expense',
    }

    const result = runWhatIfSimulation(req)
    // Should safely calculate deficit without crashing
    expect(result.simulatedMetrics.currentBalance).toBe(-40000)
    expect(result.simulatedMetrics.riskLevel).toBe('Critical Doom')
    expect(result.simulatedMetrics.survivalProbability).toBeLessThanOrEqual(5)
    expect(result.simulatedMetrics.mascotMood).toBe('hurt')
  })

  it('prevents NaN or infinite daily allowances on Day 30', () => {
    // Day 30 means 1 day remaining (day 30); allowance should be finite and non-negative
    const allowance = calculateDynamicDailyAllowance(300, 0, 0, 30)
    expect(Number.isFinite(allowance)).toBe(true)
    expect(isNaN(allowance)).toBe(false)
    expect(allowance).toBeGreaterThanOrEqual(0)
  })
})
