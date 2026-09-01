"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toast"
import { BookOpen, CheckCircle2, Mail, XCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const forgotQuotes = [
  "Every lock has a key.",
  "Patience is the key to progress.",
  "Don't worry, we've got you covered.",
  "A small setback, a great comeback.",
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const fullTagline = "Trouble signing in?"
  const { toast } = useToast()

  useEffect(() => {
    setTypedText("")
    let i = 0
    const interval = setInterval(() => {
      setTypedText(fullTagline.slice(0, i + 1))
      i++
      if (i >= fullTagline.length) clearInterval(interval)
    }, 35)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % forgotQuotes.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }
      setLoading(false)
      setSent(true)
      toast("Reset link sent to your email", "success")
    } catch {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <div
        className="hidden lg:flex lg:w-1/2 relative sticky top-0 h-screen self-start overflow-hidden border-r border-border"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary/95 via-bg-secondary/50 to-transparent" />

        {/* Cursor glow */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, rgba(91,107,247,0.1), transparent 80%)`,
          }}
        />

        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-[2] bg-border">
          <div className="h-full bg-accent transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-5 h-5 border-t-2 border-l-2 border-accent/30 z-[2]" />
        <div className="absolute top-8 right-8 w-5 h-5 border-t-2 border-r-2 border-accent/30 z-[2]" />
        <div className="absolute bottom-8 left-8 w-5 h-5 border-b-2 border-l-2 border-accent/30 z-[2]" />
        <div className="absolute bottom-8 right-8 w-5 h-5 border-b-2 border-r-2 border-accent/30 z-[2]" />

        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center bg-accent shadow-sm animate-logo-pulse">
              <BookOpen className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-text-primary" style={{ fontFamily: "var(--font-logo)" }}>
              mojetech
            </span>
          </Link>

          <div className="mt-auto space-y-6">
            <div>
              <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">
                {greeting()}
              </p>
              <div className="min-h-[6rem]">
                <h2 className="text-2xl font-semibold text-text-primary leading-tight mb-1">
                  {typedText}<span className="animate-pulse">|</span>
                </h2>
                <p className="text-sm text-text-secondary">
                  &ldquo;{forgotQuotes[quoteIndex]}&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-accent/30 border border-border" />
                  <div className="h-6 w-6 rounded-full bg-accent/20 border border-border" />
                  <div className="h-6 w-6 rounded-full bg-accent/10 border border-border" />
                </div>
                <p className="text-xs text-text-muted">Trusted by students worldwide</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <div className="h-2 w-2 rounded-full bg-border" />
              </div>
              <div className="text-xs text-text-muted">
                &copy; {new Date().getFullYear()} mojetech
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 animate-fade-in">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6 animate-fade-in-up">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-logo)" }}>
              <div className="flex h-8 w-8 items-center justify-center bg-accent animate-logo-pulse">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              mojetech
            </Link>
          </div>

          <div className="lg:hidden relative h-28 overflow-hidden mb-6 rounded border border-border animate-fade-in-up">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary/95 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center px-5">
              <p className="text-xs font-medium text-accent tracking-widest uppercase">{greeting()}</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">Forgot your password?</p>
            </div>
          </div>

          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-2xl font-semibold text-text-primary">Reset your password</h1>
            <p className="mt-2 text-sm text-text-secondary">
              {sent
                ? "Check your inbox for the reset link"
                : "Enter your email and we'll send you a reset link"
              }
            </p>
          </div>

          {sent ? (
            <div className="animate-fade-in-up">
              <div className="flex flex-col items-center text-center py-8">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-text-muted max-w-xs">
                  If an account with that email exists, you&apos;ll receive a password reset link shortly.
                </p>
              </div>
              <div className="text-center">
                <Link href="/login" className="text-sm text-accent hover:text-accent-hover font-medium">
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError("") }}
                    onBlur={() => {
                      setTouched(true)
                      if (!email) setError("Email is required")
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setError("Invalid email format")
                    }}
                    placeholder="you@example.com"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched && !error && email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                  )}
                  {error && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 pointer-events-none" />
                  )}
                </div>
                {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full mt-6 h-11 text-base animate-fade-in-up"
                style={{ animationDelay: "150ms" }}
                loading={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          )}

          {!sent && (
            <p className="mt-8 text-xs text-text-muted text-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              Remember your password?{" "}
              <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
