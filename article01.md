# Building a Professional Website with Claude, VSCode, GitHub & Netlify
## A Real-World Case Study: Vela Speech Therapy

> **Author's note:** This article documents a real website build session — start to finish —
> including every problem we hit, every fix we applied, and the exact code that solved it.
> It's written for people who want to learn how to build and sell professional websites
> to service-based businesses using AI-assisted development.

---

## The Stack

| Tool | Role |
|---|---|
| **Claude (Anthropic)** | Code generation, copy writing, debugging, design decisions |
| **VSCode** | Code editor for reviewing and editing generated files |
| **GitHub** | Version control and source of truth |
| **Netlify** | Hosting, form handling, continuous deployment |

---

## The Project

**Client:** Vela Speech Therapy — a private pediatric speech therapy practice in Columbus, Ohio  
**Therapist:** Velia Gonzalez, MS CCC-SLP — bilingual (English/Spanish), 15+ years experience  
**Goal:** A multi-page marketing site to attract Columbus-area families and convert them into booked consultations

---

## What We Built

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, testimonials, pain points, contact form |
| About | `about.html` | Therapist bio, journey timeline, credentials |
| Services | `services.html` | 8 service cards, session formats, FAQ |
| Summer Programs | `summer-programs.html` | 3 program tiers, enrollment form |
| Privacy Policy | `privacy-policy.html` | HIPAA-aware legal page |

**Shared design system across all pages:**
- Fonts: Playfair Display (headings) + DM Sans (body)
- Color palette: cream, deep navy, terracotta, sage, gold
- Components: sticky nav, mobile hamburger drawer, scroll reveal animations, FAQ accordion, Netlify Forms

---

## Phase 1 — Content Audit Before Writing a Single Line of Code

### Problem: The existing site had language that wasn't neurodiversity-affirming

Before touching any code, we audited the existing site copy at `velaspeechtherapy.com` against neurodiversity-affirming communication standards. This is a critical step for any healthcare or education client.

**What we found:**

| Location | Problematic Language | Why |
|---|---|---|
| Hero | "You know something is wrong" | Frames neurological difference as defect |
| Wait & See card | "Many never catch up on their own" | Implies permanent deficit |
| Pain point | "tantrums and meltdowns...couldn't communicate" | Stigmatizes dysregulation |
| Testimonial | "non-verbal" used as deficit label | All children communicate |
| Dream outcome | "Children who can't communicate" | Deficit-first framing |
| Testimonial | "typical first grade class" | "Typical" implies hierarchy |

**Fixes applied:**

```
"You know something is wrong"
→ "You know your child has more to share"

"Many never catch up on their own"
→ "Every child develops on their own timeline — and the right support can make a real difference"

"tantrums and meltdowns...couldn't communicate"
→ "I didn't realize he was communicating his needs in the only way he knew how"

"non-verbal" (as deficit)
→ "limited verbal communication"

"Children who can't communicate"
→ "Children who are still building verbal skills"

"typical first grade class"
→ "mainstream first grade classroom"
```

**Lesson learned:** For healthcare, therapy, and education clients, always audit copy for stigmatizing language before publishing. It protects the client's reputation and serves their community better.

---

## Phase 2 — Building the Page Structure

### Design System First

All pages share a single CSS variable set. This is the most important architectural decision — it ensures visual consistency across every page without duplication.

```css
:root {
  --cream: #FAF7F2;
  --warm-white: #FFFEF9;
  --deep-navy: #0E1B2E;
  --sage: #5A7A60;
  --sage-light: #8FAF95;
  --terracotta: #C4622D;
  --terracotta-light: #E8A07A;
  --gold: #D4A853;
  --text-dark: #1A2332;
  --text-mid: #4A5568;
  --text-light: #8A9BB0;
  --border: rgba(14,27,46,0.1);
}
```

### File Structure

```
velaspeechtherapy.com/
├── index.html
├── about.html
├── services.html
├── summer-programs.html
├── privacy-policy.html
└── images/
    ├── velia-los-angeles.jpg
    ├── velia-south-america.jpg
    ├── velia-west-africa.jpg
    └── velia-columbus.jpg
```

---

## Phase 3 — Netlify Forms

### Problem: Forms weren't wired up

The original contact forms used a simple button click handler with no actual submission logic.

**The fix — Netlify Forms (no backend required):**

```html
<form
  id="summer-contact-form"
  name="summer-programs"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <!-- Required hidden fields -->
  <input type="hidden" name="form-name" value="summer-programs">

  <!-- Spam protection (invisible to users) -->
  <p style="display:none;">
    <label>Don't fill this out: <input name="bot-field"></label>
  </p>

  <!-- All inputs MUST have name attributes -->
  <input type="text" name="name" required>
  <input type="tel" name="phone" required>
  <select name="child-age" required>...</select>
  <textarea name="message"></textarea>

  <button type="submit" id="submit-btn">Submit</button>
</form>
```

