"use client"

import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/utils/format-date"
import { getCategoryColor } from "@/lib/utils/tags"
import { Post } from "@/types"

interface Props {
  event: Post
}

export function EventHero({ event }: Props) {
  return (
    <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-mono-100 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/events-news"
            className="inline-flex items-center text-sm text-mono-600 hover:text-mono-900 transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all news & events
          </Link>

          <div className="flex items-center space-x-3 mb-4">
            {event.tag && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                    getCategoryColor(Array.isArray(event.tag) ? event.tag[0] : event.tag)
                )}`}
              >
                {Array.isArray(event.tag) ? event.tag[0] : event.tag}
              </span>
            )}
            <span className="text-mono-500 text-sm flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(event.date)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-mono-900 mb-6">
            {event.title}
          </h1>
        </div>
      </div>
    </section>
  )
}
