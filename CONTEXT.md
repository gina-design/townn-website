# Session Context — townn-website

## What This Is
Marketing website for Townn (neighborhood community app). Next.js 16 + Tailwind CSS 4.
Deployed on Vercel, source on GitHub at `github.com/gina-design/townn-website`.
Live URL: `townn-website.vercel.app` (custom domain TBD).

## Current Status
Site is live on Vercel. Loops integration is wired up and the `LOOPS_API_KEY` environment
variable has been added to Vercel. Signups should be flowing into Loops.

## What's Built
- **Hero** — headline ("Meet your neighbors. For real this time."), subhead, waitlist signup form
- **Vision pillars** — Gather (Now / active), Help (Phase Two), Discuss (The Horizon)
- **Beta section** — separate signup form for beta testers
- **Footer** — © Townn, Made with care in Chapel Hill
- **API route** (`app/api/signup/route.ts`) — posts to Loops contacts API; handles create + update (409 dedup)

## Signup Forms
Both forms (`waitlist` and `beta`) post to `/api/signup`. The API adds contacts to Loops with:
- `waitlist: true` for waitlist signups
- `beta_tester: true` for beta tester signups
- Source is tagged as `"townn.io"`

## Design
- Background: `#F7F3EE` (warm off-white)
- Primary/teal: `#1ACABC`
- Text: `#1C1A17`
- Muted text: `#8C7B6B`
- Border: `#E2D9CF`
- Display font: Fraunces (var(--font-display))
- Body font: set via var(--font-body)

## Next Steps / Open Items
- Custom domain (townn.io) — not yet connected to Vercel
- Verify Loops signups are actually coming through after deploy
- Any design or copy changes she wants

## Last Session
Got the site deployed end-to-end: GitHub → Vercel import → Loops API key added as env var.
Both waitlist and beta tester signup forms are wired up and live.
