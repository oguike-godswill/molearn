"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BookOpen, ChevronLeft, ChevronRight, Clock, Play, Star, Users } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

const courses = [
  {
    id: "1", title: "React from Zero to Production", teacher: "Sarah Chen", rating: 4.8, students: 2340,
    price: 4999, duration: "24h", level: "Intermediate", thumbnail: "https://picsum.photos/seed/react/600/338", type: "VIDEO",
  },
  {
    id: "3", title: "Full-Stack Next.js Masterclass", teacher: "Alex Rivera", rating: 4.9, students: 3120,
    price: 6999, duration: "32h", level: "All Levels", thumbnail: "https://picsum.photos/seed/nextjs/600/338", type: "VIDEO",
  },
  {
    id: "4", title: "Python for Data Science", teacher: "Emily Watson", rating: 4.7, students: 1890,
    price: 3999, duration: "18h", level: "Beginner", thumbnail: "https://picsum.photos/seed/python/600/338", type: "VIDEO",
  },
  {
    id: "6", title: "UI/UX Design Fundamentals", teacher: "Lisa Park", rating: 4.8, students: 1560,
    price: 5499, duration: "20h", level: "Beginner", thumbnail: "https://picsum.photos/seed/design/600/338", type: "VIDEO",
  },
  {
    id: "7", title: "Node.js Microservices", teacher: "James Wilson", rating: 4.7, students: 1100,
    price: 5999, duration: "22h", level: "Advanced", thumbnail: "https://picsum.photos/seed/nodejs/600/338", type: "VIDEO",
  },
  {
    id: "9", title: "Go Programming Bootcamp", teacher: "Tom Bradley", rating: 4.6, students: 980,
    price: 4499, duration: "16h", level: "Intermediate", thumbnail: "https://picsum.photos/seed/golang/600/338", type: "VIDEO",
  },
]

export function FeaturedCourses() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollButtons, { passive: true })
    updateScrollButtons()
    return () => el.removeEventListener("scroll", updateScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" })
  }

  return (
    <section className="w-full px-4 py-20 relative z-10">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Featured Courses</h2>
          <p className="mt-2 text-sm text-text-secondary">Top-rated courses picked by our editors</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/browse">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-text-secondary hover:text-text-primary hover:border-border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-text-secondary hover:text-text-primary hover:border-border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/browse/${course.id}`}
            className="group flex-shrink-0 w-[300px] snap-start"
          >
            <div className="bg-bg-secondary/60 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="relative aspect-video bg-bg-elevated overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/90 rounded-xl">
                    <Play className="h-5 w-5 text-bg-primary ml-0.5" />
                  </div>
                </div>
                <Badge className="absolute top-3 left-3">{course.type === "VIDEO" ? "Video" : "Book"}</Badge>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-text-muted mt-1">{course.teacher}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.students.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                  <Badge className="text-[10px]">{course.level}</Badge>
                  <span className="text-sm font-bold text-text-primary">${(course.price / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link href="/browse">
          <Button variant="ghost" size="sm">View all courses →</Button>
        </Link>
      </div>
    </section>
  )
}
