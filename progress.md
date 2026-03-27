# Progress Log

## Session: Initial Build (Previous)
- Built full signup flow (Steps 1–3 + Welcome)
- Globe background, card-glass design system
- Vercel deployment set up

## Session: Figma Alignment + Redesigns

### Completed
- Landing page copy updated (node 744:2564): heading, customer/specialist descriptions
- Step 1–3 redesigned (nodes 744:2797, 744:3024, 744:3139):
  - New `← Back | STEP N OF 3` header pattern
  - Removed StepIndicator component
  - Updated headings, label colors, button radius
- Welcome screen full-page redesign (node 757:3943):
  - Gradient headings, numbered steps, "Go to dashboard →" CTA
  - Moved outside card wrapper in signup/page.tsx
- Responsive fix: `whitespace-nowrap` + small base sizes on welcome headings
- Welcome heading scale-down: ~17% reduction at md/lg breakpoints
- Left column widened to `flex-1`, gap reduced to `md:gap-6` (24px)

## Session: Login + Contact + Content Updates

### Completed
- Login page redesigned (node 757:3733):
  - centaur-logo.svg (matches landing page)
  - "Sign in to Centaur Portal" heading
  - "Don't have an account?" above form
  - Indigo Sign In button (`#4f46e5`)
  - "or connect with" divider + SAML SSO button
- Contact page created (`/contact`):
  - Same card-glass style
  - Back button at top
  - "Talk to our team" + mailto CTA
  - "Already have an account? Sign in" at bottom
- Customer routing: `app/page.tsx` → `router.push("/contact")` (was external URL)
- Training specialties updated to match intake form G2 (25 items)
- Clinical roles updated to match intake form (8 items)

### Deployments
| Commit | Description | Vercel URL |
|--------|-------------|------------|
| 33cdd23 | Initial full signup flow | specialist-portal.vercel.app |
| 92e1a97 | Login + contact page polish | specialist-portal.vercel.app |
| 112fc02 | Clinical roles + training specialties update | specialist-portal.vercel.app |

---

## Session: UI System + Form Changes + Copy Updates

### Completed
- UI system update (Figma 853-3685): all inputs/buttons `rounded-[8px]`, design tokens applied across all signup steps, login, settings
- YOE: replaced 4 range-select buttons with `<input type="number">`, type → `number | undefined`
- Removed `portalExperience` dropdown from Step 3 (details-step.tsx, types, constants)
- Contact page rewrote to self-service Create Account form (full name, email, password + Google OAuth, no step indicator)
- Welcome step copy updated: "What to expect", Profile review + Project invitations descriptions (Figma 977-6809, 978-4779, 978-4787)
- globals.css tokens: `--radius: 0.5rem`, neutral palette, Centaur gradient
- Build fixes: removed stale `YEARS_OF_EXPERIENCE` import in settings; fixed `EMPTY_FORM` types in signup/page.tsx

### Deployments
| Commit | Description |
|--------|-------------|
| 75da3ed | UI system update (8px radius + design tokens) |
| 04ecc4d | YOE number input, remove Centaur question |
| 8b26023 | Customer create account page |
| 8453fb4 | CSS token update |
| b1383bf | Fix settings YEARS_OF_EXPERIENCE import |
| 380e719 | Fix signup EMPTY_FORM types |
| 2979aeb | Welcome step copy (Figma 977-6809) |
| 6a9ead8 | Welcome step Profile review copy (Figma 978-4779) |

## Pending / Next Up
- [ ] Set up SSH keys for GitHub (avoid PAT sharing in chat)
