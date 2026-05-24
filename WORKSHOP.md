# Workshop — Build something real with Claude

**You've already installed Claude Code** (if not, start at [INSTALL.html](INSTALL.html)).

Pick one of the three prompts below. Copy it. Paste it into the Claude panel in VS Code. Hit Enter. Claude does the rest.

---

## Track A — Build an Evans-style HTML slide

**Best for:** anyone who makes decks. Which is all of you.

```
Clone this repo: https://github.com/paristennisbookingassistant-spec/insead-ai-claude-workshop

Then read skills/frontend-slides/templates/templates/benedict-evans/README.md to understand the design system.

Install the frontend-slides skill by copying skills/frontend-slides/ into my ~/.claude/skills/ folder.

Then build me a single Evans-style HTML slide explaining the BCG growth-share matrix. 1280x720. Open it in my browser when done.

Once it's open, I want to be able to click any text to edit it, and use drag-mode to rearrange elements.
```

**What happens:** Claude clones the repo, installs the skill, reads the Evans design system, generates one polished slide, opens it in your browser. ~90 seconds end-to-end.

**Try next:**
- Swap "BCG growth-share matrix" for any business concept (Porter 5 Forces, prospect theory, jobs-to-be-done, the 4Ps)
- "Turn the slide above into a 5-slide deck on the same topic"
- "Convert this memo into slides: <paste memo>"

---

## Track B — Build your own Canvas sync skill

**Best for:** anyone who hates clicking through Canvas.

```
Clone this repo: https://github.com/paristennisbookingassistant-spec/insead-ai-claude-workshop

Then read starter-files/canvas-sync-tutorial.pdf — it's a tutorial written specifically for you (Claude) to follow.

Build me a /canvas-sync skill following the tutorial exactly. Install it at ~/.claude/skills/canvas-sync/.

Before writing any file with credentials, ask me interactively for my INSEAD email, password, and where I want course materials saved. Never put placeholder passwords into files — wait for my real input.

When the skill is built, run a test sync of one course (MDM, course ID 9209) so I can verify it works end-to-end.
```

**What happens:** Claude reads the PDF, asks you a few clarifying questions (folder location, whether it can install Playwright, etc.), builds the entire skill, then runs a test sync. The skill becomes yours — you can modify it freely afterward.

**Try next:**
- "Add a feature: write upcoming deadlines (next 14 days) to ~/INSEAD/deadlines.md after every sync"
- "Add another course: <CODE> with Canvas ID <ID>"
- "Set up a scheduled task that runs /canvas-sync every weekday morning at 7am"

---

## Track C — Just explore

**Best for:** anyone who wants to see what's possible before committing to a track.

```
Clone this repo: https://github.com/paristennisbookingassistant-spec/insead-ai-claude-workshop

Walk me through what's in it. What can I do with this? What's each file for? Show me 2-3 things I could try right now, in order of how impressive they'd look.
```

**What happens:** Claude clones, surveys the structure, and gives you a personalized menu. Good if you want to pick a track based on what catches your eye.

---

## Tips for working with these prompts

1. **Paste the whole prompt at once** — don't break it into pieces. Claude works better with the full context up front.
2. **The repo URL is already filled in above** — paste the prompt as-is. The QR code on slide 24 opens this same page.
3. **Answer Claude's questions** — Claude will pause and ask you things (where should X go? can I install Y?). These pauses aren't bugs; they're how Claude makes sure it doesn't do something you didn't want.
4. **Iterate freely** — the first version is rarely the final one. "Make it shorter", "use a different color", "add a chart" — keep going until you like it.
5. **When stuck, ask Claude** — "I'm not sure what you just did" or "why did you choose X?" works fine. Claude will explain.

---

## If you'd rather follow a step-by-step walkthrough

The master prompts above are the intended path. But if you want to see every command spelled out (e.g. you don't trust Claude to clone the repo for you, or you want to learn what's happening under the hood), see the manual walkthroughs:

- [tracks/manual/track-a-frontend-slides.md](tracks/manual/track-a-frontend-slides.md)
- [tracks/manual/track-b-canvas-tutorial.md](tracks/manual/track-b-canvas-tutorial.md)

Most people don't need these.
