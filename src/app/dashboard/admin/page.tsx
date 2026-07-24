"use client"

import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Users, BookOpen, DollarSign, TrendingUp, ShieldCheck, Star, MoreHorizontal } from "lucide-react"

const recentUsers = [
  { id: "1", name: "Sarah Chen", email: "teacher@molearn.com", role: "TEACHER", products: 8, joined: "Jan 2026" },
  { id: "2", name: "Marcus Rivera", email: "agent@molearn.com", role: "AGENT", reviews: 47, joined: "Feb 2026" },
  { id: "3", name: "Emily Watson", email: "student@molearn.com", role: "STUDENT", enrolled: 4, joined: "Mar 2026" },
  { id: "4", name: "Mike Johnson", email: "mike@example.com", role: "TEACHER", products: 3, joined: "Apr 2026" },
  { id: "5", name: "Lisa Park", email: "lisa@example.com", role: "TEACHER", products: 5, joined: "Mar 2026" },
]

const platformStats = [
  { label: "Total Users", value: "4,892", change: "+12%", icon: Users },
  { label: "Total Products", value: "142", change: "+8%", icon: BookOpen },
  { label: "Total Revenue", value: "$284,500", change: "+22%", icon: DollarSign },
  { label: "Avg. Rating", value: "4.7", icon: Star },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader title="Admin Dashboard" description="Monitor platform health, users, and content quality." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {platformStats.map((stat) => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} change={stat.change} />
        ))}
      </div>

      {/* Platform overview */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">User Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "Students", value: 3800, color: "bg-blue-500", percentage: 78 },
              { label: "Teachers", value: 720, color: "bg-purple-500", percentage: 15 },
              { label: "Agents", value: 320, color: "bg-amber-500", percentage: 6 },
              { label: "Admins", value: 52, color: "bg-emerald-500", percentage: 1 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-text-secondary">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">{item.value.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Content Overview</h3>
          <div className="space-y-4">
            {[
              { label: "Video Courses", value: 98, color: "bg-blue-500" },
              { label: "Ebooks", value: 44, color: "bg-purple-500" },
              { label: "Pending Review", value: 7, color: "bg-amber-500" },
              { label: "Approved", value: 135, color: "bg-emerald-500" },
              { label: "Rejected", value: 12, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Users</h2>
          <button className="text-xs text-accent hover:underline">View all</button>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Name</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Email</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Role</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{user.name}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      user.role === "ADMIN" ? "bg-emerald-500/10 text-emerald-400" :
                      user.role === "TEACHER" ? "bg-blue-500/10 text-blue-400" :
                      user.role === "AGENT" ? "bg-amber-500/10 text-amber-400" :
                      "bg-purple-500/10 text-purple-400"
                    }`}>{user.role}</span>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-text-muted hover:text-text-primary transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
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
