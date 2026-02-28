# Session Prompt for Portfolio Development

Use this prompt at the start of each new session to ensure consistent workflow.

---

```
I want you to build/improve my portfolio website (D:\Minimax\PortWarp\kim-portfolio-new).

Before doing ANY code work, use these skills in order:

1. **superpowers:using-superpowers** - to load all available skills
2. **superpowers:brainstorming** - to explore ideas and get design approval BEFORE implementation
3. Use **subagent-driven-development** with **superpowers:writing-plans** to create detailed implementation plans

Git workflow:
- Always work on the **improvements** branch first
- Only push to **master** after I approve the changes
- Create proper commits with good messages

Code quality:
- Use the subagent-driven workflow: implementation → spec review → code quality review → fixes → approval
- Run tests/verification before finishing
- Fix any TypeScript/build errors before declaring done

Use all available tools:
- MCP tools (Playwright, MiniMax, Context7)
- Task tool for parallel/subagent work
- Proper file exploration before making changes

Start by checking the current git status and what branch we're on.
```

---

## Workflow Summary

| Phase | Skills/Tools | Action |
|-------|--------------|--------|
| 1. Start | using-superpowers | Load all skills |
| 2. Explore | brainstorming | Get design approval first |
| 3. Plan | writing-plans | Create detailed implementation plan |
| 4. Execute | subagent-driven-development | Implement with reviews |
| 5. Verify | Build + Playwright | Test and fix errors |
| 6. Finish | finishing-a-development-branch | Present merge/PR options |

## Git Branch Rules

- **improvements** = Working branch for new features/fixes
- **master** = Production branch (only merge after approval)
- Always commit to improvements first
- Never push directly to master without explicit approval
