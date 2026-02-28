import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface BootLoaderProps {
  onComplete: () => void
}

// Reduced to 8 messages for ~3 second duration
const BOOT_MESSAGES = [
  '> KIM_OS v1.0.0 initializing...',
  '> Loading n8n workflow engine...',
  '> Initializing AI modules...',
  '> Building neural pathways... [OK]',
  '> Loading workflow templates...',
  '> System ready!',
  '> Loading portfolio...'
]

// Faster timing for 3 seconds total
const TYPING_SPEED_MS = 25
const LINE_DELAY_MS = 150
const COMPLETION_DELAY_MS = 300
const SKIP_HANDLER_DELAY_MS = 300

const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  const isCompleteRef = useRef(false)

  const handleComplete = useCallback(() => {
    if (!isCompleteRef.current) {
      isCompleteRef.current = true
      setTimeout(() => {
        onComplete()
      }, COMPLETION_DELAY_MS)
    }
  }, [onComplete])

  // Typewriter effect
  useEffect(() => {
    if (currentLine >= BOOT_MESSAGES.length) {
      handleComplete()
      return
    }

    const currentMessage = BOOT_MESSAGES[currentLine]

    if (charIndex < currentMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentMessage.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, TYPING_SPEED_MS)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setCharIndex(0)
        setDisplayedText('')
      }, LINE_DELAY_MS)
      return () => clearTimeout(timer)
    }
  }, [currentLine, charIndex, handleComplete])

  // Skip handler
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const handleSkip = () => {
      handleComplete()
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      handleSkip()
    }

    timeoutId = setTimeout(() => {
      window.addEventListener('click', handleSkip)
      window.addEventListener('keydown', handleKeyPress)
    }, SKIP_HANDLER_DELAY_MS)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('click', handleSkip)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}
      onClick={handleComplete}
    >
      {/* Terminal Popup */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(0, 255, 245, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 0 60px rgba(0, 255, 245, 0.15)',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(0, 255, 245, 0.2)' }}>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27ca40' }} />
          <span className="ml-4 text-xs" style={{ color: '#666' }}>kim@portfolio ~ boot</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6">
          {/* ASCII Art Header */}
          <div className="text-xs mb-4" style={{ color: '#00fff5' }}>
            <pre className="text-[10px] leading-tight">
{`
   ██████╗ ██████╗ ██╗   ██╗██╗   ██╗██╗  ██╗
  ██╔════╝ ██╔══██╗╚██╗ ██╔╝██║   ██║██║ ██╔╝
  ██║      ██████╔╝ ╚████╔╝ ██║   ██║█████╔╝
  ██║      ██╔══██╗  ╚██╔╝  ██║   ██║██╔═██╗
  ╚██████╗ ██║  ██║   ██║   ╚██████╔╝██║  ██╗
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
`}
            </pre>
          </div>

          {/* Boot Messages */}
          <div className="space-y-1 mb-4">
            {BOOT_MESSAGES.slice(0, currentLine).map((message, index) => (
              <div
                key={index}
                className="text-xs"
                style={{ color: index === BOOT_MESSAGES.length - 1 ? '#ffb800' : '#00fff5' }}
              >
                {message}
              </div>
            ))}

            {currentLine < BOOT_MESSAGES.length && (
              <div className="text-xs" style={{ color: '#00fff5' }}>
                {displayedText}
                <span className="animate-pulse">▋</span>
              </div>
            )}
          </div>

          {/* Skip hint */}
          <div className="text-xs" style={{ color: '#444' }}>
            Press any key or click to skip
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BootLoader
