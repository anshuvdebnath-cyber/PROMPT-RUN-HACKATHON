# 🤝 Contributing to Broke But Functional

Thank you for your interest in contributing to **Broke But Functional — Survive the Month**!

---

## 🛠️ Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anshuvdebnath-cyber/PROMPT-RUN-HACKATHON.git
   cd PROMPT-RUN-HACKATHON
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🧪 Testing & Code Quality Standards

Every submission must maintain 100% test pass rates and zero linter warnings.

- **Run linter:**
  ```bash
  npm run lint
  ```
- **Run full test suite:**
  ```bash
  npm test
  ```
- **Run comprehensive validation check (Lint + Types + Tests):**
  ```bash
  npm run check
  ```
- **Build production bundle:**
  ```bash
  npm run build
  ```

---

## 📐 Architecture Conventions

1. **Pure Logic in `src/engine/`**: Keep mathematical calculations pure and decoupled from React hooks or DOM.
2. **Accessible Components in `src/components/`**: All form controls must have associated `<label htmlFor="...">` and `<input id="...">`.
3. **Strict TypeScript**: Avoid `any`. All props and state objects must use strict interfaces from `src/types/`.

---

## 📜 Commit Guidelines

We adhere to the Conventional Commits specification:
- `feat(scope)`: A new feature
- `fix(scope)`: A bug fix
- `test(scope)`: Adding or updating tests
- `docs(scope)`: Documentation changes
- `chore(scope)`: Maintenance or configuration updates
