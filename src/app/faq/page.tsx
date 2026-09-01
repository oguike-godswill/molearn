"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, ChevronDown, GraduationCap, School, CreditCard, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Footer } from "@/components/landing/footer"
import { Suspense } from "react"
import { Navbar } from "@/components/landing/navbar"

const faqCategories = [
  {
    icon: GraduationCap,
    title: "For Students",
    color: "#5b6bf7",
    items: [
      { q: "How do I enroll in a course?", a: "Browse the marketplace, find a course you like, and click \"Buy\" to purchase. Once purchased, the course appears in your dashboard under \"My Courses\"." },
      { q: "Can I get a refund?", a: "Yes, we offer a 7-day refund policy. If you're not satisfied with a course, you can request a refund within 7 days of purchase through your dashboard." },
      { q: "Do courses have certificates?", a: "Yes, you receive a completion certificate for each course you finish. Certificates are downloadable and shareable on LinkedIn." },
      { q: "Can I preview a course before buying?", a: "Each course has a free preview that typically includes the first few lessons. This gives you a sense of the teaching style and content quality." },
    ],
  },
  {
    icon: School,
    title: "For Teachers",
    color: "#22c55e",
    items: [
      { q: "How do I become a teacher?", a: "Sign up for an account, then visit the Teach page and click \"Start teaching now\". Complete your teacher profile and submit your first course for review." },
      { q: "What is the revenue split?", a: "Teachers keep 70% of every sale. Platform fees cover hosting, payment processing, and support. Payouts are processed monthly." },
      { q: "How long does course review take?", a: "Our AI-powered review team typically processes submissions within 2-3 business days. You'll receive detailed feedback if revisions are needed." },
      { q: "Can I update my course after publishing?", a: "Absolutely. You can update lessons, add new content, and improve your course at any time. Students are notified of significant updates." },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    color: "#f97316",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and in select regions, local payment methods like iDEAL and Bancontact." },
      { q: "When do teachers get paid?", a: "Teacher payouts are processed on the 15th of each month for all earnings from the previous month. Minimum payout threshold is $50." },
      { q: "Are prices in USD?", a: "Prices are displayed in USD by default. However, students can view approximate prices in their local currency at checkout." },
      { q: "Is there a platform fee for students?", a: "No. The price you see is the price you pay. There are no hidden fees or additional charges for students at checkout." },
    ],
  },
  {
    icon: Shield,
    title: "Platform",
    color: "#eab308",
    items: [
      { q: "Is mojetech free to join?", a: "Yes, creating an account is completely free. You only pay when you purchase a course. Teachers can join and publish for free." },
      { q: "How does the review system work?", a: "Students who purchase a course can leave a rating (1-5 stars) and a written review. Reviews help other students make informed decisions." },
      { q: "Can I access courses offline?", a: "Video courses can be downloaded for offline viewing through our mobile app. E-books are available as PDF downloads for offline reading." },
      { q: "How do I contact support?", a: "You can reach our support team at support@mojetech.com or through the live chat widget in your dashboard. We typically respond within 24 hours." },
    ],
  },
]

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredCategories = activeCategory
    ? faqCategories.filter((c) => c.title === activeCategory)
    : faqCategories

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-28 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                Help Center
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Frequently Asked<br />
                <span className="text-accent">Questions</span>
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Find answers to common questions about mojetech. Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/contact" className="text-accent hover:underline">Contact support</Link>.
              </p>
            </motion.div>

            {/* Category filter pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                  activeCategory === null
                    ? "bg-accent border-accent text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                All
              </button>
              {faqCategories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                    activeCategory === cat.title
                      ? "text-white border-white/20"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                  style={activeCategory === cat.title ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
          {filteredCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}18`, border: `1px solid ${category.color}30` }}
                >
                  <category.icon className="h-4.5 w-4.5" style={{ color: category.color }} />
                </div>
                <h2 className="text-lg font-bold text-white">{category.title}</h2>
                <span className="ml-auto text-xs text-gray-600">{category.items.length} questions</span>
              </div>

              <div className="space-y-2">
                {category.items.map((item, i) => {
                  const key = `${category.title}-${i}`
                  const isOpen = openItems[key]
                  return (
                    <div
                      key={i}
                      className={`border rounded-xl overflow-hidden transition-all ${
                        isOpen
                          ? "border-white/10 bg-white/[0.04]"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/10"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(category.title, i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer group"
                      >
                        <span className={`text-sm font-medium pr-4 transition-colors ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                          {item.q}
                        </span>
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isOpen ? "bg-accent/20" : "bg-white/5"
                          }`}
                        >
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180 text-accent" : "text-gray-600"}`}
                          />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 border-t border-white/5">
                              <p className="pt-4 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent/10 to-transparent p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
            <p className="mt-2 text-gray-400 text-sm">Our support team is here to help you 24/7.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact">
                <Button>Contact support</Button>
              </Link>
              <Link href="/browse">
                <Button variant="ghost">Browse courses</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

