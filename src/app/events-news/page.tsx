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
import { getCategoryColor } from "@/lib/utils/tags"
import type { Post } from "@/types"

export default function EventsNewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const perPage = 9

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
    // Match search text
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase())

    // Match tags (if no tags selected, show all)
    const matchTag =
      selectedTags.length === 0 ||
      (Array.isArray(post.tag)
        ? post.tag.some((tag) => selectedTags.includes(tag))
        : post.tag && selectedTags.includes(post.tag))

    return matchSearch && matchTag
  })

  const totalPages = Math.ceil(filteredPosts.length / perPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * perPage, currentPage * perPage)

  // Extract all unique tags from posts
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
    setSelectedTags((prev) => {
      // If tag is already selected, remove it
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      }
      // Otherwise add it
      return [...prev, tag]
    })
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
    <div className="min-h-screen bg-mono-50">
      <Navbar />

      {/* Redesigned Hero Section with Integrated Search */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 bg-mono-100 relative">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-mono-900 mb-4">
              News & Events
            </h1>
            <p className="text-mono-600 text-lg mb-8">
              Stay updated with our latest research, events and announcements
            </p>

            {/* Integrated Search Form */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mono-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search news and events..."
                  defaultValue={search}
                  className="w-full pl-12 pr-12 py-3 border border-mono-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-mono-900 shadow-sm bg-white text-mono-900"
                />
                {search ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-mono-400 hover:text-mono-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-mono-400 hover:text-mono-600"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={handleAllTags}
              className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                selectedTags.length === 0
                  ? "bg-mono-900 text-white shadow-sm"
                  : "bg-white text-mono-700 hover:bg-mono-200 border border-mono-200 shadow-sm"
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
                    ? `${getCategoryColor(tag)}`
                    : "bg-white text-mono-700 hover:bg-mono-200 border border-mono-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Loading State */}
          {!isLoaded && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse text-mono-600">Loading posts...</div>
            </div>
          )}

          {/* No Results */}
          {isLoaded && currentPosts.length === 0 && (
            <div className="bg-white rounded-sm shadow-sm border border-mono-200 p-10 text-center">
              <h3 className="text-xl font-medium text-mono-900 mb-2">No results found</h3>
              <p className="text-mono-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearch("")
                  setSelectedTags([])
                  setCurrentPage(1)
                  if (searchRef.current) {
                    searchRef.current.value = ""
                  }
                }}
                className="px-4 py-2 bg-mono-900 text-white rounded-sm hover:bg-mono-800 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Posts Grid */}
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
                      className="group h-full bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-mono-200"
                    >
                      {/* Fixed image container with proper aspect ratio */}
                      <div className="relative w-full pt-[56.25%] overflow-hidden bg-mono-100">
                        {/* Tag */}
                        {tag && (
                          <div className="absolute top-3 left-3 z-10">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium shadow-sm ${getCategoryColor(
                                tag,
                              )}`}
                            >
                              {tag}
                            </span>
                          </div>
                        )}

                        {/* Image */}
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
                          <div className="absolute inset-0 bg-mono-200"></div>
                        )}

                        {/* Date */}
                        <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-mono-900/70 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                          <Calendar className="h-3 w-3 mr-1.5 opacity-80" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-medium text-mono-900 mb-2 group-hover:text-mono-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-mono-600 line-clamp-3 mb-4 flex-grow">{post.description}</p>

                        <div className="mt-auto inline-flex items-center text-sm font-medium text-mono-900 group-hover:text-mono-600 transition-colors">
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

          {/* Improved Pagination */}
          {isLoaded && totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center">
              <div className="flex items-center gap-2 bg-white rounded-sm shadow-sm border border-mono-200 p-1">
                {/* Previous button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-sm flex items-center justify-center ${
                    currentPage === 1 ? "text-mono-400 cursor-not-allowed" : "text-mono-700 hover:bg-mono-100"
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page numbers - show limited on mobile */}
                <div className="hidden sm:flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    // On larger screens, show all pages if less than 7
                    // Otherwise show first, last, current, and pages around current
                    const pageNum = i + 1
                    const showPage =
                      totalPages <= 7 || pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1

                    // Show ellipsis for gaps
                    const showEllipsisBefore = i === 1 && currentPage > 3
                    const showEllipsisAfter = i === totalPages - 2 && currentPage < totalPages - 2

                    if (showEllipsisBefore || showEllipsisAfter) {
                      return (
                        <span key={`ellipsis-${i}`} className="w-9 flex items-center justify-center text-mono-500">
                          ...
                        </span>
                      )
                    }

                    if (showPage) {
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPage(pageNum)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }}
                          className={`min-w-[36px] h-9 px-3 py-1 text-sm rounded-sm ${
                            currentPage === pageNum ? "bg-mono-900 text-white" : "text-mono-700 hover:bg-mono-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    }

                    return null
                  })}
                </div>

                {/* Mobile page indicator */}
                <div className="sm:hidden px-3 py-1 text-sm text-mono-700">
                  Page {currentPage} of {totalPages}
                </div>

                {/* Next button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-sm flex items-center justify-center ${
                    currentPage === totalPages ? "text-mono-400 cursor-not-allowed" : "text-mono-700 hover:bg-mono-100"
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
