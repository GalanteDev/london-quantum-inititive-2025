"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  // Cambiado para que la imagen también se mueva hacia abajo
  const y2 = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

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
      className="relative min-h-screen flex items-center overflow-hidden bg-mono-100 pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      {/* Animated background grid pattern */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        ></motion.div>

        {/* Subtle animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-mono-200/50"
          style={{
            opacity: springOpacity,
            transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)`,
          }}
        ></motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-mono-900/5"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              x: `calc(${Math.random() * 100}% + ${mousePosition.x * 20}px)`,
              y: `calc(${Math.random() * 100}% + ${mousePosition.y * 20}px)`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 40 + 10 + "px",
              height: Math.random() * 40 + 10 + "px",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Logo, Title and Buttons */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            {/* Logo in square frame with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="self-center lg:self-start mb-6 sm:mb-8 relative"
              style={{ y: springY1 }}
            >
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 border border-mono-300 rounded-sm flex items-center justify-center bg-white shadow-sm relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 border-2 border-mono-900/10"></div>
                  <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-mono-900/20 to-transparent top-0 left-0"></div>
                  <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-mono-900/20 to-transparent bottom-0 left-0"></div>
                  <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-mono-900/20 to-transparent left-0 top-0"></div>
                  <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-mono-900/20 to-transparent right-0 top-0"></div>
                </motion.div>

                {/* Decorative element for logo */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 border border-mono-300 rounded-sm -z-10 bg-mono-50"
                  animate={{
                    x: mousePosition.x * -5,
                    y: mousePosition.y * -5,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                ></motion.div>

                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-contain bg-center bg-no-repeat relative z-10"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                  }}
                ></div>
              </motion.div>

              {/* Subtle glow effect */}
              <div className="absolute -inset-4 bg-mono-900/5 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000"></div>
            </motion.div>

            {/* Title with improved animation */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-10 sm:mb-12 w-full"
              style={{ y: springY1 }}
            >
              <h1 className="text-mono-900 leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-normal">
                <span className="block mb-1 whitespace-nowrap">London Quantum</span>
                <span className="block whitespace-nowrap">Universe Initiative</span>
              </h1>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isInView ? "100px" : 0, opacity: isInView ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="h-1 bg-mono-300 mt-4 hidden lg:block"
              ></motion.div>
            </motion.div>

            {/* Buttons with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5 w-full"
              style={{ y: springY1 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#research"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-mono-900 text-white font-medium text-sm sm:text-base md:text-lg rounded-sm overflow-hidden transition-all hover:bg-mono-800 shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Explore our research
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.span>
                  </span>

                  {/* Button hover effect */}
                  <motion.span
                    className="absolute inset-0 bg-mono-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-mono-300 text-mono-900 font-medium text-sm sm:text-base md:text-lg rounded-sm overflow-hidden transition-all hover:bg-mono-200 shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10">Get in touch</span>

                  {/* Button hover effect */}
                  <motion.span
                    className="absolute inset-0 bg-mono-200/80"
                    initial={{ y: "-100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Chalkboard image with enhanced effects */}
          <div className="mt-6 lg:mt-0 order-2 lg:order-2">
            <motion.div className="relative mx-auto lg:ml-auto lg:mr-0" style={{ y: springY2 }}>
              {/* Designer-style frame with animated reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -inset-4 z-0"
              >
                {/* Design grid lines with enhanced animation */}
                <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M 0,0 L 400,0 L 400,300 L 0,300 Z"
                    fill="none"
                    stroke="rgba(0,0,0,0.07)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 40,40 L 360,40 L 360,260 L 40,260 Z"
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                  />

                  {/* Additional decorative lines */}
                  <motion.path
                    d="M 20,20 L 380,20 L 380,280 L 20,280 Z"
                    fill="none"
                    stroke="rgba(0,0,0,0.05)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1.8, delay: 0.9, ease: "easeInOut" }}
                  />

                  {/* Measurement lines */}
                  <motion.line
                    x1="0"
                    y1="150"
                    x2="40"
                    y2="150"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                  <motion.line
                    x1="360"
                    y1="150"
                    x2="400"
                    y2="150"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  />
                </svg>
              </motion.div>

              {/* Main image container with enhanced frame */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: isLoaded ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                className="relative rounded-sm overflow-hidden shadow-md border border-mono-300 group"
                whileHover={{ scale: 1.02 }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                {/* Enhanced red border with gradient */}
                <motion.div
                  className="absolute inset-0 -m-4 sm:-m-6 p-2 sm:p-3 rounded-sm bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200"
                  style={{ zIndex: -1 }}
                  animate={{
                    boxShadow: isLoaded ? "0 0 20px rgba(239, 68, 68, 0.1)" : "none",
                  }}
                  transition={{ duration: 2, delay: 1.5 }}
                ></motion.div>

                {/* Decorative elements with enhanced animation */}
                <motion.div
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 border border-mono-300 rounded-sm -z-10 bg-mono-50"
                  style={{
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                ></motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border border-mono-300 rounded-sm -z-10 bg-mono-50"
                  style={{
                    transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                ></motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="absolute top-1/2 -right-3 w-6 h-6 sm:w-8 sm:h-8 border border-mono-300 rounded-sm -z-10 bg-mono-50"
                  style={{
                    transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 5}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                ></motion.div>

                {/* Image with enhanced reveal effect - removed grayscale */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    initial={{ filter: "blur(10px)" }}
                    animate={{ filter: isLoaded ? "blur(0px)" : "blur(10px)" }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20at%208.54.29%E2%80%AFAM-ZmpJqqviSmGxZvQAkmbkhNNdRxpdbh.png)`,
                    }}
                  ></motion.div>

                  {/* Enhanced measurement lines overlay */}
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2) 1px, transparent 1px), 
                                       linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  ></motion.div>

                  {/* Hover overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-mono-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>

              {/* Enhanced designer annotation elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 0.7 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute -bottom-4 -left-4 text-xs text-mono-500 font-mono hidden sm:block"
              >
                <div className="flex items-center">
                  <div className="w-8 h-px bg-mono-300 mr-1"></div>
                  <span>4:3</span>
                </div>
              </motion.div>

              {/* Additional measurement annotation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isLoaded ? 0.7 : 0, x: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="absolute -top-4 -right-4 text-xs text-mono-500 font-mono hidden sm:block"
              >
                <div className="flex items-center">
                  <span>1920×1440</span>
                  <div className="w-8 h-px bg-mono-300 ml-1"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
