import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface BootLoaderProps {
  onComplete: () => void
}

const BOOT_MESSAGES = [
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

const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  const handleComplete = useCallback(() => {
    if (!isComplete) {
      setIsComplete(true)
      // Small delay before calling onComplete
      setTimeout(() => {
        onComplete()
      }, 500)
    }
  }, [isComplete, onComplete])

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
      }, 30) // Typing speed
      return () => clearTimeout(timer)
    } else {
      // Move to next line after a short delay
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setCharIndex(0)
        setDisplayedText('')
      }, 200) // Delay between lines
      return () => clearTimeout(timer)
    }
  }, [currentLine, charIndex, handleComplete])

  // Skip handler - click or keypress
  useEffect(() => {
    const handleSkip = () => {
      handleComplete()
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input (shouldn't happen here but good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      handleSkip()
    }

    window.addEventListener('click', handleSkip)
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('click', handleSkip)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-start justify-start p-8 md:p-16"
      style={{
        backgroundColor: '#0a0a0a',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
      }}
    >
      {/* Boot messages */}
      <div className="flex-1 w-full max-w-4xl">
        {BOOT_MESSAGES.slice(0, currentLine).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm md:text-base mb-1"
            style={{ color: '#00fff5' }}
          >
            {message}
          </motion.div>
        ))}

        {/* Current line with typewriter effect */}
        {currentLine < BOOT_MESSAGES.length && (
          <div className="text-sm md:text-base" style={{ color: '#00fff5' }}>
            {displayedText}
            <span className="animate-pulse">▋</span>
          </div>
        )}
      </div>

      {/* Skip instruction at bottom */}
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs md:text-sm mt-8"
          style={{ color: '#00fff5', opacity: 0.5 }}
        >
          Press any key or click to skip
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BootLoader
