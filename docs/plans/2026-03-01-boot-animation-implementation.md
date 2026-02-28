# Boot Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a terminal-style boot sequence that plays when users visit the site, with AI/automation themed messages, then reveals the main portfolio.

**Architecture:** Fullscreen overlay component that displays boot messages with typewriter effect, then fades out to reveal main app. Uses localStorage to remember returning visitors.

**Tech Stack:** React, Framer Motion, localStorage

---

## Task 1: Create BootLoader Component

**Files:**
- Create: `src/components/BootLoader.tsx`

**Step 1: Create the BootLoader component**

```tsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootMessages = [
  '> KIM_OS v1.0.0 initializing...',
  '> Checking system requirements... OK',
  '> Loading n8n workflow engine...',
  '> Initializing AI automation modules...',
  '> Connecting to webhook endpoints...',
  '> Building neural pathways... [OK]',
  '> Loading workflow templates... 50+ loaded',
  '> Configuring integration nodes...',
  '> Parsing automation sequences...',
  '> Calibrating AI response systems...',
  '> System ready!',
  '> Loading portfolio...'
]

interface BootLoaderProps {
  onComplete: () => void
}

const BootLoader = ({ onComplete }: BootLoaderProps) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  const currentMessage = bootMessages[currentLine]

  // Typewriter effect
  useEffect(() => {
    if (currentLine >= bootMessages.length) {
      setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 800)
      }, 500)
      return
    }

    if (charIndex < currentMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, 30 + Math.random() * 20)
      return () => clearTimeout(timer)
    }

    // Line complete, move to next after delay
    const timer = setTimeout(() => {
      setCurrentLine(prev => prev + 1)
      setCharIndex(0)
      setDisplayedText('')
    }, 200 + Math.random() * 300)
    return () => clearTimeout(timer)
  }, [charIndex, currentLine, currentMessage, onComplete])

  // Skip on click or keypress
  const handleSkip = useCallback(() => {
    if (!isComplete) {
      setCurrentLine(bootMessages.length)
    }
  }, [isComplete])

  useEffect(() => {
    const handleKeyPress = () => handleSkip()
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [handleSkip])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col"
      onClick={handleSkip}
    >
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl font-mono text-sm">
          {bootMessages.slice(0, currentLine).map((msg, i) => (
            <div key={i} className="text-[#00fff5] opacity-60 mb-1">
              {msg}
            </div>
          ))}
          <div className="text-[#00fff5] mb-1">
            {displayedText}
            <span className="animate-pulse">▋</span>
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-gray-600 text-xs">
          Press any key or click to skip
        </p>
      </div>
    </motion.div>
  )
}

export default BootLoader
```

**Step 2: Commit**

```bash
git add src/components/BootLoader.tsx
git commit -m "feat: add BootLoader component with typewriter effect

- Terminal-style boot animation with AI/automation messages
- Typewriter effect for each line
- Skip on click or keypress
- Green terminal color scheme"
```

---

## Task 2: Integrate BootLoader into App

**Files:**
- Modify: `src/App.tsx` (add import and state)

**Step 1: Add BootLoader state and import to App.tsx**

Add import at top:
```tsx
import BootLoader from './components/BootLoader'
```

Add state after other useState declarations:
```tsx
const [showBoot, setShowBoot] = useState(true)
const [hasSeenBoot, setHasSeenBoot] = useState(false)

// Check localStorage on mount
useEffect(() => {
  const seen = localStorage.getItem('kim_portfolio_boot_seen')
  if (seen) {
    setShowBoot(false)
    setHasSeenBoot(true)
  }
}, [])
```

Add handler:
```tsx
const handleBootComplete = () => {
  localStorage.setItem('kim_portfolio_boot_seen', 'true')
  setShowBoot(false)
  setHasSeenBoot(true)
}
```

**Step 2: Add BootLoader before main content**

Wrap the return JSX with:
```tsx
<AnimatePresence>
  {showBoot && <BootLoader onComplete={handleBootComplete} />}
</AnimatePresence>
```

Then your existing content...

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate BootLoader into App

- Show boot animation on first visit
- Persist to localStorage for returning visitors"
```

---

## Task 3: Test and Verify

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Verify in browser**

1. Clear localStorage or use incognito
2. Visit localhost:5173
3. Should see boot sequence with messages
4. Each line should type out character by character
5. After ~5 seconds, should fade to main content
6. Refresh should skip animation

**Step 3: Commit**

```bash
git commit -m "test: verify boot animation works correctly"
```

---

## Acceptance Criteria

- [ ] BootLoader component created with typewriter effect
- [ ] All 12 boot messages display with AI/automation theme
- [ ] Animation auto-completes after ~5 seconds
- [ ] User can skip by clicking or pressing any key
- [ ] Returning visitors see main content immediately
- [ ] Smooth fade transition when switching to main content
- [ ] Matches existing terminal color scheme (#00fff5 green)
