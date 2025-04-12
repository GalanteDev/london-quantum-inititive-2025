"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/format-date";
import { getCategoryColor } from "@/lib/utils/tags";
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect";
import { FadeInOnScroll } from "../scroll-effects/FadeInOnScroll";
import { Post } from "@/types";

interface EventsNewsSectionProps {
  newsEvents: Post[]; // Recibimos un array de Posts desde Contentful
}

export function HighlightedNewsEvents({ newsEvents }: EventsNewsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="py-12 md:py-24 lg:py-32 bg-mono-200 relative overflow-hidden"
    >
      {/* Subtle background pattern with parallax effect */}
      <ParallaxEffect
        speed={0.05}
        className="absolute inset-0 pointer-events-none"
      >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-mono-900 mb-2 md:mb-4">
              News & Events
            </h2>
            <p className="text-mono-600 max-w-xl text-sm sm:text-base">
              Stay updated with our latest research breakthroughs, upcoming
              events, and initiatives
            </p>
          </div>
          <Link
            href="/events-news" // Asegúrate de que esta ruta sea correcta
            className="group inline-flex items-center text-xs sm:text-sm font-medium text-mono-900 hover:text-mono-600 mt-4 md:mt-0 transition-colors"
          >
            View all
            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {newsEvents?.slice(0, 6).map((item, index) => (
            <FadeInOnScroll
              key={item.slug} // Usamos el slug como key, ya que es único
              threshold={0.15}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={0.1 * (index % 3)}
              duration={0.6}
              className="h-full"
            >
              <Link
                href={`/events-news/${item.slug}`} // Link dinámico al slug del post
                className="block h-full group bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-mono-200">
                  {item.tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                          item.tag[0]
                        )}`}
                      >
                        {Array.isArray(item.tag) ? item.tag[0] : item.tag}
                      </span>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.photo?.url})` }}
                  ></div>

                  <div className="absolute inset-0 bg-gradient-to-t from-mono-900/40 via-mono-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                  <div className="absolute bottom-3 left-3 flex items-center text-white text-xs">
                    <Calendar className="h-3 w-3 mr-1.5 opacity-80" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-mono-900 mb-2 sm:mb-3 group-hover:text-mono-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-mono-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    {" "}
                    {/* Empuja el "Read more" hacia abajo */}
                    <div className="inline-flex items-center text-xs sm:text-sm font-medium text-mono-900 group-hover:text-mono-600 transition-colors">
                      Read more
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
