"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TeachEarningsRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/teacher/earnings")
  }, [router])

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <p className="text-sm text-text-muted">Redirecting to earnings dashboard...</p>
    </div>
  )
}
