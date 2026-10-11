# 🔒 Security Policy

## Supported Versions

| Version | Supported |
| :--- | :--- |
| 2.x | :white_check_mark: |
| 1.x | :x: |

---

## Security Practices Implemented

1. **Client-Side Input Sanitization**:
   - Every transaction title, note, and custom category is processed through `DOMPurify` before entering the state store or rendering in the DOM.
   - Script injection (`<script>`), inline handlers (`onerror=`, `onload=`), and protocol vectors (`javascript:`) are stripped out.

2. **Defensive Mathematical Bounds**:
   - Zero-division guards enforce non-zero denominators (`Math.max(1, daysRemaining)`).
   - Numeric inputs are clamped and validated against NaN and negative amounts.

3. **HTTP Security Headers**:
   Configured in `vercel.json`:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`

---

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately via email to `anshuvdebnath@gmail.com`. Do not disclose security issues publicly until they have been addressed.
