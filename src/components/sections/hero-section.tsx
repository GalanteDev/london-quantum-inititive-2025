"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import { QuantumLogo } from "@/components/ui/quantum-logo"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, 20])
  const y2 = useTransform(scrollY, [0, 600], [0, 30])

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 50, damping: 20 })
  const springY2 = useSpring(y2, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = clientX / innerWidth - 0.5
      const y = clientY / innerHeight - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8"
      style={{
        background: "linear-gradient(to bottom, #000000, #111111)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=2070&auto=format&fit=crop"
          alt="Type Ia supernova explosion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto my-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-16">
          {/* Text content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6 md:mb-10 w-full"
              style={{ y: springY1 }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 md:mb-6 flex justify-center lg:justify-start"
              >
                <QuantumLogo
                  size="medium"
                  customSize={{ height: 45, width: 135 }}
                  isWhite={true}
                  className="sm:transform sm:scale-110 lg:scale-100"
                />
              </motion.div>

              <h1 className="text-white leading-[1.2] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="font-sans font-light"
                >
                  <span className="inline-block whitespace-nowrap">London Quantum</span>
                  <br />
                  <span className="inline-block whitespace-nowrap">Universe Initiative</span>
                </motion.div>
              </h1>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isInView ? "80px" : 0, opacity: isInView ? 0.5 : 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                className="h-px bg-white/50 mt-4 md:mt-6 mx-auto lg:mx-0"
              ></motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full"
              style={{ y: springY1 }}
            >
              <Link
                href="#news-events-section"
                className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-white text-black font-medium text-sm rounded-md w-full sm:w-auto hover:bg-gray-100 transition-colors"
              >
                Explore our research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 border border-white/30 text-white font-medium text-sm rounded-md w-full sm:w-auto hover:bg-white/10 transition-colors"
              >
                Get in touch
              </Link>
            </motion.div>
          </div>

          {/* Single Static Image - No Caption */}
          <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
            <motion.div
              className="relative w-full max-w-lg mx-auto"
              style={{ y: springY2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="rounded-lg overflow-hidden border border-white/20">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/heroback.png"
                    alt="Quantum physics chalkboard"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 md:hidden">
        <span className="text-xs mb-2">Scroll down</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* Edge gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent opacity-50"></div>
    </section>
  )
}
