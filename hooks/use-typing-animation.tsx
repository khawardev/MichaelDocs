"use client"

import { useState, useEffect } from "react"

export function useTypingAnimation(text: string, speed = 30) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Reset when text changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsComplete(false)
  }, [text])

  useEffect(() => {
    // Skip animation if speed is 0
    if (speed === 0) {
      setDisplayText(text)
      setIsComplete(true)
      return
    }

    // Type one character at a time
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length) {
      setIsComplete(true)
    }
  }, [currentIndex, speed, text, text.length, text[currentIndex]])

  return { displayText, isComplete }
}

