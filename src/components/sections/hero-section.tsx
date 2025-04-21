"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import { QuantumLogo } from "@/components/ui/quantum-logo"

// Custom styles for shadow glow effect
const shadowGlowStyle = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 3px 0.5px rgba(255, 255, 255, 0.4); }
    50% { box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.6); }
  }
  .shadow-glow {
    animation: glow 2s ease-in-out infinite;
  }
`

// Founders data for the carousel
const founders = [
  {
    name: "Dr. Tarek Anous",
    title: "Theoretical Physicist",
    image: "/images/heroback.png", // Using the same image for now
  },
  {
    name: "Dr. Dionysios Anninos",
    title: "Quantum Field Theorist",
    image: "/images/heroback.png", // Using the same image for now
  },
  {
    name: "Dr. Damian Galante",
    title: "Cosmologist & String Theorist",
    image: "/images/heroback.png", // Using the same image for now
  },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const carouselRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, 20])
  const y2 = useTransform(scrollY, [0, 600], [0, 30])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 1.03])

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 50, damping: 20 })
  const springY2 = useSpring(y2, { stiffness: 50, damping: 20 })
  const springOpacity = useSpring(opacity, { stiffness: 50, damping: 20 })
  const springScale = useSpring(scale, { stiffness: 50, damping: 20 })

  // Floating particles
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
  }))

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === founders.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? founders.length - 1 : prev - 1))
  }

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
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
      {/* Custom styles */}
      <style jsx global>
        {shadowGlowStyle}
      </style>

      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        ></motion.div>

        {/* Gradient that responds to mouse movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-gray-900/50 via-transparent to-transparent"
          style={{
            opacity: 0.7,
            transform: `translate3d(${mousePosition.x * -5}px, ${mousePosition.y * -5}px, 0)`,
          }}
        ></motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              x: `calc(${particle.x}% + ${mousePosition.x * 5}px)`,
              y: `calc(${particle.y}% + ${mousePosition.y * 5}px)`,
              opacity: Math.random() * 0.15 + 0.05,
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "linear-gradient(to right, #ffffff, #cccccc)",
              boxShadow: "0 0 2px rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto my-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16 xl:space-x-24">
          {/* Text content */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left">
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
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 w-full"
              style={{ y: springY1 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#news-events-section"
                  className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-white text-black font-medium text-sm rounded-md overflow-hidden transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Explore our research
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </span>

                  {/* Button hover effect */}
                  <motion.span
                    className="absolute inset-0 bg-white/90"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 border border-white/30 text-white font-medium text-sm rounded-md overflow-hidden transition-all hover:bg-white/10 backdrop-blur-sm shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10">Get in touch</span>

                  {/* Button hover effect */}
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ y: "-100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Carousel Image Section - carefully adjusted for alignment */}
          <div className="w-full lg:w-6/12 flex justify-center mt-10 lg:mt-0 md:block">
            <motion.div
              ref={carouselRef}
              className="relative w-full max-w-lg mx-auto"
              style={{
                y: springY2,
                scale: springScale,
              }}
            >
              {/* Carousel container - adjusted padding and margins for alignment */}
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-white/20 backdrop-blur-sm group transition-all duration-300 hover:shadow-2xl hover:border-white/30">
                {/* Carousel slides */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <Image
                          src={founders[currentSlide].image || "/placeholder.svg"}
                          alt={`${founders[currentSlide].name}'s chalkboard`}
                          fill
                          className="object-cover transition-all duration-700"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                        />

                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 transition-opacity duration-300 group-hover:opacity-70"></div>
                      </div>

                      {/* Refined caption with better alignment */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-2 px-4 text-white">
                        <div className="flex items-center">
                          <div className="w-0.5 h-4 bg-white/30 mr-2 rounded-full"></div>
                          <span className="text-xs font-light tracking-wide">{founders[currentSlide].name}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Slide indicators - with much smaller size for mobile */}
              <div className="flex justify-center mt-3 mb-1">
                <div className="flex space-x-2 md:space-x-3">
                  {founders.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="group"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <div
                        className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? "bg-white scale-110 shadow-glow"
                            : "bg-white/40 group-hover:bg-white/70"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative elements - adjusted for better balance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                className="absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border border-white/20 rounded-full"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border border-white/20 rounded-full"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edge gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent opacity-50"></div>
    </section>
  )
}
