# Ramez Portfolio — Project Analysis & Best-Practice Audit

> Generated: Aug 2026 · Applies to the current `master` working tree of `ramez-portfolio`.

---

## 1. Overview

`ramez-portfolio` is a single-page **developer portfolio** for Ramez Khaled. It is a visually rich, animation-heavy one-pager built as a Vite + React + TypeScript SPA. It was originally generated with **Lovable** (the README still contains the Lovable boilerplate) and has since been heavily customized by hand.

The page is composed of ~11 stacked sections (hero → footer), decorated with a preloader, custom cursor, parallax background, floating particles, noise overlay, scroll-progress bar, smooth section transitions, scroll-reveal animations and a light/dark theme toggle.

---

## 2. Tech Stack

| Layer        | Technology |
|--------------|-----------|
| Build tool   | Vite 5 (`@vitejs/plugin-react-swc`) |
| Language     | TypeScript 5 (strict mode **disabled**) |
| UI framework | React 18.3 (no StrictMode) |
| Routing      | react-router-dom 6 (only `/` and `*`) |
| Styling      | Tailwind CSS 3.4 + `tailwindcss-animate` + `@tailwindcss/typography` |
| Components   | shadcn/ui (Radix UI primitives) + lucide-react icons |
| Animations   | framer-motion 12, embla-carousel-react, custom CSS keyframes |
| Forms/validation (installed, barely used) | react-hook-form, zod, @hookform/resolvers |
| Data fetching (installed, unused) | @tanstack/react-query |
| Theming      | custom `lib/theme.ts` + `next-themes` (only used inside shadcn `sonner.tsx`) |
| Notifications| sonner + shadcn `toast` (none actually triggered in the app) |
| Charts (unused) | recharts |
| Package mgmt | bun, pnpm **and** npm lockfiles all committed |
| CI / Git     | GitHub repo `RamezKhaled77/ramez-portfolio`; no workflows, only a stray `.github/appmod/appcat` dir |

**Scripts (package.json):** `dev`, `build`, `build:dev`, `lint`, `preview`. There is **no `typecheck` script and no test script.**

---

## 3. Folder Structure

```
ramez-portfolio/
├── index.html                     # entry HTML (fonts, meta, favicon)
├── vite.config.ts                 # @ alias -> ./src, dev server on :8080
├── tailwind.config.ts             # HSL design tokens, fonts, keyframes
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js               # flat config; no-unused-vars turned OFF
├── components.json                # shadcn config
├── pnpm-workspace.yaml + pnpm-lock.yaml + package-lock.json + bun.lockb  # 3 managers!
├── README.md                      # untouched Lovable boilerplate
├── .github/appmod/appcat          # empty stray file
├── public/
│   ├── favicon.ico, my-icon.png, placeholder.svg, robots.txt
└── src/
    ├── main.tsx                   # theme init + root render
    ├── App.tsx                    # providers + BrowserRouter + routes
    ├── App.css                    # DEAD — Vite starter, never imported
    ├── index.css                  # all design tokens + custom utilities
    ├── assets/hero-abstract.jpg
    ├── pages/
    │   ├── Index.tsx              # the whole portfolio, one giant page
    │   └── NotFound.tsx           # 404 page
    ├── components/
    │   ├── Navbar, Hero, About, Skills, Projects, ProjectCard,
    │   │   ProjectDecisionModal, DeveloperOS, HowMyBrainWorks,
    │   │   CodeIDE, CodeIDETwo (UNUSED DUPLICATE), DesignCode,
    │   │   ProductivityStack, Quote, Testimonials, Contact, Footer
    │   ├── UI/effects: Preloader, CustomCursor, ParallaxBackground,
    │   │   FloatingParticles, NoiseOverlay, ScrollProgress,
    │   │   ScrollReveal, SectionIndicator, SectionTransition,
    │   │   MagneticWrapper, StaggerItem, ThemeToggle, FloatingActionButton
    │   └── ui/                     # ~40 shadcn components (most unused)
    ├── hooks/
    │   ├── use-magnetic.tsx       # UNUSED — duplicates MagneticWrapper
    │   ├── use-mobile.tsx         # unused
    │   └── use-toast.ts           # shadcn boilerplate, unused
    └── lib/
        ├── theme.ts               # theme init (localStorage + prefers-color-scheme)
        └── utils.ts               # cn() helper
```

