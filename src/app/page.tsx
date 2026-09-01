"use client"

import { CategoryExplorer } from "@/components/landing/category-explorer"
import { FeaturedCourses } from "@/components/landing/featured-courses"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Navbar } from "@/components/landing/navbar"
import { Pricing } from "@/components/landing/pricing"
import { motion } from "framer-motion"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Users, Clock } from "lucide-react"

function AuroraGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(91, 107, 247, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  )
}

function CohortCTA() {
  return (
    <section className="relative z-10 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="relative rounded-2xl border border-[#5b6bf7]/20 bg-gradient-to-br from-[#5b6bf7]/10 to-purple-500/5 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#5b6bf7]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Applications Open
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Digital Marketing Cohort 6
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  12-week intensive program. SEO, paid ads, analytics, and content strategy with live mentorship and peer collaboration.
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#5b6bf7]" />
                    Starts Mar 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#5b6bf7]" />
                    12 weeks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#5b6bf7]" />
                    25 spots left
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/programs/digital-marketing-cohort">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5b6bf7] to-purple-600 hover:from-[#4a5ae6] hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-[#5b6bf7]/25 transition-all">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <Link href="/programs">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all">
                      View all programs
                    </span>
                  </Link>
                </div>
              </div>

              <div className="hidden sm:block shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#5b6bf7]/20 to-purple-500/20 border border-[#5b6bf7]/30 flex items-center justify-center">
                  <Users className="h-12 w-12 text-[#5b6bf7]/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a12]">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="flex-1 relative">
        <AuroraGlow />
        <Hero />
        <CohortCTA />
        <HowItWorks />
        <FeaturedCourses />
        <Features />
        <CategoryExplorer />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
