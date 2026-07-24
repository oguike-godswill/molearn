"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Code2, Film, Globe, Layers, Play, Search, Star, Users, SlidersHorizontal, Grid3X3, List, ChevronDown, X, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useMemo, Suspense } from "react"
import { Navbar } from "@/components/landing/navbar"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/toast"

const categories = [
  { name: "All", count: 42, icon: null },
  { name: "Web Development", count: 14, icon: Globe },
  { name: "Mobile", count: 8, icon: Code2 },
  { name: "Data Science", count: 10, icon: Layers },
  { name: "Design", count: 6, icon: Film },
  { name: "DevOps", count: 4, icon: Users },
]

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
]

const products = [
  {
    id: "1", title: "React from Zero to Production", type: "VIDEO", price: 4999,
    teacher: "Sarah Chen", avatar: "SC", rating: 4.8, students: 2340,
    duration: "24h", level: "Intermediate", image: "https://picsum.photos/seed/react/400/225",
    desc: "Build and deploy production-ready React applications with hooks, state management, and testing.", created: "2026-06-15",
  },
  {
    id: "2", title: "Advanced TypeScript Patterns", type: "BOOK", price: 2999,
    teacher: "Marcus Johnson", avatar: "MJ", rating: 4.6, students: 1280,
    duration: "420p", level: "Advanced", image: "https://picsum.photos/seed/typescript/400/225",
    desc: "Master advanced TypeScript patterns including generics, conditional types, and mapped types.", created: "2026-05-20",
  },
  {
    id: "3", title: "Full-Stack Next.js Masterclass", type: "VIDEO", price: 6999,
    teacher: "Alex Rivera", avatar: "AR", rating: 4.9, students: 3120,
    duration: "32h", level: "All Levels", image: "https://picsum.photos/seed/nextjs/400/225",
    desc: "Learn full-stack development with Next.js, Prisma, Stripe, and deployment to Vercel.", created: "2026-07-01",
  },
  {
    id: "4", title: "Python for Data Science", type: "VIDEO", price: 3999,
    teacher: "Emily Watson", avatar: "EW", rating: 4.7, students: 1890,
    duration: "18h", level: "Beginner", image: "https://picsum.photos/seed/python/400/225",
    desc: "From Python basics to machine learning. Work with NumPy, Pandas, and TensorFlow.", created: "2026-04-10",
  },
  {
    id: "5", title: "Rust Programming Guide", type: "BOOK", price: 2499,
    teacher: "David Kim", avatar: "DK", rating: 4.5, students: 890,
    duration: "350p", level: "Intermediate", image: "https://picsum.photos/seed/rust/400/225",
    desc: "A comprehensive guide to systems programming with Rust. From ownership to async/await.", created: "2026-03-22",
  },
  {
    id: "6", title: "UI/UX Design Fundamentals", type: "VIDEO", price: 5499,
    teacher: "Lisa Park", avatar: "LP", rating: 4.8, students: 1560,
    duration: "20h", level: "Beginner", image: "https://picsum.photos/seed/design/400/225",
    desc: "Learn design thinking, wireframing, prototyping, and user research methodologies.", created: "2026-06-28",
  },
  {
    id: "7", title: "Node.js Microservices", type: "VIDEO", price: 5999,
    teacher: "James Wilson", avatar: "JW", rating: 4.7, students: 1100,
    duration: "22h", level: "Advanced", image: "https://picsum.photos/seed/nodejs/400/225",
    desc: "Design, build, and deploy microservices using Node.js, Docker, and Kubernetes.", created: "2026-05-05",
  },
  {
    id: "8", title: "CSS Architecture Guide", type: "BOOK", price: 1999,
    teacher: "Nina Patel", avatar: "NP", rating: 4.4, students: 750,
    duration: "280p", level: "All Levels", image: "https://picsum.photos/seed/css/400/225",
    desc: "Master CSS methodologies, design systems, and modern layout techniques.", created: "2026-02-14",
  },
  {
    id: "9", title: "Go Programming Bootcamp", type: "VIDEO", price: 4499,
    teacher: "Tom Bradley", avatar: "TB", rating: 4.6, students: 980,
    duration: "16h", level: "Intermediate", image: "https://picsum.photos/seed/golang/400/225",
    desc: "Build concurrent, performant applications with Go. Covers the standard library and tooling.", created: "2026-07-10",
  },
]

