---
name: frontend-slides
description: Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files. Use when the user wants to build a presentation, convert a PPT/PPTX to web, or create slides for a talk/pitch. Helps non-designers discover their aesthetic through visual exploration rather than abstract choices.
---

# Frontend Slides

Create zero-dependency, animation-rich HTML presentations that run entirely in the browser.

## Core Principles

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Show, Don't Tell** — Generate visual previews, not abstract choices. People discover what they want by seeing it.
3. **Distinctive Design** — No generic "AI slop." Every presentation must feel custom-crafted.
4. **Viewport Fitting (NON-NEGOTIABLE)** — Every slide MUST fit exactly within 100vh. No scrolling within slides, ever. Content overflows? Split into multiple slides.
5. **16:9 PowerPoint dimensions (NON-NEGOTIABLE)** — Every slide MUST be exactly **1280×720px** (standard PowerPoint 16:9). Use `width: 1280px; height: 720px;` on the slide element, plus `@page { size: 1280px 720px; margin: 0; }` and a `@media print` block that strips backgrounds/shadows and forces one slide per page. This guarantees PDF and PPT exports render without distortion. Never use viewport units (`vw`/`vh`) for slide dimensions — they break PDF export. Use `vh`/`vw` only inside the fixed-size slide if needed for internal scaling.
6. **Click-to-edit text (NON-NEGOTIABLE)** — Every text element (headlines, subtitles, body, captions, byline, page numbers, source lines) MUST have `contenteditable="true"`. This lets Liyang edit content directly in the browser without touching code.

7. **Bundled slide editor (NON-NEGOTIABLE)** — Every generated HTML deck MUST link the two editor assets that live in this skill folder. They give Liyang the full PowerPoint-like editing surface: drag/resize any element, font-size control, Ctrl+Z undo, localStorage autosave, download/restore. Do NOT inline the editor's CSS or JS — link the files so future improvements propagate to every deck automatically.

   In `<head>`:
   ```html
   <link rel="stylesheet" href="C:/Users/glygs/.claude/skills/frontend-slides/slide-editor.css">
   ```

   Just before `</body>`:
   ```html
   <script>window.SLIDE_EDITOR_KEY = 'my-deck-name:v1';</script>
   <script src="C:/Users/glygs/.claude/skills/frontend-slides/slide-editor.js"></script>
   ```

   - The editor auto-injects its toolbar (no HTML scaffolding needed).
   - `SLIDE_EDITOR_KEY` namespaces the autosave per-deck. Pick a unique slug per project.
   - The editor identifies slides by the `.slide` class — every slide-card element MUST have this class.
   - For dark-background slides where the red hover outline doesn't show, add the `.slide-dark` class to the slide.

   When path portability matters (e.g., sharing the deck), use relative paths and copy the two files alongside the HTML — same contract.

## Liyang's Consulting Voice (REQUIRED for formal business deliverables)

When the user (Liyang) asks for a **formal business deck, executive summary, recommendation deck, compendium, due diligence, playbook, proposal, or any "professional" deliverable**, you MUST load and apply:

**`C:/Users/glygs/Documents/Obsidian Vault/2-Areas/Writing/VOICE_AND_STYLE_GUIDE.md`**

This file is the source of truth for Liyang's writing voice and slide structure, distilled from 7 years of Monitor Deloitte strategy work. It governs **what slides should say and look like**; this skill governs **how they are built**. The two are complementary.

Before generating, do the following in order:

1. **Read `VOICE_AND_STYLE_GUIDE.md` in full** (it is ~350 lines and stable — load it once at the start of the session).
2. **Pick a deliverable archetype** from §9 (Executive recommendation / Compendium / Playbook-Toolkit / CDD / Proposal-POV) based on the audience and ask. State which archetype you picked and why in one sentence before generating slides.
3. **Pick a structural archetype** from §8.1 (A–F) — these are layout/structure patterns, not color systems. Colors are picked per project (one dominant + one accent + neutrals). Default to a sentence-case, modern look (Archetype C) unless the ask calls for something else.
4. **Apply non-negotiables on every content slide:**
   - **Action title** (§2) — verb-led or noun-stacked, ~14–22 words, makes the argument by itself. Never a label like "Approach" or "Findings."
   - **Page architecture** (§3) — section tab → action title → 2–4 parallel cards → bottom takeaway band → source footer.
   - **Quantify or label "Not quantified"** (§1, §6) — every claim has a number, range, or scenario, OR is explicitly tagged as not quantified. Never silent.
   - **First-person plural** — "We recommend," "We identified," never "you should."
   - **Vocabulary swaps from §7** — replace banned words (leverage, drive, unlock, significant without a number, "we talked to people") with the preferred list (recommend, identify, pressure-test, value at stake, primary research).
   - **Bottom takeaway band** populated with one declarative sentence — never empty.
   - **Status banner** ("Preliminary," "Illustrative," "Work in progress") if applicable — small, never in the action title.
