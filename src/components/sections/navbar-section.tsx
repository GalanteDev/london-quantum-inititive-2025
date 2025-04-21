"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { name: "Research", href: "/research" },
  { name: "Training", href: "/training" },
  { name: "Outreach", href: "/outreach" },
  { name: "About", href: "/about" }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("")
  const headerRef = useRef(null)

  // Scroll animation - valores ajustados para un navbar más delgado
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98])
  const headerHeight = useTransform(scrollY, [0, 100], ["4rem", "3.5rem"]) // Reducido de 5rem/4.5rem
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"])

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
        ref={headerRef}
        style={{
          height: headerHeight,
          opacity: headerOpacity,
          backgroundColor: headerBg,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm border-b border-white/10`}
      >
        <div className="container mx-auto h-full flex items-center justify-between">
          {/* Logo - permanece a la izquierda */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-[80px] h-[26px] sm:w-[90px] sm:h-[30px] bg-contain bg-left bg-no-repeat transition-all duration-300 invert brightness-200 contrast-200"
              style={{
                backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
              }}
            ></motion.div>
          </Link>

          {/* Contenedor para navegación y botón de contacto - alineados a la derecha */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="flex items-center h-full">
              <ul className="flex space-x-1 lg:space-x-1 h-full">
                {navLinks.map((link) => (
                  <li key={link.name} className="h-full flex items-center">
                    <Link
                      href={link.href}
                      className="relative px-2.5 py-1.5 text-sm font-medium transition-all duration-300 h-full flex items-center text-white hover:text-white/70"
                      onMouseEnter={() => setActiveLink(link.name)}
                      onMouseLeave={() => setActiveLink("")}
                    >
                      {/* Texto con efecto hover simple de opacidad */}
                      <span className="relative z-10">{link.name}</span>

                      {/* Nuevo efecto hover - brillo sutil */}
                      <motion.span
                        className="absolute inset-0 bg-white/0"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: activeLink === link.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          boxShadow: activeLink === link.name ? "0 0 15px 1px rgba(255, 255, 255, 0.1)" : "none",
                        }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Button - más compacto */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-3.5 py-1.5 text-sm font-medium text-black bg-white rounded-md hover:bg-white/90 transition-colors"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button - más pequeño */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="md:hidden p-1.5 rounded-md transition-all duration-300 text-white hover:bg-white/10"
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" />
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
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="container mx-auto py-3 flex justify-between items-center">
              <Link href="/" className="relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-[80px] h-[26px] sm:w-[90px] sm:h-[30px] bg-contain bg-left bg-no-repeat invert brightness-200 contrast-200"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png)`,
                  }}
                ></motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="text-white p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4.5 w-4.5" />
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col justify-center container mx-auto">
              <nav className="space-y-5">
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
                      className="text-white text-2xl sm:text-3xl font-light hover:text-white/80 transition-colors py-2.5 border-b border-white/5 group flex items-center justify-between"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <span className="w-0 h-px bg-white/30 transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
                        {link.name}
                      </div>
                      <ChevronDown className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity rotate-[-90deg]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Contact Button in Mobile Menu */}
            <div className="container mx-auto py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-full"
              >
                <Link
                  href="#contact"
                  className="block w-full text-center py-2.5 px-4 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            <div className="container mx-auto py-4 border-t border-white/5">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
