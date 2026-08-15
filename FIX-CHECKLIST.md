# FIXES AND CHECKLIST

TL;DR

This document consolidates actionable fixes and acceptance checklists derived from `PROJECT_ANALYSIS.md` sections "Bugs & Issues" and "What It Needs to Follow Best Practices". Tasks are prioritized (P0 urgent, P1 important, P2 performance/tooling) with difficulty estimates and target files/areas.

---

## How to use

- Work tasks top 1 down by priority (P0 first).
- Each task has a short description, difficulty, target files/areas, and an acceptance checklist.
- After implementing a task, mark the acceptance checklist items as resolved and include a brief test note in PR.

---

## P0 2 Urgent / Functional

### 1) Fix CV download

- Description: Ensure "Download CV" control points to a valid PDF (add `public/RamezKhaled_CV.pdf` or use a hosted URL).
- Difficulty: Low
- Files / areas: `src/components/Navbar.tsx`, `public/`
- Acceptance:
  - Clicking the control opens/downloads a valid PDF.
  - No 404s in network console for the CV URL.
  - Manual verify in `npm run dev`.

### 2) Replace placeholder contact & social links with config-driven values

- Description: Centralize contact and social links into a typed `src/data/socials.ts` (or .env) and remove hardcoded example.com/wa.me placeholders.
- Difficulty: Low
- Files / areas: `src/components/Contact.tsx`, `src/components/Footer.tsx`, `src/components/FloatingActionButton.tsx`, create `src/data/socials.ts`
- Acceptance:
  - No remaining `example.com` or fake `wa.me/1234567890` links in repo.
  - All contact anchors read from the new typed module or env.
  - Lint/typecheck shows no implicit `any` for the config.

### 3) Wire or remove inactive "View Project" buttons

- Description: Either implement navigation/handler for the "View Project" button(s) or remove the button if unused.
- Difficulty: Low
- Files / areas: `src/components/ProjectCard.tsx`
- Acceptance:
  - Each "View Project" control triggers a valid navigation/open or is removed/hidden.
  - No console warnings about missing handlers.

### 4) Restore build/lint by standardizing package manager and reinstalling deps

- Description: Choose one package manager (owner preference) and remove other lockfiles. Reinstall deps cleanly so lint/build work.
- Difficulty: High
- Files / areas: repo root (`bun.lockb`, `package-lock.json`, `pnpm-lock.yaml`, `package.json`)
- Acceptance:
  - Only one lockfile remains (per owner decision).
  - Clean install (`npm ci` or selected tool) completes and `node_modules` contains expected packages.
  - `npm run lint`, `npm run build` run without fatal errors in a CI-like environment.

---

## P1 2 Important UX / Code Quality

### 5) Remove or merge duplicate `CodeIDETwo.tsx`

- Description: Delete unused duplicate or merge into single `CodeIDE` component driven by props.
- Difficulty: Medium
- Files / areas: `src/components/CodeIDETwo.tsx`, `src/components/CodeIDE.tsx`, `src/pages/Index.tsx`
- Acceptance:
  - `CodeIDETwo.tsx` is removed or merged; no unused imports remain.
  - Functionality preserved where used; visual/behavioral parity verified.

### 6) Remove or fix `.snap-y` dead queries

