"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import { QuantumLogo } from "@/components/ui/quantum-logo"
import { ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"
import { getCollaborators } from "@/lib/contentful/fetch-posts"
import { Position, type Speaker } from "@/types"
import { ChevronRight } from "@/components/ui/notions-icons"
import { ArrowRight } from "lucide-react"
import "./about.css"

// Función para extraer el apellido de un nombre completo
const getLastName = (fullName: string): string => {
  const parts = fullName.trim().split(" ")
  return parts[parts.length - 1].toLowerCase()
}

// Función para ordenar por apellido
const sortByLastName = (a: Speaker, b: Speaker): number => {
  const lastNameA = getLastName(a.name || "")
  const lastNameB = getLastName(b.name || "")
  return lastNameA.localeCompare(lastNameB)
}

export default function AboutPage() {
  const [collaborators, setCollaborators] = useState<Speaker[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // References and scroll effects
  const heroRef = useRef(null)
  const visionRef = useRef(null)
  const statsRef = useRef(null)
  const piRef = useRef(null)
  const raRef = useRef(null)
  const pgRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const isPIInView = useInView(piRef, { once: true, amount: 0.1 })
  const isRAInView = useInView(raRef, { once: true, amount: 0.1 })
  const isPGInView = useInView(pgRef, { once: true, amount: 0.1 })

  // Parallax and scroll effects
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5])
  const springY1 = useSpring(y1, { stiffness: 50, damping: 20 })
  const springOpacity = useSpring(opacity, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCollaborators()
        // Adaptación a la nueva estructura de respuesta de la API
        if (data?.speakersCollection?.items) {
          setCollaborators(data.speakersCollection.items)
          console.log("Fetched collaborators:", data.speakersCollection.items)
        } else {
          console.error("Unexpected API response structure:", data)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetch()

    // Add mouse movement tracking for interactive effects
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = clientX / innerWidth - 0.5
      const y = clientY / innerHeight - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const filterByPosition = (pos: Position) =>
    collaborators.filter((c) => Array.isArray(c.position) && c.position.includes(pos)).sort(sortByLastName) // Ordenar por apellido

  const principalInvestigators = filterByPosition(Position.PrincipalInvestigator)
  const researchAssociates = filterByPosition(Position.ResearchAssociate)
  const postGraduateStudents = filterByPosition(Position.PostGraduateStudent)

  const teamCounts = {
    principalInvestigators: principalInvestigators.length,
    researchAssociates: researchAssociates.length,
    postGraduateStudents: postGraduateStudents.length,
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="page-section hero-section bg-black text-white relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></motion.div>
        </div>

        {/* Subtle background pattern with parallax effect */}
        <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </ParallaxEffect>

        {/* Gradient that responds to mouse movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-black/30 via-transparent to-transparent"
          style={{
            opacity: 0.7,
            transform: `translate3d(${mousePosition.x * -5}px, ${mousePosition.y * -5}px, 0)`,
          }}
        ></motion.div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <QuantumLogo size="large" isWhite={true} className="transform scale-110" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">About Us</h1>
              <div className="section-divider"></div>
              <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
                The London Quantum Universe Initiative brings together leading theoretical physicists to explore the
                fundamental nature of quantum reality and its implications for our understanding of the cosmos.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="absolute top-1/4 right-[15%] w-16 h-16 border border-white/10 rounded-full hidden md:block"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute bottom-1/4 left-[10%] w-20 h-20 border border-white/10 rounded-sm rotate-45 hidden md:block"
        ></motion.div>
      </section>

      {/* Separador de sección */}
      <div className="section-separator"></div>

      {/* Vision Section */}
      <section ref={visionRef} className="page-section bg-black text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <ParallaxEffect speed={0.03} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
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

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-4 md:space-y-8"
          >
            <h2 className="section-title">Our Vision</h2>
            <div className="section-divider"></div>

            <div className="vision-card">
              <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
                We envision a future where the principles of quantum physics are fully integrated into our understanding
                of the cosmos, from the smallest subatomic particles to the largest cosmological structures.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
                Our mission is to advance theoretical physics through innovative research, international collaboration,
                and educational outreach. We strive to bridge the gap between abstract theoretical concepts and their
                practical applications, fostering an environment where groundbreaking ideas can flourish.
              </p>
              <p className="text-white/80 text-lg leading-relaxed relative z-10">
                By bringing together diverse perspectives and expertise, we aim to accelerate discoveries that will
                transform our understanding of the quantum universe and inspire the next generation of theoretical
                physicists.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Separador de sección */}
      <div className="section-separator"></div>

      {/* Stats Counter Section */}
      <section ref={statsRef} className="page-section bg-black text-white relative overflow-hidden">
        <ParallaxEffect speed={0.02} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            ></div>
          </div>
        </ParallaxEffect>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <FadeInOnScroll threshold={0.2} direction="up" delay={0.1} duration={0.7}>
              <div className="stat-card">
                <div className="text-4xl md:text-5xl font-light text-white mb-2">
                  {teamCounts.principalInvestigators || 0}
                </div>
                <h3 className="text-xl font-light text-white/80">Principal Investigators</h3>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll threshold={0.2} direction="up" delay={0.2} duration={0.7}>
              <div className="stat-card">
                <div className="text-4xl md:text-5xl font-light text-white mb-2">
                  {teamCounts.researchAssociates || 0}
                </div>
                <h3 className="text-xl font-light text-white/80">Research Associates</h3>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll threshold={0.2} direction="up" delay={0.3} duration={0.7}>
              <div className="stat-card">
                <div className="text-4xl md:text-5xl font-light text-white mb-2">
                  {teamCounts.postGraduateStudents || 0}
                </div>
                <h3 className="text-xl font-light text-white/80">Post Graduate Students</h3>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Separador de sección */}
      <div className="section-separator"></div>

      {/* Principal Investigators Section - 3 cards */}
      <section ref={piRef} className="page-section bg-black text-white relative overflow-hidden">
        <ParallaxEffect speed={0.03} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
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

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPIInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-4 md:mb-10"
          >
            <h2 className="section-title">Principal Investigators</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Our principal investigators lead groundbreaking research in theoretical physics and quantum mechanics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {principalInvestigators.map((pi, index) => (
              <FadeInOnScroll
                key={pi.name}
                threshold={0.1}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.08 * (index % 3)}
                duration={0.8}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="h-full"
                >
                  <Link
                    href={`about/${pi.slug}`}
                    className="block h-full group"
                  >
                    <div className="team-card flex flex-col h-full relative">
                      {/* Logo de la universidad - Nuevo */}
                      {pi.universityLogo?.url && (
                        <div className="absolute top-2 right-2 z-20 w-12 h-12 bg-black/40 rounded-sm p-1 backdrop-blur-sm">
                          <Image
                            src={pi.universityLogo.url || "/placeholder.svg"}
                            alt={`${pi.institution} logo`}
                            width={40}
                            height={40}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}

                      {/* Imagen */}
                      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-black/30">
                        <div className="relative h-full w-full overflow-hidden">
                          {pi.photo?.url ? (
                            <Image
                              src={pi.photo.url || "/placeholder.svg"}
                              alt={pi.name || ""}
                              fill
                              className="object-cover transition-all duration-1000 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center"></div>
                          )}
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        {/* Nombre */}
                        <h3 className="text-base sm:text-lg font-light text-white mb-3 group-hover:text-white/90 transition-colors duration-500">
                          {pi.name}
                        </h3>

                        {/* Contenedor de información con espaciado natural */}
                        <div className="flex-grow space-y-1">
                          {/* Fellowship primero si existe */}
                          {pi.fellowship && <div className="text-gray-300 text-sm">{pi.fellowship}</div>}

                          {/* Universidad - Posición Universitaria */}
                          {pi.institution && (
                            <div className="text-white/80 text-sm">
                              {pi.institution}
                              {pi.universityPosition ? ` - ${pi.universityPosition}` : ""}
                            </div>
                          )}

                          {/* PhD, Lugar del PhD */}
                          {pi.phdInstitution && <div className="text-white/70 text-sm">PhD, {pi.phdInstitution}</div>}
                        </div>

                        {/* Botón siempre al final con margen consistente */}
                        <div className="mt-4 pt-2 border-t border-white/10">
                          <div className="inline-flex items-center text-xs sm:text-sm font-light text-white/80 group-hover:text-white transition-colors duration-500">
                            Read more
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Separador de sección */}
      <div className="section-separator"></div>

      {/* Research Associates Section - tarjetas más pequeñas */}
      <section ref={raRef} className="page-section bg-black text-white relative overflow-hidden">
        <ParallaxEffect speed={0.03} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
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

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isRAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-4 md:mb-10"
          >
            <h2 className="section-title">Research Associates</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Our research associates contribute to cutting-edge research in quantum physics and cosmology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {researchAssociates.map((ra, index) => (
              <FadeInOnScroll
                key={ra.name}
                threshold={0.1}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.08 * (index % 4)}
                duration={0.8}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="h-full"
                >
                  <Link
                    href={`about/${ra.slug}`}
                    className="block h-full group"
                  >
                    <div className="team-card flex flex-col h-full relative">
                      {/* Logo de la universidad - Nuevo */}
                      {ra.universityLogo?.url && (
                        <div className="absolute top-2 right-2 z-20 w-10 h-10 bg-black/40 rounded-sm p-1 backdrop-blur-sm">
                          <Image
                            src={ra.universityLogo.url || "/placeholder.svg"}
                            alt={`${ra.institution} logo`}
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}

                      {/* Imagen */}
                      <div className="relative h-36 overflow-hidden bg-black/30">
                        <div className="relative h-full w-full overflow-hidden">
                          {ra.photo?.url ? (
                            <Image
                              src={ra.photo.url || "/placeholder.svg"}
                              alt={ra.name || ""}
                              fill
                              className="object-cover transition-all duration-1000 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center"></div>
                          )}
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
                      </div>

                      <div className="p-3 flex flex-col flex-grow">
                        {/* Nombre */}
                        <h3 className="text-sm font-light text-white mb-2 group-hover:text-white/90 transition-colors duration-500">
                          {ra.name}
                        </h3>

                        {/* Contenedor de información con espaciado natural */}
                        <div className="flex-grow space-y-1">
                          {/* Institución */}
                          {ra.institution && <div className="text-white/80 text-xs">{ra.institution}</div>}

                          {/* PhD Institution */}
                          {ra.phdInstitution && <div className="text-white/70 text-xs">PhD: {ra.phdInstitution}</div>}

                          {/* PhD Supervisor */}
                          {ra.phdSupervisor && (
                            <div className="text-white/70 text-xs">Supervisor: {ra.phdSupervisor}</div>
                          )}

                          {/* Fellowship */}
                          {ra.fellowship && <div className="text-gray-300 text-xs">{ra.fellowship}</div>}
                        </div>

                        {/* Botón siempre al final con margen consistente */}
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="inline-flex items-center text-xs font-light text-white/80 group-hover:text-white transition-colors duration-500">
                            View profile
                            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Separador de sección */}
      <div className="section-separator"></div>

      {/* Post Graduate Students Section - mismo tamaño que Research Associates */}
      <section ref={pgRef} className="page-section bg-black text-white relative overflow-hidden">
        <ParallaxEffect speed={0.03} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
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

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPGInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-4 md:mb-10"
          >
            <h2 className="section-title">Post Graduate Students</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Our talented post graduate students represent the next generation of quantum physicists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {postGraduateStudents.map((pg, index) => (
              <FadeInOnScroll
                key={pg.name}
                threshold={0.1}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.08 * (index % 4)}
                duration={0.8}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="h-full"
                >
                  <Link
                    href={`about/${pg.slug}`}
                    className="block h-full group"
                  >
                    <div className="team-card flex flex-col h-full relative">
                      {/* Logo de la universidad - Nuevo */}
                      {pg.universityLogo?.url && (
                        <div className="absolute top-2 right-2 z-20 w-10 h-10 bg-black/40 rounded-sm p-1 backdrop-blur-sm">
                          <Image
                            src={pg.universityLogo.url || "/placeholder.svg"}
                            alt={`${pg.institution} logo`}
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}

                      {/* Imagen */}
                      <div className="relative h-36 overflow-hidden bg-black/30">
                        <div className="relative h-full w-full overflow-hidden">
                          {pg.photo?.url ? (
                            <Image
                              src={pg.photo.url || "/placeholder.svg"}
                              alt={pg.name || ""}
                              fill
                              className="object-cover transition-all duration-1000 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center"></div>
                          )}
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
                      </div>

                      <div className="p-3 flex flex-col flex-grow">
                        {/* Nombre */}
                        <h3 className="text-sm font-light text-white mb-2 group-hover:text-white/90 transition-colors duration-500">
                          {pg.name}
                        </h3>

                        {/* Contenedor de información con espaciado natural */}
                        <div className="flex-grow space-y-1">
                          {/* Current Institution */}
                          {pg.institution && <div className="text-white/80 text-xs">{pg.institution}</div>}

                          {/* PhD Supervisor */}
                          {pg.phdSupervisor && (
                            <div className="text-white/70 text-xs">Supervisor: {pg.phdSupervisor}</div>
                          )}
                        </div>

                        {/* Botón siempre al final con margen consistente */}
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="inline-flex items-center text-xs font-light text-white/80 group-hover:text-white transition-colors duration-500">
                            View profile
                            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Separador de sección */}
      <div className="section-separator"></div>

      {/* Contact CTA Section */}
      <section className="page-section bg-black border-t border-white/10 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              Join Our Research Community
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Whether you re a researcher, student, or simply curious about quantum physics, we welcome you to connect
              with us and explore the fascinating world of quantum universe research.
            </p>
            <Link href="/publications" className="cta-button group">
              <span className="relative z-10">Publications</span>
              <ChevronRight className="ml-2 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
