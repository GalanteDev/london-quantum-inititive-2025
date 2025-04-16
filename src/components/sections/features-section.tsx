"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { features } from "@/data/index"
import { FadeInOnScroll, ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"

export function FeaturesSection() {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  // Scroll effects for title animation
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 300], [20, 0])
  const titleOpacity = useTransform(scrollY, [0, 300], [0.8, 1])

  // Smooth spring animations
  const springTitleY = useSpring(titleY, { stiffness: 80, damping: 30 })
  const springTitleOpacity = useSpring(titleOpacity, { stiffness: 80, damping: 30 })

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern with parallax effect - same as News & Events */}
      <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>
      </ParallaxEffect>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          style={{
            opacity: springTitleOpacity,
            y: springTitleY,
          }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 15, clipPath: "inset(0 0 100% 0)" }}
            animate={
              isTitleInView
                ? {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0 0 0% 0)",
                  }
                : {
                    opacity: 0,
                    y: 15,
                    clipPath: "inset(0 0 100% 0)",
                  }
            }
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-mono-900 mb-3 md:mb-4"
          >
            Research Areas
          </motion.h2>

          {/* Animated underline - similar to other sections */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isTitleInView ? { width: "80px", opacity: 0.7 } : { width: 0, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px bg-mono-400 mx-auto mb-4"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-mono-600 text-sm sm:text-base md:text-lg px-2"
          >
            Exploring the fundamental questions of quantum physics and the universe
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {features.map((feature, index) => (
            <FadeInOnScroll
              key={index}
              threshold={0.2}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={0.1 * (index % 3)}
              duration={0.6}
            >
              <div className="group h-full flex flex-col items-center text-center">
                {/* Imagen circular en escala de grises - estilo similar a News & Events */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 shadow-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  ></div>

                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-b from-mono-900/30 to-mono-900/70 opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>

                {/* Contenido */}
                <div className="flex flex-col items-center">
                  <h3 className="text-xl sm:text-2xl font-light text-mono-900 mb-3 group-hover:text-mono-700 transition-colors">
                    {feature.title}
                  </h3>

                  <div className="w-8 h-1 bg-mono-300 rounded-full mb-4 transition-all duration-300 group-hover:w-12 group-hover:bg-mono-400"></div>

                  <p className="text-mono-600 text-sm sm:text-base mb-5 max-w-xs">{feature.description}</p>

                  <Link
                    href={feature.link}
                    className="inline-flex items-center px-4 py-2 bg-mono-900 text-white text-sm font-medium rounded-sm hover:bg-mono-800 transition-colors shadow-sm hover:shadow-md"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
