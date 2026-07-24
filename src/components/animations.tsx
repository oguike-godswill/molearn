"use client"

import {
  motion,
  type Variants,
  type HTMLMotionProps,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion"
import { useEffect, useRef, type ReactNode } from "react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  as?: "div" | "section" | "article"
}

export function AnimatedSection({ children, as = "div", ...props }: AnimatedSectionProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function FadeIn({ children, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeIn}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerListProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerList({ children, staggerDelay = 0.08, className }: StaggerListProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function HoverCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, end, { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] })
      return controls.stop
    }
  }, [inView, motionValue, end])

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}
