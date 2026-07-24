"use client"

import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Play, Shield, Star, DollarSign } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Learn from experts",
    desc: "Every course is created by verified professionals and reviewed by our agent network for accuracy, depth, and production quality before it ever reaches you.",
    stat: "500+ expert instructors",
    accent: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: Play,
    title: "Teach & earn 80%",
    desc: "Upload video courses or ebooks and keep 80% of every sale. We handle hosting, streaming, payment processing, and infrastructure — you focus on teaching.",
    stat: "Avg. $3,400/month per teacher",
    accent: "bg-purple-500/10 text-purple-400",
  },
  {
    icon: Shield,
    title: "Quality guaranteed",
    desc: "Every submission passes a two-stage review: automated production checks followed by expert agent evaluation. Substandard content gets detailed feedback and a chance to improve.",
    stat: "97% submission pass rate",
    accent: "bg-amber-500/10 text-amber-400",
  },
  {
    icon: Star,
    title: "Fair agent pricing",
    desc: "No guesswork. Our agents analyze content depth, production value, and market demand to set a price that's fair for both students and creators. No auctions, no race to the bottom.",
    stat: "$19.99 — $69.99 price range",
    accent: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: BookOpen,
    title: "Video & ebook formats",
    desc: "Stream in 4K with chapter markers and transcripts, or download DRM-free ebooks in EPUB, MOBI, and PDF. Your library syncs across all devices automatically.",
    stat: "4K streaming + offline access",
    accent: "bg-rose-500/10 text-rose-400",
  },
  {
    icon: DollarSign,
    title: "Fast Stripe payouts",
    desc: "Stripe Connect handles every transaction. Students purchase, we deduct 20%, and your 80% is deposited to your bank within 48 hours. No delays, no bureaucracy.",
    stat: "Payouts every 48 hours",
    accent: "bg-indigo-500/10 text-indigo-400",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export function Features() {
  return (
    <section id="features" className="relative z-10 py-20">
      <div className="w-full px-4">
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 border border-border/60 bg-bg-secondary/50 backdrop-blur-sm px-3 py-1.5 text-xs text-text-secondary rounded-full mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Built for creators & learners
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to{" "}
              <span className="text-accent">
                succeed
              </span>
            </h2>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
              A complete platform for creating, selling, and buying knowledge — with quality assurance and fair
              compensation built in.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <div className="group flex flex-col bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 h-full hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.accent} shrink-0`}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                    {feature.stat}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
