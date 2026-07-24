"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  error?: string
  label?: string
}

export function Select({ options, value, onChange, placeholder, className, error, label }: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="space-y-1.5">
      {label && (
        <span className="block text-sm font-medium text-text-secondary">{label}</span>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center justify-between bg-bg-elevated border border-border px-3 py-2.5 text-sm text-left",
            "transition-colors duration-150",
            "hover:border-border-hover",
            "focus:border-accent focus:outline-none",
            open && "border-accent",
            !selected && "text-text-muted",
            className,
          )}
        >
          <span>{selected ? selected.label : placeholder || "Select..."}</span>
          <ChevronDown className={cn("h-4 w-4 text-text-muted transition-transform duration-150", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-border bg-bg-elevated shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value)
                  setOpen(false)
                }}
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm transition-colors duration-100",
                  "hover:bg-accent/10 hover:text-text-primary",
                  value === option.value
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-text-secondary",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
