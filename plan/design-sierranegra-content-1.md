---
goal: Replace landing page copy and elements with Sierra Negra Cafetalero Cluster content
version: 1.0
date_created: 2026-08-04
owner: DaveCuc
status: 'Planned'
tags:
  - content
  - design
  - landing
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan details the replacement of texts and static content on the main landing page to transition from the generic "Reserva de la Biosfera Tehuacán-Cuicatlán" copy to the scientific study: **"Modelo de Clúster para la Caficultura de la Sierra Negra de Puebla"**. 

All logic, props, events, and dynamic features (such as event carousel mechanics or map components) remain unchanged, in strict accordance with functional preservation guidelines.

---

## 1. Requirements & Constraints

- **REQ-005**: Replace the hero text (title and subtitle) with the official study title: "Modelo de Clúster para la Caficultura de la Sierra Negra de Puebla".
- **REQ-006**: Add a primary Call to Action (CTA) button in the hero linking to the study DOI (`10.37811/cl_rcm.v9i6.21431`).
- **REQ-007**: Map Context and Limitations into the about sections, showing the competitive advantages (volcanic soil, microclimate) and constraints (parcel size < 3ha, low yields).
- **REQ-008**: Update footer and contact credits to reference the study authors (Iniria Guevara Ramírez, etc.) and the official academic institution (Tecnológico Nacional de México / Instituto Tecnológico de Tehuacán).
- **CON-004**: Prohibit changes to data structures, routing logic, state managers, and React components' event handlers. Only text interpolation, image assets, and class names may be updated.
- **CON-005**: The primary CTA for downloading the research must target a new tab (`target="_blank" rel="noopener noreferrer"`) for external links.

---

## 2. Implementation Steps

### Phase 1: Content Injection in Hero

- **GOAL-005**: Re-theme the landing page Hero section content.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-009** | Open `HeroSection.jsx` and replace the H2 title with the new primary title (H1 from blueprint) and the paragraph with the H2 subtitle. Add the "Descargar Investigación" button linking to the DOI URL. | | |

### Phase 2: Context and Project Details Injection

- **GOAL-006**: Replace the contextual details on the homepage.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-010** | Modify the content in `ConocenosSection.jsx` to display the "CONTEXTO Y PROBLEMÁTICA" and the "EL MODELO (Propuesta de Valor)" sections. Preserve layout and academic logos (ITT, DEPI) while adjusting associated text nodes. | | |
| **TASK-011** | Update `CursosSection.jsx` to map the "DIMENSIONES ESTRATÉGICAS" (Económica, Social e Institucional, Ambiental - Tecnológica) from the blueprint as the primary columns/cards. | | |

### Phase 3: Credits and Footer Rebranding

- **GOAL-007**: Update credits and institution references.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| **TASK-012** | Refactor the `Footer` component inside `HomeLayout.jsx` to list the researchers (Iniria Guevara Ramírez, Iván Áraoz Baltazar, etc.) and explicitly reference the academic origin (Tecnológico Nacional de México / Instituto Tecnológico de Tehuacán). | | |

---

## 3. Alternatives

- **ALT-002**: Dynamically loading the landing page copy from a JSON configuration file. *Rejected* because static text replacement in JSX elements is simpler, faster, has zero performance overhead, and requires no additional state-management logic.

---

## 4. Dependencies

- **DEP-002**: React Router / Inertia Links configuration.

---

## 5. Files

- **FILE-007**: `resources/js/pages/LandingPage/Components/HeroSection.jsx` ([HeroSection.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/pages/LandingPage/Components/HeroSection.jsx))
- **FILE-008**: `resources/js/pages/LandingPage/Components/ConocenosSection.jsx` ([ConocenosSection.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/pages/LandingPage/Components/ConocenosSection.jsx))
- **FILE-009**: `resources/js/pages/LandingPage/Components/CursosSection.jsx` ([CursosSection.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/pages/LandingPage/Components/CursosSection.jsx))
- **FILE-010**: `resources/js/Layouts/HomeLayout.jsx` ([HomeLayout.jsx](file:///C:/Users/DaveCuc/Projects/cafe/cafe-platform/resources/js/Layouts/HomeLayout.jsx))

---

## 6. Testing

- **TEST-003**: Verify that the "Descargar Investigación" button links correctly to `https://doi.org/10.37811/cl_rcm.v9i6.21431` and opens in a new tab.
- **TEST-004**: Check for text truncation or layout shifts in mobile viewports due to length changes in titles or descriptions.

---

## 7. Risks & Assumptions

- **RISK-002**: Scientific text descriptions are longer than previous marketing copy, which could cause content overflows. Card heights and flex-grow properties should be adjusted to prevent text overlapping.

---

## 8. Related Specifications / Further Reading

- [Content Blueprint: Clúster Cafetalero Sierra Negra](file:///C:/Users/DaveCuc/Projects/cafe/blueprint_landing_cafe_sierra_negra.md)
