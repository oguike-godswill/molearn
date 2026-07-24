"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Camera, DollarSign, Lightbulb, Share2, Video } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    icon: BookOpen,
    title: "Course structure guidelines",
    tips: [
      "Organize content into clear modules with 4-8 lessons each",
      "Start with an introduction video explaining what students will learn",
      "Include practical exercises and projects in every module",
      "Keep video lessons between 5-20 minutes for optimal engagement",
      "Add downloadable resources, code samples, and cheat sheets",
    ],
  },
  {
    icon: Video,
    title: "Video quality tips",
    tips: [
      "Record at 1080p minimum with clear, well-lit visuals",
      "Use a good quality microphone — audio matters more than video",
      "Add captions or subtitles for accessibility",
      "Include on-screen annotations and code highlights",
      "Edit out long pauses and mistakes for a polished result",
    ],
  },
  {
    icon: DollarSign,
    title: "Pricing recommendations",
    tips: [
      "Video courses typically sell for $29-$79 depending on depth",
      "E-books work well at $14-$39 based on length and topic",
      "Start with a competitive launch price to build reviews",
      "Offer occasional discounts to attract new students",
      "Bundle related courses together for higher average order value",
    ],
  },
  {
    icon: Share2,
    title: "Marketing tips",
    tips: [
      "Write a compelling course description with clear outcomes",
      "Create a 1-2 minute preview video showcasing your teaching style",
      "Share your course on social media and developer communities",
      "Encourage students to leave honest reviews and ratings",
      "Keep your content updated — fresh courses rank higher in search",
    ],
  },
]

export default function CreatorGuidePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border">
        <div className="w-full flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-text-primary" style={{ fontFamily: "var(--font-logo)" }}>
            <BookOpen className="h-5 w-5 text-accent" />
            molearn
          </Link>
          <Link href="/teach" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Teach
          </Link>
        </div>
      </header>

      <main className="w-full px-4 py-10">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-text-primary">Creator Guide</h1>
          <p className="mt-2 text-sm text-text-secondary">Everything you need to know to create high-quality, successful courses on Molearn.</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-base font-semibold text-text-primary">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Lightbulb className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
