import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Not authenticated — redirect to login
  if (!session?.user) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  const role = (session.user as any).role as string | undefined

  // Role-based path restrictions
  const rolePathMap: Record<string, string[]> = {
    STUDENT: ["/dashboard/student"],
    TEACHER: ["/dashboard/teacher", "/teach"],
    AGENT: ["/dashboard/agent"],
    ADMIN: ["/dashboard/admin"],
  }

  const allowedPaths = role ? (rolePathMap[role] || []) : []
  const isAllowed = allowedPaths.some((prefix) => pathname.startsWith(prefix))

  // Allow common dashboard paths for all authenticated users
  const commonPaths = ["/dashboard/notifications", "/dashboard/settings", "/dashboard/profile", "/checkout", "/browse"]
  const isCommon = commonPaths.some((prefix) => pathname.startsWith(prefix))

  // Allow root dashboard (which redirects to role-specific)
  if (pathname === "/dashboard") return NextResponse.next()

  if (!isAllowed && !isCommon && pathname.startsWith("/dashboard")) {
    const roleDashboard = role ? `/dashboard/${role.toLowerCase()}` : "/dashboard/student"
    return NextResponse.redirect(new URL(roleDashboard, req.url))
  }

  if (pathname.startsWith("/teach") && role !== "TEACHER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/teach", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*", "/teach/:path*"],
}
