import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  const [userCount, productCount, purchaseCount, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.product.count({ where: { status: "APPROVED" } }),
    prisma.purchase.count(),
    prisma.purchase.aggregate({ _sum: { amount: true } }),
  ])

  return NextResponse.json({
    users: userCount,
    products: productCount,
    purchases: purchaseCount,
    revenue: totalRevenue._sum.amount || 0,
  })
}
