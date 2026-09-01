"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2, HelpCircle } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero header */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-28 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                Contact & Support
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                We&apos;re here to{" "}
                <span className="text-accent">help</span>
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Have a question about courses, pricing, or becoming an instructor? Send us a message and we&apos;ll get back to you in under 24 hours.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Send us a message</h2>
                <p className="text-sm text-gray-400 mt-1">Fill out the form below and our team will get back to you.</p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Received!</h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. We have sent a confirmation email to <span className="text-white font-medium">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", subject: "general", message: "" })
                    }}
                    className="mt-6 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-bg-secondary text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="teaching">Becoming an Instructor</option>
                      <option value="billing">Billing & Refund Issue</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership & Media</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending message...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 space-y-6 flex flex-col justify-between"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Email Us</h3>
                    <p className="text-xs text-gray-400 mt-1">Our support team replies within 24 hours.</p>
                    <a href="mailto:support@mojetech.com" className="text-sm font-medium text-accent hover:underline mt-2 inline-block">
                      support@mojetech.com
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Call Us</h3>
                    <p className="text-xs text-gray-400 mt-1">Mon-Fri from 8:00 AM to 6:00 PM WAT.</p>
                    <a href="tel:+2348000000000" className="text-sm font-medium text-emerald-400 hover:underline mt-2 inline-block">
                      +234-800-000-0000
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Head Office</h3>
                    <p className="text-xs text-gray-400 mt-1">12 Knowledge Drive, Suite 400</p>
                    <p className="text-xs text-gray-400">Lagos, Nigeria 10001</p>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Link Card */}
              <div className="p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <HelpCircle className="h-5 w-5 text-accent" />
                  <h3 className="text-base font-bold text-white">Looking for instant answers?</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Check out our FAQ section for quick answers to common questions about accounts, payments, and course access.
                </p>
                <Link href="/faq">
                  <Button variant="ghost" size="sm" className="w-full bg-white/5 hover:bg-white/10 text-white">
                    Visit FAQ Center
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

