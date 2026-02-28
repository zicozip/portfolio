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

## Design Brainstorming (For New/Redesign)

When starting a NEW design or REDESIGN (no UI yet or want completely new look):

**Step 1: Explore the current state**
- Check existing files, assets, old designs
- Research current trends in the industry
- Understand the purpose: portfolio, SaaS, e-commerce, etc.

**Step 2: Ask strategic questions**
1. Who is the TARGET AUDIENCE? (clients, employers, users)
2. What is the MAIN GOAL? (convert leads, showcase work, sell products)
3. What makes this UNIQUE? (your differentiator)
4. What current TRENDS fit the brand? (2026 aesthetics)
5. What should users FEEL when visiting? (impressed, trust, amazed)

**Step 3: Propose 2-3 design directions**
- Each with distinct visual approach
- Explain WHY each would work for the target audience
- Give your RECOMMENDATION with reasoning

**Step 4: Present the design**
- Describe the visual style, color scheme, typography
- Explain the user flow and key features
- Get approval BEFORE any code

---

## Example: Portfolio Design Process

For a portfolio like kjgudez.tech:
```
Target Audience: Potential clients seeking AI automation services
Main Goal: Convert visitors to projects
Unique: DMD → AI career path (medical background in tech)
Vibe: Professional yet innovative, 2026 modern

Proposed approaches:
1. Terminal/CLI style - Technical, authentic to AI work
2. Glassmorphism cards - Modern, premium feel
3. Minimal with bold typography - Clean, focus on work

Recommended: #1 (Terminal style)
- Matches AI/automation theme naturally
- Stands out from typical portfolios
- Shows technical expertise through design itself
```

---

The key is asking "What would impress a client in 2026?" and designing to exceed that expectation.

---

## Standard Workflow

```
Before ANY code work:

1. Check git status and current branch
2. If on main/master → switch to improvements first

3. Decide if brainstorming is needed:
   - NEW feature/UI changes → use brainstorming first
   - Simple fixes/tweaks → skip brainstorming, just do it

4. Use skills in this order for new features:
   - superpowers:using-superpowers
   - superpowers:brainstorming (get design approval BEFORE implementation)
   - superpowers:writing-plans (create detailed implementation plan)

5. Execute using:
   - superpowers:subagent-driven-development
   - Two-stage reviews: spec compliance → code quality
   - Fix any issues found before moving on

6. After each improvement is done:
   - Verify build passes (npm run build)
   - Ask "what next?" or present merge/PR options

7. When ready to finish:
   - Use superpowers:finishing-a-development-branch
   - Present options: merge locally / push PR / keep branch
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

## Applying to Master (Locally Only)

When I say "apply to master" or "merge to main":

```
1. git checkout master (or main)
2. git merge improvements
3. npm run build (verify)
4. Done!
```

Note: This project has no remote origin - all local only.

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

**For EVERY fix/improvement:
1. Take screenshot → Analyze with MiniMax → Verify changes look correct
2. Delete screenshot files (e.g., `rm boot-*.png`)
3. THEN commit**

Don't leave test screenshots in the project.

---

## When to Skip Brainstorming

| Type of Change | Need Brainstorming? |
|----------------|---------------------|
| New feature/UI component | Yes - get approval first |
| Design changes | Yes - get approval first |
| Simple bug fix | No - just do it |
| Minor tweaks (colors, sizes) | No - just do it |
| Code refactoring | No - just do it |

For simple fixes: Make the change → test → verify build → delete test screenshots → ask "what next?"

---

## Quick Reminder

If you ever forget the workflow, just say "Use the standard portfolio workflow" and I'll follow this prompt.
