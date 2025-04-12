"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { client } from "@/lib/contentful/client"
import { GET_POST_BY_SLUG } from "@/lib/contentful/queries"

import { ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { EventHero } from "@/components/sections/events-news-detail.tsx/EventHero"
import { EventBody } from "@/components/sections/events-news-detail.tsx/EventBody"
import { Post } from "@/types"

export default function EventNewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Post | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const slug = params?.slug as string
      if (!slug) return

      try {
        const res = await client.request<{ postsCollection: { items: Post[] } }>(GET_POST_BY_SLUG, { slug })
        const item = res.postsCollection.items[0]

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
      <div className="min-h-screen flex items-center justify-center bg-mono-100">
        <div className="text-mono-500 animate-pulse">Loading event...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mono-50 relative">
      <Navbar />
      <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </ParallaxEffect>
      <EventHero event={event} />
      <EventBody event={event} />
      <FooterSection />
    </div>
  )
}
