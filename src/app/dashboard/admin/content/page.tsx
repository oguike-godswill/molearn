"use client"

import { useState, type ReactNode } from "react"
import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Shield, Search, Filter, Eye, Trash2, Edit, BarChart3, BookOpen,
  Star, Clock, AlertTriangle, CheckCircle, SlidersHorizontal, MoreHorizontal,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
} from "lucide-react"

const PAGE_SIZE = 5

type Product = {
  id: string
  title: string
  initials: string
  type: "VIDEO" | "BOOK"
  teacher: string
  category: string
  price: string
  status: "Approved" | "Pending" | "Rejected"
  rating: number
  featured: boolean
  flagged: boolean
  description: string
  enrollments: number
  reviews: number
  revenue: string
  createdAt: string
  updatedAt: string
}

const initialProducts: Product[] = [
  {
    id: "1", title: "React Masterclass 2026", initials: "RM", type: "VIDEO",
    teacher: "Sarah Chen", category: "Development", price: "$49.99",
    status: "Approved", rating: 4.8, featured: true, flagged: false,
    description: "Complete React course covering hooks, server components, and Next.js 15 with real-world projects.",
    enrollments: 1247, reviews: 312, revenue: "$62,336", createdAt: "Jan 12, 2026", updatedAt: "Jul 10, 2026",
  },
  {
    id: "2", title: "Python for Data Science", initials: "PD", type: "VIDEO",
    teacher: "Marcus Rivera", category: "Data Science", price: "$59.99",
    status: "Approved", rating: 4.6, featured: true, flagged: false,
    description: "Master Python for data analysis, visualization, and machine learning with hands-on exercises.",
    enrollments: 987, reviews: 248, revenue: "$59,210", createdAt: "Feb 3, 2026", updatedAt: "Jun 28, 2026",
  },
  {
    id: "3", title: "Advanced TypeScript Patterns", initials: "AT", type: "BOOK",
    teacher: "Emily Watson", category: "Development", price: "$34.99",
    status: "Approved", rating: 4.9, featured: false, flagged: false,
    description: "Deep dive into advanced TypeScript patterns, generics, decorators, and type-level programming.",
    enrollments: 654, reviews: 189, revenue: "$22,884", createdAt: "Mar 15, 2026", updatedAt: "Jul 15, 2026",
  },
  {
    id: "4", title: "Figma UI/UX Design Pro", initials: "FU", type: "VIDEO",
    teacher: "Mike Johnson", category: "Design", price: "$44.99",
    status: "Approved", rating: 4.7, featured: true, flagged: false,
    description: "Learn UI/UX design from scratch using Figma. Covers wireframing, prototyping, and design systems.",
    enrollments: 832, reviews: 201, revenue: "$37,432", createdAt: "Dec 20, 2025", updatedAt: "Jul 8, 2026",
  },
  {
    id: "5", title: "Business Strategy 101", initials: "BS", type: "BOOK",
    teacher: "Lisa Park", category: "Business", price: "$29.99",
    status: "Pending", rating: 4.2, featured: false, flagged: false,
    description: "Foundational business strategy concepts for entrepreneurs and aspiring managers.",
    enrollments: 312, reviews: 87, revenue: "$9,357", createdAt: "May 1, 2026", updatedAt: "Jul 18, 2026",
  },
  {
    id: "6", title: "Node.js Microservices", initials: "NM", type: "VIDEO",
    teacher: "Sarah Chen", category: "Development", price: "$54.99",
    status: "Approved", rating: 4.5, featured: false, flagged: false,
    description: "Build production-ready microservices with Node.js, Express, Docker, and Kubernetes.",
    enrollments: 543, reviews: 134, revenue: "$29,860", createdAt: "Mar 28, 2026", updatedAt: "Jul 2, 2026",
  },
  {
    id: "7", title: "Digital Marketing Handbook", initials: "DM", type: "BOOK",
    teacher: "James Wilson", category: "Marketing", price: "$24.99",
    status: "Pending", rating: 4.0, featured: false, flagged: true,
    description: "Comprehensive guide to digital marketing channels, SEO, social media, and paid advertising.",
    enrollments: 198, reviews: 52, revenue: "$4,948", createdAt: "Jun 10, 2026", updatedAt: "Jul 19, 2026",
  },
  {
    id: "8", title: "AWS Cloud Architecture", initials: "AC", type: "VIDEO",
    teacher: "Robert Kim", category: "Development", price: "$69.99",
    status: "Approved", rating: 4.8, featured: true, flagged: false,
    description: "Design scalable cloud architectures on AWS with hands-on labs and certification prep.",
    enrollments: 721, reviews: 195, revenue: "$50,466", createdAt: "Jan 25, 2026", updatedAt: "Jul 14, 2026",
  },
  {
    id: "9", title: "Crypto Trading Guide", initials: "CT", type: "BOOK",
    teacher: "Anonymous", category: "Business", price: "$19.99",
    status: "Pending", rating: 2.1, featured: false, flagged: true,
    description: "An unverified guide to cryptocurrency trading with questionable claims and no author credentials.",
    enrollments: 87, reviews: 23, revenue: "$1,739", createdAt: "Jul 1, 2026", updatedAt: "Jul 20, 2026",
  },
  {
    id: "10", title: "Vue 3 Composition API", initials: "VC", type: "VIDEO",
    teacher: "Emily Watson", category: "Development", price: "$39.99",
    status: "Rejected", rating: 3.8, featured: false, flagged: false,
    description: "Learn Vue 3 composition API with practical examples and best practices for large-scale apps.",
    enrollments: 0, reviews: 0, revenue: "$0", createdAt: "Jun 25, 2026", updatedAt: "Jul 16, 2026",
  },
]

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Development", label: "Development" },
  { value: "Design", label: "Design" },
  { value: "Business", label: "Business" },
  { value: "Marketing", label: "Marketing" },
  { value: "Data Science", label: "Data Science" },
]

