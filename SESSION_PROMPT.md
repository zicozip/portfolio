# Session Prompt

Use this at the start of every new session.

---

## Base Setup

Project: `D:\Minimax\PortWarp\kim-portfolio-new`

**For NEW projects (no git yet):**
```
Create a new project at [FOLDER_PATH]:
1. Initialize git with main branch
2. Create improvements branch
3. Set up the workflow below

Then explore what we should build using brainstorming.
```

---

## Standard Workflow

```
Before ANY code work:

1. Check git status and current branch
2. If on main/master → switch to improvements first
3. Use skills in this order:
   - superpowers:using-superpowers
   - superpowers:brainstorming (get design approval BEFORE implementation)
   - superpowers:writing-plans (create detailed implementation plan)

4. Execute using:
   - superpowers:subagent-driven-development
   - Two-stage reviews: spec compliance → code quality
   - Fix any issues found before moving on

5. Finish with:
   - superpowers:finishing-a-development-branch
   - Verify build passes (npm run build)
   - Present merge/PR options to me
```

---

## Code Quality Standards

- No TypeScript errors
- No build failures
- Spec compliance before code quality
- Test/verify before declaring done

---

## Git Rules

| Branch | Purpose |
|--------|---------|
| improvements | Working branch for features/fixes |
| main/master | Production (never touch without approval) |

Always commit to improvements first, then get my approval before merging to main.

---

## Available Tools

- **MCP Tools**: Playwright (testing/screenshots), MiniMax (image analysis), Context7 (docs)
- **Task Tool**: Subagent work, parallel tasks
- **Grep/Glob**: Code exploration before changes

Use them proactively - don't wait for me to ask.

## Playwright Fix

If Playwright MCP fails (browser not found), use this workaround:

```javascript
// screenshot.js - run with: node screenshot.js
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
})();
```

Run with: `node screenshot.js`

---

## Quick Reminder

If you ever forget the workflow, just say "Use the standard portfolio workflow" and I'll follow this prompt.
