"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  MapPin,
  Share2,
  ExternalLink,
  ArrowRight,
  Globe,
} from "lucide-react";
import Navbar from "@/components/sections/navbar-section";
import { FooterSection } from "@/components/sections/footer-section";
import type { Post } from "@/types";
import { getPostBySlug } from "@/lib/contentful/fetch-posts";

export default function EventNewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [speakers, setSpeakers] = useState<any[] | null>(null);
  const [referrer, setReferrer] = useState<string | null>(null);

  // Function to format a date without year
  const formatDateWithoutYear = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      });
    } catch (e) {
      console.error("Error formatting date without year:", e);
      return "";
    }
  };

  // Function to format a date with year
  const formatDateWithYear = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date with year:", e);
      return "";
    }
  };

  // Function to display date range
  const getDateDisplay = () => {
    if (!event?.date) return "";

    // If no end date, just show start date with year
    if (!event.dateTo) return formatDateWithYear(event.date);

    // For date range, show first date without year and second date with year
    const startDate = formatDateWithoutYear(event.date);
    const endDate = formatDateWithYear(event.dateTo);

    return `${startDate} - ${endDate}`;
  };

  // Function to handle back button click
  const handleBackClick = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };

  // Determine the URL for "View all news & events" based on the event type
  const getViewAllUrl = () => {
    if (!event) return "/events-news";

    // Check if the event has a tag "Events" or "Papers"
    const tag = Array.isArray(event.tag)
      ? event.tag.find((t) => t === "Events" || t === "Papers")
      : event.tag;

    // If coming from research page and it's an event, apply filter
    if (referrer?.includes("/research") && tag === "Events") {
      return "/events-news?filter=Events";
    }

    // If it's a paper, apply Papers filter
    if (tag === "Papers") {
      return "/events-news?filter=Papers";
    }

    // Default case
    return "/events-news";
  };

  useEffect(() => {
    // Store the referrer when component mounts
    if (document.referrer) {
      setReferrer(document.referrer);
    }

    const fetchEvent = async () => {
      const slug = params?.slug as string;
      if (!slug) return;

      try {
        const item = await getPostBySlug(slug);

        if (!item) return router.push("/events-news");

        setEvent(item);
        setIsLoaded(true);
        setSpeakers(item.speakersCollection?.items || null);
      } catch (err) {
        console.error("Error fetching post by slug:", err);
        router.push("/events-news");
      }
    };

    fetchEvent();
  }, [params?.slug, router]);

  if (!isLoaded || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-lg flex flex-col items-center">
          <div className="w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-full animate-spin mb-3"></div>
          <span className="text-white/80">Loading content...</span>
        </div>
      </div>
    );
  }

  // Determine the button text based on the event type
  const viewAllButtonText =
    Array.isArray(event.tag) && event.tag.includes("Events")
      ? "View all events"
      : Array.isArray(event.tag) && event.tag.includes("Papers")
      ? "View all papers"
      : "View all news & events";

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-0 md:pt-24 relative overflow-hidden border-b border-white/5 bg-black">
        {/* Background grid */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>

        {/* Subtle background pattern - static version */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                     linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="w-[90%] max-w-4xl mx-auto relative z-10">
          {/* Back link - Modified to use router.back() */}
          <button
            onClick={handleBackClick}
            className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors mb-4 group bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Tags */}
          {event.tag && (
            <div className="flex flex-wrap gap-2 mb-2">
              {Array.isArray(event.tag) ? (
                event.tag.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-black/40 text-white border border-white/10"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-black/40 text-white border border-white/10">
                  {event.tag}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-3">
            {event.title}
          </h1>

          {/* Meta info in a row */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-white/70 gap-3 mb-5">
            {event.date && (
              <div className="flex items-center bg-black/40 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-white/70" />
                <span>{getDateDisplay()}</span>
              </div>
            )}

            {event.address && (
              <div className="flex items-center bg-black/40 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-white/70" />
                <span className="line-clamp-1">{event.address}</span>
              </div>
            )}

            {event.pageUrl && (
              <div className="flex items-center bg-black/40 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                <Globe className="h-3.5 w-3.5 mr-1.5 text-white/70" />
                <Link
                  href={event.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:underline"
                >
                  {event.pageUrl}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-6 md:py-8">
        <div className="w-[90%] max-w-4xl mx-auto text-justify relative z-10">
          {/* Description */}
          {event.description && (
            <div className="mb-6 bg-black/30 p-4 sm:p-5 rounded-sm border border-white/10 backdrop-blur-sm">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Featured image */}
          {event.photo?.url && (
            <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-sm border border-white/10">
              <Image
                src={event.photo.url || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>
          )}

          {/* Main Text (HTML) */}
          {event.mainText && (
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none bg-black/20 p-4 sm:p-5 rounded-sm border border-white/5 mb-8">
              <div
                dangerouslySetInnerHTML={{ __html: event.mainText }}
                className="prose-img:rounded-sm prose-img:mx-auto prose-headings:text-white prose-headings:font-light prose-p:text-white/80"
              />
            </div>
          )}

          {/* Speaker list */}
          {speakers && speakers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-light text-white mb-3 flex items-center">
                <span className="w-6 h-px bg-white/30 mr-2"></span>
                {Array.isArray(event.tag) && event.tag.includes("Events")
                  ? "LQ Members Involved"
                  : "Researchers"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-sm overflow-hidden border border-white/10 p-4 flex items-start gap-4 hover:border-white/20 transition-colors duration-300 backdrop-blur-sm"
                  >
                    {speaker.photo?.url && (
                      <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                        <Image
                          src={speaker.photo.url || "/placeholder.svg"}
                          alt={speaker.name || "Speaker"}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        className="font-medium text-white text-base hover:text-white/80 transition-colors inline-block"
                        href={
                          `/about/${speaker.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}` || ""
                        }
                      >
                        {speaker.name}
                      </Link>

                      <div className="w-10 h-px bg-white/10 my-1.5"></div>

                      {/* Institución */}
                      {speaker.institution && (
                        <p className="text-white/70 text-xs mb-1 truncate">
                          {speaker.institution}
                        </p>
                      )}

                      {/* Biografía */}
                      {speaker.biography && (
                        <p className="text-white/60 text-xs mb-2 line-clamp-2">
                          {speaker.biography}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mt-2">
                        {/* Google Scholar */}
                        {speaker.googleScholarUrl && (
                          <a
                            href={speaker.googleScholarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1 transition-colors bg-white/5 px-2 py-1 rounded-sm hover:bg-white/10"
                          >
                            Google Scholar
                            <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        )}

                        {/* University Profile */}
                        {speaker.universityUrl && (
                          <a
                            href={speaker.universityUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1 transition-colors bg-white/5 px-2 py-1 rounded-sm hover:bg-white/10"
                          >
                            University
                            <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer with share and back to all events */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button className="inline-flex items-center text-xs text-white/70 hover:text-white transition-colors bg-black/20 px-3 py-2 rounded-sm border border-white/5 hover:border-white/10">
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share this {event.tag}
            </button>

            {/* Link to all news & events with dynamic URL based on context */}
            <Link
              href={getViewAllUrl()}
              className="inline-flex items-center px-4 py-2 bg-black/30 text-white text-xs font-medium rounded-sm hover:bg-black/40 transition-colors border border-white/10 hover:border-white/15 group"
            >
              {viewAllButtonText}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
