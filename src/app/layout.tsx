import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/lib/cart-context"
import { SmoothScrollProvider } from "@/lib/smooth-scroll"
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
  title: "MojeTech — Digital Skills Training in Nigeria",
  description:
    "MojeTech trains young Nigerians in practical digital skills. Structured cohort programs in digital marketing and design with mentorship and community.",
  openGraph: {
    title: "MojeTech — Digital Skills Training in Nigeria",
    description:
      "MojeTech trains young Nigerians in practical digital skills. Structured cohort programs in digital marketing and design with mentorship and community.",
    url: "https://mojetech.com",
    siteName: "MojeTech",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MojeTech — Digital Skills Training in Nigeria",
    description:
      "MojeTech trains young Nigerians in practical digital skills. Structured cohort programs in digital marketing and design with mentorship and community.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <ThemeProvider defaultTheme="dark" storageKey="mojetech-theme">
            <SmoothScrollProvider>
              <ToastProvider>
                <CartProvider>
                  {children}
                </CartProvider>
              </ToastProvider>
            </SmoothScrollProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
