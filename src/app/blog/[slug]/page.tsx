"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const categoryColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Marketing: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
    gradient: "from-violet-600 to-purple-700",
  },
  Design: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/20",
    gradient: "from-sky-500 to-cyan-600",
  },
  Career: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-600",
  },
  Industry: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    gradient: "from-amber-500 to-orange-600",
  },
}

const allPosts = [
  {
    slug: "digital-marketing-trends-nigeria-2026",
    title: "5 Digital Marketing Trends in Nigeria for 2026",
    category: "Marketing",
    author: "Chidinma Okafor",
    authorRole: "Head of Growth, MojeTech",
    authorBio:
      "Chidinma has spent the last decade helping Nigerian brands scale their digital presence. She leads growth strategy at MojeTech and mentors aspiring marketers across West Africa.",
    date: "Aug 28, 2026",
    readTime: "6 min read",
    content: [
      "The digital marketing landscape in Nigeria is evolving at a breakneck pace. As more businesses move online and smartphone penetration continues to climb, marketers are being forced to rethink strategies that worked just two years ago. Here are five trends that will define the industry in 2026.",
      "First, AI-powered ad targeting is no longer a luxury — it's a necessity. Platforms like Meta and Google are rolling out machine-learning tools that optimize campaigns in real time, and Nigerian brands that adopt early are seeing up to 40% lower cost per acquisition. The key is feeding these systems clean, well-segmented data from day one.",
      "Second, short-form video continues to dominate. TikTok, Instagram Reels, and YouTube Shorts are where attention lives now. Brands that invest in authentic, snackable content are outperforming those still relying on polished 60-second spots. The barrier to entry is low — a smartphone and good lighting are all you need.",
      "Third, influencer marketing is maturing. Micro-influencers with 5,000 to 50,000 followers are delivering higher engagement rates than mega-creators, and they're far more affordable for SMEs. The trend is moving toward long-term partnerships rather than one-off sponsored posts.",
      "Fourth, conversational commerce through WhatsApp and Instagram DMs is exploding. Businesses are using chatbots and CRM integrations to close sales directly inside messaging apps. In Nigeria, where WhatsApp penetration is near-universal, this channel is a goldmine.",
      "Finally, data privacy is becoming a competitive advantage. With the Nigeria Data Protection Act now fully enforced, brands that are transparent about data collection and usage are earning deeper trust from consumers. Marketers who treat privacy as a feature, not a burden, will win in the long run.",
    ],
  },
  {
    slug: "build-design-portfolio-from-scratch",
    title: "How to Build a Design Portfolio from Scratch",
    category: "Design",
    author: "Tunde Emeka",
    authorRole: "Senior Product Designer, Paystack",
    authorBio:
      "Tunde is a self-taught designer who transitioned from accounting to product design. He now leads design systems at Paystack and runs a popular YouTube channel on design careers in Africa.",
    date: "Aug 22, 2026",
    readTime: "8 min read",
    content: [
      "Your portfolio is the single most important asset in your design career. It's more important than your degree, your certifications, or your resume. Hiring managers spend an average of 30 seconds scanning a portfolio — so every pixel counts.",
      "Start by selecting three to five projects that showcase range. Don't include everything you've ever done. Pick one mobile app, one web dashboard, and one branding or illustration project. Quality always beats quantity. If you don't have real client work yet, create case studies around personal projects or redesigns of existing products.",
      "Each case study should follow a clear structure: the problem you were solving, your research and ideation process, the design decisions you made (and why), and the final outcome with measurable results. Use real numbers wherever possible — even a 15% improvement in a personal project's conversion rate tells a compelling story.",
      "Presentation matters as much as the work itself. Use clean, consistent layouts. Write concise, scannable copy. Show your process through wireframes, user flows, and before-and-after comparisons. Tools like Figma, Notion, and Framer make it easy to build beautiful case studies without touching code.",
      "Don't forget the meta-layer: your portfolio site itself is a design project. The navigation should be intuitive, the typography should be readable, and the load times should be fast. If you can make someone's experience browsing your portfolio delightful, you've already demonstrated your skill.",
      "Finally, keep it updated. Set a reminder to review your portfolio every quarter. Swap out weaker projects, add new ones, and refine your writing. A living portfolio signals that you're actively growing — and that's exactly what hiring managers want to see.",
    ],
  },
  {
    slug: "student-to-freelancer-mojetech-success",
    title: "From Student to Freelancer: A MojeTech Success Story",
    category: "Career",
    author: "Ngozi Igwe",
    authorRole: "Freelance Digital Marketer",
    authorBio:
      "Ngozi completed MojeTech's Digital Marketing program in early 2025. She now runs her own freelance practice, serving five retainer clients across fintech and e-commerce. She mentors new students every cohort.",
    date: "Aug 15, 2026",
    readTime: "5 min read",
    content: [
      "Eight months ago, I didn't know the difference between CPC and CPM. Today, I manage ad budgets worth millions of naira for some of Nigeria's fastest-growing startups. My journey from MojeTech student to full-time freelancer is proof that the right training, combined with relentless execution, can change your life.",
      "I enrolled in MojeTech's Digital Marketing program after seeing an ad on Instagram. At the time, I was working a 9-to-5 that paid the bills but left me unfulfilled. The program was intense — live sessions, hands-on projects, and a community of peers who pushed me to be better every week.",
      "The turning point came during the capstone project. I built a complete social media strategy for a local fashion brand, and the results were so impressive that the founder offered me a paid contract on the spot. That one project became my first case study, and it opened the door to three more clients within two months.",
      "Freelancing isn't easy. You have to be your own sales team, project manager, and accountant. But the flexibility is unmatched. I set my own hours, choose my clients, and earn more than I ever did in my corporate role. The key is treating freelancing like a business, not a side hustle.",
      "My advice to anyone considering MojeTech: go all in. Complete every module, participate in the community, and start building your portfolio from day one. The opportunities are real — you just have to be ready to seize them.",
    ],
  },
  {
    slug: "rise-of-remote-work-nigeria-tech",
    title: "The Rise of Remote Work in Nigeria's Tech Scene",
    category: "Industry",
    author: "Adeola Martins",
    authorRole: "Tech Analyst, TechCabal",
    authorBio:
      "Adeola covers Nigeria's tech ecosystem for TechCabal. She has reported on funding rounds, policy changes, and workforce trends across West Africa for the past five years.",
    date: "Aug 10, 2026",
    readTime: "7 min read",
    content: [
      "Remote work in Nigeria used to be a perk reserved for a handful of senior engineers at global companies. Today, it's becoming the default for a growing number of roles — from product design and marketing to customer support and data analysis.",
      "The pandemic was the catalyst, but the shift has been sustained by infrastructure improvements. Reliable internet is more accessible than ever, co-working spaces are thriving in Lagos, Abuja, and Port Harcourt, and tools like Slack, Notion, and Zoom have become second nature to Nigerian professionals.",
      "For employers, remote work unlocks access to a national talent pool. A startup in Victoria Island can now hire a developer in Ibadan or a designer in Enugu without requiring relocation. This has been a game-changer for companies struggling to compete with the salaries offered by international firms.",
      "For workers, the benefits are equally compelling. Remote roles often come with dollar-denominated salaries, flexible hours, and the ability to work from anywhere. For many young Nigerians, this represents a path to financial freedom that didn't exist five years ago.",
      "But challenges remain. Time zone differences with US and European teams can be brutal. Load-shedding and internet outages still disrupt work. And the lack of face-to-face interaction can make it harder to build company culture and mentor junior team members.",
      "Despite these hurdles, the trajectory is clear. Remote work is here to stay, and Nigerian professionals who invest in the right skills — communication, self-management, and digital fluency — will be best positioned to thrive in this new landscape.",
    ],
  },
  {
    slug: "social-media-strategy-small-businesses",
    title: "Social Media Strategy for Small Businesses",
    category: "Marketing",
    author: "Funke Adebayo",
    authorRole: "Founder, BrandSpark Digital",
    authorBio:
      "Funke runs BrandSpark Digital, a Lagos-based agency that helps SMEs build their social media presence from scratch. She has worked with over 200 small businesses across Nigeria.",
    date: "Aug 5, 2026",
    readTime: "6 min read",
    content: [
      "If you run a small business in Nigeria and you're not on social media, you're leaving money on the table. But being on social media isn't enough — you need a strategy. Here's how to build one that actually drives revenue.",
      "Start with clarity on your target audience. Who are they? What platforms do they use? What problems do they face? A fashion brand targeting university students will have a completely different strategy from a B2B logistics company. Define your audience before you post a single thing.",
      "Next, choose two platforms and commit to them. Trying to be everywhere at once is a recipe for burnout. For most Nigerian SMEs, Instagram and WhatsApp are the highest-ROI channels. Instagram for discovery and brand building, WhatsApp for closing sales and nurturing relationships.",
      "Content is king, but consistency is queen. Post at least three times a week, and mix up your formats — carousels for education, reels for entertainment, stories for behind-the-scenes. Use a simple content calendar to plan a week ahead so you're never scrambling for ideas.",
      "Engagement is where the magic happens. Reply to every comment and DM within 24 hours. Ask questions in your captions. Run polls in your stories. The algorithm rewards accounts that create conversations, not just broadcasts.",
      "Finally, track what matters. Follower count is a vanity metric. Focus on engagement rate, click-throughs to your website or WhatsApp link, and ultimately, sales attributed to social media. Tools like Meta Business Suite and Google Analytics make this easy — and they're free.",
    ],
  },
  {
    slug: "color-theory-basics-every-designer",
    title: "Color Theory Basics Every Designer Should Know",
    category: "Design",
    author: "Kemi Adeyemi",
    authorRole: "Visual Design Lead, Andela",
    authorBio:
      "Kemi is a visual designer with a background in fine arts. She leads the design system team at Andela and teaches color theory workshops at design conferences across Africa.",
    date: "Jul 29, 2026",
    readTime: "5 min read",
    content: [
      "Color is the most powerful tool in a designer's arsenal. It communicates emotion, establishes hierarchy, and guides the user's eye — often before they've read a single word. Yet many designers treat color as an afterthought. Here's what you need to know to use it effectively.",
      "Start with the color wheel. The three primary colors — red, blue, and yellow — form the foundation. Mixing them gives you secondary colors (green, orange, purple), and further mixing produces tertiary colors. Understanding these relationships is the basis of every color scheme you'll ever build.",
      "There are five classic color harmonies: complementary (opposite colors), analogous (adjacent colors), triadic (three evenly spaced colors), split-complementary, and tetradic. Each creates a different mood. Complementary schemes are bold and high-contrast. Analogous schemes are calm and cohesive. Choose based on the emotion you want to evoke.",
      "Saturation and brightness matter as much as hue. A fully saturated red screams urgency. Desaturate it slightly and it becomes warm and inviting. Darken it and it feels serious and premium. Play with these dimensions to fine-tune the emotional impact of your palette.",
      "Accessibility is non-negotiable. Ensure your text has sufficient contrast against its background — the WCAG AA standard requires a ratio of at least 4.5:1 for body text. Tools like Stark and Contrast Checker make it easy to verify. Designing for accessibility isn't just ethical; it improves readability for everyone.",
      "Finally, build a system, not just a palette. Define your primary, secondary, and neutral colors. Assign semantic roles — success green, error red, warning amber. Document everything in a design token file so your team stays consistent across every product and touchpoint.",
    ],
  },
]

