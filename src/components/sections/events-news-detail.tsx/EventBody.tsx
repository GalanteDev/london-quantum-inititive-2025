"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "framer-motion"
import { ArrowRight, Share2, ExternalLink } from "lucide-react"
import type { Post } from "@/types"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"

interface Props {
  event: Post
}

export function EventBody({ event }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const speaker = event.speakers

  const renderSpeakerInfo = () => {
    if (!speaker) return null

    return (
      <div className="mb-8 w-full">
        <div className="border-l-4 border-mono-800 pl-4 py-3 mb-4">
          <h4 className="font-semibold text-mono-900">Speaker</h4>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-5 rounded-md shadow-sm border border-mono-200">
          {speaker.photo?.url && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-mono-200 shadow-sm">
              <Image
                src={speaker.photo.url || "/placeholder.svg"}
                alt={speaker.name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="text-center sm:text-left">
            <p className="font-medium text-mono-900 text-lg">{speaker.name}</p>

            <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
              {speaker.universityUrl && (
                <a
                  href={speaker.universityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  University Profile <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {speaker.googleScholarUrl && (
                <a
                  href={speaker.googleScholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1 sm:mt-0"
                >
                  Google Scholar <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {speaker.biography && (
              <p className="text-sm text-mono-700 mt-3 max-w-prose leading-relaxed">{speaker.biography}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-8 md:py-12 lg:py-16" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Image - Responsive adjustments */}
          <div className="lg:w-1/3 mb-6 lg:mb-0 order-1 lg:order-none">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[3/4] w-full max-w-xs mx-auto lg:max-w-none overflow-hidden rounded-md shadow-md border border-mono-200">
                {event.photo?.url ? (
                  <Image
                    src={event.photo.url || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-mono-200" />
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-2/3 order-2">
            <FadeInOnScroll threshold={0.1} direction="up" delay={0.1}>
              <div className="prose prose-lg max-w-none">
                {/* Main Text (HTML) */}
                {event.mainText && (
                  <div className="bg-white p-5 rounded-md shadow-sm border border-mono-200 mb-8">
                    <div
                      dangerouslySetInnerHTML={{ __html: event.mainText }}
                      className="prose-img:rounded-md prose-img:mx-auto prose-headings:text-mono-800 prose-headings:font-medium"
                    />
                  </div>
                )}

                {/* Speaker */}
                {renderSpeakerInfo()}

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-mono-200 gap-4">
                  <button className="inline-flex items-center text-sm text-mono-600 hover:text-mono-900 transition-colors group">
                    <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Share this{" "}
                    {Array.isArray(event.tag) ? event.tag[0]?.toLowerCase() : event.tag?.toLowerCase() || "event"}
                  </button>

                  <Link
                    href="/events-news"
                    className="inline-flex items-center px-5 py-2.5 bg-mono-900 text-white text-sm font-medium rounded-md hover:bg-mono-800 transition-colors group"
                  >
                    View all news & events
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
