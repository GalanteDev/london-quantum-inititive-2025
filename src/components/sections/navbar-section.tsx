"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Research", href: "/research" },
  { name: "Training", href: "/training" },
  { name: "Outreach", href: "/outreach" },
  { name: "Publications", href: "/publications" },
  { name: "About", href: "/about" },
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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-2 ${
          scrolled ? "bg-white shadow-sm" : "bg-black"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`w-[90px] h-[30px] sm:w-[100px] sm:h-[33px] bg-contain bg-left bg-no-repeat transition-all duration-300 ${
                scrolled ? "" : "invert brightness-200 contrast-200"
              }`}
              style={{
                backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
              }}
            ></motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-colors duration-300 group
                      ${scrolled ? "text-mono-800 hover:text-mono-950" : "text-white/90 hover:text-white"}
                    `}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-300 group-hover:w-1/2 ${
                        scrolled ? "bg-mono-900" : "bg-white"
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={`md:hidden p-1.5 rounded-sm transition-all duration-300 ${
              scrolled ? "text-mono-900 bg-mono-100 hover:bg-mono-200" : "text-white bg-white/10 hover:bg-white/20"
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-mono-950 z-50 flex flex-col"
          >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-[90px] h-[30px] sm:w-[100px] sm:h-[33px] bg-contain bg-left bg-no-repeat invert brightness-200 contrast-200"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                  }}
                ></motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="text-white p-1.5 rounded-sm bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </motion.button>
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
                      className="text-white text-2xl sm:text-3xl font-light block hover:text-white/80 transition-colors py-3 border-b border-white/10 group flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-0 h-px bg-white transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
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
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">
                  © {new Date().getFullYear()} London Quantum Universe Initiative
                </span>
                <div className="flex space-x-4">
                  <Link href="/privacy" className="text-white/60 hover:text-white text-xs transition-colors">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-white/60 hover:text-white text-xs transition-colors">
                    Terms
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
