"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  TrendingUp, Users, DollarSign, BarChart3, Activity, BookOpen,
  Target, Eye, ArrowUpRight, Download, Calendar, Globe,
  ShoppingCart, Star, PieChart, UserPlus, ShoppingBag, Film,
  MessageSquare, CreditCard, ArrowUp, ArrowDown
} from "lucide-react"
import { cn } from "@/lib/utils"

const statsRow1 = [
  { label: "Total Users", value: "1,245", change: "+12.4%", up: true, icon: Users },
  { label: "Total Courses", value: "42", change: "+5.2%", up: true, icon: BookOpen },
  { label: "Total Revenue", value: "$128,450", change: "+18.7%", up: true, icon: DollarSign },
  { label: "New Enrollments", value: "892", change: "+22.1%", up: true, icon: UserPlus },
]

const statsRow2 = [
  { label: "Conversion Rate", value: "12.5%", change: "+2.1%", up: true, icon: TrendingUp },
  { label: "Avg. Rating", value: "4.6", change: "+0.3", up: true, icon: Star },
  { label: "Active Teachers", value: "185", change: "+8.2%", up: true, icon: Target },
  { label: "Monthly Growth", value: "8.3%", change: "+1.5%", up: true, icon: Activity },
]

const revenueData = [
  { month: "Jul", value: 11400 },
  { month: "Aug", value: 10800 },
  { month: "Sep", value: 12300 },
  { month: "Oct", value: 13100 },
  { month: "Nov", value: 12800 },
  { month: "Dec", value: 14200 },
  { month: "Jan", value: 12500 },
  { month: "Feb", value: 13800 },
  { month: "Mar", value: 14900 },
  { month: "Apr", value: 14100 },
  { month: "May", value: 15300 },
  { month: "Jun", value: 16200 },
]

const userGrowthData = [
  { month: "Jul", value: 680 },
  { month: "Aug", value: 710 },
  { month: "Sep", value: 745 },
  { month: "Oct", value: 790 },
  { month: "Nov", value: 825 },
  { month: "Dec", value: 860 },
  { month: "Jan", value: 910 },
  { month: "Feb", value: 960 },
  { month: "Mar", value: 1020 },
  { month: "Apr", value: 1080 },
  { month: "May", value: 1150 },
  { month: "Jun", value: 1245 },
]

const contentCategories = [
  { label: "Web Development", count: 14, color: "bg-blue-500" },
  { label: "Mobile Development", count: 10, color: "bg-purple-500" },
  { label: "Data Science", count: 8, color: "bg-emerald-500" },
  { label: "Design", count: 4, color: "bg-amber-500" },
  { label: "DevOps", count: 6, color: "bg-rose-500" },
]

const enrollmentData = [
  { label: "Completed", percent: 48, color: "bg-emerald-500" },
  { label: "In Progress", percent: 35, color: "bg-blue-500" },
  { label: "Not Started", percent: 17, color: "bg-slate-600" },
]

const topSellers = [
  { rank: 1, course: "React Masterclass 2026", teacher: "Sarah Chen", sales: 324, revenue: "$15,876", rating: 4.9 },
  { rank: 2, course: "Python for Data Science", teacher: "Marcus Rivera", sales: 287, revenue: "$13,489", rating: 4.8 },
  { rank: 3, course: "UI/UX Design Pro", teacher: "Emily Watson", sales: 241, revenue: "$11,327", rating: 4.7 },
  { rank: 4, course: "DevOps with Docker & K8s", teacher: "James Kumar", sales: 198, revenue: "$9,504", rating: 4.6 },
  { rank: 5, course: "Node.js Backend Bootcamp", teacher: "Lisa Park", sales: 172, revenue: "$8,084", rating: 4.6 },
]

const recentActivity = [
  { icon: UserPlus, label: "New user registered", detail: "Alex Thompson joined as Student", time: "2 min ago", color: "text-blue-400" },
  { icon: ShoppingBag, label: "Course purchased", detail: "React Masterclass 2026 — $49.00", time: "15 min ago", color: "text-emerald-400" },
  { icon: Film, label: "Course published", detail: "\"Advanced TypeScript\" by Sarah Chen", time: "1 hour ago", color: "text-purple-400" },
  { icon: MessageSquare, label: "Review submitted", detail: "5-star review on Python for Data Science", time: "2 hours ago", color: "text-amber-400" },
  { icon: CreditCard, label: "Payout processed", detail: "$2,340 paid to Marcus Rivera", time: "4 hours ago", color: "text-rose-400" },
]

type Range = "7d" | "30d" | "90d" | "1y"

