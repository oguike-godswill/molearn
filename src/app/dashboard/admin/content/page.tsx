"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen, FileText, Plus, Edit, Eye, Trash2, MoreHorizontal,
  Users, CheckCircle, Clock, Globe,
} from "lucide-react"

type Tab = "courses" | "blog"

interface Course {
  id: string
  title: string
  status: "Published" | "Draft"
  enrolled: number
  price: string
}

interface BlogPost {
  id: string
  title: string
  author: string
  category: string
  status: "Published" | "Draft"
  date: string
}

const courses: Course[] = [
  { id: "1", title: "React Masterclass 2026", status: "Published", enrolled: 1247, price: "$49.99" },
  { id: "2", title: "Python for Data Science", status: "Published", enrolled: 987, price: "$59.99" },
  { id: "3", title: "Advanced TypeScript Patterns", status: "Published", enrolled: 654, price: "$34.99" },
  { id: "4", title: "Figma UI/UX Design Pro", status: "Draft", enrolled: 0, price: "$44.99" },
  { id: "5", title: "Node.js Microservices", status: "Published", enrolled: 543, price: "$54.99" },
  { id: "6", title: "AWS Cloud Architecture", status: "Draft", enrolled: 0, price: "$69.99" },
  { id: "7", title: "Business Strategy 101", status: "Published", enrolled: 312, price: "$29.99" },
]

const blogPosts: BlogPost[] = [
  { id: "1", title: "Getting Started with React 19", author: "Sarah Chen", category: "Development", status: "Published", date: "Jul 15, 2026" },
  { id: "2", title: "Top 10 Figma Plugins for Designers", author: "Emily Watson", category: "Design", status: "Published", date: "Jul 12, 2026" },
  { id: "3", title: "Why TypeScript is Worth Learning", author: "Daniel Lee", category: "Development", status: "Draft", date: "Jul 10, 2026" },
  { id: "4", title: "Data Science Career Roadmap", author: "Marcus Rivera", category: "Data Science", status: "Published", date: "Jul 8, 2026" },
  { id: "5", title: "Building Scalable APIs with Node.js", author: "Sarah Chen", category: "Development", status: "Published", date: "Jul 5, 2026" },
  { id: "6", title: "Introduction to Cloud Computing", author: "Robert Kim", category: "DevOps", status: "Draft", date: "Jul 2, 2026" },
]

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("courses")
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const publishedCourses = courses.filter((c) => c.status === "Published").length
  const draftCourses = courses.filter((c) => c.status === "Draft").length
  const publishedPosts = blogPosts.filter((p) => p.status === "Published").length
  const draftPosts = blogPosts.filter((p) => p.status === "Draft").length

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader title="Content Management" description="Manage courses and blog posts across the platform." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={BookOpen} label="Total Courses" value={String(courses.length)} />
        <StatCard icon={CheckCircle} label="Published Courses" value={String(publishedCourses)} color="bg-emerald-600" />
        <StatCard icon={FileText} label="Blog Posts" value={String(blogPosts.length)} />
        <StatCard icon={Clock} label="Drafts" value={String(draftCourses + draftPosts)} color="bg-amber-600" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border/30 pb-0">
        {(["courses", "blog"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
              activeTab === tab
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab === "courses" ? "Courses" : "Blog Posts"}
          </button>
        ))}
      </div>

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">All Courses</h3>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </div>
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Title</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Status</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Enrolled</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Price</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted w-10">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{course.title}</td>
                      <td className="px-5 py-3.5">
                        {course.status === "Published" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            <Globe className="h-3 w-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">
                            <Clock className="h-3 w-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-text-secondary">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-text-muted" />
                          {course.enrolled.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-text-primary font-medium">{course.price}</td>
                      <td className="px-5 py-3.5 relative">
                        <button
                          onClick={() => setOpenDropdownId((prev) => (prev === course.id ? null : course.id))}
                          className="p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {openDropdownId === course.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                            <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-bg-secondary/90 backdrop-blur-md border border-border/40 rounded-xl py-1.5 shadow-lg">
                              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 transition-colors">
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </button>
                              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-bg-elevated/50 transition-colors">
                                <Eye className="h-3.5 w-3.5" />
                                {course.status === "Published" ? "Unpublish" : "Publish"}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Posts Tab */}
      {activeTab === "blog" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">All Blog Posts</h3>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </div>
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Title</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Author</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Category</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Status</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted">Date</th>
                    <th className="px-5 py-3.5 text-xs font-medium text-text-muted w-10">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border/20 last:border-0 hover:bg-bg-elevated/30 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{post.title}</td>
                      <td className="px-5 py-3.5 text-text-secondary">{post.author}</td>
                      <td className="px-5 py-3.5">
                        <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">
                          {post.category}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        {post.status === "Published" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            <Globe className="h-3 w-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">
                            <Clock className="h-3 w-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap">{post.date}</td>
                      <td className="px-5 py-3.5 relative">
                        <button
                          onClick={() => setOpenDropdownId((prev) => (prev === post.id ? null : post.id))}
                          className="p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {openDropdownId === post.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                            <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-bg-secondary/90 backdrop-blur-md border border-border/40 rounded-xl py-1.5 shadow-lg">
                              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 transition-colors">
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </button>
                              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-bg-elevated/50 transition-colors">
                                <Eye className="h-3.5 w-3.5" />
                                {post.status === "Published" ? "Unpublish" : "Publish"}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
