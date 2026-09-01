"use client"

import { BookOpen, LayoutDashboard, BookMarked, BarChart3, Users, ShieldCheck, Settings, LogOut, ChevronLeft, ChevronRight, GraduationCap, DollarSign, Star, Search, Bell, TrendingUp, FileText, CheckCircle, Clock, XCircle, X, CalendarDays } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const roleLinks = {
  STUDENT: [
    { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
    { label: "My Courses", href: "/dashboard/student/courses", icon: BookMarked },
    { label: "Browse", href: "/browse", icon: Search },
  ],
  TEACHER: [
    { label: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
    { label: "My Content", href: "/dashboard/teacher/content", icon: BookMarked },
    { label: "Earnings", href: "/dashboard/teacher/earnings", icon: DollarSign },
    { label: "Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3 },
  ],
  AGENT: [
    { label: "Dashboard", href: "/dashboard/agent", icon: LayoutDashboard },
    { label: "Pending Reviews", href: "/dashboard/agent/reviews", icon: Clock },
    { label: "Session History", href: "/dashboard/agent/history", icon: CalendarDays },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Content", href: "/dashboard/admin/content", icon: ShieldCheck },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  ],
}

const bottomLinks = [
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ role = "STUDENT" as "STUDENT" | "TEACHER" | "AGENT" | "ADMIN", mobileOpen = false, onMobileClose }: { role?: "STUDENT" | "TEACHER" | "AGENT" | "ADMIN"; mobileOpen?: boolean; onMobileClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const links = roleLinks[role] || roleLinks.STUDENT

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onMobileClose} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] border-r border-border/60 bg-bg-primary transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-60",
          "max-lg:fixed max-lg:top-16 max-lg:z-50",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <div className="flex lg:hidden items-center justify-end px-3 pt-3">
          <button onClick={onMobileClose} className="p-1 text-text-muted hover:text-text-primary transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      {/* Role header */}
      <div className={cn("flex items-center gap-3 px-4 h-14 border-b border-border/40", collapsed && "justify-center px-0")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 shrink-0">
          {role === "STUDENT" && <GraduationCap className="h-4 w-4 text-accent" />}
          {role === "TEACHER" && <BookOpen className="h-4 w-4 text-accent" />}
          {role === "AGENT" && <ShieldCheck className="h-4 w-4 text-accent" />}
          {role === "ADMIN" && <Users className="h-4 w-4 text-accent" />}
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate capitalize">{role.toLowerCase()}</p>
            <p className="text-[10px] text-text-muted truncate">Dashboard</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom links */}
      <div className="p-2 border-t border-border/40">
        {bottomLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
              collapsed && "justify-center px-2",
              "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
            )}
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{link.label}</span>}
          </Link>
        ))}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all w-full mt-1",
            collapsed && "justify-center px-2",
            "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">Sign out</span>}
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-bg-primary text-text-muted hover:text-text-primary transition-colors shadow-sm"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
    </>
  )
}

export function DashboardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">{title}</h1>
        {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/dashboard/notifications" className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-text-muted hover:text-text-primary hover:border-border transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">3</span>
        </Link>
      </div>
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, change, color }: { icon: any; label: string; value: string; change?: string; color?: string }) {
  return (
    <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", color || "bg-accent/10")}>
          <Icon className={cn("h-4 w-4", color ? "text-white" : "text-accent")} />
        </div>
        <span className="text-xs text-text-muted">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        {change && <span className={cn("text-xs font-medium", change.startsWith("+") ? "text-emerald-400" : "text-red-400")}>{change}</span>}
      </div>
    </div>
  )
}

import { TopNavbar } from "@/components/dashboard/top-navbar"

export function DashboardLayout({ children, role = "STUDENT" as "STUDENT" | "TEACHER" | "AGENT" | "ADMIN" }: { children: React.ReactNode; role?: "STUDENT" | "TEACHER" | "AGENT" | "ADMIN" }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNavbar onMenuClick={() => setMobileSidebarOpen(true)} />
      <DashboardSidebar role={role} mobileOpen={mobileSidebarOpen} onMobileClose={() => setMobileSidebarOpen(false)} />
      <main className="lg:pl-60 pt-16 transition-all duration-300">
        <div className="p-4 md:p-6 w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