export default function BrowsePage() {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("popular")
  const [levelFilter, setLevelFilter] = useState("All Levels")
  const [typeFilter, setTypeFilter] = useState<"all" | "VIDEO" | "BOOK">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (activeCategory !== "All") {
      result = result.filter((p) => activeCategory === "Web Development" || activeCategory === "Mobile" || activeCategory === "Data Science" || activeCategory === "Design" || activeCategory === "DevOps")
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.teacher.toLowerCase().includes(q))
    }

    if (levelFilter !== "All Levels") {
      result = result.filter((p) => p.level === levelFilter)
    }

    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter)
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        break
      default:
        result.sort((a, b) => b.students - a.students)
    }

    return result
  }, [activeCategory, search, sort, levelFilter, typeFilter])

  const handleBuy = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.image,
      teacher: product.teacher,
      type: product.type,
    })
    toast("Added to cart", "success")
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="w-full px-4 py-10 pt-24">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Marketplace</h1>
          <p className="mt-1 text-sm text-text-secondary">Discover expert-crafted tutorials and books</p>
        </div>

        {/* Search + toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input placeholder="Search tutorials and books..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <button onClick={() => setShowSort(!showSort)} className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-border/60 bg-bg-secondary text-sm text-text-secondary hover:text-text-primary transition-colors">
                {sortOptions.find((o) => o.value === sort)?.label} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {showSort && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                  <div className="absolute right-0 top-12 z-20 w-48 bg-bg-secondary border border-border/60 rounded-xl shadow-xl overflow-hidden">
                    {sortOptions.map((opt) => (
                      <button key={opt.value} onClick={() => { setSort(opt.value); setShowSort(false) }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === opt.value ? "text-accent bg-accent/10" : "text-text-secondary hover:bg-bg-elevated"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Filters toggle */}
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 h-10 px-3 rounded-xl border text-sm transition-colors ${showFilters ? "border-accent/30 text-accent bg-accent/10" : "border-border/60 text-text-secondary hover:text-text-primary bg-bg-secondary"}`}>
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {showFilters && <X className="h-3 w-3" />}
            </button>

            {/* View toggle */}
            <div className="hidden sm:flex border border-border/60 rounded-xl overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-accent/10 text-accent" : "bg-bg-secondary text-text-secondary hover:text-text-primary"}`}>
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-accent/10 text-accent" : "bg-bg-secondary text-text-secondary hover:text-text-primary"}`}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-bg-secondary/30 border border-border/60 rounded-xl">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="text-xs font-medium text-text-secondary block mb-1.5">Type</label>
                <div className="flex gap-1.5">
                  {[{ label: "All", value: "all" as const }, { label: "Video", value: "VIDEO" as const }, { label: "Book", value: "BOOK" as const }].map((t) => (
                    <button key={t.value} onClick={() => setTypeFilter(t.value)} className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${typeFilter === t.value ? "bg-accent/10 border-accent/30 text-accent" : "border-border/60 text-text-secondary hover:border-border"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary block mb-1.5">Level</label>
                <div className="flex gap-1.5">
                  {levels.map((l) => (
                    <button key={l} onClick={() => setLevelFilter(l)} className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${levelFilter === l ? "bg-accent/10 border-accent/30 text-accent" : "border-border/60 text-text-secondary hover:border-border"}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-8 flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.name
                  ? "bg-accent text-white"
                  : "bg-bg-elevated text-text-secondary border border-border hover:border-border-hover"
              }`}
            >
              {cat.icon && <cat.icon className="h-3.5 w-3.5" />}
              {cat.name}
              <span className={`${activeCategory === cat.name ? "text-white/70" : "text-text-muted"}`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-text-muted mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>

        {/* Product grid/list */}
        {viewMode === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <div key={product.id} className="border border-border bg-bg-secondary flex flex-col group">
                <Link href={`/browse/${product.id}`}>
                  <div className="relative aspect-video bg-bg-elevated overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    {product.type === "VIDEO" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex h-12 w-12 items-center justify-center bg-white/90 rounded-xl">
                          <Play className="h-5 w-5 text-bg-primary ml-0.5" />
                        </div>
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3">{product.type === "VIDEO" ? "Video" : "Book"}</Badge>
                  </div>
                </Link>
                <Link href={`/browse/${product.id}`} className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors">{product.title}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary line-clamp-2 leading-relaxed">{product.desc}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{product.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{product.students.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />{product.rating}</span>
                  </div>
                  <div className="mt-4 border-t border-border" />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-[10px] font-medium text-text-secondary">{product.avatar}</div>
                      <span className="text-xs text-text-secondary">{product.teacher}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-text-primary">${(product.price / 100).toFixed(2)}</span>
                      <Button size="sm" onClick={() => handleBuy(product)}><ShoppingCart className="h-3.5 w-3.5" /> Buy</Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-3">
            {filtered.map((product) => (
              <div key={product.id} className="border border-border bg-bg-secondary flex group">
                <Link href={`/browse/${product.id}`} className="w-48 shrink-0">
                  <div className="relative aspect-video h-full bg-bg-elevated overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    {product.type === "VIDEO" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex h-10 w-10 items-center justify-center bg-white/90 rounded-lg">
                          <Play className="h-4 w-4 text-bg-primary ml-0.5" />
                        </div>
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 text-[10px]">{product.type === "VIDEO" ? "Video" : "Book"}</Badge>
                  </div>
                </Link>
                <Link href={`/browse/${product.id}`} className="p-4 flex-1 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{product.title}</h3>
                    <p className="mt-1 text-xs text-text-secondary line-clamp-1">{product.desc}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />{product.rating}</span>
                      <span>{product.students.toLocaleString()} students</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-bg-elevated border border-border/40">{product.level}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-text-primary">${(product.price / 100).toFixed(2)}</span>
                    <div className="mt-1"><Button size="sm" onClick={() => handleBuy(product)}><ShoppingCart className="h-3.5 w-3.5" /> Buy</Button></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-lg font-medium text-text-primary">No results found</p>
            <p className="text-sm text-text-muted mt-1">Try adjusting your search or filter criteria</p>
            <Button variant="secondary" className="mt-4" onClick={() => { setSearch(""); setLevelFilter("All Levels"); setTypeFilter("all") }}>Clear all filters</Button>
          </div>
        )}
      </main>
    </div>
  )
}
