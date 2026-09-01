"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Shield,
  Star,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 12000, suffix: "+", label: "Active Learners", icon: Users },
  { value: 80, suffix: "%", label: "Creator Revenue", icon: TrendingUp },
  { value: 4.9, suffix: "/5", label: "Average Rating", icon: Star },
  { value: 50, suffix: "+", label: "Countries", icon: Globe },
]

const courses = [
  {
    title: "Digital Marketing Mastery",
    teacher: "Sarah Chen",
    rating: 4.9,
    students: 3420,
    price: "$49",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "UI/UX Design Systems",
    teacher: "Marcus Johnson",
    rating: 4.8,
    students: 2180,
    price: "$39",
    color: "from-blue-500/20 to-cyan-500/20",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(91, 107, 247, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[20%] -left-[15%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -20, 0],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  )
}

function GlassCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100 hover:border-white/[0.12] transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

function AnimatedBorderCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn("relative group", className)}
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#5b6bf7]/50 via-purple-500/50 to-[#5b6bf7]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0f0f1a] overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  return (
    <AnimatedBorderCard delay={0.4 + index * 0.1} className="h-full">
      <div className="p-4">
        <div className={cn("h-24 rounded-xl bg-gradient-to-br mb-3 flex items-center justify-center", course.color)}>
          <BookOpen className="h-8 w-8 text-white/30" />
        </div>
        <h4 className="text-sm font-semibold text-white truncate">{course.title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{course.teacher}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-white">{course.rating}</span>
          </div>
          <span className="text-xs font-bold text-[#5b6bf7]">{course.price}</span>
        </div>
      </div>
    </AnimatedBorderCard>
  )
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <GlassCard key={stat.label} delay={0.3 + i * 0.08} className="p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-6 w-6 rounded-lg bg-[#5b6bf7]/10 flex items-center justify-center">
              <stat.icon className="h-3 w-3 text-[#5b6bf7]" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-0.5">{stat.label}</div>
        </GlassCard>
      ))}
    </div>
  )
}

function TrustBadge({ icon: Icon, text, delay }: { icon: typeof Shield; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]"
    >
      <Icon className="h-3.5 w-3.5 text-[#5b6bf7]" />
      <span className="text-xs text-gray-300 font-medium">{text}</span>
    </motion.div>
  )
}

export function Hero() {
  const [email, setEmail] = useState("")
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={sectionRef} className="relative z-10 min-h-screen flex items-center overflow-hidden bg-[#0a0a12]">
      <AuroraBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
          >
            {/* Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5b6bf7]/10 border border-[#5b6bf7]/20 mb-8"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#5b6bf7]" />
              <span className="text-xs font-semibold text-[#5b6bf7]">Next-Gen Learning Platform</span>
              <span className="h-1 w-1 rounded-full bg-[#5b6bf7]/40" />
              <span className="text-xs text-gray-400">80% Creator Payout</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-white"
            >
              Teach what you know.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#5b6bf7] via-purple-400 to-[#5b6bf7] bg-clip-text text-transparent">
                  Earn 80% revenue.
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5b6bf7] to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              Publish masterclasses & e-books. AI-verified quality, fair pricing, maximum earnings.
            </motion.p>

            {/* CTA Form */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="mt-8"
            >
              <form
                onSubmit={(e) => { e.preventDefault(); window.location.href = "/register" }}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <div className="relative flex-1 group">
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#5b6bf7]/50 to-purple-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="relative h-12 pl-4 pr-3 text-sm rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-gray-500 focus:border-transparent focus:ring-0 transition-all"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 px-6 gap-2 rounded-xl bg-gradient-to-r from-[#5b6bf7] to-purple-600 hover:from-[#4a5ae6] hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-[#5b6bf7]/25 cursor-pointer shrink-0 border-0"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                <Link href="/programs" className="text-[#5b6bf7] hover:text-purple-400 font-semibold flex items-center gap-1 transition-colors">
                  Apply for next cohort <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/browse" className="text-gray-300 hover:text-white font-medium flex items-center gap-1 transition-colors">
                  Browse courses <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500">No credit card required</span>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
              }}
              className="mt-10 flex flex-wrap gap-2"
            >
              <TrustBadge icon={Shield} text="AI Verified" delay={0.5} />
              <TrustBadge icon={Award} text="Certificates" delay={0.55} />
            </motion.div>
          </motion.div>

          {/* Right: Bento Grid */}
          <motion.div style={{ y }} className="relative">
            <div className="grid grid-cols-2 gap-3">
              {/* Stats Grid - spans full width */}
              <div className="col-span-2">
                <StatsGrid />
              </div>

              {/* Course Cards */}
              {courses.map((course, i) => (
                <CourseCard key={course.title} course={course} index={i} />
              ))}
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-[#5b6bf7]/10 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      >
        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