5. **Apply visual rules from §8.2–8.4:**
   - Action title is the strongest visual element on the slide.
   - Geometric containers only — no free-floating body text.
   - Country flags as labels wherever guidance differs by market.
   - Icons mono-line, one per card, brand-colored. Never decorative.
   - Traffic-light coding (green/yellow/red) for geography- or indication-dependent advice.
   - Footnote sources always.
   - Hard NO list: no purple-gradient AI-slop backgrounds, no glassmorphism, no emoji decoration, no label-as-title, no anonymous quotes, no unquantified claims, no charts without a data-source footnote.

If any of the above conflicts with the "Distinctive Design" aesthetic guidance below (which is tuned for creative pitch / hackathon decks), **the consulting voice wins for formal business deliverables.** Liyang's voice is the constraint; aesthetic distinctiveness happens *within* that constraint (palette choice, motion, typography selection, motifs).

For informal decks (talks, pitches, personal projects), skip this section and use the general guidance below.

## Design Aesthetics

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.

Focus on:

- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

## Viewport Fitting Rules

These invariants apply to EVERY slide in EVERY presentation:

- Every `.slide` must have `height: 100vh; height: 100dvh; overflow: hidden;`
- ALL font sizes and spacing must use `clamp(min, preferred, max)` — never fixed px/rem
- Content containers need `max-height` constraints
- Images: `max-height: min(50vh, 400px)`
- Breakpoints required for heights: 700px, 600px, 500px
- Include `prefers-reduced-motion` support
- Never negate CSS functions directly (`-clamp()`, `-min()`, `-max()` are silently ignored) — use `calc(-1 * clamp(...))` instead

**When generating, read `viewport-base.css` and include its full contents in every presentation.**

### Content Density Limits Per Slide

| Slide Type    | Maximum Content                                           |
| ------------- | --------------------------------------------------------- |
| Title slide   | 1 heading + 1 subtitle + optional tagline                 |
| Content slide | 1 heading + 4-6 bullet points OR 1 heading + 2 paragraphs |
| Feature grid  | 1 heading + 6 cards maximum (2x3 or 3x2)                  |
| Code slide    | 1 heading + 8-10 lines of code                            |
| Quote slide   | 1 quote (max 3 lines) + attribution                       |
| Image slide   | 1 heading + 1 image (max 60vh height)                     |

**Content exceeds limits? Split into multiple slides. Never cram, never scroll.**

---

## Phase 0: Detect Mode

Determine what the user wants:

- **Mode A: New Presentation** — Create from scratch. Go to Phase 1.
- **Mode B: PPT Conversion** — Convert a .pptx file. Go to Phase 4.
- **Mode C: Enhancement** — Improve an existing HTML presentation. Read it, understand it, enhance. **Follow Mode C modification rules below.**

### Mode C: Modification Rules

When enhancing existing presentations, viewport fitting is the biggest risk:

1. **Before adding content:** Count existing elements, check against density limits
2. **Adding images:** Must have `max-height: min(50vh, 400px)`. If slide already has max content, split into two slides
3. **Adding text:** Max 4-6 bullets per slide. Exceeds limits? Split into continuation slides
4. **After ANY modification, verify:** `.slide` has `overflow: hidden`, new elements use `clamp()`, images have viewport-relative max-height, content fits at 1280x720
5. **Proactively reorganize:** If modifications will cause overflow, automatically split content and inform the user. Don't wait to be asked

**When adding images to existing slides:** Move image to new slide or reduce other content first. Never add images without checking if existing content already fills the viewport.

---

## Phase 1: Content Discovery (New Presentations)

**Ask ALL questions in a single AskUserQuestion call** so the user fills everything out at once:

**Question 1 — Purpose** (header: "Purpose"):
What is this presentation for? Options: Pitch deck / Teaching-Tutorial / Conference talk / Internal presentation

