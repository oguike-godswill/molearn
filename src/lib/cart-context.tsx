"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  title: string
  price: number
  thumbnail: string
  teacher: string
  type: string
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  itemCount: number
  total: number
  isInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
  total: 0,
  isInCart: () => false,
})

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("molearn-cart")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem("molearn-cart", JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const isInCart = useCallback((id: string) => {
    return items.some((i) => i.id === id)
  }, [items])

  const itemCount = items.length
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount, total, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}
