"use client"

import { Tag } from "lucide-react"
import { getCategoryColor } from "@/lib/utils/tags"

interface Props {
  tags?: string[] | string
}

export function EventTags({ tags }: Props) {
  if (!tags) return null

  // Handle both string and array formats
  const tagArray = Array.isArray(tags) ? tags : [tags]

  if (tagArray.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-xs sm:text-sm text-mono-600 flex items-center">
        <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5" />
        Tags:
      </span>
      {tagArray.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getCategoryColor(tag)} transition-colors hover:opacity-90`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