const relatedPostsData: Record<string, string[]> = {
  "digital-marketing-trends-nigeria-2026": [
    "social-media-strategy-small-businesses",
    "student-to-freelancer-mojetech-success",
    "rise-of-remote-work-nigeria-tech",
  ],
  "build-design-portfolio-from-scratch": [
    "color-theory-basics-every-designer",
    "student-to-freelancer-mojetech-success",
    "digital-marketing-trends-nigeria-2026",
  ],
  "student-to-freelancer-mojetech-success": [
    "rise-of-remote-work-nigeria-tech",
    "digital-marketing-trends-nigeria-2026",
    "build-design-portfolio-from-scratch",
  ],
  "rise-of-remote-work-nigeria-tech": [
    "student-to-freelancer-mojetech-success",
    "digital-marketing-trends-nigeria-2026",
    "social-media-strategy-small-businesses",
  ],
  "social-media-strategy-small-businesses": [
    "digital-marketing-trends-nigeria-2026",
    "build-design-portfolio-from-scratch",
    "student-to-freelancer-mojetech-success",
  ],
  "color-theory-basics-every-designer": [
    "build-design-portfolio-from-scratch",
    "social-media-strategy-small-businesses",
    "digital-marketing-trends-nigeria-2026",
  ],
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Post not found</h1>
            <p className="text-gray-400 text-sm mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const colors = categoryColors[post.category]
  const relatedSlugs = relatedPostsData[post.slug] || []
  const relatedPosts = relatedSlugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean) as typeof allPosts

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex-1">
        {/* Post header */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>

              <span
                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border} mb-4`}
              >
                {post.category}
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-300">{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Post content */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-base sm:text-[17px] text-gray-300 leading-[1.8] tracking-wide"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Author bio card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-14 p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
          >
            <div className="flex items-start gap-4">
              <div
                className={`h-14 w-14 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shrink-0`}
              >
                <span className="text-white text-lg font-bold">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-base font-bold text-white">{post.author}</p>
                <p className="text-xs text-accent font-medium mt-0.5">{post.authorRole}</p>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{post.authorBio}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related posts */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Related Posts</h2>
            <p className="text-sm text-gray-400 mb-8">Keep reading — more insights await.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map((related, i) => {
              const relatedColors = categoryColors[related.category]
              return (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                >
                  <Link href={`/blog/${related.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all overflow-hidden">
                      {/* Thumbnail placeholder */}
                      <div
                        className={`h-36 bg-gradient-to-br ${relatedColors.gradient} relative flex items-center justify-center`}
                      >
                        <span className="text-white/30 text-4xl font-extrabold tracking-tighter select-none">
                          {related.category.charAt(0)}
                        </span>
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${relatedColors.bg} ${relatedColors.text} ${relatedColors.border}`}
                          >
                            {related.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors leading-snug line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                          {related.content[0]?.slice(0, 120)}...
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
