"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Research", href: "/research" },
  { name: "Training", href: "/training" },
  { name: "Outreach", href: "/outreach" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 ${
          scrolled ? "bg-white shadow-lg" : "bg-mono-900"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div
              className={`w-[100px] h-[33px] bg-contain bg-left bg-no-repeat transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "" : "invert brightness-200 contrast-200"
              }`}
              style={{
                backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
              }}
            ></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-colors duration-300
                      ${scrolled ? "text-mono-800 hover:text-mono-950" : "text-white/90 hover:text-white"}
                      after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 
                      after:bg-current after:transition-all after:duration-300 hover:after:w-1/2
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={`md:hidden p-2 rounded-sm transition-all duration-300 ${
              scrolled ? "text-mono-900 bg-mono-100 hover:bg-mono-200" : "text-white bg-white/10 hover:bg-white/20"
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-mono-900 z-50 flex flex-col"
          >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="relative">
                <div
                  className="w-[100px] h-[33px] bg-contain bg-left bg-no-repeat invert brightness-200 contrast-200"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                  }}
                ></div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white p-2 rounded-sm bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-4">
              <nav className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.1 * index, duration: 0.3 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-white text-2xl sm:text-3xl font-light block hover:text-white/80 transition-colors py-3 border-b border-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="container mx-auto px-4 py-6 border-t border-white/10"
            >
              <div className="flex items-center text-xs text-white/60">
                <span>© {new Date().getFullYear()} London Quantum Universe Initiative</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
