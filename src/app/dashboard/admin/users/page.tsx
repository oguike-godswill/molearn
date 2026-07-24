"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Trash2,
  Edit,
  Eye,
  UserPlus,
  Mail,
  Calendar,
  BarChart3,
  Ban,
  CheckCircle,
  XCircle,
} from "lucide-react"

// ---------------------------------------------------------------------- types & mock data

type Role = "STUDENT" | "TEACHER" | "AGENT" | "ADMIN"
type Status = "Active" | "Suspended"

interface User {
  id: string
  name: string
  email: string
  role: Role
  bio: string
  joined: string
  status: Status
  purchases: number
  enrolledCourses: number
  lastActive: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Olivia Harper",
    email: "olivia@example.com",
    role: "STUDENT",
    bio: "Computer science undergrad exploring web development and machine learning.",
    joined: "Mar 2026",
    status: "Active",
    purchases: 8,
    enrolledCourses: 5,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james.w@example.com",
    role: "STUDENT",
    bio: "Self-taught developer focused on React and Node.js ecosystem.",
    joined: "Jan 2026",
    status: "Active",
    purchases: 12,
    enrolledCourses: 7,
    lastActive: "5 hours ago",
  },
  {
    id: "3",
    name: "Ethan Clark",
    email: "e.clark@example.com",
    role: "STUDENT",
    bio: "High school student passionate about cybersecurity and ethical hacking.",
    joined: "Apr 2026",
    status: "Suspended",
    purchases: 2,
    enrolledCourses: 1,
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "Sophia Martinez",
    email: "sophia.m@edutech.com",
    role: "TEACHER",
    bio: "Senior UX designer with 10+ years teaching design thinking and Figma.",
    joined: "Dec 2025",
    status: "Active",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "1 hour ago",
  },
  {
    id: "5",
    name: "Daniel Lee",
    email: "dan.lee@edutech.com",
    role: "TEACHER",
    bio: "Full-stack engineer and author of three best-selling programming books.",
    joined: "Feb 2026",
    status: "Active",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "30 minutes ago",
  },
  {
    id: "6",
    name: "Aria Thompson",
    email: "aria.t@edutech.com",
    role: "TEACHER",
    bio: "Data scientist specializing in Python, SQL, and business intelligence.",
    joined: "Nov 2025",
    status: "Suspended",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "1 week ago",
  },
  {
    id: "7",
    name: "Noah Garcia",
    email: "n.garcia@partners.com",
    role: "AGENT",
    bio: "EdTech affiliate partner helping schools adopt digital learning platforms.",
    joined: "Oct 2025",
    status: "Active",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "12 hours ago",
  },
  {
    id: "8",
    name: "Mia Robinson",
    email: "mia.r@partners.com",
    role: "AGENT",
    bio: "Corporate training consultant bridging businesses with top educators.",
    joined: "Jan 2026",
    status: "Active",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "1 day ago",
  },
  {
    id: "9",
    name: "Liam Anderson",
    email: "liam@molearn.com",
    role: "ADMIN",
    bio: "Platform administrator overseeing content moderation and user support.",
    joined: "Sep 2025",
    status: "Active",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "Just now",
  },
  {
    id: "10",
    name: "Ava Mitchell",
    email: "ava@molearn.com",
    role: "ADMIN",
    bio: "Head of platform operations managing curriculum quality and compliance.",
    joined: "Aug 2025",
    status: "Active",
    purchases: 0,
    enrolledCourses: 0,
    lastActive: "10 minutes ago",
  },
]

const stats = [
  { label: "Total Users", value: "1,245", icon: Users },
  { label: "Students", value: "980", icon: Users },
  { label: "Teachers", value: "185", icon: Users },
  { label: "Agents / Admins", value: "80", icon: Shield },
]

const tabs = ["All Users", "Students", "Teachers", "Agents", "Admins"]

const roleColorMap: Record<Role, string> = {
  STUDENT: "bg-blue-600 text-white",
  TEACHER: "bg-green-600 text-white",
  AGENT: "bg-amber-500 text-white",
  ADMIN: "bg-purple-600 text-white",
}

