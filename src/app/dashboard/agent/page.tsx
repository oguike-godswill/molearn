"use client"

import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Users, GraduationCap, Clock, CalendarDays, BookOpen, ChevronRight } from "lucide-react"

const activeCohorts = [
  { id: "1", name: "Web Development Cohort 12", students: 24, startDate: "Jun 1, 2026", status: "In Progress" },
  { id: "2", name: "Mobile App Development Cohort 5", students: 21, startDate: "Jul 10, 2026", status: "In Progress" },
]

const recentActivity = [
  { id: "1", action: "Assignment submitted", student: "Amara Okafor", detail: "React Component Architecture", time: "2 hours ago" },
  { id: "2", action: "Grade posted", student: "David Mensah", detail: "Node.js REST API — 88/100", time: "5 hours ago" },
  { id: "3", action: "Session completed", student: "Fatima Bello", detail: "1-on-1 Mentoring Session", time: "Yesterday" },
  { id: "4", action: "New enrollment", student: "Kwame Asante", detail: "Web Development Cohort 12", time: "Yesterday" },
  { id: "5", action: "Assignment submitted", student: "Grace Adeyemi", detail: "CSS Grid Layout Challenge", time: "2 days ago" },
]

const upcomingSessions = [
  { id: "1", title: "Office Hours — Web Dev Cohort 12", date: "Tomorrow", time: "10:00 AM", type: "Group", students: 24 },
  { id: "2", title: "1-on-1 with Amara Okafor", date: "Wed, Jul 30", time: "2:00 PM", type: "1-on-1", students: 1 },
  { id: "3", title: "Code Review — Mobile Cohort 5", date: "Thu, Jul 31", time: "11:00 AM", type: "Group", students: 21 },
]

export default function MentorDashboard() {
  return (
    <DashboardLayout role="AGENT">
      <DashboardHeader title="Mentor Dashboard" description="Manage your cohorts, review assignments, and track student progress." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={Users} label="Assigned Cohorts" value="2" color="bg-blue-500/10" />
        <StatCard icon={GraduationCap} label="Total Students" value="45" change="+3" color="bg-emerald-500/10" />
        <StatCard icon={Clock} label="Pending Reviews" value="12" color="bg-amber-500/10" />
        <StatCard icon={CalendarDays} label="Sessions This Week" value="3" color="bg-purple-500/10" />
      </div>

      {/* Active Cohorts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Active Cohorts</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {activeCohorts.map((cohort) => (
            <div key={cohort.id} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-text-primary truncate">{cohort.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">Started {cohort.startDate}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-text-muted shrink-0 mt-1" />
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-xs text-text-secondary">{cohort.students} students</span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{cohort.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl divide-y divide-border/30">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 shrink-0 mt-0.5">
                  <BookOpen className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{item.action}</span>
                    <span className="text-text-muted"> — </span>
                    <span className="text-text-secondary">{item.student}</span>
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 truncate">{item.detail}</p>
                </div>
                <span className="text-[10px] text-text-muted shrink-0 mt-0.5">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-text-primary">{session.title}</h3>
                    <p className="text-xs text-text-muted mt-1">{session.date} · {session.time}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    session.type === "Group" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                  }`}>{session.type}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/30">
                  <GraduationCap className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-xs text-text-secondary">{session.students} {session.students === 1 ? "student" : "students"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
