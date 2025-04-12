// src/app/page.tsx
"use client";

import Navbar from "@/components/sections/navbar-section";
import { HeroSection } from "@/components/sections/hero-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FooterSection } from "@/components/sections/footer-section";
import { NewsEvent, Post } from "@/types";

import { useEffect, useState } from 'react';

import { HighlightedNewsEvents } from "@/components/sections/highlighted-news-events";
import { fetchHighlightedEventsNews } from "@/lib/contentful/fetch-posts";

export default function Home() {
  const [highlightedNewsEvents, setHighlightedNewsEvents] = useState<Post[]>([]);


  useEffect(() => {
    const fetchData = async () => {

      try {
        const data = await fetchHighlightedEventsNews();
        setHighlightedNewsEvents(data);
        console.log("Fetched highlighted posts:", data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
      } finally {
      }
    };

    fetchData();
   
  }, []);

 
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HighlightedNewsEvents newsEvents={highlightedNewsEvents} />
      <QuoteSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}