**AJAX submission (no page reload):**

```js
const form = document.getElementById('summer-contact-form');
const btn  = document.getElementById('summer-submit-btn');

if (form && btn) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        btn.textContent = "✓ We'll be in touch within 24 hours!";
        btn.style.background = '#5A7A60';
        form.querySelectorAll('input, select, textarea')
            .forEach(el => el.disabled = true);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      btn.textContent = 'Something went wrong — please call us directly';
      btn.style.background = '#C4622D';
      btn.disabled = false;
    }
  });
}
```

**Key rules for Netlify Forms:**
1. Every `<input>`, `<select>`, and `<textarea>` must have a `name` attribute
2. The form needs `data-netlify="true"` and a `name` attribute
3. Include `<input type="hidden" name="form-name" value="your-form-name">`
4. For AJAX, post to `'/'` — Netlify intercepts it server-side
5. HSA/FSA is an eligible expense — superbills make private pay practices viable

---

## Phase 4 — Navigation Bar

### Problem: Only the footer had page links

The original nav was just a logo and a CTA button. No way to navigate between pages.

**The fix — Full nav with desktop links + mobile hamburger:**

```html
<nav>
  <a href="/index.html" class="nav-logo"><span>Vela </span>Speech Therapy</a>

  <ul class="nav-links">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/about.html">About</a></li>
    <li><a href="/services.html">Services</a></li>
    <li><a href="/summer-programs.html">Summer Programs</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <div class="nav-right">
    <a href="#contact" class="nav-cta">Free Phone Call</a>
    <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile drawer -->
<div class="nav-mobile" id="mobile-nav">
  <a href="/index.html">Home</a>
  <a href="/about.html">About</a>
  <a href="/services.html">Services</a>
  <a href="/summer-programs.html">Summer Programs</a>
  <a href="#contact">Contact</a>
  <a href="#contact" class="nav-mobile-cta">Free Phone Call</a>
</div>
```

**Active state — mark the current page:**

```html
<!-- On about.html only: -->
<li><a href="/about.html" class="active">About</a></li>
```

**Hamburger CSS (desktop hidden, mobile shown):**

```css
.nav-hamburger { display: none; } /* hidden on desktop */

@media (max-width: 900px) {
  .nav-links { display: none; }        /* hide desktop links */
  .nav-hamburger { display: flex; }    /* show hamburger */
  .nav-cta { display: none; }          /* hide CTA — it's in the drawer */
}
```

**Hamburger JS:**

```js
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}
```

---

## Phase 5 — Images

### Problem: About page had no photos

The journey timeline (LA → South America → West Africa → Columbus) needed photos of Velia at each location.

**Image folder setup:**

```
images/
├── velia-gonzalez.jpg        ← hero headshot
├── velia-los-angeles.jpg     ← journey stop 1
├── velia-south-america.jpg   ← journey stop 2
├── velia-west-africa.jpg     ← journey stop 3
└── velia-columbus.jpg        ← journey stop 4
```

**Photo placeholder pattern (swap when ready):**

```html
<div class="journey-photo">
  <!--
    TODO: Replace with real photo:
    <img src="/images/velia-los-angeles.jpg"
         alt="Velia in Los Angeles, California">
  -->
  <div class="journey-photo-placeholder">
    <div class="ph-icon">📸</div>
    <span>Velia · Los Angeles, CA</span>
  </div>
</div>
```

**Image CSS — consistent sizing with hover zoom:**

```css
.journey-photo {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.journey-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.journey-item:hover .journey-photo img {
  transform: scale(1.03);
}
```