**Question 2 — Length** (header: "Length"):
Approximately how many slides? Options: Short 5-10 / Medium 10-20 / Long 20+

**Question 3 — Content** (header: "Content"):
Do you have content ready? Options: All content ready / Rough notes / Topic only

**Question 4 — Inline Editing** (header: "Editing"):
Do you need to edit text directly in the browser after generation? Options:

- "Yes (Recommended)" — Can edit text in-browser, auto-save to localStorage, export file
- "No" — Presentation only, keeps file smaller

**Remember the user's editing choice — it determines whether edit-related code is included in Phase 3.**

If user has content, ask them to share it.

### Step 1.2: Image Evaluation (if images provided)

If user selected "No images" → skip to Phase 2.

If user provides an image folder:

1. **Scan** — List all image files (.png, .jpg, .svg, .webp, etc.)
2. **View each image** — Use the Read tool (Claude is multimodal)
3. **Evaluate** — For each: what it shows, USABLE or NOT USABLE (with reason), what concept it represents, dominant colors
4. **Co-design the outline** — Curated images inform slide structure alongside text. This is NOT "plan slides then add images" — design around both from the start (e.g., 3 screenshots → 3 feature slides, 1 logo → title/closing slide)
5. **Confirm via AskUserQuestion** (header: "Outline"): "Does this slide outline and image selection look right?" Options: Looks good / Adjust images / Adjust outline

**Logo in previews:** If a usable logo was identified, embed it (base64) into each style preview in Phase 2 — the user sees their brand styled three different ways.

---

## Phase 2: Style Discovery

**This is the "show, don't tell" phase.** Most people can't articulate design preferences in words.

### Step 2.0: Style Path

Ask how they want to choose (header: "Style"):

- "Show me options" (recommended) — Generate 3 previews based on mood
- "Browse template gallery" — Pick from 32 ready-made HTML templates (see Step 2.4)
- "I know what I want" — Pick from preset list directly

**If direct selection:** Show preset picker and skip to Phase 3. Available presets are defined in [STYLE_PRESETS.md](STYLE_PRESETS.md).

**If template gallery:** Skip to Step 2.4.

### Step 2.1: Mood Selection (Guided Discovery)

Ask (header: "Vibe", multiSelect: true, max 2):
What feeling should the audience have? Options:

- Impressed/Confident — Professional, trustworthy
- Excited/Energized — Innovative, bold
- Calm/Focused — Clear, thoughtful
- Inspired/Moved — Emotional, memorable

### Step 2.2: Generate 3 Style Previews

Based on mood, generate 3 distinct single-slide HTML previews showing typography, colors, animation, and overall aesthetic. Read [STYLE_PRESETS.md](STYLE_PRESETS.md) for available presets and their specifications.

| Mood                | Suggested Presets                                  |
| ------------------- | -------------------------------------------------- |
| Impressed/Confident | Bold Signal, Electric Studio, Dark Botanical       |
| Excited/Energized   | Creative Voltage, Neon Cyber, Split Pastel         |
| Calm/Focused        | Notebook Tabs, Paper & Ink, Swiss Modern           |
| Inspired/Moved      | Dark Botanical, Vintage Editorial, Pastel Geometry |

Save previews to `.claude-design/slide-previews/` (style-a.html, style-b.html, style-c.html). Each should be self-contained, ~50-100 lines, showing one animated title slide.

Open each preview automatically for the user.

### Step 2.3: User Picks

Ask (header: "Style"):
Which style preview do you prefer? Options: Style A: [Name] / Style B: [Name] / Style C: [Name] / Mix elements

If "Mix elements", ask for specifics.

### Step 2.4: Template Gallery (alternative to 2.1-2.3)

Use this path when the user picked "Browse template gallery" in Step 2.0.

The gallery lives at `templates/` (cloned from `zarazhangrui/beautiful-html-templates`, MIT). It contains 32 single-folder HTML templates with rich metadata. **Do not modify anything inside `templates/`** — always clone out before editing.

**Step 2.4a — Read the index.** Read `templates/index.json`. Each template has: `slug`, `name`, `tagline`, `mood[]`, `occasion[]`, `tone[]`, `formality`, `density`, `scheme` (light/dark), `slide_count`, `best_for`, `avoid_for`.

