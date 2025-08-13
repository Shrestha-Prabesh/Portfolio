'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface RippleTransitionProps {
  isActive: boolean
  isClosing: boolean
  isInitializing?: boolean
  onComplete?: () => void
  x: number
  y: number
}

export default function RippleTransition({ isActive, isInitializing = false, isClosing, x, y, onComplete }: RippleTransitionProps) {
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rippleRef.current) {
      const ripple = rippleRef.current
      
      if (isActive && !isClosing) {
        // Opening animation
        gsap.set(ripple, {
          x: x,
          y: y,
          scale: 0,
          opacity: 1
        })
        gsap.to(ripple, {
          scale: 1.5,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            onComplete?.()
          }
        })
      } else if (isClosing) {
        // Closing animation
        gsap.to(ripple, {
          scale: 0,
          opacity: 1,
          x: x,
          y: y,
          duration: 0.8,
          ease: "power2.in",
        })
      } else {
        // Reset
        gsap.to(ripple, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        })
      }
    }
  }, [isActive, isClosing, x, y, isInitializing])

  return (
    <div 
      ref={rippleRef}
      className={`fixed inset-0 pointer-events-none bg-white rounded-full transform origin-center
        ${isActive ? 'z-50' : '-z-10'}`}
      style={{ width: '300vmax', height: '300vmax', marginLeft: '-150vmax', marginTop: '-150vmax' }}
    />
  )
}

