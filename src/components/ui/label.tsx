"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type LabelHTMLAttributes } from "react"

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-sm font-medium text-text-secondary",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
        {...props}
      />
    )
  },
)
Label.displayName = "Label"

export { Label }
