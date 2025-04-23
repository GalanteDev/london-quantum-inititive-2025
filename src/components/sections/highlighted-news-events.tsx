"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import type { Post } from "@/types"
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect"

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
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
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
          {newsEvents?.slice(0, 6).map((item, index) => {
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
                <Link
                  href={`/events-news/${item.slug}`}
                  className="group h-full bg-black/20 text-white rounded-sm shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col border border-white/15 hover:border-white/40 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)" }}
                >
                  <div className="relative w-full pt-[56.25%] overflow-hidden bg-black/30">
                    {tag && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-black/60 text-white border border-transparent backdrop-blur-sm">
                          {capitalizeFirstLetter(tag)}
                        </span>
                      </div>
                    )}
                    {item.photo?.url ? (
                      <div className="absolute inset-0">
                        <Image
                          src={item.photo.url || "/placeholder.svg"}
                          alt={item.title || "News image"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-muted"></div>
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-black/70 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                      <Calendar className="h-3 w-3 mr-1.5 opacity-80" />
                      <span>{formatDateWithoutYear(item.date)}</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-light mb-2 group-hover:text-white transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-3 mb-4 flex-grow">{item.description}</p>
                    <div className="mt-auto inline-flex items-center text-sm font-light text-white/80 group-hover:text-white transition-colors duration-500">
                      Read more
                      <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </FadeInOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}