/**
 * @file formatters.ts
 * @description Pure utility functions for Indian numbering format, currency presentation, and percentages.
 */

/**
 * Formats a numeric value into Indian Rupee currency string.
 * @param amount - The numeric amount in INR
 * @param includeSymbol - Whether to prepend the ₹ symbol (default true)
 * @returns Formatted currency string (e.g., '₹10,000')
 */
export function formatINR(amount: number, includeSymbol = true): string {
  const rounded = Math.round(amount)
  const formatted = rounded.toLocaleString('en-IN')
  return includeSymbol ? `₹${formatted}` : formatted
}

/**
 * Formats a ratio or percentage into a clean string.
 * @param value - Percentage value (0 - 100)
 * @param decimals - Decimal places (default 0)
 * @returns Formatted percentage string (e.g., '85%')
 */
export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Returns formatted delta indicator string with explicit sign (+ / -).
 * @param delta - The change value
 * @returns Formatted signed string (e.g., '+₹250' or '-₹500')
 */
export function formatSignedDelta(delta: number): string {
  const prefix = delta > 0 ? '+₹' : delta < 0 ? '-₹' : '₹'
  return `${prefix}${Math.abs(Math.round(delta)).toLocaleString('en-IN')}`
}
