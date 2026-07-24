"use client"

import { CountUp } from "@/components/animations"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  BarChart3,
  BookOpen,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

const stats = [
  {
    value: 5000,
    label: "Students enrolled",
    context: "From 120+ countries",
    icon: Users,
    growth: "+24%",
  },
  {
    value: 500,
    label: "Courses and books",
    context: "Across 8 categories",
    icon: BookOpen,
    growth: "+12%",
  },
  {
    value: 97,
    label: "Content approval rate",
    suffix: "%",
    context: "Quality agent reviewed",
    icon: Shield,
    growth: "+5%",
  },
  {
    value: 80,
    label: "Revenue share",
    suffix: "%",
    context: "Industry-leading payout",
    icon: BarChart3,
    growth: "",
  },
  {
    value: 48,
    label: "Average payout time",
    suffix: "h",
    context: "Fast settlement",
    icon: Clock,
    growth: "-8h",
    growthPositive: false,
  },
  {
    value: 49,
    label: "Average rating",
    decimal: true,
    context: "Across all content",
    icon: Star,
    growth: "+0.3",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

function StatCard({
  stat,
}: {
  stat: typeof stats[0]
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl border border-border/60 bg-gradient-to-b from-bg-secondary/80 to-bg-secondary/30 p-5 transition-colors hover:border-border-hover/60 min-w-[160px] flex-1 max-w-[200px]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/10 group-hover:border-accent/20 group-hover:bg-accent/15 transition-colors">
          <stat.icon className="h-5 w-5 text-accent" />
        </div>
        {stat.growth && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold",
              stat.growthPositive === false
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-emerald-500/10 text-emerald-500"
            )}
          >
            <TrendingUp className="h-3 w-3" />
            {stat.growth}
          </span>
        )}
      </div>

      <div className="text-3xl font-bold text-text-primary">
        {stat.decimal ? (
          <span className="flex items-baseline gap-0">
            <CountUp end={49} />
            <span className="text-lg text-text-muted">.9</span>
          </span>
        ) : (
          <CountUp end={stat.value} suffix={stat.suffix ?? "+"} />
        )}
      </div>
      <div className="mt-0.5 text-sm font-medium text-text-primary">
        {stat.label}
      </div>
      <div className="mt-0.5 text-xs text-text-muted">
        {stat.context}
      </div>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section className="py-20">
      <div className="w-full px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
