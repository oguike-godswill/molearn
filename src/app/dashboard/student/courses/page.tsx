"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Star,
  Search,
  Filter,
  Play,
  BarChart3,
  Users,
  Grid3X3,
  List,
  ChevronRight,
  MoreHorizontal,
  Award,
  Trash2,
  Download,
  ChevronDown,
} from "lucide-react"

const courses = [
  {
    id: "1",
    title: "React from Zero to Production",
    teacher: "Sarah Chen",
    progress: 100,
    thumbnail: "https://picsum.photos/seed/react/400/225",
    rating: 4.8,
    duration: "18h 30m",
    students: 1240,
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    teacher: "Marcus Johnson",
    progress: 45,
    thumbnail: "https://picsum.photos/seed/typescript/400/225",
    rating: 4.6,
    duration: "12h 15m",
    students: 890,
  },
  {
    id: "3",
    title: "Python for Data Science",
    teacher: "Sarah Chen",
    progress: 78,
    thumbnail: "https://picsum.photos/seed/python/400/225",
    rating: 4.9,
    duration: "22h 00m",
    students: 2150,
  },
  {
    id: "4",
    title: "UI/UX Design Fundamentals",
    teacher: "Lisa Park",
    progress: 32,
    thumbnail: "https://picsum.photos/seed/design/400/225",
    rating: 4.7,
    duration: "10h 45m",
    students: 1560,
  },
  {
    id: "5",
    title: "Node.js Microservices Architecture",
    teacher: "David Kim",
    progress: 60,
    thumbnail: "https://picsum.photos/seed/nodejs/400/225",
    rating: 4.5,
    duration: "16h 20m",
    students: 720,
  },
  {
    id: "6",
    title: "Machine Learning A-Z",
    teacher: "Emily Rodriguez",
    progress: 100,
    thumbnail: "https://picsum.photos/seed/ml/400/225",
    rating: 4.9,
    duration: "28h 00m",
    students: 3400,
  },
  {
    id: "7",
    title: "AWS Cloud Practitioner",
    teacher: "James Wilson",
    progress: 100,
    thumbnail: "https://picsum.photos/seed/aws/400/225",
    rating: 4.4,
    duration: "14h 50m",
    students: 1980,
  },
  {
    id: "8",
    title: "GraphQL API Development",
    teacher: "Marcus Johnson",
    progress: 12,
    thumbnail: "https://picsum.photos/seed/graphql/400/225",
    rating: 4.3,
    duration: "8h 40m",
    students: 640,
  },
]

const wishlist = [
  {
    id: "9",
    title: "Rust Programming Masterclass",
    teacher: "Alex Thompson",
    thumbnail: "https://picsum.photos/seed/rust/400/225",
    rating: 4.8,
    duration: "20h 00m",
    students: 1120,
  },
  {
    id: "10",
    title: "Cybersecurity Fundamentals",
    teacher: "Rachel Adams",
    thumbnail: "https://picsum.photos/seed/security/400/225",
    rating: 4.6,
    duration: "15h 30m",
    students: 980,
  },
  {
    id: "11",
    title: "Mobile Development with Flutter",
    teacher: "Chris Nolan",
    thumbnail: "https://picsum.photos/seed/flutter/400/225",
    rating: 4.7,
    duration: "24h 10m",
    students: 1450,
  },
]

const completedCourses = [
  {
    id: "1",
    title: "React from Zero to Production",
    completedDate: "July 12, 2026",
    grade: "A",
    certificate: true,
    thumbnail: "https://picsum.photos/seed/react-cert/400/225",
  },
  {
    id: "6",
    title: "Machine Learning A-Z",
    completedDate: "June 28, 2026",
    grade: "A-",
    certificate: true,
    thumbnail: "https://picsum.photos/seed/ml-cert/400/225",
  },
  {
    id: "7",
    title: "AWS Cloud Practitioner",
    completedDate: "May 15, 2026",
    grade: "B+",
    certificate: true,
    thumbnail: "https://picsum.photos/seed/aws-cert/400/225",
  },
]

type FilterType = "all" | "in-progress" | "completed"

