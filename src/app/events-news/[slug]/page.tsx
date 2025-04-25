"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
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
import { NavigateButton } from "@/components/ui/NavigateButton";

export default function EventNewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [speakers, setSpeakers] = useState<any[] | null>(null);
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
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

  const getViewAllUrl = () => {
    if (!event) return "/events-news";
    const tag = Array.isArray(event.tag)
      ? event.tag.find((t) => t === "Events" || t === "Papers")
      : event.tag;
    if (referrer?.includes("/research") && tag === "Events") {
      return "/events-news?filter=Events";
    }
    if (tag === "Papers") {
      return "/events-news?filter=Papers";
    }
    return "/events-news";
  };

  const formatDate = (dateString: string, withYear = true) => {
    if (!dateString) return "";
    try {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        ...(withYear && { year: "numeric" }),
      };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", options);
    } catch {
      return "";
    }
  };

  const getDateDisplay = () => {
    if (!event?.date) return "";
    if (!event.dateTo) return formatDate(event.date, true);
    return `${formatDate(event.date, false)} - ${formatDate(event.dateTo, true)}`;
  };

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

  const viewAllButtonText =
    Array.isArray(event.tag) && event.tag.includes("Events")
      ? "View All Events"
      : Array.isArray(event.tag) && event.tag.includes("Papers")
      ? "View All Papers"
      : "View All News And Events";

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-0 md:pt-24 relative overflow-hidden border-b border-white/5 bg-black">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        {/* Content */}
        <div className="w-[90%] max-w-4xl mx-auto relative z-10">
          
          {/* Back and Tags in a Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <NavigateButton direction="back" className="px-3 py-1 h-7 text-xs bg-black/30 border border-white/10 hover:bg-black/40 hover:border-white/20 transition-colors rounded-sm" />

            {event.tag && (
              Array.isArray(event.tag) ? event.tag.map(tag => (
                <span key={tag} className="px-3 py-1 h-7 text-xs bg-black/40 text-white rounded-sm border border-white/10 flex items-center">
                  {tag}
                </span>
              )) : (
                <span className="px-3 py-1 h-7 text-xs bg-black/40 text-white rounded-sm border border-white/10 flex items-center">
                  {event.tag}
                </span>
              )
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl pl-1 sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-3">
            {event.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-white/70 gap-3 mb-5">
            {event.date && (
              <div className="flex items-center bg-black/40 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>{getDateDisplay()}</span>
              </div>
            )}
            {event.address && (
              <div className="flex items-center bg-black/40 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                <span>{event.address}</span>
              </div>
            )}
            {event.pageUrl && (
              <div className="flex items-center bg-black/40 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                <Globe className="h-3.5 w-3.5 mr-1.5" />
                <Link href={event.pageUrl} target="_blank" className="hover:underline">
                  {event.pageUrl}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="w-[90%] max-w-4xl mx-auto relative z-10">

          {/* Description */}
          {event.description && (
            <div className="mb-6 bg-black/30 p-4 sm:p-5 rounded-sm border border-white/10">
              <p className="text-base sm:text-lg text-white/90">{event.description}</p>
            </div>
          )}

          {/* Featured Image */}
          {event.photo?.url && (
            <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-sm border border-white/10">
              <Image src={event.photo.url} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>
          )}

          {/* Main Text (if available) */}
          {event.mainText && (
            <div className="prose prose-invert max-w-none bg-black/20 p-5 rounded-sm border border-white/5 mb-8">
              <div dangerouslySetInnerHTML={{ __html: event.mainText }} />
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button className="inline-flex items-center text-xs text-white/70 hover:text-white transition-colors bg-black/20 px-3 py-2 rounded-sm border border-white/5 hover:border-white/10">
              <Share2 className="h-4 w-4 mr-1.5" />
              Share
            </button>

            <Link
              href={getViewAllUrl()}
              className="inline-flex items-center px-4 py-2 bg-black/30 text-white text-xs font-medium rounded-sm hover:bg-black/40 transition-colors border border-white/10 hover:border-white/15 group"
            >
              {viewAllButtonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
