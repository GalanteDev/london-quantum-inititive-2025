"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-mono-100 pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="self-center lg:self-start mb-6 sm:mb-8"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 border border-mono-300 rounded-sm flex items-center justify-center bg-white shadow-sm relative">
                <div className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 border border-mono-300 rounded-sm -z-10 bg-mono-50"></div>

                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                  }}
                ></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-10 sm:mb-12 w-full"
            >
              <h1 className="text-mono-900 leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-normal">
                <span className="block mb-1">London Quantum</span>
                <span className="block">Universe Initiative</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5 w-full"
            >
              <Link
                href="#research"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-mono-900 text-white font-medium text-sm sm:text-base md:text-lg rounded-sm overflow-hidden transition-all hover:bg-mono-800 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore our research
                  <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="#contact"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-mono-300 text-mono-900 font-medium text-sm sm:text-base md:text-lg rounded-sm overflow-hidden transition-all hover:bg-mono-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <span className="relative z-10">Get in touch</span>
              </Link>
            </motion.div>
          </div>

          {/* Right column - Image with hover effect */}
          <div className="mt-6 lg:mt-0 order-2 lg:order-2">
            <div className="relative mx-auto lg:ml-auto lg:mr-0 group">
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{
                  clipPath: isLoaded ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                }}
                transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                className="relative rounded-sm overflow-hidden shadow-md border border-mono-300"
              >
                {/* Image wrapper */}
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                    style={{
                      backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20at%208.54.29%E2%80%AFAM-ZmpJqqviSmGxZvQAkmbkhNNdRxpdbh.png)`,
                    }}
                  ></motion.div>
                </div>

                {/* Decorative lines */}
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2) 1px, transparent 1px), 
                                   linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
