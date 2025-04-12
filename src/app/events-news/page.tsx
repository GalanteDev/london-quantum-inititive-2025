"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { formatDate } from "@/utils/format-date"
import Navbar from "@/components/sections/navbar-section"
import { FooterSection } from "@/components/sections/footer-section"
import { getAllPosts } from "@/lib/contentful/fetch-posts"
import { FadeInOnScroll } from "@/components/scroll-effects/FadeInOnScroll"
import { ParallaxEffect } from "@/components/scroll-effects/ParallaxEffect"
import { Post } from "@/types"


export default function EventsNewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllPosts()
      setPosts(data)
    }
    fetch()
  }, [])

  const getCategoryColor = (tag: string | undefined) => {
    switch (tag?.toLowerCase()) {
      case "research":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200"
      case "news":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      case "workshop":
        return "bg-amber-100 text-amber-800 border border-amber-200"
      case "events":
        return "bg-rose-100 text-rose-800 border border-rose-200"
      case "conference":
        return "bg-purple-100 text-purple-800 border border-purple-200"
      default:
        return "bg-mono-100 text-mono-800 border border-mono-200"
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase())
    const matchTag = selectedTag === "all" || post.tag?.includes(selectedTag)
    return matchSearch && matchTag
  })

  const totalPages = Math.ceil(filteredPosts.length / perPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * perPage, currentPage * perPage)
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tag || [])))

  return (
    <div className="min-h-screen bg-mono-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-mono-100 relative overflow-hidden">
        <ParallaxEffect speed={0.05} className="absolute inset-0 pointer-events-none">
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
        </ParallaxEffect>

        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-mono-900 mb-4">News & Events</h1>
          <p className="text-mono-600 text-lg sm:text-xl">
            Stay updated with our latest research, events and announcements.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              selectedTag === "all"
                ? "bg-mono-900 text-white"
                : "bg-mono-200 text-mono-700 hover:bg-mono-300"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag)
                setCurrentPage(1)
              }}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? getCategoryColor(tag)
                  : "bg-mono-200 text-mono-700 hover:bg-mono-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mono-400" />
            <input
              type="text"
              placeholder="Search news and events..."
              className="w-full pl-10 pr-4 py-2 border border-mono-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-mono-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {currentPosts.length === 0 ? (
            <div className="text-center text-mono-600 py-20">No results found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post, index) => {
                const tag = Array.isArray(post.tag) ? post.tag[0] : post.tag

                return (
                  <FadeInOnScroll
                    key={post.slug}
                    threshold={0.15}
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={0.1 * (index % 3)}
                    duration={0.6}
                    className="h-full"
                  >
                    <Link
                      href={`/events-news/${post.slug}`}
                      className="group bg-white rounded-sm shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
                    >
                      <div className="relative h-48 bg-mono-200 overflow-hidden">
                        {tag && (
                          <div className="absolute top-2 left-2 z-10">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                                tag
                              )}`}
                            >
                              {tag}
                            </span>
                          </div>
                        )}
                        <div
                          className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${post.photo?.url || "/placeholder.svg"})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white text-xs flex items-center">
                          <Calendar className="w-4 h-4 mr-1 opacity-80" />
                          {formatDate(post.date)}
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-medium text-mono-900 mb-1 group-hover:text-mono-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-mono-600 line-clamp-3 mb-4">{post.description}</p>
                        <div className="mt-auto inline-flex items-center text-sm font-medium text-mono-900 group-hover:text-mono-600 transition-colors">
                          Read more <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </FadeInOnScroll>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded-sm border ${
                    currentPage === i + 1
                      ? "bg-mono-900 text-white"
                      : "bg-white text-mono-700 hover:bg-mono-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
