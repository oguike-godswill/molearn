"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  Clock,
  Video,
  X,
  FileText,
  Star,
  ChevronRight,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const mentors = [
  {
    id: "m1",
    name: "Sarah Chen",
    role: "Senior Digital Marketing Strategist",
    bio: "10+ years leading growth at top agencies. Specializes in SEO, paid media, and analytics-driven campaigns.",
    expertise: ["SEO", "Paid Media", "Analytics", "Growth Strategy"],
    initials: "SC",
    accentColor: "bg-violet-500/20 text-violet-400",
  },
  {
    id: "m2",
    name: "James Okafor",
    role: "Content & Brand Lead",
    bio: "Former head of content at a Fortune 500. Expert in brand storytelling, content strategy, and social media.",
    expertise: ["Content Strategy", "Branding", "Social Media", "Copywriting"],
    initials: "JO",
    accentColor: "bg-emerald-500/20 text-emerald-400",
  },
]

const availableSlots = [
  { id: "s1", date: "Wed, Jan 15", time: "10:00 AM", duration: "30 min", mentorId: "m1" },
  { id: "s2", date: "Wed, Jan 15", time: "2:00 PM", duration: "1 hr", mentorId: "m2" },
  { id: "s3", date: "Thu, Jan 16", time: "11:00 AM", duration: "30 min", mentorId: "m1" },
  { id: "s4", date: "Fri, Jan 17", time: "3:00 PM", duration: "1 hr", mentorId: "m2" },
  { id: "s5", date: "Mon, Jan 20", time: "9:00 AM", duration: "30 min", mentorId: "m1" },
]

const upcomingSessions = [
  {
    id: "u1",
    title: "SEO Strategy Review",
    date: "Tue, Jan 14 at 10:00 AM",
    mentor: "Sarah Chen",
    mentorId: "m1",
    duration: "30 min",
  },
  {
    id: "u2",
    title: "Content Calendar Planning",
    date: "Thu, Jan 16 at 2:00 PM",
    mentor: "James Okafor",
    mentorId: "m2",
    duration: "1 hr",
  },
  {
    id: "u3",
    title: "Campaign Performance Deep Dive",
    date: "Mon, Jan 20 at 11:00 AM",
    mentor: "Sarah Chen",
    mentorId: "m1",
    duration: "30 min",
  },
]

const pastSessions = [
  {
    id: "p1",
    title: "Introduction to Analytics Tools",
    date: "Jan 8, 2026",
    mentor: "Sarah Chen",
    status: "Completed" as const,
    notes: "Covered Google Analytics 4 setup, event tracking, and custom dashboards. Action items: set up conversion goals by next week.",
  },
  {
    id: "p2",
    title: "Social Media Audit",
    date: "Jan 5, 2026",
    mentor: "James Okafor",
    status: "Completed" as const,
    notes: "Reviewed current social channels. Identified gaps in posting frequency and audience engagement. Recommended 3x/week cadence.",
  },
  {
    id: "p3",
    title: "Keyword Research Workshop",
    date: "Jan 2, 2026",
    mentor: "Sarah Chen",
    status: "No-show" as const,
    notes: null,
  },
  {
    id: "p4",
    title: "Brand Voice Definition",
    date: "Dec 28, 2025",
    mentor: "James Okafor",
    status: "Completed" as const,
    notes: "Defined brand tone guidelines and content pillars. Drafted sample posts for review.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
}

export default function MentorshipPage() {
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [cancelledSessions, setCancelledSessions] = useState<string[]>([])
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null)

  const handleBookSlot = (slotId: string) => {
    setBookedSlots((prev) => [...prev, slotId])
  }

  const handleCancelSession = (sessionId: string) => {
    setCancelledSessions((prev) => [...prev, sessionId])
  }

  const toggleNotes = (sessionId: string) => {
    setExpandedNotes((prev) => (prev === sessionId ? null : sessionId))
  }

  const getMentorById = (id: string) => mentors.find((m) => m.id === id)

  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader
        title="Mentorship"
        description="Book sessions with your mentors and track your mentorship journey."
      />

      {/* Mentor Profiles */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Users className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Your Mentors</h2>
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {mentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              variants={item}
              className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full shrink-0 font-semibold text-sm ${mentor.accentColor}`}
                >
                  {mentor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-text-primary">{mentor.name}</h3>
                  <p className="text-xs text-accent mb-2">{mentor.role}</p>
                  <p className="text-sm text-text-secondary mb-3">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-bg-elevated text-text-muted border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Available Slots */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Available Slots</h2>
          <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
            {availableSlots.filter((s) => !bookedSlots.includes(s.id)).length} open
          </span>
        </div>

        <motion.div
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl divide-y divide-border/40"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {availableSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot.id)
            const mentor = getMentorById(slot.mentorId)

            return (
              <motion.div
                key={slot.id}
                variants={item}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {slot.date} at {slot.time}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {slot.duration}
                      </span>
                      <span>with {mentor?.name}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant={isBooked ? "secondary" : "primary"}
                  size="sm"
                  disabled={isBooked}
                  onClick={() => handleBookSlot(slot.id)}
                  className="shrink-0"
                >
                  {isBooked ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Booked
                    </>
                  ) : (
                    "Book"
                  )}
                </Button>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Upcoming Sessions */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Video className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Upcoming Sessions</h2>
          <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
            {upcomingSessions.filter((s) => !cancelledSessions.includes(s.id)).length}
          </span>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {upcomingSessions.map((session) => {
            const isCancelled = cancelledSessions.includes(session.id)

            return (
              <motion.div
                key={session.id}
                variants={item}
                className={`bg-bg-secondary/50 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 ${
                  isCancelled ? "border-border/30 opacity-50" : "border-border/60 hover:border-accent/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-text-primary">{session.title}</h3>
                  {isCancelled && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 shrink-0">
                      Cancelled
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-xs text-text-muted mb-4">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {session.date}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {session.duration}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    {session.mentor}
                  </p>
                </div>
                {!isCancelled && (
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <Video className="h-3.5 w-3.5" />
                      Join
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelSession(session.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Past Sessions */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Past Sessions</h2>
        </div>

        <motion.div
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl divide-y divide-border/40"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {pastSessions.map((session) => (
            <motion.div key={session.id} variants={item}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${
                      session.status === "Completed"
                        ? "bg-emerald-500/10"
                        : "bg-amber-500/10"
                    }`}
                  >
                    {session.status === "Completed" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">{session.title}</p>
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                      <span>{session.date}</span>
                      <span>with {session.mentor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      session.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {session.status}
                  </span>
                  {session.notes && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleNotes(session.id)}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {expandedNotes === session.id ? "Hide Notes" : "View Notes"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Session Notes */}
              <AnimatePresence>
                {expandedNotes === session.id && session.notes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" as const }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-0">
                      <div className="bg-bg-elevated/60 border border-border/40 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-3.5 w-3.5 text-accent" />
                          <span className="text-xs font-medium text-accent">Session Notes</span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {session.notes}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </DashboardLayout>
  )
}
