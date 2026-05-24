# Track B starter prompt

This is the main prompt for Track B. Copy-paste it into a fresh Claude Code session, then **drag the PDF onto Claude** before pressing Enter.

---

## The build prompt

**Step 1:** Drag [`starter-files/canvas-sync-tutorial.pdf`](../starter-files/canvas-sync-tutorial.pdf) into the Claude Code window.

**Step 2:** Paste and run this prompt:

```
I'm attaching a PDF that describes a Claude Code skill called /canvas-sync.
The PDF is a tutorial written specifically for you (Claude) to follow.

Please:
1. Read the entire PDF before doing anything.
2. Ask me any clarifying questions you need before writing files.
   I expect questions about: where my course folder should live, whether you can
   run pip install / playwright install, whether to use placeholder credentials
   in .env, and whether to test with one course or all 9.
3. Once I've answered, build the complete skill at ~/.claude/skills/canvas-sync/
   exactly as the PDF describes — SKILL.md, README.md, .env.example,
   scripts/canvas_login.py, scripts/canvas_sync.py, scripts/classify.py.
4. After writing files, install dependencies (pip + playwright chromium)
   and ask me to populate the .env file with my real credentials.
5. Run a test sync of one course (MDM, course ID 9209) so I can verify the
   skill works end-to-end before we move on.

Constraints:
- Do not skip the clarifying questions.
- Do not put my password in any file other than .env, and confirm .env is in
  .gitignore.
- Print a final summary of what you built when done, so I understand what
  each file does.
```

---

## After the skill is built

Try these one-liners to extend it:

### Add a deadlines tracker

```
Update /canvas-sync to also fetch assignments and write a deadlines file at
~/INSEAD/deadlines.md. Include any assignment due in the next 14 days,
sorted by date, with the course code and assignment name.
```

### Add a daily summary

```
Add a feature to /canvas-sync: after every sync, append a one-line entry to
~/INSEAD/sync-log.md with date, courses synced, and new file count.
```

### Add another course

```
/canvas-sync --add

(or interactively: edit COURSE_CONFIG in scripts/canvas_sync.py and add a row)
```

### Sync on a schedule

If you want it to run automatically every morning:

**Mac/Linux (cron):**
```bash
crontab -e
# Add this line — runs every weekday at 7am:
0 7 * * 1-5 cd ~/.claude/skills/canvas-sync && python scripts/canvas_sync.py >> ~/canvas-sync.log 2>&1
```

**Windows (Task Scheduler):**
- Open Task Scheduler → Create Basic Task
- Trigger: Daily, 7:00 AM
- Action: Start a program
- Program: `python`
- Arguments: `C:/Users/<you>/.claude/skills/canvas-sync/scripts/canvas_sync.py`

Or just ask Claude:
```
Set up a recurring task on my <Mac / Windows> that runs /canvas-sync every weekday at 7am.
```

---

## If something goes wrong

The PDF includes a "Known quirks" section with the most common Canvas API gotchas. If Claude's first build fails (e.g. on a course where `/pages` returns 404), tell Claude:

```
The sync just failed on course <CODE> with error <paste the error>. 
Read the "Known quirks" section of the PDF I gave you earlier 
and apply the recommended fallback. Then re-run.
```

The skill is yours — modify freely.
