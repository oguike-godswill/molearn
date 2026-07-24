"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  BookOpen,
  AlertCircle,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

type ProductStatus = "pending" | "approved" | "rejected"
type ReviewAction = "approve" | "reject"

interface ReviewProduct {
  id: string
  title: string
  teacher: string
  submitted: string
  type: "VIDEO" | "BOOK"
  price: number
  status: ProductStatus
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
}

const products: ReviewProduct[] = [
  {
    id: "1",
    title: "Flutter Mobile Development",
    teacher: "Sarah Chen",
    submitted: "2 days ago",
    type: "VIDEO",
    price: 4499,
    status: "pending",
    description:
      "A comprehensive guide to building cross-platform mobile applications with Flutter. Covers state management, animations, and deploying to both iOS and Android stores.",
    category: "Mobile Development",
    level: "Intermediate",
  },
  {
    id: "2",
    title: "Advanced CSS Grid Layouts",
    teacher: "Mike Johnson",
    submitted: "5 days ago",
    type: "BOOK",
    price: 2499,
    status: "pending",
    description:
      "Master modern CSS Grid techniques. Learn responsive patterns, named grid areas, and advanced layout strategies for complex web applications.",
    category: "Web Development",
    level: "Advanced",
  },
  {
    id: "3",
    title: "React from Zero to Production",
    teacher: "Sarah Chen",
    submitted: "Jun 28, 2026",
    type: "VIDEO",
    price: 5999,
    status: "approved",
    description:
      "Build production-ready React applications from scratch. Includes hooks, context API, testing, CI/CD, and deployment strategies.",
    category: "Web Development",
    level: "Beginner",
  },
  {
    id: "4",
    title: "Node.js Performance Guide",
    teacher: "Lisa Park",
    submitted: "May 20, 2026",
    type: "BOOK",
    price: 3999,
    status: "rejected",
    description:
      "Optimize Node.js applications for maximum performance. Covers profiling, memory management, clustering, and caching strategies.",
    category: "Backend Development",
    level: "Advanced",
  },
  {
    id: "5",
    title: "Rust Systems Programming",
    teacher: "Alex Rivera",
    submitted: "1 week ago",
    type: "VIDEO",
    price: 6999,
    status: "pending",
    description:
      "Deep dive into systems programming with Rust. Covers ownership, borrowing, lifetimes, unsafe code, and building high-performance concurrent applications.",
    category: "Systems Programming",
    level: "Advanced",
  },
]

const TABS = ["All", "Pending", "Approved", "Rejected"] as const
type Tab = (typeof TABS)[number]

