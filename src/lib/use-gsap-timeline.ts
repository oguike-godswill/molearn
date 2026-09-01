"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface TimelineScene {
  target: string | Element
  vars: gsap.TweenVars
  position?: string | number
}

interface TimelineOptions {
  trigger?: string | Element
  scroller?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
  pin?: boolean | string
  anticipatePin?: number
}

export function useGsapTimeline<T extends HTMLElement>(
  scenes: TimelineScene[],
  options: TimelineOptions = {},
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: options.trigger ?? el,
          scroller: options.scroller,
          start: options.start ?? "top 85%",
          end: options.end ?? "top 20%",
          scrub: options.scrub,
          markers: options.markers,
          toggleActions: options.toggleActions,
          pin: options.pin ? el : undefined,
          anticipatePin: options.anticipatePin,
        },
      })

      scenes.forEach(({ target, vars, position }) => {
        tl.to(target, vars, position)
      })
    })

    return () => ctx.revert()
  }, [scenes, options.trigger, options.scroller, options.start, options.end, options.scrub, options.markers, options.toggleActions, options.pin, options.anticipatePin])

  return ref
}
