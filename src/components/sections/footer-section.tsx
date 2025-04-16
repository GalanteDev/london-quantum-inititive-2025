"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import { motion } from "framer-motion"

export function FooterSection() {
  return (
    <footer className="bg-mono-950 text-white py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          <FadeInOnScroll className="md:col-span-2" threshold={0.1} direction="up" delay={0.1}>
            <Link href="/" className="inline-block mb-4 md:mb-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-[100px] h-[33px] md:w-[120px] md:h-[40px] bg-contain bg-center bg-no-repeat filter invert brightness-0 contrast-200"
                style={{
                  backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                }}
              ></motion.div>
            </Link>
            <p className="text-mono-400 mb-4 md:mb-6 max-w-md text-xs sm:text-sm">
              Advancing our understanding of the quantum universe through research, training, and teaching excellence.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#"
                  className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2 bg-mono-900/50 rounded-sm hover:bg-mono-800/70"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#"
                  className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2 bg-mono-900/50 rounded-sm hover:bg-mono-800/70"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#"
                  className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2 bg-mono-900/50 rounded-sm hover:bg-mono-800/70"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#"
                  className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2 bg-mono-900/50 rounded-sm hover:bg-mono-800/70"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </motion.div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll threshold={0.1} direction="up" delay={0.2}>
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Navigation</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link
                  href="/research"
                  className="text-mono-400 hover:text-white transition-colors text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/network"
                  className="text-mono-400 hover:text-white transition-colors text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  Network
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="text-mono-400 hover:text-white transition-colors text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="text-mono-400 hover:text-white transition-colors text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-mono-400 hover:text-white transition-colors text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-mono-400 hover:text-white transition-colors text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </FadeInOnScroll>

          <FadeInOnScroll threshold={0.1} direction="up" delay={0.3}>
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Contact</h3>
            <address className="not-italic text-mono-400 space-y-1.5 md:space-y-2 text-xs sm:text-sm">
              <p>London Quantum Universe Initiative</p>
              <p>123 Science Avenue</p>
              <p>London, UK</p>
              <p className="mt-4">
                <a href="mailto:info@lqui.org" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  info@lqui.org
                </a>
              </p>
              <p>
                <a href="tel:+442012345678" className="hover:text-white transition-colors group flex items-center">
                  <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1.5"></span>
                  +44 20 1234 5678
                </a>
              </p>
            </address>
          </FadeInOnScroll>
        </div>

        <div className="border-t border-mono-800 mt-8 md:mt-10 pt-4 md:pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-mono-500 text-xs">
            © {new Date().getFullYear()} London Quantum Universe Initiative. All rights reserved.
          </p>
          <div className="flex space-x-4 md:space-x-6 mt-3 sm:mt-0">
            <Link href="/privacy" className="text-mono-500 hover:text-white transition-colors text-xs">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-mono-500 hover:text-white transition-colors text-xs">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
