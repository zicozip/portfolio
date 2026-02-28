# Boot Animation Design

## Overview
A terminal-style boot sequence that plays when users visit the site, simulating system initialization with AI/automation themed messages.

## User Experience
1. **First visit** - Full boot sequence plays (~5 seconds)
2. **Subsequent visits** - Check localStorage, skip animation if already seen
3. **Manual skip** - User can click anywhere or press any key to skip

## Visual Style
- **Background**: Dark (#0a0a0a or similar)
- **Text color**: Primary green (#00FF88) with amber accents (#FFB800)
- **Font**: Monospace (JetBrains Mono or similar)
- **Cursor**: Blinking block cursor

## Boot Sequence Messages
```
> KIM_OS v1.0.0 initializing...
> Checking system requirements... OK
> Loading n8n workflow engine...
> Initializing AI automation modules...
> Connecting to webhook endpoints...
> Building neural pathways... [OK]
> Loading workflow templates... 50+ loaded
> Configuring integration nodes...
> Parsing automation sequences...
> Calibrating AI response systems...
> System ready!
> Loading portfolio...
```

## Implementation Details

### Component Structure
- `src/components/BootLoader.tsx` - Main boot animation component
- Uses React state to control animation progress
- localStorage to track if user has seen animation

### Animation Timing
- Each line: 300-500ms with typewriter effect
- Total duration: ~5 seconds
- Skip on click or keypress

### Integration
- Add BootLoader as initial screen in App.tsx
- Once animation completes, reveal main app content
- Use CSS transitions for smooth fade out

## Acceptance Criteria
1. Boot sequence displays on first visit
2. Each message appears with typewriter effect
3. User can skip by clicking or pressing a key
4. Returning visitors see main content immediately
5. Animation matches terminal aesthetic
6. All text is AI/automation themed
