/**
 * @file useKeyboardShortcuts.ts
 * @description Custom hook for keyboard-first navigation and rapid transaction actions.
 * Respects focus states so keys do not trigger when user is typing into input or textarea.
 */

import { useEffect } from 'react'

export interface KeyboardShortcutHandlers {
  onOpenQuickExpense?: () => void
  onAdvanceDay?: () => void
  onSelectTab?: (tab: 'simulator' | 'runway' | 'commitments' | 'savings' | 'ledger') => void
  onEscape?: () => void
}

/**
 * Attaches global keyboard shortcuts for power-user accessibility.
 * - 'e': Open quick expense logger
 * - 'n': Advance to next day
 * - '1' - '5': Switch primary dashboard tabs
 * - 'Escape': Dismiss active overlays/modals
 */
export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const activeEl = document.activeElement
      const isInput =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl instanceof HTMLSelectElement

      if (event.key === 'Escape') {
        handlers.onEscape?.()
        return
      }

      // Do not intercept hotkeys if user is currently typing in an input
      if (isInput) return

      // Hotkey matching
      const key = event.key.toLowerCase()
      if (key === 'e') {
        event.preventDefault()
        handlers.onOpenQuickExpense?.()
      } else if (key === 'n') {
        event.preventDefault()
        handlers.onAdvanceDay?.()
      } else if (key === '1') {
        handlers.onSelectTab?.('simulator')
      } else if (key === '2') {
        handlers.onSelectTab?.('runway')
      } else if (key === '3') {
        handlers.onSelectTab?.('commitments')
      } else if (key === '4') {
        handlers.onSelectTab?.('savings')
      } else if (key === '5') {
        handlers.onSelectTab?.('ledger')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
