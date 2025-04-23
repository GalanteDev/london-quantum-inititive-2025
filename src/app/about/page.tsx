"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { QuantumLogo } from "@/components/ui/quantum-logo"
import { getCollaborators } from "@/lib/contentful/fetch-posts"
import { Position, type Speaker } from "@/types"
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

// Función para obtener la URL del supervisor
const getSupervisorUrl = (supervisor: string) => {
  const supervisorLower = supervisor.toLowerCase()
  if (supervisorLower === "galante") {
    return "/about/damian-galante"
  }
  if (supervisorLower === "anninos") {
    return "/about/dionysios-anninos"
  }
  if (supervisorLower === "anous") {
    return "/about/tarek-anous"
  }
  return "" // Retorna una URL vacía si no hay coincidencia
}

// Modificar el componente TeamStatsCounter para que la animación solo se ejecute una vez
const TeamStatsCounter = ({ counts }: { counts: { [key: string]: number } }) => {
  const [displayCounts, setDisplayCounts] = useState({
    principalInvestigators: 0,
    researchAssociates: 0,
    postGraduateStudents: 0,
  })
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const counterRef = useRef(null)
  const isInView = useInView(counterRef, { once: true, amount: 0.3 })

  useEffect(() => {
    // Solo ejecutar la animación si está en vista y no se ha completado antes
    if (isInView && !animationCompleted) {
      const duration = 2000 // duración de la animación en ms
      const steps = 50 // número de pasos para la animación
      const interval = duration / steps

      const incrementValues = {
        principalInvestigators: counts.principalInvestigators / steps,
        researchAssociates: counts.researchAssociates / steps,
        postGraduateStudents: counts.postGraduateStudents / steps,
      }

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++

        if (currentStep >= steps) {
          setDisplayCounts({
            principalInvestigators: counts.principalInvestigators,
            researchAssociates: counts.researchAssociates,
            postGraduateStudents: counts.postGraduateStudents,
          })
          setAnimationCompleted(true)
          clearInterval(timer)
        } else {
          setDisplayCounts({
            principalInvestigators: Math.round(incrementValues.principalInvestigators * currentStep),
            researchAssociates: Math.round(incrementValues.researchAssociates * currentStep),
            postGraduateStudents: Math.round(incrementValues.postGraduateStudents * currentStep),
          })
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView, counts, animationCompleted])

  return (
    <div
      ref={counterRef}
      className="stats-counter-container py-8 md:py-10 bg-black/30 backdrop-blur-sm border border-white/10 rounded-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="counter-item text-center px-4">
          <div className="counter-value text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2">
            {displayCounts.principalInvestigators}
          </div>
          <div className="counter-label text-sm md:text-base text-white/70 uppercase tracking-wider">
            Principal Investigators
          </div>
        </div>

        <div className="counter-item text-center px-4 md:border-x border-white/10">
          <div className="counter-value text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2">
            {displayCounts.researchAssociates}
          </div>
          <div className="counter-label text-sm md:text-base text-white/70 uppercase tracking-wider">
            Research Associates
          </div>
        </div>

        <div className="counter-item text-center px-4">
          <div className="counter-value text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2">
            {displayCounts.postGraduateStudents}
          </div>
          <div className="counter-label text-sm md:text-base text-white/70 uppercase tracking-wider">
            Post Graduate Students
          </div>
        </div>
      </div>
    </div>
  )
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

  // Modificación en la forma en que se manejan los supervisores de PhD
  const renderPhDSupervisor = (supervisor: string | string[]) => {
    if (Array.isArray(supervisor)) {
      return supervisor.map((name, index, arr) => {
        const isLastName = index === arr.length - 1
        const supervisorUrl = getSupervisorUrl(name)
        return (
          <span key={name}>
            <Link href={supervisorUrl} className="hover:underline">
              {name}
            </Link>
            {!isLastName && " - "}
          </span>
        )
      })
    }
    // Si supervisor es una cadena, se maneja como antes
    return supervisor.split(" ").map((name, index, arr) => {
      const isLastName = index === arr.length - 1
      const supervisorUrl = getSupervisorUrl(name)
      return (
        <span key={name}>
          <Link href={supervisorUrl} className="hover:underline">
            {name}
          </Link>
          {!isLastName && " - "}
        </span>
      )
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Hero Section */}
      <section ref={heroRef} className="page-section hero-section bg-black text-white relative overflow-hidden">
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

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
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
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                The London Quantum Universe Initiative brings together leading theoretical physicists to explore the
                fundamental nature of quantum reality and its implications for our understanding of the cosmos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modificar la sección Stats Counter para reducir la separación */}
      <section ref={statsRef} className="page-section bg-black text-white relative overflow-hidden py-4 md:py-6">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <TeamStatsCounter counts={teamCounts} />
          </motion.div>
        </div>
      </section>

      {/* Principal Investigators Section - reducir el espacio superior */}
      <section ref={piRef} className="page-section bg-black text-white relative overflow-hidden pt-6 md:pt-10">
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
              Our principal investigators lead groundbreaking research in theoretical physics and quantum mechanics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {principalInvestigators.map((pi, index) => (
              <motion.div
                key={pi.name}
                whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="h-full"
              >
                <Link href={`about/${pi.slug}`} className="block h-full group">
                  <div className="team-card flex flex-col h-full relative">
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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base sm:text-lg font-light text-white mb-3 group-hover:text-white/90 transition-colors duration-500">
                        {pi.name}
                      </h3>

                      <div className="flex-grow space-y-1">
                        {pi.fellowship && <div className="text-gray-300 text-sm">{pi.fellowship}</div>}
                        {pi.institution && (
                          <div className="text-white/80 text-sm">
                            {pi.institution}
                            {pi.universityPosition ? ` - ${pi.universityPosition}` : ""}
                          </div>
                        )}
                        {pi.phdInstitution && <div className="text-white/70 text-sm">PhD, {pi.phdInstitution}</div>}
                        {pi.phdSupervisor && (
                          <div className="text-white/70 text-sm">
                            Supervisor: {renderPhDSupervisor(pi.phdSupervisor)}
                          </div>
                        )}
                      </div>

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
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Research Associates */}
      <section ref={raRef} className="page-section bg-black text-white relative overflow-hidden">
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
              Our research associates contribute to cutting-edge research in quantum physics and cosmology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {researchAssociates.map((ra, index) => (
              <motion.div
                key={ra.name}
                whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="h-full"
              >
                <Link href={`about/${ra.slug}`} className="block h-full group">
                  <div className="team-card flex flex-col h-full relative">
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

                    <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden bg-black/30">
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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>

                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-sm font-light text-white mb-2 group-hover:text-white/90 transition-colors duration-500">
                        {ra.name}
                      </h3>

                      <div className="flex-grow space-y-1">
                        {ra.fellowship && <div className="text-gray-300 text-xs">{ra.fellowship}</div>}
                        {ra.institution && (
                          <div className="text-white/80 text-xs">
                            {ra.institution}
                            {ra.universityPosition ? ` - ${ra.universityPosition}` : ""}
                          </div>
                        )}
                        {ra.phdInstitution && <div className="text-white/70 text-xs">PhD, {ra.phdInstitution}</div>}
                      </div>

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
            ))}
          </div>
        </div>
      </section>

      {/* Sección para Post Graduate Students */}
      <section ref={pgRef} className="page-section bg-black text-white relative overflow-hidden">
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
              Our talented post graduate students represent the next generation of quantum physicists.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {postGraduateStudents.map((pg, index) => (
              <motion.div
                key={pg.name}
                whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="h-full"
              >
                <Link href={`about/${pg.slug}`} className="block h-full group">
                  <div className="team-card flex flex-col h-full relative">
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

                    <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden bg-black/30">
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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>

                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-sm font-light text-white mb-2 group-hover:text-white/90 transition-colors duration-500">
                        {pg.name}
                      </h3>

                      <div className="flex-grow space-y-1">
                        {pg.fellowship && <div className="text-gray-300 text-xs">{pg.fellowship}</div>}
                        {pg.institution && (
                          <div className="text-white/80 text-xs">
                            {pg.institution}
                            {pg.universityPosition ? ` - ${pg.universityPosition}` : ""}
                          </div>
                        )}
                        {pg.phdInstitution && <div className="text-white/70 text-xs">PhD, {pg.phdInstitution}</div>}
                        {pg.phdSupervisor && (
                          <div className="text-white/70 text-xs">
                            Supervisor: {renderPhDSupervisor(pg.phdSupervisor)}
                          </div>
                        )}
                      </div>

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
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
