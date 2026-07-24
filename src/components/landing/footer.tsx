"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Mail, BookOpen, ArrowRight, MapPin, Phone, Globe, Share2 } from "lucide-react"
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
      { lat: 40, lng: 280 },
      { lat: 52, lng: 350 },
      { lat: 22, lng: 300 },
      { lat: 35, lng: 140 },
      { lat: -15, lng: 310 },
      { lat: 51, lng: 10 },
      { lat: 30, lng: 30 },
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
      className="opacity-90 pointer-events-none"
    />
  )
}

// -- Avatar stack --------------------------------------------------------------
const avatarColors = ["#5b6bf7", "#22c55e", "#f97316", "#eab308"]
const avatarInitials = ["SC", "MJ", "LP", "DK"]

function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {avatarInitials.map((init, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
            style={{ backgroundColor: avatarColors[i] }}
          >
            {init}
          </div>
        ))}
      </div>
      <span className="text-sm text-gray-500">Our experts are ready to help!</span>
    </div>
  )
}

// -- Footer link data ----------------------------------------------------------
const quickLinks = [
  { label: "Browse courses", href: "/browse" },
  { label: "Start teaching", href: "/teach" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact us", href: "/contact" },
]

const SocialIcons = {
  Twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  YouTube: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
}

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: SocialIcons.Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: SocialIcons.LinkedIn },
  { label: "YouTube", href: "https://youtube.com", icon: SocialIcons.YouTube },
  { label: "Instagram", href: "https://instagram.com", icon: SocialIcons.Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: SocialIcons.Facebook },
]

const legalLinks = [
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/" },
]

// -- Main Footer --------------------------------------------------------------
export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => { setSubscribed(false); setEmail("") }, 3000)
  }

  return (
    <footer className="relative z-10 bg-transparent">
      {/* Newsletter section */}
      <div className="w-full px-4 pt-16 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl px-8 py-10 text-center"
        >
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Subscribe to our newsletter
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Get weekly updates on new courses, creator tips, and platform news. No spam.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-11 pl-10 pr-3 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#5b6bf7] focus:ring-2 focus:ring-[#5b6bf7]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 bg-[#5b6bf7] hover:bg-[#4a5ae6] text-white text-sm font-semibold rounded-lg transition-colors shrink-0 cursor-pointer shadow-lg shadow-[#5b6bf7]/20"
            >
              {subscribed ? "Subscribed ✓" : "Get started"}
            </button>
          </form>

          <div className="mt-4 flex justify-center">
            <AvatarStack />
          </div>
        </motion.div>
      </div>

      {/* Floating CTA Banner overlapping the dark footer */}
      <div className="max-w-7xl mx-auto px-4 relative z-20 -mb-24 sm:-mb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl bg-[#12111d]"
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between px-8 py-10 sm:px-12 sm:py-14 gap-8">
            <div className="flex-1 max-w-lg">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#5b6bf7]/20 text-[#5b6bf7] border border-[#5b6bf7]/40 mb-4">
                Join 48,000+ Learners
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Experience superior<br />
                <span className="text-[#5b6bf7]">learning, today.</span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-300">
                1,200+ expert-led courses and books — learn at your pace with lifetime access.
              </p>
              <Link href="/browse">
                <button className="mt-6 sm:mt-8 h-12 px-7 bg-white hover:bg-gray-100 text-gray-950 text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:scale-[1.02] active:scale-[0.98] group">
                  Get started now
                  <ArrowRight className="h-4 w-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="relative shrink-0 -mr-8 md:-mr-4 -mb-4">
              <GlobeCanvas />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dark footer links section */}
      <div className="bg-[#08080c] px-4 pt-36 sm:pt-40 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Top grid */}
          <div className="grid gap-10 lg:grid-cols-4 pb-12 border-b border-white/5">
            {/* Brand col */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-xl font-black tracking-tight text-white hover:opacity-90 transition-opacity"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5b6bf7] shadow-lg shadow-[#5b6bf7]/20">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                molearn
              </Link>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-[220px]">
                The marketplace where knowledge meets ambition.
              </p>

              {/* Contact info */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-600 mt-0.5 shrink-0" />
                  <address className="not-italic text-xs text-gray-500 leading-relaxed">
                    12 Knowledge Drive, Suite 400<br />Lagos, Nigeria 10001
                  </address>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-gray-600 shrink-0" />
                  <a href="tel:+2348000000000" className="text-xs text-gray-500 hover:text-white transition-colors">
                    +234-800-000-0000
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-gray-600 shrink-0" />
                  <a href="mailto:hello@molearn.com" className="text-xs text-gray-500 hover:text-white transition-colors">
                    hello@molearn.com
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
                      className="h-8 w-8 rounded-lg bg-white/5 hover:bg-[#5b6bf7]/20 hover:text-[#5b6bf7] border border-white/5 hover:border-[#5b6bf7]/30 flex items-center justify-center text-gray-500 transition-all"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600">Quick links</h4>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-[#5b6bf7]">›</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600">Legal</h4>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-[#5b6bf7]">›</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600">Platform stats</h4>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { value: "1,200+", label: "Courses" },
                  { value: "48K+", label: "Students" },
                  { value: "320+", label: "Teachers" },
                  { value: "4.8★", label: "Avg rating" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-base font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] text-gray-600 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} molearn. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
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
