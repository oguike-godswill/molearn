"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Plus, Trash2, GripVertical, Upload, Image, Video, FileText, Save, Eye, X, ChevronDown, Check,
} from "lucide-react"

interface Lecture {
  id: string
  title: string
  type: "Video" | "Article" | "Quiz"
  duration: string
}

interface Section {
  id: string
  title: string
  lectures: Lecture[]
}

interface LearningItem {
  id: string
  text: string
}

interface RequirementItem {
  id: string
  text: string
}

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "it-software", label: "IT & Software" },
  { value: "personal-development", label: "Personal Development" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
]

const levels = ["Beginner", "Intermediate", "Advanced"] as const

let nextId = 1
function genId() {
  return String(nextId++)
}

export default function CreateCoursePage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState<string>("Beginner")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [isFree, setIsFree] = useState(false)
  const [discountedPrice, setDiscountedPrice] = useState("")
  const [accessType, setAccessType] = useState<"Lifetime" | "Monthly">("Lifetime")

  const [learningItems, setLearningItems] = useState<LearningItem[]>([
    { id: genId(), text: "" },
  ])
  const [requirements, setRequirements] = useState<RequirementItem[]>([
    { id: genId(), text: "" },
  ])

  const [sections, setSections] = useState<Section[]>([
    {
      id: genId(),
      title: "Introduction",
      lectures: [
        { id: genId(), title: "Welcome to the Course", type: "Video", duration: "5:30" },
      ],
    },
  ])

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([sections[0]?.id]))

  function addLearningItem() {
    setLearningItems((prev) => [...prev, { id: genId(), text: "" }])
  }

  function removeLearningItem(id: string) {
    setLearningItems((prev) => prev.filter((item) => item.id !== id))
  }

  function updateLearningItem(id: string, text: string) {
    setLearningItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    )
  }

  function addRequirement() {
    setRequirements((prev) => [...prev, { id: genId(), text: "" }])
  }

  function removeRequirement(id: string) {
    setRequirements((prev) => prev.filter((item) => item.id !== id))
  }

  function updateRequirement(id: string, text: string) {
    setRequirements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    )
  }

  function addSection() {
    const newSection: Section = {
      id: genId(),
      title: "",
      lectures: [],
    }
    setSections((prev) => [...prev, newSection])
    setExpandedSections((prev) => new Set(prev).add(newSection.id))
  }

  function removeSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id))
    setExpandedSections((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function updateSectionTitle(id: string, title: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title } : s))
    )
  }

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function addLecture(sectionId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, lectures: [...s.lectures, { id: genId(), title: "", type: "Video" as const, duration: "" }] }
          : s
      )
    )
  }

  function removeLecture(sectionId: string, lectureId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, lectures: s.lectures.filter((l) => l.id !== lectureId) }
          : s
      )
    )
  }

  function updateLecture(sectionId: string, lectureId: string, data: Partial<Lecture>) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.map((l) =>
                l.id === lectureId ? { ...l, ...data } : l
              ),
            }
          : s
      )
    )
  }

  function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setThumbnailPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  function handleSaveDraft() {
    alert("Course saved as draft!")
  }

  function handleSubmitReview() {
    alert("Course submitted for review!")
  }

  const lectureTypeIcons: Record<string, React.ReactNode> = {
    Video: <Video className="h-3.5 w-3.5" />,
    Article: <FileText className="h-3.5 w-3.5" />,
    Quiz: <FileText className="h-3.5 w-3.5" />,
  }

  return (
    <DashboardLayout role="TEACHER">
      <DashboardHeader
        title="Create New Course"
        description="Fill in the details below to publish your course"
      />

      <div className="space-y-6 w-full">
        {/* Section 1: Basic Information */}
        <section className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                placeholder="e.g. React from Zero to Production"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="course-subtitle">Course Subtitle</Label>
              <Input
                id="course-subtitle"
                placeholder="A short tagline for your course"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Category"
                options={categories}
                value={category}
                onChange={setCategory}
                placeholder="Select a category"
              />

              <div>
                <Label>Level</Label>
                <div className="flex gap-2 mt-1.5">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={cn(
                        "flex-1 h-10 px-3 text-sm rounded-lg border transition-all duration-150",
                        level === lvl
                          ? "bg-accent text-white border-accent"
                          : "bg-bg-elevated text-text-secondary border-border hover:border-border-hover"
                      )}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Course Description */}
        <section className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Course Description</h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your course is about..."
                className="min-h-[200px] mt-1.5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label>What you&apos;ll learn</Label>
              <p className="text-xs text-text-muted mt-0.5 mb-3">
                List the key takeaways students will gain from this course.
              </p>
              <div className="space-y-2">
                {learningItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                      {idx + 1}
                    </span>
                    <Input
                      placeholder="e.g. Build full-stack applications with React"
                      value={item.text}
                      onChange={(e) => updateLearningItem(item.id, e.target.value)}
                    />
                    {learningItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLearningItem(item.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={addLearningItem}
              >
                <Plus className="h-4 w-4" />
                Add item
              </Button>
            </div>

            <div>
              <Label>Requirements</Label>
              <p className="text-xs text-text-muted mt-0.5 mb-3">
                What students should know before taking this course.
              </p>
              <div className="space-y-2">
                {requirements.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border text-[10px] text-text-muted">
                      !
                    </span>
                    <Input
                      placeholder="e.g. Basic knowledge of JavaScript"
                      value={item.text}
                      onChange={(e) => updateRequirement(item.id, e.target.value)}
                    />
                    {requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(item.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={addRequirement}
              >
                <Plus className="h-4 w-4" />
                Add requirement
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Course Thumbnail */}
        <section className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Course Thumbnail</h2>

          <label
            htmlFor="thumbnail-upload"
            className={cn(
              "relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all",
              "hover:border-accent/60 hover:bg-accent/5",
              thumbnailPreview ? "border-accent/40" : "border-border"
            )}
          >
            {thumbnailPreview ? (
              <>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="max-h-48 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setThumbnailPreview(null)
                  }}
                  className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated/80 border border-border text-text-muted hover:text-text-primary transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-4">
                  <Upload className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm font-medium text-text-primary">Click to upload or drag and drop</p>
                <p className="text-xs text-text-muted mt-1">PNG, JPG, or WebP &mdash; 1280x720 recommended</p>
              </>
            )}
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleThumbnailUpload}
            />
          </label>
        </section>

        {/* Section 4: Course Content (Curriculum) */}
        <section className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Course Content (Curriculum)</h2>

          <div className="space-y-3">
            {sections.map((section) => {
              const isExpanded = expandedSections.has(section.id)
              return (
                <div
                  key={section.id}
                  className="border border-border/60 rounded-lg overflow-hidden"
                >
                  {/* Section header */}
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors",
                      "hover:bg-bg-elevated/50"
                    )}
                    onClick={() => toggleSection(section.id)}
                  >
                    <GripVertical className="h-4 w-4 shrink-0 text-text-muted cursor-grab" />
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-text-muted transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                    <input
                      type="text"
                      placeholder="Section title"
                      value={section.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      className="flex-1 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-muted border-none outline-none focus:outline-none"
                    />
                    <Badge variant="secondary">
                      {section.lectures.length} lecture{section.lectures.length !== 1 ? "s" : ""}
                    </Badge>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSection(section.id)
                      }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Lectures */}
                  {isExpanded && (
                    <div className="border-t border-border/40 divide-y divide-border/20">
                      {section.lectures.length === 0 && (
                        <p className="px-4 py-6 text-xs text-text-muted text-center">
                          No lectures yet. Add one below.
                        </p>
                      )}
                      {section.lectures.map((lecture) => (
                        <div
                          key={lecture.id}
                          className="flex items-center gap-3 px-4 py-2.5 pl-12"
                        >
                          <GripVertical className="h-3.5 w-3.5 shrink-0 text-text-muted cursor-grab" />
                          <div className="flex items-center gap-2 shrink-0">
                            {lectureTypeIcons[lecture.type]}
                            <select
                              value={lecture.type}
                              onChange={(e) =>
                                updateLecture(section.id, lecture.id, {
                                  type: e.target.value as Lecture["type"],
                                })
                              }
                              className="bg-bg-elevated border border-border text-xs text-text-secondary rounded px-1.5 py-1 outline-none focus:border-accent"
                            >
                              <option value="Video">Video</option>
                              <option value="Article">Article</option>
                              <option value="Quiz">Quiz</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            placeholder="Lecture title"
                            value={lecture.title}
                            onChange={(e) =>
                              updateLecture(section.id, lecture.id, {
                                title: e.target.value,
                              })
                            }
                            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted border-none outline-none focus:outline-none min-w-0"
                          />
                          <Input
                            placeholder="0:00"
                            value={lecture.duration}
                            onChange={(e) =>
                              updateLecture(section.id, lecture.id, {
                                duration: e.target.value,
                              })
                            }
                            className="w-20 h-8 text-xs text-center px-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeLecture(section.id, lecture.id)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      <div className="px-4 py-2 pl-12">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addLecture(section.id)}
                        >
                          <Plus className="h-4 w-4" />
                          Add Lecture
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <Button
            type="button"
            variant="secondary"
            className="mt-4 w-full"
            onClick={addSection}
          >
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </section>

        {/* Section 5: Pricing & Access */}
        <section className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Pricing &amp; Access</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label>Free Course</Label>
                <p className="text-xs text-text-muted">Offer this course at no cost</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isFree}
                onClick={() => setIsFree(!isFree)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors duration-200",
                  isFree ? "bg-accent" : "bg-bg-elevated border border-border"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
                    isFree && "translate-x-5"
                  )}
                />
              </button>
            </div>

            {!isFree && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="discount-price">Discounted Price (optional)</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                    <Input
                      id="discount-price"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      className="pl-7"
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label>Access Type</Label>
              <div className="flex gap-2 mt-1.5">
                {(["Lifetime", "Monthly"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccessType(type)}
                    className={cn(
                      "flex items-center gap-2 flex-1 h-11 px-4 text-sm rounded-lg border transition-all duration-150",
                      accessType === type
                        ? "bg-accent text-white border-accent"
                        : "bg-bg-elevated text-text-secondary border-border hover:border-border-hover"
                    )}
                  >
                    {accessType === type && <Check className="h-4 w-4" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Publish */}
        <section className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2">Publish</h2>
          <p className="text-xs text-text-muted mb-5">
            Save your progress or submit your course for review.
          </p>

          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={handleSaveDraft}>
              <Save className="h-4 w-4" />
              Save as Draft
            </Button>
            <Button variant="primary" onClick={handleSubmitReview}>
              <Eye className="h-4 w-4" />
              Submit for Review
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
