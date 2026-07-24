"use client"

import { useState } from "react"
import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  BookOpen,
  TrendingUp,
  BarChart3,
} from "lucide-react"

type StatusFilter = "ALL" | "APPROVED" | "REJECTED"

interface ReviewRecord {
  id: string
  date: string
  title: string
  teacher: string
  status: "APPROVED" | "REJECTED"
  note: string
}

const mockHistory: ReviewRecord[] = [
  { id: "1", date: "Jul 22, 2026", title: "Flutter Mobile Development", teacher: "Sarah Chen", status: "APPROVED", note: "Content meets all quality standards. Excellent production value and accurate technical material. Recommended for platform listing." },
  { id: "2", date: "Jul 20, 2026", title: "Advanced CSS Grid Layouts", teacher: "Mike Johnson", status: "APPROVED", note: "Well-structured curriculum with clear learning objectives. Audio quality is good, slides are professional." },
  { id: "3", date: "Jul 18, 2026", title: "Rust Systems Programming", teacher: "Alex Rivera", status: "REJECTED", note: "Several factual errors found in the memory safety chapter. Requested revisions not yet addressed. Needs re-submission." },
  { id: "4", date: "Jul 15, 2026", title: "Node.js Performance Guide", teacher: "Lisa Park", status: "REJECTED", note: "Outdated content referencing Node 14 features that are deprecated. Video resolution below minimum threshold of 1080p." },
  { id: "5", date: "Jul 12, 2026", title: "React from Zero to Production", teacher: "Sarah Chen", status: "APPROVED", note: "Comprehensive coverage of React patterns. Includes testing strategies and CI/CD integration. Highly recommended." },
  { id: "6", date: "Jul 10, 2026", title: "Advanced TypeScript Patterns", teacher: "Marcus Johnson", status: "APPROVED", note: "Deep dive into generics, conditional types, and template literals. Great for senior developers." },
  { id: "7", date: "Jul 8, 2026", title: "Python for Data Science", teacher: "Emily Watson", status: "APPROVED", note: "Good balance of theory and hands-on exercises. Datasets are realistic and well-structured." },
  { id: "8", date: "Jul 5, 2026", title: "GraphQL API Design", teacher: "David Kim", status: "APPROVED", note: "Clear explanations of schema design principles. Covers security considerations thoroughly." },
  { id: "9", date: "Jul 3, 2026", title: "Docker & Kubernetes Basics", teacher: "Mike Johnson", status: "REJECTED", note: "Kubernetes section uses deprecated API versions. Labs do not work with current tooling." },
  { id: "10", date: "Jun 30, 2026", title: "UI/UX Design Principles", teacher: "Sophie Laurent", status: "APPROVED", note: "Polished content with strong visual examples. Accessibility section is particularly well done." },
]

const totalReviewed = 48
const approved = 38
const rejected = 10
const pageSize = 10
const approvalRate = 79
const avgReviewDays = 2.3
const reviewsThisMonth = 7

export default function Page() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [page, setPage] = useState(1)

  const filtered = mockHistory.filter((r) => {
    if (statusFilter !== "ALL" && r.status !== statusFilter) return false
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.teacher.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const startIndex = (page - 1) * pageSize + 1
  const endIndex = Math.min(page * pageSize, filtered.length)

  return (
    <DashboardLayout role="AGENT">
      <DashboardHeader title="Review History" description="View past review decisions and agent activity." />

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatCard icon={History} label="Total Reviewed" value={String(totalReviewed)} color="bg-blue-500/10" />
        <StatCard icon={CheckCircle} label="Approved" value={String(approved)} color="bg-emerald-500/10" />
        <StatCard icon={XCircle} label="Rejected" value={String(rejected)} color="bg-red-500/10" />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2">
          <Calendar className="h-4 w-4 text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent text-text-primary text-sm w-28 outline-none placeholder:text-text-muted"
          />
          <span className="text-text-muted text-xs">—</span>
          <input
            type="text"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent text-text-primary text-sm w-28 outline-none placeholder:text-text-muted"
          />
        </div>

        <div className="flex items-center gap-2 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2">
          <Filter className="h-4 w-4 text-text-muted shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setPage(1) }}
            className="bg-transparent text-text-primary text-sm outline-none appearance-none cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search by title or teacher..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent text-text-primary text-sm flex-1 outline-none placeholder:text-text-muted"
          />
        </div>

        <Button variant="secondary" size="sm">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Review History Table */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left">
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Date</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Product Title</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Teacher</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Status</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted w-1/3">Agent Note</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((r) => (
              <tr key={r.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap text-xs">{r.date}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{r.title}</td>
                <td className="px-5 py-3.5 text-text-secondary text-xs">{r.teacher}</td>
                <td className="px-5 py-3.5">
                  {r.status === "APPROVED" ? (
                    <Badge variant="success" className="text-[10px]">APPROVED</Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-400 text-[10px] border-0">REJECTED</Badge>
                  )}
                </td>
                <td className="px-5 py-3.5 text-text-secondary text-xs">
                  <span className="line-clamp-2">{r.note}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-text-muted text-sm">
            No review records found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-text-muted">
          Showing {startIndex}–{endIndex} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Performance Section */}
      <h2 className="text-lg font-semibold text-text-primary mb-4">Agent Performance</h2>
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xs font-medium text-text-muted">Approval Rate</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{approvalRate}%</p>
        </div>

        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-text-muted">Avg Review Time</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{avgReviewDays} days</p>
        </div>

        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-text-muted">Reviews This Month</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{reviewsThisMonth}</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
