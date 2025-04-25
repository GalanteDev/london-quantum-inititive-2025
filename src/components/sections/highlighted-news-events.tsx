"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import type { Post } from "@/types"
import { ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"
import { Card } from "@/components/ui/CardLQUI"
import { ArrowRight } from "lucide-react"

const formatDateWithoutYear = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}

const capitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface HighlightedNewsEventsProps {
  newsEvents: Post[]
}

export function HighlightedNewsEvents({ newsEvents }: HighlightedNewsEventsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [20, 0])
  const opacity = useTransform(scrollY, [0, 400], [0.9, 1])
  const springY = useSpring(y, { stiffness: 70, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 70, damping: 30 })

  return (
    <section
      ref={ref}
      className="pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-20 lg:pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #111111, #1a1a1a)" }}
    >
      <ParallaxEffect speed={0.02} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), ` +
                `linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
      </ParallaxEffect>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12"
          style={{ opacity: springOpacity, y: springY }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-2 md:mb-3">
              News & Events
            </h2>
            <div className="w-16 h-px bg-white/30 mb-4 hidden md:block" />
            <p className="text-white/70 max-w-xl text-sm sm:text-base">
              Stay updated with our latest research breakthroughs, upcoming events, and initiatives
            </p>
          </div>

          <Link
            href="/events-news"
            className="group inline-flex items-center text-xs sm:text-sm font-medium text-white hover:text-white/80 mt-4 md:mt-0 transition-colors"
          >
            View all
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsEvents.slice(0, 6).map((item, index) => {
            const tag = Array.isArray(item.tag) ? item.tag[0] : item.tag
            return (
              <FadeInOnScroll
                key={item.slug}
                threshold={0.1}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.08 * (index % 3)}
                duration={0.8}
                className="h-full"
              >
                <Card
                  title={item.title}
                  description={item.description}
                  imageUrl={item.photo?.url}
                  date={item.date}
                  tag={tag ? capitalizeFirstLetter(tag) : undefined}
                  href={`/events-news/${item.slug}`}
                  aspectRatio="16/9"
                  variant="highlighted"
                />
              </FadeInOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
