"use client"

import { Tag } from "lucide-react"
import { getCategoryColor } from "@/lib/utils/tags"

interface Props {
  tags?: string[]
}

export function EventTags({ tags }: Props) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-8">
      <span className="text-sm text-mono-600 flex items-center">
        <Tag className="h-3.5 w-3.5 mr-1.5" />
        Tags:
      </span>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(tag)}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
