"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Play,
  BarChart3,
  CreditCard,
  ChevronRight,
  Layers,
  Calendar,
  Sparkles,
} from "lucide-react"

const enrolledCourses = [
  {
    id: "dm-101",
    title: "Digital Marketing Fundamentals",
    track: "Marketing",
    progress: 45,
    completedLessons: 28,
    totalLessons: 62,
    duration: "12 weeks",
    lastAccessed: "2 hours ago",
    thumbnail: "https://picsum.photos/seed/digital-marketing/400/225",
  },
  {
    id: "df-101",
    title: "Design Fundamentals",
    track: "Design",
    progress: 12,
    completedLessons: 5,
    totalLessons: 40,
    duration: "8 weeks",
    lastAccessed: "3 days ago",
    thumbnail: "https://picsum.photos/seed/design-fundamentals/400/225",
  },
]

const availableCourses = [
  {
    id: "wd-201",
    title: "Web Development Bootcamp",
    track: "Development",
    lessons: 85,
    duration: "16 weeks",
    thumbnail: "https://picsum.photos/seed/web-dev/400/225",
  },
  {
    id: "ds-201",
    title: "Data Science with Python",
    track: "Data",
    lessons: 54,
    duration: "10 weeks",
    thumbnail: "https://picsum.photos/seed/data-science/400/225",
  },
  {
    id: "ux-201",
    title: "UX Research Methods",
    track: "Design",
    lessons: 36,
    duration: "6 weeks",
    thumbnail: "https://picsum.photos/seed/ux-research/400/225",
  },
  {
    id: "sm-201",
    title: "Social Media Strategy",
    track: "Marketing",
    lessons: 42,
    duration: "8 weeks",
    thumbnail: "https://picsum.photos/seed/social-media/400/225",
  },
]

const trackColors: Record<string, string> = {
  Marketing: "bg-rose-500/15 text-rose-400",
  Design: "bg-violet-500/15 text-violet-400",
  Development: "bg-sky-500/15 text-sky-400",
  Data: "bg-amber-500/15 text-amber-400",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export default function MyCoursesPage() {
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null)

  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader
        title="My Courses"
        description="Track your enrolled courses and continue learning."
      />

      {/* Enrolled Courses */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Enrolled Courses</h2>
          <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
            {enrolledCourses.length}
          </span>
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {enrolledCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
              className="group bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <div className="sm:w-48 shrink-0 aspect-video sm:aspect-auto bg-bg-elevated relative overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        trackColors[course.track] || "bg-accent/15 text-accent"
                      }`}
                    >
                      {course.track}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-1 truncate">
                      {course.title}
                    </h3>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.lastAccessed}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-text-muted">Progress</span>
                        <span className="text-xs font-semibold text-accent">{course.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-blue-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" as const, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-4">
                    <Link href={`/dashboard/student/courses/${course.id}`}>
                      <Button variant="primary" size="sm" className="w-full sm:w-auto">
                        <Play className="h-3.5 w-3.5" />
                        Continue Learning
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Subscription Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <CreditCard className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Subscription</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="success">Active Subscription</Badge>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Plan</p>
                  <p className="text-text-primary font-medium">Monthly - $49/month</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Next Billing</p>
                  <p className="text-text-primary font-medium">Feb 15, 2026</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">Status</p>
                  <p className="text-emerald-400 font-medium">Active</p>
                </div>
              </div>
            </div>
            <Link href="/dashboard/settings">
              <Button variant="secondary" size="sm">
                Manage Subscription
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Available Courses (Subscription Content) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-text-primary">Available Courses</h2>
            <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
              {availableCourses.length}
            </span>
          </div>
          <Link href="/browse" className="text-xs text-accent hover:underline flex items-center gap-1">
            Browse all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {availableCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="group bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
            >
              <div className="aspect-video bg-bg-elevated relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      trackColors[course.track] || "bg-accent/15 text-accent"
                    }`}
                  >
                    {course.track}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-text-primary truncate mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                </div>
                <Link href={`/dashboard/student/courses/${course.id}`}>
                  <Button variant="secondary" size="sm" className="w-full">
                    <Play className="h-3.5 w-3.5" />
                    Start Course
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </DashboardLayout>
  )
}