**Best practices for images:**
- Compress all images below 300KB at [squoosh.app](https://squoosh.app)
- Always include descriptive `alt` text (accessibility + SEO)
- Use `object-fit: cover` so images never distort
- Use lowercase filenames with hyphens, not spaces

---

## Phase 6 — Mobile Responsive Issues

This was the most iterative phase of the build. Several issues required multiple rounds of debugging.

---

### Problem 1: Three-column grids not collapsing on mobile

**Root cause:** Fixed `repeat(3, 1fr)` columns require explicit media query overrides that don't always fire correctly.

**Bad approach:**
```css
.why-grid {
  grid-template-columns: repeat(3, 1fr); /* stays 3 cols until media query */
}

@media (max-width: 900px) {
  .why-grid { grid-template-columns: 1fr; } /* sometimes doesn't fire */
}
```

**Better approach — self-collapsing grid:**
```css
.why-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  /* Each card needs at least 260px. If screen is too narrow → wraps automatically.
     min(260px, 100%) ensures it never overflows on very small screens. */
}
```

Applied to: `why-grid`, `programs-grid`, `pay-grid`

---

### Problem 2: Featured card spanning outside the grid on mobile

The Executive Function "featured" card used `grid-column: span 2` — but when the parent grid collapses to 1 column, `span 2` tries to span across 2 columns that don't exist, causing horizontal overflow.

**Bad:**
```css
.service-card.featured {
  grid-column: span 2; /* breaks when parent grid is 1 col */
}
```

**Fixed:**
```css
/* Desktop: span full row regardless of column count */
.service-card.featured {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Mobile: single column, flex stack */
@media (max-width: 900px) {
  .service-card.featured {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
```

---

### Problem 3: Sticky filter strip blocking content on mobile

The "Jump to:" service filter was `position: sticky` and eating ~80px of screen space on mobile phones where users just scroll anyway.

**Fix:**
```css
@media (max-width: 900px) {
  .filter-strip { display: none; }
}
```

---

### Problem 4: iOS input zoom

On iPhone, form inputs with `font-size` below 16px cause the browser to auto-zoom when focused. This is a known iOS behavior.

**Fix:**
```css
.form-input, .form-select, .form-textarea {
  font-size: 1rem; /* 16px — prevents iOS auto-zoom on focus */
}
```

---

### Problem 5: Responsive CSS copied from wrong page

The `summer-programs.html` responsive block was accidentally copied from `index.html`. It targeted classes like `.pain-section`, `.tried-grid`, `.dream-outcomes` — none of which exist on the summer programs page. So none of the grids ever received mobile collapse instructions.

**Wrong (index.html classes in summer-programs.html):**
```css
@media (max-width: 900px) {
  .pain-section { grid-template-columns: 1fr; }     /* doesn't exist here */
  .tried-grid { grid-template-columns: 1fr; }        /* doesn't exist here */
  .dream-outcomes { grid-template-columns: 1fr; }    /* doesn't exist here */
}
```

**Correct (summer-programs.html classes):**
```css
@media (max-width: 900px) {
  .why-grid { grid-template-columns: 1fr; }
  .programs-grid { grid-template-columns: 1fr; }
  .expect-section { grid-template-columns: 1fr; gap: 48px; }
  .cta-section { grid-template-columns: 1fr; padding: 72px 24px; gap: 48px; }
}
```

**Lesson:** When scaffolding new pages from an existing page, always audit the responsive CSS block and update class names to match the new page's actual elements.

---

## Phase 7 — HTML Structure Bug (Journey Timeline)

### Problem: Journey items rendering side-by-side instead of stacked

The journey timeline showed South America, West Africa, and Columbus in a horizontal row rather than stacking vertically.

**Root cause — two bugs found in the HTML:**

**Bug 1: CSS typo — space instead of dot**
```css
/* BROKEN — targets a non-existent element */
.story-right reveal {
  display: flex;
  flex-direction: column;
}

/* FIXED */
.story-right {
  display: flex;
  flex-direction: column;
}
```

**Bug 2: Missing closing `</div>` tags**

Three of the four journey items were missing their closing `</div>` tags for `.journey-photo` and `.journey-content`. Without proper closing tags, the browser couldn't determine where one item ended and the next began.

```html
<!-- BROKEN — missing closing divs -->
<div class="journey-item">
  <div class="journey-dot">🌎</div>
  <div class="journey-content">
    <div class="journey-place">South America</div>
    <div class="journey-photo">
      <img src="/images/velia-south-america.jpg" alt="Velia in South America">
    <!-- ← missing </div> for journey-photo -->
  <!-- ← missing </div> for journey-content -->
<!-- ← missing </div> for journey-item -->

<!-- FIXED — all divs properly closed -->
<div class="journey-item">
  <div class="journey-dot">🌎</div>
  <div class="journey-content">
    <div class="journey-place">South America</div>
    <div class="journey-photo">
      <img src="/images/velia-south-africa.jpg" alt="Velia in South America">
    </div>  <!-- closes journey-photo -->
  </div>    <!-- closes journey-content -->
</div>      <!-- closes journey-item -->
```

**Lesson:** Unclosed HTML tags are one of the hardest bugs to spot visually. When a layout looks completely broken and the CSS seems correct, check the HTML structure first.

---

## Phase 8 — JavaScript Crash (Black Screen of Death)

### Problem: Page was completely black, console showed:
```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

**Root cause:** The JS was trying to add event listeners to elements that didn't exist on the page.

The `summer-programs.html` was using an old nav that had no hamburger button or mobile drawer — just a logo and CTA. But the JavaScript block (copied from a newer page) was calling:

```js
const hamburger = document.getElementById('hamburger'); // returns null ❌
hamburger.addEventListener('click', ...); // 💥 CRASH — null.addEventListener
```

When JS crashes on the first error, it stops executing entirely. The scroll reveal animations never ran, which meant all content stayed at `opacity: 0` — explaining the black screen.

**Two-part fix:**

**Part 1 — Add the missing HTML elements:**
```html
<button class="nav-hamburger" id="hamburger" aria-label="Open menu">
  <span></span><span></span><span></span>
</button>

<div class="nav-mobile" id="mobile-nav">
  <!-- links -->
</div>
```

**Part 2 — Add null checks to ALL event listeners:**
```js
// BEFORE — crashes if element doesn't exist
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', ...); // 💥

// AFTER — safe regardless of page
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => { ... });
}

