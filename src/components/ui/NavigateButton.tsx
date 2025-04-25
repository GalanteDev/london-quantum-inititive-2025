"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/utils" // usamos tu util de `cn`, si no lo tenés te paso uno rápido

interface NavigateButtonProps {
  direction: "back" | "forward"
  className?: string
}

export function NavigateButton({ direction, className }: NavigateButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (direction === "back") {
      router.back()
    } else {
      router.forward()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "px-4 py-2 bg-black/30 text-white text-xs font-medium rounded-sm hover:bg-black/40 transition-colors border border-white/10 hover:border-white/15 group inline-flex items-center",
        className
      )}
    >
      {direction === "back" ? (
        <>
          <ChevronLeft className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" />
          Back
        </>
      ) : (
        <>
          Forward
          <ChevronRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  )
}