const typeOptions = [
  { value: "all", label: "All" },
  { value: "VIDEO", label: "Video" },
  { value: "BOOK", label: "Book" },
]

const statusOptions = [
  { value: "all", label: "All" },
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" },
]

export default function ContentManagementPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = products.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.teacher.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter !== "all" && p.type !== typeFilter) return false
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const paged = filtered.slice(start, start + PAGE_SIZE)

  const toggleFeatured = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
  }

  const toggleFlagged = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, flagged: !p.flagged } : p)))
  }

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const published = products.filter((p) => p.status === "Approved").length
  const pending = products.filter((p) => p.status === "Pending").length
  const flagged = products.filter((p) => p.flagged).length

  const statusBadge = (status: string, flagged: boolean) => {
    if (flagged) {
      return <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px]">Flagged</Badge>
    }
    switch (status) {
      case "Approved":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">Approved</Badge>
      case "Pending":
        return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">Pending</Badge>
      case "Rejected":
        return <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px]">Rejected</Badge>
    }
  }

  const typeBadge = (type: "VIDEO" | "BOOK") => {
    if (type === "VIDEO") {
      return <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">VIDEO</Badge>
    }
    return <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px]">BOOK</Badge>
  }

  const stars = (rating: number) => {
    const full = Math.floor(rating)
    const arr: ReactNode[] = []
    for (let i = 0; i < 5; i++) {
      arr.push(
        <Star key={i} className={`h-3 w-3 ${i < full ? "text-amber-400 fill-amber-400" : "text-text-muted/30"}`} />
      )
    }
    return arr
  }

  const thumbColors = [
    "bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-amber-600", "bg-rose-600",
    "bg-cyan-600", "bg-pink-600", "bg-teal-600", "bg-orange-600", "bg-indigo-600",
  ]

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader title="Content Management" description="Oversee all platform courses, books, and content quality." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={BookOpen} label="Total Courses" value={String(products.length)} color="bg-blue-600" />
        <StatCard icon={CheckCircle} label="Published" value={String(published)} color="bg-emerald-600" />
        <StatCard icon={Clock} label="Pending" value={String(pending)} color="bg-amber-600" />
        <StatCard icon={AlertTriangle} label="Flagged" value={String(flagged)} color="bg-red-600" />
      </div>

      {/* Filters */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Search by title or teacher..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9"
              />
            </div>
          </div>
          <div className="w-[140px]">
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={(v) => { setTypeFilter(v); setPage(1) }}
              placeholder="Type"
            />
          </div>
          <div className="w-[140px]">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v); setPage(1) }}
              placeholder="Status"
            />
          </div>
          <div className="w-[160px]">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(v) => { setCategoryFilter(v); setPage(1) }}
              placeholder="Category"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setSearch(""); setTypeFilter("all"); setStatusFilter("all"); setCategoryFilter("all"); setPage(1) }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Content</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Teacher</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-center">Featured</th>
                <th className="px-4 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((item, idx) => (
                <>
                  <tr
                    key={item.id}
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-lg ${thumbColors[idx % thumbColors.length]} flex items-center justify-center shrink-0`}>
                          <span className="text-[10px] font-bold text-white">{item.initials}</span>
                        </div>
                        <span className="text-sm font-medium text-text-primary">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">{typeBadge(item.type)}</td>
                    <td className="px-4 py-3.5 text-text-secondary text-xs">{item.teacher}</td>
                    <td className="px-4 py-3.5 text-text-secondary text-xs">{item.category}</td>
                    <td className="px-4 py-3.5 text-text-primary font-medium text-xs">{item.price}</td>
                    <td className="px-4 py-3.5">{statusBadge(item.status, item.flagged)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">{stars(item.rating)}</div>
                        <span className="text-xs text-text-muted ml-1">{item.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.featured}
                          onChange={() => toggleFeatured(item.id)}
                        />
                        <div className="w-9 h-5 bg-bg-elevated rounded-full border border-border peer-checked:bg-accent peer-checked:border-accent transition-colors" />
                        <span className="absolute left-0.5 top-[2px] w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                      </label>
                    </td>
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors" title="View">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md text-text-muted hover:text-blue-400 hover:bg-bg-elevated transition-colors" title="Edit">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-text-muted hover:text-red-400 hover:bg-bg-elevated transition-colors"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className={`p-1.5 rounded-md transition-colors ${item.flagged ? "text-red-400 bg-red-500/10" : "text-text-muted hover:text-amber-400 hover:bg-bg-elevated"}`}
                          title={item.flagged ? "Unflag" : "Flag"}
                          onClick={() => toggleFlagged(item.id)}
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === item.id && (
                    <tr key={`${item.id}-expanded`} className="border-b border-border/20 bg-bg-elevated/20">
                      <td colSpan={9} className="px-4 py-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Description</p>
                            <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Enrollments</p>
                              <p className="text-sm font-semibold text-text-primary">{item.enrollments.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Reviews</p>
                              <p className="text-sm font-semibold text-text-primary">{item.reviews.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Revenue</p>
                              <p className="text-sm font-semibold text-emerald-400">{item.revenue}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Created</p>
                            <p className="text-xs text-text-secondary">{item.createdAt}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Updated</p>
                            <p className="text-xs text-text-secondary">{item.updatedAt}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-text-muted text-sm">
                    No content found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-muted">
          Showing {start + 1}-{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length} items
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-2 rounded-lg border border-border/60 text-text-muted hover:text-text-primary hover:border-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-lg text-xs font-medium transition-colors ${
                n === safePage
                  ? "bg-accent text-white"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-secondary border border-border/60"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-2 rounded-lg border border-border/60 text-text-muted hover:text-text-primary hover:border-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
