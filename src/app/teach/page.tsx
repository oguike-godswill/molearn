"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, DollarSign, Globe, Clock, ChevronDown, Upload, Users, Video, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const faqs = [
  {
    q: "How do I get started as a teacher?",
    a: "Simply click \"Start teaching now\" and create your account. Once verified, you can upload your first course. Our review team ensures quality standards are met before publishing."
  },
  {
    q: "How much can I earn?",
    a: "Teachers on Molearn keep 70% of every sale. With our average course priced at $49 and over 500+ active teachers, top instructors earn $5,000+ monthly. Use the earnings calculator above to estimate your revenue."
  },
  {
    q: "What kind of content can I publish?",
    a: "You can publish video tutorials and e-books on any tech-related topic. We support categories like Web Development, Mobile, Data Science, Design, and DevOps. Content must follow our creator guidelines."
  },
  {
    q: "How does the review process work?",
    a: "Once you submit a course, our AI-powered agent team reviews it for quality, completeness, and originality. Reviews typically take 2-3 business days. You'll receive feedback and can resubmit if needed."
  },
]

const benefits = [
  { icon: DollarSign, title: "Earn what you deserve", desc: "Keep 70% of every sale. Top teachers earn $5,000+ monthly with our growing student base." },
  { icon: Globe, title: "Reach a global audience", desc: "Students from 120+ countries browse Molearn daily. Your knowledge can impact learners worldwide." },
  { icon: Clock, title: "Flexible schedule", desc: "Create content on your own time. No deadlines, no minimum hours. Teach at your own pace." },
]

const steps = [
  { step: "01", icon: Upload, title: "Create content", desc: "Record video tutorials or write e-books on your area of expertise. Use our creator tools to structure your course." },
  { step: "02", icon: CheckCircle, title: "Get reviewed", desc: "Our AI agents review your content for quality and completeness. Get helpful feedback in 2-3 business days." },
  { step: "03", icon: DollarSign, title: "Earn money", desc: "Once approved, your course goes live. You earn 70% of every sale, paid out monthly to your account." },
]

const stats = [
  { value: "500+", label: "Teachers on platform" },
  { value: "1,200+", label: "Courses published" },
  { value: "$2.4M+", label: "Total earnings" },
]

export default function TeachPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border">
        <div className="w-full flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-text-primary" style={{ fontFamily: "var(--font-logo)" }}>
            <BookOpen className="h-5 w-5 text-accent" />
            molearn
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Join</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight animate-fade-in-up">
          Share your knowledge,<br />earn revenue
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Turn your expertise into income. Create video tutorials and e-books, reach thousands of students, and get paid for what you know.
        </p>
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link href="/register">
            <Button size="lg" className="gap-2 text-base px-8">
              Start teaching now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full px-4 pb-16">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-accent">{s.value}</p>
              <p className="text-xs text-text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full px-4 pb-20">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-2">How it works</h2>
        <p className="text-sm text-text-secondary text-center mb-10">Three simple steps to start earning</p>
            <div className="grid gap-6 md:grid-cols-3 w-full">
          {steps.map((s) => (
            <div key={s.step} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">{s.step}</span>
              <h3 className="mt-3 text-base font-semibold text-text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border/40 py-20">
        <div className="w-full px-4">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-2">Why teach on Molearn?</h2>
          <p className="text-sm text-text-secondary text-center mb-10">Built for creators, designed for success</p>
              <div className="grid gap-6 md:grid-cols-3 w-full">
            {benefits.map((b) => (
              <div key={b.title} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <b.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{b.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings calculator mock */}
      <section className="w-full px-4 pb-20">
        <div className="max-w-md mx-auto bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center">
          <DollarSign className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-text-primary">Estimate your earnings</h3>
          <p className="text-sm text-text-secondary mt-1 mb-4">A $49 course with 100 students/year</p>
          <div className="text-3xl font-bold text-accent">$3,430<span className="text-sm font-normal text-text-muted">/year</span></div>
          <p className="text-xs text-text-muted mt-2">After our 30% platform fee</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/40 py-20">
        <div className="w-full px-4">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-text-primary pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-text-muted shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full px-4 pb-20 text-center">
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-10 w-full">
          <Users className="h-8 w-8 text-accent mx-auto mb-3" />
          <h2 className="text-xl font-bold text-text-primary">Join 500+ teachers</h2>
          <p className="text-sm text-text-secondary mt-2 mb-6">Start sharing your knowledge and earning today.</p>
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Start teaching now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
