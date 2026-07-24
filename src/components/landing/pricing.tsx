"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, ChevronRight, Globe, Shield, Star, Zap, Users, Headphones, Download, Clock, TrendingUp, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const studentTiers = [
  {
    name: "Starter",
    price: "Free",
    desc: "Explore the marketplace and access free content.",
    features: [
      "Browse all courses & books",
      "Access free content",
      "Community forum access",
      "Basic course progress tracking",
    ],
    cta: "Start for free",
    href: "/register",
    featured: false,
    icon: Zap,
    accent: "border-border/60",
  },
  {
    name: "Pro",
    price: "$19",
    label: "/month",
    desc: "Unlock premium features and accelerate your learning.",
    features: [
      "Everything in Starter",
      "Unlimited access to 1,200+ courses",
      "Download for offline learning",
      "Certificate of completion",
      "Priority support",
      "Early access to new courses",
    ],
    cta: "Get Pro",
    href: "/register",
    featured: true,
    icon: Star,
    accent: "border-accent shadow-lg shadow-accent/10",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For teams and organizations with custom learning paths.",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom learning paths",
      "Analytics & progress reports",
      "Dedicated account manager",
      "SSO & advanced security",
      "Volume discounts",
    ],
    cta: "Contact sales",
    href: "/teach",
    featured: false,
    icon: Globe,
    accent: "border-border/60",
  },
]

const comparison = [
  { feature: "Course catalog access", starter: "Free only", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Offline downloads", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "Certificate of completion", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "Priority support", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "Team management", starter: "—", pro: "—", enterprise: "✓" },
  { feature: "Custom learning paths", starter: "—", pro: "—", enterprise: "✓" },
  { feature: "Analytics dashboard", starter: "Basic", pro: "Basic", enterprise: "Advanced" },
  { feature: "SSO / SAML", starter: "—", pro: "—", enterprise: "✓" },
  { feature: "Volume discounts", starter: "—", pro: "—", enterprise: "✓" },
]

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade at any point. Upgrades take effect immediately, and we'll prorate any remaining balance." },
  { q: "Is there a free trial for Pro?", a: "We offer a 7-day free trial on the Pro plan. No credit card required. Cancel anytime." },
  { q: "How does Enterprise billing work?", a: "Enterprise plans are billed annually with discounts based on team size. Contact us for a custom quote." },
  { q: "Can I buy individual courses without a plan?", a: "Absolutely. The Starter plan lets you purchase any course individually — no subscription required." },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="pricing" className="relative z-10 py-20">
      <div className="w-full px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 border border-border/60 bg-bg-secondary/50 backdrop-blur-sm px-3 py-1.5 text-xs text-text-secondary rounded-full mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              Plans that{" "}
              <span className="text-accent">scale</span>{" "}
              with you
            </h2>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
              Start for free. Upgrade when you're ready. No hidden fees, cancel anytime.
            </p>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-6 lg:grid-cols-3 w-full"
        >
          {studentTiers.map((tier) => {
            const IconComponent = tier.icon
            return (
              <motion.div key={tier.name} variants={item} className="flex group">
                <div
                  className={`relative flex flex-col bg-bg-secondary/50 backdrop-blur-sm border rounded-2xl p-6 w-full transition-all duration-300 ${
                    tier.accent
                  } hover:border-accent/30 hover:-translate-y-1`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-accent text-white text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1">
                        <BadgeCheck className="h-3 w-3" /> Most popular
                      </span>
                    </div>
                  )}

                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tier.featured ? "bg-accent/10" : "bg-bg-elevated"}`}>
                      <IconComponent className={`h-5 w-5 ${tier.featured ? "text-accent" : "text-text-secondary"}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">{tier.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-black text-text-primary tracking-tight">{tier.price}</span>
                    {tier.label && <span className="text-sm text-text-muted font-medium">{tier.label}</span>}
                  </div>
                  <p className="text-sm text-text-secondary mb-6">{tier.desc}</p>

                  {/* CTA */}
                  <Link href={tier.href} className="mb-6">
                    <Button className="w-full" variant={tier.featured ? "primary" : "secondary"} size="md">
                      {tier.cta}
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 border-t border-border/40 pt-5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-text-secondary leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-text-muted"
        >
          <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-emerald-400" /> 30-day money-back guarantee</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-accent" /> Cancel anytime</span>
          <span className="flex items-center gap-1.5"><Headphones className="h-3.5 w-3.5 text-blue-400" /> 24/7 support</span>
        </motion.div>

        {/* Comparison table */}
        <div className="mt-20">
          <h3 className="text-xl font-bold text-text-primary text-center mb-8">Compare plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="py-3 px-4 text-sm font-semibold text-text-primary text-left">Feature</th>
                  <th className="py-3 px-4 text-sm font-semibold text-text-primary text-center">Starter</th>
                  <th className="py-3 px-4 text-sm font-semibold text-accent text-center bg-accent/5 rounded-t-lg">Pro</th>
                  <th className="py-3 px-4 text-sm font-semibold text-text-primary text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 text-sm text-text-secondary">{row.feature}</td>
                    <td className="py-3 px-4 text-sm text-text-muted text-center">{row.starter}</td>
                    <td className="py-3 px-4 text-sm font-medium text-text-primary text-center bg-accent/5">{row.pro}</td>
                    <td className="py-3 px-4 text-sm text-text-muted text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-text-primary text-center mb-8">Frequently asked questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden transition-colors hover:border-border/80"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-text-primary pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 text-text-muted" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher earnings banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-2xl p-8 md:p-10 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            <TrendingUp className="h-3.5 w-3.5" /> For instructors
          </div>
          <h3 className="text-xl font-bold text-text-primary">Teach on molearn</h3>
          <p className="mt-2 text-sm text-text-secondary max-w-lg mx-auto">
            Upload courses and books. Our agents review quality. You keep <strong className="text-text-primary">80%</strong> of every sale.
            No upfront costs.
          </p>
          <Link href="/teach">
            <Button className="mt-5" variant="secondary">
              Learn about teaching <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