const avatarColorMap: Record<Role, string> = {
  STUDENT: "bg-blue-600/20 text-blue-400",
  TEACHER: "bg-green-600/20 text-green-400",
  AGENT: "bg-amber-500/20 text-amber-400",
  ADMIN: "bg-purple-600/20 text-purple-400",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

// ---------------------------------------------------------------------- page component

export default function Page() {
  const [activeTab, setActiveTab] = useState("All Users")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "Active" | "Suspended">("all")
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 6

  // ---- filtering
  const filtered = mockUsers.filter((u) => {
    const matchesTab =
      activeTab === "All Users" ||
      (activeTab === "Students" && u.role === "STUDENT") ||
      (activeTab === "Teachers" && u.role === "TEACHER") ||
      (activeTab === "Agents" && u.role === "AGENT") ||
      (activeTab === "Admins" && u.role === "ADMIN")

    const matchesSearch =
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || u.status === filterStatus

    return matchesTab && matchesSearch && matchesStatus
  })

  // ---- pagination
  const totalPages = Math.ceil(filtered.length / perPage)
  const safePage = Math.min(page, Math.max(totalPages, 1))
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  // ---- helpers
  function closeDropdown() {
    setOpenDropdownId(null)
  }

  function handleRowClick(userId: string) {
    setExpandedUserId((prev) => (prev === userId ? null : userId))
  }

  return (
    <div className="p-6 min-h-screen">
      {/* ---- header ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Users</h1>
          <p className="text-sm text-text-secondary mt-1">Manage all platform accounts and permissions</p>
        </div>
        <Button size="sm">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* ---- stats cards ---- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-secondary/40 backdrop-blur-sm border border-border/40 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
              <stat.icon className="h-5 w-5 text-text-muted" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ---- tabs ---- */}
      <div className="flex items-center gap-1 mb-6 border-b border-border/30 pb-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              setPage(1)
            }}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
              activeTab === tab
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---- search & filter bar ---- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-bg-secondary/50 backdrop-blur-sm border border-border/40 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-text-muted" />
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as "all" | "Active" | "Suspended")
              setPage(1)
            }}
            className="h-10 px-3 rounded-lg bg-bg-secondary/50 backdrop-blur-sm border border-border/40 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* ---- users table ---- */}
      <div className="bg-bg-secondary/40 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-left">
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">User</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Email</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Role</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted whitespace-nowrap">Joined</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Status</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted w-10" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-text-muted text-sm">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((user) => (
                  <tr key={user.id} className="border-b border-border/20 last:border-0">
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleRowClick(user.id)}
                        className="flex items-center gap-3 text-left w-full group"
                      >
                        <div
                          className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColorMap[user.role]}`}
                        >
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                            {user.name}
                          </p>
                        </div>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{user.email}</td>
                    <td className="px-5 py-3.5">
                      <Badge className={roleColorMap[user.role]}>{user.role}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-text-muted" />
                        {user.joined}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {user.status === "Active" ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600 text-white">
                          <XCircle className="h-3 w-3 mr-1" />
                          Suspended
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-3.5 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenDropdownId((prev) => (prev === user.id ? null : user.id))
                        }}
                        className="p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {openDropdownId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={closeDropdown} />
                          <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-bg-secondary/90 backdrop-blur-md border border-border/40 rounded-xl py-1.5 shadow-lg">
                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 transition-colors">
                              <Edit className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 transition-colors">
                              <Eye className="h-3.5 w-3.5" />
                              View Profile
                            </button>
                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-bg-elevated/50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                              {user.status === "Active" ? "Suspend" : "Unsuspend"}
                            </button>
                            <div className="border-t border-border/30 my-1" />
                            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-bg-elevated/50 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---- expanded detail panel ---- */}
        {expandedUserId && (
          <div className="border-t border-border/30">
            {filtered
              .filter((u) => u.id === expandedUserId)
              .map((user) => (
                <div key={user.id} className="px-5 py-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted mb-1">Bio</p>
                    <p className="text-sm text-text-secondary">{user.bio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted mb-1">
                      Total Purchases
                    </p>
                    <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5 text-accent" />
                      {user.purchases}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted mb-1">
                      Enrolled Courses
                    </p>
                    <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5 text-accent" />
                      {user.enrolledCourses}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted mb-1">Last Active</p>
                    <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {user.lastActive}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ---- pagination ---- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-text-muted">
            Showing {(safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of{" "}
            {filtered.length} users
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="h-8 px-3 text-xs font-medium rounded-lg border border-border/40 text-text-secondary hover:text-text-primary hover:bg-bg-elevated disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-8 w-8 text-xs font-medium rounded-lg transition-colors ${
                  safePage === p
                    ? "bg-accent text-white"
                    : "border border-border/40 text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="h-8 px-3 text-xs font-medium rounded-lg border border-border/40 text-text-secondary hover:text-text-primary hover:bg-bg-elevated disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
