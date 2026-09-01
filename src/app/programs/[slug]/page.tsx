"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Star,
  ArrowRight,
  X,
  Send,
  Loader2,
} from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState as useReactState } from "react"
import { getProgramBySlug, getTestimonials, submitApplication } from "@/lib/actions"

interface ProgramData {
  id: string
  title: string
  slug: string
  track: string
  duration: string
  mode: string
  price: number
  startDate: string | null
  description: string
  learningOutcomes: string[]
  whoIsThisFor: string[]
  mentorName: string | null
  mentorRole: string | null
  mentorBio: string | null
  cohorts: {
    id: string
    label: string
    startDate: string
    endDate: string
    spots: number
    spotsLeft: number
  }[]
  curriculum: {
    id: string
    week: string
    title: string
    topics: string[]
    order: number
  }[]
}

interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  program: string | null
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-semibold text-white">{question}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-gray-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

function ApplicationModal({ open, onClose, program, cohortId }: { open: boolean; onClose: () => void; program: ProgramData; cohortId?: string }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
    referral: "",
  })

  const cohort = program.cohorts.find((c) => c.id === cohortId)

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const result = await submitApplication({
      ...form,
      programId: program.id,
      cohortId: cohortId,
    })

    if (result.success) {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setSubmitted(false)
      setForm({ firstName: "", lastName: "", email: "", phone: "", experience: "", motivation: "", referral: "" })
    }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f1a] shadow-2xl"
          >
            {submitted ? (
              <div className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Thank you for applying to {program.title}. We&apos;ll review your application and get back to you within 48 hours.
                </p>
                <Button onClick={handleClose} className="gap-2">
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <div>
                    <h3 className="text-lg font-bold text-white">Apply for {program.title}</h3>
                    {cohort && <p className="text-xs text-gray-400 mt-0.5">{cohort.label} — {cohort.startDate}</p>}
                  </div>
                  <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-5">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name *</label>
                          <Input
                            value={form.firstName}
                            onChange={(e) => updateField("firstName", e.target.value)}
                            placeholder="Ada"
                            className="h-10 text-sm rounded-lg border-white/10 bg-white/[0.03] text-white placeholder:text-gray-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Name *</label>
                          <Input
                            value={form.lastName}
                            onChange={(e) => updateField("lastName", e.target.value)}
                            placeholder="Okafor"
                            className="h-10 text-sm rounded-lg border-white/10 bg-white/[0.03] text-white placeholder:text-gray-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Email *</label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="ada@example.com"
                          className="h-10 text-sm rounded-lg border-white/10 bg-white/[0.03] text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone Number</label>
                        <Input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="h-10 text-sm rounded-lg border-white/10 bg-white/[0.03] text-white placeholder:text-gray-500"
                        />
                      </div>
                      <Button type="button" onClick={() => setStep(2)} className="w-full h-10 gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Experience Level *</label>
                        <select
                          value={form.experience}
                          onChange={(e) => updateField("experience", e.target.value)}
                          className="w-full h-10 text-sm rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 focus:outline-none focus:border-accent"
                          required
                        >
                          <option value="" className="bg-[#0f0f1a]">Select your level</option>
                          <option value="beginner" className="bg-[#0f0f1a]">Beginner — No prior experience</option>
                          <option value="intermediate" className="bg-[#0f0f1a]">Intermediate — Some experience</option>
                          <option value="advanced" className="bg-[#0f0f1a]">Advanced — Looking to specialize</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Why do you want to join? *</label>
                        <textarea
                          value={form.motivation}
                          onChange={(e) => updateField("motivation", e.target.value)}
                          placeholder="Tell us about your goals and what you hope to achieve..."
                          rows={3}
                          className="w-full text-sm rounded-lg border border-white/10 bg-white/[0.03] text-white p-3 placeholder:text-gray-500 focus:outline-none focus:border-accent resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">How did you hear about us?</label>
                        <select
                          value={form.referral}
                          onChange={(e) => updateField("referral", e.target.value)}
                          className="w-full h-10 text-sm rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 focus:outline-none focus:border-accent"
                        >
                          <option value="" className="bg-[#0f0f1a]">Select an option</option>
                          <option value="social" className="bg-[#0f0f1a]">Social Media</option>
                          <option value="friend" className="bg-[#0f0f1a]">Friend or Family</option>
                          <option value="search" className="bg-[#0f0f1a]">Google Search</option>
                          <option value="event" className="bg-[#0f0f1a]">Event or Webinar</option>
                          <option value="other" className="bg-[#0f0f1a]">Other</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1 h-10">
                          Back
                        </Button>
                        <Button type="submit" disabled={submitting} className="flex-1 h-10 gap-2">
                          {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          {submitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const defaultFaqs = [
  {
    question: "Do I need any prior experience?",
    answer: "No. Our programs are designed for beginners. We start from the fundamentals and build up to advanced concepts. All you need is a laptop, internet access, and the willingness to put in the work.",
  },
  {
    question: "What tools will I need?",
    answer: "We use free tools throughout the programs. We'll guide you through setup during the first week.",
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes. Upon completing the program and your capstone project, you'll receive a MojeTech certificate of completion that you can share on LinkedIn and your resume.",
  },
  {
    question: "What if I miss a live session?",
    answer: "All live sessions are recorded and shared within 24 hours. You can watch the replay and ask questions in the community.",
  },
]

export default function ProgramDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [applyOpen, setApplyOpen] = useState(false)
  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>()
  const [program, setProgram] = useState<ProgramData | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getProgramBySlug(slug),
      getTestimonials(),
    ]).then(([programData, testimonialsData]) => {
      setProgram(programData as ProgramData)
      setTestimonials(testimonialsData as Testimonial[])
      setLoading(false)
    })
  }, [slug])

  const handleApply = (cohortId?: string) => {
    setSelectedCohortId(cohortId)
    setApplyOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Program not found</h1>
            <p className="text-gray-400 text-sm mb-6">
              The program you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to programs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const programTestimonials = testimonials.filter((t) => t.program === program.title)

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to programs
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant={program.track === "Marketing" ? "default" : "secondary"}>
                  {program.track}
                </Badge>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {program.mode}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {program.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
                {program.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {program.duration}
                </span>
                {program.startDate && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Starts {program.startDate}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  Limited seats
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-3xl font-extrabold text-white">${(program.price / 100).toFixed(0)}</span>
                <Button size="lg" className="gap-2" onClick={() => handleApply()}>
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Learning outcomes */}
        {program.learningOutcomes.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">What You&apos;ll Learn</h2>
              <p className="text-sm text-gray-400 mb-8">
                By the end of this program, you&apos;ll be able to:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.learningOutcomes.map((outcome, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300 leading-relaxed">{outcome}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Who this is for */}
        {program.whoIsThisFor.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Who This Is For</h2>
              <p className="text-sm text-gray-400 mb-8">
                This program is designed for:
              </p>
              <div className="space-y-3">
                {program.whoIsThisFor.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">{i + 1}</span>
                    </div>
                    <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Mentor */}
        {program.mentorName && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Mentor</h2>
              <div className="flex items-start gap-5">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xl font-bold">
                    {program.mentorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{program.mentorName}</p>
                  {program.mentorRole && <p className="text-xs text-accent font-medium mt-0.5">{program.mentorRole}</p>}
                  {program.mentorBio && <p className="mt-3 text-sm text-gray-400 leading-relaxed">{program.mentorBio}</p>}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Curriculum */}
        {program.curriculum.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Curriculum</h2>
              <p className="text-sm text-gray-400 mb-8">
                A structured {program.duration} journey from fundamentals to mastery.
              </p>
              <div className="space-y-4">
                {program.curriculum.map((module, i) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-accent px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                        {module.week}
                      </span>
                      <h3 className="text-sm font-bold text-white">{module.title}</h3>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {module.topics.map((topic, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="h-1 w-1 rounded-full bg-gray-600 shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Cohort dates */}
        {program.cohorts.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Upcoming Cohorts</h2>
              <p className="text-sm text-gray-400 mb-8">
                Secure your spot before seats fill up.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.cohorts.map((cohort, i) => (
                  <div
                    key={cohort.id}
                    className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{cohort.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{cohort.startDate} — {cohort.endDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-emerald-400 font-medium">
                        {cohort.spotsLeft} spots left
                      </p>
                      <Button size="sm" className="mt-2 gap-1" onClick={() => handleApply(cohort.id)}>
                        Apply
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Testimonials */}
        {programTestimonials.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">What Past Students Say</h2>
              <p className="text-sm text-gray-400 mb-8">
                Hear from graduates of previous cohorts.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {programTestimonials.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex flex-col p-5 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed flex-1">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm font-bold text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-400 mb-8">
              Got questions? We&apos;ve got answers.
            </p>
            <div className="space-y-3">
              {defaultFaqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent/10 to-transparent p-8 sm:p-10 text-center"
          >
            <h3 className="text-2xl font-bold text-white">Ready to start?</h3>
            <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">
              Join the next cohort of {program.title} and invest in your future. Limited seats available.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => handleApply()}>
                Apply Now — ${(program.price / 100).toFixed(0)}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Have questions?
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {program && (
        <ApplicationModal
          open={applyOpen}
          onClose={() => setApplyOpen(false)}
          program={program}
          cohortId={selectedCohortId}
        />
      )}

      <Footer />
    </div>
  )
}
