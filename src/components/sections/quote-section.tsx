"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ParallaxEffect } from "../scroll-effects/ParallaxEffect"

export function QuoteSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-12 md:py-24 lg:py-32 bg-mono-950 text-white relative overflow-hidden">
      {/* Fondo con efecto de sepia */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center sepia"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop)`,
          }}
        ></div>
      </div>

      <ParallaxEffect speed={0.1} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
      </ParallaxEffect>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 text-white/30 text-5xl font-serif">"</div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light italic mb-4 sm:mb-6 md:mb-8 leading-relaxed px-2">
            Quantum mechanics describes nature as absurd from the point of view of common sense. And yet it fully agrees
            with experiment. So I hope you can accept nature as She is — absurd.
          </p>

          <div className="w-16 h-1 bg-white/20 mx-auto mb-6"></div>

          <footer className="text-white/70 font-medium text-sm sm:text-base">— Richard Feynman</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
