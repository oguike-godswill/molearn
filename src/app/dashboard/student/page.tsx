"use client"

import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { BookOpen, Play, Clock, Star, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

const enrolledCourses = [
  { id: "1", title: "React from Zero to Production", teacher: "Sarah Chen", progress: 65, thumbnail: "https://picsum.photos/seed/react/400/225", rating: 4.8 },
  { id: "2", title: "Advanced TypeScript Patterns", teacher: "Marcus Johnson", progress: 30, thumbnail: "https://picsum.photos/seed/typescript/400/225", rating: 4.6 },
  { id: "3", title: "Python for Data Science", teacher: "Sarah Chen", progress: 80, thumbnail: "https://picsum.photos/seed/python/400/225", rating: 4.9 },
  { id: "4", title: "UI/UX Design Fundamentals", teacher: "Lisa Park", progress: 15, thumbnail: "https://picsum.photos/seed/design/400/225", rating: 4.7 },
]

export default function StudentDashboard() {
  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader title="Student Dashboard" description="Track your learning progress and discover new content." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={BookOpen} label="Enrolled Courses" value="4" color="bg-blue-500/10" />
        <StatCard icon={Play} label="Hours Watched" value="42" change="+12%" color="bg-purple-500/10" />
        <StatCard icon={Star} label="Reviews Given" value="6" color="bg-amber-500/10" />
        <StatCard icon={TrendingUp} label="Completion Rate" value="72%" change="+8%" color="bg-emerald-500/10" />
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Continue Learning</h2>
          <Link href="/browse" className="text-xs text-accent hover:underline flex items-center gap-1">
            Browse all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="group bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/20 transition-all">
              <div className="aspect-video bg-bg-elevated relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg-elevated">
                  <div className="h-full bg-accent transition-all" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-text-primary truncate">{course.title}</h3>
                <p className="text-xs text-text-muted mt-1">{course.teacher}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-text-muted">{course.progress}% complete</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs text-text-muted">{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl divide-y divide-border/40">
          {[
            { action: "Started course", detail: "Advanced TypeScript Patterns", time: "2 hours ago" },
            { action: "Completed module", detail: "React Hooks Deep Dive", time: "Yesterday" },
            { action: "Left a review", detail: "Python for Data Science ★★★★★", time: "3 days ago" },
            { action: "Purchased course", detail: "UI/UX Design Fundamentals", time: "1 week ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-primary">{activity.action}</p>
                  <p className="text-xs text-text-muted">{activity.detail}</p>
                </div>
              </div>
              <span className="text-[11px] text-text-muted shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
