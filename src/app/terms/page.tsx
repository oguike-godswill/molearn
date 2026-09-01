"use client"

import { BookOpen, FileText, Scale, CreditCard, Shield, RefreshCw, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Footer } from "@/components/landing/footer"
import { Suspense } from "react"
import { Navbar } from "@/components/landing/navbar"

const sections = [
  {
    id: "introduction",
    icon: FileText,
    title: "Introduction",
    content: "Welcome to mojetech. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. mojetech is a marketplace that connects students with teachers for the sale and purchase of educational content including video courses and e-books.",
  },
  {
    id: "account-terms",
    icon: Shield,
    title: "Account Terms",
    content: "You must be at least 13 years old to create an account on mojetech. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update your information to keep it accurate. mojetech reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.",
  },
  {
    id: "payment-terms",
    icon: CreditCard,
    title: "Payment Terms",
    content: "All prices on mojetech are listed in US Dollars (USD). Students agree to pay all fees associated with course purchases. Teachers receive 70% of the net revenue from each sale of their content. Payouts are processed monthly on the 15th for the previous month's earnings, with a minimum payout threshold of $50. mojetech uses third-party payment processors. We do not store full credit card details on our servers.",
  },
  {
    id: "content-rights",
    icon: Scale,
    title: "Content Rights",
    content: "Teachers retain full ownership of the content they publish on mojetech. By publishing content, you grant mojetech a non-exclusive, worldwide license to host, distribute, and promote your content on the platform. Students purchase a license to access content for personal, non-commercial use. Redistribution, resale, or sharing of purchased content outside the platform is strictly prohibited and may result in account termination.",
  },
  {
    id: "refund-policy",
    icon: RefreshCw,
    title: "Refund Policy",
    content: "Students may request a refund within 7 days of purchase if they are unsatisfied with a course. Refunds are evaluated on a case-by-case basis. Factors considered include course completion percentage and the reason for dissatisfaction. Refunds are typically processed within 5-10 business days to the original payment method. Abuse of the refund policy may result in the loss of refund privileges.",
  },
  {
    id: "termination",
    icon: AlertTriangle,
    title: "Termination",
    content: "mojetech reserves the right to suspend or terminate your account at any time for violations of these terms, fraudulent activity, or other conduct that we deem harmful to the platform or its users. Upon termination, your right to access purchased content may be revoked. You may delete your account at any time through your dashboard settings. Certain provisions of these terms survive termination, including content rights and payment obligations.",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#5b6bf7]/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-28 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#5b6bf7]/10 text-[#5b6bf7] border border-[#5b6bf7]/20 mb-5">
                Legal
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Terms of{" "}
                <span className="text-[#5b6bf7]">Service</span>
              </h1>
              <p className="mt-5 text-base text-gray-500">Last updated: July 24, 2026</p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Table of contents */}
          <div className="mb-12 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Table of Contents</p>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors py-1 group"
                >
                  <span className="text-[11px] text-gray-700 font-mono w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">{s.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.035] transition-all p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[#5b6bf7]/10 border border-[#5b6bf7]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <section.icon className="h-4 w-4 text-[#5b6bf7]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-white mb-2">{section.title}</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
                  </div>
                  <span className="text-[11px] font-mono text-gray-700 shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Questions */}
          <div className="mt-12 rounded-2xl border border-white/5 bg-gradient-to-br from-[#5b6bf7]/10 to-transparent p-8 text-center">
            <h3 className="text-xl font-bold text-white">Have questions about these terms?</h3>
            <p className="mt-2 text-gray-400 text-sm">Our legal team is happy to clarify anything.</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href="mailto:legal@mojetech.com"
                className="h-10 px-5 bg-[#5b6bf7] hover:bg-[#4a5ae6] text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Email legal team
              </a>
              <Link href="/privacy" className="h-10 px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

