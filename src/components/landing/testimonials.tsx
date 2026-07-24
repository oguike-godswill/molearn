"use client"

import { AnimatedSection, StaggerList, StaggerItem, HoverCard } from "@/components/animations"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "React Developer & Teacher",
    avatar: "SC",
    content:
      "I've been teaching on molearn for 3 months. The agent review process actually helped me improve my content. Students love the quality, and I love the 80% cut. Last month I made more here than on any other platform.",
    rating: 5,
    detail: "2 courses published · $4,200 earned",
  },
  {
    name: "Marcus Johnson",
    role: "Full-Stack Developer & Student",
    avatar: "MJ",
    content:
      "Finally a platform where I can trust the quality of courses. The agent verification means no more wasting money on shallow tutorials. I've completed 4 courses so far, and every one exceeded my expectations.",
    rating: 5,
    detail: "4 courses completed · 8 hours of content",
  },
  {
    name: "Alex Rivera",
    role: "Content Reviewer (Agent)",
    avatar: "AR",
    content:
      "As an agent, I review content daily. We maintain high standards. It's rewarding to help both teachers improve and students find real value. The review process is thorough but fair — we provide actionable feedback every time.",
    rating: 5,
    detail: "47 reviews completed · 92% approval rate",
  },
  {
    name: "Lisa Park",
    role: "UI/UX Designer & Teacher",
    avatar: "LP",
    content:
      "The analytics dashboard alone is worth it. I can see exactly which parts of my course students engage with most, where they pause, and what they rewatch. That data made my second course significantly better than my first.",
    rating: 5,
    detail: "3 courses published · 1,200+ students",
  },
  {
    name: "David Kim",
    role: "Software Engineer & Student",
    avatar: "DK",
    content:
      "I was skeptical about the agent pricing model at first, but it actually works. The prices feel fair — not too cheap that quality suffers, not too expensive that I hesitate. I trust that I'm getting value for my money.",
    rating: 5,
    detail: "6 courses purchased · All highly rated",
  },
  {
    name: "Emily Watson",
    role: "Data Scientist & Teacher",
    avatar: "EW",
    content:
      "The 48-hour payout cycle changed everything. On other platforms I'd wait 30-60 days. Here, I upload, it gets reviewed, published, and the money hits my account. The cash flow predictability lets me focus on creating.",
    rating: 5,
    detail: "5 courses published · $8,100 earned",
  },
]

export function Testimonials() {
  return (
    <AnimatedSection as="section" className="relative z-10 border-t border-border py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-border bg-bg-secondary px-3 py-1.5 text-xs text-text-secondary mb-6">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            4.9 average rating across all reviews
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Trusted by creators & learners worldwide
          </h2>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            Here&apos;s what our community says about the platform.
          </p>
        </div>

        <StaggerList className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <HoverCard className="border border-border bg-bg-secondary p-6 flex flex-col h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs font-medium text-text-secondary">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {t.name}
                      </div>
                      <div className="text-xs text-text-muted">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted tracking-tight">{t.detail}</span>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </AnimatedSection>
  )
}
