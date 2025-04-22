"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowLeft, MapPin, Share2, ExternalLink, ArrowRight } from "lucide-react"
import { formatDate } from "@/utils/format-date"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"
import type { Post } from "@/types"
import { getPostBySlug } from "@/lib/contentful/fetch-posts"

export default function EventNewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Post | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [speakers, setSpeakers] = useState<any[] | null>(null)

  // Function to format a date without year
  const formatDateWithoutYear = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      })
    } catch (e) {
      return formatDate(dateString)
    }
  }

  // Function to format a date with year
  const formatDateWithYear = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    } catch (e) {
      return formatDate(dateString)
    }
  }

  // Function to display date range
  const getDateDisplay = () => {
    if (!event?.date) return ""

    // If no end date, just show start date with year
    if (!event.dateTo) return formatDateWithYear(event.date)

    // For date range, show first date without year and second date with year
    const startDate = formatDateWithoutYear(event.date)
    const endDate = formatDateWithYear(event.dateTo)

    return `${startDate} - ${endDate}`
  }

  useEffect(() => {
    const fetchEvent = async () => {
      const slug = params?.slug as string
      if (!slug) return

      try {
        const item = await getPostBySlug(slug)

        if (!item) return router.push("/events-news")

        setEvent(item)
        setIsLoaded(true)
        setSpeakers(item.speakersCollection?.items || null)
      } catch (err) {
        console.error("Error fetching post by slug:", err)
        router.push("/events-news")
      }
    }

    fetchEvent()

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
  }, [params?.slug, router])

  const isNews = Array.isArray(event?.tag)
    ? event?.tag.some((tag) => tag.toLowerCase() === "news")
    : event?.tag?.toLowerCase() === "news"

  if (!isLoaded || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-lg flex flex-col items-center">
          <div className="w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-full animate-spin mb-4"></div>
          <span className="text-white/80">Loading content...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="pt-24 pb-4 md:pt-28 md:pb-6 relative overflow-hidden">
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

        <div className="w-[90%] max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          {/* Back link */}
          <Link
            href="/events-news"
            className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to all</span> news & events
          </Link>

          <div>
            {/* Tags */}
            {event.tag && (
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.isArray(event.tag) ? (
                  event.tag.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-black/40 text-white border border-white/10"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-black/40 text-white border border-white/10">
                    {event.tag}
                  </span>
                )}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3">
              {event.title}
            </h1>

            {/* Meta info in a row */}
            <div className="flex flex-wrap items-center text-sm text-white/70 gap-4 mb-4">
              {event.date && (
                <div className="flex items-center bg-black/40 px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur-sm shadow-sm">
                  <Calendar className="h-4 w-4 mr-1.5 text-white/70" />
                  <span>{getDateDisplay()}</span>
                </div>
              )}

              {event.address && (
                <div className="flex items-center bg-black/40 px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur-sm shadow-sm">
                  <MapPin className="h-4 w-4 mr-1.5 text-white/70" />
                  <span className="line-clamp-1">{event.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative">
        <div className="w-[90%] max-w-4xl mx-auto relative z-10">
          <div>
            {/* Description */}
            {event.description && (
              <div className="mb-8 bg-black/40 p-6 rounded-sm border border-white/25 backdrop-blur-sm shadow-md">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">{event.description}</p>
              </div>
            )}
            {/* Featured image */}
            {event.photo?.url && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 overflow-hidden rounded-sm border border-white/15 shadow-lg">
                <Image
                  src={event.photo.url || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
            )}

            {/* Main Text (HTML) */}
            {event.mainText && (
              <div className="prose prose-invert prose-lg max-w-none bg-black/20 p-6 rounded-sm border border-white/5">
                <div
                  dangerouslySetInnerHTML={{ __html: event.mainText }}
                  className="prose-img:rounded-sm prose-img:mx-auto prose-headings:text-white prose-headings:font-light prose-p:text-white/80"
                />
              </div>
            )}

            {/* Speaker list */}
            {speakers && speakers.length > 0 && (
              <div className="mt-10 mb-8">
                <h2 className="text-2xl font-light text-white mb-5 flex items-center">
                  <span className="w-8 h-px bg-white/30 mr-3"></span>
                  {Array.isArray(event.tag) && event.tag.includes("Events") ? "LQ Members Involved" : "Researchers"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="bg-black/40 rounded-sm overflow-hidden border border-white/10 p-5 flex items-start gap-5 hover:border-white/20 transition-colors duration-300 backdrop-blur-sm shadow-md"
                    >
                      {speaker.photo?.url && (
                        <div className="w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 border border-white/20 shadow-sm">
                          <Image
                            src={speaker.photo.url || "/placeholder.svg"}
                            alt={speaker.name || "Speaker"}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <Link
                          className="font-medium text-white text-lg mb-2 hover:text-white/80 transition-colors inline-block"
                          href={`/about/${speaker.name?.toLowerCase().replace(/\s+/g, "-")}` || ""}
                        >
                          {speaker.name}
                        </Link>

                        <div className="w-12 h-px bg-white/20 my-2"></div>

                        {/* Institución si está disponible */}
                        {speaker.institution && <p className="text-white/80 text-sm mb-2">{speaker.institution}</p>}

                        {/* Biografía del speaker */}
                        {speaker.biography && (
                          <p className="text-white/60 text-sm mb-3 line-clamp-3">{speaker.biography}</p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-3">
                          {/* Verifica si hay un enlace de Google Scholar */}
                          {speaker.googleScholarUrl && (
                            <a
                              href={speaker.googleScholarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-white/80 hover:text-white inline-flex items-center gap-1 transition-colors bg-white/10 px-2.5 py-1.5 rounded-sm hover:bg-white/15"
                            >
                              Google Scholar
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}

                          {/* Enlace a la universidad si está disponible */}
                          {speaker.universityUrl && (
                            <a
                              href={speaker.universityUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-white/80 hover:text-white inline-flex items-center gap-1 transition-colors bg-white/10 px-2.5 py-1.5 rounded-sm hover:bg-white/15"
                            >
                              University Profile
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer with share and back to all events */}
            <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors bg-black/30 px-4 py-2.5 rounded-sm border border-white/10 hover:border-white/20 shadow-sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share this{" "}
                {Array.isArray(event.tag) ? event.tag[0]?.toLowerCase() : event.tag?.toLowerCase() || "event"}
              </button>

              <Link
                href="/events-news"
                className="inline-flex items-center px-5 py-2.5 bg-black/50 text-white text-sm font-medium rounded-sm hover:bg-black/70 transition-colors border border-white/15 hover:border-white/25 shadow-sm group"
              >
                View all news & events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
