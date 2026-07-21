# Family Companion AI

Family Companion AI is a modern family-support platform concept for parents, children, and shared household routines. This repository currently contains a polished Next.js demo with local-first interactions, browser-local demo memories, and an optional server-side AI companion route.

The product direction is supportive, trustworthy, child-aware, and evidence-informed. It is designed to help families reflect, communicate, and practice small routines without pretending to replace parents, professionals, or emergency services.

## Current MVP scope

- Public landing page for Family Companion AI
- Multi-step family onboarding demo with local component state
- Demo family dashboard with wellbeing snapshot, routines, insights, goals, and quick actions
- Parent companion page with stress and energy check-ins
- Child companion page with simple mood selection, calming activity, and trusted-adult prompt
- Shared family space for check-ins, goals, appreciation, and routines
- Reusable UI components, typed mock data, and accessible interaction patterns
- Server-side companion API route with deterministic fallback when live AI is not configured
- Evidence registry, safety classification, structured response validation, and explicit memory consent UI

This milestone does not include authentication, databases, analytics, production safeguarding operations, or persistent server-side storage.

## Main routes

- `/` - Public landing page
- `/onboarding` - Local demo family onboarding
- `/dashboard` - Demo family dashboard
- `/parent` - Parent companion demo
- `/child` - Child companion demo
- `/family` - Shared family space
- `/api/companion` - Server-side companion response route

## Technical stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-inspired local primitives
- Lucide icons
- Static mock data and local React state
- Optional OpenAI Responses API integration through a server-only App Router route
- ESLint and TypeScript checks

## AI architecture

The companion UI calls `POST /api/companion`; client components never read API keys. The route validates the request, classifies safety language, limits evidence to allowed records for the current page context, and then chooses one provider:

- Live AI provider: uses `OPENAI_API_KEY` on the server and returns validated structured JSON.
- Deterministic demo provider: uses the local fallback helper and works without a key.

The live provider is isolated in `lib/ai/provider.ts`. It sends only the current message, page context, recent browser-local demo memories, safety classification, and allowed evidence summaries. It does not log private family content.

AI responses must include acknowledgement, possible pattern, practical next step, why it may help, evidence IDs, safety level, suggested replies, optional memory suggestion, and a limitations note. If the live response fails, times out, or cannot be parsed, the route returns the safe deterministic fallback.

## Environment setup

Copy `.env.example` to `.env.local` and add a server-side key when live AI is needed:

```bash
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-5.6-sol
```

`OPENAI_MODEL` is optional. The demo mode works without any environment variables.

In development, the companion panel includes a Real AI / Deterministic demo toggle. If no key is configured, Real AI automatically falls back to the deterministic demo path.

## Evidence guardrails

Evidence records live in `lib/ai/evidence-registry.ts`. They include official-source metadata from NHS, NICE, WHO, UNICEF, CDC, and the American Academy of Pediatrics / HealthyChildren.org, plus clearly labelled product hypotheses where the demo uses an unverified product principle.

The assistant may only return evidence IDs from the allowed records for the current context. The UI shows citations only behind "View sources" and labels records that still need production verification. The app does not invent quotations, study results, statistics, or source claims.

## Memory consent

The AI can suggest a memory, but it cannot save one automatically. The UI asks, "Would you like this remembered in this browser?" and offers Remember, Edit before saving, or Do not remember.

Accepted memories are stored only in browser local storage for this demo. There is no backend memory, account memory, database, or hidden retention.

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
npm run test
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

Family Companion AI is not emergency support, medical care, mental-health diagnosis, legal advice, therapy, safeguarding operations, or crisis intervention. It should not be used as a substitute for professional judgment or trusted adult support.

For urgent safeguarding, self-harm, or immediate danger language, the route bypasses normal coaching and returns a trusted-adult escalation message with an emergency placeholder. Production use would require professional safeguarding review, region-specific emergency guidance, incident handling, monitoring, and clinical/legal review.

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
- Expand the reviewed source library with professional sign-off
- Complete safeguarding, consent, logging, and escalation policies before production launch
