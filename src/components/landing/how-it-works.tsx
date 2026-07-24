"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Shield, Sparkles, TrendingUp, Clock, Search, DollarSign } from "lucide-react"

const steps = [
  {
    icon: Sparkles,
    title: "Create your content",
    desc: "Shoot video tutorials or write ebooks with whatever tools you already love. Upload straight to your dashboard — we support MP4, EPUB, PDF, and MOBI. Add chapters, previews, and learning objectives so students know exactly what they're getting.",
    stat: "3-4 weeks",
    statLabel: "avg. creation time",
    accent: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: Shield,
    title: "Expert review & pricing",
    desc: "Our content team reviews every submission for technical accuracy, production quality, and teaching clarity. We then price your content competitively based on depth, market demand, and similar titles — no guesswork on your end.",
    stat: "3-5 days",
    statLabel: "review turnaround",
    accent: "bg-purple-500/10 text-purple-400",
  },
  {
    icon: TrendingUp,
    title: "Publish & get discovered",
    desc: "Once approved, your content goes live instantly across our marketplace. Students find you through category browsing, intelligent search, and personalized recommendations — so the right audience always sees your work.",
    stat: "1,200",
    statLabel: "avg. first-week views",
    accent: "bg-amber-500/10 text-amber-400",
  },
  {
    icon: BookOpen,
    title: "Earn on every sale",
    desc: "Every purchase is processed securely through Stripe Connect. You receive 80% of each sale, deposited directly to your bank within 48 hours. A live analytics dashboard shows revenue, enrollment trends, and student engagement at a glance.",
    stat: "$3,400",
    statLabel: "avg. monthly earnings",
    accent: "bg-emerald-500/10 text-emerald-400",
  },
]

function StepCircle({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.35, ease: "backOut" }}
      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-bg-primary shadow-lg shadow-accent/10"
    >
      <span className="text-sm font-bold text-accent">0{index + 1}</span>
    </motion.div>
  )
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 h-full hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${step.accent} shrink-0`}>
          <step.icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">{step.stat} {step.statLabel}</span>
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-2">{step.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed flex-1">{step.desc}</p>
    </motion.div>
  )
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const lineScale = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1])

  return (
    <section ref={sectionRef} id="how-it-works" className="relative z-10 py-20">
      {/* Section header */}
      <div className="text-center max-w-xl mx-auto mb-16 lg:mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 border border-border/60 bg-bg-secondary/50 backdrop-blur-sm px-3 py-1.5 text-xs text-text-secondary rounded-full mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Your journey in 4 steps
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From idea to{" "}
              <span className="text-accent">
                income
              </span>
          </h2>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
            A straightforward path to turn your knowledge into a recurring revenue stream.
          </p>
        </motion.div>
      </div>

      {/* Desktop: Horizontal stepper */}
      <div className="hidden lg:block px-4">
        <div className="relative w-full">
          <div className="absolute top-6 left-[4%] right-[4%] h-px bg-border/40" />
          <motion.div
            className="absolute top-6 left-[4%] h-px bg-accent"
            style={{ scaleX: lineScale, transformOrigin: "left" }}
          />
          <div className="grid grid-cols-4 gap-6 items-stretch">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col h-full">
                <div className="flex justify-center">
                  <StepCircle index={i} />
                </div>
                <div className="mt-8 w-full flex-1">
                  <StepCard step={step} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Vertical timeline */}
      <div className="lg:hidden px-4">
        <div className="relative w-full">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border/40" />
          <motion.div
            className="absolute left-6 top-0 w-px bg-accent"
            style={{ scaleY: lineScale, transformOrigin: "top" }}
          />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.title} className="relative pl-16">
                <div className="absolute left-[1.35rem] -translate-x-1/2">
                  <StepCircle index={i} />
                </div>
                <StepCard step={step} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 border border-border/60 bg-bg-secondary/50 backdrop-blur-sm p-6 w-full rounded-xl px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-border/50">
          <div className="flex items-center gap-3 text-sm px-4">
            <Clock className="h-4 w-4 text-accent shrink-0" />
            <span className="text-text-secondary text-xs">Upload to payout in under 2 weeks</span>
          </div>
          <div className="flex items-center gap-3 text-sm px-4 sm:pl-6">
            <Search className="h-4 w-4 text-accent shrink-0" />
            <span className="text-text-secondary text-xs">Free to join, no upfront costs</span>
          </div>
          <div className="flex items-center gap-3 text-sm px-4 sm:pl-6">
            <DollarSign className="h-4 w-4 text-accent shrink-0" />
            <span className="text-text-secondary text-xs">Cancel anytime, keep your content</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
