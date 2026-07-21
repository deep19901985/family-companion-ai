# Family Companion AI

Family Companion AI is a hackathon-ready family support demo for parents,
children, and shared household routines. It combines a polished Next.js
experience with an optional server-side AI companion, deterministic safety
guardrails, reviewed source metadata, and explicit browser-local memory
consent.

The product is designed to support family conversations, not replace parents,
clinicians, educators, safeguarding professionals, or emergency services. It
does not diagnose, provide therapy, or deliver crisis care.

## Product overview

- Landing page with product principles, trust boundaries, and demo journeys
- Six-step local onboarding flow
- Family dashboard with goals, timelines, summaries, and guided demo state
- Parent check-in with stress, energy, reflection, and saved next steps
- Child check-in with age-aware language, breathing activity, and trusted-adult
  prompts
- Shared family routines, appreciation, calendar, and goals
- Live AI companion with a deterministic fallback
- Context-scoped evidence registry with transparent confidence labels
- Browser-local, reviewable, editable, and deletable demo memories
- Deterministic safeguarding bypass for urgent or immediate-danger language

This repository intentionally has no authentication, database, analytics, or
server-side memory.

## Architecture

The application uses the Next.js App Router. Most pages render typed demo data
and add focused client-side state for interactions. The only server-side product
boundary is `POST /api/companion`.

The companion request flow is:

1. The client submits the current message, page context, up to eight recent
   browser-local demo memories, and the current companion mode.
2. The API route rejects oversized or malformed requests and normalizes bounded
   input.
3. Deterministic code classifies safety language before any model call. Urgent
   safeguarding or immediate danger bypasses normal AI coaching.
4. The server selects only reviewed evidence records relevant to the message and
   current page context.
5. The provider uses GPT-5.6 when a server-side key is configured, or the local
   deterministic provider when it is not.
6. The response must match a strict JSON schema with bounded strings and arrays.
7. The server treats its safety result as a minimum and filters every returned
   evidence ID against its own allowlist.
8. The UI labels AI interpretation separately from sources and asks for consent
   before saving a suggested memory.

OpenAI response storage is disabled in the provider request. No API key, raw
provider error, or private family message is logged by the application.

## Main routes

- `/` - product landing page
- `/onboarding` - local family setup demo
- `/dashboard` - family overview and guided journey
- `/parent` - parent companion and reflection
- `/child` - child companion and trusted-adult support
- `/family` - shared family routines and goals
- `/api/companion` - validated server-side companion endpoint

## Technology

- Next.js 15 with App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS
- Local shadcn/ui-inspired primitives
- Lucide icons
- OpenAI Responses API through a server-only provider
- Node test runner for deterministic guardrail tests
- ESLint with Next.js core web vitals rules

## Installation

Requirements:

- Node.js 20 or newer
- npm

Install dependencies from the repository root:

```bash
npm install
```

## Environment variables

Copy `.env.example` to `.env.local` for live AI. `.env.local` is ignored by Git.

```bash
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-5.6-sol
```

- `OPENAI_API_KEY` is optional and must remain server-side. Without it, the app
  uses the deterministic demo provider.
- `OPENAI_MODEL` is optional and defaults to `gpt-5.6-sol`.

Never expose the key through a `NEXT_PUBLIC_` variable or commit a populated
environment file.

## Running locally

Start the development server:

```bash
npm run dev
```

Open the URL printed by Next.js, normally `http://localhost:3000`.

Development builds show a Live AI / Deterministic demo switch in each companion
panel. Production builds do not expose that control; the server still falls back
safely when live generation is unavailable.

## Testing and validation

Run the complete local validation suite:

```bash
npm run lint
npm run type-check
npm test
npm run build
```

The deterministic tests cover request validation, structured response parsing,
safety classification and precedence, evidence filtering, source-versus-
hypothesis status, fallback responses, and memory consent conversion.

## Deployment

The project can be deployed to any Node-compatible Next.js host, including
Vercel:

1. Import the GitHub repository.
2. Use the standard Next.js build command, `npm run build`.
3. Add `OPENAI_API_KEY` as a protected server-side environment variable.
4. Optionally set `OPENAI_MODEL`; otherwise the checked-in default is used.
5. Verify the deterministic fallback and urgent safeguarding path after deploy.

Before public use with real family data, add authentication, role-aware access,
rate limiting, retention controls, monitoring, regional emergency guidance, and
professional safeguarding, clinical, privacy, and legal review. The current
repository is a submission-ready demo, not a production care service.

## Project structure

```text
app/
  api/companion/route.ts  Validated server-side companion endpoint
  */page.tsx              Product routes
components/
  ui/                     Shared interface primitives and states
  companion-panel.tsx     Chat, response, source, and memory-consent UI
  evidence-drawer.tsx     Source attribution and confidence disclosure
hooks/
  use-demo-memories.ts    Bounded browser-local demo memory state
lib/
  ai/                     Provider, schema, evidence, memory, and safety logic
  mock-data.ts            Typed product demo data
  milestone2-data.ts      Guided journey, timeline, and local memory fixtures
  types.ts                Shared domain and API contracts
tests/
  ai-guardrails.test.ts   Deterministic safety and evidence tests
```

## Safety, evidence, and privacy

Safety classification is deterministic and runs before live AI. Urgent messages
do not enter the normal coaching flow. The user is directed to a trusted adult,
local emergency support, and a clearly labelled UK NHS urgent-help resource.
Outside the UK, the UI instructs users to use local emergency services.

The model never supplies source URLs. It may return only evidence IDs, which the
server resolves against `lib/ai/evidence-registry.ts`. Source metadata is labelled
as a clinical guideline, official guidance, professional guidance, or an
unverified product hypothesis. If no relevant reviewed source exists, the UI
says so instead of attaching a generic citation.

Demo memories are stored in localStorage only after explicit user action. They
can be reviewed, edited before saving, removed individually, or cleared. When
Live AI is used, the current message and up to eight selected recent memories
are sent to the configured provider; this is disclosed beside the input and
memory consent controls.

## How Codex and GPT-5.6 were used

Codex with GPT-5.6 performed the final architecture, safety, API, privacy, and
submission-readiness review of this hackathon repository. This was an
engineering review, not clinical, safeguarding, privacy, or legal sign-off.

Codex accelerated repository inspection, architecture tracing, focused code
changes, test expansion, accessibility review, documentation, and repeated
validation. It worked within the existing App Router and provider architecture
rather than replacing it. Human milestone review remained important for the
live AI, fallback, evidence, memory-consent, guided-demo, and safeguarding flows.

GPT-5.6 is used only by the optional server-side companion provider. Given a
current message, page context, recent user-approved demo memories, a deterministic
safety classification, and a small set of relevant source summaries, it produces
a bounded structured suggestion. It does not choose arbitrary URLs, write to
memory, determine the authoritative safety outcome, or replace the deterministic
fallback.

Key technical decisions were to keep the API key server-only, disable provider
response storage, classify urgent language before generation, validate all model
output against a strict schema, re-check safety after generation, resolve
citations from a fixed registry, and require explicit memory consent. The final
review workflow combined manual code inspection, authoritative source metadata
checks, deterministic tests, linting, strict TypeScript checks, a production
build, and responsive browser verification.

## Known limitations

- No authentication, roles, database, or server-side persistence
- No rate limiting or abuse monitoring
- No production safeguarding operations or incident response
- No automatic region detection for emergency resources
- Evidence metadata is reviewed for the demo, not clinically signed off for a
  deployed care product
- Browser-local data can be cleared by the browser and is not encrypted by this
  application
