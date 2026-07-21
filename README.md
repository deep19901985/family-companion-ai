# Family Companion AI

Family Companion AI is a modern family-support platform concept for parents, children, and shared household routines. This repository currently contains the first working frontend foundation: a polished Next.js demo with static mock data and local-only interactions.

The product direction is supportive, trustworthy, child-aware, and evidence-informed. It is designed to help families reflect, communicate, and practice small routines without pretending to replace parents, professionals, or emergency services.

## Current MVP scope

- Public landing page for Family Companion AI
- Multi-step family onboarding demo with local component state
- Demo family dashboard with wellbeing snapshot, routines, insights, goals, and quick actions
- Parent companion page with stress and energy check-ins
- Child companion page with simple mood selection, calming activity, and trusted-adult prompt
- Shared family space for check-ins, goals, appreciation, and routines
- Reusable UI components, typed mock data, and accessible interaction patterns

This milestone does not include authentication, databases, paid services, live AI APIs, analytics, or environment variables.

## Main routes

- `/` - Public landing page
- `/onboarding` - Local demo family onboarding
- `/dashboard` - Demo family dashboard
- `/parent` - Parent companion demo
- `/child` - Child companion demo
- `/family` - Shared family space

## Technical stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-inspired local primitives
- Lucide icons
- Static mock data and local React state
- ESLint and TypeScript checks

## Local setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

Run validation:

```bash
npm run lint
npm run type-check
npm run build
```

## Product principles

- Support families without replacing parents, caregivers, clinicians, educators, or emergency services
- Keep parent oversight visible, especially in child-facing experiences
- Use calm, age-aware, non-manipulative language
- Avoid dependency-forming language or claims that AI is human
- Frame insights as patterns to explore, not judgments or diagnoses
- Use evidence-informed wording without claiming scientific proof for individual families
- Respect privacy and consent boundaries

## Safety limitations

Family Companion AI is not emergency support, medical care, mental-health diagnosis, legal advice, therapy, or crisis intervention. It should not be used as a substitute for professional judgment or trusted adult support.

The current demo stores no real data, connects to no external services, and uses only static mock data plus temporary local component state.

## Future roadmap

### Today: Parent and Child Companion

Guided check-ins, practical prompts, routine support, child-safe language, and parent-visible safeguards.

### Next: Couple Support

Shared adult reflection tools, communication scaffolds, and support for household coordination without replacing counseling or legal advice.

### Future: Family Operating System

A complete family coordination layer for routines, goals, insights, planning, communication, learning, and support.

## Suggested next milestones

- Add persistent local storage for demo onboarding state
- Introduce route-level tests and component tests
- Add design-system documentation for UI primitives
- Add authentication and role-aware access after safety requirements are defined
- Add a reviewed source library for evidence-informed guidance
- Add live AI only after safeguarding, consent, logging, and escalation policies are specified
