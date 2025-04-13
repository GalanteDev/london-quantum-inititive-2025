"use client"

import { Calendar, ArrowLeft, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/utils/format-date"
import type { Post } from "@/types"
import { EventTags } from "./EventTags"

interface Props {
  event: Post
}

export function EventHero({ event }: Props) {
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

  const { date, time } = getFormattedDateTime(event.date)

  return (
    <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-8 md:pb-10 bg-mono-100 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/events-news"
            className="inline-flex items-center text-sm text-mono-600 hover:text-mono-900 transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to all</span> news & events
          </Link>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-mono-900 mb-4">
            {event.title}
          </h1>

          {/* Description with white background */}
          {event.description && (
            <div className="bg-white p-5 rounded-md shadow-sm border border-mono-200 mb-8">
              <p className="text-base md:text-lg text-mono-700 max-w-3xl leading-relaxed">{event.description}</p>
            </div>
          )}

          <EventTags tags={event.tag} />

          {/* Combined Event Details Card */}
          {(event.date || event.address) && (
            <div className="mt-8 mb-6">
              <div className="bg-white rounded-md overflow-hidden shadow-sm border border-mono-200 transition-all hover:shadow-md">
                <div className="border-l-4 border-mono-800 pl-4 py-3 bg-mono-50">
                  <p className="font-medium text-mono-900">Event Details</p>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.date && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-mono-700 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-mono-800 font-medium">Date</p>
                        <p className="text-mono-600">{date}</p>
                      </div>
                    </div>
                  )}

                  {time && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-mono-700 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-mono-800 font-medium">Time (UK)</p>
                        <p className="text-mono-600">{time}</p>
                      </div>
                    </div>
                  )}

                  {event.address && (
                    <div className="flex items-start sm:col-span-2">
                      <MapPin className="h-5 w-5 text-mono-700 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-mono-800 font-medium">Location</p>
                        <p className="text-mono-600">{event.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
