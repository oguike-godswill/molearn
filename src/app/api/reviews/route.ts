import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get("productId")

  const reviews = await prisma.review.findMany({
    where: productId ? { productId } : {},
    include: { user: { select: { id: true, name: true, image: true } }, product: { select: { id: true, title: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return NextResponse.json(reviews)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { productId, rating, comment } = body

  if (!rating || rating < 1 || rating > 5) return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
  if (!productId) return NextResponse.json({ error: "Product ID is required" }, { status: 400 })

  const existing = await prisma.review.findFirst({ where: { productId, userId: session.user.id } })
  if (existing) return NextResponse.json({ error: "You've already reviewed this product" }, { status: 400 })

  const review = await prisma.review.create({
    data: { rating, comment, productId, userId: session.user.id },
    include: { user: { select: { id: true, name: true, image: true } } },
  })

  return NextResponse.json(review, { status: 201 })
}
