"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxEffectProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function FadeInOnScroll({
  children,
  className = "",
  threshold = 0.1,
  direction = "up", // up, down, left, right
  delay = 0,
  duration = 0.5,
  once = true,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  // Configurar las transformaciones iniciales según la dirección
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(20px)"
      case "down":
        return "translateY(-20px)"
      case "left":
        return "translateX(20px)"
      case "right":
        return "translateX(-20px)"
      default:
        return "translateY(20px)"
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  )
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
