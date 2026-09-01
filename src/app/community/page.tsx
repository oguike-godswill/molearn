"use client"

import { Suspense } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Calendar, Globe, ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"

const members = [
  { initials: "AO", name: "Ada O.", track: "Digital Marketing", color: "#5b6bf7", outcome: "Cohort 3 → Now at Flutterwave" },
  { initials: "TE", name: "Tunde E.", track: "UI/UX Design", color: "#22c55e", outcome: "Built portfolio → Hired by Paystack" },
  { initials: "NI", name: "Ngozi I.", track: "Digital Marketing", color: "#f97316", outcome: "Freelancer → 5 retainer clients" },
  { initials: "KM", name: "Kemi M.", track: "Product Design", color: "#eab308", outcome: "Cohort 1 → Design Lead at Kuda" },
  { initials: "DA", name: "David A.", track: "UI/UX Design", color: "#ec4899", outcome: "Side project → YC interview" },
  { initials: "FS", name: "Fatima S.", track: "Digital Marketing", color: "#8b5cf6", outcome: "Intern → Growth Manager at Moniepoint" },
]

const events = [
  { title: "Portfolio Review & Feedback Session", date: "Sep 12, 2026 · 6 PM WAT", type: "Workshop" },
  { title: "Breaking into Fintech Design", date: "Sep 19, 2026 · 7 PM WAT", type: "Webinar" },
  { title: "Lagos Community Meetup", date: "Sep 26, 2026 · 4 PM WAT", type: "Networking" },
  { title: "SEO Masterclass for Beginners", date: "Oct 3, 2026 · 6 PM WAT", type: "Workshop" },
]

const stats = [
  { icon: Users, value: "2,400+", label: "Community Members" },
  { icon: Calendar, value: "85+", label: "Events Hosted" },
  { icon: Globe, value: "12", label: "Countries Represented" },
]

const typeColors: Record<string, string> = {
  Workshop: "bg-accent/10 text-accent border-accent/20",
  Webinar: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Networking: "bg-amber-500/10 text-amber-400 border-amber-500/20",
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                <Sparkles className="h-3.5 w-3.5" />
                Community
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Join the <span className="text-accent">MojeTech</span> Community
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Connect with thousands of learners and professionals. Share knowledge, get feedback, and grow your career through peer learning and meaningful networking.
              </p>
            </motion.div>

            {/* Two-tier CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 shadow-lg shadow-accent/20">
                  Join Free Community
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/programs">
                <Button variant="ghost" className="gap-2 bg-white/5 hover:bg-white/10 text-white">
                  Enroll for Full Access
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="text-center p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-5 w-5 text-accent" />
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Member Spotlight */}
        <div className="max-w-5xl mx-auto px-4 pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Member Spotlight</h2>
            <p className="text-sm text-gray-400 mb-8">Real stories from community members who leveled up their careers.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: `${member.color}30`, border: `1px solid ${member.color}50` }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.track}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{member.outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Upcoming Events</h2>
            <p className="text-sm text-gray-400 mb-8">Workshops, webinars, and meetups to sharpen your skills.</p>
          </motion.div>

          <div className="space-y-3">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:shrink-0">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[event.type]}`}>
                    {event.type}
                  </span>
                  <Button size="sm" variant="ghost" className="bg-white/5 hover:bg-white/10 text-white">
                    Register
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent/10 to-transparent p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-white">Ready to be part of the community?</h3>
            <p className="mt-2 text-gray-400 text-sm">Join for free today and start connecting with fellow learners.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  Join Free Community
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/programs">
                <Button variant="ghost" className="gap-2 bg-white/5 hover:bg-white/10 text-white">
                  Browse Programs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