---

## 4. Architecture & Data Flow

- **Single-page composition.** `App.tsx` wires providers (`QueryClientProvider` → `TooltipProvider` → `TransitionProvider`) and mounts only two routes (`/` → `Index`, `*` → `NotFound`).
- **Section stacking.** `Index.tsx` renders every section eagerly inside one `<main>`, each wrapped in `<ScrollReveal>` variants (`fade-up`, `scale`, `blur`, `fade-left/right`).
- **Effects layer.** Fixed/absolute overlays are mounted globally: `ParallaxBackground` (z-0), `FloatingParticles`, `NoiseOverlay`, `ScrollProgress`, `CustomCursor`, `SectionIndicator`, `FloatingActionButton`.
- **Navigation.** Navbar links call `useSmoothNavigation()` → `TransitionProvider.triggerTransition()` which shows a vignette overlay then `scrollIntoView`. Section indicator and navbar scroll-spy track active sections.
- **Theming.** `initTheme()` in `main.tsx` reads `localStorage.theme`/`prefers-color-scheme` and toggles the `dark` class on `<html>`. `ThemeToggle` flips the class and writes to localStorage.
- **Content is hardcoded.** All projects, testimonials, quotes, skills, social links and stats live inline inside component files — no data layer, no CMS.
- **No state management** beyond local `useState` (React Query provider exists but performs zero queries).

---

## 5. Bugs & Issues

### 5.1 Functional bugs

| # | Bug | Location |
|---|-----|----------|
| 1 | **"Download CV" is broken** — opens `/RamezKhaled_CV.pdf`, but no such file exists in `public/`. | `src/components/Navbar.tsx:132`, `:169` |
| 2 | **Placeholder contact info** — fake email `ramez@example.com`, `hello@example.com` and fake WhatsApp `wa.me/1234567890` are hardcoded across the site. | `Contact.tsx:23,29,108`, `FloatingActionButton.tsx:10`, `Footer.tsx:10` |
| 3 | **"View Project" button does nothing** — a `<button>` with no `onClick`. | `ProjectCard.tsx:246-249` |
| 4 | **Dead duplicate component** — `CodeIDETwo.tsx` (338 lines) is imported in `Index.tsx:25` but never rendered; it is ~95% identical to `CodeIDE.tsx`. | `src/pages/Index.tsx:25`, `src/components/CodeIDETwo.tsx` |
| 5 | **Nonexistent `.snap-y` container** — 5 components query `document.querySelector('.snap-y')` which never matches anything in the app; scroll behavior silently falls back to `window`. The query is dead logic. | `Navbar.tsx:18`, `Footer.tsx:14`, `FloatingActionButton.tsx:19`, `ScrollProgress.tsx:7`, `ParallaxBackground.tsx:7` |
| 6 | **XSS-prone pattern** — syntax highlighting builds HTML strings and injects them via `dangerouslySetInnerHTML`. Currently safe (static strings) but any future user-supplied code would be an injection vector. | `CodeIDE.tsx:219-220`, `CodeIDETwo.tsx:208-209` |
| 7 | **Duplicate SVG gradient IDs** — skill icons define `id="htmlGrad"`, `id="cssGrad"`, etc. The infinite-scroll rows render each skill twice, producing duplicate DOM IDs; `url(#…)` resolves to the first instance. | `SkillCard.tsx:21,35,49,62,76,88,103,116,130` |
| 8 | **Dark-mode invisible text** — the JS/TS icon `<text>` uses `fill="hsl(0, 0%, 10%)"`, nearly invisible on the dark background. | `SkillCard.tsx:55,81` |

### 5.2 Performance problems