// Same pattern for forms
const form = document.getElementById('my-form');
if (form) {
  form.addEventListener('submit', async (e) => { ... });
}
```

**Lesson:** Always wrap `document.getElementById()` results in null checks before calling methods on them. When the same JS block is shared across multiple pages, elements from one page won't exist on another.

---

## Phase 9 — Deployment Issues

### Problem: Netlify wasn't rebuilding after changes

**What we ruled out:**
- Same commit message does NOT prevent rebuilds
- Netlify listens to `git push`, not commits alone

**Root causes and fixes:**

| Cause | Fix |
|---|---|
| Forgot to `git push` after committing | Run `git push` — Netlify only triggers on push |
| Using drag-and-drop deploy | Must drag the **full folder** every time, not just changed files |
| Site cached in mobile browser | Settings → Safari → Clear History and Website Data |
| CDN caching old version | Netlify dashboard → Deploys → Trigger deploy → Deploy site |

**Checking your Netlify deploy:**
1. Go to Netlify dashboard → your site → **Deploys** tab
2. Click the latest deploy → read the **deploy log**
3. Confirm your changed files appear in the log

---

## Privacy Policy Considerations for Healthcare Sites

Speech therapy practices are HIPAA covered entities. The privacy policy needed specific sections beyond a standard website policy:

- **HIPAA notice banner** — visible at the top
- **PHI vs website data** — clear distinction between clinical records and contact form data  
- **Children's privacy (COPPA)** — the site serves minors; parents submit on their behalf
- **Third-party services** — Netlify Forms and Google Fonts both log data
- **Superbill/HSA/FSA disclosure** — relevant to private pay practices

> ⚠️ **Always recommend legal review** for healthcare clients before publishing a privacy policy. This is especially true for HIPAA-covered entities.

---

## Key Lessons for Selling Sites to Service Businesses

### 1. Start with content, not code
The neurodiversity audit came before any code. For service businesses, the words matter as much as the design. Bad copy undermines good design.

### 2. Build a design system first
Defining CSS variables before writing any component means every page looks consistent without extra effort. When the client wants to change the brand color, you change one line.

### 3. Use `auto-fit` grids instead of fixed columns
```css
/* Fragile — needs media queries to collapse */
grid-template-columns: repeat(3, 1fr);

/* Robust — collapses automatically */
grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
```

### 4. Always null-check before addEventListener
Any JS element selector can return `null`. One unchecked null crashes the entire script. Use `if (element)` guards.

### 5. Audit responsive CSS class names per page
When copying a responsive block from another page, every class name must match the current page's actual HTML classes. Wrong class names → rules silently ignored → layout broken.

### 6. Netlify Forms is the easiest no-backend form solution
- No third-party account needed
- Spam protection built in (honeypot)
- HSA/FSA payments, superbills, and private pay work alongside it
- Works with AJAX for no-page-reload submissions

### 7. Test on a real mobile device, not just browser dev tools
Browser responsive mode and a real iPhone render differently. Issues like iOS input zoom and sticky element interference only appear on real devices.

---

## Final Site Map

```
velaspeechtherapy.com/
├── index.html          ← Home — hero, pain points, testimonials, contact form
├── about.html          ← About — bio, journey timeline with photos, credentials
├── services.html       ← Services — 8 service cards, formats, private pay, FAQ
├── summer-programs.html ← Summer — 3 programs, enrollment form (Netlify)
├── privacy-policy.html ← Legal — HIPAA-aware, children's privacy, third parties
└── images/
    ├── velia-gonzalez.jpg
    ├── velia-los-angeles.jpg
    ├── velia-south-america.jpg
    ├── velia-west-africa.jpg
    └── velia-columbus.jpg
```

---

## Tools Referenced

- [Claude by Anthropic](https://claude.ai) — AI assistant used for code generation, copy, and debugging
- [VSCode](https://code.visualstudio.com) — Code editor
- [GitHub](https://github.com) — Version control
- [Netlify](https://netlify.com) — Hosting + forms
- [Squoosh](https://squoosh.app) — Free browser-based image compression
- [Google Fonts](https://fonts.google.com) — Playfair Display + DM Sans

---

*Screenshots coming soon. Built in a single session using Claude + VSCode + GitHub + Netlify.*