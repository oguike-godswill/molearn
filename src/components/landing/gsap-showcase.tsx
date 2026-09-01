"use client"

import { useScrollReveal } from "@/lib/use-scroll-reveal"
import { useParallax } from "@/lib/use-parallax"
import { useGsapTimeline } from "@/lib/use-gsap-timeline"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

function Counter({ end, label }: { end: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        { value: 0 },
        { value: 0 },
        {
          value: end,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            setDisplayed(Math.round(gsap.getProperty(el, "--num") as number))
          },
        },
      )
    })

    return () => ctx.revert()
  }, [end])

  return (
    <span ref={ref} style={{ "--num": 0 } as React.CSSProperties}>
      {displayed}{label}
    </span>
  )
}

export function GsapShowcase() {
  const reveal1 = useScrollReveal<HTMLDivElement>({ start: "top 80%" })
  const reveal2 = useScrollReveal<HTMLDivElement>({ start: "top 80%" })
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.4 })
  const timelineRef = useGsapTimeline<HTMLDivElement>(
    [
      { target: ".bar-1", vars: { scaleY: 1, duration: 0.6, ease: "back.out(1.7)", transformOrigin: "bottom center" } },
      { target: ".bar-2", vars: { scaleY: 1, duration: 0.6, ease: "back.out(1.7)", transformOrigin: "bottom center" } },
      { target: ".bar-3", vars: { scaleY: 1, duration: 0.6, ease: "back.out(1.7)", transformOrigin: "bottom center" } },
      { target: ".bar-4", vars: { scaleY: 1, duration: 0.6, ease: "back.out(1.7)", transformOrigin: "bottom center" } },
      { target: ".bar-5", vars: { scaleY: 1, duration: 0.6, ease: "back.out(1.7)", transformOrigin: "bottom center" } },
    ],
    { start: "top 75%", scrub: 0.5 },
  )

  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div className="w-full px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 backdrop-blur-sm px-3 py-1.5 text-xs text-accent rounded-full mb-4 tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            GSAP + Lenis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Smooth as <span className="text-accent">silk</span>
          </h2>
          <p className="mt-4 text-sm text-text-secondary max-w-md mx-auto">
            Scroll-triggered animations powered by GSAP and Lenis smooth scrolling.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div
            ref={reveal1}
            className="bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl p-6"
          >
            <h3 className="font-semibold mb-2">Scroll Reveal</h3>
            <p className="text-sm text-text-secondary">
              Elements fade and slide up as they enter the viewport — powered by GSAP ScrollTrigger.
            </p>
          </div>
          <div
            ref={reveal2}
            className="bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl p-6"
          >
            <h3 className="font-semibold mb-2">Counters</h3>
            <p className="text-sm text-text-secondary">
              Numbers animate on scroll: <Counter end={128} label="+" /> students, <Counter end={47} label="" /> courses.
            </p>
          </div>
          <div className="bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 relative overflow-hidden">
            <h3 className="font-semibold mb-2 relative z-10">Parallax</h3>
            <p className="text-sm text-text-secondary relative z-10">
              Layers move at different speeds as you scroll for depth.
            </p>
            <div
              ref={parallaxRef}
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-accent/10 border border-accent/20"
            />
          </div>
        </div>

        <div ref={timelineRef} className="bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl p-8">
          <h3 className="font-semibold mb-6 text-center">Timeline — scrub on scroll</h3>
          <div className="flex items-end justify-center gap-3 h-40">
            {[60, 85, 45, 95, 70].map((h, i) => (
              <div
                key={i}
                className={`bar-${i + 1} w-10 bg-accent/80 rounded-t-md`}
                style={{ height: `${h}%`, transform: "scaleY(0)" }}
              />
            ))}
          </div>
          <p className="text-xs text-text-muted text-center mt-4">
            Bars animate to height as you scroll — scrubbing back and forth.
            <span className="block mt-1 text-accent text-[10px] tracking-widest uppercase">
              ← scroll up & down →
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
