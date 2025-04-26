"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import { QuantumLogo } from "@/components/ui/quantum-logo"
// Importaciones de Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
// Estilos de Swiper
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Founders data for the carousel
const founders = [
  {
    name: "Dr. Tarek Anous",
    title: "Theoretical Physicist",
    image: "/images/chalkboard.jpeg",
  },
  {
    name: "Dr. Dionysios Anninos",
    title: "Theoretical Physicist",
    image: "/images/pizarron3.png",
  },
  {
    name: "Dr. Damian Galante",
    title: "Theoretical Physicist",
    image: "/images/heroback.png",
  },
]

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const carouselRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, 20])
  const y2 = useTransform(scrollY, [0, 600], [0, 30])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 1.03])

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 50, damping: 20 })
  const springY2 = useSpring(y2, { stiffness: 50, damping: 20 })
  const springOpacity = useSpring(opacity, { stiffness: 50, damping: 20 })
  const springScale = useSpring(scale, { stiffness: 50, damping: 20 })

  // Floating particles
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
  }))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = clientX / innerWidth - 0.5
      const y = clientY / innerHeight - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-8"
      style={{
        background: "linear-gradient(to bottom, #000000, #111111)",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        ></motion.div>

        {/* Gradient that responds to mouse movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-gray-900/40 via-transparent to-transparent"
          style={{
            opacity: 0.6,
            transform: `translate3d(${mousePosition.x * -5}px, ${mousePosition.y * -5}px, 0)`,
          }}
        ></motion.div>
      </div>

      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-40 sm:opacity-50 xs:opacity-60">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=2070&auto=format&fit=crop"
            alt="Type Ia supernova explosion"
            fill
            className="object-cover md:object-cover object-[25%_center] scale-110 md:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 md:from-black/80 md:via-black/50 md:to-black/80"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              x: `calc(${particle.x}% + ${mousePosition.x * 5}px)`,
              y: `calc(${particle.y}% + ${mousePosition.y * 5}px)`,
              opacity: Math.random() * 0.15 + 0.05,
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "linear-gradient(to right, #ffffff, #cccccc)",
              boxShadow: "0 0 2px rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container relative z-10 w-full mx-auto my-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between xl:gap-16">
          {/* Text content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6 md:mb-10 w-full"
              style={{ y: springY1 }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4 md:mb-6 flex justify-center lg:justify-start"
              >
                <QuantumLogo
                  size="medium"
                  customSize={{ height: 45, width: 135 }}
                  isWhite={true}
                  className="sm:transform sm:scale-110 lg:scale-100"
                />
              </motion.div>

              <h1 className="text-white leading-[1.2] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="font-sans font-light"
                >
                  <span className="inline-block whitespace-nowrap">London Quantum</span>
                  <br />
                  <span className="inline-block whitespace-nowrap">Universe Initiative</span>
                </motion.div>
              </h1>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isInView ? "80px" : 0, opacity: isInView ? 0.5 : 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                className="h-px bg-white/50 mt-4 md:mt-6 mx-auto lg:mx-0"
              ></motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full"
              style={{ y: springY1 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#news-events-section"
                  className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-white text-black font-medium text-sm rounded-md overflow-hidden transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Explore our research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 border border-white/30 text-white font-medium text-sm rounded-md overflow-hidden transition-all hover:bg-white/10 backdrop-blur-sm shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <span className="relative z-10">Get in touch</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Carousel Image Section with Swiper */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 md:block">
            <motion.div
              ref={carouselRef}
              className="relative w-full max-w-xl mx-auto lg:mx-0"
              style={{
                y: springY2,
                scale: springScale,
              }}
            >
              {/* Swiper Carousel */}
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-white/20 backdrop-blur-sm group transition-all duration-300 hover:shadow-2xl hover:border-white/30 w-full">
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade]}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true, // Habilitar crossfade para una transición más suave
                  }}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  speed={1000} // Aumentar la duración de la transición
                  pagination={{
                    clickable: true,
                    bulletClass:
                      "inline-block w-3 h-3 mx-2 rounded-full cursor-pointer transition-all duration-300 bg-white/30 hover:bg-white/70",
                    bulletActiveClass: "!bg-white scale-110",
                  }}
                  className="aspect-[4/3]"
                  onSlideChangeTransitionStart={(swiper) => {
                    // Añadir clase para efecto de transición al iniciar el cambio
                    const currentSlide = swiper.slides[swiper.activeIndex] as HTMLElement
                    if (currentSlide) {
                      currentSlide.classList.add("slide-transitioning")
                    }
                  }}
                  onSlideChangeTransitionEnd={(swiper) => {
                    // Remover clase al finalizar la transición
                    swiper.slides.forEach((slide: HTMLElement) => {
                      slide.classList.remove("slide-transitioning")
                    })
                  }}
                >
                  {founders.map((founder, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full transition-transform duration-1000">
                        <div className="absolute inset-0 transition-all duration-1000 group-hover:scale-105">
                          <Image
                            src={founder.image || "/placeholder.svg"}
                            alt={`${founder.name}'s chalkboard`}
                            fill
                            className="object-cover transition-all duration-1000 slide-image"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                          />

                          {/* Overlay with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 transition-opacity duration-300 group-hover:opacity-70"></div>
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 px-4 text-white transition-transform duration-500">
                          <div className="flex flex-col">
                            <span className="text-base font-medium tracking-wide">{founder.name}</span>
                            <span className="text-sm text-white/70">{founder.title}</span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Custom pagination outside the carousel */}
              {/* Eliminar esta línea */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 md:hidden"
      >
        <span className="text-xs mb-2">Scroll down</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>

      {/* Edge gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent opacity-50"></div>
    </section>
  )
}