**Step 2.4b — Match and shortlist 3 candidates.** Match the user's purpose (Phase 1 Q1) and mood (Phase 1 vibe) against `mood`, `tone`, `best_for`, and `formality`. Pick **three templates that are meaningfully different from each other** so the user gets a real choice — e.g., one safe match, one warmer/cooler alternative, one wildcard. Honor `avoid_for` strictly.

**Step 2.4c — Show real previews, not generic ones.** For each candidate:

1. Read the template's `templates/<slug>/template.html` to understand its visual system.
2. Copy the entire `templates/<slug>/` folder to `.claude-design/template-previews/<slug>/`.
3. In the copy, edit **only the title (cover) slide** to use the user's real deck title, subtitle, author/date — pulled from Phase 1 content. Do not touch the rest yet.
4. Open the preview's `template.html` in the browser.

Also show the screenshot from `templates/screenshots/<slug>-1.png` inline so the user sees the full visual at a glance.

**Step 2.4d — User picks via AskUserQuestion** (header: "Template"):

> Three templates to choose from:
> A) **<Name A>** — <one-line tone>
> B) **<Name B>** — <one-line tone>
> C) **<Name C>** — <one-line tone>

Options: A / B / C / "Show me 3 more" (re-run 2.4b with different candidates).

Once picked, proceed to **Phase 3B** (template-based generation), not Phase 3.

---

## Phase 3: Generate Presentation

Generate the full presentation using content from Phase 1 (text, or text + curated images) and style from Phase 2.

If images were provided, the slide outline already incorporates them from Step 1.2. If not, CSS-generated visuals (gradients, shapes, patterns) provide visual interest — this is a fully supported first-class path.

**Before generating, read these supporting files:**

- [html-template.md](html-template.md) — HTML architecture and JS features
- [viewport-base.css](viewport-base.css) — Mandatory CSS (include in full)
- [animation-patterns.md](animation-patterns.md) — Animation reference for the chosen feeling

**Key requirements:**

- Single self-contained HTML file, all CSS/JS inline
- Include the FULL contents of viewport-base.css in the `<style>` block
- Use fonts from Fontshare or Google Fonts — never system fonts
- Add detailed comments explaining each section
- Every section needs a clear `/* === SECTION NAME === */` comment block

---

## Phase 3B: Generate from Template (Gallery path)

Use this when the user picked a template in Step 2.4d. Skip Phase 3.

1. **Clone the template folder.** Copy `templates/<chosen-slug>/` to the user's working directory (or `.claude-design/output/<slug>/` if no project path given). Keep all sibling assets the template needs.
2. **Read the template's `template.html` end-to-end** to learn its slide grammar — section markers, layout classes, color tokens, animation hooks.
3. **Adapt every slide** using user content from Phase 1:
   - **Preserve** the design system: fonts, colors, decorative elements, spacing rhythm, page-number labels.
   - **Replace** placeholder text with real content. Honor the per-slide density limits (Title / Content / Grid / Code / Quote / Image).
   - **Extend** if the user has more slides than the template demo — duplicate existing layouts. If fewer, drop from the bottom and renumber.
   - **Design missing layouts in-system.** If the user needs a layout the template lacks, build it using the template's fonts, palette, and component vocabulary. Never graft in a foreign visual language and never bail back to a different template.
4. **Enforce the viewport invariant.** Templates were not designed under our 100vh / no-scroll rule. After adapting:
   - Add `height: 100vh; height: 100dvh; overflow: hidden;` to the slide container if missing.
   - Replace fixed font sizes / spacing with `clamp(...)` on any slide that overflows at 1280×720.
   - If a slide still overflows after `clamp()` adjustments, split it.
   - If the template uses a multi-file structure (`styles.css`, `deck-stage.js`), keep it multi-file — do not force single-file inlining.
5. **Inline-edit & PDF export compatibility.** If the user opted into inline editing (Phase 1 Q4), wire up the same edit-mode JS the standalone path uses, scoped to the template's text containers. The PDF export script keys off `class="slide"` — if the template uses a different class (e.g. `.deck-page`), either alias it or pass the correct selector.
6. **Attribution.** Keep the template's MIT `LICENSE` file in the cloned output folder. Add a short comment at the top of the main HTML: `<!-- Template: <name> from zarazhangrui/beautiful-html-templates (MIT) -->`.

Then proceed to Phase 5 (Delivery) as normal.

---

## Phase 4: PPT Conversion

When converting PowerPoint files:

