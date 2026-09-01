"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Mail, BookOpen, ArrowRight, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

// -- Dotted Globe Canvas -------------------------------------------------------
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let rotation = 0

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const R = Math.min(W, H) * 0.44

    const points: { lat: number; lng: number }[] = []
    for (let lat = -80; lat <= 80; lat += 12) {
      const lngStep = Math.max(8, Math.round(12 / Math.cos((lat * Math.PI) / 180)))
      for (let lng = 0; lng < 360; lng += lngStep) {
        points.push({ lat, lng })
      }
    }

    const pins = [
      { lat: 6.5, lng: 3.4 },
      { lat: 9, lng: 7.5 },
      { lat: 40, lng: 280 },
      { lat: 52, lng: 350 },
      { lat: 35, lng: 140 },
    ]

    function project(lat: number, lng: number, rot: number) {
      const lngRad = ((lng + rot) * Math.PI) / 180
      const latRad = (lat * Math.PI) / 180
      const x3 = Math.cos(latRad) * Math.sin(lngRad)
      const y3 = Math.sin(latRad)
      const z3 = Math.cos(latRad) * Math.cos(lngRad)
      return { x: cx + R * x3, y: cy - R * y3, z: z3 }
    }

    const c = ctx

    function draw() {
      c.clearRect(0, 0, W, H)

      const arcStart = -Math.PI * 0.75
      const arcEnd = Math.PI * 0.05
      const grad = c.createLinearGradient(
        cx + R * Math.cos(arcStart),
        cy + R * Math.sin(arcStart),
        cx + R * Math.cos(arcEnd),
        cy + R * Math.sin(arcEnd)
      )
      grad.addColorStop(0, "#22c55e")
      grad.addColorStop(0.5, "#eab308")
      grad.addColorStop(1, "#f97316")
      c.beginPath()
      c.arc(cx, cy, R + 4, arcStart, arcEnd)
      c.strokeStyle = grad
      c.lineWidth = 2.5
      c.stroke()

      for (const p of points) {
        const { x, y, z } = project(p.lat, p.lng, rotation)
        if (z < 0) continue
        const alpha = 0.15 + z * 0.55
        c.beginPath()
        c.arc(x, y, 1.2, 0, Math.PI * 2)
        c.fillStyle = `rgba(200,210,255,${alpha})`
        c.fill()
      }

      for (const p of pins) {
        const { x, y, z } = project(p.lat, p.lng, rotation)
        if (z < 0.1) continue
        const alpha = 0.4 + z * 0.6
        c.beginPath()
        c.arc(x, y, 3.5, 0, Math.PI * 2)
        c.fillStyle = `rgba(91,107,247,${alpha})`
        c.fill()
        c.beginPath()
        c.arc(x, y, 6, 0, Math.PI * 2)
        c.strokeStyle = `rgba(91,107,247,${alpha * 0.4})`
        c.lineWidth = 1
        c.stroke()
      }

      rotation += 0.12
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={380}
      className="opacity-90 pointer-events-none w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px]"
    />
  )
}

// -- Footer link data ----------------------------------------------------------
const programsLinks = [
  { label: "Digital Marketing", href: "/programs/digital-marketing" },
  { label: "Design", href: "/programs/design" },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/#pricing" },
]

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
]

const SocialIcons = {
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  LinkedIn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  Twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  YouTube: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  TikTok: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" />
    </svg>
  ),
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: SocialIcons.Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: SocialIcons.LinkedIn },
  { label: "Twitter", href: "https://twitter.com", icon: SocialIcons.Twitter },
  { label: "YouTube", href: "https://youtube.com", icon: SocialIcons.YouTube },
  { label: "TikTok", href: "https://tiktok.com", icon: SocialIcons.TikTok },
]

// -- Main Footer --------------------------------------------------------------
export function Footer() {
  return (
    <footer className="relative z-10 bg-transparent">
      {/* Floating CTA Banner overlapping the dark footer */}
      <div className="max-w-7xl mx-auto px-4 relative z-20 -mb-20 sm:-mb-24 md:-mb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl bg-bg-secondary"
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 gap-6 sm:gap-8">
            <div className="flex-1 max-w-lg">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/40 mb-4">
                Join 5,000+ Young Nigerians
              </span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight">
                Start your digital<br />
                <span className="text-accent">skills journey.</span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-text-secondary">
                Practical training in digital marketing, design, and more — built for the Nigerian market.
              </p>
              <Link href="/programs">
                <button className="mt-6 sm:mt-8 h-12 px-7 bg-white hover:bg-gray-100 text-gray-950 text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:scale-[1.02] active:scale-[0.98] group">
                  Explore programs
                  <ArrowRight className="h-4 w-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="relative shrink-0 -mr-4 md:-mr-4 -mb-4 hidden sm:block">
              <GlobeCanvas />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dark footer links section */}
      <div className="bg-bg-primary px-4 pt-28 sm:pt-32 md:pt-36 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Top grid */}
          <div className="grid gap-10 lg:grid-cols-4 pb-12 border-b border-white/5">
            {/* Brand col */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-xl font-black tracking-tight text-text-primary hover:opacity-90 transition-opacity"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/20">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                mojetech
              </Link>
              <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-[220px]">
                Training young Nigerians in practical digital skills
              </p>

              {/* Contact info */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-text-muted mt-0.5 shrink-0" />
                  <address className="not-italic text-xs text-text-muted leading-relaxed">
                    Lagos, Nigeria
                  </address>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-text-muted shrink-0" />
                  <a href="tel:+2348000000000" className="text-xs text-text-muted hover:text-text-primary transition-colors">
                    +234-800-000-0000
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-text-muted shrink-0" />
                  <a href="mailto:hello@mojetech.com" className="text-xs text-text-muted hover:text-text-primary transition-colors">
                    hello@mojetech.com
                  </a>
                </div>
              </div>

              {/* Social icons */}
              <div className="mt-6 flex items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="h-8 w-8 rounded-lg bg-white/5 hover:bg-accent/20 hover:text-accent border border-white/5 hover:border-accent/30 flex items-center justify-center text-text-muted transition-all"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Programs links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Programs</h4>
              <ul className="mt-4 space-y-3">
                {programsLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-accent">›</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Company</h4>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-accent">›</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Legal</h4>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-accent">›</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} MojeTech. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-xs text-text-muted hover:text-text-secondary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
