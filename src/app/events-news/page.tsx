"use client"

import React, { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { getAllPosts } from "@/lib/contentful/fetch-posts"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import type { Post } from "@/types"
import { Card } from "@/components/ui/CardLQUI"
import { getCategoryColor } from "@/lib/utils/tags"
import { NavigateButton } from "@/components/ui/NavigateButton"

export default function EventsNewsPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const perPage = 12

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts()
        console.log('log', data)
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoaded(true)
      }
    }
    fetchPosts()
  }, [])

  // Apply URL filter
  useEffect(() => {
    const filterParam = searchParams.get("filter")
    if (filterParam) {
      setSelectedTags([filterParam])
      setCurrentPage(1)
    }
  }, [searchParams])

  // Dynamic filter combining title and speaker
  const filteredPosts = posts.filter(post => {
    const term = search.toLowerCase()
    const matchTitle = post.title.toLowerCase().includes(term)
    const matchSpeaker = post.speakersCollection?.items.some(speaker =>
      speaker.name?.toLowerCase().includes(term)
    )
    const matchSearch = term === "" || matchTitle || matchSpeaker

    const matchTag =
      selectedTags.length === 0 ||
      (Array.isArray(post.tag)
        ? post.tag.some(tag => selectedTags.includes(tag))
        : post.tag && selectedTags.includes(post.tag))

    return matchSearch && matchTag
  })

  const currentPosts = filteredPosts.slice((currentPage - 1) * perPage, currentPage * perPage)

  const allTags = Array.from(
    new Set(posts.flatMap(p => (Array.isArray(p.tag) ? p.tag : p.tag ? [p.tag] : [])))
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearch("")
    searchRef.current?.focus()
    setCurrentPage(1)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
    setCurrentPage(1)
  }

  const handleAllTags = () => {
    setSelectedTags([])
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero with dynamic search */}
      <section className="pt-24 pb-4 bg-black relative">
        {/* background grid omitted */}
        <div className="container relative z-10">
        <div className="flex justify-start mb-6">
    <NavigateButton direction="back" />
  </div>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-5xl font-light text-white mb-4">News & Events</h1>
            <p className="text-white/80 text-lg mb-8">
              Stay updated with our latest research, events and announcements
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by title or speaker..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-12 py-3 border border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm bg-black/30 text-white backdrop-blur-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={handleAllTags}
              className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                selectedTags.length === 0
                  ? "bg-white text-black"
                  : "bg-black/30 text-white hover:bg-black/50"
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-sm text-sm transition-colors shadow-sm ${
                  selectedTags.includes(tag)
                    ? getCategoryColor(tag)
                    : "bg-black/30 text-white hover:bg-black/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-6 bg-black">
        
        <div className="container">
          
          {!isLoaded ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse text-white/50">Loading...</div>
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-10 text-white/70">No results found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPosts.map((post, idx) => (
                <FadeInOnScroll key={post.slug} threshold={0.1} direction="up" delay={0.05 * (idx % 6)} duration={0.5} className="h-full">
                  <Card
                    title={post.title}
                    description={post.description}
                    imageUrl={post.photo?.url}
                    date={post.date}
                    tag={Array.isArray(post.tag) ? post.tag[0] : post.tag}
                    href={`/events-news/${post.slug}`}
                    priority={idx < 3}
                  />
                </FadeInOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
