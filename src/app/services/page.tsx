"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import {
  Share2,
  Palette,
  PenTool,
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle2,
  Send,
  Briefcase,
  FileText,
  Lightbulb,
  Truck,
  MessageSquare,
} from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Strategy, content creation, and community management across platforms",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Brand identity, marketing materials, social media graphics",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: PenTool,
    title: "Content Creation",
    description:
      "Blog posts, video content, copywriting for your brand",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing Strategy",
    description:
      "Data-driven campaigns, SEO, paid advertising",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Globe,
    title: "Website Design",
    description:
      "Modern, responsive websites built with latest technologies",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
]

const processSteps = [
  { icon: MessageSquare, label: "Inquiry", description: "Tell us about your project" },
  { icon: FileText, label: "Brief", description: "We define scope and goals" },
  { icon: Lightbulb, label: "Proposal", description: "Receive a tailored plan" },
  { icon: Truck, label: "Delivery", description: "Work executed by our team" },
  { icon: CheckCircle2, label: "Review", description: "Revisions until satisfied" },
]

const portfolioItems = [
  {
    title: "Brand Refresh for FinTech Startup",
    category: "Graphic Design",
    description: "Complete visual identity overhaul including logo, color system, and brand guidelines.",
  },
  {
    title: "Social Media Campaign — 3x Engagement",
    category: "Social Media",
    description: "90-day content strategy that tripled organic engagement for a retail brand.",
  },
  {
    title: "E-Commerce Website Redesign",
    category: "Website Design",
    description: "Modern storefront with 40% faster load times and improved conversion funnel.",
  },
]

const serviceOptions = [
  { value: "social-media", label: "Social Media Management" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "content-creation", label: "Content Creation" },
  { value: "digital-marketing", label: "Digital Marketing Strategy" },
  { value: "website-design", label: "Website Design" },
]

const budgetOptions = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1k", label: "$500 – $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-plus", label: "$5,000+" },
]

export default function ServicesPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.service || !formData.message) return
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
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-28 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-5">Services</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                MojeTech <span className="text-accent">Services</span>
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Professional digital services delivered by our trained students
                under expert supervision
              </p>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What We Offer
            </h2>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              High-quality digital services at student-friendly rates
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div
                  className={`h-11 w-11 rounded-xl ${service.bg} border ${service.border} flex items-center justify-center mb-4`}
                >
                  <service.icon className={`h-5 w-5 ${service.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  {service.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full bg-white/5 hover:bg-white/10 text-white"
                >
                  Request a Quote
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Our Process
              </h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                From first contact to final delivery — streamlined and transparent
              </p>
            </motion.div>

            {/* Desktop horizontal stepper */}
            <div className="hidden md:block">
              <div className="relative flex items-start justify-between">
                {/* Connector line */}
                <div className="absolute top-6 left-[10%] right-[10%] h-px bg-white/10" />
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative flex flex-col items-center text-center w-1/5"
                  >
                    <div className="relative z-10 h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                      <step.icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-sm font-bold text-white">
                      {step.label}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {step.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile vertical stepper */}
            <div className="md:hidden space-y-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <step.icon className="h-4 w-4 text-accent" />
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="w-px h-8 bg-white/10 mt-2" />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <span className="text-sm font-bold text-white">
                      {step.label}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio / Case Studies */}
        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Our Work
              </h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                Real results from projects delivered by our student teams
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition-colors"
                >
                  <div className="h-40 bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent flex items-center justify-center">
                    <Briefcase className="h-10 w-10 text-accent/30" />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {item.category}
                    </Badge>
                    <h3 className="text-base font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Get a Quote
              </h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                Tell us about your project and we&apos;ll put together a tailored
                proposal
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our team will review your request
                    and get back to you within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        company: "",
                        service: "",
                        budget: "",
                        message: "",
                      })
                    }}
                    className="mt-6 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2">Your Name</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Company</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                      label="Service Needed"
                      options={serviceOptions}
                      value={formData.service}
                      onChange={(val) =>
                        setFormData({ ...formData, service: val })
                      }
                      placeholder="Select a service"
                    />
                    <Select
                      label="Budget Range"
                      options={budgetOptions}
                      value={formData.budget}
                      onChange={(val) =>
                        setFormData({ ...formData, budget: val })
                      }
                      placeholder="Select budget"
                    />
                  </div>

                  <div>
                    <Label className="mb-2">Message</Label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your project, goals, and timeline..."
                      className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

