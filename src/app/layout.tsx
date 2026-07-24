import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/lib/cart-context"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "Molearn – Buy & Sell Knowledge",
  description:
    "A marketplace for video tutorials and books. Teachers share knowledge, students learn, agents verify quality.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <ThemeProvider defaultTheme="dark" storageKey="molearn-theme">
            <ToastProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ToastProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
