"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-accent text-white",
        variant === "secondary" && "bg-bg-elevated text-text-secondary border border-border",
        variant === "success" && "bg-green-600 text-white",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
export type { BadgeProps }
