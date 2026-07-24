"use client"

import { Database, Eye, Share2, Cookie, Lock, UserCheck, Mail as MailIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Footer } from "@/components/landing/footer"
import { Suspense } from "react"
import { Navbar } from "@/components/landing/navbar"

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    badge: "Data collection",
    content: "We collect information you provide directly to us, including your name, email address, profile information, and payment details when you create an account or make a purchase. We also collect information about your usage of the platform, such as courses enrolled in, progress, and completion data. Additionally, we automatically collect certain technical information including your IP address, browser type, device information, and access times.",
  },
  {
    id: "how-we-use-it",
    icon: Eye,
    title: "How We Use It",
    badge: "Data usage",
    content: "We use your information to provide and improve our services, process payments, send transactional emails, and personalize your learning experience. Your course progress data helps us recommend relevant content. We may use aggregated, anonymized data for analytics and platform improvement. We also use your information to communicate important updates, security alerts, and support messages related to your account.",
  },
  {
    id: "data-sharing",
    icon: Share2,
    title: "Data Sharing",
    badge: "Third parties",
    content: "We do not sell your personal information to third parties. We may share limited information with service providers who help us operate the platform, such as payment processors, hosting providers, and analytics services. Teachers on our platform can see aggregate statistics about their students but do not have access to individual student identities beyond what is displayed on your public profile. We may disclose information if required by law or to protect our rights.",
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies",
    badge: "Tracking",
    content: "Molearn uses cookies and similar technologies to authenticate users, remember preferences, and analyze platform usage. Essential cookies are required for the platform to function properly. We also use analytics cookies to understand how users interact with our platform. You can control cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.",
  },
  {
    id: "security",
    icon: Lock,
    title: "Security",
    badge: "Protection",
    content: "We implement industry-standard security measures to protect your personal information, including encryption at rest and in transit, regular security audits, and access controls. Payment information is processed by PCI-compliant third-party providers. While we strive to protect your data, no method of electronic storage or transmission is 100% secure. We encourage you to use strong passwords and enable two-factor authentication when available.",
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights",
    badge: "Control",
    content: "You have the right to access, correct, or delete your personal information at any time through your account settings. You can export your data in a machine-readable format. You may also request that we restrict or object to certain processing of your data. To exercise these rights, contact us at privacy@molearn.com. We will respond to verified requests within 30 days as required by applicable data protection laws.",
  },
  {
    id: "contact",
    icon: MailIcon,
    title: "Contact",
    badge: "Get in touch",
    content: "If you have questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@molearn.com. You can also reach our Data Protection Officer at dpo@molearn.com. We are committed to protecting your privacy and will address your concerns promptly. For users in the European Economic Area, you have the right to lodge a complaint with your local data protection authority.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#22c55e]/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 mb-5">
                Legal
              </span>
              <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">
                Privacy{" "}
                <span className="text-[#22c55e]">Policy</span>
              </h1>
              <p className="mt-5 text-base text-gray-500">Last updated: July 24, 2026</p>
              <p className="mt-3 text-sm text-gray-500 max-w-lg mx-auto">
                Your privacy matters. Here&apos;s exactly how we handle your data — in plain language.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Quick summary cards */}
          <div className="grid sm:grid-cols-3 gap-3 mb-12">
            {[
              { icon: Lock, text: "Your data is encrypted at rest and in transit", color: "#5b6bf7" },
              { icon: Share2, text: "We never sell your personal information", color: "#22c55e" },
              { icon: UserCheck, text: "You control your data — delete anytime", color: "#f97316" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex items-start gap-3"
              >
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-5">
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
                  <div className="h-9 w-9 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <section.icon className="h-4 w-4 text-[#22c55e]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-base font-bold text-white">{section.title}</h2>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
                        {section.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 rounded-2xl border border-white/5 bg-gradient-to-br from-[#22c55e]/10 to-transparent p-8 text-center">
            <h3 className="text-xl font-bold text-white">Questions about your privacy?</h3>
            <p className="mt-2 text-gray-400 text-sm">Reach our Data Protection Officer directly.</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href="mailto:dpo@molearn.com"
                className="h-10 px-5 bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Email DPO
              </a>
              <Link href="/terms" className="h-10 px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2">
                Terms of service
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
