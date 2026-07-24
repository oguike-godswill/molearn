"use client"

import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Clock, CheckCircle, XCircle, Star, Eye, ThumbsUp, AlertCircle } from "lucide-react"

const pendingReviews = [
  { id: "1", title: "Flutter Mobile Development", teacher: "Sarah Chen", submitted: "2 days ago", type: "VIDEO", price: 4499 },
  { id: "2", title: "Advanced CSS Grid Layouts", teacher: "Mike Johnson", submitted: "5 days ago", type: "BOOK", price: 2499 },
  { id: "3", title: "Rust Systems Programming", teacher: "Alex Rivera", submitted: "1 week ago", type: "VIDEO", price: 5999 },
]

const reviewHistory = [
  { id: "1", title: "React from Zero to Production", teacher: "Sarah Chen", verdict: "APPROVED", date: "Jun 28, 2026", rating: 4.8 },
  { id: "2", title: "Advanced TypeScript Patterns", teacher: "Marcus Johnson", verdict: "APPROVED", date: "Jun 15, 2026", rating: 4.6 },
  { id: "3", title: "Python for Data Science", teacher: "Sarah Chen", verdict: "APPROVED", date: "Jun 2, 2026", rating: 4.9 },
  { id: "4", title: "Node.js Performance Guide", teacher: "Lisa Park", verdict: "REJECTED", date: "May 20, 2026", rating: 0 },
]

export default function AgentDashboard() {
  return (
    <DashboardLayout role="AGENT">
      <DashboardHeader title="Agent Dashboard" description="Review and verify content quality across the platform." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={Clock} label="Pending Reviews" value="3" color="bg-amber-500/10" />
        <StatCard icon={CheckCircle} label="Approved This Month" value="12" change="+4" color="bg-emerald-500/10" />
        <StatCard icon={XCircle} label="Rejected This Month" value="2" color="bg-red-500/10" />
        <StatCard icon={Star} label="Avg. Content Rating" value="4.6" color="bg-blue-500/10" />
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Pending Reviews</h2>
        <div className="space-y-3">
          {pendingReviews.map((review) => (
            <div key={review.id} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 shrink-0">
                  <Clock className="h-5 w-5 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">{review.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{review.teacher} · {review.type} · ${(review.price / 100).toFixed(2)} · Submitted {review.submitted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="h-8 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" /> Approve
                </button>
                <button className="h-8 px-3 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Reject
                </button>
                <button className="h-8 px-3 rounded-lg bg-bg-elevated text-text-secondary text-xs font-medium hover:text-text-primary transition-colors">
                  <Eye className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review History */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Review History</h2>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Product</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Teacher</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Date</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Verdict</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Rating</th>
              </tr>
            </thead>
            <tbody>
              {reviewHistory.map((r) => (
                <tr key={r.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{r.title}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{r.teacher}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{r.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      r.verdict === "APPROVED" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}>{r.verdict}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {r.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-text-secondary">{r.rating}</span>
                      </div>
                    ) : <span className="text-text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
