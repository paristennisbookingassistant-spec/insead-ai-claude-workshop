# Track A starter prompts

Copy-paste these into Claude Code. Edit the parts in `<angle brackets>`.

---

## 1. Build a single slide from scratch

**Use when:** you have a business concept in mind and want one polished slide.

```
/frontend-slides build me a single slide explaining <the BCG growth-share matrix>.
Use the benedict-evans template. 1280x720. Coral accent for the verb.
Sentence-case headline ending in a period.
Open it in my browser when done.
```

**Variations to try:**
- Swap `<the BCG growth-share matrix>` for: Porter's 5 Forces, the Eisenhower matrix, prospect theory, the 4Ps, jobs-to-be-done, the discounted cash flow formula
- Swap `benedict-evans` for: `mat`, `studio`, `biennale-yellow`, `monochrome`, `signal`

---

## 2. Convert a memo into a deck

**Use when:** you have a written document (case prep, recap, study group notes) and want a presentation version.

```
/frontend-slides I'm pasting a memo below. Convert it into a 5-slide deck.
- Slide 1: title (the memo's main argument)
- Slides 2-4: the three key points, one per slide, with a sentence-case headline and 2-3 bullet sub-points
- Slide 5: the takeaway, with the action item highlighted in coral
Use benedict-evans template. 1280x720.

MEMO:
<paste your memo here>
```

---

## 3. Make a comparison slide

**Use when:** you're presenting A vs. B (case option, strategic choice, vendor decision).

```
/frontend-slides build me a two-column comparison slide.
Topic: <Strategy A vs. Strategy B for entering the Indian market>.
Left column: Strategy A — <e.g. JV with local player>. List 3 strengths, 2 weaknesses.
Right column: Strategy B — <e.g. direct entry via greenfield>. Same structure.
Highlight the recommended one with a coral top border.
Sentence-case headline. benedict-evans template.
```

---

## 4. Build a 3-card "framework" slide

**Use when:** you're presenting a framework or model with 3 components (most consulting frameworks).

```
/frontend-slides build me a 3-card slide on <the three horizons framework>.
For each card: a number (01/02/03), a label (Horizon 1 / Horizon 2 / Horizon 3),
and a one-sentence description.
Highlight Horizon 3 (the disruptive one) with a coral top border.
Sentence-case headline. benedict-evans template.
```

---

## 5. Redesign an existing slide

**Use when:** you have a slide that works but looks generic, and you want a fresh aesthetic.

```
/frontend-slides I'm pasting an HTML slide below. Redesign it using a different template.
Keep the content identical — change only the visual style.
Try the mat template first, then show me one alternative if it doesn't land.

SLIDE:
<paste your HTML here>
```

---

## 6. Export to PDF for distribution

**Use when:** the slide is final and you want to send it as a static file.

```
Take the slide.html file in this folder. Export it to PDF named <my-deck.pdf>.
Open the PDF when done so I can verify it looks right.
```

(Claude will run the bundled `export-pdf.sh` script.)

---

## 7. Deploy online to share a URL

**Use when:** you want a shareable link instead of attaching the HTML.

```
Take slide.html in this folder. Deploy it to Vercel and give me the public URL.
```

(First-time deploy will ask you to log into Vercel. Free plan is plenty.)

---

## Tips for better prompts

- **Be specific about template.** Naming a template (`benedict-evans`, `mat`, `studio`) gets predictable results. Letting Claude pick yields random aesthetics.
- **Sentence case + period.** This is the Evans style and looks much more considered than All Caps Headlines or no punctuation.
- **One accent per slide.** Coral on the verb, not the whole headline.
- **Constrain length.** "One sentence per card", "max 3 bullets", "3 slides not 7" — Claude defaults to verbose.
- **Iterate, don't perfect on the first try.** The first output is rarely the final one. Refine with "shorten card 2", "swap the colors", "make the headline punchier".
