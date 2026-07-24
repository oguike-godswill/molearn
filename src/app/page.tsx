"use client"

import { CategoryExplorer } from "@/components/landing/category-explorer"
import { FeaturedCourses } from "@/components/landing/featured-courses"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Hero, MeshGradient, NoiseOverlay } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Navbar } from "@/components/landing/navbar"
import { Pricing } from "@/components/landing/pricing"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="flex-1">
        <Hero />
        <FeaturedCourses />
        <CategoryExplorer />
        <div className="relative overflow-hidden">
          <MeshGradient />
          <NoiseOverlay />
          <HowItWorks />
          <Features />
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  )
}
