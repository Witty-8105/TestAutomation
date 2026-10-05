# Google Login Test Automation

TypeScript Playwright starter framework for a Google sign-in flow.

## Setup

1. Copy `.env.example` to `.env` and supply a dedicated Google test account.
2. Install the browser: `npx playwright install chromium`.
3. Run the test: `npm test`.

Useful commands: `npm run test:headed`, `npm run test:ui`, and `npm run report`.

## Note about Google sign-in

Google may challenge automated attempts with CAPTCHA, two-step verification, or account-risk checks. Use a dedicated account without MFA for this UI smoke test; for dependable automated verification of Google services, prefer OAuth/API-level tests.
