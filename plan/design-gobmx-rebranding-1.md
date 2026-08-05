---
goal: Implement GobMx 2024-2030 design system on the platform frontend
version: 1.0
date_created: 2026-08-04
owner: DaveCuc
status: 'Planned'
tags:
  - design
  - rebranding
  - frontend
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan details the visual refactoring of the platform's frontend to adopt the official **Gobierno de México (GobMx) 2024-2030** branding guidelines. In strict compliance with repository constraints, all modifications are visual-only, targeting class names, stylesheets, custom properties, and static assets. No application or business logic will be modified.

---

## 1. Requirements & Constraints

- **REQ-001**: Integrate the official GobMx 2024-2030 Design Tokens (color variables) into the global stylesheet and Tailwind CSS configuration.
- **REQ-002**: Align layout components to respect the official Imagotipo structure (horizontal/vertical layout) and clear space rules.
- **REQ-003**: Enforce styling restrictions on the "Joven Mexicana" asset, ensuring it convives with institutional colors and cannot have filters, aspect-ratio distortions, or color inversions.
- **REQ-004**: Implement background restrictions, ensuring the imagotipo is rendered only on institutional color tokens, and that dark backgrounds utilize legibility-optimized versions of the logo.
- **CON-001**: **Zero logic alterations**: React hooks, Inertia events/routing, event handlers (`onClick`, `onSubmit`), Route helpers (`route()`), properties, and server validations must remain completely untouched.
- **CON-002**: Digital screens are forbidden from rendering the 1-color (monochrome) high-contrast imagotipo; a color version must be used.
- **CON-003**: Scale of gray conversions for the imagotipo must strictly use a maximum/absolute value of 70% black (`#4D4D4D`).
- **GUD-001**: Padding area of protection (clear space) around the imagotipo must be equal to or greater than the height/width of the letter "O" in the word "México" from the official typography.
- **PAT-001**: Extract repeating utility class structures into `app.css` under clean semantic wrappers using Tailwind's `@apply` directive to maintain codebase cleanliness.

---

## 2. Implementation Steps

### Phase 1: Style Definitions & Configuration Integration

- **GOAL-001**: Register GobMx 2024-2030 design tokens in app.css and tailwind.config.js.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-001** | Add GobMx color variables (`--color-dorado-claro`, `--color-dorado-oscuro`, `--color-guinda-oscuro`, `--color-guinda-claro`, `--color-negro-neutro`, `--color-verde-oscuro`, `--color-verde`, `--color-gris`) to the `:root` and `.dark` blocks in `app.css`. Map default `--brand` colors to use these new GobMx tokens. | | |
| **TASK-002** | Extend `tailwind.config.js` to export the new GobMx design tokens (e.g. `gobmx-guinda-oscuro`, `gobmx-dorado-claro`) so they are accessible as standard Tailwind utilities in utility class names. | | |

### Phase 2: Layout Rebranding & Logo Spacing

- **GOAL-002**: Adapt layout headers, footers, and sidebars to respect GobMx imagotipo and spacing rules.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-003** | Refactor `HomeLayout.jsx` navbar, mobile sheets, and footer to replace the old branding colors (forest greens) with GobMx Guinda and Dorado. Adjust logo containers to enforce the protection clear space area (`GUD-001`). | | |
| **TASK-004** | Update the sidebar logo container in `MainLayout.jsx` to use the GobMx imagotipo alignment and padding rules, styling sidebar links to match the new color scheme. | | |

### Phase 3: Visual Polish of Pages

- **GOAL-003**: Update color usage on main pages.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-005** | Refactor class names in `Inicio.jsx` to replace old brand classes with new GobMx design tokens, updating button states and cards. | | |
| **TASK-006** | Refactor class names in `Cursos.jsx` to transition list/filter cards and page sections to the new GobMx design tokens. | | |

### Phase 4: Asset Constraints & Compilation Audit

- **GOAL-004**: Enforce constraints for Joven Mexicana illustration and color rendering.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-007** | Write global CSS utility classes in `app.css` to restrict the aspect ratio, prohibit filters/inversions, and lock styling variables for the "Joven Mexicana" illustration. | | |
| **TASK-008** | Run a compilation check to verify that visual modifications do not introduce any syntax or compilation errors under Vite. | | |

---

## 3. Alternatives

- **ALT-001**: Applying color values as inline Tailwind hex codes (e.g. `bg-[#611232]`). *Rejected* because mapping them to global CSS variables and extending `tailwind.config.js` ensures central maintainability and lets us reuse variables semantically.

---

## 4. Dependencies

- **DEP-001**: PostCSS / Tailwind CSS build configuration.

---

## 5. Files

- **FILE-001**: `resources/css/app.css` ([app.css](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/css/app.css))
- **FILE-002**: `tailwind.config.js` ([tailwind.config.js](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/tailwind.config.js))
- **FILE-003**: `resources/js/Layouts/HomeLayout.jsx` ([HomeLayout.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/Layouts/HomeLayout.jsx))
- **FILE-004**: `resources/js/Layouts/MainLayout.jsx` ([MainLayout.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/Layouts/MainLayout.jsx))
- **FILE-005**: `resources/js/pages/LandingPage/Inicio.jsx` ([Inicio.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/pages/LandingPage/Inicio.jsx))
- **FILE-006**: `resources/js/pages/LandingPage/Cursos.jsx` ([Cursos.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/pages/LandingPage/Cursos.jsx))

---

## 6. Testing

- **TEST-001**: Manual visual inspection of headers, footers, and page sections using the browser, confirming color contrast and imagotipo clear spacing rules.
- **TEST-002**: Execution of the Vite dev compiler to verify that the build succeeds without error.

---

## 7. Risks & Assumptions

- **RISK-001**: High contrast requirements may fail accessibility criteria if text colors do not have proper background contrast. Guinda (`#611232`) should be paired with white/dorado-claro and verified.
- **ASSUMPTION-001**: The target repository contains a standard build environment that handles standard CSS variables and standard Tailwind extensions.

---

## 8. Related Specifications / Further Reading

- [Design Specification: GOBIERNO DE MÉXICO 2024-2030](file:///C:/Users/DaveCuc/Projects/cafe/design_spec_gobmx_antigravity.md)
- [Rules for Frontend (laravel + inertia + react)](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/.agents/workflows/rules-for-frontend.md)
