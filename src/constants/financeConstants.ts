/**
 * @file financeConstants.ts
 * @description Centralized domain constants for the Broke But Functional simulation engine.
 * Defines starting funds, monthly duration, health thresholds, and survival benchmarks.
 */

/** Initial starting liquid budget in INR (₹) */
export const INITIAL_STARTING_BALANCE = 10000

/** Total days in the simulation horizon */
export const TOTAL_MONTH_DAYS = 30

/** Safe daily allowance base denominator (initial target days) */
export const INITIAL_DAILY_BUDGET_TARGET = 333 // ₹10,000 / 30

/** Financial health status score thresholds (0 - 100 scale) */
export const HEALTH_THRESHOLDS = {
  THRIVING: 80,
  HEALTHY: 65,
  CAUTION: 50,
  CRITICAL: 35,
  BANKRUPT: 0,
} as const

/** Risk level classifications mapped to numeric risk score */
export const RISK_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

/** Mascot mood state identifiers */
export const MASCOT_MOODS = {
  THRIVING: 'thriving',
  CHILL: 'chill',
  NERVOUS: 'nervous',
  PANIC: 'panic',
  DEAD: 'dead',
  CELEBRATING: 'celebrating',
} as const
