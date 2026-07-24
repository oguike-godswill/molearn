import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const purchases = await prisma.purchase.findMany({
    where: { buyerId: session.user.id },
    include: { product: { include: { teacher: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(purchases)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { productId, amount } = body

  const existing = await prisma.purchase.findFirst({ where: { productId, buyerId: session.user.id } })
  if (existing) return NextResponse.json({ error: "Already purchased" }, { status: 400 })

  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const fee = Math.round(amount * 0.2)
  const teacherAmount = Math.round(amount * 0.8)

  const purchase = await prisma.purchase.create({
    data: { amount, fee, teacherAmount, productId, buyerId: session.user.id },
  })

  await prisma.enrollment.create({
    data: { productId, studentId: session.user.id, progress: 0 },
  })

  await prisma.notification.create({
    data: {
      title: "New Sale",
      message: `You made a sale of $${(amount / 100).toFixed(2)} on '${product.title}'.`,
      type: "sale",
      userId: product.teacherId,
    },
  })

  return NextResponse.json(purchase, { status: 201 })
}
