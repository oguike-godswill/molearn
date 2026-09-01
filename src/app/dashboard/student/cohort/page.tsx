"use client"

import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Users, Megaphone, BookOpen, Video, ChevronRight, Pin, Send, ExternalLink, GraduationCap, Timer, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const announcements = [
  {
    id: 1,
    title: "Final Project Deadline Extended",
    content: "The deadline for the final capstone project has been extended to March 25. Use this extra time to polish your deliverables and ensure all requirements are met.",
    date: "Feb 20, 2026",
    from: "Tunde Akinwale",
    role: "Mentor",
    pinned: true,
  },
  {
    id: 2,
    title: "Guest Speaker Session — SEO Trends 2026",
    content: "We have a special guest speaker joining us next Thursday to discuss the latest SEO trends and algorithm updates. Attendance is mandatory.",
    date: "Feb 18, 2026",
    from: "Admin",
    role: "Admin",
    pinned: false,
  },
  {
    id: 3,
    title: "Assignment 3 Grades Released",
    content: "Grades for Assignment 3 (Social Media Strategy) have been posted. Check your feedback and reach out if you have questions.",
    date: "Feb 15, 2026",
    from: "Tunde Akinwale",
    role: "Mentor",
    pinned: false,
  },
  {
    id: 4,
    title: "Cohort Meetup — Virtual Hangout",
    content: "Join us this Friday for a casual virtual hangout. A great chance to network and connect with your cohort mates outside of class.",
    date: "Feb 12, 2026",
    from: "Admin",
    role: "Admin",
    pinned: false,
  },
]

const classmates = [
  { name: "Amina Bello", initials: "AB", track: "SEO & Content" },
  { name: "Chidi Okonkwo", initials: "CO", track: "Social Media" },
  { name: "Fatima Yusuf", initials: "FY", track: "Email Marketing" },
  { name: "Emeka Nwankwo", initials: "EN", track: "Paid Ads" },
  { name: "Blessing Eze", initials: "BE", track: "SEO & Content" },
  { name: "Oluwaseun Adeyemi", initials: "OA", track: "Analytics" },
  { name: "Ngozi Ikenna", initials: "NI", track: "Social Media" },
  { name: "Ibrahim Musa", initials: "IM", track: "Paid Ads" },
  { name: "Chidinma Uche", initials: "CU", track: "Email Marketing" },
  { name: "Yusuf Abdullahi", initials: "YA", track: "Analytics" },
]

const assignments = [
  { id: 1, title: "Market Research Report", dueDate: "Jan 20, 2026", status: "graded" as const, score: "88/100" },
  { id: 2, title: "Content Calendar Creation", dueDate: "Jan 31, 2026", status: "graded" as const, score: "92/100" },
  { id: 3, title: "Social Media Strategy Deck", dueDate: "Feb 10, 2026", status: "graded" as const, score: "76/100" },
  { id: 4, title: "Email Campaign Blueprint", dueDate: "Feb 28, 2026", status: "submitted" as const, score: null },
  { id: 5, title: "Final Capstone Project", dueDate: "Mar 25, 2026", status: "pending" as const, score: null },
]

const liveSessions = [
  { id: 1, title: "SEO Deep Dive — On-Page & Technical", date: "Feb 27, 2026", time: "10:00 AM WAT", duration: "90 min", mentor: "Tunde Akinwale", status: "live" as const },
  { id: 2, title: "Paid Ads Masterclass — Google & Meta", date: "Mar 4, 2026", time: "2:00 PM WAT", duration: "60 min", mentor: "Tunde Akinwale", status: "upcoming" as const },
  { id: 3, title: "Analytics & Reporting Workshop", date: "Mar 11, 2026", time: "10:00 AM WAT", duration: "75 min", mentor: "Tunde Akinwale", status: "upcoming" as const },
  { id: 4, title: "Portfolio Review & Career Prep", date: "Mar 20, 2026", time: "3:00 PM WAT", duration: "90 min", mentor: "Tunde Akinwale", status: "upcoming" as const },
]

