"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Play,
  Shield,
  Star,
  Timer,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const pressLogos = [
  { name: "TechCrunch", label: "TechCrunch" },
  { name: "ProductHunt", label: "ProductHunt" },
  { name: "Forbes", label: "Forbes" },
  { name: "TheVerge", label: "The Verge" },
  { name: "Wired", label: "Wired" },
  { name: "TechCrunch", label: "TechCrunch" },
  { name: "ProductHunt", label: "ProductHunt" },
  { name: "Forbes", label: "Forbes" },
  { name: "TheVerge", label: "The Verge" },
  { name: "Wired", label: "Wired" },
]

const courses = [
  {
    title: "React 19 & Next.js Production Architecture",
    teacher: "Sarah Chen",
    rating: 4.9,
    price: "$49.99",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    ],
    students: 3420,
    duration: "18:42",
    badge: "Bestseller",
  },
  {
    title: "Advanced TypeScript & Design Systems",
    teacher: "Marcus Johnson",
    rating: 4.8,
    price: "$39.99",
    images: [
      "https://images.unsplash.com/photo-1516116211223-4c714195286f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80",
    ],
    students: 2180,
    duration: "24:15",
    badge: "Hot",
  },
  {
    title: "AI Agent Engineering & LLM Apps",
    teacher: "Dr. Alex Rivera",
    rating: 5.0,
    price: "$69.99",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    ],
    students: 4890,
    duration: "32:08",
    badge: "New",
  },
]

const activityFeed = [
  { name: "Alex Rivera", action: "enrolled in", target: "React 19 & Next.js", time: "just now" },
  { name: "Emily Watson", action: "earned $420 on", target: "Python Masterclass", time: "2m ago" },
  { name: "David Kim", action: "published", target: "LLM App Architecture", time: "5m ago" },
  { name: "Lisa Park", action: "completed", target: "UI/UX Design Systems", time: "12m ago" },
  { name: "James Wilson", action: "enrolled in", target: "Node.js Microservices", time: "18m ago" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  )
}

export function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  )
}

