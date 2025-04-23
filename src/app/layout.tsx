import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "London Quantum Universe Initiative",
  description:
    "Advancing our understanding of the quantum universe through research, training, and teaching excellence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased overflow-x-hidden overscroll-behavior-none">{children}</body>
    </html>
  )
}
