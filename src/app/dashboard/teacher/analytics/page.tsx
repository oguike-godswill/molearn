"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  Users,
  Eye,
  Star,
  DollarSign,
  Activity,
  Download,
  Filter,
  ArrowUpRight,
  Target,
} from "lucide-react"

const periods = ["7 days", "30 days", "90 days", "12 months"] as const
type Period = (typeof periods)[number]

const enrollmentData = [
  { label: "Jan", value: 240 },
  { label: "Feb", value: 310 },
  { label: "Mar", value: 280 },
  { label: "Apr", value: 350 },
  { label: "May", value: 290 },
  { label: "Jun", value: 420 },
  { label: "Jul", value: 380 },
  { label: "Aug", value: 450 },
  { label: "Sep", value: 390 },
  { label: "Oct", value: 480 },
  { label: "Nov", value: 430 },
  { label: "Dec", value: 510 },
]

const revenueProducts = [
  { name: "React Masterclass", value: 18450, max: 20000 },
  { name: "TypeScript Deep Dive", value: 12800, max: 20000 },
  { name: "Python for Data Science", value: 9350, max: 20000 },
  { name: "Flutter Mobile Dev", value: 4680, max: 20000 },
]

const engagementData = [
  { label: "Completed", value: 68, color: "#10b981" },
  { label: "In Progress", value: 22, color: "#f59e0b" },
  { label: "Not Started", value: 10, color: "#374151" },
]

const trafficSources = [
  { source: "Direct", percent: 38, color: "#3b82f6" },
  { source: "Search", percent: 30, color: "#8b5cf6" },
  { source: "Social", percent: 20, color: "#ec4899" },
  { source: "Referral", percent: 12, color: "#f97316" },
]

const demographics = [
  { level: "Beginner", percent: 45, color: "#3b82f6" },
  { level: "Intermediate", percent: 35, color: "#8b5cf6" },
  { level: "Advanced", percent: 20, color: "#10b981" },
]

type SortKey = "name" | "enrollments" | "revenue" | "rating" | "completion"

const courses = [
  { name: "React from Zero to Production", enrollments: 1234, revenue: 18520, rating: 4.8, completion: 72 },
  { name: "Advanced TypeScript Patterns", enrollments: 856, revenue: 12840, rating: 4.6, completion: 65 },
  { name: "Python for Data Science", enrollments: 640, revenue: 9600, rating: 4.9, completion: 71 },
  { name: "Flutter Mobile Development", enrollments: 470, revenue: 7050, rating: 4.4, completion: 58 },
  { name: "Node.js Backend Mastery", enrollments: 220, revenue: 3270, rating: 4.7, completion: 63 },
]

export default function Page() {
  const [period, setPeriod] = useState<Period>("30 days")
  const [sortKey, setSortKey] = useState<SortKey>("enrollments")
  const [sortAsc, setSortAsc] = useState(false)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(false)
    }
  }

  const sortedCourses = [...courses].sort((a, b) => {
    const dir = sortAsc ? 1 : -1
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (typeof aVal === "string") return dir * aVal.localeCompare(bVal as string)
    return dir * ((aVal as number) - (bVal as number))
  })

  const maxEnrollment = Math.max(...enrollmentData.map((d) => d.value))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Analytics</h1>
          <p className="mt-1 text-sm text-text-secondary">Track your course performance and student engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border/60 p-0.5 bg-bg-secondary/50">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  period === p
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-xs text-text-muted">Total Enrollments</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">3,420</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              12.5%
            </span>
          </div>
        </div>

        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-xs text-text-muted">Revenue</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">$45,280</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              18.2%
            </span>
          </div>
        </div>

        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Star className="h-4 w-4 text-amber-400" />
            </div>
            <span className="text-xs text-text-muted">Average Rating</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">4.7</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              0.2
            </span>
          </div>
        </div>

        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
              <Target className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-xs text-text-muted">Completion Rate</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">68%</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-red-400">
              <ArrowUpRight className="h-3 w-3 rotate-180" />
              3.1%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enrollment Trend */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Enrollment Trend</h3>
            <TrendingUp className="h-4 w-4 text-text-muted" />
          </div>
          <div className="h-48 flex items-end gap-1.5">
            {enrollmentData.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-sm bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                  style={{ height: `${(d.value / maxEnrollment) * 100}%` }}
                />
                <span className="text-[9px] text-text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Revenue Breakdown</h3>
            <DollarSign className="h-4 w-4 text-text-muted" />
          </div>
          <div className="space-y-3">
            {revenueProducts.map((p) => (
              <div key={p.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary truncate max-w-[60%]">{p.name}</span>
                  <span className="text-text-primary font-medium">${p.value.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500/50"
                    style={{ width: `${(p.value / p.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Engagement - Donut Chart */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Student Engagement</h3>
            <Activity className="h-4 w-4 text-text-muted" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                {(() => {
                  let offset = 0
                  const total = engagementData.reduce((s, d) => s + d.value, 0)
                  return engagementData.map((seg) => {
                    const pct = seg.value / total
                    const dash = pct * 251.2
                    const currentOffset = -((offset / total) * 251.2)
                    offset += seg.value
                    return (
                      <circle
                        key={seg.label}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="12"
                        strokeDasharray={`${dash} ${251.2 - dash}`}
                        strokeDashoffset={currentOffset}
                      />
                    )
                  })
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-text-primary">68%</span>
                <span className="text-[10px] text-text-muted">Complete</span>
              </div>
            </div>
            <div className="space-y-2">
              {engagementData.map((seg) => (
                <div key={seg.label} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-xs text-text-secondary">{seg.label}</span>
                  <span className="text-xs font-medium text-text-primary ml-auto">{seg.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Traffic Sources</h3>
            <Eye className="h-4 w-4 text-text-muted" />
          </div>
          <div className="space-y-3">
            {trafficSources.map((t) => (
              <div key={t.source} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{t.source}</span>
                  <span className="text-text-primary font-medium">{t.percent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${t.percent}%`, backgroundColor: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Student Demographics</h3>
          <Users className="h-4 w-4 text-text-muted" />
        </div>
        <div className="space-y-3">
          {demographics.map((d) => (
            <div key={d.level} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{d.level}</span>
                <span className="text-text-primary font-medium">{d.percent}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-bg-elevated overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${d.percent}%`, backgroundColor: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
          {demographics.map((d) => (
            <div key={d.level} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
              {d.level}
            </div>
          ))}
        </div>
      </div>

      {/* Content Performance Table */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
          <h3 className="text-sm font-semibold text-text-primary">Content Performance</h3>
          <Button variant="ghost" size="sm">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left">
              {([
                ["Course", "name"],
                ["Enrollments", "enrollments"],
                ["Revenue", "revenue"],
                ["Rating", "rating"],
                ["Completion", "completion"],
              ] as const).map(([label, key]) => (
                <th key={key} className="px-5 py-3 text-xs font-medium text-text-muted">
                  <button
                    onClick={() => toggleSort(key as SortKey)}
                    className="flex items-center gap-1 hover:text-text-primary transition-colors"
                  >
                    {label}
                    {sortKey === key && (
                      <span className="text-accent">{sortAsc ? "\u2191" : "\u2193"}</span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((c) => (
              <tr
                key={c.name}
                className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{c.name}</td>
                <td className="px-5 py-3.5 text-text-secondary">{c.enrollments.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-text-secondary">${c.revenue.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-text-secondary">{c.rating}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-bg-elevated overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500/60"
                        style={{ width: `${c.completion}%` }}
                      />
                    </div>
                    <span className="text-text-secondary">{c.completion}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