function StatusBadge({ status }: { status: "submitted" | "graded" | "pending" }) {
  const config = {
    submitted: { label: "Submitted", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    graded: { label: "Graded", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    pending: { label: "Pending", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  }
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${className}`}>
      {status === "submitted" && <Send className="h-3 w-3" />}
      {status === "graded" && <CheckCircle2 className="h-3 w-3" />}
      {status === "pending" && <AlertCircle className="h-3 w-3" />}
      {label}
    </span>
  )
}

function SessionStatusBadge({ status }: { status: "live" | "upcoming" | "completed" }) {
  const config = {
    live: { label: "Live Now", className: "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse" },
    upcoming: { label: "Upcoming", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    completed: { label: "Completed", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  }
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${className}`}>
      {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-red-400" />}
      {label}
    </span>
  )
}

export default function CohortPage() {
  const [activeTab, setActiveTab] = useState<"announcements" | "classmates">("announcements")

  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader title="My Cohort" description="Stay connected with your cohort and track your progress." />

      {/* Cohort Info Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
            <GraduationCap className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-text-primary">Digital Marketing Cohort 5</h2>
            <p className="text-sm text-text-muted">MojeTech LMS — Cohort Program</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="text-[11px] text-text-muted">Start Date</p>
              <p className="text-sm font-medium text-text-primary">Jan 6, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="text-[11px] text-text-muted">End Date</p>
              <p className="text-sm font-medium text-text-primary">Mar 28, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Timer className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="text-[11px] text-text-muted">Days Remaining</p>
              <p className="text-sm font-medium text-accent">34 days</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Users className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="text-[11px] text-text-muted">Mentor</p>
              <p className="text-sm font-medium text-text-primary">Tunde Akinwale</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Left Column — Announcements & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Switcher */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex gap-1 p-1 bg-bg-secondary/50 border border-border/60 rounded-xl w-fit">
            {(["announcements", "classmates"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  activeTab === tab ? "bg-accent/10 text-accent" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Announcements Feed */}
          <AnimatePresence mode="wait">
            {activeTab === "announcements" && (
              <motion.div
                key="announcements"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                variants={stagger}
                className="space-y-3"
              >
                {announcements.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className={`bg-bg-secondary/50 backdrop-blur-sm border rounded-xl p-5 transition-all hover:border-border-hover ${
                      item.pinned ? "border-accent/30 ring-1 ring-accent/5" : "border-border/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {item.pinned && <Pin className="h-3.5 w-3.5 text-accent shrink-0" />}
                        <h3 className="text-sm font-semibold text-text-primary truncate">{item.title}</h3>
                      </div>
                      <span className="text-[11px] text-text-muted shrink-0">{item.date}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{item.content}</p>
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-3 w-3 text-text-muted" />
                      <span className="text-[11px] text-text-muted">
                        From: <span className="text-text-secondary">{item.from}</span> · {item.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Classmates List */}
            {activeTab === "classmates" && (
              <motion.div
                key="classmates"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                variants={stagger}
                className="grid gap-3 sm:grid-cols-2"
              >
                {classmates.map((student, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="group bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex items-center gap-3 hover:border-border-hover transition-all"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-semibold shrink-0">
                      {student.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{student.name}</p>
                      <p className="text-[11px] text-text-muted">{student.track}</p>
                    </div>
                    <Link
                      href="#"
                      className="text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0"
                    >
                      View Profile <ExternalLink className="h-3 w-3" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Assignments Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-accent" />
              <h2 className="text-lg font-semibold text-text-primary">Assignments</h2>
            </div>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
              {assignments.map((assignment) => (
                <motion.div
                  key={assignment.id}
                  variants={fadeUp}
                  className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-border-hover transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-text-primary truncate">{assignment.title}</h3>
                      <StatusBadge status={assignment.status} />
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {assignment.dueDate}
                      </span>
                      {assignment.score && (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          Score: {assignment.score}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {assignment.status === "pending" && (
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors"
                      >
                        <Send className="h-3 w-3" />
                        Submit
                      </Link>
                    )}
                    {assignment.status === "graded" && (
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary border border-border/60 hover:border-border-hover rounded-lg transition-colors"
                      >
                        <BookOpen className="h-3 w-3" />
                        View Feedback
                      </Link>
                    )}
                    {assignment.status === "submitted" && (
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Awaiting grade
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column — Live Sessions */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-4 w-4 text-accent" />
              <h2 className="text-lg font-semibold text-text-primary">Live Sessions</h2>
            </div>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
              {liveSessions.map((session) => (
                <motion.div
                  key={session.id}
                  variants={fadeUp}
                  className={`bg-bg-secondary/50 backdrop-blur-sm border rounded-xl p-4 transition-all ${
                    session.status === "live" ? "border-red-500/30 ring-1 ring-red-500/10" : "border-border/60 hover:border-border-hover"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-medium text-text-primary leading-snug">{session.title}</h3>
                    <SessionStatusBadge status={session.status} />
                  </div>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-[11px] text-text-muted">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span>{session.date} · {session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-text-muted">
                      <Users className="h-3 w-3 shrink-0" />
                      <span>{session.mentor}</span>
                    </div>
                  </div>
                  {session.status === "live" ? (
                    <Link
                      href="#"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      Join Session
                    </Link>
                  ) : session.status === "upcoming" ? (
                    <Link
                      href="#"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-text-secondary border border-border/60 hover:border-border-hover rounded-lg transition-colors"
                    >
                      <Video className="h-3 w-3" />
                      Join Session
                    </Link>
                  ) : (
                    <Link
                      href="#"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-text-muted rounded-lg bg-bg-elevated/50"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      View Recording
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Your Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Assignments Completed</span>
                <span className="text-sm font-semibold text-text-primary">3/5</span>
              </div>
              <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Sessions Attended</span>
                <span className="text-sm font-semibold text-text-primary">6/10</span>
              </div>
              <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Average Score</span>
                <span className="text-sm font-semibold text-accent">85%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
