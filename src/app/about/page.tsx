"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { Target, Eye, Heart, Shield, Users, Link as LinkIcon, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const team = [
  {
    name: "Chidinma Okafor",
    role: "Founder",
    bio: "Former digital marketing lead passionate about bridging the skills gap for young Nigerians.",
    initials: "CO",
    accent: "bg-accent",
  },
  {
    name: "Emeka Adeyemi",
    role: "Head of Curriculum",
    bio: "EdTech specialist with 8+ years designing practical, industry-aligned learning programs.",
    initials: "EA",
    accent: "bg-purple-500",
  },
  {
    name: "Aisha Bello",
    role: "Lead Mentor — Marketing",
    bio: "Growth marketer who has trained 200+ students in social media and digital advertising.",
    initials: "AB",
    accent: "bg-emerald-500",
  },
  {
    name: "Tunde Fashola",
    role: "Lead Mentor — Design",
    bio: "UI/UX designer and brand strategist with clients across Lagos and Nairobi.",
    initials: "TF",
    accent: "bg-amber-500",
  },
  {
    name: "Ngozi Eze",
    role: "Community Manager",
    bio: "Builds vibrant learner communities and ensures every student feels supported.",
    initials: "NE",
    accent: "bg-cyan-500",
  },
  {
    name: "Yusuf Ibrahim",
    role: "Operations Lead",
    bio: "Logistics and operations expert keeping MojeTech running smoothly behind the scenes.",
    initials: "YI",
    accent: "bg-rose-500",
  },
]

const milestones = [
  { year: "2024", event: "Founded in Lagos", description: "MojeTech was born from a desire to close the digital skills gap in Nigeria." },
  { year: "2024", event: "First cohort of 25 students", description: "Launched our inaugural program with 25 eager learners across 3 tracks." },
  { year: "2025", event: "Expanded to 5 programs", description: "Added graphic design, content creation, and web development to our catalog." },
  { year: "2025", event: "Launched services arm", description: "Started offering real-world project experience through our services division." },
  { year: "2026", event: "500+ graduates milestone", description: "Over 500 young Nigerians equipped with job-ready digital skills." },
]

const values = [
  {
    icon: Target,
    title: "Practical Learning",
    description: "Every lesson leads to a real skill you can use",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We learn together, grow together",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Expert-reviewed content you can trust",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Education should not be a privilege",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
]

export default function AboutPage() {
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                About Us
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                About <span className="text-accent">MojeTech</span>
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                We&apos;re on a mission to equip young Nigerians with practical digital skills that lead to real opportunities.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Founder Story */}
        <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                Our Founder
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                The Story Behind MojeTech
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-lg shrink-0">
                  CO
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Chidinma Okafor</h3>
                  <p className="text-sm text-gray-400">Founder, MojeTech</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Former digital marketing lead at a Lagos agency. Saw the gap between what schools teach and what employers need.
              </p>
              <blockquote className="border-l-2 border-accent pl-4 py-2 mb-6">
                <p className="text-gray-300 italic leading-relaxed">
                  &ldquo;I watched talented graduates struggle to find work because they lacked the practical digital skills employers actually wanted. MojeTech exists to change that — to give young Nigerians the hands-on training that turns potential into careers.&rdquo;
                </p>
              </blockquote>
              <p className="text-gray-400 leading-relaxed">
                What started as weekend workshops in a Lagos co-working space has grown into a full learning platform with multiple programs, a services arm, and a thriving community of over 500 graduates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-transparent border border-white/5 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-accent font-extrabold text-4xl">
                  CO
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To provide accessible, practical digital skills training that connects young Nigerians to career opportunities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                  <Eye className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  To become West Africa&apos;s leading platform for digital skills education and talent development.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Values</h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center"
                >
                  <div className={`h-12 w-12 rounded-xl ${value.bg} border ${value.border} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Meet the Team</h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                The people building MojeTech and mentoring the next generation
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-14 w-14 rounded-full ${member.accent}/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{member.name}</h3>
                      <p className="text-xs text-accent font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{member.bio}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-accent transition-colors"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline / Milestones */}
        <section className="border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Journey</h2>
              <p className="mt-3 text-gray-400 max-w-lg mx-auto">
                Key milestones in the MojeTech story
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

              {milestones.map((milestone, i) => (
                <motion.div
                  key={`${milestone.year}-${milestone.event}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent border-4 border-bg-primary z-10 mt-1" />

                  {/* Content */}
                  <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-4 sm:text-right" : "sm:pl-4"}`}>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent/10 text-accent border border-accent/20 mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">{milestone.event}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to start your journey?
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Join hundreds of young Nigerians building real digital skills with MojeTech.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/programs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/20"
                >
                  Explore Programs
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

