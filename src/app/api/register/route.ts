import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/db"

const avatarColors = [
  "5b6bf7", "10b981", "f59e0b", "8b5cf6", "ef4444",
  "06b6d4", "ec4899", "84cc16", "f97316", "6366f1",
  "14b8a6", "a855f7", "e11d48", "0ea5e9", "d946ef",
]

function generateAvatar(name: string): string {
  const seed = encodeURIComponent(name)
  const color = avatarColors[name.length % avatarColors.length]
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=${color}`
}

export async function POST(request: Request) {
  try {
    const { email, name, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)
    const displayName = name || email.split("@")[0]

    const user = await prisma.user.create({
      data: {
        email,
        name: displayName,
        password: hashedPassword,
        role: role || "STUDENT",
        image: generateAvatar(displayName),
      },
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
