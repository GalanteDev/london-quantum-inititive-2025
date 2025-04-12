"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeInOnScroll } from "../scroll-effects/FadeInOnScroll"
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect"


// Features array embebido directamente
const features = [
  {
    title: "Research",
    description:
      "We pursue cutting-edge research in quantum foundations, quantum gravity, and related areas, fostering collaboration across disciplines.",
    image: "/images/features/research.jpg",
    link: "/research",
  },
  {
    title: "Outreach",
    description:
      "We engage with the broader community through public talks, science communication, and educational initiatives in quantum science.",
    image: "/images/features/outreach.jpg",
    link: "/outreach",
  },
  {
    title: "Teaching",
    description:
      "We contribute to education by offering courses, mentoring students, and integrating quantum theory into broader academic programs.",
    image: "/images/features/teaching.jpg",
    link: "/teaching",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background pattern with parallax */}
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-mono-900 mb-3 md:mb-4">
            Research Areas
          </h2>
          <p className="text-mono-600 text-sm sm:text-base md:text-lg px-2">
            Exploring the fundamental questions of quantum physics and the universe
          </p>
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
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 shadow-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-mono-900/30 to-mono-900/70 opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>

                <div className="flex flex-col items-center">
                  <h3 className="text-xl sm:text-2xl font-light text-mono-900 mb-3 group-hover:text-mono-700 transition-colors">
                    {feature.title}
                  </h3>
                  <div className="w-8 h-1 bg-mono-300 rounded-full mb-4 transition-all duration-300 group-hover:w-12 group-hover:bg-mono-400"></div>
                  <p className="text-mono-600 text-sm sm:text-base mb-5 max-w-xs">{feature.description}</p>
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-sm font-medium text-mono-900 hover:text-mono-700 transition-colors"
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
