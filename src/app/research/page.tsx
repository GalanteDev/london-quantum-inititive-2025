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
import { Card } from "@/components/ui/CardLQUI"

const researchInterests = [
  { id: "quantum-gravity", title: "Quantum Gravity", description: "Exploring the fundamental nature of spacetime at the quantum level, including black hole thermodynamics and holographic principles.", imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" },
  { id: "quantum-field-theory", title: "Quantum Field Theory", description: "Developing mathematical frameworks to describe quantum fields in curved spacetime and their applications to cosmology.", imageUrl: "https://images.unsplash.com/photo-1573164574001-518958d9baa2?q=80&w=2069&auto=format&fit=crop" },
  { id: "string-theory", title: "String Theory", description: "Investigating string theory as a unified framework for understanding all fundamental forces and particles in the universe.", imageUrl: "https://images.unsplash.com/photo-1610563166657-edbea1c457a3?q=80&w=2069&auto=format&fit=crop" },
  { id: "quantum-information", title: "Quantum Information", description: "Studying quantum entanglement, quantum computing, and their implications for our understanding of spacetime.", imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop" },
  { id: "cosmology", title: "Cosmology", description: "Investigating the origin, evolution, and structure of the universe, with a focus on the early universe and cosmic inflation.", imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop" },
  { id: "mathematical-physics", title: "Mathematical Physics", description: "Developing rigorous mathematical foundations for physical theories, with applications to quantum mechanics and field theory.", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop" },
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
    async function loadData() {
      setIsLoading(true)
      try {
        const [papersData, eventsData] = await Promise.all([getPapersPosts(), getEventsPosts()])
        setPapers(
          papersData
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
        )
        setEvents(
          eventsData
            .filter((e) => e.organizedByLqui)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
        )
      } catch {
        console.error("Error loading data")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section ref={heroRef} className="pt-24 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>

        <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </ParallaxEffect>

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
      {/* Research Interests (first 6) */}
      <section ref={interestsRef} id="research-interests" className="py-16 md:py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInterestsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4">Research Interests</h2>
            <p className="text-white/80 max-w-xl mx-auto">Our research spans multiple areas of theoretical physics, focusing on understanding the quantum nature of the universe.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchInterests.slice(0, 6).map((interest, idx) => (
              <FadeInOnScroll key={interest.id} threshold={0.1} direction="up" delay={0.1 * idx} duration={0.8}>
                <Card title={interest.title} description={interest.description} imageUrl={interest.imageUrl} href={`#${interest.id}`} variant="default" />
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Publications (last 3) */}
      <section ref={publicationsRef} className="py-16 md:py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isPublicationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4">Scientific Publications</h2>
            <p className="text-white/80 max-w-xl mx-auto">Our researchers regularly publish in leading scientific journals.</p>
          </motion.div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-t-white border-white/30 rounded-full" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {papers.map((paper, idx) => (
                  <FadeInOnScroll key={paper.slug} threshold={0.1} direction="up" delay={0.1 * idx} duration={0.8}>
                    <Card title={paper.title} description={paper.description} imageUrl={paper.photo?.url} date={paper.date} tag="Paper" href={`/events-news/${paper.slug}`} aspectRatio="16/9" variant="default" />
                  </FadeInOnScroll>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/events-news?filter=Paper" className="inline-flex items-center px-6 py-2 bg-white/10 text-white text-sm rounded-sm border border-white/20 hover:bg-white/20 transition-all">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Event Organization (last 3) */}
      <section ref={eventsRef} className="py-16 md:py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isEventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4">Event Organization</h2>
            <p className="text-white/80 max-w-xl mx-auto">We organize conferences, workshops, and seminars to foster collaboration and knowledge exchange.</p>
          </motion.div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-t-white border-white/30 rounded-full" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((evt, idx) => (
                  <FadeInOnScroll key={evt.slug} threshold={0.1} direction="up" delay={0.1 * idx} duration={0.8}>
                    <Card title={evt.title} description={evt.description} imageUrl={evt.photo?.url} date={evt.date} tag="Event" href={`/events-news/${evt.slug}?from=research`} aspectRatio="16/9" variant="default" />
                  </FadeInOnScroll>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/events-news?filter=Events" className="inline-flex items-center px-6 py-2 bg-white/10 text-white text-sm rounded-sm border border-white/20 hover:bg-white/20 transition-all">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}