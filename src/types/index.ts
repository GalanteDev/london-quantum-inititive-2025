// Type definitions for the application
export interface Post {
  title: string
  slug: string
  date: string
  description?: string
  mainText?: string
  tag?: string[]
  address?: string
  showInNews?: boolean
  photo?: {
    url: string
    title?: string
    description?: string
    width?: number
    height?: number
  }
  speakers?: Speaker
}

export type Feature = {
    title: string
    description: string
    image: string
    link: string
  }
  
  export type NewsEvent = {
    title: string
    description: string
    date: string
    category: string
    imageUrl: string
    slug: string
    speaker?: Speaker
  }
  
  export type QuantumLogoProps = {
    className?: string
    size?: "small" | "medium" | "large" | "xlarge"
    customSize?: { height: number; width: number } | null
    isWhite?: boolean
  }
  
  export type Speaker = {
    name: string;
    photo?: { url: string };
    universityUrl?: string;
    isFounder?: boolean;
    googleScholarUrl?: string;
    biography: string;
  };
  
  export type EventOrNews = {
    title: string;
    slug: string;
    date: string;
    showInNews: boolean;
    description?: string;
    mainText?: string;
    address?: string;
    photo?: { url: string; description?: string };
    speakers?: Speaker[];
  };
  