- **`setState` on every scroll event** triggers re-renders of whole effect components (no rAF throttling): `ParallaxBackground.tsx:11`, `ScrollProgress.tsx:14`, plus Navbar/FAB scroll handlers.
- **`setState` on every `mousemove`** in `ProjectCard` (tilt/cursor) and `DeveloperOS`/`ProductivityStack` bento cards → frequent re-renders under the cursor.
- **Everything mounts eagerly** — `Index.tsx` renders all ~11 heavy sections at once; no code-splitting / `React.lazy`, so the initial bundle includes framer-motion + all sections.
- **~30 unbounded CSS/JS animations** (floating particles, orbs, pulsing gradients, infinite carousel autoplay, custom-cursor `requestAnimationFrame` loop) run continuously, including off-screen, hurting CPU/battery on lower-end devices.
- **Components defined inside components** are recreated every render (`ProductivityStack`’s `SkeletonLine`, `ToolIcon`, `StatusIndicator`, `PlanningContent`, …).
- `use-toast.ts` effect depends on `[state]`, re-subscribing the listener on every toast state change. | `src/hooks/use-toast.ts:177`

### 5.3 Logic / UX bugs

- **About stat counters start on mount**, not when scrolled into view — a user who reaches About after 2s sees the final numbers, missing the animation. | `About.tsx:8-31`
- **Preloader forces a fixed 2 s delay** with no skip; the nested `setTimeout(onComplete, 800)` isn’t stored/cleared, so it can fire after unmount. | `Preloader.tsx:8-14`
- **Navbar scroll-spy tracks only 5 sections** while the page has 8+; the fallback branch (`rect.top <= innerHeight/3`) overwrites the accurate match, so the active indicator can be wrong. | `Navbar.tsx:19-45`
- **Quote auto-rotation interval never pauses** on user interaction; `useEffect` has an empty dep array referencing a re-created `handleNextQuote` (exhaustive-deps violation). | `Quote.tsx:44-58`
- **SectionTransition uses stacked timeouts**; rapid nav clicks queue multiple 300 ms scrolls/overlays. The overlay is `pointer-events-none`, so it only partially hides the page during a "transition". | `SectionTransition.tsx:26-39`
- **Carousel cleanup misses `reInit`** listener removal. | `Testimonials.tsx:65-82`
- **Theme logic is duplicated** between `lib/theme.ts` and `ThemeToggle.tsx`, and the toggle doesn’t react to live OS theme changes or sync across tabs. | `lib/theme.ts`, `ThemeToggle.tsx`
- **`DesignCode` injects a `<style>` element per render** and defines `@keyframes pulse`/`shimmer`, risking collisions with Tailwind’s own `pulse`. | `DesignCode.tsx:272-294`
- **`main.tsx` renders without `<React.StrictMode>`**, so double-render warnings/checks never run.

### 5.4 Accessibility (a11y)

