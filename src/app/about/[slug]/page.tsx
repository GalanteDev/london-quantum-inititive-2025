"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Mail, ChevronRight } from "lucide-react"

import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { getResearcherBySlug } from "@/lib/contentful/fetch-posts"
import { Position, type Speaker } from "@/types"

// Importar los estilos CSS personalizados al inicio del archivo
import "../about.css"

export default function ResearcherDetailPage() {
  const params = useParams()
  const rawSlug = params?.slug
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const [researcher, setResearcher] = useState<Speaker | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResearcher = async (slug: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const foundResearcher = await getResearcherBySlug(slug)

      if (!foundResearcher) {
        setError("Researcher not found")
        setIsLoading(false)
        return
      }

      setResearcher(foundResearcher)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching researcher:", error)
      setError("Error loading researcher data")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const rawSlug = params?.slug
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug

    if (!slug) {
      console.warn("⚠️ Slug not ready yet")
      return
    }

    fetchResearcher(slug)
  }, [params?.slug])

  const getResearcherCategory = (researcher: Speaker) => {
    if (!researcher.position?.length) return "Researcher"

    if (researcher.position.includes(Position.PrincipalInvestigator)) {
      return "Principal Investigator"
    }
    if (researcher.position.includes(Position.ResearchAssociate)) {
      return "Research Associate"
    }
    if (researcher.position.includes(Position.PostGraduateStudent)) {
      return "Post Graduate Student"
    }

    return "Researcher"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-white text-lg animate-pulse">Loading researcher profile...</div>
      </div>
    )
  }

  if (error || !researcher) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-white text-lg mb-4">{error || "Researcher not found"}</div>
        <Link
          href="/about"
          className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-sm hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to team
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-[#1a1a1a]">
      <Navbar />

      {/* Hero Section */}
      {/* Modificar la sección Hero para agregar la clase personalizada */}
      <section className="pt-24 pb-0 md:pt-28 md:pb-0 relative overflow-hidden researcher-hero">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="container relative z-10">
          {/* Back link */}
          <Link
            href="/about"
            className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to team</span>
          </Link>

          {/* Main content */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Category badge */}
            <div className="px-3 py-1 bg-black/60 text-white text-xs rounded-sm border border-white/10 inline-block mb-4">
              {getResearcherCategory(researcher)}
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-4 max-w-3xl">
              {researcher.name}
            </h1>

            {/* Fellowship if available */}
            {researcher.fellowship && (
              <div className="text-white/80 text-lg font-light mb-4 max-w-2xl">{researcher.fellowship}</div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      {/* Modificar la sección Main Content para agregar la clase personalizada */}
      <section className="pb-16 md:pb-20 text-white relative researcher-content">
        <div className="container relative z-10">
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Left column - Photo */}
              <div className="md:col-span-1 relative">
                <div className="relative aspect-[3/4] md:h-full w-full overflow-hidden">
                  {researcher.photo?.url ? (
                    <Image
                      src={researcher.photo.url || "/placeholder.svg"}
                      alt={researcher.name || ""}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-mono-800 flex items-center justify-center">
                      <span className="text-white/50 text-xl">No image available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70"></div>
                </div>
              </div>

              {/* Right column - Info */}
              <div className="md:col-span-2 p-6 md:p-8 flex flex-col">
                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Institution card */}
                  {researcher.institution && (
                    <div className="bg-black/30 rounded-sm p-4 border border-white/5">
                      <h3 className="text-sm font-medium text-white/70 mb-2">Institution</h3>
                      <p className="text-white text-base">
                        {researcher.institution}
                        {researcher.universityPosition ? ` - ${researcher.universityPosition}` : ""}
                      </p>
                    </div>
                  )}

                  {/* Education card */}
                  {researcher.phdInstitution && (
                    <div className="bg-black/30 rounded-sm p-4 border border-white/5">
                      <h3 className="text-sm font-medium text-white/70 mb-2">Education</h3>
                      <p className="text-white text-base">PhD, {researcher.phdInstitution}</p>
                    </div>
                  )}
                </div>

                {/* Research interests */}
                {researcher.researchInterests && (
                  <div className="mb-6">
                    <h3 className="text-lg font-light text-white mb-3">Research Interests</h3>
                    <div className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2.5 flex-shrink-0 mt-1.5"></div>
                      <p className="text-white/80">{researcher.researchInterests}</p>
                    </div>
                  </div>
                )}

                {/* Biography Section */}
                {researcher.biography && (
                  <div className="mb-6 border-t border-white/10 pt-6 mt-2">
                    <h3 className="text-lg font-light text-white mb-3">Biography</h3>
                    <p className="text-white/70 leading-relaxed">{researcher.biography}</p>
                  </div>
                )}

                {/* Contact and links */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium text-white/70 mb-3">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {researcher.universityLogo && (
                      <a
                        href={researcher.universityLogo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-black/40 text-white text-xs rounded-sm hover:bg-black/60 transition-colors border border-white/5"
                      >
                        University Profile
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </a>
                    )}

                    {researcher.googleScholarUrl && (
                      <a
                        href={researcher.googleScholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-black/40 text-white text-xs rounded-sm hover:bg-black/60 transition-colors border border-white/5"
                      >
                        Google Scholar
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </a>
                    )}

                    <a
                      href={`mailto:${researcher.email || "contact@lqui.org"}`}
                      className="inline-flex items-center px-3 py-1.5 bg-black/40 text-white text-xs rounded-sm hover:bg-black/60 transition-colors border border-white/5"
                    >
                      Contact
                      <Mail className="ml-1.5 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related researchers section */}
      <section className="py-12 md:py-16 text-white relative border-t border-white/10">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-light text-white mb-8">Explore More Researchers</h2>
            <Link
              href="/about"
              className="inline-flex items-center px-5 py-2.5 bg-black/60 text-white rounded-sm hover:bg-black/80 transition-colors border border-white/5 group"
            >
              View All Team Members
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
