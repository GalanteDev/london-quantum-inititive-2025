"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll";
import type { Post } from "@/types";
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect";

const formatDateWithoutYear = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
};

const capitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface EventsNewsSectionProps {
  newsEvents: Post[];
}

export function HighlightedNewsEvents({ newsEvents }: EventsNewsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [20, 0]);
  const opacity = useTransform(scrollY, [0, 400], [0.9, 1]);
  const springY = useSpring(y, { stiffness: 70, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 70, damping: 30 });

  return (
    <section
      ref={ref}
      className="pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-20 lg:pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #111111, #1a1a1a)" }}
    >
      <ParallaxEffect
        speed={0.02}
        className="absolute inset-0 pointer-events-none"
      >
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
              Stay updated with our latest research breakthroughs, upcoming
              events, and initiatives
            </p>
          </div>

          <Link
            href="/events-news"
            className="group inline-flex items-center text-xs sm:text-sm font-medium text-white hover:text-white/80 mt-4 md:mt-0 transition-colors"
          >
            View all
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300" />
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsEvents?.slice(0, 6).map((item, index) => {
            const tag = Array.isArray(item.tag) ? item.tag[0] : item.tag;
            const tagClass =
              "bg-black/60 text-white border-transparent backdrop-blur-sm";

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
                  whileHover={{
                    y: -2,
                    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.07)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="h-full"
                >
                  <Link
                    href={`/events-news/${item.slug}`}
                    className="block h-full group bg-black/20 backdrop-blur-sm rounded-sm shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden border border-white/15 hover:border-white/30"
                    style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.03)" }}
                  >
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-black/30">
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
                        <Image
                          src={item.photo.url || "/placeholder.svg"}
                          alt={item.title || "News image"}
                          fill
                          className="object-cover transition-all duration-1000 group-hover:scale-105 filter group-hover:grayscale-0"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-200" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-black/40 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                        <Calendar className="h-3 w-3 mr-1.5 opacity-70" />
                        <span>{formatDateWithoutYear(item.date)}</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-light mb-2 group-hover:text-white transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-3 mb-4 flex-grow">
                        {item.description}
                      </p>
                      <div className="mt-auto inline-flex items-center text-sm font-light text-white/80 group-hover:text-white transition-colors duration-500">
                        Read more
                        <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeInOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
