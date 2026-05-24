# Track B — Build your own /canvas-sync skill (manual walkthrough)

> **Most people don't need this file.**
> Use the master prompt in [`WORKSHOP.md`](../../WORKSHOP.md) instead — Claude will read the PDF, ask you for credentials, and build your skill for you.
> This file is the manual fallback, for people who want to run each step themselves.

**Time:** 25 minutes
**Best for:** anyone who hates clicking through Canvas. Which is all of you.

This track is different from Track A. **You don't install a pre-built skill.** Instead, you hand Claude a tutorial PDF and ask it to build the skill for you. The result is *your* skill, in *your* folder, with *your* credentials, that you understand because you watched it get built.

This is the meta-skill: how to make skills.

---

## Step 1 — Open Claude in a fresh folder

```bash
mkdir build-canvas-sync && cd build-canvas-sync
claude
```

---

## Step 2 — Hand Claude the tutorial PDF

Drag and drop [`starter-files/canvas-sync-tutorial.pdf`](../starter-files/canvas-sync-tutorial.pdf) into your Claude Code window, then run this prompt:

```
I'm attaching a PDF that describes a Claude Code skill called /canvas-sync.
It's a tutorial written specifically for you (Claude) to follow.

Please:
1. Read the entire PDF.
2. Ask me any clarifying questions before writing files.
3. Once I've answered, build the skill in ~/.claude/skills/canvas-sync/
   with all the files described in the PDF.
4. Run a test sync with one course (MDM, course ID 9209) so I can verify it works.
```

Claude will read the PDF. It should come back with ~3-5 clarifying questions, including:

- Where should `VAULT_PATH` point? (Default to your INSEAD course folder, or somewhere new.)
- Are you OK with running `pip install playwright requests python-dotenv` and `playwright install chromium`?
- Should the `.env` file have placeholder values, or do you want to type your password yourself later?
- Test with one course (MDM) or all 9 on the first sync?

Answer the questions. Claude will then write the skill.

---

## Step 3 — Verify the skill installed

```bash
ls ~/.claude/skills/canvas-sync/
```

You should see:
```
SKILL.md
README.md
.env.example
scripts/
state/
```

---

## Step 4 — Configure your credentials

Copy the `.env.example` to `.env` (in the same folder) and fill in your real values:

```bash
cp ~/.claude/skills/canvas-sync/.env.example ~/.claude/skills/canvas-sync/.env
```

Open the new `.env` file (use VS Code: `code ~/.claude/skills/canvas-sync/.env`) and replace the placeholders:

```
INSEAD_EMAIL=your.actual.email@insead.edu
INSEAD_PASSWORD=your_actual_password
VAULT_PATH=C:/Users/you/Documents/INSEAD/Courses
```

**Important:** never commit `.env` to git. The repo's `.gitignore` already excludes it.

---

## Step 5 — Run your first sync

In a new Claude session (or the same one, if you stayed):

```
/canvas-sync MDM
```

Claude will:
1. Read your `.env`
2. Open headless Chromium, log into Canvas via ADFS
3. Save cookies for future runs
4. Walk the MDM course modules
5. Download any new files into your VAULT_PATH
6. Write a manifest summarizing what's new and what's due

Should take ~30-90 seconds the first time.

---

## Step 6 — Try variations

```
/canvas-sync                    # all 9 configured courses
/canvas-sync MDM TIS            # just these two
/canvas-sync --status           # show last manifest, no API calls
/canvas-sync --add              # interactively add a new course
```

---

## Step 7 — Make it yours

The whole point of building the skill yourself is that you can modify it. Try:

```
Read ~/.claude/skills/canvas-sync/SKILL.md. I want to add a feature:
after every sync, also write a one-line summary to a file called
~/INSEAD/sync-log.md with the date and number of new files. Add this
to both the skill and the script.
```

Or:

```
Update the canvas-sync skill so it also fetches assignments and
writes upcoming deadlines (next 14 days) to a markdown file called
~/INSEAD/deadlines.md. Sort by date, include the course code.
```

---

## Common issues

**"Login failed / 401 errors."**
Your INSEAD password may be wrong in `.env`. Test it manually at `learn.insead.edu` first. If the password is right but login still fails, the ADFS form selectors may have changed — ask Claude to read the page and update the selectors.

**"Playwright won't install / Chromium download fails."**
Make sure Python 3 is installed and on your PATH. On Windows, you may need to run the install command from a fresh terminal after Python install. If `playwright install chromium` hangs, check your network — it downloads ~150 MB.

**"Files download but go to the wrong folder."**
Check `VAULT_PATH` in your `.env`. Use forward slashes even on Windows. No trailing slash.

**"MFA prompt appeared."**
As of May 2026, Canvas didn't require MFA. If it does now, the skill needs an update. Ask Claude to add an MFA-handling step that pauses and waits for you to complete it on your phone.

---

## Going further

Once `/canvas-sync` works, you can extend the same pattern to other INSEAD systems:

- `/careerglobe-sync` — for the career portal
- `/insead-mail-triage` — for the alumni newsletter inbox
- `/library-search` — for the INSEAD library catalog

The pattern is always the same: write a tutorial markdown, hand it to Claude, answer the questions, get a skill.

If you build one, drop it in the AI Club WhatsApp.
