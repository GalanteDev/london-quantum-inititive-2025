"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowLeft, MapPin, Clock, Share2, ExternalLink, ArrowRight } from "lucide-react"
import { client } from "@/lib/contentful/client"
import { GET_POST_BY_SLUG } from "@/lib/contentful/queries"
import { formatDate } from "@/utils/format-date"
import { getCategoryColor } from "@/lib/utils/tags"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import type { Post } from "@/types"

export default function EventNewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Post | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Function to extract date and time in UK format
  const getFormattedDateTime = (dateString: string) => {
    if (!dateString) return { date: "", time: "" }

    try {
      const date = new Date(dateString)
      // Format date in English (UK)
      const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // Format time in UK format (24h)
      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })

      return {
        date: formattedDate,
        time: formattedTime,
      }
    } catch (e) {
      return { date: formatDate(dateString), time: "" }
    }
  }

  useEffect(() => {
    const fetchEvent = async () => {
      const slug = params?.slug as string
      if (!slug) return

      try {
        const response = await client.request<{ postsCollection: { items: Post[] } }>(GET_POST_BY_SLUG, { slug })
        const item = response.postsCollection.items[0]

        if (!item) return router.push("/events-news")

        setEvent(item)
        setIsLoaded(true)
      } catch (err) {
        console.error("Error fetching post by slug:", err)
        router.push("/events-news")
      }
    }

    fetchEvent()
  }, [params?.slug, router])

  if (!isLoaded || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mono-50">
        <div className="text-mono-600 text-lg animate-pulse">Loading event...</div>
      </div>
    )
  }

  const { date, time } = getFormattedDateTime(event.date)
  const speaker = event.speakers
  const isNews = Array.isArray(event.tag)
    ? event.tag.some((tag) => tag.toLowerCase() === "news")
    : event.tag?.toLowerCase() === "news"

  return (
    <div className="min-h-screen bg-mono-50">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/events-news"
            className="inline-flex items-center text-sm text-mono-600 hover:text-mono-900 transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to all</span> news & events
          </Link>

          {/* Main content card */}
          <div className="bg-white rounded-sm shadow-md border border-mono-200 overflow-hidden">
            {/* Header with image */}
            <div className="relative">
              {/* Tags positioned over the image */}
              {event.tag && (
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  {Array.isArray(event.tag) ? (
                    event.tag.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium shadow-sm ${getCategoryColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium shadow-sm ${getCategoryColor(event.tag)}`}
                    >
                      {event.tag}
                    </span>
                  )}
                </div>
              )}

              {/* Featured image - much smaller height */}
              {event.photo?.url ? (
                <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden border-b border-mono-200">
                  <Image
                    src={event.photo.url || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-24 bg-mono-100 border-b border-mono-200"></div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title and meta */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-mono-900 mb-4">
                  {event.title}
                </h1>

                {/* Description */}
                {event.description && (
                  <div className="border-l-4 border-mono-200 pl-4 py-2">
                    <p className="text-base md:text-lg text-mono-700">{event.description}</p>
                  </div>
                )}
              </div>

              {/* Two column layout for content and details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  {/* Main Text (HTML) */}
                  {event.mainText && (
                    <div className="prose prose-lg max-w-none mb-8">
                      <div
                        dangerouslySetInnerHTML={{ __html: event.mainText }}
                        className="prose-img:rounded-sm prose-img:mx-auto prose-headings:text-mono-800 prose-headings:font-medium"
                      />
                    </div>
                  )}
                </div>

                {/* Sidebar with event details and speaker */}
                <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
                  {/* Event Details (for events) */}
                  {!isNews && (event.date || event.address) && (
                    <div className="border border-mono-200 rounded-sm overflow-hidden">
                      <div className="bg-mono-50 px-4 py-2 border-b border-mono-200">
                        <h3 className="font-medium text-mono-900 text-sm">Event Details</h3>
                      </div>
                      <div className="p-4 space-y-4">
                        {event.date && (
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-mono-700 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-mono-800 font-medium text-sm">Date</p>
                              <p className="text-mono-600 text-sm">{date}</p>
                            </div>
                          </div>
                        )}

                        {time && (
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-mono-700 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-mono-800 font-medium text-sm">Time (UK)</p>
                              <p className="text-mono-600 text-sm">{time}</p>
                            </div>
                          </div>
                        )}

                        {event.address && (
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-mono-700 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-mono-800 font-medium text-sm">Location</p>
                              <p className="text-mono-600 text-sm">{event.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Speaker (for events) */}
                  {speaker && !isNews && (
                    <div className="border border-mono-200 rounded-sm overflow-hidden">
                      <div className="bg-mono-50 px-4 py-2 border-b border-mono-200">
                        <h3 className="font-medium text-mono-900 text-sm">Speaker</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-3">
                          {speaker.photo?.url && (
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-mono-200">
                              <Image
                                src={speaker.photo.url || "/placeholder.svg"}
                                alt={speaker.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-mono-900">{speaker.name}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                          {speaker.universityUrl && (
                            <a
                              href={speaker.universityUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-mono-900 hover:text-mono-600 inline-flex items-center gap-1 transition-colors"
                            >
                              University Profile <ExternalLink className="h-3 w-3" />
                            </a>
                          )}

                          {speaker.googleScholarUrl && (
                            <a
                              href={speaker.googleScholarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-mono-900 hover:text-mono-600 inline-flex items-center gap-1 transition-colors"
                            >
                              Google Scholar <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>

                        {speaker.biography && <p className="text-xs text-mono-700 mt-2">{speaker.biography}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-mono-200 gap-4">
                <button className="inline-flex items-center text-sm text-mono-600 hover:text-mono-900 transition-colors">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share this{" "}
                  {Array.isArray(event.tag) ? event.tag[0]?.toLowerCase() : event.tag?.toLowerCase() || "event"}
                </button>

                <Link
                  href="/events-news"
                  className="inline-flex items-center px-5 py-2.5 bg-mono-900 text-white text-sm font-medium rounded-sm hover:bg-mono-800 transition-colors"
                >
                  View all news & events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