function PlayingThumbnail({ images, duration, badge }: { images: string[]; duration: string; badge: string }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#141418] mb-2.5 group/thumb border border-white/10 shadow-md">
      {images.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === frame ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
        <motion.div
          className="h-full bg-[#5b6bf7]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          className="h-11 w-11 rounded-full bg-white flex items-center justify-center shadow-xl text-gray-950 group-hover/thumb:scale-110 transition-transform"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </motion.div>
      </div>
      <div className="absolute top-2.5 left-2.5 bg-[#5b6bf7] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20 shadow-sm">
        {badge}
      </div>
      <div className="absolute bottom-2.5 right-2.5 bg-black/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-md z-20 border border-white/10">
        {duration}
      </div>
    </div>
  )
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: -y * 8, y: x * 8 })
  }

  const onMouseLeave = () => setRotate({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ perspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}

function FloatingCourseCard() {
  const [fcardFrame, setFcardFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFcardFrame((f) => (f + 1) % courses[2].images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="absolute -top-6 -right-6 z-30 hidden xl:block"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-48 rounded-2xl border border-white/10 bg-[#121218] p-3.5 shadow-2xl"
      >
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#181824] mb-2 border border-white/10">
          {courses[2].images.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === fcardFrame ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Play className="h-3.5 w-3.5 text-black fill-current ml-0.5" />
            </div>
          </div>
        </div>
        <div className="text-[11px] font-bold text-white truncate">{courses[2].title}</div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-gray-400">{courses[2].teacher}</span>
          <span className="text-[11px] font-extrabold text-[#5b6bf7]">{courses[2].price}</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-white/10">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-current" />
            ))}
          </div>
          <span className="text-[10px] font-semibold text-gray-300">5.0</span>
          <span className="text-[9px] text-gray-400 ml-auto">4.8k students</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function BrowserMockup() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full rounded-2xl border border-white/10 bg-[#121218] shadow-2xl overflow-hidden"
    >
      {/* Browser chrome header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#181822]">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-2 rounded-full bg-black/40 border border-white/10 px-4 py-1 text-[11px] text-gray-400">
          <Shield className="h-3 w-3 text-[#5b6bf7]" />
          <span className="text-gray-200 font-medium">molearn.com</span>
          <span className="text-gray-500">/explore</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">LIVE DEMO</span>
        </div>
      </div>

      {/* Browser tab switcher */}
      <div className="flex border-b border-white/10 px-4 bg-[#14141d]">
        {["Trending Courses", "Featured E-Books", "Top Instructors"].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={cn(
              "px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer",
              activeTab === idx
                ? "border-[#5b6bf7] text-white bg-white/5"
                : "border-transparent text-gray-400 hover:text-gray-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content inside browser */}
      <div className="p-5 space-y-4">
        {/* Course cards grid */}
        <div className="grid grid-cols-2 gap-4">
          {courses.slice(0, 2).map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
              className="group/card cursor-pointer p-2.5 rounded-xl border border-white/10 bg-[#181822] hover:bg-[#1f1f2c] hover:border-white/20 transition-all"
            >
              <PlayingThumbnail images={course.images} duration={course.duration} badge={course.badge} />
              <div className="text-xs font-bold text-white group-hover/card:text-[#5b6bf7] transition-colors truncate">
                {course.title}
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-gray-400">{course.teacher}</span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="h-3 w-3 fill-current" />
                  {course.rating}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Users className="h-3 w-3 text-[#5b6bf7]" />
                  {course.students.toLocaleString()} students
                </span>
                <span className="text-xs font-black text-white">{course.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Instructor Revenue Ticker Widget */}
        <div className="rounded-xl bg-[#181824] border border-[#5b6bf7]/30 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#5b6bf7]/20 border border-[#5b6bf7]/40 flex items-center justify-center text-[#5b6bf7]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                Instructor Payout Guarantee
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-[11px] text-gray-400">Keep 80% revenue per sale • Automatic monthly payouts</div>
            </div>
          </div>
          <Link href="/teach">
            <Button size="sm" className="bg-[#5b6bf7] hover:bg-[#4a5ae6] text-white text-xs font-semibold shadow-md">
              Start Teaching
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function LiveActivityFeed() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % activityFeed.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 shadow-xl w-60 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#5b6bf7]">
        <Timer className="h-3.5 w-3.5" />
        Live Platform Feed
      </div>
      <div className="relative h-11">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center gap-2.5"
          >
            <div className="h-7 w-7 rounded-full bg-[#5b6bf7]/20 border border-[#5b6bf7]/40 flex items-center justify-center text-[9px] font-extrabold text-white shrink-0">
              {activityFeed[activeIndex].name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="text-[11px] text-gray-300 leading-tight">
              <span className="font-semibold text-white">{activityFeed[activeIndex].name}</span>{" "}
              {activityFeed[activeIndex].action}{" "}
              <span className="font-semibold text-[#5b6bf7]">{activityFeed[activeIndex].target}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function FloatingCards() {
  return (
    <div className="absolute -bottom-8 -left-8 hidden lg:block z-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col gap-3"
      >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <LiveActivityFeed />
        </motion.div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 shadow-xl w-52"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <BarChart3 className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xl font-black text-white">80%</div>
              <div className="text-[10px] text-gray-400 font-medium">Instructor Revenue Share</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function LogoMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10" />
      <motion.div
        className="flex items-center gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {pressLogos.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="text-xs font-bold tracking-wider uppercase whitespace-nowrap px-4 py-1.5 rounded-full border border-white/10 bg-[#14141c] text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-default"
          >
            {logo.label}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Hero() {
  const [email, setEmail] = useState("")
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={sectionRef} className="relative z-10 pt-32 pb-20 overflow-hidden bg-[#0d0d0d]">
      <MeshGradient />
      <NoiseOverlay />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Headline & Copy (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 max-w-2xl"
          >
            {/* Top pill badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 border border-[#5b6bf7]/40 bg-[#5b6bf7]/15 px-3.5 py-1.5 text-xs font-medium text-white rounded-full mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#5b6bf7]" />
              <span>Next-Gen Knowledge Marketplace</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span className="text-[#5b6bf7] font-bold">80% Creator Payout</span>
            </motion.div>

            {/* Main Headline (Crisp solid typography, NO gradients) */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              Teach what you know. <br />
              <span className="text-[#5b6bf7]">
                Earn 80% revenue.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Publish video masterclasses & e-books. Our AI agent network verifies content quality, sets fair pricing, and protects your intellectual property while giving you maximum earnings.
            </motion.p>

            {/* Dual CTA buttons & form */}
            <motion.div variants={fadeUp} className="mt-8 space-y-4">
              <form
                onSubmit={(e) => { e.preventDefault(); window.location.href = "/register" }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md"
              >
                <div className="relative flex-1">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 pl-4 pr-3 text-sm rounded-xl border-white/20 bg-[#161620] text-white placeholder:text-gray-500 focus:border-[#5b6bf7] focus:ring-1 focus:ring-[#5b6bf7] transition-all"
                    required
                  />
                </div>
                <Button type="submit" className="h-12 px-6 gap-2 rounded-xl bg-[#5b6bf7] hover:bg-[#4a5ae6] text-white text-sm font-bold shadow-lg shadow-[#5b6bf7]/25 cursor-pointer shrink-0">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              {/* Secondary action */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <Link href="/browse" className="text-white hover:text-[#5b6bf7] font-semibold flex items-center gap-1 underline underline-offset-4 decoration-[#5b6bf7]">
                  Browse 1,200+ Courses & Books →
                </Link>
                <span>•</span>
                <span className="text-gray-400">No credit card required</span>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6 text-xs text-gray-400 flex-wrap">
              <div className="flex items-center gap-2 bg-[#14141c] border border-white/10 px-3.5 py-2 rounded-xl">
                <Shield className="h-4 w-4 text-[#5b6bf7]" />
                <span className="text-white font-medium">AI Verified Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-[#14141c] border border-white/10 px-3.5 py-2 rounded-xl">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-medium">4.9/5 Student Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-[#14141c] border border-white/10 px-3.5 py-2 rounded-xl">
                <Award className="h-4 w-4 text-emerald-400" />
                <span className="text-white font-medium">Instant Certificates</span>
              </div>
            </motion.div>

            {/* Press Marquee */}
            <motion.div variants={fadeUp} className="mt-10 pt-6 border-t border-white/10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">Featured in leading publications</p>
              <LogoMarquee />
            </motion.div>
          </motion.div>

          {/* Right: Interactive Browser Visual (5 cols) */}
          <motion.div style={{ y }} className="lg:col-span-5 relative hidden lg:block">
            <TiltCard>
              <BrowserMockup />
              <FloatingCourseCard />
            </TiltCard>
            <FloatingCards />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      >
        <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">SCROLL TO EXPLORE</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
