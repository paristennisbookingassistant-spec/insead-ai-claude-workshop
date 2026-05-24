# Benedict Evans template

Warm-gray canvas. Coral accent. Slab serif. Editorial, considered, MBA-friendly.

This is the aesthetic of Benedict Evans's annual "AI eats the world" decks: high-signal, low-noise, designed to be read, not scanned. Best for strategy memos, case prep summaries, exec briefings, and any presentation where the audience actually has to think.

## How to use

When invoking `/frontend-slides`, ask for this template by slug:

```
/frontend-slides build me a 5-slide deck on the BCG growth-share matrix.
Use the benedict-evans template.
```

Or by description:

```
/frontend-slides build me a deck. Warm-gray paper background, coral accent,
slab-serif headlines, light-italic subtitles. Editorial Benedict-Evans style.
```

## What you get

The template includes five reusable slide layouts:

1. **Title slide** — coral full-bleed, deck title + byline
2. **Three-card row** — number, label, one-sentence description per card
3. **Quote slide** — big italic pull quote with attribution
4. **Two-column comparison** — A vs. B, accent column for the recommended option
5. **Closing / goal slide** — one sentence, emphasis on the verb

All slides:
- 1280 × 720 (PowerPoint 16:9), exports cleanly to PDF
- Click any text to edit it (every text element is `contenteditable`)
- Optional drag + resize via the bundled `slide-editor.js` (Ctrl+Z to undo)
- Print-friendly CSS — no scaling issues when exported

## Design rules

If you want to extend the template with new slide types, follow these conventions:

- **Headlines:** 56px Roboto Slab weight 400, sentence case, ends with a period
- **Subtitles:** 24px Roboto Slab weight 300, italic, soft gray
- **Body text:** Roboto Slab 400 or 300
- **UI strings** (page numbers, sources, tags): Inter, smaller, uppercase for tags
- **Accent color:** `#e74c3c` (coral). One accent per slide. Use it on the verb or the number, never the whole headline.
- **Spacing:** 78px top, 88px sides, 100px bottom for body content
- **Page numbers:** bottom-right, 12px Inter, light gray
- **Source citation:** bottom-left, 12px Inter, slightly darker

## Why this works

- **Slab serif** signals seriousness without being stuffy
- **Warm gray** (not pure white) reduces glare and looks more designed
- **Coral accent** (not blue, red, or green) feels editorial, not corporate
- **One accent per slide** forces hierarchy
- **Light-italic subtitles** create a clear visual rhythm with the bold headline

Use sparingly. The restraint is the point.
