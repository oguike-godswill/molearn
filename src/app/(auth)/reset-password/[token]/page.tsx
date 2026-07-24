"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toast"
import { BookOpen, CheckCircle2, Eye, EyeOff, Lock, XCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

function getPasswordStrength(pw: string): { score: number; label: string; color: string; width: string } {
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 8) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500", width: "20%" }
  if (score <= 2) return { score, label: "Fair", color: "bg-orange-500", width: "40%" }
  if (score <= 3) return { score, label: "Good", color: "bg-yellow-500", width: "60%" }
  if (score <= 4) return { score, label: "Strong", color: "bg-lime-500", width: "80%" }
  return { score, label: "Very strong", color: "bg-green-500", width: "100%" }
}

interface Requirement { key: string; label: string; test: (v: string) => boolean }

const requirements: Requirement[] = [
  { key: "min", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { key: "upper", label: "Uppercase & lowercase letters", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { key: "digit", label: "At least one number", test: (v) => /\d/.test(v) },
  { key: "special", label: "At least one special character", test: (v) => /[^a-zA-Z0-9]/.test(v) },
]

const resetQuotes = [
  "A fresh start awaits.",
  "New password, new chapter.",
  "Security is peace of mind.",
  "You're almost there.",
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export default function ResetPasswordPage() {
  const params = useParams()
  const token = params.token as string
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const fullTagline = "Almost there"
  const { toast } = useToast()

  const strength = getPasswordStrength(password)

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
      setQuoteIndex((i) => (i + 1) % resetQuotes.length)
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

  const validate = () => {
    const e: Record<string, string> = {}
    if (!password) e.password = "Password is required"
    else if (password.length < 8) e.password = "Password must be at least 8 characters"
    if (!confirmPassword) e.confirmPassword = "Please confirm your password"
    else if (password !== confirmPassword) e.confirmPassword = "Passwords do not match"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ form: data.error || "Something went wrong" })
        setLoading(false)
        return
      }
      setLoading(false)
      setDone(true)
      toast("Password reset successfully", "success")
    } catch {
      setErrors({ form: "Network error. Please try again." })
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="flex min-h-screen">
        {/* Left sidebar (same structure but static) */}
        <div className="hidden lg:flex lg:w-1/2 relative sticky top-0 h-screen self-start overflow-hidden border-r border-border">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary/95 via-bg-secondary/50 to-transparent" />
          <div className="absolute top-8 left-8 w-5 h-5 border-t-2 border-l-2 border-accent/30 z-[2]" />
          <div className="absolute top-8 right-8 w-5 h-5 border-t-2 border-r-2 border-accent/30 z-[2]" />
          <div className="absolute bottom-8 left-8 w-5 h-5 border-b-2 border-l-2 border-accent/30 z-[2]" />
          <div className="absolute bottom-8 right-8 w-5 h-5 border-b-2 border-r-2 border-accent/30 z-[2]" />

          <div className="relative z-10 flex flex-col h-full p-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center bg-accent shadow-sm animate-logo-pulse">
                <BookOpen className="h-[18px] w-[18px] text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-text-primary" style={{ fontFamily: "var(--font-logo)" }}>
                molearn
              </span>
            </Link>
            <div className="mt-auto space-y-6">
              <div>
                <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">{greeting()}</p>
                <div className="min-h-[6rem]">
                  <h2 className="text-2xl font-semibold text-text-primary leading-tight mb-1">
                    {typedText}<span className="animate-pulse">|</span>
                  </h2>
                  <p className="text-sm text-text-secondary">&ldquo;{resetQuotes[quoteIndex]}&rdquo;</p>
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
                <div className="text-xs text-text-muted">&copy; {new Date().getFullYear()} molearn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - success */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 animate-fade-in">
          <div className="w-full max-w-sm text-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">Password reset</h1>
            <p className="text-sm text-text-muted mb-8">
              Your password has been reset successfully.
            </p>
            <Link href="/login">
              <Button className="h-11 px-8">Sign in with new password</Button>
            </Link>
          </div>
        </div>
      </div>
    )
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

        <div
          className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, rgba(91,107,247,0.1), transparent 80%)`,
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-0.5 z-[2] bg-border">
          <div className="h-full bg-accent transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />
        </div>

        <div className="absolute top-8 left-8 w-5 h-5 border-t-2 border-l-2 border-accent/30 z-[2]" />
        <div className="absolute top-8 right-8 w-5 h-5 border-t-2 border-r-2 border-accent/30 z-[2]" />
        <div className="absolute bottom-8 left-8 w-5 h-5 border-b-2 border-l-2 border-accent/30 z-[2]" />
        <div className="absolute bottom-8 right-8 w-5 h-5 border-b-2 border-r-2 border-accent/30 z-[2]" />

        <div className="relative z-10 flex flex-col h-full p-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center bg-accent shadow-sm animate-logo-pulse">
              <BookOpen className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-text-primary" style={{ fontFamily: "var(--font-logo)" }}>
              molearn
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
                  &ldquo;{resetQuotes[quoteIndex]}&rdquo;
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
                &copy; {new Date().getFullYear()} molearn
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
              molearn
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
              <p className="text-sm font-medium text-text-primary mt-0.5">Set a new password</p>
            </div>
          </div>

          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-2xl font-semibold text-text-primary">Set new password</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Must be at least 8 characters with uppercase, number, and special character.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Password */}
              <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <Label htmlFor="password">New password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })) }}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, password: true }))
                      if (!password) setErrors((p) => ({ ...p, password: "Password is required" }))
                      else if (password.length < 8) setErrors((p) => ({ ...p, password: "Password must be at least 8 characters" }))
                    }}
                    placeholder="Enter new password"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-16 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.password && !errors.password && password && (
                    <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                  )}
                  {touched.password && errors.password && (
                    <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 pointer-events-none" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-bg-elevated border border-border overflow-hidden">
                      <div
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-text-muted w-16 text-right">{strength.label}</span>
                  </div>
                  <div className="space-y-1">
                    {requirements.map((req) => {
                      const met = req.test(password)
                      return (
                        <div key={req.key} className="flex items-center gap-2">
                          {met
                            ? <CheckCircle2 className="h-3 w-3 text-green-500" />
                            : <XCircle className="h-3 w-3 text-text-muted" />
                          }
                          <span className={`text-[11px] ${met ? "text-green-500" : "text-text-muted"}`}>
                            {req.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Confirm password */}
              <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: "" })) }}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, confirmPassword: true }))
                      if (!confirmPassword) setErrors((p) => ({ ...p, confirmPassword: "Please confirm your password" }))
                      else if (password !== confirmPassword) setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match" }))
                    }}
                    placeholder="Re-enter new password"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-16 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.confirmPassword && !errors.confirmPassword && confirmPassword && password === confirmPassword && (
                    <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                  )}
                  {touched.confirmPassword && errors.confirmPassword && (
                    <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 pointer-events-none" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
                {confirmPassword && password !== confirmPassword && !errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                )}
              </div>
            </div>

            {errors.form && <p className="mt-4 text-xs text-red-400 text-center">{errors.form}</p>}

            <Button
              type="submit"
              className="w-full mt-6 h-11 text-base animate-fade-in-up"
              style={{ animationDelay: "250ms" }}
              loading={loading}
            >
              {loading ? "Resetting..." : "Reset password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
