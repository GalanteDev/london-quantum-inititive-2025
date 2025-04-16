"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  // Parallax scroll effect - reduced intensity
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, 60]) // Reduced movement
  const y2 = useTransform(scrollY, [0, 600], [0, 80]) // Reduced movement
  const opacity = useTransform(scrollY, [0, 400], [1, 0]) // Smoother fade
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]) // Reduced scale effect
  const blur = useTransform(scrollY, [0, 400], [0, 5]) // Reduced blur

  // Transition effect for the bottom of the hero section - smoother
  const bottomOpacity = useTransform(scrollY, [0, 300], [0, 1]) // Smoother fade in
  const bottomY = useTransform(scrollY, [0, 300], [30, 0]) // Reduced movement

  // Smoother spring animations with lower stiffness
  const springY1 = useSpring(y1, { stiffness: 80, damping: 30 }) // Lower stiffness
  const springY2 = useSpring(y2, { stiffness: 80, damping: 30 }) // Lower stiffness
  const springOpacity = useSpring(opacity, { stiffness: 80, damping: 30 }) // Lower stiffness
  const springScale = useSpring(scale, { stiffness: 80, damping: 30 }) // Lower stiffness
  const springBlur = useSpring(blur, { stiffness: 80, damping: 30 }) // Lower stiffness
  const springBottomOpacity = useSpring(bottomOpacity, { stiffness: 80, damping: 30 }) // Lower stiffness
  const springBottomY = useSpring(bottomY, { stiffness: 80, damping: 30 }) // Lower stiffness

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position as percentage of screen
      const x = clientX / innerWidth - 0.5
      const y = clientY / innerHeight - 0.5

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8 md:pt-20 md:pb-0"
      style={{
        background: "#000000", // Solid black background
      }}
    >
      {/* Animated background grid pattern - more subtle */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.03, scale: 1 }} // Reduced opacity
          transition={{ duration: 2, ease: "easeOut" }} // Slower animation
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        ></motion.div>

        {/* Subtle animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-gray-900/10 via-transparent to-transparent"
          style={{
            opacity: springOpacity,
            transform: `translate3d(${mousePosition.x * -10}px, ${mousePosition.y * -10}px, 0)`, // Reduced movement
          }}
        ></motion.div>
      </div>

      {/* Floating particles - fewer and more subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map(
          (
            _,
            i, // Reduced number of particles
          ) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.3 + 0.3, // Smaller particles
                opacity: 0,
              }}
              animate={{
                x: `calc(${Math.random() * 100}% + ${mousePosition.x * 10}px)`, // Reduced movement
                y: `calc(${Math.random() * 100}% + ${mousePosition.y * 10}px)`, // Reduced movement
                opacity: Math.random() * 0.15 + 0.05, // More subtle opacity
              }}
              transition={{
                duration: Math.random() * 15 + 15, // Slower movement
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
              style={{
                width: Math.random() * 3 + 1 + "px", // Smaller particles
                height: Math.random() * 3 + 1 + "px", // Smaller particles
                background: "linear-gradient(to right, #ffffff, #e5e5e5)",
                boxShadow: "0 0 3px rgba(255, 255, 255, 0.05)", // Reduced glow
              }}
            />
          ),
        )}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center w-full">
          {/* Text content - first on mobile and desktop left */}
          <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Logo in square frame with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
              transition={{ duration: 0.7, delay: 0.2 }} // Slower animation
              className="self-center lg:self-start mb-4 sm:mb-6 relative"
              style={{ y: springY1 }}
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-gray-800 rounded-sm flex items-center justify-center bg-black/20 shadow-sm relative overflow-hidden group backdrop-blur-sm"
                whileHover={{ scale: 1.03 }} // More subtle hover
                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smoother animation
              >
                {/* Animated border on hover - more subtle */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }} // Slower transition
                >
                  <div className="absolute inset-0 border border-gray-700/70"></div>
                  <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600/50 to-transparent top-0 left-0"></div>
                  <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600/50 to-transparent bottom-0 left-0"></div>
                  <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-gray-600/50 to-transparent left-0 top-0"></div>
                  <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-gray-600/50 to-transparent right-0 top-0"></div>
                </motion.div>

                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-contain bg-center bg-no-repeat relative z-10 invert brightness-200 contrast-200"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                  }}
                ></div>
              </motion.div>
            </motion.div>

            {/* Title with improved animation */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.9, delay: 0.3 }} // Slower animation
              className="mb-6 sm:mb-8 md:mb-10 w-full"
              style={{ y: springY1 }}
            >
              <h1 className="text-white leading-[1.2] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight font-normal">
                <span className="block mb-1">London Quantum</span>
                <span className="block">Universe Initiative</span>
              </h1>

              {/* Animated underline - more subtle */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isInView ? "80px" : 0, opacity: isInView ? 0.7 : 0 }} // Reduced width and opacity
                transition={{ delay: 1.2, duration: 1 }} // Slower animation
                className="h-px bg-gray-700/70 mt-4 mx-auto lg:mx-0" // Centered on mobile, left-aligned on desktop
              ></motion.div>
            </motion.div>

            {/* Buttons with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.9, delay: 0.5 }} // Slower animation
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 w-full"
              style={{ y: springY1 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }} // More subtle hover
                whileTap={{ scale: 0.99 }} // More subtle tap
                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smoother animation
                className="w-full sm:w-auto"
              >
                <Link
                  href="#news-events-section"
                  className="group relative inline-flex items-center justify-center px-4 sm:px-5 py-2 bg-white text-black font-medium text-xs sm:text-sm rounded-sm overflow-hidden transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Explore our research
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }} // More subtle movement
                      transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smoother animation
                    >
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> {/* Smaller icon on mobile */}
                    </motion.span>
                  </span>

                  {/* Button hover effect - more subtle */}
                  <motion.span
                    className="absolute inset-0 bg-gray-100/90" // More subtle color
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }} // Slower animation
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }} // More subtle hover
                whileTap={{ scale: 0.99 }} // More subtle tap
                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smoother animation
                className="w-full sm:w-auto"
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-4 sm:px-5 py-2 border border-gray-800/80 text-white font-medium text-xs sm:text-sm rounded-sm overflow-hidden transition-all hover:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10">Get in touch</span>

                  {/* Button hover effect - more subtle */}
                  <motion.span
                    className="absolute inset-0 bg-white/3" // More subtle color
                    initial={{ y: "-100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }} // Slower animation
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Image - second on mobile, right on desktop */}
          <div className="order-2 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <motion.div
              className="relative w-[75%] sm:w-[65%] md:w-[60%] lg:w-[85%]" // Responsive sizing
              style={{
                y: springY2,
                scale: springScale,
                filter: `blur(${springBlur}px)`,
              }}
            >
              {/* Main image container with enhanced frame */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: isLoaded ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }} // Slower animation
                className="relative rounded-sm overflow-hidden shadow-md border border-red-500/10 group backdrop-blur-sm" // More subtle border
                whileHover={{ scale: 1.01 }} // More subtle hover
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)`, // Reduced rotation
                  transition: "transform 0.3s ease-out", // Slower transition
                }}
              >
                {/* Image with enhanced reveal effect */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    initial={{ filter: "blur(10px)" }}
                    animate={{ filter: isLoaded ? "blur(0px)" : "blur(10px)" }}
                    transition={{ duration: 1.5, delay: 0.8 }} // Slower animation
                    className="absolute inset-0"
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20at%208.54.29%E2%80%AFAM-ZmpJqqviSmGxZvQAkmbkhNNdRxpdbh.png"
                      alt="Quantum equations on chalkboard"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>

                  {/* Overlay with gradient - more subtle */}
                  <motion.div
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 0.15 }} // Reduced opacity
                    transition={{ duration: 1.8, delay: 1 }} // Slower animation
                    className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/15" // More subtle gradient
                  ></motion.div>

                  {/* Hover overlay effect - more subtle */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-500/3 to-gray-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" // Slower transition
                    whileHover={{ opacity: 0.05 }} // Reduced opacity
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transition to next section - more subtle */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          opacity: springBottomOpacity,
          y: springBottomY,
        }}
      >
        {/* Línea sutil de separación en lugar de degradado */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200/10"></div>

        {/* Partículas sutiles que conectan con la siguiente sección */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: -5,
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
              }}
              animate={{
                y: 12,
                opacity: [0.15, 0.05, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: Math.random() * 3,
              }}
              style={{
                background: "rgba(200, 200, 200, 0.1)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
