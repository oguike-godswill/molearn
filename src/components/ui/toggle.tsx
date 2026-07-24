"use client"

import { cn } from "@/lib/utils"

interface ToggleProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string | React.ReactNode
}

export function Toggle({ id, checked, onChange, label }: ToggleProps) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "h-5 w-9 rounded-full transition-colors duration-200",
            checked ? "bg-accent" : "bg-border group-hover:bg-border-hover",
          )}
        >
          <div
            className={cn(
              "h-4 w-4 rounded-full bg-white transition-all duration-200 shadow-sm",
              "translate-y-[2px]",
              checked ? "translate-x-[18px]" : "translate-x-[2px]",
            )}
          />
        </div>
      </div>
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-150">
        {label}
      </span>
    </label>
  )
}
