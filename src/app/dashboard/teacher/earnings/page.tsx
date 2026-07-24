"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Building,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Wallet,
  Filter,
} from "lucide-react"

const periods = ["This month", "Last 30 days", "This year", "All time"] as const
type Period = (typeof periods)[number]

const monthlyRevenue = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 2800 },
  { month: "Mar", revenue: 4100 },
  { month: "Apr", revenue: 3500 },
  { month: "May", revenue: 3900 },
  { month: "Jun", revenue: 4500 },
  { month: "Jul", revenue: 4200 },
  { month: "Aug", revenue: 3800 },
  { month: "Sep", revenue: 4700 },
  { month: "Oct", revenue: 4000 },
  { month: "Nov", revenue: 5100 },
  { month: "Dec", revenue: 3680 },
]

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue))

const payouts = [
  { id: "1", date: "Jul 22, 2026", amount: 2840, status: "PENDING" as const, ref: "PAY-2026-0722" },
  { id: "2", date: "Jul 15, 2026", amount: 1950, status: "PAID" as const, ref: "PAY-2026-0715" },
  { id: "3", date: "Jul 08, 2026", amount: 3200, status: "PAID" as const, ref: "PAY-2026-0708" },
  { id: "4", date: "Jul 01, 2026", amount: 1680, status: "PAID" as const, ref: "PAY-2026-0701" },
  { id: "5", date: "Jun 24, 2026", amount: 2150, status: "PROCESSING" as const, ref: "PAY-2026-0624" },
  { id: "6", date: "Jun 15, 2026", amount: 1900, status: "PAID" as const, ref: "PAY-2026-0615" },
]

const productEarnings = [
  { name: "React from Zero to Production", sales: 234, revenue: 11676.60, fee: 1751.49, net: 9925.11 },
  { name: "Advanced TypeScript Patterns", sales: 128, revenue: 3838.72, fee: 575.81, net: 3262.91 },
  { name: "Python for Data Science", sales: 89, revenue: 5339.11, fee: 800.87, net: 4538.24 },
  { name: "Flutter Mobile Development", sales: 67, revenue: 3014.33, fee: 452.15, net: 2562.18 },
  { name: "Node.js Microservices Guide", sales: 54, revenue: 2694.60, fee: 404.19, net: 2290.41 },
]

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400",
  PROCESSING: "bg-blue-500/10 text-blue-400",
  PAID: "bg-emerald-500/10 text-emerald-400",
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatCompact(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`
}

const stats = [
  {
    icon: DollarSign,
    label: "Total revenue",
    value: "$45,280",
    change: "+12.5%",
    positive: true,
    color: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: TrendingUp,
    label: "This month",
    value: "$8,450",
    change: "+8.2%",
    positive: true,
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: TrendingDown,
    label: "Pending payout",
    value: "$3,200",
    change: "-5.1%",
    positive: false,
    color: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: CreditCard,
    label: "Net earnings",
    value: "$38,560",
    change: "+10.3%",
    positive: true,
    color: "bg-purple-500/10",
    iconColor: "text-purple-400",
    subtitle: "After platform fee",
  },
]

export default function EarningsPage() {
  const [period, setPeriod] = useState<Period>("This month")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Earnings</h1>
          <p className="text-sm text-text-secondary mt-1">
            Track your revenue, payouts, and product performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg w-fit">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === p
                ? "bg-bg-elevated text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
                <span
                  className={`text-xs font-medium flex items-center gap-0.5 ${
                    stat.positive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-text-muted">{stat.label}</p>
              <p className="text-xl font-bold text-text-primary mt-0.5">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-[10px] text-text-muted mt-0.5">{stat.subtitle}</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Revenue Overview</h3>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Calendar className="h-3.5 w-3.5" />
            <span>{period}</span>
          </div>
        </div>
        <div className="h-48 flex items-end gap-2">
          {monthlyRevenue.map((m) => {
            const height = (m.revenue / maxRevenue) * 100
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-accent/20 hover:bg-accent/30 transition-colors"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[9px] text-text-muted">{m.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
          <div className="p-5 pb-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary">Payout History</h3>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Date</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Amount</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Reference ID</th>
                <th className="px-5 py-3 text-xs font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors"
                >
                  <td className="px-5 py-3.5 text-text-secondary">{p.date}</td>
                  <td className="px-5 py-3.5 text-text-primary font-medium">
                    {formatCompact(p.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant="default"
                      className={`rounded-full ${statusStyles[p.status]}`}
                    >
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-text-muted text-xs">{p.ref}</td>
                  <td className="px-5 py-3.5">
                    <Button variant="ghost" size="sm">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-4 w-4 text-text-muted" />
            <span className="text-xs text-text-muted">Available Balance</span>
          </div>
          <p className="text-2xl font-bold text-text-primary mt-1">$3,200.00</p>
          <p className="text-xs text-text-muted mt-1">
            Next payout scheduled for{" "}
            <span className="text-text-secondary">Jul 30, 2026</span>
          </p>

          <div className="mt-4 p-3 bg-bg-elevated/50 border border-border/40 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Platform fee</span>
              <span className="text-text-secondary">15%</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-text-muted">Total earned</span>
              <span className="text-text-primary font-medium">$45,280</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-text-muted">Total fees</span>
              <span className="text-red-400">-$6,720</span>
            </div>
            <div className="border-t border-border/40 my-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Net</span>
              <span className="text-text-primary font-semibold">$38,560</span>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <Button className="w-full">
              <Building className="h-4 w-4" />
              Request Payout
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Earnings by Product</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left">
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Product</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Sales</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Revenue</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Platform Fee</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Net</th>
            </tr>
          </thead>
          <tbody>
            {productEarnings.map((p) => (
              <tr
                key={p.name}
                className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors"
              >
                <td className="px-5 py-3.5 text-text-primary font-medium">{p.name}</td>
                <td className="px-5 py-3.5 text-text-secondary">{p.sales}</td>
                <td className="px-5 py-3.5 text-text-secondary">{formatCurrency(p.revenue)}</td>
                <td className="px-5 py-3.5 text-red-400">{formatCurrency(p.fee)}</td>
                <td className="px-5 py-3.5 text-text-primary font-medium">
                  {formatCurrency(p.net)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-5 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Total</span>
            <div className="flex items-center gap-6">
              <span className="text-text-secondary">572 sales</span>
              <span className="text-text-secondary">{formatCurrency(26563.36)}</span>
              <span className="text-red-400">{formatCurrency(3984.51)}</span>
              <span className="text-text-primary font-semibold">{formatCurrency(22578.85)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
