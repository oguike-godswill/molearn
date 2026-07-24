"use client"

import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { BookOpen, DollarSign, Users, TrendingUp, Eye, Star, Edit3, MoreHorizontal } from "lucide-react"
import Link from "next/link"

const products = [
  { id: "1", title: "React from Zero to Production", type: "VIDEO", price: 4999, sales: 234, revenue: 1167660, rating: 4.8, status: "APPROVED" },
  { id: "2", title: "Advanced TypeScript Patterns", type: "BOOK", price: 2999, sales: 128, revenue: 383872, rating: 4.6, status: "APPROVED" },
  { id: "3", title: "Python for Data Science", type: "VIDEO", price: 5999, sales: 89, revenue: 533911, rating: 4.9, status: "APPROVED" },
  { id: "4", title: "Flutter Mobile Development", type: "VIDEO", price: 4499, sales: 0, revenue: 0, rating: 0, status: "PENDING" },
]

const recentPayouts = [
  { id: "1", amount: 2840, status: "COMPLETED", date: "Jul 15, 2026" },
  { id: "2", amount: 1950, status: "COMPLETED", date: "Jul 8, 2026" },
  { id: "3", amount: 3200, status: "PENDING", date: "Jul 22, 2026" },
]

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="TEACHER">
      <DashboardHeader title="Teacher Dashboard" description="Manage your content, track earnings, and grow your reach." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={BookOpen} label="Total Products" value="8" change="+2" color="bg-blue-500/10" />
        <StatCard icon={DollarSign} label="Total Revenue" value="$24,380" change="+18%" color="bg-emerald-500/10" />
        <StatCard icon={Users} label="Total Students" value="1,847" change="+12%" color="bg-purple-500/10" />
        <StatCard icon={TrendingUp} label="Avg. Rating" value="4.7" color="bg-amber-500/10" />
      </div>

      {/* Revenue chart area */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Revenue Overview</h3>
          <div className="h-48 flex items-end gap-2">
            {[65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-accent/20 hover:bg-accent/30 transition-colors" style={{ height: `${h}%` }} />
                <span className="text-[9px] text-text-muted">{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Recent Payouts</h3>
          <div className="space-y-3">
            {recentPayouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">${payout.amount.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">{payout.date}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  payout.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {payout.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">My Products</h2>
          <Link href="/dashboard/teacher/content" className="text-xs text-accent hover:underline">View all</Link>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Product</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Type</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Price</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Sales</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Revenue</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Rating</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{p.title}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      p.type === "VIDEO" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                    }`}>{p.type}</span>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">${(p.price / 100).toFixed(2)}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{p.sales}</td>
                  <td className="px-5 py-3.5 text-text-secondary">${(p.revenue / 100).toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    {p.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-text-secondary">{p.rating}</span>
                      </div>
                    ) : <span className="text-text-muted">—</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      p.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    }`}>{p.status}</span>
                  </td>
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
