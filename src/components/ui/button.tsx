"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
          "disabled:opacity-40 disabled:pointer-events-none",

          variant === "primary" && [
            "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]",
          ],
          variant === "secondary" && [
            "bg-bg-elevated text-text-primary border border-border hover:border-border-hover hover:bg-bg-secondary active:bg-bg-elevated",
          ],
          variant === "ghost" && [
            "text-text-secondary hover:text-text-primary hover:bg-bg-elevated active:bg-bg-elevated",
          ],
          variant === "danger" && [
            "bg-red-600 text-white hover:bg-red-700 active:bg-red-700",
          ],

          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-6 text-base",

          loading && "relative !text-transparent",
          className,
        )}
        {...props}
      >
        {children}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
export type { ButtonProps }
