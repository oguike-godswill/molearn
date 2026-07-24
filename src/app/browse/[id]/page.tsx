"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/toast"
import {
  BookOpen,
  Play,
  Clock,
  Star,
  Users,
  Shield,
  ChevronLeft,
  ShoppingCart,
  Check,
  Heart,
  Share2,
} from "lucide-react"

const courseData = {
  id: "1",
  title: "React from Zero to Production",
  description:
    "This comprehensive course takes you from absolute beginner to confident React developer. You'll learn modern React with hooks, build real-world applications, and deploy them to production. Each module builds on the previous one, ensuring you develop a deep understanding of React fundamentals and advanced patterns.",
  longDescription:
    "React has become the most popular front-end library in the world, and for good reason. Its component-based architecture, declarative approach, and vibrant ecosystem make it the go-to choice for building modern web applications.\n\nIn this course, we'll start with the fundamentals — JSX, components, props, and state — then progressively move into more advanced topics like custom hooks, context API, performance optimization, testing, and deployment. By the end, you'll have built several real-world projects and have the confidence to build your own React applications from scratch.",
  category: "Web Development",
  level: "Intermediate",
  price: 4999,
  originalPrice: 7999,
  teacher: {
    name: "Sarah Chen",
    initials: "SC",
    avatar: "https://picsum.photos/seed/sarah/100/100",
    title: "Senior Front-End Engineer at TechCorp",
    bio: "Sarah has over 10 years of experience in front-end development. She's worked at startups and FAANG companies, building products used by millions. She's passionate about teaching and has helped thousands of students master React.",
    students: 2340,
    courses: 8,
    rating: 4.8,
    reviews: 1240,
  },
  rating: 4.8,
  reviewCount: 2340,
  studentCount: 12540,
  lastUpdated: "June 2026",
  duration: "24 hours",
  totalLectures: 84,
  totalSections: 12,
  image: "https://picsum.photos/seed/react/800/450",
  learnPoints: [
    "Build production-ready React applications from scratch",
    "Master React hooks including useState, useEffect, useReducer, and custom hooks",
    "Manage complex state with Context API and Zustand",
    "Implement authentication, routing, and data fetching",
    "Write unit and integration tests with React Testing Library",
    "Deploy applications to Vercel, Netlify, and AWS",
  ],
  includes: [
    { icon: Play, label: "24 hours of video content" },
    { icon: BookOpen, label: "84 lectures across 12 sections" },
    { icon: Clock, label: "Full lifetime access" },
    { icon: Users, label: "Access on mobile and desktop" },
    { icon: Check, label: "Certificate of completion" },
    { icon: Shield, label: "30-day money-back guarantee" },
  ],
  requirements: [
    "Basic knowledge of HTML, CSS, and JavaScript",
    "Familiarity with ES6+ syntax (arrow functions, destructuring, modules)",
    "Node.js and npm installed on your machine",
    "A code editor (preferably VS Code)",
  ],
  sections: [
    {
      title: "Getting Started with React",
      duration: "2h 15m",
      lectures: [
        { title: "Welcome to the Course", duration: "8:32", free: true },
        { title: "What is React?", duration: "14:20", free: true },
        { title: "Setting Up Your Development Environment", duration: "18:45", free: false },
        { title: "Your First React App", duration: "22:10", free: false },
        { title: "Understanding JSX", duration: "16:08", free: false },
        { title: "Components and Props", duration: "25:40", free: false },
      ],
    },
    {
      title: "State and Events",
      duration: "3h 30m",
      lectures: [
        { title: "What is State?", duration: "12:15", free: false },
        { title: "useState Hook Deep Dive", duration: "28:30", free: false },
        { title: "Handling Events in React", duration: "20:45", free: false },
        { title: "Forms and Controlled Components", duration: "32:10", free: false },
        { title: "Lifting State Up", duration: "24:20", free: false },
        { title: "useEffect and Side Effects", duration: "35:00", free: false },
        { title: "Custom Hooks Introduction", duration: "22:30", free: false },
      ],
    },
    {
      title: "Advanced React Patterns",
      duration: "4h 00m",
      lectures: [
        { title: "useReducer for Complex State", duration: "26:40", free: false },
        { title: "Context API Deep Dive", duration: "32:15", free: false },
        { title: "Render Props Pattern", duration: "18:50", free: false },
        { title: "Higher-Order Components", duration: "22:30", free: false },
        { title: "Compound Components", duration: "28:45", free: false },
      ],
    },
    {
      title: "Routing and Navigation",
      duration: "2h 45m",
      lectures: [
        { title: "Introduction to React Router", duration: "14:20", free: false },
        { title: "Setting Up Routes", duration: "20:15", free: false },
        { title: "Dynamic Routing and Parameters", duration: "24:30", free: false },
        { title: "Nested Routes and Layouts", duration: "28:40", free: false },
        { title: "Navigation Guards and Auth", duration: "22:10", free: false },
      ],
    },
    {
      title: "State Management with Zustand",
      duration: "1h 50m",
      lectures: [
        { title: "Why State Management?", duration: "10:25", free: false },
        { title: "Setting Up Zustand", duration: "18:40", free: false },
        { title: "Actions and Async Operations", duration: "24:15", free: false },
        { title: "Persistence and Middleware", duration: "20:30", free: false },
      ],
    },
    {
      title: "Testing React Applications",
      duration: "3h 10m",
      lectures: [
        { title: "Introduction to Testing", duration: "12:00", free: false },
        { title: "Unit Testing with Vitest", duration: "26:30", free: false },
        { title: "React Testing Library Basics", duration: "30:45", free: false },
        { title: "Testing Hooks and Context", duration: "28:20", free: false },
        { title: "Integration Testing", duration: "34:15", free: false },
        { title: "E2E Testing with Playwright", duration: "38:10", free: false },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Alex Rivera",
      initials: "AR",
      rating: 5,
      date: "March 2026",
      text: "This is hands down the best React course I've ever taken. Sarah explains complex concepts in a way that just clicks. The projects are real-world and relevant. I went from knowing nothing about React to building my own app in just a few weeks.",
    },
    {
      id: 2,
      name: "Jamie Thompson",
      initials: "JT",
      rating: 5,
      date: "February 2026",
      text: "Excellent course structure. Each section builds on the last, and the pacing is perfect. The testing section alone is worth the price. Highly recommended for anyone serious about learning React.",
    },
    {
      id: 3,
      name: "Priya Patel",
      initials: "PP",
      rating: 4,
      date: "January 2026",
      text: "Comprehensive and well-organized. The custom hooks and advanced patterns sections were particularly valuable. Would love to see a follow-up course on Next.js and server components.",
    },
  ],
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? "fill-yellow-500 text-yellow-500"
              : i < rating
                ? "fill-yellow-500/50 text-yellow-500"
                : "fill-none text-text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const course = courseData
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]))
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem, isInCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: course.id,
      title: course.title,
      price: course.price,
      thumbnail: course.image,
      teacher: course.teacher.name,
      type: "VIDEO",
    })
    toast("Added to cart", "success")
  }

  const handleBuyNow = () => {
    addItem({
      id: course.id,
      title: course.title,
      price: course.price,
      thumbnail: course.image,
      teacher: course.teacher.name,
      type: "VIDEO",
    })
    router.push("/checkout")
  }

  const inCart = isInCart(course.id)

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top bar */}
      <header className="border-b border-border">
        <div className="w-full flex items-center justify-between px-4 py-4">
          <button
            onClick={() => router.push("/browse")}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to browse
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-elevated text-text-secondary hover:text-red-500 hover:border-red-500/30 transition-colors"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-bg-primary" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">{course.category}</Badge>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-tight">
                  {course.title}
                </h1>

                <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-2xl">
                  {course.description}
                </p>

                {/* Stats row */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={course.rating} size="sm" />
                    <span className="font-medium text-text-primary">{course.rating}</span>
                    <span className="text-text-muted">({course.reviewCount.toLocaleString()})</span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-text-muted" />
                    {course.studentCount.toLocaleString()} students
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-text-muted" />
                    Updated {course.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Play className="h-4 w-4 text-text-muted" />
                    {course.duration}
                  </span>
                </div>

                {/* Instructor */}
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={course.teacher.avatar}
                    alt={course.teacher.name}
                    className="h-10 w-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Created by <span className="text-accent">{course.teacher.name}</span>
                    </p>
                    <p className="text-xs text-text-muted">{course.teacher.title}</p>
                  </div>
                </div>

                {/* Price and actions - mobile */}
                <div className="mt-8 flex lg:hidden flex-col gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-text-primary">
                      ${(course.price / 100).toFixed(2)}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-lg text-text-muted line-through">
                        ${(course.originalPrice / 100).toFixed(2)}
                      </span>
                    )}
                    <Badge variant="success" className="ml-1">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={inCart}>
                      <ShoppingCart className="h-4 w-4" />
                      {inCart ? "In cart" : "Add to cart"}
                    </Button>
                    <Button variant="secondary" size="lg" className="flex-1" onClick={handleBuyNow}>
                      Buy now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Thumbnail - desktop */}
              <div className="hidden lg:block w-80 shrink-0">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border/60 bg-bg-elevated shadow-2xl">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex h-14 w-14 items-center justify-center bg-white/90 rounded-xl">
                      <Play className="h-6 w-6 text-bg-primary ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="w-full px-4 pb-16">
          <div className="flex flex-col lg:flex-row lg:gap-10">
            {/* Left column - 70% */}
            <div className="flex-1 min-w-0 lg:max-w-[70%]">
              {/* Price and actions - desktop sticky bar */}
              <div className="hidden lg:flex items-center justify-between mb-8 p-4 bg-bg-secondary/80 backdrop-blur-sm border border-border/60 rounded-xl sticky top-4 z-10">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-text-primary">
                    ${(course.price / 100).toFixed(2)}
                  </span>
                  {course.originalPrice > course.price && (
                    <span className="text-base text-text-muted line-through">
                      ${(course.originalPrice / 100).toFixed(2)}
                    </span>
                  )}
                  <Badge variant="success">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="md" onClick={handleAddToCart} disabled={inCart}>
                    <ShoppingCart className="h-4 w-4" />
                    {inCart ? "In cart" : "Add to cart"}
                  </Button>
                  <Button variant="secondary" size="md" onClick={handleBuyNow}>
                    Buy now
                  </Button>
                </div>
              </div>

              {/* About this course */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-text-primary mb-4">About this course</h2>
                <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                  {course.longDescription.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* What you'll learn */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-text-primary mb-4">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learnPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-sm text-text-secondary">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course content accordion */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-text-primary">Course content</h2>
                  <div className="text-xs text-text-muted">
                    {course.totalSections} sections &middot; {course.totalLectures} lectures &middot;{" "}
                    {course.duration} total
                  </div>
                </div>
                <div className="border border-border/60 rounded-xl overflow-hidden divide-y divide-border/60">
                  {course.sections.map((section, idx) => {
                    const isOpen = expandedSections.has(idx)
                    return (
                      <div key={idx}>
                        <button
                          onClick={() => toggleSection(idx)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left bg-bg-secondary/50 hover:bg-bg-elevated/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Play className="h-4 w-4 shrink-0 text-text-muted" />
                            <span className="text-sm font-medium text-text-primary truncate">
                              {section.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <span className="text-xs text-text-muted whitespace-nowrap">
                              {section.lectures.length} lectures &middot; {section.duration}
                            </span>
                            <svg
                              className={`h-4 w-4 text-text-muted transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </button>
                        {isOpen && (
                          <div className="divide-y divide-border/40">
                            {section.lectures.map((lecture, li) => (
                              <div
                                key={li}
                                className="flex items-center justify-between px-5 py-3 pl-14 bg-bg-primary/30"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  {lecture.free ? (
                                    <Play className="h-3.5 w-3.5 shrink-0 text-green-500" />
                                  ) : (
                                    <div className="h-3.5 w-3.5 shrink-0 rounded-full border border-text-muted" />
                                  )}
                                  <span className="text-sm text-text-secondary truncate">
                                    {lecture.title}
                                  </span>
                                  {lecture.free && (
                                    <Badge variant="success" className="text-[10px] px-1.5 py-0">
                                      Free
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-text-muted shrink-0 whitespace-nowrap">
                                  {lecture.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Instructor</h2>
                <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={course.teacher.avatar}
                      alt={course.teacher.name}
                      className="h-16 w-16 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {course.teacher.name}
                      </h3>
                      <p className="text-sm text-text-muted">{course.teacher.title}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-secondary">
                        <span className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          {course.teacher.rating} instructor rating
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-text-muted" />
                          {course.teacher.students.toLocaleString()} students
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-text-muted" />
                          {course.teacher.courses} courses
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Shield className="h-4 w-4 text-text-muted" />
                          {course.teacher.reviews.toLocaleString()} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                    {course.teacher.bio}
                  </p>
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Reviews</h2>
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-medium text-text-secondary shrink-0">
                          {review.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-medium text-text-primary">{review.name}</h4>
                            <span className="text-xs text-text-muted shrink-0">{review.date}</span>
                          </div>
                          <div className="mt-1">
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - 30% sidebar */}
            <div className="lg:w-[30%] lg:min-w-[300px]">
              {/* Thumbnail - mobile */}
              <div className="lg:hidden mb-6">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border/60 bg-bg-elevated">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer">
                    <div className="flex h-14 w-14 items-center justify-center bg-white/90 rounded-xl">
                      <Play className="h-6 w-6 text-bg-primary ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* This course includes */}
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 mb-6">
                <h3 className="text-base font-semibold text-text-primary mb-4">
                  This course includes
                </h3>
                <ul className="space-y-3">
                  {course.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-text-muted shrink-0" />
                      <span className="text-sm text-text-secondary">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
                <h3 className="text-base font-semibold text-text-primary mb-4">Requirements</h3>
                <ul className="space-y-2.5">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-sm text-text-secondary">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
