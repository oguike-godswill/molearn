"use client"

import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { motion } from "framer-motion"
import { Camera, Save, BookOpen, Award, Download, Trash2, Shield, Link as LinkIcon, Globe, ChevronRight, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const enrolledPrograms = [
  { id: 1, title: "Digital Marketing Fundamentals", progress: 72, totalLessons: 42, completedLessons: 30 },
  { id: 2, title: "UI/UX Design Masterclass", progress: 45, totalLessons: 38, completedLessons: 17 },
  { id: 3, title: "Social Media Strategy", progress: 100, totalLessons: 24, completedLessons: 24 },
]

const certificates = [
  { id: 1, title: "Social Media Strategy", date: "Jan 28, 2026", credentialId: "MJT-SMS-2026-0142" },
  { id: 2, title: "Introduction to Digital Marketing", date: "Dec 15, 2025", credentialId: "MJT-IDM-2025-0891" },
]

const emailPreferences = [
  { key: "courseUpdates", label: "Course updates", desc: "When a course you're enrolled in is updated" },
  { key: "newCourses", label: "New courses", desc: "When new courses are published in your track" },
  { key: "communityReplies", label: "Community replies", desc: "When someone replies to your forum post" },
  { key: "mentorMessages", label: "Mentor messages", desc: "Direct messages from your mentor" },
  { key: "promotions", label: "Promotions", desc: "Sales, discounts, and special offers" },
]

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState("Amina Bello")
  const [email, setEmail] = useState("amina.bello@example.com")
  const [bio, setBio] = useState("Digital marketing enthusiast passionate about content strategy and social media growth. Currently enrolled in the MojeTech Digital Marketing Cohort 5.")
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/aminabello")
  const [twitter, setTwitter] = useState("https://twitter.com/aminabello")
  const [portfolio, setPortfolio] = useState("https://aminabello.com")
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    courseUpdates: true,
    newCourses: true,
    communityReplies: true,
    mentorMessages: true,
    promotions: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const togglePref = (key: string) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader title="My Profile" description="Manage your profile information and account settings." />

      {/* Profile Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative group shrink-0">
            <div className="h-20 w-20 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-2xl font-bold text-accent">
              AB
            </div>
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-text-primary">Amina Bello</h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                Marketing
              </span>
            </div>
            <p className="text-sm text-text-secondary mt-1">amina.bello@example.com</p>
            <p className="text-sm text-text-muted mt-2 leading-relaxed max-w-xl">
              Digital marketing enthusiast passionate about content strategy and social media growth.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Edit Profile + Enrolled Programs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Profile Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-5">Edit Profile</h3>
              <div className="space-y-4">
                {/* Photo Upload */}
                <div className="flex items-center gap-4 pb-4 border-b border-border/40">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center text-lg font-bold text-accent shrink-0">
                    AB
                  </div>
                  <div>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border/60 text-sm text-text-primary hover:border-accent/30 transition-colors">
                      <Camera className="h-3.5 w-3.5" />
                      Upload photo
                    </button>
                    <p className="text-[11px] text-text-muted mt-1">PNG, JPG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1.5 block">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-border/60 bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-4 w-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-secondary w-20 shrink-0">LinkedIn</span>
                    <input
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="flex-1 h-9 rounded-lg border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-secondary w-20 shrink-0">Twitter</span>
                    <input
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      className="flex-1 h-9 rounded-lg border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-secondary w-20 shrink-0">Portfolio</span>
                    <input
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      className="flex-1 h-9 rounded-lg border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    {saved ? (
                      <>
                        <Save className="h-4 w-4 text-emerald-300" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enrolled Programs */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-accent" />
              <h3 className="text-lg font-semibold text-text-primary">Enrolled Programs</h3>
            </div>
            <div className="space-y-3">
              {enrolledPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  variants={fadeUp}
                  className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 hover:border-border-hover transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-text-primary">{program.title}</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {program.completedLessons}/{program.totalLessons} lessons completed
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-accent shrink-0">{program.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${program.progress === 100 ? "bg-emerald-500" : "bg-accent"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${program.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
                    />
                  </div>
                  {program.progress === 100 && (
                    <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Completed — Certificate earned
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-4 w-4 text-accent" />
              <h3 className="text-lg font-semibold text-text-primary">Certificates</h3>
            </div>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-border-hover transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
                    <Award className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary">{cert.title}</h4>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Earned {cert.date} · ID: {cert.credentialId}
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border/60 text-xs font-medium text-text-primary hover:border-accent/30 transition-colors shrink-0">
                    <Download className="h-3 w-3" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column — Account Settings */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
          {/* Change Password */}
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-text-primary">Change Password</h3>
            </div>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors"
              />
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Email Preferences</h3>
            <div className="space-y-4">
              {emailPreferences.map((pref) => (
                <div key={pref.key} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-text-primary">{pref.label}</p>
                    <p className="text-[11px] text-text-muted">{pref.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={prefs[pref.key]}
                      onChange={() => togglePref(pref.key)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 rounded-full bg-border peer-checked:bg-accent after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-bg-secondary/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-400 mb-2">Danger Zone</h3>
            <p className="text-[11px] text-text-muted mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-400/30 text-red-400 text-sm font-medium hover:bg-red-400/10 transition-colors">
              <Trash2 className="h-3.5 w-3.5" />
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