function StatusBadge({ status }: { status: ProductStatus }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-500/10 text-emerald-400">
        <CheckCircle className="h-2.5 w-2.5" />
        Approved
      </span>
    )
  }
  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-500/10 text-red-400">
        <XCircle className="h-2.5 w-2.5" />
        Rejected
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-500/10 text-amber-400">
      <Clock className="h-2.5 w-2.5" />
      Pending
    </span>
  )
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [confirmState, setConfirmState] = useState<{
    productId: string
    action: ReviewAction
  } | null>(null)
  const [search, setSearch] = useState("")

  const filtered = products.filter((p) => {
    const matchesTab = tab === "All" || tab.toLowerCase() === p.status
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const pendingCount = products.filter((p) => p.status === "pending").length
  const reviewedToday = 4
  const approvalRate = 78
  const avgReviewTime = "2.4 hrs"
  const totalReviewed = products.filter((p) => p.status !== "pending").length

  function handleConfirm() {
    if (!confirmState) return
    setConfirmState(null)
    setNotes((prev) => ({ ...prev, [confirmState.productId]: "" }))
  }

  return (
    <div className="p-6 w-full animate-fade-in">
      <div className="sm:flex sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Pending Reviews</h1>
          <p className="text-sm text-text-secondary mt-1">
            Review and moderate content submissions from teachers.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 shrink-0">
            <Clock className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">Pending</p>
            <p className="text-xl font-bold text-text-primary">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
            <Calendar className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">Reviewed Today</p>
            <p className="text-xl font-bold text-text-primary">{reviewedToday}</p>
          </div>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">Approval Rate</p>
            <p className="text-xl font-bold text-text-primary">{approvalRate}%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex rounded-lg bg-bg-elevated border border-border/60 p-1 gap-1 self-start">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                    tab === t
                      ? "bg-accent text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-bg-elevated border border-border/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl p-10 text-center">
              <AlertCircle className="h-8 w-8 text-text-muted mx-auto mb-3" />
              <p className="text-sm text-text-secondary">No products match your filters.</p>
            </div>
          )}

          <div className="space-y-3">
            {filtered.map((product) => {
              const isExpanded = expandedId === product.id

              return (
                <div
                  key={product.id}
                  className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : product.id)}
                    className="w-full p-5 flex items-center gap-4 text-left hover:bg-bg-elevated/40 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft shrink-0">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-medium text-text-primary truncate">
                          {product.title}
                        </h3>
                        <StatusBadge status={product.status} />
                      </div>
                      <p className="text-xs text-text-muted">
                        <User className="h-3 w-3 inline mr-1" />
                        {product.teacher} &middot; {product.type} &middot; $
                        {(product.price / 100).toFixed(2)} &middot; Submitted{" "}
                        {product.submitted}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {product.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setConfirmState({
                                productId: product.id,
                                action: "approve",
                              })
                            }}
                          >
                            <ThumbsUp className="h-3 w-3" /> Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setConfirmState({
                                productId: product.id,
                                action: "reject",
                              })
                            }}
                          >
                            <XCircle className="h-3 w-3" /> Reject
                          </Button>
                        </>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-text-muted shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-text-muted shrink-0" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border/40">
                      <div className="pt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                            Description
                          </h4>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                            Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-muted">Category</span>
                              <span className="text-text-primary">
                                {product.category}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Level</span>
                              <span className="text-text-primary">
                                {product.level}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Type</span>
                              <Badge variant="secondary">{product.type}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Price</span>
                              <span className="text-text-primary font-medium">
                                ${(product.price / 100).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 aspect-video rounded-lg bg-bg-elevated border border-border/40 flex items-center justify-center">
                            <Eye className="h-6 w-6 text-text-muted" />
                            <span className="text-xs text-text-muted ml-2">
                              Thumbnail Preview
                            </span>
                          </div>
                        </div>
                      </div>

                      {product.status === "pending" && (
                        <div className="mt-4">
                          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
                            Agent Note
                          </label>
                          <Textarea
                            value={notes[product.id] || ""}
                            onChange={(e) =>
                              setNotes((prev) => ({
                                ...prev,
                                [product.id]: e.target.value,
                              }))
                            }
                            placeholder="Add a note before taking action..."
                            className="min-h-[80px]"
                          />
                        </div>
                      )}

                      <div className="mt-4">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-3.5 w-3.5" /> View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" /> Review Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Approval Rate</span>
                  <span className="text-text-primary font-medium">
                    {approvalRate}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${approvalRate}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Average Review Time</span>
                <span className="text-text-primary font-medium">
                  {avgReviewTime}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Pending</span>
                <span className="text-amber-400 font-medium">
                  {pendingCount}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Reviewed</span>
                <span className="text-text-primary font-medium">
                  {totalReviewed}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary/50 backdrop-blur-md border border-border/60 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4 text-accent" /> Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs text-text-secondary">Pending</span>
                </div>
                <span className="text-xs font-medium text-text-primary">
                  {pendingCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-text-secondary">Approved</span>
                </div>
                <span className="text-xs font-medium text-text-primary">
                  {products.filter((p) => p.status === "approved").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs text-text-secondary">Rejected</span>
                </div>
                <span className="text-xs font-medium text-text-primary">
                  {products.filter((p) => p.status === "rejected").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-text-secondary">
                    Reviewed Today
                  </span>
                </div>
                <span className="text-xs font-medium text-text-primary">
                  {reviewedToday}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {confirmState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmState(null)}
          />
          <div className="relative bg-bg-elevated border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  confirmState.action === "approve"
                    ? "bg-emerald-500/10"
                    : "bg-red-500/10"
                }`}
              >
                {confirmState.action === "approve" ? (
                  <ThumbsUp className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ThumbsDown className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {confirmState.action === "approve" ? "Approve" : "Reject"}{" "}
                  Product
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  {confirmState.action === "approve"
                    ? "This will make the product visible to students."
                    : "This product will be returned to the teacher with feedback."}
                </p>
              </div>
            </div>

            {notes[confirmState.productId] && (
              <div className="mb-4 bg-bg-secondary rounded-lg p-3 border border-border/40">
                <p className="text-xs text-text-muted mb-1">Agent Note</p>
                <p className="text-xs text-text-secondary">
                  {notes[confirmState.productId]}
                </p>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmState(null)}
              >
                Cancel
              </Button>
              <Button
                variant={
                  confirmState.action === "approve" ? "primary" : "danger"
                }
                size="sm"
                onClick={handleConfirm}
              >
                {confirmState.action === "approve" ? "Approve" : "Reject"}{" "}
                Permanently
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
