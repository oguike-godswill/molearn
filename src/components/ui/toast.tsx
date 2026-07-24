"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, X } from "lucide-react"
import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

interface Toast {
  id: number
  message: string
  type: "success" | "error"
}

interface ToastContextValue {
  toast: (message: string, type?: "success" | "error") => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now()
    setToasts((p) => [...p, { id, message, type }])
    setTimeout(() => {
      setToasts((p) => p.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const remove = (id: number) => setToasts((p) => p.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 px-4 py-3 shadow-lg border animate-fade-in",
              t.type === "success" ? "bg-bg-elevated border-border" : "bg-red-950 border-red-800",
            )}
          >
            {t.type === "success"
              ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              : <XCircle className="h-4 w-4 text-red-400 shrink-0" />
            }
            <p className={cn("text-sm", t.type === "success" ? "text-text-primary" : "text-red-200")}>{t.message}</p>
            <button type="button" onClick={() => remove(t.id)} className="ml-2 p-0.5 hover:opacity-70">
              <X className="h-3.5 w-3.5 text-text-muted" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