- Description: Replace `document.querySelector('.snap-y')` logic with a reliable scroll utility (or add the class where intended).
- Difficulty: Low
- Files / areas: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/FloatingActionButton.tsx`, `src/components/ScrollProgress.tsx`, `src/components/ParallaxBackground.tsx`
- Acceptance:
  - No reliance on a non-existent `.snap-y` element.
  - Scrolling behavior is consistent across browsers.

### 7) Replace `dangerouslySetInnerHTML` syntax highlighting

- Description: Use `prism-react-renderer` or tokenized `<span>` output instead of building HTML strings and injecting them.
- Difficulty: Medium
- Files / areas: `src/components/CodeIDE.tsx`, `src/components/CodeIDETwo.tsx`
- Acceptance:
  - No client-side `dangerouslySetInnerHTML` usage for highlighting remains.
  - Visual syntax highlighting matches previous output closely.
  - Security review shows no HTML injection vector.

### 8) Make SVG gradient IDs unique per instance

- Description: Use `useId()` or unique prefix per instance to avoid duplicate DOM `id`s for SVG gradients.
- Difficulty: Low
- Files / areas: `src/components/SkillCard.tsx`
- Acceptance:
  - No duplicate `id` attributes for gradients when multiple skills render.
  - Gradient visuals remain correct.

### 9) Fix dark-mode text contrast for skill icons

- Description: Replace hardcoded `fill` values with CSS variables or conditional colors to ensure legibility in dark theme.
- Difficulty: Low
- Files / areas: `src/components/SkillCard.tsx`, `src/lib/theme.ts`
- Acceptance:
  - JS/TS skill text is readable in dark mode (owner-accepted contrast or WCAG AA where feasible).

---

## P2 2 Performance / Architecture / Tooling

### 10) Throttle scroll & mouse handlers using rAF or motion values

- Description: Replace setState-on-scroll/mouse with requestAnimationFrame-driven refs or framer-motion values to avoid frequent re-renders.
- Difficulty: Medium
- Files / areas: `src/components/ParallaxBackground.tsx`, `src/components/ScrollProgress.tsx`, `src/components/ProjectCard.tsx`, DeveloperOS/ProductivityStack
- Acceptance:
  - Reduced CPU usage under interaction (manual profiling).
  - No visual regressions; interactions remain smooth.

### 11) Lazy-load heavy below-the-fold sections

- Description: Use `React.lazy` + `Suspense` or dynamic imports for heavy sections (ProductivityStack, CodeIDE, DeveloperOS).
- Difficulty: Medium
- Files / areas: `src/pages/Index.tsx`, targeted component files
- Acceptance:
  - Initial bundle size reduces (build stats).
  - Lazy sections load on demand without breaking UI or causing hydration errors.

### 12) Respect `prefers-reduced-motion` and pause off-screen animations

- Description: Honor OS preference and pause off-screen animations via `IntersectionObserver`.
- Difficulty: Medium
- Files / areas: global CSS (`index.css`/`tailwind.config.ts`), animation-heavy components
- Acceptance:
  - When user enables reduced motion OS setting, animations are minimized/disabled.
  - Off-screen animations pause while not visible.

### 13) Enable strict TypeScript & tighten ESLint rules

- Description: Turn `strict: true` in `tsconfig.app.json`, re-enable `no-unused-vars`, add `eslint-plugin-jsx-a11y`, and fix resulting issues iteratively.
- Difficulty: High
- Files / areas: `tsconfig.app.json`, `eslint.config.js`, full codebase
- Acceptance:
  - `tsconfig.app.json` has `strict: true` and a `typecheck` script exists.
  - Lint/typecheck run in CI; remaining issues have tracked tickets if not immediately fixable.

### 14) Project hygiene: remove dead files/deps, update README, add CI

- Description: Remove unused lockfiles, dead files (`App.css`, `placeholder.svg`, duplicate hooks), prune unused dependencies, add Vitest + RTL tests and a GitHub Actions workflow.
- Difficulty: High
- Files / areas: repo root, `README.md`, `.github/workflows/`
- Acceptance:
  - Repo uses one package manager; install instructions updated.
  - Dead files removed; repo size reduced.
  - CI runs lint/typecheck/test/build on pushes.

### 15) Extract inline content to typed data modules

- Description: Move large inline data into `src/data/{projects,socials,skills,quotes}.ts` and consume from components.
- Difficulty: Medium
- Files / areas: `src/components/*`, new `src/data/` files
- Acceptance:
  - Inline lists/data removed from components and imported from typed data modules.
  - No functional differences after migration.

---

## Acceptance & Verification Summary

- Run local dev and spot-check P0 items:

```bash
npm ci
npm run dev
# manual checks: CV download, contact links, "View Project" behavior
```

- Run lint/typecheck/build in a clean environment (owner-chosen package manager):

```bash
npm run lint
npm run typecheck
npm run build
```

- For performance changes: capture basic before/after stats (bundle size, CPU profile snippet) and include in PR.

---

## Follow-up Questions for Owner

1. Which package manager should we standardize on: `pnpm`, `npm`, or `bun`? (affects lockfile removal)
2. Should the CV be placed in `public/` or hosted externally? Provide file or external URL.
3. Do you want contact/social links stored in `src/data/socials.ts` or environment variables? Provide real links if available.
4. For `CodeIDE` duplication: delete `CodeIDETwo.tsx` or merge into a single prop-driven component?
5. Accessibility target: aim for WCAG AA contrast and reduced-motion support? Any browsers/devices to prioritize?

---

## Implementation Notes

- Keep changes small and PR-sized; prefer many small PRs: quick wins (P0 items) first, then grouping related P1/P2 items.
- Add smoke tests for P0 behaviors (CV link, contact read-from-config, View Project navigation) to prevent regressions.

---

(End of draft)
