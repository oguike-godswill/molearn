"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, GraduationCap, Users, Star, TrendingUp, Mail, Sparkles, Play, DollarSign } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const stats = [
  { value: "5,200+", label: "Active students", icon: Users },
  { value: "1,200+", label: "Courses & books", icon: BookOpen },
  { value: "500+", label: "Expert instructors", icon: GraduationCap },
  { value: "$2.4M+", label: "Earned by teachers", icon: TrendingUp },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export function CTA() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => { setSubscribed(false); setEmail("") }, 3000)
  }

  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="w-full px-4">
        {/* Two cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-6 md:grid-cols-2 w-full mb-16"
        >
          {/* Student card */}
          <motion.div variants={cardItem}>
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-bg-secondary/50 backdrop-blur-sm p-8 md:p-10 h-full transition-all duration-300 hover:border-accent/30 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent/5 blur-[60px] group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <Play className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Start learning</h3>
                    <p className="text-xs text-text-muted">For students</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Access 1,200+ expert-led courses and books. Learn at your own pace from industry professionals.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {["Expert-led video courses & books", "Learn anywhere, on any device", "Certificate of completion", "30-day money-back guarantee"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/browse">
                  <Button size="lg" className="gap-2 group/btn">
                    Browse courses
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Teacher card */}
          <motion.div variants={cardItem}>
            <div className="group relative overflow-hidden rounded-2xl border border-accent/30 bg-bg-secondary/50 backdrop-blur-sm p-8 md:p-10 h-full transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 shadow-lg shadow-accent/5">
              <div className="absolute inset-0 rounded-2xl border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent/5 blur-[60px] group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Start teaching</h3>
                    <p className="text-xs text-text-muted">For instructors</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Share your expertise and earn money. Create courses and books — we handle payments, you keep 80%.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {["Keep 80% of every sale", "Agent-reviewed quality assurance", "Detailed analytics dashboard", "Weekly Stripe payouts"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/teach">
                  <Button size="lg" variant="primary" className="gap-2 group/btn shadow-lg shadow-accent/10">
                    Start creating
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardItem}
              className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 text-center hover:border-border/80 transition-colors"
            >
              <stat.icon className="h-5 w-5 text-text-muted mx-auto mb-2" />
              <div className="text-xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden border border-border/60 bg-bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/5 blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/5 blur-[60px]" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary">Stay in the loop</h3>
            <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto">
              Get weekly updates on new courses, creator tips, and platform news. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/60 bg-bg-elevated text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                />
              </div>
              <Button type="submit" className="gap-2 shrink-0">
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
            <p className="mt-3 text-[11px] text-text-muted">
              {subscribed ? "Welcome aboard! Check your inbox." : "No spam. Unsubscribe anytime."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
