"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users, Search, Filter, MoreHorizontal, UserPlus, Download,
  Edit, Eye, Ban, Trash2, Calendar, CheckCircle, XCircle, Shield,
} from "lucide-react"

type Role = "Student" | "Mentor" | "Admin"
type Status = "Active" | "Inactive"

interface User {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  joined: string
}

const mockUsers: User[] = [
  { id: "1", name: "Olivia Harper", email: "olivia@example.com", role: "Student", status: "Active", joined: "Mar 2026" },
  { id: "2", name: "James Wilson", email: "james.w@example.com", role: "Student", status: "Active", joined: "Jan 2026" },
  { id: "3", name: "Ethan Clark", email: "e.clark@example.com", role: "Student", status: "Inactive", joined: "Apr 2026" },
  { id: "4", name: "Sophia Martinez", email: "sophia.m@mojetech.com", role: "Mentor", status: "Active", joined: "Dec 2025" },
  { id: "5", name: "Daniel Lee", email: "dan.lee@mojetech.com", role: "Mentor", status: "Active", joined: "Feb 2026" },
  { id: "6", name: "Aria Thompson", email: "aria.t@mojetech.com", role: "Mentor", status: "Inactive", joined: "Nov 2025" },
  { id: "7", name: "Noah Garcia", email: "n.garcia@mojetech.com", role: "Student", status: "Active", joined: "Oct 2025" },
  { id: "8", name: "Mia Robinson", email: "mia.r@example.com", role: "Student", status: "Active", joined: "Jan 2026" },
  { id: "9", name: "Liam Anderson", email: "liam@mojetech.com", role: "Admin", status: "Active", joined: "Sep 2025" },
  { id: "10", name: "Ava Mitchell", email: "ava@mojetech.com", role: "Admin", status: "Active", joined: "Aug 2025" },
  { id: "11", name: "Lucas Brown", email: "lucas.b@example.com", role: "Student", status: "Active", joined: "May 2026" },
  { id: "12", name: "Emma Davis", email: "emma.d@mojetech.com", role: "Mentor", status: "Active", joined: "Jun 2026" },
]

const roleFilters = ["All", "Student", "Mentor", "Admin"] as const

const roleColorMap: Record<Role, string> = {
  Student: "bg-blue-600 text-white",
  Mentor: "bg-purple-600 text-white",
  Admin: "bg-emerald-600 text-white",
}

const avatarColorMap: Record<Role, string> = {
  Student: "bg-blue-600/20 text-blue-400",
  Mentor: "bg-purple-600/20 text-purple-400",
  Admin: "bg-emerald-600/20 text-emerald-400",
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("")
}

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const filtered = mockUsers.filter((u) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter
    const matchesSearch =
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesSearch
  })

  const totalStudents = mockUsers.filter((u) => u.role === "Student").length
  const totalMentors = mockUsers.filter((u) => u.role === "Mentor").length
  const totalAdmins = mockUsers.filter((u) => u.role === "Admin").length

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader title="User Management" description="Manage all platform users, roles, and permissions." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={Users} label="Total Users" value={String(mockUsers.length)} change="+8%" />
        <StatCard icon={Users} label="Students" value={String(totalStudents)} change="+12%" />
        <StatCard icon={Shield} label="Mentors" value={String(totalMentors)} change="+3%" />
        <StatCard icon={Shield} label="Admins" value={String(totalAdmins)} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-bg-secondary/50 backdrop-blur-sm border border-border/40 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Role filter tabs */}
        <div className="flex items-center gap-1 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg p-1">
          {roleFilters.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                roleFilter === r
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Name</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Email</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Role</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Status</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Joined</th>
                <th className="px-5 py-3.5 text-xs font-medium text-text-muted w-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-text-muted text-sm">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColorMap[user.role]}`}>
                          {getInitials(user.name)}
                        </div>
                        <span className="text-sm font-medium text-text-primary">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{user.email}</td>
                    <td className="px-5 py-3.5">
                      <Badge className={roleColorMap[user.role]}>{user.role}</Badge>
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
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-text-muted" />
                        {user.joined}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 relative">
                      <button
                        onClick={() => setOpenDropdownId((prev) => (prev === user.id ? null : user.id))}
                        className="p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {openDropdownId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
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
                              {user.status === "Active" ? "Deactivate" : "Activate"}
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
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-text-muted">
          Showing {filtered.length} of {mockUsers.length} users
        </p>
      </div>
    </DashboardLayout>
  )
}
