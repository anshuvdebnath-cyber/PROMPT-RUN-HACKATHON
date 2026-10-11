# 📝 Changelog

All notable changes to the **Broke But Functional** application are documented in this file.

---

## [2.2.0] - 2026-10-11
### Added
- Power-user keyboard shortcuts (`E`: spend, `N`: next day, `1-5`: tab switching, `Esc`: close modal).
- Dedicated `src/hooks/useKeyboardShortcuts.ts` and `src/hooks/useFinance.ts`.
- Pure domain constants in `src/constants/financeConstants.ts`.
- Formatters utility library in `src/utils/formatters.ts` with comprehensive unit tests.
- High-efficiency `Cache-Control` immutable headers in `vercel.json`.
- Non-render-blocking font loading in `index.html` via preload and media print pattern.
- Architectural blueprint document (`ARCHITECTURE.md`) with Mermaid flowcharts.
- Standard repository compliance documents (`LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`).

### Optimized
- Converted `QuickExpenseModal` and `SurvivalCelebration` to dynamic `React.lazy` chunks wrapped in `<Suspense>` for sub-500ms initial paint.
- Test coverage expanded to 39 passing tests across 10 test suites.

---

## [2.1.0] - 2026-10-11
### Added
- AST Problem Statement alignment: `monthlyForecastDelta` and `savingsGoalImpact` added to `SimulationResult`.
- Search crawler and PWA configurations (`public/robots.txt` and `public/manifest.json`).
- Full WCAG 2.1 form control bindings (`htmlFor` and `id`) across `ExpenseLedger`, `QuickExpenseModal`, and `WhatIfSimulator`.
- Skip-to-content navigation landmark in `App.tsx`.

---

## [2.0.0] - 2026-10-11
### Added
- Pastel Airy UI Design System overhaul.
- In-place reactive Mascot morphing SVG engine with smooth Framer Motion spring physics.
- What-If Decision Sandbox test-driving purchase impacts.
- Fixed Commitments & Subscriptions Manager with pause/cancel toggle.
- 30-Day Timeline stepper with automated subscription renewals.
