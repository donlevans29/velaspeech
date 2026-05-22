# velaspeech
Vela Speech Therapy


# Neurodiversity Language Audit — Vela Speech Therapy

> Reviewed against neurodiversity-affirming communication standards.  
> Source: `velaspeechtherapy.com` — HTML reviewed directly from source file.

---

## ✅ Changes Working Well

| What Changed | ~~Old Language~~ | New Language | Status |
|---|---|---|---|
| Hero headline | ~~"finally be heard"~~ | "share and be heard" | ✅ More affirming |
| Meltdowns pain point | ~~"tantrums and meltdowns...couldn't communicate"~~ | "communicating his needs in the only way he knew how" | ✅ Excellent reframe |
| "Wait and see" card | ~~"Many never catch up on their own"~~ | "Every child develops on their own timeline..." | ✅ Strong improvement |
| Early Intervention card | ~~"The problem wasn't your child"~~ | "We can find the best approach that matches your child's needs" | ✅ Child-centered |
| Testimonial | ~~"non-verbal"~~ | "limited verbal communication" | ✅ More affirming |
| Dream outcome #3 | ~~"Children who can't communicate"~~ | "Children who are still building verbal skills" | ✅ Strength-based |
| Testimonial quote | ~~"typical first grade class"~~ | "mainstream first grade classroom" | ✅ Better framing |

---

## 🔴 Still Needs Attention

### 1. Hero Subtext — "You know something is wrong."
**Location:** Hero section, subheading paragraph  
**Issue:** Most prominent deficit-framing on the page. First copy most visitors read.

> **Current:**  
> "You know something is wrong. You've tried the waiting lists, the school referrals, the 'wait and see.'"

> **Suggested:**  
> "You know your child has more to share. You've tried the waiting lists, the school referrals, the 'wait and see.' Your child deserves a therapist who truly sees them."

---

### 2. New Pain Point — Formatting/Copy Error
**Location:** Pain points grid, school IEP card  
**Issue:** Editing artifact — mid-sentence capitalization, reads as an incomplete paste-in.

> **Current:**  
> "The school said he doesn't qualify But You know your child has more to share"

> **Suggested:**  
> "The school said he doesn't qualify — but you know your child has more to express."

---

### 3. Waitlist Pain Point Label
**Location:** Pain points grid, waitlist card  
**Issue:** Parent quote (*"falling further behind"*) is authentic but the label underneath reinforces deficit framing.

> **Current label:** `Access & waitlist anxiety`  
> **Suggested label:** `Every child deserves timely support`

---

### 4. "Your child pays the price" — Cycling Through Therapists Card
**Location:** "What Hasn't Worked" section  
**Issue:** Mild but unnecessarily negative framing of the child's experience.

> **Current:**  
> "Every new therapist means starting over — and your child pays the price."

> **Suggested:**  
> "Every new therapist means starting over — and that inconsistency slows your child's momentum."

---

### 5. Dream Card #2 — "Not a child who's behind"
**Location:** Dream outcomes section, card 02  
**Issue:** Improved from the original but still uses "behind" as the contrast anchor.

> **Current:**  
> "Not a child who's behind but a child who's ready, who belongs."

> **Suggested:**  
> "Not catching up — arriving ready, confident, and belonging."

---

## 🟢 Minor Polish

### Stat Strip — Age 3 Framing
**Issue:** Can create unnecessary alarm for parents of older children.

> **Current:** `Age 3 — Is the critical window for fastest results`  
> **Suggested:** `Age 3 — when support has the greatest impact`

---

### Process Step 2 — "What's Standing in the Way"
**Issue:** Subtle deficit framing in an otherwise strength-based section.

> **Current:** "We find out exactly where your child is and what's standing in the way."  
> **Suggested:** "We find out exactly where your child is and what your child needs most."

---

## Summary

| Priority | Count | Status |
|---|---|---|
| ✅ Fixed from prior review | 7 | Done |
| 🔴 Still needs attention | 5 | Action required |
| 🟢 Minor polish | 2 | Optional but recommended |

> **Most impactful remaining fix:** Hero subtext (`"You know something is wrong"`) — it is the first line most visitors read and the strongest remaining deficit-framing on the page.


# Site Builder Options for Vela Speech Therapy

> Feature exploration: drag-and-drop / visual editing capability for the Vela design system.
> Track each option as a separate issue or milestone depending on direction chosen.

---

## Option A — Custom Drag-and-Drop Builder
**Effort:** Large (2–3 build sessions)
**Strategic fit:** High — potential standalone product

A full custom builder scoped to the Vela design system. Pre-built blocks (Hero, Stat Strip, Cards, Forms, Testimonials) that are draggable, inline-editable, and export clean HTML.

### What's included
- [ ] Block library mapped to existing Vela components
- [ ] Drag-and-drop canvas with reorder support
- [ ] Inline text editing per block
- [ ] Section toggle (show/hide blocks)
- [ ] HTML export that matches existing codebase conventions
- [ ] Design system constraints enforced (fonts, colors, spacing — no off-brand output)

### Notes
> This is a real product in itself. A design-system-aware builder scoped to speech therapy practices — or pediatric therapy practices broadly — could be a genuinely differentiated offer for the product roadmap.

---

## Option B — Lightweight Content Editor
**Effort:** Medium (1 build session)
**Strategic fit:** Medium — solves the immediate client handoff problem

A side-panel editor that lets a non-technical user click any text on the page, edit it inline, toggle sections on/off, and export the updated HTML. No drag-and-drop canvas.

### What's included
- [ ] Click-to-edit on all text nodes
- [ ] Section visibility toggles (show/hide)
- [ ] One-click HTML export
- [ ] Change preview before export
- [ ] No backend required — runs entirely in the browser

### Notes
> Covers ~80% of what a non-technical practice owner needs day-to-day. Fastest path to client independence without a full builder investment.

---

## Option C — Port to Existing Visual Builder
**Effort:** Small-Medium (setup + migration)
**Strategic fit:** Low for product play, high for fast handoff

Port the Vela design system into Webflow, Framer, or a similar no-code platform. Full visual editor available immediately without custom development.

### Platforms to evaluate
- [ ] **Webflow** — most control, steepest learning curve for client
- [ ] **Framer** — best for animation fidelity, React-based
- [ ] **Notion Sites / Super** — simplest, least design control

### Trade-offs
| | Webflow | Framer | Custom (Option A) |
|---|---|---|---|
| Design fidelity | High | High | Exact |
| Client ease of use | Medium | Medium | High (scoped UX) |
| Product reusability | None | None | Full |
| Time to ship | Fast | Fast | Slow |
| Ongoing platform cost | $$ | $$ | $0 |

### Notes
> Recommended only if speed to handoff matters more than owning the stack. Not compatible with the product-building direction.

---

## Recommendation

| Priority | Option | Reason |
|---|---|---|
| 🥇 Long term | **Option A** | Aligns with product roadmap; reusable across therapy practice clients |
| 🥈 Short term | **Option B** | Unblocks client self-service immediately; low effort |
| 🥉 Fallback | **Option C** | If timeline demands faster handoff than A or B can deliver |

> **Suggested sequence:** Ship Option B now to unblock the client. Build Option A as a product feature in parallel.

---

## Open Questions
- [ ] Who is the target user of the builder — the practice owner, or an agency managing multiple practices?
- [ ] Should the builder support multiple design systems or be Vela-specific for now?
- [ ] Is HTML export the right output, or should it write to a CMS / deploy to Netlify directly?
- [ ] What's the MVP scope for Option A to be shippable as a product feature?
