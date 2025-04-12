"use client"

import Image from "next/image"
import Link from "next/link"
import { Share2, ArrowRight } from "lucide-react"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import { EventTags } from "./EventTags"
import { Post } from "@/types"

interface Props {
  event: Post
}

export function EventBody({ event }: Props) {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Image */}
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                {event.photo?.url && (
                  <Image
                    src={event.photo.url}
                    alt={event.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-2/3">
            <FadeInOnScroll threshold={0.1} direction="up" delay={0.1}>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-mono-700 mb-6 leading-relaxed">{event.description}</p>

                <div
                  dangerouslySetInnerHTML={{ __html: event.mainText || "" }}
                  className="mb-6"
                />

                {event.address && (
                  <p className="mb-6">
                    <strong>Location:</strong> {event.address}
                  </p>
                )}

                <EventTags tags={event.tag} />

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-mono-200">
                  <button className="inline-flex items-center text-sm text-mono-600 hover:text-mono-900 transition-colors">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share this {Array.isArray(event.tag) ? event.tag[0]?.toLowerCase() : "Event"}
                  </button>

                  <Link
                    href="/events-news"
                    className="inline-flex items-center px-4 py-2 bg-mono-900 text-white text-sm font-medium rounded-sm hover:bg-mono-800 transition-colors"
                  >
                    View all news & events
                    <ArrowRight className="ml-2 h-4 w-4" />
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
