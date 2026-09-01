"use client"

import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { Clock, CheckCircle, ChevronDown, ChevronUp, Star } from "lucide-react"
import { useState } from "react"

const pendingSubmissions = [
  { id: "1", student: "Amara Okafor", assignment: "React Component Architecture", cohort: "Web Dev Cohort 12", submitted: "2 hours ago" },
  { id: "2", student: "David Mensah", assignment: "Node.js REST API Design", cohort: "Web Dev Cohort 12", submitted: "5 hours ago" },
  { id: "3", student: "Grace Adeyemi", assignment: "CSS Grid Layout Challenge", cohort: "Web Dev Cohort 12", submitted: "1 day ago" },
  { id: "4", student: "Kwame Asante", assignment: "Flutter State Management", cohort: "Mobile Cohort 5", submitted: "1 day ago" },
  { id: "5", student: "Fatima Bello", assignment: "Database Schema Design", cohort: "Web Dev Cohort 12", submitted: "2 days ago" },
  { id: "6", student: "Emeka Obi", assignment: "API Authentication Flow", cohort: "Mobile Cohort 5", submitted: "3 days ago" },
]

const recentlyGraded = [
  { id: "1", student: "Chidi Nwosu", assignment: "JavaScript Closures & Scope", score: 92, graded: "Yesterday" },
  { id: "2", student: "Aisha Mohammed", assignment: "React Hooks Deep Dive", score: 85, graded: "2 days ago" },
  { id: "3", student: "Tunde Bakare", assignment: "HTML/CSS Landing Page", score: 78, graded: "3 days ago" },
  { id: "4", student: "Ngozi Eze", assignment: "TypeScript Generics", score: 95, graded: "4 days ago" },
]

export default function ReviewsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [graded, setGraded] = useState(recentlyGraded)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleSubmitGrade = (id: string, student: string, assignment: string) => {
    const score = parseInt(scores[id] || "0")
    if (score < 0 || score > 100 || !scores[id]) return

    setGraded([{ id, student, assignment, score, graded: "Just now" }, ...graded])
    setExpandedId(null)
  }

  return (
    <DashboardLayout role="AGENT">
      <DashboardHeader title="Assignment Reviews" description="Review and grade pending student submissions." />

      {/* Pending Submissions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Pending Submissions ({pendingSubmissions.length})</h2>
        <div className="space-y-3">
          {pendingSubmissions.map((sub) => (
            <div key={sub.id} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 shrink-0">
                    <Clock className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-text-primary truncate">{sub.assignment}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{sub.student} · {sub.cohort} · Submitted {sub.submitted}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(sub.id)}
                  className="h-8 px-3 rounded-lg bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {expandedId === sub.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  Review
                </button>
              </div>

              {expandedId === sub.id && (
                <div className="border-t border-border/30 p-5 bg-bg-elevated/20">
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">Score (0–100)</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="Enter score"
                        value={scores[sub.id] || ""}
                        onChange={(e) => setScores({ ...scores, [sub.id]: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg bg-bg-primary border border-border/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">Feedback</label>
                      <textarea
                        placeholder="Write feedback for the student..."
                        rows={3}
                        value={feedback[sub.id] || ""}
                        onChange={(e) => setFeedback({ ...feedback, [sub.id]: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={() => handleSubmitGrade(sub.id, sub.student, sub.assignment)}
                      className="h-9 px-4 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Submit Grade
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recently Graded */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recently Graded</h2>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Student</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Assignment</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Score</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Graded</th>
              </tr>
            </thead>
            <tbody>
              {graded.map((g) => (
                <tr key={g.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{g.student}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{g.assignment}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-semibold ${
                        g.score >= 90 ? "text-emerald-400" : g.score >= 70 ? "text-blue-400" : "text-amber-400"
                      }`}>{g.score}</span>
                      <span className="text-xs text-text-muted">/100</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-text-muted">{g.graded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
