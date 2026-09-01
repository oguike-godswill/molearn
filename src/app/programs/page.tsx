"use client"

import { useState, Suspense, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, BookOpen, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPrograms } from "@/lib/actions"

type DeliveryMode = "Cohort" | "Self-paced"

interface Program {
  id: string
  title: string
  slug: string
  track: string
  duration: string
  mode: string
  price: number
  startDate: string | null
  description: string
  cohorts: {
    id: string
    label: string
    startDate: string
    endDate: string
    spots: number
    spotsLeft: number
  }[]
}

const filters: ("All" | DeliveryMode)[] = ["All", "Cohort", "Self-paced"]

export default function ProgramsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | DeliveryMode>("All")
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPrograms().then((data) => {
      setPrograms(data as Program[])
      setLoading(false)
    })
  }, [])

  const filtered = activeFilter === "All"
    ? programs
    : programs.filter((p) => p.mode === activeFilter)

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero header */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                <BookOpen className="h-3.5 w-3.5" />
                MojeTech Programs
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Programs
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Structured programs in digital marketing and design. Choose cohort-based learning or self-paced access.
              </p>
            </motion.div>

            {/* Filter toggle */}
            <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeFilter === f
                      ? "bg-accent text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Program cards */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 animate-pulse">
                  <div className="h-6 bg-white/5 rounded mb-4 w-1/3" />
                  <div className="h-7 bg-white/5 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-white/5 rounded mb-5 w-full" />
                  <div className="h-4 bg-white/5 rounded mb-5 w-2/3" />
                  <div className="h-10 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link href={`/programs/${program.slug}`} className="block h-full">
                    <div className="h-full flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all p-6">
                      {/* Top row: track badge + mode */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={program.track === "Marketing" ? "default" : "secondary"}>
                          {program.track}
                        </Badge>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          program.mode === "Cohort"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        }`}>
                          {program.mode}
                        </span>
                      </div>

                      {/* Name & description */}
                      <h3 className="text-lg font-bold text-white mb-2">{program.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">{program.description}</p>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-5">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {program.duration}
                        </span>
                        {program.startDate && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Starts {program.startDate}
                          </span>
                        )}
                        {program.mode === "Cohort" && program.cohorts.length > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {program.cohorts[0].spotsLeft} spots left
                          </span>
                        )}
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xl font-extrabold text-white">
                          ${(program.price / 100).toFixed(0)}
                        </span>
                        <Button size="sm" className="gap-1.5">
                          {program.mode === "Cohort" ? "Apply Now" : "Start Learning"}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Can't decide CTA */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent/10 to-transparent p-8 sm:p-10 text-center"
          >
            <h3 className="text-2xl font-bold text-white">Can&apos;t decide?</h3>
            <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">
              Tell us your goals and we&apos;ll recommend the right program for you. No commitment required.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact">
                <Button>Talk to us</Button>
              </Link>
              <Link href="/browse">
                <Button variant="ghost">Browse all courses</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
