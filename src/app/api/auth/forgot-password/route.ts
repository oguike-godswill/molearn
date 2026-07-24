import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 })
  
  const user = await prisma.user.findUnique({ where: { email } })
  // Always return success even if user doesn't exist (prevents email enumeration)
  if (!user) return NextResponse.json({ success: true, message: "If an account exists, a reset link has been sent." })
  
  // In a real app, we'd generate a token, store it, and send an email
  // For now, just return success
  return NextResponse.json({ success: true, message: "If an account exists, a reset link has been sent." })
}
