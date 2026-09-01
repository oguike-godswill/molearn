"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ParallaxOptions {
  speed?: number
  start?: string
  end?: string
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const speed = options.speed ?? 0.3

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: `${-speed * 100}%` },
        {
          y: `${speed * 100}%`,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top bottom",
            end: options.end ?? "bottom top",
            scrub: 1,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [options.speed, options.start, options.end])

  return ref
}