1. **Extract content** — Run `python scripts/extract-pptx.py <input.pptx> <output_dir>` (install python-pptx if needed: `pip install python-pptx`)
2. **Confirm with user** — Present extracted slide titles, content summaries, and image counts
3. **Style selection** — Proceed to Phase 2 for style discovery
4. **Generate HTML** — Convert to chosen style, preserving all text, images (from assets/), slide order, and speaker notes (as HTML comments)

---

## Phase 5: Delivery

1. **Clean up** — Delete `.claude-design/slide-previews/` if it exists
2. **Open** — Use `open [filename].html` to launch in browser
3. **Summarize** — Tell the user:
   - File location, style name, slide count
   - Navigation: Arrow keys, Space, scroll/swipe, click nav dots
   - How to customize: `:root` CSS variables for colors, font link for typography, `.reveal` class for animations
   - If inline editing was enabled: Hover top-left corner or press E to enter edit mode, click any text to edit, Ctrl+S to save

---

## Phase 6: Share & Export (Optional)

After delivery, **ask the user:** _"Would you like to share this presentation? I can deploy it to a live URL (works on any device including phones) or export it as a PDF."_

Options:

- **Deploy to URL** — Shareable link that works on any device
- **Export to PDF** — Universal file for email, Slack, print
- **Both**
- **No thanks**

If the user declines, stop here. If they choose one or both, proceed below.

### 6A: Deploy to a Live URL (Vercel)

This deploys the presentation to Vercel — a free hosting platform. The link works on any device (phones, tablets, laptops) and stays live until the user takes it down.

**If the user has never deployed before, guide them step by step:**

