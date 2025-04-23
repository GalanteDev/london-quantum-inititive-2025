"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import { ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"
import { formatDate } from "@/utils/format-date"
import { getEventsPosts, getPapersPosts } from "@/lib/contentful/fetch-posts"
import type { Post } from "@/types"

// Mock data for Research Interests
const researchInterests = [
  {
    id: "quantum-gravity",
    title: "Quantum Gravity",
    description:
      "Exploring the fundamental nature of spacetime at the quantum level, including black hole thermodynamics and holographic principles.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "quantum-field-theory",
    title: "Quantum Field Theory",
    description:
      "Developing mathematical frameworks to describe quantum fields in curved spacetime and their applications to cosmology.",
    image: "https://images.unsplash.com/photo-1573164574001-518958d9baa2?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: "string-theory",
    title: "String Theory",
    description:
      "Investigating string theory as a unified framework for understanding all fundamental forces and particles in the universe.",
    image: "https://images.unsplash.com/photo-1610563166657-edbea1c457a3?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: "quantum-information",
    title: "Quantum Information",
    description:
      "Studying quantum entanglement, quantum computing, and their implications for our understanding of spacetime.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop",
  },
  {
    id: "cosmology",
    title: "Cosmology",
    description:
      "Investigating the origin, evolution, and structure of the universe, with a focus on the early universe and cosmic inflation.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop",
  },
  {
    id: "mathematical-physics",
    title: "Mathematical Physics",
    description:
      "Developing rigorous mathematical foundations for physical theories, with applications to quantum mechanics and field theory.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function ResearchPage() {
  const [papers, setPapers] = useState<Post[]>([])
  const [events, setEvents] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const heroRef = useRef(null)
  const interestsRef = useRef(null)
  const publicationsRef = useRef(null)
  const eventsRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isInterestsInView = useInView(interestsRef, { once: true, amount: 0.1 })
  const isPublicationsInView = useInView(publicationsRef, { once: true, amount: 0.1 })
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.1 })

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Fetch papers
        const papersData = await getPapersPosts()
        setPapers(papersData)

        // Fetch events
        const eventsData = await getEventsPosts()
        setEvents(eventsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section - Mejorado con imagen impactante */}
      <section ref={heroRef} className="pt-24 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>

        {/* Subtle background pattern with parallax effect */}
        <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
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

        {/* Nueva imagen de fondo con efecto parallax */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=3431&auto=format&fit=crop"
            alt="Quantum physics visualization"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Contenido de texto */}
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
                  Research
                </h1>
                <div className="w-16 h-px bg-white/30 mb-6"></div>
                <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
                  The London Quantum Universe Initiative is dedicated to advancing our understanding of the fundamental
                  nature of reality through innovative theoretical research in quantum physics and cosmology.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link
                    href="#research-interests"
                    className="inline-flex items-center px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-sm hover:bg-white/20 transition-all duration-300 group"
                  >
                    Explore our research
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Imagen destacada */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
                  alt="Quantum research visualization"
                  width={600}
                  height={400}
                  className="object-cover w-full aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-sm inline-block">
                    <span className="text-xs text-white/70">Quantum Gravity Research</span>
                  </div>
                </div>
              </div>
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

      {/* Research Interests Section */}
      <section
        id="research-interests"
        ref={interestsRef}
        className="py-16 md:py-20 relative overflow-hidden border-t border-white/10"
      >
        {/* Subtle background pattern with parallax effect */}
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

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInterestsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">Research Interests</h2>
            <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              Our research spans multiple areas of theoretical physics, focusing on understanding the quantum nature of
              the universe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {researchInterests.map((interest, index) => (
              <FadeInOnScroll
                key={interest.id}
                threshold={0.1}
                direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
                delay={0.1 * (index % 3)}
                duration={0.8}
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="bg-white/5 backdrop-blur-sm overflow-hidden border border-white/10 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={interest.image || "/placeholder.svg"}
                      alt={interest.title}
                      fill
                      className="object-cover transition-all duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl md:text-2xl font-light text-white">{interest.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-white/80 mb-6">{interest.description}</p>
                  </div>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Publications Section */}
      <section ref={publicationsRef} className="py-16 md:py-20 relative overflow-hidden border-t border-white/10">
        {/* Subtle background pattern with parallax effect */}
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

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPublicationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">Scientific Publications</h2>
            <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              Our researchers regularly publish in leading scientific journals, advancing our understanding of quantum
              physics.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {papers.length > 0 ? (
                papers.map((paper, index) => (
                  <FadeInOnScroll
                    key={paper.slug}
                    threshold={0.1}
                    direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
                    delay={0.1 * (index % 3)}
                    duration={0.8}
                  >
                    <Link
                      href={`/events-news/${paper.slug}`}
                      aria-label={`Read more about ${paper.title}`}
                      className="block h-full"
                    >
                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="group h-full flex flex-col bg-white/5 backdrop-blur-sm overflow-hidden border border-white/10 cursor-pointer"
                      >
                        {/* Image container with 16:9 aspect ratio */}
                        <div className="relative pt-[56.25%] overflow-hidden">
                          {/* Tag */}
                          <div className="absolute top-0 left-0 z-10 m-4">
                            <span className="inline-block bg-white/10 backdrop-blur-md px-2 py-1 text-xs text-white">
                              Paper
                            </span>
                          </div>

                          {/* Image */}
                          <Image
                            src={
                              paper.photo?.url || "/placeholder.svg?height=400&width=600&query=quantum physics paper"
                            }
                            alt={paper.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* Date */}
                          <div className="absolute bottom-0 left-0 z-10 m-4">
                            <span className="text-white/80 text-sm">{formatDate(paper.date)}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-light text-white mb-3 line-clamp-2">{paper.title}</h3>
                          <p className="text-white/80 mb-4 line-clamp-3 flex-grow">{paper.description}</p>
                          <div className="inline-flex items-center text-sm text-white hover:text-white/80 transition-colors group mt-auto">
                            Read more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </FadeInOnScroll>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-white/60">No publications found.</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/events-news?filter=Paper"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors border border-white/10 group"
            >
              View all publications
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Event Organization Section */}
      <section ref={eventsRef} className="py-16 md:py-20 relative overflow-hidden border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isEventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">Event Organization</h2>
            <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              We organize conferences, workshops, and seminars to foster collaboration and knowledge exchange in the
              quantum physics community.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <FadeInOnScroll
                    key={event.slug}
                    threshold={0.1}
                    direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
                    delay={0.1 * (index % 3)}
                    duration={0.8}
                  >
                    <Link
                      href={`/events-news/${event.slug}?from=research`}
                      aria-label={`Learn more about ${event.title}`}
                      className="block h-full"
                    >
                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="group h-full flex flex-col bg-white/5 backdrop-blur-sm overflow-hidden border border-white/10 cursor-pointer"
                      >
                        {/* Image container with 16:9 aspect ratio */}
                        <div className="relative pt-[56.25%] overflow-hidden">
                          {/* Tag */}
                          <div className="absolute top-0 left-0 z-10 m-4">
                            <span className="inline-block bg-white/10 backdrop-blur-md px-2 py-1 text-xs text-white">
                              Event
                            </span>
                          </div>

                          {/* Image */}
                          <Image
                            src={
                              event.photo?.url || "/placeholder.svg?height=400&width=600&query=quantum physics event"
                            }
                            alt={event.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* Date */}
                          <div className="absolute bottom-0 left-0 z-10 m-4">
                            <span className="text-white/80 text-sm">{formatDate(event.date)}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-light text-white mb-3 line-clamp-2">{event.title}</h3>

                          {event.address && (
                            <div className="flex items-center text-white/60 text-sm mb-4">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="line-clamp-1">{event.address}</span>
                            </div>
                          )}

                          <p className="text-white/80 mb-4 line-clamp-3 flex-grow">{event.description}</p>

                          <div className="inline-flex items-center text-sm text-white hover:text-white/80 transition-colors group mt-auto">
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </FadeInOnScroll>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-white/60">No events found.</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/events-news?filter=Events"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors border border-white/10 group"
            >
              View all events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
