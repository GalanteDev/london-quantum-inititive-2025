export const CATEGORY_COLORS: Record<TagCategory, string> = {
    research: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    news: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    workshop: "bg-amber-100 text-amber-800 border border-amber-200",
    events: "bg-rose-100 text-rose-800 border border-rose-200",
    conference: "bg-purple-100 text-purple-800 border border-purple-200",
  }
  
  export type TagCategory =
    | "research"
    | "news"
    | "workshop"
    | "events"
    | "conference"
  
  // Tag safe resolver with fallback
  export const getCategoryColor = (tag: string | undefined): string => {
    const key = tag?.toLowerCase() as TagCategory
    return CATEGORY_COLORS[key] ?? "bg-mono-100 text-mono-800 border border-mono-200"
  }
  