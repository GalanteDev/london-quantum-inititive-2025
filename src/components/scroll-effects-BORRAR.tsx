// "use client"

// import { useEffect, useRef, useState } from "react"

// // Componente para animar elementos cuando entran en el viewport
// export function FadeInOnScroll({
//   children,
//   className = "",
//   threshold = 0.1,
//   direction = "up", // up, down, left, right
//   delay = 0,
//   duration = 0.5,
//   once = true,
// }) {
//   const [isVisible, setIsVisible] = useState(false)
//   const ref = useRef(null)

//   // Configurar las transformaciones iniciales según la dirección
//   const getInitialTransform = () => {
//     switch (direction) {
//       case "up":
//         return "translateY(20px)"
//       case "down":
//         return "translateY(-20px)"
//       case "left":
//         return "translateX(20px)"
//       case "right":
//         return "translateX(-20px)"
//       default:
//         return "translateY(20px)"
//     }
//   }

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//           if (once) observer.disconnect()
//         } else if (!once) {
//           setIsVisible(false)
//         }
//       },
//       {
//         root: null,
//         rootMargin: "0px",
//         threshold,
//       },
//     )

//     const currentRef = ref.current
//     if (currentRef) {
//       observer.observe(currentRef)
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef)
//       }
//     }
//   }, [threshold, once])

//   return (
//     <div
//       ref={ref}
//       className={`transition-all ${className}`}
//       style={{
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
//         transitionDuration: `${duration}s`,
//         transitionDelay: `${delay}s`,
//         transitionProperty: "opacity, transform",
//         transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
//       }}
//     >
//       {children}
//     </div>
//   )
// }

// // Componente para efecto de parallax sutil
// export function ParallaxEffect({
//   children,
//   className = "",
//   speed = 0.1, // Velocidad del efecto parallax (0-1)
//   direction = "up", // up, down
// }) {
//   const [scrollY, setScrollY] = useState(0)
//   const ref = useRef(null)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY)
//     }

//     // Agregar event listener con passive true para mejor rendimiento
//     window.addEventListener("scroll", handleScroll, { passive: true })

//     // Cleanup
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const parallaxStyle = {
//     transform: `translateY(${direction === "up" ? -scrollY * speed : scrollY * speed}px)`,
//     transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
//   }

//   return (
//     <div ref={ref} className={`will-change-transform ${className}`} style={parallaxStyle}>
//       {children}
//     </div>
//   )
// }
