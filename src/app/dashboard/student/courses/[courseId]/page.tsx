"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, PlayCircle, FileText, HelpCircle, ArrowLeft, Check, Maximize2, Minimize2, List, ChevronDown, ChevronRight, Clock, Star, BookOpen } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const courseData = {
  title: "React from Zero to Production",
  sections: [
    {
      title: "Introduction & Setup",
      duration: "45 min",
      lectures: [
        { id: "l1", title: "Welcome to the Course", type: "video", duration: "5:30", completed: true },
        { id: "l2", title: "Environment Setup", type: "video", duration: "12:15", completed: true },
        { id: "l3", title: "Course Resources & Files", type: "article", duration: "3:00", completed: true },
      ],
    },
    {
      title: "React Fundamentals",
      duration: "2h 15min",
      lectures: [
        { id: "l4", title: "JSX & Components", type: "video", duration: "18:45", completed: true },
        { id: "l5", title: "Props & State", type: "video", duration: "22:30", completed: true },
        { id: "l6", title: "Hooks Deep Dive", type: "video", duration: "35:00", completed: false },
        { id: "l7", title: "Conditional Rendering Quiz", type: "quiz", duration: "10:00", completed: false },
      ],
    },
    {
      title: "Advanced Patterns",
      duration: "3h 30min",
      lectures: [
        { id: "l8", title: "Custom Hooks", type: "video", duration: "28:20", completed: false },
        { id: "l9", title: "Context API", type: "video", duration: "25:10", completed: false },
        { id: "l10", title: "Performance Optimization", type: "article", duration: "15:00", completed: false },
      ],
    },
    {
      title: "Production Deployment",
      duration: "1h 45min",
      lectures: [
        { id: "l11", title: "Building for Production", type: "video", duration: "20:00", completed: false },
        { id: "l12", title: "Deployment Strategies", type: "video", duration: "18:30", completed: false },
      ],
    },
  ],
}

export default function CoursePlayerPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [activeLecture, setActiveLecture] = useState("l1")
  const [expandedSections, setExpandedSections] = useState<string[]>([courseData.sections[0].title])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const course = courseData

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    )
  }

  const active = course.sections
    .flatMap((s) => s.lectures)
    .find((l) => l.id === activeLecture)

  const totalLectures = course.sections.reduce((a, s) => a + s.lectures.length, 0)
  const completedLectures = course.sections.reduce((a, s) => a + s.lectures.filter((l) => l.completed).length, 0)

  const typeIcon = (type: string) => {
    switch (type) {
      case "video": return <PlayCircle className="h-4 w-4" />
      case "article": return <FileText className="h-4 w-4" />
      case "quiz": return <HelpCircle className="h-4 w-4" />
      default: return <PlayCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b border-border/40 bg-bg-secondary/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/student/courses" className="text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-sm font-medium text-text-primary truncate max-w-[300px]">{course.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-text-muted">{completedLectures}/{totalLectures} completed</div>
          <div className="w-24 h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(completedLectures / totalLectures) * 100}%` }} />
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text-secondary hover:text-text-primary transition-colors">
            {sidebarOpen ? <Minimize2 className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video player area */}
          <div className="bg-black flex-1 flex items-center justify-center relative min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="h-20 w-20 text-white/30 mx-auto mb-4" />
                <p className="text-white/50 text-sm">Video player placeholder</p>
                <p className="text-white/30 text-xs mt-1">{active?.title}</p>
              </div>
            </div>
          </div>

          {/* Lecture info bar */}
          <div className="border-t border-border/40 bg-bg-secondary/50 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-primary">{active?.title}</span>
              <span className="text-xs text-text-muted">{active?.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              {active?.completed && (
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Curriculum */}
        {sidebarOpen && (
          <div className="w-96 border-l border-border/40 bg-bg-secondary/30 overflow-y-auto shrink-0">
            <div className="p-4">
              {/* Progress summary */}
              <div className="mb-4 bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-text-primary">Course content</span>
                </div>
                <div className="text-xs text-text-muted">
                  {totalLectures} lectures &middot; {course.sections.reduce((a, s) => a + s.lectures.reduce((b, l) => b + parseInt(l.duration), 0), 0)} min
                </div>
              </div>

              {/* Sections */}
              {course.sections.map((section) => (
                <div key={section.title} className="mb-2">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-secondary/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {expandedSections.includes(section.title) ? (
                        <ChevronDown className="h-4 w-4 text-text-muted shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-text-muted shrink-0" />
                      )}
                      <span className="text-sm font-medium text-text-primary truncate">{section.title}</span>
                    </div>
                    <span className="text-xs text-text-muted shrink-0">{section.duration}</span>
                  </button>

                  {expandedSections.includes(section.title) && (
                    <div className="ml-2 space-y-0.5">
                      {section.lectures.map((lecture) => (
                        <button
                          key={lecture.id}
                          onClick={() => setActiveLecture(lecture.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                            activeLecture === lecture.id
                              ? "bg-accent/10 border border-accent/20"
                              : "hover:bg-bg-secondary/30"
                          }`}
                        >
                          <span className={lecture.completed ? "text-emerald-400" : "text-text-muted"}>
                            {lecture.completed ? <CheckCircle className="h-4 w-4" /> : typeIcon(lecture.type)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm truncate ${
                              activeLecture === lecture.id ? "text-accent font-medium" : "text-text-secondary"
                            }`}>
                              {lecture.title}
                            </p>
                            <span className="text-xs text-text-muted">{lecture.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
