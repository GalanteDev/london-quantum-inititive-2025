import Image from "next/image"
import type { QuantumLogoProps } from "@/types"

export function QuantumLogo({ className = "", size = "medium", customSize = null, isWhite = false }: QuantumLogoProps) {
  type SizeKey = "small" | "medium" | "large" | "xlarge" | "custom"

  const dimensions = {
    small: { height: 40, width: 120 },
    medium: { height: 60, width: 180 },
    large: { height: 80, width: 240 },
    xlarge: { height: 140, width: 420 },
    custom: customSize || { height: 60, width: 180 },
  }

  const selectedSize = (customSize ? "custom" : size) as SizeKey
  const logoSrc = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/losgos2-cnr2laMSCg9CEgZbUDH99IRnunh0F7.png"

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-105">
        <div className={`relative ${isWhite ? "invert brightness-200 contrast-200" : ""}`}>
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="London Quantum Universe Initiative Logo"
            width={dimensions[selectedSize].width}
            height={dimensions[selectedSize].height}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}
