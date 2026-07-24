"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  BarChart3,
  Bell,
  Bookmark,
  BookOpen,
  ShoppingCart,
  ChevronDown,
  Code2,
  Compass,
  Film,
  Globe,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  PlayCircle,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const categories = [
  { label: "Web Development", href: "/browse?category=web-dev", icon: Globe },
  { label: "Mobile", href: "/browse?category=mobile", icon: Code2 },
  { label: "Data Science", href: "/browse?category=data-science", icon: Layers },
  { label: "Design", href: "/browse?category=design", icon: Film },
  { label: "DevOps", href: "/browse?category=devops", icon: Users },
]

function isActive(href: string, pathname: string, searchParams: URLSearchParams): boolean {
  const [basePath, queryString] = href.split("?")
  if (!queryString) {
    if (basePath.includes("#")) return false
    return pathname === basePath
  }
  if (pathname !== basePath) return false
  const params = new URLSearchParams(queryString)
  return Array.from(params.entries()).every(([key, value]) => searchParams.get(key) === value)
}

const dropdownVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

function DropdownItem({
  href, icon: Icon, label, description, onClick,
}: {
  href: string
  icon?: React.ComponentType<{ className?: string }>
  label: string
  description?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-bg-elevated"
    >
      {Icon && (
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-secondary group-hover:border-accent/30 group-hover:text-accent transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div>
        <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
          {label}
        </div>
        {description && <div className="mt-0.5 text-xs text-text-muted leading-relaxed">{description}</div>}
      </div>
    </Link>
  )
}

function BrowseMegaMenu({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[600px] origin-top"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary/95 backdrop-blur-2xl shadow-2xl shadow-black/10">
        <div className="grid grid-cols-5 gap-px bg-border/50">
          <div className="col-span-2 space-y-0.5 p-4">
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Content Type</div>
            <DropdownItem href="/browse" icon={Compass} label="All Content" description="Browse everything" onClick={onItemClick} />
            <DropdownItem href="/browse?type=VIDEO" icon={PlayCircle} label="Videos" description="Expert-led video tutorials" onClick={onItemClick} />
            <DropdownItem href="/browse?type=BOOK" icon={BookOpen} label="Books" description="In-depth written guides" onClick={onItemClick} />
          </div>
          <div className="col-span-3 space-y-0.5 border-l border-border/50 p-4">
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Categories</div>
            {categories.map((cat) => (
              <DropdownItem key={cat.label} href={cat.href} icon={cat.icon} label={cat.label} onClick={onItemClick} />
            ))}
          </div>
        </div>
        <div className="border-t border-border/50 bg-bg-secondary/50 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>42 tutorials & books available</span>
            <Link href="/browse" onClick={onItemClick} className="font-medium text-accent hover:text-accent/80 transition-colors">View all →</Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TeachDropdown({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 origin-top"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary/95 backdrop-blur-2xl shadow-2xl shadow-black/10 p-2 space-y-0.5">
        <DropdownItem href="/teach" icon={GraduationCap} label="Start Teaching" description="Create and publish your course" onClick={onItemClick} />
        <DropdownItem href="/teach/guide" icon={Sparkles} label="Creator Guide" description="Best practices & resources" onClick={onItemClick} />
        <DropdownItem href="/teach/earnings" icon={BarChart3} label="Earnings" description="Revenue & payout dashboard" onClick={onItemClick} />
      </div>
    </motion.div>
  )
}

function ResourcesDropdown({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 origin-top"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary/95 backdrop-blur-2xl shadow-2xl shadow-black/10 p-2 space-y-0.5">
        <DropdownItem href="/#how-it-works" label="How it Works" description="Learn about the platform" onClick={onItemClick} />
        <DropdownItem href="/#pricing" label="Pricing" description="Plans & payment details" onClick={onItemClick} />
        <DropdownItem href="/faq" label="FAQ" description="Common questions answered" onClick={onItemClick} />
      </div>
    </motion.div>
  )
}

function NotificationDropdown({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 top-full mt-2 w-80 origin-top-right"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary/95 backdrop-blur-2xl shadow-2xl shadow-black/10">
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <span className="text-sm font-medium text-text-primary">Notifications</span>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors">Mark all read</button>
        </div>
        <div className="p-2 space-y-1">
          {[
            { title: "New course published", desc: "Your React course is now live", time: "2m ago" },
            { title: "New student enrolled", desc: "Sarah joined Advanced TypeScript", time: "1h ago" },
            { title: "Payment received", desc: "$49.99 payout processed", time: "3h ago" },
          ].map((n) => (
            <button key={n.title} onClick={onItemClick} className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-bg-elevated">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-text-primary truncate">{n.title}</div>
                <div className="text-xs text-text-muted truncate">{n.desc}</div>
              </div>
              <span className="shrink-0 text-[11px] text-text-muted">{n.time}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-border/50 px-4 py-2.5">
          <button onClick={onItemClick} className="w-full text-center text-xs text-text-muted hover:text-text-primary transition-colors">View all notifications</button>
        </div>
      </div>
    </motion.div>
  )
}

function AvatarDropdown({ onItemClick }: { onItemClick?: () => void }) {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 top-full mt-2 w-64 origin-top-right"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary/95 backdrop-blur-2xl shadow-2xl shadow-black/10">
        <div className="border-b border-border/50 px-4 py-3">
          <div className="text-sm font-medium text-text-primary truncate">{user?.name || "User"}</div>
          <div className="text-xs text-text-muted truncate">{user?.email || ""}</div>
        </div>
        <div className="p-2 space-y-0.5">
          <DropdownItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={onItemClick} />
          <DropdownItem href="/dashboard/profile" icon={User} label="Profile" onClick={onItemClick} />
          <DropdownItem href="/dashboard/settings" icon={Settings} label="Settings" onClick={onItemClick} />
        </div>
        <div className="border-t border-border/50 p-2">
          <button
            onClick={() => { onItemClick?.(); signOut() }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function EnhancedSearchOverlay({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const listRef = useRef<HTMLDivElement>(null)

  const quickLinks = [
    { label: "All Content", href: "/browse", icon: Compass },
    { label: "Videos", href: "/browse?type=VIDEO", icon: PlayCircle },
    { label: "Books", href: "/browse?type=BOOK", icon: BookOpen },
    ...categories.slice(0, 4).map((c) => ({ label: c.label, href: c.href, icon: c.icon })),
  ]

  const actions = [
    { label: "Go to Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Start Teaching", href: "/teach", icon: GraduationCap },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const filtered = query
    ? [...quickLinks, ...actions].filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const displayItems = query ? filtered : recentSearches.length > 0
    ? recentSearches.map((s) => ({ label: s, href: `/browse?q=${encodeURIComponent(s)}`, icon: Search }))
    : quickLinks

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, displayItems.length - 1)) }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)) }
      if (e.key === "Enter" && activeIndex >= 0 && displayItems[activeIndex]) {
        const item = displayItems[activeIndex]
        if ("href" in item) {
          if (query) setRecentSearches((prev) => [query, ...prev.filter((s) => s !== query)].slice(0, 5))
          window.location.href = item.href
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, activeIndex, displayItems, query])

  const handleSelect = () => {
    if (query) setRecentSearches((prev) => [query, ...prev.filter((s) => s !== query)].slice(0, 5))
    onClose()
  }

  const sectionLabel = query ? "Search Results" : recentSearches.length > 0 ? "Recent Searches" : "Quick Links"

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[15vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3 border-b border-border/50 px-4">
            <Search className="h-4 w-4 shrink-0 text-text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1) }}
              placeholder="Search tutorials, books, categories..."
              className="flex-1 bg-transparent py-4 text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded-md border border-border bg-bg-elevated px-1.5 text-[11px] text-text-muted">
              <span className="text-[10px]">⌘</span>K
            </kbd>
            <button onClick={onClose} className="p-1 text-text-muted hover:text-text-primary transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div ref={listRef} className="p-2 max-h-80 overflow-y-auto">
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              {sectionLabel}
            </div>
            {displayItems.map((item, i) => (
              <Link
                key={item.label + i}
                href={"href" in item ? item.href : "#"}
                onClick={handleSelect}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  i === activeIndex
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                )}
              >
                {"icon" in item && item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                {item.label}
              </Link>
            ))}
            {displayItems.length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-text-muted">No results found</div>
            )}
          </div>
          <div className="border-t border-border/50 px-4 py-2.5 flex items-center gap-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-bg-elevated px-1 py-0.5">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-bg-elevated px-1 py-0.5">↵</kbd> Open</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-bg-elevated px-1 py-0.5">Esc</kbd> Close</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ItemCountBadge() {
  const { itemCount } = useCart()
  if (itemCount === 0) return null
  return (
    <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 items-center justify-center text-[10px] rounded-full">
      {itemCount}
    </Badge>
  )
}

function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("molearn-announcement-dismissed") === "true" : false
  )

  if (dismissed) return null

  return (
    <div className="bg-accent">
      <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white">
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        <span>Summer Sale — <strong>30% off</strong> all courses. Use code <code className="rounded bg-white/20 px-1.5 py-0.5 font-mono">SUMMER30</code></span>
        <button
          onClick={() => { localStorage.setItem("molearn-announcement-dismissed", "true"); setDismissed(true) }}
          className="ml-2 p-0.5 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[55] h-[2px] bg-accent origin-left"
      style={{ width: `${progress}%` }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
    />
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-lg transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.span key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function MobileDrawer({
  open, onClose, pathname, searchParams,
}: {
  open: boolean
  onClose: () => void
  pathname: string
  searchParams: URLSearchParams
}) {
  const { data: session } = useSession()
  const user = session?.user
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U"

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm border-l border-border bg-bg-primary shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5 text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-logo)" }}>
                <BookOpen className="h-6 w-6 text-accent" />
                molearn
              </Link>
              <button onClick={onClose} className="p-1 text-text-secondary hover:text-text-primary transition-colors" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User section when logged in */}
            {session && (
              <div className="border-b border-border px-4 py-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {user?.image ? (
                    <img src={user.image} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-text-primary truncate">{user?.name || "User"}</div>
                  <div className="text-xs text-text-muted truncate">{user?.email || ""}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto">
              <div className="flex-1 p-4 space-y-1">
                <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Explore</div>
                {[
                  { label: "Browse All", href: "/browse", icon: Compass },
                  { label: "Videos", href: "/browse?type=VIDEO", icon: PlayCircle },
                  { label: "Books", href: "/browse?type=BOOK", icon: BookOpen },
                ].map((item) => (
                  <Link key={item.label} href={item.href} onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive(item.href, pathname, searchParams) ? "bg-accent/10 text-accent font-medium" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />{item.label}
                  </Link>
                ))}

                <div className="my-4 border-t border-border" />
                <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Categories</div>
                {categories.map((cat) => (
                  <Link key={cat.label} href={cat.href} onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                  >
                    <cat.icon className="h-4 w-4" />{cat.label}
                  </Link>
                ))}

                <div className="my-4 border-t border-border" />
                <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">More</div>
                {[
                  { label: "Teach on Molearn", href: "/teach", icon: GraduationCap },
                  { label: "How it Works", href: "/#how-it-works", icon: Sparkles },
                  { label: "Pricing", href: "/#pricing", icon: BarChart3 },
                  { label: "FAQ", href: "/faq", icon: Layers },
                ].map((item) => (
                  <Link key={item.label} href={item.href} onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                  >
                    <item.icon className="h-4 w-4" />{item.label}
                  </Link>
                ))}

                {session && (
                  <>
                    <div className="my-4 border-t border-border" />
                    <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Account</div>
                    {[
                      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                      { label: "Profile", href: "/dashboard/profile", icon: User },
                      { label: "Settings", href: "/dashboard/settings", icon: Settings },
                    ].map((item) => (
                      <Link key={item.label} href={item.href} onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4" />{item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => { onClose(); signOut() }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                    >
                      <LogOut className="h-4 w-4" />Sign out
                    </button>
                  </>
                )}
              </div>

              <div className="border-t border-border p-4 space-y-2">
                {session ? (
                  <Button onClick={() => { onClose(); signOut() }} variant="secondary" size="sm" className="w-full justify-start gap-2">
                    <LogOut className="h-4 w-4" />Sign out
                  </Button>
                ) : (
                  <>
                    <Link href="/login" onClick={onClose}>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <LogIn className="h-4 w-4" />Sign in
                      </Button>
                    </Link>
                    <Link href="/register" onClick={onClose}>
                      <Button className="w-full justify-start gap-2">
                        <UserPlus className="h-4 w-4" />Get started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const notifTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const avatarTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const openDropdown = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(name)
  }

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          scrolled ? "bg-bg-primary/80 backdrop-blur-lg border-b border-border shadow-xs" : "bg-transparent"
        )}
      >
        <AnnouncementBar />
        <div className="grid grid-cols-3 items-center px-4 py-3">
          {/* Left: Logo + Theme */}
          <div className="justify-self-start flex items-center gap-3">
            <Link
              href="/"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              className="flex items-center gap-2.5 text-xl font-black tracking-tight hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              <motion.div
                animate={logoHovered ? { rotate: [0, -10, 10, -5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <BookOpen className="h-6 w-6 text-accent" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                molearn
              </motion.span>
            </Link>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Center: Navigation + Search */}
          <nav className="hidden md:flex items-center justify-center gap-0.5">
            <div className="relative" onMouseEnter={() => openDropdown("browse")} onMouseLeave={closeDropdown}>
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors",
                  (isActive("/browse", pathname, searchParams) || isActive("/browse?type=VIDEO", pathname, searchParams) || isActive("/browse?type=BOOK", pathname, searchParams))
                    ? "text-text-primary bg-bg-elevated" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50"
                )}
              >
                Browse
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === "browse" && "rotate-180")} />
              </button>
              <AnimatePresence>{activeDropdown === "browse" && <BrowseMegaMenu />}</AnimatePresence>
            </div>
            <div className="relative" onMouseEnter={() => openDropdown("teach")} onMouseLeave={closeDropdown}>
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive("/teach", pathname, searchParams) ? "text-text-primary bg-bg-elevated" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50"
                )}
              >
                Teach
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === "teach" && "rotate-180")} />
              </button>
              <AnimatePresence>{activeDropdown === "teach" && <TeachDropdown />}</AnimatePresence>
            </div>
            <div className="relative" onMouseEnter={() => openDropdown("resources")} onMouseLeave={closeDropdown}>
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors",
                  activeDropdown === "resources" ? "text-text-primary bg-bg-elevated" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50"
                )}
              >
                Resources
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === "resources" && "rotate-180")} />
              </button>
              <AnimatePresence>{activeDropdown === "resources" && <ResourcesDropdown />}</AnimatePresence>
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="justify-self-end flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline text-text-muted">Search</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-bg-elevated px-1.5 text-[10px] text-text-muted whitespace-nowrap"><span className="text-[10px]">⌘</span>K</kbd>
            </button>

            {/* Divider */}
            <div className="hidden md:block mx-1 h-5 w-px bg-border" />

            {/* Cart */}
            <Link
              href="/checkout"
              className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-lg transition-colors hidden md:block"
              aria-label="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              <ItemCountBadge />
            </Link>

            {/* Bookmark — only when logged in */}
            {session && (
              <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-lg transition-colors hidden md:block" aria-label="Saved items">
                <Bookmark className="h-4 w-4" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 items-center justify-center text-[10px] rounded-full">2</Badge>
              </button>
            )}

            {/* Notifications — only when logged in */}
            {session && (
              <div
                className="relative hidden md:block"
                onMouseEnter={() => { if (notifTimeout.current) clearTimeout(notifTimeout.current); setNotifOpen(true) }}
                onMouseLeave={() => { notifTimeout.current = setTimeout(() => setNotifOpen(false), 200) }}
              >
                <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-lg transition-colors" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 items-center justify-center text-[10px] rounded-full">3</Badge>
                </button>
                <AnimatePresence>{notifOpen && <NotificationDropdown />}</AnimatePresence>
              </div>
            )}

            {/* Auth */}
            <div className="hidden md:flex items-center gap-1.5 ml-1">
              {session ? (
                <div
                  className="relative"
                  onMouseEnter={() => { if (avatarTimeout.current) clearTimeout(avatarTimeout.current); setAvatarOpen(true) }}
                  onMouseLeave={() => { avatarTimeout.current = setTimeout(() => setAvatarOpen(false), 200) }}
                >
                  <button className="flex items-center gap-2 rounded-lg p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 transition-colors">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-[11px] font-bold text-accent">
                      {session.user?.image ? (
                        <img src={session.user.image} alt="" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        session.user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U"
                      )}
                    </div>
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", avatarOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>{avatarOpen && <AvatarDropdown />}</AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-sm whitespace-nowrap">Sign in</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="shadow-sm px-5 whitespace-nowrap">Get started</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        searchParams={searchParams}
      />

      <AnimatePresence>
        {searchOpen && <EnhancedSearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
