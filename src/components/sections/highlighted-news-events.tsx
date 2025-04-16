"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { Calendar, ArrowRight, ChevronRight } from "lucide-react"
import { getCategoryColor } from "@/lib/utils/tags"
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect"
import { FadeInOnScroll } from "../scroll-effects/FadeInOnScroll"
import type { Post } from "@/types"

// Helper function to format date without year
const formatDateWithoutYear = (dateString: string) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  // Format as "Month Day" (e.g., "April 15")
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}

interface EventsNewsSectionProps {
  newsEvents: Post[]
}

export function HighlightedNewsEvents({ newsEvents }: EventsNewsSectionProps) {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  // Scroll effects for title animation - similar to hero section
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 300], [20, 0])
  const titleOpacity = useTransform(scrollY, [0, 300], [0.8, 1])

  // Smooth spring animations
  const springTitleY = useSpring(titleY, { stiffness: 80, damping: 30 })
  const springTitleOpacity = useSpring(titleOpacity, { stiffness: 80, damping: 30 })

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-mono-100 to-mono-200 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mono-300 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mono-300 to-transparent opacity-70"></div>

      {/* Subtle background pattern with parallax effect */}
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
          {/* Title section with enhanced animation */}
          <motion.div
            ref={titleRef}
            className="relative"
            style={{
              opacity: springTitleOpacity,
              y: springTitleY,
            }}
          >
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-mono-400 hidden md:block"></div>

            {/* Title with reveal animation */}
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-mono-900 mb-3 md:mb-4"
            >
              News & Events
            </motion.h2>

            {/* Animated underline - similar to hero section */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={isTitleInView ? { width: "80px", opacity: 0.7 } : { width: 0, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-px bg-mono-400 mb-4 hidden md:block"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-mono-600 max-w-xl text-sm sm:text-base md:text-lg"
            >
              Stay updated with our latest research breakthroughs, upcoming events, and initiatives
            </motion.p>
          </motion.div>

          {/* Button changed to black */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href="/events-news"
              className="group inline-flex items-center justify-center px-5 py-2.5 mt-6 md:mt-0 
                        border border-mono-900 rounded-sm bg-mono-900 text-white font-medium 
                        hover:bg-mono-800 hover:border-mono-800 
                        transition-all duration-300 shadow-sm hover:shadow-md text-sm"
            >
              View all news
              <ChevronRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {newsEvents?.slice(0, 6).map((item, index) => (
            <FadeInOnScroll
              key={item.slug}
              threshold={0.15}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={0.1 * (index % 3)}
              duration={0.6}
              className="h-full"
            >
              <Link
                href={`/events-news/${item.slug}`}
                className="group flex flex-col h-full bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Image container with fixed aspect ratio */}
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                  {item.tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getCategoryColor(
                          item.tag[0],
                        )}`}
                      >
                        {Array.isArray(item.tag) ? item.tag[0] : item.tag}
                      </span>
                    </div>
                  )}

                  {item.photo?.url ? (
                    <img
                      src={item.photo.url || "/placeholder.svg"}
                      alt={item.title || "News image"}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-mono-300"
                      aria-label="No image available"
                    ></div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-mono-900/60 via-mono-900/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                  <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-mono-900/70 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Calendar className="h-3 w-3 mr-1.5 opacity-80" />
                    <span>{formatDateWithoutYear(item.date)}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow border-t border-mono-100">
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-medium text-mono-900 mb-3 group-hover:text-mono-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-mono-600 text-sm line-clamp-3 mb-4">{item.description}</p>
                  </div>
                  <div className="pt-3 border-t border-mono-100 mt-auto">
                    <div className="inline-flex items-center text-sm font-medium text-mono-900 group-hover:text-mono-600 transition-colors">
                      Read more
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
