"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toggle } from "@/components/ui/toggle"
import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { BookOpen, CheckCircle2, Eye, EyeOff, Lock, Mail, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getSession, signIn } from "next-auth/react"

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

const loginQuotes = [
  "Knowledge is power.",
  "Learn something new every day.",
  "Education is the passport to the future.",
  "Invest in yourself.",
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [shake, setShake] = useState(false)
  const [remember, setRemember] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const fullTagline = "Continue your learning journey"

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
      setQuoteIndex((i) => (i + 1) % loginQuotes.length)
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
    const e: typeof errors = {}
    if (!email) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format"
    if (!password) e.password = "Password is required"
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
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        console.log("Auth error:", result.error)
        toast(result.error === "CredentialsSignin" ? "Invalid email or password" : `Error: ${result.error}`, "error")
      } else {
        toast("Signed in successfully", "success")
        const session = await getSession()
        const role = session?.user?.role || "student"
        router.push(`/dashboard/${role.toLowerCase()}`)
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

  return (
    <div className="flex min-h-screen">
      {/* Left */}
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

          {/* Push everything below to the bottom */}
          <div className="mt-auto space-y-6">
            {/* Center content */}
            <div>
              <p className="text-xs font-medium text-accent tracking-widest uppercase mb-2">
                {greeting()}
              </p>
              <div className="min-h-[6rem]">
                <h2 className="text-2xl font-semibold text-text-primary leading-tight mb-1">
                  {typedText}<span className="animate-pulse">|</span>
                </h2>
                <p className="text-sm text-text-secondary transition-opacity duration-500">
                  &ldquo;{loginQuotes[quoteIndex]}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom */}
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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12 animate-fade-in">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6 animate-fade-in-up">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-logo)" }}>
              <div className="flex h-8 w-8 items-center justify-center bg-accent animate-logo-pulse">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              mojetech
            </Link>
          </div>

          <div className="lg:hidden relative h-24 sm:h-28 overflow-hidden mb-6 rounded border border-border animate-fade-in-up">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary/95 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center px-5">
              <p className="text-xs font-medium text-accent tracking-widest uppercase">{greeting()}</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">Welcome back to mojetech</p>
            </div>
          </div>

          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-2xl font-semibold text-text-primary">Sign in</h1>
            <p className="mt-2 text-sm text-text-secondary">
              New to mojetech?{" "}
              <Link href="/register" className="text-accent hover:text-accent-hover font-medium">
                Create an account
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
                <span className="bg-bg-primary px-2 text-text-muted">or sign in with email</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, email: true }))
                      if (!email) setErrors((p) => ({ ...p, email: "Email is required" }))
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setErrors((p) => ({ ...p, email: "Invalid email format" }))
                    }}
                    placeholder="you@example.com"
                    className="block w-full bg-bg-elevated border border-border pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-accent focus:outline-none focus:ring-0 transition-colors duration-150"
                  />
                  {touched.email && !errors.email && email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                  )}
                  {touched.email && errors.email && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400 pointer-events-none" />
                  )}
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "250ms" }}>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-text-muted hover:text-text-secondary">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })) }}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, password: true }))
                      if (!password) setErrors((p) => ({ ...p, password: "Password is required" }))
                    }}
                    placeholder="Enter your password"
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
            </div>

            <div className="mt-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Toggle id="remember" checked={remember} onChange={setRemember} label="Keep me signed in" />
            </div>

            <Button type="submit" className="w-full mt-5 h-11 text-base animate-fade-in-up" style={{ animationDelay: "350ms" }} loading={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 text-xs text-text-muted text-center leading-relaxed animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-accent hover:text-accent-hover">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent hover:text-accent-hover">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