- Custom cursor + hover-only reveals (`SectionIndicator` labels, bento tooltips) make content discoverable only on hover.
- Framer-motion and CSS animations largely ignore `prefers-reduced-motion`.
- Missing `aria-label`s: Play/Terminal buttons in `CodeIDE`, "View Project" button, decorative-only buttons.
- Contrast risk: `--muted-foreground` is 35% gray on cream in light mode; JS/TS skill text (#5.1.8) fails in dark mode.
- `Contact.tsx` uses `Phone` icon for WhatsApp and fake data; social anchors in `Footer` point to generic `https://github.com` / `linkedin.com` rather than the real profiles.

### 5.5 Project hygiene

- **Three package managers committed**: `bun.lockb`, `package-lock.json`, `pnpm-lock.yaml` + `pnpm-workspace.yaml`. This causes real install drift.
- **`node_modules` is broken/incomplete** (only 38 packages; `eslint.js` and `vite.js` entry files missing), so `npm run lint` and `npm run build` currently **cannot run**.
- **TypeScript strict mode is disabled** (`tsconfig.app.json:18` `strict:false`, plus `noImplicitAny:false`, `noUnusedLocals:false`), and ESLint turns off `no-unused-vars` (`eslint.config.js:23`) — bugs that should be caught at compile time silently pass.
- **No tests, no CI.** No Vitest/Jest/RTL setup, no GitHub Actions workflow.
- **~35 unused dependencies** (recharts, date-fns, react-day-picker, cmdk, input-otp, react-resizable-panels, vaul, react-hook-form, zod, @hookform/resolvers, etc.) and **~40 unused shadcn/ui components** bloat install size.
- **Dead files**: `App.css` (Vite starter, not imported), `placeholder.svg`, `use-magnetic.tsx` (duplicates `MagneticWrapper`), `use-mobile.tsx`, `NavLink.tsx`, empty `.github/appmod/appcat`.
- **README.md is untouched Lovable boilerplate** — no real docs, scripts, or setup instructions.
- **SEO gaps in `index.html`**: no `og:image`, no canonical URL, no Twitter card, no `theme-color`; `favicon.ico` exists but is unused (page references `my-icon.png`).

---

## 6. What It Needs to Follow Best Practices

### 6.1 Fix the functional bugs first
1. Add a real CV file to `public/` (or replace the button with a link to a hosted PDF).
2. Move all contact/social data to a typed config or `.env`; replace every `example.com` / fake `wa.me` link with real ones.
3. Wire the "View Project" button or remove it.
4. Delete `CodeIDETwo.tsx` (and its import) or merge it into a single reusable `CodeIDE` driven by props.
5. Remove the `.snap-y` queries or add the class; better, use a scroll util built on `window`.
6. Replace `dangerouslySetInnerHTML` with a proper lightweight syntax highlighter (e.g. `prism-react-renderer`) or plain tokenized `<span>`s.
7. Make SVG gradient IDs unique per instance (prefix with `useId()`).

### 6.2 Performance
8. Throttle scroll handlers with `requestAnimationFrame` and drive transforms through refs (no `setState` per event).
9. Throttle/debounce mousemove handlers; use `transform` via motion values (framer-motion) instead of React state.
10. Lazy-load below-the-fold sections with `React.lazy` + `Suspense`; at minimum split the heavy ones (`ProductivityStack`, `CodeIDE`, `DeveloperOS`).
11. Respect `prefers-reduced-motion`; pause off-screen animations via `IntersectionObserver` on section mount.
12. Fix the `use-toast` effect deps (`[]`) or drop the unused toast stack entirely.

### 6.3 Code quality & tooling
13. Enable **strict TypeScript** and add a `typecheck` script; fix all `any`s (e.g. `ProductivityStack` `icon: any`).
14. Re-enable `no-unused-vars` and add `eslint-plugin-jsx-a11y`; fix the `react-hooks/exhaustive-deps` warnings.
15. Standardize on **one package manager** and delete the other lockfiles; add an `engines` field.
16. Reinstall deps cleanly so `lint`/`build`/`preview` run from a fresh clone.
17. Add **Vitest + React Testing Library** with a few smoke tests, and a GitHub Actions workflow (`lint` → `typecheck` → `test` → `build`).

### 6.4 Architecture
18. Extract content into typed data modules (`src/data/projects.ts`, `socials.ts`, `testimonials.ts`, `skills.ts`, `quotes.ts`) or a headless CMS — remove ~600 lines of inline data from components.
19. Introduce a `hooks/useScrollSpy`, `useParallax`, `useTheme` abstraction to replace duplicated scroll/theme logic across 5+ components.
20. Wrap the app in an error boundary and configure `QueryClient` with sensible defaults (retries, staleTime).
21. Apply React component best practices: `React.memo` for pure sections, `useCallback`/`useMemo` where profiling warrants it, keys from stable ids.
22. Use the already-installed `next-themes` (or consolidate `lib/theme.ts` + `ThemeToggle` into one hook) so the theme matches system changes and syncs across tabs.

### 6.5 Accessibility & SEO
23. Support `prefers-reduced-motion` app-wide (disable marquees, cursor, parallax).
24. Add `aria-label`s to all icon-only buttons and role/aria-modal to the decision modal; trap focus while the modal is open.
25. Improve contrast of muted text and fix dark-mode skill icons.
26. Add `og:image`, canonical URL, Twitter card, and `theme-color` meta; point social links at the real profiles.
27. Update the README with real project documentation (stack, scripts, structure, deploy steps).

---

## 7. Priority Summary

| Priority | Item |
|----------|------|
| **P0 (broken)** | CV download, fake contact links, dead "View Project" button, cannot `lint`/`build` (broken `node_modules`), duplicate lockfiles |
| **P1 (quality)** | Enable strict TS, re-enable lint rules, delete dead code (`CodeIDETwo`, `App.css`, unused hooks/ui), add `typecheck`/tests/CI |
| **P2 (performance)** | rAF-throttled scroll, memoized sections, lazy-load heavy sections, respect reduced-motion |
| **P3 (polish)** | Data-driven content, theme hook consolidation, a11y labels, SEO meta, real README |
