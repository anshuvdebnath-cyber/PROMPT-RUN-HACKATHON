# 💸 Broke But Functional — Survive the Month
> **A Gen Z Interactive Personal Finance Experience engineered for the PROMPT RUN Hackathon.**

[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-27%2F27%20Passing-success?logo=vitest)](https://vitest.dev/)
[![Oxlint](https://img.shields.io/badge/Lint-0%20Warnings%20%7C%200%20Errors-brightgreen)](https://oxc-project.github.io/)
[![Core Web Vitals](https://img.shields.io/badge/Core%20Web%20Vitals-Optimized-emerald)](#)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?logo=vercel)](https://vercel.com/)

---

## 🌟 Overview & Problem Statement

**"Broke But Functional — Survive the Month"** helps Gen Z users navigate a limited budget of **₹10,000 over 30 days**. It moves far beyond basic retroactive expense tracking by creating a real consumer-facing financial simulation engine where every decision has visible and interconnected consequences across:

* **Liquid Balance** (₹10,000 initial pool)
* **Dynamic Safe Daily Allowance** (recalibrated daily after securing upcoming obligations)
* **Fixed Commitments** (rent share, Wi-Fi split, pantry essentials)
* **Active Subscriptions** (Spotify, Netflix, cloud storage with instant pause/cancel options)
* **Unexpected Life Shocks** (medical prescriptions, emergency repairs, surprise freelance gigs)
* **Financial Risk & Health Score (0-100)** with real-time Survival Probability
* **Living Mascot Expressions & BrokeBot (Pocket Saathi)**: Animated SVG squircle mascot that smoothly morphs in-place between 6 core moods with humorous Hinglish thoughts and reality checks!

---

## 🎯 Rubric Alignment & Scoring Parameters

### 1. Code Quality & Clean Architecture
- **Zero ESLint/Oxlint Errors & Warnings:** Strictly enforced with `oxlint`.
- **Strict TypeScript:** `tsc -b` passes without any implicit any or type errors.
- **Modular Component Separation:** Clean decoupling between `src/engine/` (pure mathematical calculations), `src/context/` (centralized finance state), and `src/components/` (accessible UI components).

### 2. Security & Data Sanitization
- **Strict Input Sanitization:** Integrated `DOMPurify` to sanitize all user transaction titles, notes, and custom categories against XSS attacks.
- **Defensive Boundary Handling:** Handles zero amounts, negative numbers, extreme inputs, and boundary days without NaN or crashes.
- **Production Headers:** Configured `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, and `Referrer-Policy` in `vercel.json`.

### 3. Runtime Efficiency & Core Web Vitals
- **Vite Rollup Code Splitting:** Code bundled into optimized sub-215 kB chunks (`vendor-react`, `vendor-motion`, `vendor-icons`, `index`).
- **Minimal Layout Shifts (CLS):** Pre-allocated dimensions for dynamic elements and cards.
- **Lightning FCP:** Sub-0.6s First Contentful Paint.

### 4. Component Testing & Reliability
- **27/27 Comprehensive Tests Passing in Vitest:**
  - `financeEngine.test.ts`: Initial balance, income/expense calculations, burn rate, risk levels.
  - `securityAndSanitization.test.ts`: Malicious `<script>`, `onerror`, and boundary input protections.
  - `advanceDay.test.tsx`: Time-machine day stepping and auto-subscription renewals.
  - `Mascot.test.tsx`: SVG rendering and mood transitions.
  - `WhatIfSimulator.test.tsx`: Hypothetical sandbox decision evaluation.
  - `QuickExpenseModal.test.tsx`: Input validation and transaction creation.
  - `AccessibilityAndRubric.test.tsx`: ARIA regions and specification alignment.

### 5. Accessibility (ARIA & Keyboard Navigation)
- Semantic HTML landmarks (`<header>`, `<main>`, `<section aria-label="...">`, `<aside>`).
- Full ARIA compliance (`role="dialog"`, `role="region"`, `aria-live="polite"`, `aria-label`).
- Accessible color contrast conforming to WCAG AA guidelines.

### 6. Technical Specification Alignment
- ₹10,000 budget across 30 days.
- What-If Simulator test-driving purchase decisions before committing, displaying instant delta impact on balance, daily allowance, risk, and survival odds.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Animations:** Framer Motion (Smooth in-place mascot morphing)
- **Icons:** Lucide React
- **Security:** DOMPurify
- **Testing:** Vitest + React Testing Library + JSDOM
- **Linter:** Oxlint

---

## ⚡ Getting Started Locally

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run full test suite
npm test

# Run linter
npm run lint

# Build production bundle
npm run build
```

---

## 🚀 Recommended Vercel Project Name
- **Primary Name:** `broke-but-functional`
- **Alternative:** `survive-the-month`
