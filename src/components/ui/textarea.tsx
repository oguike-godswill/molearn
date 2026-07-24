"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <textarea
          ref={ref}
          className={cn(
            "block w-full bg-bg-elevated border border-border px-3 py-2.5 text-sm text-text-primary",
            "placeholder:text-text-muted",
            "transition-colors duration-150",
            "hover:border-border-hover",
            "focus:border-accent focus:outline-none focus:ring-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "resize-y min-h-[100px]",
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
Textarea.displayName = "Textarea"

export { Textarea }
export type { TextareaProps }
