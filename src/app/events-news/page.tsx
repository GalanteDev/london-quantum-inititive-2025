"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { formatDate } from "@/utils/format-date"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { getAllPosts } from "@/lib/contentful/fetch-posts"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import type { Post } from "@/types"

export default function EventsNewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const perPage = 12

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data)
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setIsLoaded(true)
      }
    }
    fetch()
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase())

    const matchTag =
      selectedTags.length === 0 ||
      (Array.isArray(post.tag)
        ? post.tag.some((tag) => selectedTags.includes(tag))
        : post.tag && selectedTags.includes(post.tag))

    return matchSearch && matchTag
  })

  const totalPages = Math.ceil(filteredPosts.length / perPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * perPage, currentPage * perPage)

  const allTags = Array.from(new Set(posts.flatMap((p) => (Array.isArray(p.tag) ? p.tag : p.tag ? [p.tag] : []))))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchRef.current) {
      setSearch(searchRef.current.value)
      setCurrentPage(1)
    }
  }

  const clearSearch = () => {
    setSearch("")
    if (searchRef.current) {
      searchRef.current.value = ""
      searchRef.current.focus()
    }
    setCurrentPage(1)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
    setCurrentPage(1)
  }

  const handleAllTags = () => {
    setSelectedTags([])
    setCurrentPage(1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="dark min-h-screen bg-[#111] text-white">
      <Navbar />

      <section className="pt-24 pb-12 md:pt-28 md:pb-16 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              News & Events
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Stay updated with our latest research, events and announcements
            </p>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search news and events..."
                  defaultValue={search}
                  className="w-full pl-12 pr-12 py-3 rounded-sm bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-sm backdrop-blur-sm"
                />
                {search ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={handleAllTags}
              className={`px-4 py-2 rounded-sm text-sm transition-colors shadow-sm ${
                selectedTags.length === 0
                  ? "bg-black/60 text-white border-transparent backdrop-blur-sm hover:bg-black/70"
                  : "bg-black/30 text-white/70 border border-white/20 hover:bg-black/50"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-sm text-sm transition-colors shadow-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-black/60 text-white border border-white/20 backdrop-blur-sm hover:bg-black/70'
                    : 'bg-black/30 text-white/70 border border-white/10 hover:bg-black/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          {isLoaded && currentPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentPosts.map((post, index) => {
                const tag = Array.isArray(post.tag) ? post.tag[0] : post.tag

                return (
                  <FadeInOnScroll
                    key={post.slug}
                    threshold={0.1}
                    direction="up"
                    delay={0.05 * (index % 6)}
                    duration={0.5}
                    className="h-full"
                  >
                    <Link
                      href={`/events-news/${post.slug}`}
                      className="group h-full bg-black/20 text-white rounded-sm shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col border border-white/15 hover:border-white/40 backdrop-blur-sm"
                      style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)" }}
                    >
                      <div className="relative w-full pt-[56.25%] overflow-hidden bg-black/30">
                        {tag && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-black/60 text-white border border-transparent backdrop-blur-sm">
                              {tag}
                            </span>
                          </div>
                        )}
                        {post.photo?.url ? (
                          <div className="absolute inset-0">
                            <Image
                              src={post.photo.url || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              priority={index < 3}
                            />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-muted"></div>
                        )}
                        <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-black/70 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                          <Calendar className="h-3 w-3 mr-1.5 opacity-80" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-light mb-2 group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-3 mb-4 flex-grow">
                          {post.description}
                        </p>
                        <div className="mt-auto inline-flex items-center text-sm font-light text-white/80 group-hover:text-white transition-colors duration-500">
                          Read more
                          <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </FadeInOnScroll>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
