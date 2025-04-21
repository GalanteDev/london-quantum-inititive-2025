"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { Calendar, ArrowRight, ChevronRight } from "lucide-react"
import { getCategoryColor } from "@/lib/utils/tags"
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect"
import { FadeInOnScroll } from "../scroll-effects/FadeInOnScroll"
import type { Post } from "@/types"

const formatDateWithoutYear = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}

const capitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface EventsNewsSectionProps {
  newsEvents: Post[]
}

export function HighlightedNewsEvents({ newsEvents }: EventsNewsSectionProps) {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 400], [20, 0])
  const titleOpacity = useTransform(scrollY, [0, 400], [0.9, 1])
  const springTitleY = useSpring(titleY, { stiffness: 70, damping: 30 })
  const springTitleOpacity = useSpring(titleOpacity, { stiffness: 70, damping: 30 })

  return (
    <section
      ref={ref}
      className="py-12 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "#fafafa" }}
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

      {/* Subtle grid background */}
      <ParallaxEffect speed={0.02} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-2">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>
      </ParallaxEffect>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <motion.div
            ref={titleRef}
            className="relative"
            style={{ opacity: springTitleOpacity, y: springTitleY }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" }}
              animate={
                isTitleInView
                  ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
                  : { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: 0.9 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-2 md:mb-3"
            >
              News & Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-600 max-w-xl text-sm sm:text-base"
            >
              Stay updated with our latest research breakthroughs, upcoming events, and initiatives
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href="/events-news"
              className="group inline-flex items-center text-xs sm:text-sm font-medium text-gray-900 hover:text-gray-600 mt-4 md:mt-0 transition-colors"
            >
              View all
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {newsEvents?.slice(0, 6).map((item, index) => {
            const tag = Array.isArray(item.tag) ? item.tag[0] : item.tag
            const tagClass = getCategoryColor(tag)

            return (
              <FadeInOnScroll
                key={item.slug}
                threshold={0.1}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.08 * (index % 3)}
                duration={0.8}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="h-full"
                >
                  <Link
                    href={`/events-news/${item.slug}`}
                    className="block h-full group bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    <div className="relative pt-[56.25%] overflow-hidden bg-gray-100">
                      {tag && (
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${tagClass}`}
                          >
                            {capitalizeFirstLetter(tag)}
                          </span>
                        </div>
                      )}

                      {item.photo?.url ? (
                        <img
                          src={item.photo.url}
                          alt={item.title || "News image"}
                          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-103 filter grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-200" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/25 to-transparent opacity-50 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-black/15 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                        <Calendar className="h-3 w-3 mr-1.5 opacity-70" />
                        <span>{formatDateWithoutYear(item.date)}</span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow border-t border-gray-100">
                      <div className="flex-grow">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors duration-500 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-3">
                          {item.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-500">
                        Read more
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeInOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
