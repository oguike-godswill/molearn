"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Edit3, Mail, MessageSquare, Play, Star, Trophy, Users } from "lucide-react"
import Link from "next/link"

const activityFeed = [
  { id: 1, icon: BookOpen, text: "Enrolled in \"React from Zero to Production\"", time: "2 hours ago", color: "text-blue-400" },
  { id: 2, icon: Play, text: "Completed Module 3 of \"TypeScript Pro\"", time: "Yesterday", color: "text-emerald-400" },
  { id: 3, icon: Star, text: "Left a 5-star review on \"Node.js Backend\"", time: "3 days ago", color: "text-yellow-400" },
  { id: 4, icon: MessageSquare, text: "Replied to a Q&A thread in \"Rust Guide\"", time: "1 week ago", color: "text-accent" },
  { id: 5, icon: Trophy, text: "Earned the \"Quick Learner\" badge", time: "2 weeks ago", color: "text-amber-400" },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border">
        <div className="w-full flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-text-primary" style={{ fontFamily: "var(--font-logo)" }}>
            <BookOpen className="h-5 w-5 text-accent" />
            molearn
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Join</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-10">
        {/* Profile header card */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-3xl font-bold text-accent shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-text-primary">John Doe</h1>
                <Badge className="bg-accent/10 text-accent border-accent/20">Student</Badge>
              </div>
              <p className="mt-1 text-sm text-text-secondary flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                john.doe@example.com
              </p>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xl">
                Full-stack developer passionate about learning new technologies. Currently focused on React, TypeScript, and backend architecture. Always looking for the next challenge.
              </p>
            </div>
            <Link href="/dashboard/settings">
              <Button variant="secondary" size="sm" className="gap-2 shrink-0">
                <Edit3 className="h-4 w-4" />
                Edit profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Courses enrolled", value: "12", icon: BookOpen, color: "text-blue-400" },
            { label: "Courses completed", value: "7", icon: Trophy, color: "text-emerald-400" },
            { label: "Reviews written", value: "4", icon: Star, color: "text-yellow-400" },
            { label: "Hours watched", value: "86", icon: Clock, color: "text-accent" },
          ].map((stat) => (
            <div key={stat.label} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-text-muted" />
            Recent activity
          </h2>
          <div className="space-y-1">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-bg-elevated/50 transition-colors">
                <div className={`h-8 w-8 rounded-full bg-bg-elevated border border-border/40 flex items-center justify-center shrink-0`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">{item.text}</p>
                </div>
                <span className="text-xs text-text-muted shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
