"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  Users,
  DollarSign,
  BarChart3,
  Upload,
} from "lucide-react"

const products = [
  { id: "1", title: "React from Zero to Production", type: "VIDEO", price: 4999, students: 234, rating: 4.8, status: "APPROVED" },
  { id: "2", title: "Advanced TypeScript Patterns", type: "BOOK", price: 2999, students: 128, rating: 4.6, status: "APPROVED" },
  { id: "3", title: "Python for Data Science", type: "VIDEO", price: 5999, students: 89, rating: 4.9, status: "APPROVED" },
  { id: "4", title: "Flutter Mobile Development", type: "COURSE", price: 4499, students: 0, rating: 0, status: "PENDING" },
  { id: "5", title: "Node.js Backend Masterclass", type: "VIDEO", price: 6999, students: 156, rating: 4.7, status: "APPROVED" },
  { id: "6", title: "UI/UX Design Fundamentals", type: "COURSE", price: 3999, students: 67, rating: 4.5, status: "PENDING" },
  { id: "7", title: "Machine Learning A-Z", type: "VIDEO", price: 7999, students: 0, rating: 0, status: "DRAFT" },
  { id: "8", title: "Docker & Kubernetes Guide", type: "BOOK", price: 3499, students: 43, rating: 4.2, status: "REJECTED" },
]

const tabs = ["All", "Published", "Pending", "Drafts"] as const
type Tab = (typeof tabs)[number]

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("All")
  const [search, setSearch] = useState("")

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Published" && p.status === "APPROVED") ||
      (activeTab === "Pending" && p.status === "PENDING") ||
      (activeTab === "Drafts" && p.status === "DRAFT")
    return matchesSearch && matchesTab
  })

  const approvedCount = products.filter((p) => p.status === "APPROVED").length
  const pendingCount = products.filter((p) => p.status === "PENDING").length

  const totalRevenue = products.reduce((sum, p) => {
    return sum + p.students * (p.price / 100)
  }, 0)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Content</h1>
          <p className="text-sm text-text-muted mt-1">Manage your courses, products, and content.</p>
        </div>
        <Link href="/dashboard/teacher/create-course">
          <Button>
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { icon: BookOpen, label: "Total Products", value: products.length, color: "bg-blue-500/10" },
          { icon: Users, label: "Active", value: approvedCount, color: "bg-emerald-500/10" },
          { icon: Clock, label: "Pending Review", value: pendingCount, color: "bg-amber-500/10" },
          { icon: DollarSign, label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "bg-purple-500/10" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex items-center gap-4"
          >
            <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5 text-text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-muted">{stat.label}</p>
              <p className="text-lg font-semibold text-text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 bg-bg-elevated rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab ? "bg-accent text-white" : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-56 pl-9 pr-3 text-xs bg-bg-elevated border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
            />
          </div>
          <Button variant="secondary" size="sm">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left">
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Title</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Type</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Price</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Students</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Rating</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Status</th>
              <th className="px-5 py-3 text-xs font-medium text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{p.title}</td>
                <td className="px-5 py-3.5">
                  <Badge
                    className={
                      p.type === "VIDEO"
                        ? "bg-blue-500/10 text-blue-400"
                        : p.type === "BOOK"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-emerald-500/10 text-emerald-400"
                    }
                  >
                    {p.type}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 text-text-secondary">${(p.price / 100).toFixed(2)}</td>
                <td className="px-5 py-3.5 text-text-secondary">{p.students}</td>
                <td className="px-5 py-3.5">
                  {p.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-text-secondary">{p.rating}</span>
                    </div>
                  ) : (
                    <span className="text-text-muted">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <Badge
                    className={
                      p.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : p.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-400"
                          : p.status === "REJECTED"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-slate-500/10 text-slate-400"
                    }
                  >
                    {p.status}
                  </Badge>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-elevated rounded-md transition-colors">
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-elevated rounded-md transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
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
