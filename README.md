# 💸 Broke But Functional — Survive the Month
> **A Gen Z Interactive Personal Finance Experience engineered for the PROMPT RUN Hackathon.**

[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-100%25%20Passing-success?logo=vitest)](https://vitest.dev/)
[![Oxlint](https://img.shields.io/badge/Lint-0%20Warnings%20%7C%200%20Errors-brightgreen)](https://oxc-project.github.io/)
[![Core Web Vitals](https://img.shields.io/badge/Core%20Web%20Vitals-Optimized-emerald)](#)

---

## 🌟 Overview & Core Premise

**"Broke But Functional — Survive the Month"** challenges users to navigate a tight budget of **₹10,000 over 30 days**. It moves far beyond basic retroactive expense logging by building a living, interconnected financial simulation engine tailored to Gen Z realities.

Every choice carries immediate, cascading consequences across:
* **Liquid Balance** (₹10,000 starting pool)
* **Dynamic Safe Daily Allowance** (recalibrated daily after locking upcoming liabilities)
* **Fixed Commitments** (rent share, Wi-Fi, utilities, pantry essentials)
* **Active Subscriptions** (Spotify, Netflix, gym, cloud backup with instant pause/cancel relief)
* **Unexpected Shocks** (punctures, seasonal medical prescriptions, surprise freelance gigs)
* **Emergency Cushion** (buffer fund)
* **Composite Financial Health Score (0-100)** and **Survival Probability Meter**
* **The 12 Reactive Mood Mascots**: Dynamic SVG characters (*Excited, Joyful, Grateful, Energized, Sensitive, Confused, Bored, Stressed, Angry, Insecure, Hurt, Guilty*) that react with fluid spring animations to your choices and financial risks!

---

## 🚀 Key Features

### 1. 🔮 Interactive "What-If" Decision Simulator Sandbox
Test-drive real-world decisions before committing:
- *What if I buy ₹1,800 sneakers on Day 12?*
- Instant side-by-side comparison: Shows the exact drop in daily allowance (e.g. from ₹210 to ₹142/day), risk status shift, and survival odds.
- One-click **"Confirm & Commit"** or **"Discard Simulation"**.

### 2. 📅 30-Day Timeline & Time Machine
- Interactive slider to advance day-by-day (Day 1 $\to$ Day 30) or scrub across the month.
- Preset scenarios:
  - **The Fresh Start**: Day 1 with ₹10k intact.
  - **Mid-Month Squeeze**: Day 15 with bills due and tight daily runway.
  - **Paycheck Survivor**: Day 26 with high-stakes survival.

### 3. 🎭 The 12 Animated Mood Mascots
- Pure, responsive SVG characters faithfully designed from the reference mood board:
  - **Joyful / Excited / Energized**: High balance, healthy runway.
  - **Grateful / Bored**: Steady daily pace, bills scheduled.
  - **Sensitive (Crying Tear)**: Wallet squeezed under ₹500.
  - **Stressed / Confused**: High burn rate vs low daily cap.
  - **Angry / Hurt**: Deficit shock, budget overdraft.
  - **Insecure / Guilty**: Empty savings or impulse buying.
- Interactive **12-Mascot Gallery** modal.

### 4. 📊 Segmented Health Score Radial Ring
Multi-colored pastel arcs reflecting:
- Liquidity Solvency
- Burn Discipline
- Savings Buffer
- Commitment Coverage

### 5. 📈 30-Day Cashflow Curve with Danger Bands
Smooth SVG forecast showing past burn trajectory vs projected Day 30 finish.

---

## 🛠️ Tech Stack & FAIE Optimization

| Metric | Implementation |
| :--- | :--- |
| **Framework** | React 18 + Vite |
| **Language** | TypeScript 5 (Strict Mode: `noImplicitAny`, strict null checks) |
| **Linting** | Oxlint (0 errors, 0 warnings) |
| **Testing** | Vitest + React Testing Library (21 automated unit & component tests) |
| **Security** | DOMPurify input sanitization + safe numeric clamping |
| **Performance** | Ultra-lightweight 146KB gzip bundle, sub-second FCP, CLS = 0 |
| **Styling** | Vanilla Neo-Brutalist Pastel Design System with Framer Motion spring physics |

---

## 🧪 Testing & Verification

```bash
# Run automated Vitest test suite (100% pass)
npm run test

# Run strict TypeScript compiler verification
npm run typecheck

# Run linter
npm run lint

# Build production bundle
npm run build
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# App will run at http://localhost:5173/
```