export default function MyCoursesPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [wishlistOpen, setWishlistOpen] = useState(true)
  const [wishlistItems, setWishlistItems] = useState(wishlist)
  const [achievementsOpen, setAchievementsOpen] = useState(true)

  const enrolledCount = courses.length
  const completedCount = courses.filter((c) => c.progress === 100).length
  const inProgressCount = courses.filter((c) => c.progress < 100).length

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "completed" && c.progress === 100) ||
      (activeFilter === "in-progress" && c.progress < 100)
    return matchesSearch && matchesFilter
  })

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((c) => c.id !== id))
  }

  const filterTabs: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ]

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Courses</h1>
          <p className="text-sm text-text-muted mt-1">Track your enrolled courses and continue learning</p>
        </div>
        <Link href="/dashboard/student" className="text-xs text-accent hover:underline">
          &larr; Back to dashboard
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{enrolledCount}</p>
            <p className="text-xs text-text-muted">Enrolled Courses</p>
          </div>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Award className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{completedCount}</p>
            <p className="text-xs text-text-muted">Completed</p>
          </div>
        </div>
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <BarChart3 className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{inProgressCount}</p>
            <p className="text-xs text-text-muted">In Progress</p>
          </div>
        </div>
      </div>

      {/* Search + Filter + View Toggle */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg p-0.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeFilter === tab.value
                    ? "bg-accent text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-lg p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-all ${
                view === "grid" ? "bg-accent text-white" : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-all ${
                view === "list" ? "bg-accent text-white" : "text-text-muted hover:text-text-primary"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses */}
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
          <BookOpen className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No courses found</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/20 transition-all"
            >
              <div className="aspect-video bg-bg-elevated relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.progress === 100 && (
                  <Badge variant="success" className="absolute top-3 right-3">
                    Completed
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-text-primary truncate pr-2">{course.title}</h3>
                  <button className="text-text-muted hover:text-text-primary shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-text-muted mb-3">{course.teacher}</p>

                {/* Progress */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        course.progress === 100 ? "bg-emerald-500" : "bg-accent"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted shrink-0">
                    {course.progress === 100 ? "Done" : `${course.progress}%`}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs text-text-muted">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Users className="h-3 w-3" />
                    {course.students.toLocaleString()}
                  </div>
                </div>

                {/* Action button */}
                <Link href={`/dashboard/student/courses/${course.id}`}>
                  <Button
                    variant={course.progress === 100 ? "secondary" : "primary"}
                    size="sm"
                    className="w-full"
                  >
                    {course.progress === 100 ? (
                      <>
                        <Star className="h-3.5 w-3.5" />
                        Review
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        Continue
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3 mb-10">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex items-center bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/20 transition-all"
            >
              <div className="w-40 shrink-0 aspect-video bg-bg-elevated relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-text-primary truncate">{course.title}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{course.teacher}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted shrink-0">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {course.rating}
                  </div>
                  <div className="text-xs text-text-muted shrink-0">{course.duration}</div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-28 h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          course.progress === 100 ? "bg-emerald-500" : "bg-accent"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-muted w-10 text-right">
                      {course.progress === 100 ? "Done" : `${course.progress}%`}
                    </span>
                  </div>
                  <Link href={`/dashboard/student/courses/${course.id}`} className="shrink-0">
                    <Button
                      variant={course.progress === 100 ? "secondary" : "primary"}
                      size="sm"
                    >
                      {course.progress === 100 ? (
                        <>
                          <Star className="h-3.5 w-3.5" />
                          Review
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          Continue
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist Section */}
      {wishlistItems.length > 0 && (
        <div className="mb-10">
          <button
            onClick={() => setWishlistOpen(!wishlistOpen)}
            className="flex items-center gap-2 text-text-primary mb-4 hover:text-accent transition-colors"
          >
            <h2 className="text-lg font-semibold">Saved for Later</h2>
            <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
              {wishlistItems.length}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-text-muted transition-transform ${wishlistOpen ? "rotate-180" : ""}`}
            />
          </button>
          {wishlistOpen && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((course) => (
                <div
                  key={course.id}
                  className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/20 transition-all"
                >
                  <div className="aspect-video bg-bg-elevated relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-text-primary truncate">{course.title}</h3>
                    <p className="text-xs text-text-muted mt-1">{course.teacher}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          {course.rating}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(course.id)}
                        className="text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Achievements Section */}
      <div className="mb-10">
        <button
          onClick={() => setAchievementsOpen(!achievementsOpen)}
          className="flex items-center gap-2 text-text-primary mb-4 hover:text-accent transition-colors"
        >
          <Award className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Completed Courses</h2>
          <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
            {completedCourses.length}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-text-muted transition-transform ${achievementsOpen ? "rotate-180" : ""}`}
          />
        </button>
        {achievementsOpen && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/20 transition-all"
              >
                <div className="aspect-video bg-bg-elevated relative overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Award className="h-10 w-10 text-yellow-400" />
                      <span className="text-xs font-medium text-white">Certificate Earned</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-text-primary truncate pr-2">{course.title}</h3>
                    <Badge variant="success">{course.grade}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mb-3">Completed on {course.completedDate}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">
                      <Award className="h-3.5 w-3.5" />
                      View Certificate
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
