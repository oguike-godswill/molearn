"use client"

import { Button } from "@/components/ui/button"
import { User, Shield, Bell, CreditCard, Palette, Save, Camera, Link as LinkIcon } from "lucide-react"
import { useState } from "react"

type Tab = "profile" | "account" | "notifications" | "billing" | "appearance"

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
  { id: "account", label: "Account", icon: <Shield className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
  { id: "appearance", label: "Appearance", icon: <Palette className="h-4 w-4" /> },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="flex lg:flex-col gap-1 w-full lg:w-48 lg:shrink-0 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50 border border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <>
              {/* Avatar */}
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Profile picture</h2>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent relative overflow-hidden">
                    JD
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <Button size="sm" variant="secondary">Upload new</Button>
                    <p className="text-xs text-text-muted mt-1">PNG, JPG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              {/* Personal info */}
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Personal information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">First name</label>
                    <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" defaultValue="John" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Last name</label>
                    <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" defaultValue="Doe" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Display name</label>
                    <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" defaultValue="John Doe" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Bio</label>
                    <textarea className="w-full rounded-xl border border-border/60 bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors min-h-[100px]" defaultValue="Full-stack developer passionate about teaching." />
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Social links</h2>
                <div className="space-y-3">
                  {["GitHub", "Twitter", "LinkedIn", "Website"].map((social) => (
                    <div key={social} className="flex items-center gap-3">
                      <LinkIcon className="h-4 w-4 text-text-muted" />
                      <span className="text-sm text-text-secondary w-20">{social}</span>
                      <input className="flex-1 h-9 rounded-lg border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" placeholder={`https://${social.toLowerCase()}.com/...`} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "account" && (
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-text-primary mb-4">Account details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email</label>
                    <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">Role</label>
                    <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-muted outline-none cursor-not-allowed" defaultValue="Student" disabled />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Change password</h2>
                <div className="space-y-3 max-w-md">
                  <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" type="password" placeholder="Current password" />
                  <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" type="password" placeholder="New password" />
                  <input className="w-full h-10 rounded-xl border border-border/60 bg-bg-secondary px-3 text-sm text-text-primary outline-none focus:border-accent transition-colors" type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="border-t border-border/40 pt-6">
                <h2 className="text-sm font-semibold text-red-400 mb-4">Danger zone</h2>
                <Button variant="secondary" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                  Delete account
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-text-primary mb-4">Notification preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Course updates", desc: "When a course you're enrolled in is updated" },
                  { label: "New courses", desc: "When new courses are published in your areas" },
                  { label: "Promotions", desc: "Sales, discounts, and special offers" },
                  { label: "Q&A replies", desc: "When someone replies to your question" },
                  { label: "Review responses", desc: "When an instructor responds to your review" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 rounded-full bg-border peer-checked:bg-accent after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Payment methods</h2>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated border border-border/40">
                  <CreditCard className="h-5 w-5 text-text-muted" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">Visa ending in 4242</p>
                    <p className="text-xs text-text-muted">Expires 12/2027</p>
                  </div>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Default</span>
                </div>
                <Button size="sm" variant="secondary" className="mt-3">Add payment method</Button>
              </div>

              <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Billing history</h2>
                <div className="space-y-2">
                  {[{ date: "Jul 15, 2026", amount: "$49.99", item: "React from Zero to Production" },
                    { date: "Jun 28, 2026", amount: "$29.99", item: "UI/UX Masterclass" },
                    { date: "May 10, 2026", amount: "$39.99", item: "Node.js Backend Pro" },
                  ].map((b) => (
                    <div key={b.date} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                      <div>
                        <p className="text-sm text-text-primary">{b.item}</p>
                        <p className="text-xs text-text-muted">{b.date}</p>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{b.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-text-primary mb-4">Theme</h2>
                <div className="flex gap-3">
                  {["Dark", "Light", "System"].map((t) => (
                    <button key={t} className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                      t === "Dark"
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "border-border/60 text-text-secondary hover:border-border"
                    }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/40 pt-6">
                <h2 className="text-sm font-semibold text-text-primary mb-4">Layout</h2>
                <div className="flex gap-3">
                  {["Compact", "Comfortable"].map((l) => (
                    <button key={l} className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                      l === "Comfortable"
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "border-border/60 text-text-secondary hover:border-border"
                    }`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} className="gap-2">
              {saved ? (
                <><Save className="h-4 w-4 text-emerald-400" /> Saved!</>
              ) : (
                <><Save className="h-4 w-4" /> Save changes</>
              )}
            </Button>
            <Button variant="secondary" onClick={() => {}}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