1. **Check if Vercel CLI is installed** — Run `npx vercel --version`. If not found, install Node.js first (`brew install node` on macOS, or download from https://nodejs.org).

2. **Check if user is logged in** — Run `npx vercel whoami`.
   - If NOT logged in, explain: _"Vercel is a free hosting service. You need an account to deploy. Let me walk you through it:"_
     - Step 1: Ask user to go to https://vercel.com/signup in their browser
     - Step 2: They can sign up with GitHub, Google, email — whatever is easiest
     - Step 3: Once signed up, run `vercel login` and follow the prompts (it opens a browser window to authorize)
     - Step 4: Confirm login with `vercel whoami`
   - Wait for the user to confirm they're logged in before proceeding.

3. **Deploy** — Run the deploy script:

   ```bash
   bash scripts/deploy.sh <path-to-presentation>
   ```

   The script accepts either a folder (with index.html) or a single HTML file.

4. **Share the URL** — Tell the user:
   - The live URL (from the script output)
   - That it works on any device — they can text it, Slack it, email it
   - To take it down later: visit https://vercel.com/dashboard and delete the project
   - The Vercel free tier is generous — they won't be charged

**⚠ Deployment gotchas:**

- **Local images/videos must travel with the HTML.** The deploy script auto-detects files referenced via `src="..."` in the HTML and bundles them. But if the presentation references files via CSS `background-image` or unusual paths, those may be missed. **Before deploying, verify:** open the deployed URL and check that all images load. If any are broken, the safest fix is to put the HTML and all its assets into a single folder and deploy the folder instead of a standalone HTML file.
- **Prefer folder deployments when the presentation has many assets.** If the presentation lives in a folder with images alongside it (e.g., `my-deck/index.html` + `my-deck/logo.png`), deploy the folder directly: `bash scripts/deploy.sh ./my-deck/`. This is more reliable than deploying a single HTML file because the entire folder contents are uploaded as-is.
- **Filenames with spaces work but can cause issues.** The script handles spaces in filenames, but Vercel URLs encode spaces as `%20`. If possible, avoid spaces in image filenames. If the user's images have spaces, the script handles it — but if images still break, renaming files to use hyphens instead of spaces is the fix.
- **Redeploying updates the same URL.** Running the deploy script again on the same presentation overwrites the previous deployment. The URL stays the same — no need to share a new link.

### 6B: Export to PDF

This captures each slide as a screenshot and combines them into a PDF. Perfect for email attachments, embedding in documents, or printing.

**Note:** Animations and interactivity are not preserved — the PDF is a static snapshot. This is normal and expected; mention it to the user so they're not surprised.

1. **Run the export script:**

   ```bash
   bash scripts/export-pdf.sh <path-to-html> [output.pdf]
   ```

   If no output path is given, the PDF is saved next to the HTML file.

2. **What happens behind the scenes** (explain briefly to the user):
   - A headless browser opens the presentation at 1920×1080 (standard widescreen)
   - It screenshots each slide one by one
   - All screenshots are combined into a single PDF
   - The script needs Playwright (a browser automation tool) — it will install automatically if missing

3. **If Playwright installation fails:**
   - The most common issue is Chromium not downloading. Run: `npx playwright install chromium`
   - If that fails too, it may be a network/firewall issue. Ask the user to try on a different network.

4. **Deliver the PDF** — The script auto-opens it. Tell the user:
   - The file location and size
   - That it works everywhere — email, Slack, Notion, Google Docs, print
   - Animations are replaced by their final visual state (still looks great, just static)

**⚠ PDF export gotchas:**

- **First run is slow.** The script installs Playwright and downloads a Chromium browser (~150MB) into a temp directory. This happens once per run. Warn the user it may take 30-60 seconds the first time — subsequent exports within the same session are faster.
- **Slides must use `class="slide"`.** The export script finds slides by querying `.slide` elements. If the presentation uses a different class name, the script will report "0 slides found" and fail. All presentations generated by this skill use `.slide`, so this only matters for externally-created HTML.
- **Local images must be loadable via HTTP.** The script starts a local server and loads the HTML through it (so Google Fonts and relative image paths work). If images use absolute filesystem paths (e.g., `src="/Users/name/photo.png"`) instead of relative paths (e.g., `src="photo.png"`), they won't load. Generated presentations always use relative paths, but converted or user-provided decks might not — check and fix if needed.
- **Local images appear in the PDF** as long as they are in the same directory as (or relative to) the HTML file. The export script serves the HTML's parent directory over HTTP, so relative paths like `src="photo.png"` resolve correctly — including filenames with spaces. If images still don't appear, check: (1) the image files actually exist at the referenced path, (2) the paths are relative, not absolute filesystem paths like `/Users/name/photo.png`.
- **Large presentations produce large PDFs.** Each slide is captured as a full 1920×1080 PNG screenshot. An 18-slide deck can produce a ~20MB PDF. If the PDF exceeds 10MB, ask the user: _"The PDF is [size]. Would you like me to compress it? It'll look slightly less sharp but the file will be much smaller."_ If yes, re-run the export with the `--compact` flag:
  ```bash
  bash scripts/export-pdf.sh <path-to-html> [output.pdf] --compact
  ```
  This renders at 1280×720 instead of 1920×1080, typically cutting file size by 50-70% with minimal visual difference.

---

## Supporting Files

| File                                               | Purpose                                                              | When to Read              |
| -------------------------------------------------- | -------------------------------------------------------------------- | ------------------------- |
| [STYLE_PRESETS.md](STYLE_PRESETS.md)               | 12 curated visual presets with colors, fonts, and signature elements | Phase 2 (style selection) |
| [templates/index.json](templates/index.json)       | 32 ready-made HTML templates from `zarazhangrui/beautiful-html-templates` (MIT) — metadata: mood, tone, occasion, formality, density, scheme, slide_count, best_for, avoid_for | Phase 2 Step 2.4 (gallery path) |
| [templates/screenshots/](templates/screenshots/)   | Preview PNGs for each template (`<slug>-1.png`, etc.)                | Phase 2 Step 2.4c |
| [templates/<slug>/](templates/)                    | Per-template folder with `template.html` + `template.json` + assets — clone OUT to edit, never mutate in place | Phase 3B (template generation) |
| [viewport-base.css](viewport-base.css)             | Mandatory responsive CSS — copy into every presentation              | Phase 3 (generation)      |
| [html-template.md](html-template.md)               | HTML structure, JS features, code quality standards                  | Phase 3 (generation)      |
| [animation-patterns.md](animation-patterns.md)     | CSS/JS animation snippets and effect-to-feeling guide                | Phase 3 (generation)      |
| [scripts/extract-pptx.py](scripts/extract-pptx.py) | Python script for PPT content extraction                             | Phase 4 (conversion)      |
| [scripts/deploy.sh](scripts/deploy.sh)             | Deploy slides to Vercel for instant sharing                          | Phase 6 (sharing)         |
| [scripts/export-pdf.sh](scripts/export-pdf.sh)     | Export slides to PDF                                                 | Phase 6 (sharing)         |
