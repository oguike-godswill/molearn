"use client"

import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { BookOpen, Play, Clock, Award, FileText, ArrowRight, Video, Calendar, Users, GraduationCap, MessageSquare, Trophy, Megaphone, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const recentActivity = [
  { icon: Play, label: "Completed lesson: Introduction to SEO", time: "2 hours ago", color: "bg-emerald-500/10 text-emerald-400" },
  { icon: FileText, label: "Submitted assignment: Social Media Strategy", time: "Yesterday", color: "bg-blue-500/10 text-blue-400" },
  { icon: Video, label: "Joined live session: Content Marketing 101", time: "2 days ago", color: "bg-purple-500/10 text-purple-400" },
  { icon: Trophy, label: "Earned badge: First Assignment", time: "3 days ago", color: "bg-amber-500/10 text-amber-400" },
  { icon: Megaphone, label: "New announcement from mentor", time: "4 days ago", color: "bg-pink-500/10 text-pink-400" },
]

const upcomingEvents = [
  { title: "Live Session: SEO Deep Dive", date: "Wed, Jan 15 at 7:00 PM", type: "Live Session" as const },
  { title: "Workshop: Analytics Tools", date: "Fri, Jan 17 at 3:00 PM", type: "Workshop" as const },
  { title: "Assignment Due: Campaign Report", date: "Mon, Jan 20 at 11:59 PM", type: "Deadline" as const },
]

const quickLinks = [
  { label: "Continue Learning", href: "/dashboard/student/courses", icon: BookOpen, color: "bg-blue-500/10" },
  { label: "Community Forum", href: "/community", icon: MessageSquare, color: "bg-purple-500/10" },
  { label: "My Certificates", href: "/dashboard/student/certificates", icon: GraduationCap, color: "bg-emerald-500/10" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
}

export default function StudentDashboard() {
  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader title="Student Dashboard" description="Track your learning progress and stay on top of your goals." />

      {/* Welcome + Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-1">Welcome back, Alex!</h2>
          <p className="text-sm text-text-muted mb-4">You&apos;re making great progress. Keep it up!</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Overall Course Completion</span>
            <span className="text-xs font-medium text-accent">45%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-bg-elevated overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Active Cohort Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-accent/20 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent">Active Cohort</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">34 days remaining</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-3">Digital Marketing Cohort 5</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Next Live Session</p>
                  <p className="text-text-primary font-medium">Wed, Jan 15 at 7:00 PM</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Progress</p>
                  <p className="text-text-primary font-medium">45% complete</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Days Remaining</p>
                  <p className="text-text-primary font-medium">34 days</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/student/courses"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <motion.div variants={item}>
          <StatCard icon={BookOpen} label="Courses Enrolled" value="2" color="bg-blue-500/10" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard icon={Play} label="Lessons Completed" value="28/62" color="bg-purple-500/10" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard icon={FileText} label="Assignments Submitted" value="5" color="bg-amber-500/10" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard icon={Award} label="Certificates Earned" value="1" color="bg-emerald-500/10" />
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl divide-y divide-border/40">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${activity.color.split(" ")[0]}`}>
                  <activity.icon className={`h-3.5 w-3.5 ${activity.color.split(" ")[1]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{activity.label}</p>
                </div>
                <span className="text-[11px] text-text-muted shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4">Upcoming Events</h2>
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl divide-y divide-border/40">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">{event.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{event.date}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    event.type === "Live Session"
                      ? "bg-blue-500/10 text-blue-400"
                      : event.type === "Workshop"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {event.type}
                  </span>
                </div>
                {event.type === "Live Session" && (
                  <button className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors">
                    <Video className="h-3 w-3" />
                    Join
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 hover:border-accent/20 transition-all"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color} shrink-0`}>
                <link.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{link.label}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
