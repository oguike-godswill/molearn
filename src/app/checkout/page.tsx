"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Lock, Shield, CreditCard, ArrowLeft, BookOpen, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { items, removeItem, clearCart, total } = useCart()
  if (status === "unauthenticated") {
    router.push(`/login?callbackUrl=/checkout`)
    return null
  }
  if (status === "loading") return null
  const [loading, setLoading] = useState(false)
  const [couponOpen, setCouponOpen] = useState(false)
  const [coupon, setCoupon] = useState("")

  const fee = Math.round(total * 0.2)

  const handlePurchase = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    clearCart()
    router.push("/dashboard/student/courses")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="border-b border-border/40">
          <div className="w-full px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-logo)" }}>
              <BookOpen className="h-4 w-4 text-accent" /> molearn
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <ShoppingCart className="h-16 w-16 text-text-muted mb-4" />
          <h1 className="text-2xl font-bold text-text-primary mb-2">Your cart is empty</h1>
          <p className="text-text-secondary mb-6">Browse our marketplace and add items to your cart</p>
          <Link href="/browse">
            <Button>Browse courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="border-b border-border/40">
        <div className="w-full px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-logo)" }}>
            <BookOpen className="h-4 w-4 text-accent" /> molearn
          </Link>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Lock className="h-3 w-3 text-emerald-400" />
            Secure checkout
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Checkout</h1>

            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-text-primary mb-4">Contact information</h2>
              <input
                type="email"
                defaultValue={session?.user?.email || ""}
                className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                placeholder="Email address"
              />
            </div>

            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-text-primary mb-4">Payment method</h2>
              <div className="space-y-3">
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    className="w-full h-10 pl-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                    placeholder="Card number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                    placeholder="MM / YY"
                  />
                  <input
                    className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                    placeholder="CVC"
                  />
                </div>
                <input
                  className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                  placeholder="Cardholder name"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                Payment is securely processed by Stripe. Your card details never touch our servers.
              </div>
            </div>

            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-text-primary mb-4">Billing address</h2>
              <div className="space-y-3">
                <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors" placeholder="Country" />
                <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors" placeholder="Address line 1" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors" placeholder="City" />
                  <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors" placeholder="ZIP code" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 sticky top-24">
              <h2 className="text-sm font-semibold text-text-primary mb-4">Order summary ({items.length} item{items.length !== 1 ? "s" : ""})</h2>
              <div className="space-y-3 pb-4 border-b border-border/40">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-16 h-12 rounded-lg bg-bg-elevated overflow-hidden shrink-0">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
                      <p className="text-xs text-text-muted">{item.teacher}</p>
                      <span className="inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-medium text-text-primary">${(item.price / 100).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="p-1 text-text-muted hover:text-red-400 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-4 space-y-2 border-b border-border/40">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text-primary">${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Platform fee</span>
                  <span className="text-text-primary">${(fee / 100).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-sm font-semibold text-text-primary">Total</span>
                <span className="text-lg font-bold text-text-primary">${((total + fee) / 100).toFixed(2)}</span>
              </div>
              <Button className="w-full gap-2" onClick={handlePurchase} loading={loading}>
                <ShoppingCart className="h-4 w-4" />
                {loading ? "Processing..." : "Complete purchase"}
              </Button>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-text-muted">
                <Shield className="h-3 w-3" />
                30-day money-back guarantee
              </div>
            </div>

            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4">
              <button onClick={() => setCouponOpen(!couponOpen)} className="flex items-center justify-between w-full text-sm text-text-secondary hover:text-text-primary transition-colors">
                Have a coupon code?
                <span className={`transition-transform ${couponOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {couponOpen && (
                <div className="mt-3 flex gap-2">
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 h-9 rounded-lg border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" placeholder="Enter code" />
                  <Button size="sm" variant="secondary">Apply</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
