# Track A — Build an HTML slide (manual walkthrough)

> **Most people don't need this file.**
> Use the master prompt in [`WORKSHOP.md`](../../WORKSHOP.md) instead — Claude will clone the repo, install the skill, and build your slide for you.
> This file is the manual fallback, for people who want to run each step themselves.

**Time:** 25 minutes
**Best for:** anyone who makes decks. Which is all of you.

By the end of this track, you'll have one editable, pixel-perfect HTML slide on your laptop. The skill bundles a few sample templates, including one that matches the deck you saw tonight.

---

## Step 1 — Install the skill

The skill lives in this repo at [`skills/frontend-slides/`](../skills/frontend-slides/). Copy the whole folder into your local Claude skills directory:

**Mac / Linux:**
```bash
cp -r skills/frontend-slides ~/.claude/skills/
```

**Windows (PowerShell):**
```powershell
Copy-Item -Recurse skills/frontend-slides "$env:USERPROFILE\.claude\skills\"
```

Verify the skill is installed:
```bash
ls ~/.claude/skills/frontend-slides/SKILL.md
```

You should see the file path. If you do, Claude Code will pick up the `/frontend-slides` slash command on its next session.

---

## Step 2 — Open a fresh Claude session in your project folder

Make a folder for your slide work and `cd` into it:

```bash
mkdir my-slides && cd my-slides
claude
```

---

## Step 3 — Run the first prompt

Type this in Claude Code:

```
/frontend-slides build me a single slide explaining the BCG growth-share matrix.
Use the benedict-evans template. 1280x720. Coral accent. Sentence case headline ending in a period.
```

Press Enter. Claude will:

1. Read the `frontend-slides` SKILL.md
2. Read the `benedict-evans` template files
3. Generate `slide.html` in your folder
4. Open it in your browser

It takes ~45-60 seconds.

---

## Step 4 — Edit live in the browser

The generated slide includes the slide editor. In your browser:

- **Click any text** — it becomes editable, just type
- **Click the "Drag mode" button** at the top-left — drag elements to move them, drag the corner handle to resize
- **Ctrl/Cmd + Z** — undo
- **The 💾 Download button** — saves the edited HTML
- **The 🗑 button** — clears your in-browser autosave if you want to revert to the original

---

## Step 5 — Try variations

Once the basic flow works, try these:

```
/frontend-slides convert this idea into a 3-slide mini deck:
- Slide 1: The BCG matrix — what it is
- Slide 2: Where each of [Apple, Tesla, IBM] sits today
- Slide 3: One actionable takeaway for an MBA
Same benedict-evans template.
```

```
/frontend-slides take last week's case prep memo (paste here) and turn it into
a 5-slide pre-class summary. One key insight per slide. Coral for the verb.
```

```
/frontend-slides redesign this slide [paste HTML] — same content, different
template. Try mat, or biennale-yellow, or studio. Pick whichever lands best.
```

---

## Common issues

**"The skill isn't found / `/frontend-slides` doesn't autocomplete."**
The skill folder must be at `~/.claude/skills/frontend-slides/` with `SKILL.md` directly inside it. If you nested it (e.g. `~/.claude/skills/frontend-slides/frontend-slides/SKILL.md`), Claude won't find it. Move it up one level.

**"The slide looks ugly / fonts are wrong."**
The template loads Roboto Slab and Inter from Google Fonts. If your laptop blocks Google Fonts (rare, but happens on some corporate networks), the slide falls back to default fonts. Try on a different network or download the fonts locally.

**"I want to deploy this online."**
Run `bash ~/.claude/skills/frontend-slides/scripts/deploy.sh` to push the slide to Vercel. First time will ask you to log in to Vercel (free account).

**"I want to export to PDF."**
Run `bash ~/.claude/skills/frontend-slides/scripts/export-pdf.sh slide.html`. Outputs `slide.pdf`.

---

## Going further

- Read [`prompts/frontend-slides-starter.md`](../prompts/frontend-slides-starter.md) for 5 more starter prompts.
- Browse [`skills/frontend-slides/templates/templates/`](../skills/frontend-slides/templates/templates/) to see all 33 templates (the original 32 + benedict-evans).
- The skill's full reference docs live in [`skills/frontend-slides/SKILL.md`](../skills/frontend-slides/SKILL.md) and [`STYLE_PRESETS.md`](../skills/frontend-slides/STYLE_PRESETS.md).

If you build something cool, drop it in the AI Club WhatsApp.
