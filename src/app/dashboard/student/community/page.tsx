"use client"

import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, ThumbsUp, Send, Pin, Search, Users, TrendingUp, Megaphone, Palette, Briefcase, ChevronRight, Clock } from "lucide-react"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const categories = [
  { id: 1, name: "Digital Marketing", icon: TrendingUp, posts: 124, color: "bg-blue-500/10 text-blue-400", lastPost: { title: "Best SEO tools for 2026?", author: "Chidi O.", time: "12m ago" } },
  { id: 2, name: "Design", icon: Palette, posts: 87, color: "bg-purple-500/10 text-purple-400", lastPost: { title: "Figma vs Sketch — which one?", author: "Fatima Y.", time: "1h ago" } },
  { id: 3, name: "Career Advice", icon: Briefcase, posts: 56, color: "bg-amber-500/10 text-amber-400", lastPost: { title: "How to land your first internship", author: "Emeka N.", time: "3h ago" } },
  { id: 4, name: "General Discussion", icon: MessageSquare, posts: 203, color: "bg-emerald-500/10 text-emerald-400", lastPost: { title: "Introduce yourself here!", author: "Admin", time: "5h ago" } },
  { id: 5, name: "Announcements", icon: Megaphone, posts: 18, color: "bg-pink-500/10 text-pink-400", lastPost: { title: "New cohort starting in March", author: "Admin", time: "1d ago" } },
]

const recentPosts = [
  { id: 1, title: "Best SEO tools for 2026?", author: "Chidi Okonkwo", initials: "CO", category: "Digital Marketing", replies: 12, likes: 24, time: "12 min ago" },
  { id: 2, title: "How I grew my Instagram to 10k followers in 3 months", author: "Blessing Eze", initials: "BE", category: "Digital Marketing", replies: 28, likes: 56, time: "1 hour ago" },
  { id: 3, title: "Figma vs Sketch — which one should I learn?", author: "Fatima Yusuf", initials: "FY", category: "Design", replies: 19, likes: 31, time: "2 hours ago" },
  { id: 4, title: "Tips for building a portfolio as a beginner", author: "Emeka Nwankwo", initials: "EN", category: "Career Advice", replies: 8, likes: 15, time: "4 hours ago" },
  { id: 5, title: "Content calendar template — free download", author: "Oluwaseun Adeyemi", initials: "OA", category: "Digital Marketing", replies: 34, likes: 72, time: "6 hours ago" },
  { id: 6, title: "How to write a compelling cover letter", author: "Ngozi Ikenna", initials: "NI", category: "Career Advice", replies: 11, likes: 20, time: "Yesterday" },
]

const members = [
  { name: "Chidi Okonkwo", initials: "CO", track: "Marketing", online: true },
  { name: "Fatima Yusuf", initials: "FY", track: "Design", online: true },
  { name: "Emeka Nwankwo", initials: "EN", track: "Marketing", online: false },
  { name: "Blessing Eze", initials: "BE", track: "Marketing", online: true },
  { name: "Oluwaseun Adeyemi", initials: "OA", track: "Design", online: false },
  { name: "Ngozi Ikenna", initials: "NI", track: "Marketing", online: false },
  { name: "Ibrahim Musa", initials: "IM", track: "Design", online: true },
  { name: "Chidinma Uche", initials: "CU", track: "Marketing", online: false },
  { name: "Yusuf Abdullahi", initials: "YA", track: "Design", online: false },
  { name: "Amina Bello", initials: "AB", track: "Marketing", online: true },
]

const pinnedAnnouncements = [
  { id: 1, title: "New Cohort Starting March 2026", content: "Registration is now open for Cohort 6. Limited spots available — apply before Feb 28.", date: "Jan 30, 2026" },
  { id: 2, title: "Community Guidelines Updated", content: "Please review the updated community guidelines. Be respectful, stay on topic, and help each other grow.", date: "Jan 25, 2026" },
  { id: 3, title: "Monthly Challenge: Content Sprint", content: "Create and publish 4 pieces of content this month. Top entries win mentorship sessions.", date: "Jan 20, 2026" },
]

export default function CommunityPage() {
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [memberSearch, setMemberSearch] = useState("")
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.track.toLowerCase().includes(memberSearch.toLowerCase())
  )

  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader title="Community Forum" description="Connect with peers, share knowledge, and grow together." />

      {/* Pinned Announcements */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Pin className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold text-text-primary">Pinned Announcements</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {pinnedAnnouncements.map((ann) => (
            <motion.div
              key={ann.id}
              variants={fadeUp}
              className="bg-bg-secondary/50 backdrop-blur-sm border border-accent/20 rounded-xl p-4 hover:border-accent/30 transition-all"
            >
              <div className="flex items-start gap-2 mb-2">
                <Pin className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                <h4 className="text-sm font-medium text-text-primary leading-snug">{ann.title}</h4>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed mb-2 line-clamp-2">{ann.content}</p>
              <span className="text-[10px] text-text-muted">{ann.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Categories + Posts + Create Post */}
        <div className="lg:col-span-2 space-y-6">
          {/* Forum Categories */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <motion.div
                  key={cat.id}
                  variants={fadeUp}
                  className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-4 flex items-center gap-4 hover:border-border-hover transition-all cursor-pointer"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${cat.color}`}>
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-medium text-text-primary">{cat.name}</h4>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-bg-elevated text-text-muted">
                        {cat.posts} posts
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted truncate">
                      Last: &quot;{cat.lastPost.title}&quot; by {cat.lastPost.author} · {cat.lastPost.time}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-text-muted shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Posts</h3>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={fadeUp}
                  className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 hover:border-border-hover transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-semibold shrink-0">
                      {post.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary mb-1">{post.title}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-text-secondary">{post.author}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-bg-elevated text-text-muted">{post.category}</span>
                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-12">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
                        likedPosts.has(post.id) ? "text-accent font-medium" : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {post.replies} replies
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Create New Post */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Create New Post</h3>
              <div className="space-y-3">
                <input
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Post title"
                  className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
                />
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your post..."
                  rows={4}
                  className="w-full rounded-xl border border-border/60 bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors resize-none"
                />
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                  <Send className="h-4 w-4" />
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column — Member Directory */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-text-primary">Members</h3>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 ml-auto">
                {members.filter((m) => m.online).length} online
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
              <input
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full h-9 rounded-lg border border-border/60 bg-bg-secondary pl-9 pr-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Member List */}
            <div className="space-y-1">
              {filteredMembers.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-bg-elevated/50 transition-colors cursor-pointer"
                >
                  <div className="relative shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent text-[11px] font-semibold">
                      {member.initials}
                    </div>
                    {member.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-bg-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">{member.name}</p>
                    <p className="text-[10px] text-text-muted">{member.track}</p>
                  </div>
                </div>
              ))}
              {filteredMembers.length === 0 && (
                <p className="text-xs text-text-muted text-center py-4">No members found.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
