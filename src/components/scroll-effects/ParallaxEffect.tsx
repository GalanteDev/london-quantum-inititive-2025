"use client"

import { useEffect, useRef } from "react"

interface ParallaxEffectProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxEffect({ children, speed = 0.2, className = "" }: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const offset = window.scrollY
      ref.current.style.transform = `translateY(${offset * speed}px)`
    }

    handleScroll() // initial position
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`will-change-transform transition-transform duration-100 ease-out ${className}`}>
      {children}
    </div>
  )
}
