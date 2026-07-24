"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Check, CheckCheck, Info, AlertCircle, ShoppingCart, Star, Clock } from "lucide-react"

const typeIcons: Record<string, React.ReactNode> = {
  success: <Check className="h-4 w-4 text-emerald-400" />,
  sale: <ShoppingCart className="h-4 w-4 text-blue-400" />,
  review: <Star className="h-4 w-4 text-yellow-400" />,
  info: <Info className="h-4 w-4 text-accent" />,
  warning: <AlertCircle className="h-4 w-4 text-orange-400" />,
}

const typeColors: Record<string, string> = {
  success: "bg-emerald-500/10",
  sale: "bg-blue-500/10",
  review: "bg-yellow-500/10",
  info: "bg-accent/10",
  warning: "bg-orange-500/10",
}

export default function NotificationsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) return
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => {
        setNotifications(data)
        setLoading(false)
      })
  }, [session])

  const markAllRead = async () => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    })
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = async (id: string) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    })
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
          <p className="text-sm text-text-secondary mt-1">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead} className="gap-1.5">
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-bg-secondary/30 border border-border/60 rounded-xl p-4 flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg-elevated" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-bg-elevated" />
                <div className="h-3 w-2/3 rounded bg-bg-elevated" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20">
          <Bell className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-lg font-medium text-text-primary">No notifications yet</p>
          <p className="text-sm text-text-muted mt-1">We&apos;ll notify you when something happens</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => !notif.read && markRead(notif.id)}
              className={`w-full text-left bg-bg-secondary/50 backdrop-blur-sm border rounded-xl p-4 flex items-start gap-3 transition-all ${
                notif.read
                  ? "border-border/40 opacity-60"
                  : "border-border/60 hover:border-accent/20 hover:shadow-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${typeColors[notif.type] || "bg-accent/10"}`}>
                {typeIcons[notif.type] || <Bell className="h-4 w-4 text-accent" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${notif.read ? "text-text-secondary" : "text-text-primary font-medium"}`}>
                  {notif.title}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{notif.message}</p>
                <p className="text-[10px] text-text-muted mt-1.5">
                  {new Date(notif.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
              {!notif.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
