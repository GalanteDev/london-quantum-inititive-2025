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
    name?: string
    biography?: string | null
    researchInterests?: string | null
    googleScholarUrl?: string | null
    position?: Position[] | null
    member?: boolean | null
    institution?: string | null
    country?: string | null
    photo?: {
      url: string
    } | null
    phdInstitution?: string
    nextJob?: string
    phdSupervisor?: string
    fellowship?: string
    slug?: string
    universityPosition: string
    email: string
    universityLogo: {
      url: string
    }
  }

  export enum Position {
    PrincipalInvestigator = "principal-investigator",
    ResearchAssociate = "research-associate",
    PostGraduateStudent = "post-graduate-student",
  }
  
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
  