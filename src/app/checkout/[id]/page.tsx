"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function CheckoutRedirect() {
  const { id } = useParams()
  const router = useRouter()
  const { addItem } = useCart()

  useEffect(() => {
    addItem({
      id: id as string,
      title: "Course",
      price: 0,
      thumbnail: "",
      teacher: "",
      type: "VIDEO",
    })
    router.replace("/checkout")
  }, [id, router, addItem])

  return null
}
