"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={cn(
            "block w-full bg-bg-elevated border border-border px-3 py-2.5 text-sm text-text-primary",
            "placeholder:text-text-muted",
            "transition-colors duration-150",
            "hover:border-border-hover",
            "focus:border-accent focus:outline-none focus:ring-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500/60",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
export type { InputProps }
