"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Toggle } from "@/components/ui/toggle"
import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { BookOpen, CheckCircle2, Eye, EyeOff, GraduationCap, Lock, Mail, Presentation, User, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

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

const registerQuotes = [
  "Start your journey today.",
  "Every expert was once a beginner.",
  "Knowledge shared is knowledge doubled.",
  "The best time to start is now.",
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [shake, setShake] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const { toast } = useToast()

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const fullTagline = "Start learning today"

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
      setQuoteIndex((i) => (i + 1) % registerQuotes.length)
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

  const strength = getPasswordStrength(form.password)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Full name is required"
    if (!form.email) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format"
    if (!form.password) e.password = "Password is required"
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters"
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password"
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match"
    if (!role) e.role = "Please select a role"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          password: form.password,
          role: role.toUpperCase(),
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        toast(data.error || "Registration failed", "error")
        return
      }
      toast("Account created successfully", "success")
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      })
      if (result?.ok) {
        router.push("/dashboard/" + role.toLowerCase())
      } else {
        router.push("/login")
      }
    } catch {
      toast("Something went wrong", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleSocial = async (provider: string) => {
    setSocialLoading(provider)
    await signIn(provider, { redirectTo: "/dashboard" })
    setSocialLoading(null)
  }

  const updateField = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }))
    setErrors((p) => ({ ...p, [field]: "" }))
  }

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div
        className="hidden lg:flex lg:w-1/2 relative sticky top-0 h-screen self-start overflow-hidden border-r border-border"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
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
                  &ldquo;{registerQuotes[quoteIndex]}&rdquo;
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
                <p className="text-xs text-text-muted">Join 5,000+ learners</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-border" />
                <div className="h-2 w-2 rounded-full bg-accent" />
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
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary/95 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center px-5">
              <p className="text-xs font-medium text-accent tracking-widest uppercase">{greeting()}</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">Join molearn today</p>
            </div>
          </div>

          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-2xl font-semibold text-text-primary">Create your account</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Already registered?{" "}
              <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={cn(shake && "animate-shake")}>
            <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <Button
                type="button"
                variant="secondary"
                className="h-11 gap-2.5 hover:bg-[#24292e] hover:text-white hover:border-[#24292e] transition-all duration-150"
                loading={socialLoading === "github"}
                onClick={() => handleSocial("github")}
              >
                <GitHubIcon />
                GitHub
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="h-11 gap-2.5 hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] transition-all duration-150"
                loading={socialLoading === "google"}
                onClick={() => handleSocial("google")}
              >
                <GoogleIcon />
                Google
              </Button>
            </div>

            <div className="relative my-6 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-bg-primary px-2 text-text-muted">or register with email</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <Label htmlFor="name">Full name</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, name: true }))
                      if (!form.name.trim()) setErrors((p) => ({ ...p, name: "Full name is required" }))
                    }}
                    placeholder="Your full name"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.name && !errors.name && form.name.trim() && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                  )}
                  {touched.name && errors.name && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 pointer-events-none" />
                  )}
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="animate-fade-in-up" style={{ animationDelay: "250ms" }}>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, email: true }))
                      if (!form.email) setErrors((p) => ({ ...p, email: "Email is required" }))
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) setErrors((p) => ({ ...p, email: "Invalid email format" }))
                    }}
                    placeholder="you@example.com"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.email && !errors.email && form.email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                  )}
                  {touched.email && errors.email && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 pointer-events-none" />
                  )}
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, password: true }))
                      if (!form.password) setErrors((p) => ({ ...p, password: "Password is required" }))
                      else if (form.password.length < 8) setErrors((p) => ({ ...p, password: "Password must be at least 8 characters" }))
                    }}
                    placeholder="Create a strong password"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-16 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.password && !errors.password && form.password && (
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
              {form.password.length > 0 && (
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
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
                      const met = req.test(form.password)
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
              <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, confirmPassword: true }))
                      if (!form.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: "Please confirm your password" }))
                      else if (form.password !== form.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match" }))
                    }}
                    placeholder="Re-enter your password"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-16 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.confirmPassword && !errors.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
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
                {form.confirmPassword && form.password !== form.confirmPassword && !errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                )}
              </div>

              {/* Role */}
              <div className="animate-fade-in-up" style={{ animationDelay: "450ms" }}>
                <p className="text-sm font-medium text-text-secondary mb-3">I want to join as a</p>
                <div className="grid gap-3">
                  <div
                    onClick={() => setRole("student")}
                    className="flex items-start gap-3.5 p-3.5 border bg-bg-elevated cursor-pointer"
                    style={{
                      borderColor: role === "student" ? "#5b6bf7" : "#2a2a2a",
                      backgroundColor: role === "student" ? "rgba(91,107,247,0.1)" : "",
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-bg-secondary" style={{ color: role === "student" ? "#5b6bf7" : "#555" }}>
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: role === "student" ? "#5b6bf7" : "#f5f5f5" }}>Student</div>
                      <div className="text-xs text-[#555] mt-0.5">Buy and learn from expert-led courses</div>
                    </div>
                  </div>
                  <div
                    onClick={() => setRole("teacher")}
                    className="flex items-start gap-3.5 p-3.5 border bg-bg-elevated cursor-pointer"
                    style={{
                      borderColor: role === "teacher" ? "#5b6bf7" : "#2a2a2a",
                      backgroundColor: role === "teacher" ? "rgba(91,107,247,0.1)" : "",
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-bg-secondary" style={{ color: role === "teacher" ? "#5b6bf7" : "#555" }}>
                      <Presentation className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: role === "teacher" ? "#5b6bf7" : "#f5f5f5" }}>Teacher or Tutor</div>
                      <div className="text-xs text-[#555] mt-0.5">Publish your knowledge and earn</div>
                    </div>
                  </div>
                </div>
                {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 h-11 text-base animate-fade-in-up" style={{ animationDelay: "500ms" }} loading={loading}>
              {loading ? "Creating account..." : "Create your account"}
            </Button>

            <div className="mt-5 animate-fade-in-up" style={{ animationDelay: "550ms" }}>
              <Toggle
                id="terms"
                checked={agreeTerms}
                onChange={setAgreeTerms}
                label={<>I agree to the <Link href="/terms" className="text-accent hover:text-accent-hover">Terms of Service</Link> and <Link href="/privacy" className="text-accent hover:text-accent-hover">Privacy Policy</Link></>}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
