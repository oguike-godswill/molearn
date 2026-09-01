"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import {
  DollarSign, GraduationCap, TrendingUp, Target, BarChart3,
  ArrowUp, ArrowDown, Download, Calendar, Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const overviewStats = [
  { label: "Total Revenue", value: "$128,450", change: "+18.7%", up: true, icon: DollarSign },
  { label: "Active Students", value: "156", change: "+12.4%", up: true, icon: GraduationCap },
  { label: "Completion Rate", value: "72%", change: "+5.2%", up: true, icon: Target },
  { label: "Avg Score", value: "84.3", change: "+2.1%", up: true, icon: TrendingUp },
]

const revenueByCohort = [
  { cohort: "Cohort Alpha", students: 52, revenue: "$46,800", completion: "78%", avgScore: "87.2" },
  { cohort: "Cohort Beta", students: 48, revenue: "$43,200", completion: "68%", avgScore: "82.5" },
  { cohort: "Cohort Gamma", students: 38, revenue: "$28,500", completion: "71%", avgScore: "83.8" },
  { cohort: "Cohort Delta", students: 18, revenue: "$9,950", completion: "65%", avgScore: "80.1" },
]

const enrollmentTrends = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 24 },
  { month: "Apr", value: 20 },
  { month: "May", value: 32 },
  { month: "Jun", value: 28 },
  { month: "Jul", value: 22 },
]

const topCourses = [
  { rank: 1, title: "React Masterclass 2026", students: 52, completion: "82%", avgScore: "88.5", rating: 4.9 },
  { rank: 2, title: "Python for Data Science", students: 48, completion: "76%", avgScore: "85.2", rating: 4.8 },
  { rank: 3, title: "Advanced TypeScript Patterns", students: 38, completion: "71%", avgScore: "83.1", rating: 4.7 },
  { rank: 4, title: "Node.js Microservices", students: 32, completion: "68%", avgScore: "81.4", rating: 4.6 },
  { rank: 5, title: "AWS Cloud Architecture", students: 28, completion: "64%", avgScore: "79.8", rating: 4.6 },
]

export default function AnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d" | "1y">("30d")
  const maxEnrollment = Math.max(...enrollmentTrends.map((d) => d.value))

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader title="Analytics" description="Track platform performance, revenue, and student outcomes." />

      {/* Range Selector */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1.5 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg p-1">
          {(["7d", "30d", "90d", "1y"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                range === r ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"
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

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      >
        {overviewStats.map((stat) => (
          <div key={stat.label} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
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
      </motion.div>

      {/* Revenue by Cohort + Enrollment Trends */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Revenue by Cohort */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <h3 className="text-sm font-semibold text-text-primary">Revenue by Cohort</h3>
            <DollarSign className="h-4 w-4 text-text-muted" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-text-muted">Cohort</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted">Students</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted">Revenue</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted">Completion</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {revenueByCohort.map((row) => (
                  <tr key={row.cohort} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{row.cohort}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{row.students}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-emerald-400">{row.revenue}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{row.completion}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{row.avgScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Enrollment Trends Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Enrollment Trends</h3>
            <BarChart3 className="h-4 w-4 text-text-muted" />
          </div>
          <div className="flex items-end gap-2 h-44">
            {enrollmentTrends.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-text-muted font-medium">{d.value}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxEnrollment) * 140}px` }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" as const }}
                  className="w-full bg-accent/80 rounded-t-md hover:bg-accent transition-colors cursor-pointer"
                />
                <span className="text-[10px] text-text-muted">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Performing Courses */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
          <h3 className="text-sm font-semibold text-text-primary">Top Performing Courses</h3>
          <TrendingUp className="h-4 w-4 text-text-muted" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Rank</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Course</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Students</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Completion</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Avg Score</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course) => (
                <tr key={course.rank} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "text-xs font-bold",
                      course.rank === 1 ? "text-amber-400" :
                      course.rank === 2 ? "text-slate-300" :
                      course.rank === 3 ? "text-amber-600" :
                      "text-text-muted"
                    )}>#{course.rank}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{course.title}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{course.students}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{course.completion}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{course.avgScore}</td>
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
      </motion.div>
    </DashboardLayout>
  )
}
