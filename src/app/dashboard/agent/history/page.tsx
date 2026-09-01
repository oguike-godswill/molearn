"use client"

import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { CalendarDays, Clock, Users, User, ChevronDown, ChevronUp, Filter } from "lucide-react"
import { useState } from "react"

const sessionLog = [
  { id: "1", student: "Amara Okafor", type: "1-on-1", date: "Jul 28, 2026", time: "2:00 PM", duration: "45 min", status: "Completed", notes: "Reviewed React component architecture. Amara is progressing well with hooks and state management. Discussed useEffect cleanup patterns and custom hooks. Assigned practice with context API." },
  { id: "2", student: "Web Dev Cohort 12", type: "Group", date: "Jul 27, 2026", time: "10:00 AM", duration: "1 hr 30 min", status: "Completed", notes: "Covered REST API design principles and Express.js middleware. Students had questions about authentication flows. Assigned group project for building a CRUD API." },
  { id: "3", student: "David Mensah", type: "1-on-1", date: "Jul 25, 2026", time: "3:00 PM", duration: "30 min", status: "Completed", notes: "Debugged Node.js async issues. David was struggling with Promise chaining vs async/await. Walked through error handling patterns and middleware sequencing." },
  { id: "4", student: "Mobile Cohort 5", type: "Group", date: "Jul 24, 2026", time: "11:00 AM", duration: "1 hr", status: "Completed", notes: "Introduction to Flutter widgets and state management. Covered StatelessWidget vs StatefulWidget, and basic Provider pattern. Students built a simple counter app." },
  { id: "5", student: "Fatima Bello", type: "1-on-1", date: "Jul 23, 2026", time: "1:00 PM", duration: "45 min", status: "Completed", notes: "Reviewed database schema design assignment. Fatima showed strong understanding of normalization. Discussed indexing strategies and query optimization basics." },
  { id: "6", student: "Grace Adeyemi", type: "1-on-1", date: "Jul 22, 2026", time: "4:00 PM", duration: "30 min", status: "Completed", notes: "CSS Grid and Flexbox review. Grace needed help with responsive layouts. Practiced building a dashboard layout using CSS Grid with auto-fit and minmax." },
  { id: "7", student: "Web Dev Cohort 12", type: "Group", date: "Jul 21, 2026", time: "10:00 AM", duration: "1 hr 30 min", status: "Completed", notes: "Git workflow workshop. Covered branching strategies, merge vs rebase, and pull request best practices. Students practiced resolving merge conflicts in pairs." },
  { id: "8", student: "Kwame Asante", type: "1-on-1", date: "Jul 20, 2026", time: "2:00 PM", duration: "45 min", status: "Completed", notes: "Flutter navigation and routing. Kwame is building a multi-screen app. Discussed named routes, Navigator 2.0 basics, and passing data between screens." },
  { id: "9", student: "Emeka Obi", type: "1-on-1", date: "Jul 18, 2026", time: "3:30 PM", duration: "30 min", status: "Cancelled", notes: "" },
  { id: "10", student: "Mobile Cohort 5", type: "Group", date: "Jul 17, 2026", time: "11:00 AM", duration: "1 hr", status: "Completed", notes: "API integration workshop. Students learned to fetch data from REST APIs using http package in Flutter. Covered JSON parsing, error handling, and loading states." },
]

export default function SessionHistoryPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<"All" | "1-on-1" | "Group">("All")
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Cancelled">("All")

  const filtered = sessionLog.filter((s) => {
    if (typeFilter !== "All" && s.type !== typeFilter) return false
    if (statusFilter !== "All" && s.status !== statusFilter) return false
    return true
  })

  return (
    <DashboardLayout role="AGENT">
      <DashboardHeader title="Session History" description="View your past mentoring sessions and notes." />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Filter className="h-4 w-4" />
          <span>Filter:</span>
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
          className="h-8 px-3 rounded-lg bg-bg-secondary border border-border/60 text-xs text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
        >
          <option value="All">All Types</option>
          <option value="1-on-1">1-on-1</option>
          <option value="Group">Group</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="h-8 px-3 rounded-lg bg-bg-secondary border border-border/60 text-xs text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <span className="text-xs text-text-muted ml-auto">{filtered.length} sessions</span>
      </div>

      {/* Session Log */}
      <div className="space-y-3">
        {filtered.map((session) => (
          <div key={session.id} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                  session.type === "Group" ? "bg-blue-500/10" : "bg-purple-500/10"
                }`}>
                  {session.type === "Group" ? (
                    <Users className="h-5 w-5 text-blue-400" />
                  ) : (
                    <User className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">{session.student}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-text-muted">{session.date}</span>
                    <span className="text-xs text-text-muted">{session.time}</span>
                    <span className="text-xs text-text-muted">{session.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  session.type === "Group" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                }`}>{session.type}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  session.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                }`}>{session.status}</span>
                {session.notes && (
                  <button
                    onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
                    className="h-8 px-3 rounded-lg bg-bg-elevated text-text-secondary text-xs font-medium hover:text-text-primary transition-colors flex items-center gap-1.5"
                  >
                    {expandedId === session.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    View Notes
                  </button>
                )}
              </div>
            </div>

            {expandedId === session.id && session.notes && (
              <div className="border-t border-border/30 p-5 bg-bg-elevated/20">
                <p className="text-sm text-text-secondary leading-relaxed">{session.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
