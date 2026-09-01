"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { BookOpen, Bell, Search, User, LogOut, Settings, Menu } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export function TopNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const userName = session?.user?.name || "User"
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border/40 bg-bg-secondary/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tight">mojetech</span>
          </Link>
        </div>

        {/* Center */}
        <div className="hidden sm:flex items-center flex-1 mx-4 md:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full h-9 pl-10 pr-3 rounded-lg border border-border/60 bg-bg-elevated text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Mobile search icon */}
          <button className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/dashboard/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-text-muted hover:text-text-primary hover:border-border transition-all"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">
              3
            </span>
          </Link>

          {/* User dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-bg-elevated text-text-secondary hover:text-text-primary hover:border-border transition-all",
                userMenuOpen && "border-accent/50 text-accent"
              )}
            >
              <User className="h-4 w-4" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-border bg-bg-primary/95 backdrop-blur-2xl shadow-2xl shadow-black/20">
                <div className="border-b border-border/50 px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{userName}</span>
                </div>
                <nav className="p-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
