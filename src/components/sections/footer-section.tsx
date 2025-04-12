"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { FadeInOnScroll } from "../scroll-effects/FadeInOnScroll"

export function FooterSection() {
  return (
    <footer className="bg-mono-950 text-white py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          <FadeInOnScroll className="md:col-span-2" threshold={0.1} direction="up" delay={0.1}>
            <Link href="/" className="inline-block mb-4 md:mb-6">
              <div
                className="w-[100px] h-[33px] md:w-[120px] md:h-[40px] bg-contain bg-center bg-no-repeat filter invert brightness-0 contrast-200"
                style={{
                  backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                }}
              ></div>
            </Link>
            <p className="text-mono-400 mb-4 md:mb-6 max-w-md text-xs sm:text-sm">
              Advancing our understanding of the quantum universe through research, training, and teaching excellence.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <Link
                href="#"
                className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="#"
                className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="#"
                className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="#"
                className="text-mono-400 hover:text-white transition-colors p-1.5 md:p-2"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll threshold={0.1} direction="up" delay={0.2}>
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Navigation</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/research" className="text-mono-400 hover:text-white transition-colors text-sm">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-mono-400 hover:text-white transition-colors text-sm">
                  Network
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-mono-400 hover:text-white transition-colors text-sm">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-mono-400 hover:text-white transition-colors text-sm">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-mono-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-mono-400 hover:text-white transition-colors text-sm">
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
                <a href="mailto:info@lqui.org" className="hover:text-white transition-colors">
                  info@lqui.org
                </a>
              </p>
              <p>
                <a href="tel:+442012345678" className="hover:text-white transition-colors">
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
