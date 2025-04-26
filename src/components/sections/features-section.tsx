"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect"
import { Feature } from "@/types"


const features: Feature[] = [
  {
    title: "Quantum Research",
    description: "Pushing the boundaries of quantum physics with cutting-edge research and experiments.",
    image: "/images/r.png",
    link: "/research",
  },
  {
    title: "Collaborative Network",
    description: "Connecting brilliant minds from around the globe to solve the universe's greatest mysteries.",
    image: "/images/t.png",
    link: "/network",
  },
  {
    title: "Educational Outreach",
    description: "Inspiring the next generation of quantum physicists through innovative educational programs.",
    image: "/images/o.png",
    link: "/education",
  },
]


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
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#111111] to-[#1a1a1a] text-white relative overflow-hidden "
    >
      {/* Subtle background pattern with parallax effect */}
      <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>
      </ParallaxEffect>

      {/* Using the global container class */}
      <div className="container relative z-10 px-4 sm:px-6 md:px-8">
        <motion.div
          ref={titleRef}
          style={{
            opacity: springTitleOpacity,
            y: springTitleY,
          }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3 md:mb-4"
          >
            Research Areas
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isTitleInView ? { width: "80px", opacity: 0.7 } : { width: 0, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px bg-white/40 mx-auto mb-4"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/70 text-sm sm:text-base md:text-lg px-2"
          >
            Exploring the fundamental questions of quantum physics and the universe
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {features.map((feature, index) => (
            <FadeInOnScroll
              key={index}
              threshold={0.2}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={0.1 * (index % 3)}
              duration={0.6}
            >
              <div className="group h-full flex flex-col items-center text-center">
                {/* Circular grayscale image */}
                <div className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-6 shadow-lg border border-gray-600
                -">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  ></div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center flex-grow">
                  <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-light text-white mb-3 group-hover:text-white/90 transition-colors">
                    {feature.title}
                  </h3>

                  <div className="w-8 h-1 bg-white/10 rounded-full mb-4 transition-all duration-300 group-hover:w-12 group-hover:bg-white/40"></div>

                  <p className="text-white/70 text-sm sm:text-sm md:text-base mb-5 max-w-xs">{feature.description}</p>

                  <div className="mt-auto pt-2">
                    <Link
                      href={feature.link}
                      className="inline-flex items-center px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-sm hover:bg-white/20 transition-colors shadow-sm hover:shadow-md border border-white/10 hover:border-white/20"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
