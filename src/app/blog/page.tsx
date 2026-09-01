"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, User, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const categories = ["All", "Marketing", "Design", "Career", "Industry"] as const
type Category = (typeof categories)[number]

const categoryColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Marketing: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
    gradient: "from-violet-600 to-purple-700",
  },
  Design: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/20",
    gradient: "from-sky-500 to-cyan-600",
  },
  Career: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-600",
  },
  Industry: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    gradient: "from-amber-500 to-orange-600",
  },
}

const blogPosts = [
  {
    slug: "digital-marketing-trends-nigeria-2026",
    title: "5 Digital Marketing Trends in Nigeria for 2026",
    excerpt:
      "From AI-powered ad targeting to the rise of short-form video, discover the strategies reshaping how Nigerian brands reach their audiences.",
    category: "Marketing" as Category,
    author: "Chidinma Okafor",
    date: "Aug 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "build-design-portfolio-from-scratch",
    title: "How to Build a Design Portfolio from Scratch",
    excerpt:
      "A step-by-step guide for aspiring designers on curating projects, crafting case studies, and presenting your work to land your first client.",
    category: "Design" as Category,
    author: "Tunde Emeka",
    date: "Aug 22, 2026",
    readTime: "8 min read",
  },
  {
    slug: "student-to-freelancer-mojetech-success",
    title: "From Student to Freelancer: A MojeTech Success Story",
    excerpt:
      "How Ngozi went from zero experience to earning six figures monthly as a freelance digital marketer — all within eight months of graduating.",
    category: "Career" as Category,
    author: "Ngozi Igwe",
    date: "Aug 15, 2026",
    readTime: "5 min read",
  },
  {
    slug: "rise-of-remote-work-nigeria-tech",
    title: "The Rise of Remote Work in Nigeria's Tech Scene",
    excerpt:
      "Remote roles are booming across Lagos, Abuja, and beyond. We explore what's driving the shift and how to position yourself for global opportunities.",
    category: "Industry" as Category,
    author: "Adeola Martins",
    date: "Aug 10, 2026",
    readTime: "7 min read",
  },
  {
    slug: "social-media-strategy-small-businesses",
    title: "Social Media Strategy for Small Businesses",
    excerpt:
      "Practical tips for Nigerian SMEs to build an engaged community, choose the right platforms, and turn followers into paying customers.",
    category: "Marketing" as Category,
    author: "Funke Adebayo",
    date: "Aug 5, 2026",
    readTime: "6 min read",
  },
  {
    slug: "color-theory-basics-every-designer",
    title: "Color Theory Basics Every Designer Should Know",
    excerpt:
      "Understand hue, saturation, and contrast. Learn how to build harmonious palettes that communicate the right emotions in every project.",
    category: "Design" as Category,
    author: "Kemi Adeyemi",
    date: "Jul 29, 2026",
    readTime: "5 min read",
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Hero header */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 pt-28 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-5">
                MojeTech Blog
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Blog
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Insights on digital marketing, design, career growth, and the Nigerian tech ecosystem.
              </p>
            </motion.div>

            {/* Category filter pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-accent border-accent text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Blog post grid */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post, i) => {
              const colors = categoryColors[post.category]
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all overflow-hidden">
                      {/* Thumbnail placeholder */}
                      <div
                        className={`h-44 bg-gradient-to-br ${colors.gradient} relative flex items-center justify-center`}
                      >
                        <span className="text-white/30 text-5xl font-extrabold tracking-tighter select-none">
                          {post.category.charAt(0)}
                        </span>
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Author + date */}
                        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
                              <User className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                          <span>{post.date}</span>
                        </div>

                        {/* Read more */}
                        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-sm">No posts found in this category.</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

