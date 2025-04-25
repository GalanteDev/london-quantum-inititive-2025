import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { formatDate } from "@/utils/format-date"
import { motion } from "framer-motion"

export type CardProps = {
  title: string
  description?: string
  imageUrl?: string
  date?: string
  tag?: string
  href: string
  priority?: boolean
  aspectRatio?: "16/9" | "4/3" | string
  className?: string
  variant?: "default" | "highlighted"
}

export function Card({
  title,
  description,
  imageUrl,
  date,
  tag,
  href,
  priority = false,
  aspectRatio = "16/9",
  className = "",
  variant = "highlighted",
}: CardProps) {
  const [w, h] = aspectRatio.split("/")
  const paddingTop = `${(Number(h) / Number(w)) * 100}%`

  const baseStyles =
    "group h-full cursor-pointer rounded-sm transition-all duration-300 ease-out overflow-hidden flex flex-col text-white relative"
  const highlightedStyles =
    "bg-black/20 border border-white/10 shadow-sm hover:shadow-md"
  const defaultStyles =
    "bg-black/30 border border-white/10 shadow-sm hover:shadow-md"

  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={
        `${baseStyles} ${
          variant === "highlighted" ? highlightedStyles : defaultStyles
        } ${className}` +
        (variant === "highlighted" ? " hover:border-white/20" : " hover:border-white/20")
      }
      style={
        variant === "highlighted"
          ? { boxShadow: "0 0 8px rgba(255, 255, 255, 0.03)" }
          : {}
      }
    >
      <Link href={href} className="block h-full relative">
        {/* Image container */}
        <div className="relative w-full" style={{ paddingTop }}>
          {tag && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-black/60 text-white">
                {tag}
              </span>
            </div>
          )}

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-102"
            />
          ) : (
            <div className="absolute inset-0 bg-mono-200"></div>
          )}

          {date && (
            <div className="absolute bottom-3 left-3 flex items-center text-white text-xs bg-black/70 px-2.5 py-1 rounded-sm">
              <Calendar className="h-3 w-3 mr-1.5 opacity-80" />
              <span>{formatDate(date)}</span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow pb-12">
          <h3 className="text-lg font-light mb-2 transition-colors line-clamp-1">
            {title}
          </h3>

          {description && (
            <p className="text-sm text-white/60 line-clamp-4 mb-8">
              {description}
            </p>
          )}
        </div>

        {/* Read more fixed bottom-left */}
        <div className="absolute bottom-4 left-4 flex items-center text-sm font-light text-white group-hover:text-white/80 transition-colors duration-300">
          Read more
          <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}