export default function Page() {
  const [range, setRange] = useState<Range>("1y")

  const maxRevenue = Math.max(...revenueData.map((d) => d.value))
  const maxUsers = Math.max(...userGrowthData.map((d) => d.value))

  const linePath = userGrowthData
    .map((d, i) => {
      const x = (i / (userGrowthData.length - 1)) * 100
      const y = 100 - ((d.value - 600) / (maxUsers - 600)) * 100
      return `${i === 0 ? "M" : "L"}${x},${y}`
    })
    .join(" ")

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-accent" />
            <h1 className="text-2xl font-bold text-text-primary">Platform Analytics</h1>
          </div>
          <p className="text-sm text-text-secondary mt-1">Track platform performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg p-1">
            {(["7d", "30d", "90d", "1y"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  range === r
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <Calendar className="h-3.5 w-3.5" />
            Custom
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats — Row 1 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsRow1.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-text-muted" />
            </div>
            <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
            <div className={cn(
              "flex items-center gap-1 mt-1 text-xs font-medium",
              stat.up ? "text-emerald-400" : "text-red-400"
            )}>
              {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {stat.change}
              <span className="text-text-muted font-normal ml-1">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats — Row 2 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsRow2.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-text-muted" />
            </div>
            <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
            <div className={cn(
              "flex items-center gap-1 mt-1 text-xs font-medium",
              stat.up ? "text-emerald-400" : "text-red-400"
            )}>
              {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {stat.change}
              <span className="text-text-muted font-normal ml-1">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts — 2x2 grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Revenue Overview — Bar Chart */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-text-primary">Revenue Overview</h3>
              <ArrowUpRight className="h-3 w-3 text-text-muted" />
            </div>
            <BarChart3 className="h-4 w-4 text-text-muted" />
          </div>
          <div className="flex items-end gap-1.5 h-48">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-text-muted font-medium">${(d.value / 1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-accent rounded-t-md transition-all duration-300"
                  style={{ height: `${(d.value / maxRevenue) * 160}px` }}
                />
                <span className="text-[10px] text-text-muted">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth — Line Chart */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">User Growth</h3>
            <TrendingUp className="h-4 w-4 text-text-muted" />
          </div>
          <div className="relative h-48">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path
                d={linePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-accent"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="relative flex items-end h-full">
              {userGrowthData.map((d) => {
                const top = `${100 - ((d.value - 600) / (maxUsers - 600)) * 95}%`
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full relative">
                    <div
                      className="absolute w-2 h-2 rounded-full bg-accent z-10"
                      style={{ top }}
                    />
                    <span className="absolute -bottom-5 text-[10px] text-text-muted">{d.month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content by Category — Horizontal Bar Chart */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Content by Category</h3>
            <BookOpen className="h-4 w-4 text-text-muted" />
          </div>
          <div className="space-y-4">
            {contentCategories.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-text-secondary">{cat.label}</span>
                  <span className="text-sm font-medium text-text-primary">{cat.count}</span>
                </div>
                <div className="h-2.5 rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", cat.color)}
                    style={{ width: `${(cat.count / 14) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Rate — Donut */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Enrollment Rate</h3>
            <PieChart className="h-4 w-4 text-text-muted" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#10b981 0deg ${enrollmentData[0].percent * 3.6}deg, #3b82f6 ${enrollmentData[0].percent * 3.6}deg ${(enrollmentData[0].percent + enrollmentData[1].percent) * 3.6}deg, #475569 ${(enrollmentData[0].percent + enrollmentData[1].percent) * 3.6}deg 360deg)`,
                }}
              />
              <div className="absolute inset-[22%] rounded-full bg-bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-text-primary">{enrollmentData[0].percent}%</span>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-text-secondary">Completed</span>
                  <span className="text-xs font-medium text-text-primary ml-auto">48%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-text-secondary">In Progress</span>
                  <span className="text-xs font-medium text-text-primary ml-auto">35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  <span className="text-xs text-text-secondary">Not Started</span>
                  <span className="text-xs font-medium text-text-primary ml-auto">17%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom — Top Sellers + Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Top Sellers Table */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <h3 className="text-sm font-semibold text-text-primary">Top Sellers</h3>
            <ShoppingCart className="h-4 w-4 text-text-muted" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Rank</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Course</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Teacher</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Sales</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Revenue</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((course) => (
                <tr
                  key={course.rank}
                  className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "text-xs font-bold",
                      course.rank === 1 ? "text-amber-400" :
                      course.rank === 2 ? "text-slate-300" :
                      course.rank === 3 ? "text-amber-600" :
                      "text-text-muted"
                    )}>#{course.rank}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{course.course}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{course.teacher}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{course.sales}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-accent">{course.revenue}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-text-primary">{course.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
            <Eye className="h-4 w-4 text-text-muted" />
          </div>
          <div className="space-y-0">
            {recentActivity.map((event, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 py-3.5",
                  i < recentActivity.length - 1 && "border-b border-border/20"
                )}
              >
                <div className="p-1.5 rounded-lg bg-bg-elevated flex-shrink-0">
                  <event.icon className={cn("h-3.5 w-3.5", event.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-text-primary truncate">{event.label}</span>
                    <span className="text-[10px] text-text-muted flex-shrink-0">{event.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5 truncate">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
