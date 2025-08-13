'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface InitializationScreenProps {
  onComplete: () => void
}

export default function InitializationScreen({ onComplete }: InitializationScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete })

    tl.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
    .to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.in',
      delay: 0.5
    })
  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div ref={textRef} className="text-white text-6xl md:text-8xl lg:text-9xl font-medium">
        Hi, I&apos;m <span className="text-purple-500">Prabesh</span>
      </div>
    </div>
  )
}

