"use client"

import { cn } from "@/lib/utils"
import { Code2, Film, Globe, Layers, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Web Development", slug: "web-dev", icon: Globe, count: 14, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20 hover:border-blue-500/40" },
  { name: "Mobile", slug: "mobile", icon: Code2, count: 8, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20 hover:border-emerald-500/40" },
  { name: "Data Science", slug: "data-science", icon: Layers, count: 10, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20 hover:border-purple-500/40" },
  { name: "Design", slug: "design", icon: Film, count: 6, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20 hover:border-amber-500/40" },
  { name: "DevOps", slug: "devops", icon: Users, count: 4, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20 hover:border-rose-500/40" },
  { name: "All Categories", slug: "", icon: TrendingUp, count: 42, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20 hover:border-accent/40" },
]

export function CategoryExplorer() {
  return (
    <section className="w-full px-4 py-20 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">Explore Categories</h2>
        <p className="mt-2 text-sm text-text-secondary">Find the perfect topic for your learning journey</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.slug ? `/browse?category=${cat.slug}` : "/browse"}
            className={cn(
              "group relative overflow-hidden rounded-xl border p-5 transition-all duration-300",
              "bg-bg-secondary/50 backdrop-blur-sm",
              cat.border
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", cat.bg)}>
                <cat.icon className={cn("h-6 w-6", cat.color)} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-0.5 text-xs text-text-muted">{cat.count} courses available</p>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", cat.bg)}>
                <cat.icon className={cn("h-3.5 w-3.5", cat.color)} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
