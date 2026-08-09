# APS MINDS — AUTH LOGO + PROJECT CLEANUP

## Task 1 — Login + Signup Logo
- [x] Login: APS MINDS logo + "APSMINDS" + "AUTONOMOUS INTELLIGENCE" added (reused `apsminds-logo.jpg`)
- [x] Signup: APS MINDS logo + "APSMINDS" + "AUTONOMOUS INTELLIGENCE" added (reused `apsminds-logo.jpg`)
- [x] Existing logo asset `frontend/src/assets/apsminds-logo.jpg` reused — no duplicate created
- [x] Logo responsive: 64px mobile (h-16) / 80px desktop (sm:h-20), cyan glow, preserve aspect ratio
- [x] Fix Login indentation on `glass-strong` div + `error` state

## Task 2 — Project Cleanup
### Empty/unused files → delete
- [x] `frontend/src/components/3d/Earth.tsx`
- [x] `frontend/src/components/effects/ParticleField.tsx`
- [x] `frontend/src/components/effects/Scanlines.tsx`
- [x] `frontend/src/components/layout/AgentShell.tsx`
- [x] `frontend/src/components/layout/MobileMenu.tsx`
- [x] `frontend/src/components/ui/GlassPanel.tsx`
- [x] `frontend/src/components/ui/GlowButton.tsx`
- [x] `frontend/src/components/ui/StatusBadge.tsx`
- [x] `frontend/src/components/dashboard/ActivityFeed.tsx`
- [x] `frontend/src/components/dashboard/ArctesStatus.tsx`
- [x] `frontend/src/components/dashboard/MetricCard.tsx`
- [x] `frontend/src/styles/animations.css` (empty, not imported)
- [x] `frontend/src/lib/` empty directory
- [x] Root `src/` orphan directory (old duplicate, unused)

### Empty agent pages referenced by Features → implement + register routes
- [x] `frontend/src/pages/agent/Editorial.tsx`
- [x] `frontend/src/pages/agent/Memory.tsx`
- [x] `frontend/src/pages/agent/Publishing.tsx`
- [x] Register `/agent/editorial`, `/agent/memory`, `/agent/publishing` routes in `App.tsx`

### Backend validation
- [x] Python backend imports verified (BACKEND_IMPORTS_OK)

### Build + TypeScript validation
- [x] `npm run build` (vite build produced dist assets successfully)
- [x] `npx tsc --noEmit` (no errors)

