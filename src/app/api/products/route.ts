import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const type = searchParams.get("type")
  const search = searchParams.get("search")
  const status = searchParams.get("status") || "APPROVED"

  const where: any = { status }
  if (category) where.category = { slug: category }
  if (type) where.type = type
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ]
  }

  const products = await prisma.product.findMany({
    where,
    include: { teacher: { select: { id: true, name: true, image: true } }, category: true, _count: { select: { reviews: true, enrollments: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id || (session.user as any).role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      type: body.type,
      price: body.price,
      level: body.level,
      duration: body.duration,
      thumbnail: body.thumbnail,
      categoryId: body.categoryId,
      teacherId: session.user.id,
    },
  })

  return NextResponse.json(product, { status: 201 })
}
