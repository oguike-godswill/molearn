"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ScrollRevealOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  trigger?: string | Element
  scroller?: string | Element
  start?: string
  end?: string
  markers?: boolean
  toggleActions?: string
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const from = options.from ?? { opacity: 0, y: 40 }
      const to = options.to ?? {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }

      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: options.trigger ?? el,
          scroller: options.scroller,
          start: options.start ?? "top 85%",
          end: options.end ?? "top 20%",
          markers: options.markers,
          toggleActions: options.toggleActions ?? "play none none reverse",
        },
      })
    })

    return () => ctx.revert()
  }, [
    options.from,
    options.to,
    options.trigger,
    options.scroller,
    options.start,
    options.end,
    options.markers,
    options.toggleActions,
  ])

  return ref
}
