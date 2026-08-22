# Ramez Khaled — Front-End Developer Portfolio

A responsive, motion-rich single-page portfolio for **Ramez Khaled**. It presents professional background, skills, development process, selected case studies, testimonials, and contact links in a custom React interface.

The site is designed as a client-side application with a light/dark theme, smooth in-page navigation, animated section reveals, and interactive project decision records.

## Live content

The portfolio includes:

- An animated hero with rotating professional titles and calls to action.
- About, skills, developer workflow, and “How My Brain Works” sections.
- Three project case studies: Ashiaa Store, StoreIt, and Texon Official Portfolio.
- Project decision modals describing technical choices, trade-offs, challenges, and future improvements.
- A code-IDE themed section, design/development philosophy, productivity stack, quote, testimonials, and contact section.
- A downloadable CV served from `public/Ramez-Khaled-Attia-lst.pdf`.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 with the React SWC plugin |
| Styling | Tailwind CSS 3, PostCSS, and custom CSS design tokens |
| UI primitives | Radix UI via shadcn/ui components |
| Animation | Framer Motion and custom CSS animations |
| Routing | React Router DOM |
| Icons | Lucide React |
| Utilities | clsx and tailwind-merge |

## Getting started

### Prerequisites

- Node.js 20 LTS or later is recommended.
- npm (included with Node.js).

### Install and run

```bash
git clone <repository-url>
cd ramez-portfolio
npm install
npm run dev
```

Vite starts the local development server at [http://localhost:8080](http://localhost:8080).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run build:dev` | Creates a development-mode production build. |
| `npm run preview` | Serves the built `dist/` directory locally for preview. |
| `npm run lint` | Runs ESLint across the project. |

To validate a production build locally:

```bash
npm run build
npm run preview
```

## Project structure

```text
.
├── public/                         # Static files served from the site root
│   ├── images/projects/            # Project card images
│   ├── Ramez-Khaled-Attia-lst.pdf  # Downloadable CV
│   ├── my-icon.png                 # Browser favicon
│   └── robots.txt
├── src/
│   ├── assets/                     # Imported local visual assets
│   ├── components/
│   │   ├── ui/                     # Reusable shadcn/Radix UI primitives
│   │   ├── projects-data.json      # Case-study content
│   │   ├── Hero.tsx, About.tsx…    # Portfolio sections
│   │   └── ScrollReveal.tsx…       # Navigation and visual-effect components
│   ├── hooks/                      # Reusable React hooks
│   ├── lib/
│   │   ├── theme.ts                # Theme initialization
│   │   └── utils.ts                # Tailwind class-name helper
│   ├── pages/
│   │   ├── Index.tsx               # Single-page portfolio composition
│   │   └── NotFound.tsx            # Fallback route
│   ├── App.tsx                     # Providers and route definitions
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles and CSS variables
├── index.html                      # Document metadata, fonts, and root element
├── tailwind.config.ts              # Tailwind theme and animation extensions
├── vite.config.ts                  # Vite config and `@` → `src` alias
└── package.json                    # Dependencies and scripts
```

## Application architecture

`src/main.tsx` initializes the saved/system color theme, imports global styles, and mounts the React application. `src/App.tsx` provides React Query, tooltip, toast, and section-transition context before defining two routes:

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `pages/Index.tsx` | The complete portfolio experience. |
| `*` | `pages/NotFound.tsx` | A simple 404 fallback page. |

`Index.tsx` composes the page sections in order and mounts global visual layers such as the preloader, scroll-progress indicator, parallax background, particle field, noise overlay, custom cursor, section indicator, and floating action button. Larger visual sections—Developer OS, Code IDE, and Productivity Stack—are lazy-loaded with `React.lazy` and `Suspense`.

## Design and interaction system

- **Theme:** `src/lib/theme.ts` reads the `theme` value from `localStorage`; when no preference exists, it uses the operating system color preference. The selected mode is represented by a `dark` class on the document root.
- **Tokens:** `src/index.css` defines the color, surface, typography, and visual-effect tokens; `tailwind.config.ts` exposes them to Tailwind utilities.
- **Typography:** Space Grotesk, Inter, and Cormorant Garamond are loaded from Google Fonts in `index.html`.
- **Navigation:** The navbar and section indicator offer smooth in-page navigation. `SectionTransition` provides the transition behavior between sections.
- **Motion:** Framer Motion handles reveal/stagger effects, while CSS handles ambient backgrounds, floating elements, gradients, and other decorative animation.

## Updating portfolio content

Most content is currently maintained alongside the section that renders it.

| What to update | Primary location |
| --- | --- |
| Case-study titles, copy, technologies, decisions, and links | `src/components/projects-data.json` |
| Project card layout and project-image mapping | `src/components/ProjectCard.tsx` |
| Skills and skill-card visuals | `src/components/Skills.tsx` and `src/components/SkillCard.tsx` |
| Bio and professional statistics | `src/components/About.tsx` |
| Professional titles and hero messaging | `src/components/Hero.tsx` |
| Testimonials and quote content | `src/components/Testimonials.tsx` and `src/components/Quote.tsx` |
| Contact and social links | `src/components/Contact.tsx` and `src/components/Footer.tsx` |
| CV file and download target | `public/Ramez-Khaled-Attia-lst.pdf` and `src/components/Navbar.tsx` |
| Page title, description, icon, and Open Graph metadata | `index.html` |

### Adding a project

1. Place its project image in `public/images/projects/`.
2. Add an item to `src/components/projects-data.json` with its overview, tech stack, optional live/repository URLs, and `decisions` object.
3. Update the image lookup in `ProjectCard.tsx` if the new `image` key is not already supported.
4. Run `npm run build` to check the production bundle.

## Static assets

Files inside `public/` are exposed from the root URL. For example:

```text
public/images/projects/storeit.png  →  /images/projects/storeit.png
public/Ramez-Khaled-Attia-lst.pdf   →  /Ramez-Khaled-Attia-lst.pdf
```

Use `src/assets/` for files that should be imported by source code and processed by Vite; use `public/` for files that need a stable public URL, such as the CV, favicon, and project images.

## Deployment

This is a static Vite application. Build it with:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static hosting platform (for example, Vercel, Netlify, Cloudflare Pages, or GitHub Pages). Configure the host’s build command as `npm run build` and its publish/output directory as `dist`.

Because the app uses `BrowserRouter`, configure a single-page-application fallback so unknown paths return `index.html`; React Router will then render the 404 page when appropriate.

## Development notes

- The `@/` import alias maps to `src/`; for example, `@/components/Hero` resolves to `src/components/Hero`.
- The app uses client-side, hard-coded content and does not require environment variables or a backend service to run.
- Keep project URLs and external contact links current before deploying.
- `PROJECT_ANALYSIS.md` contains a separate engineering audit and improvement checklist for this codebase.

## Contact

- GitHub: [RamezKhaled77](https://github.com/RamezKhaled77)
- LinkedIn: [ramez-khaled](https://linkedin.com/in/ramez-khaled)
- Email: [ramezkhaled259@gmail.com](mailto:ramezkhaled259@gmail.com)
