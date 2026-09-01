"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout, DashboardHeader, StatCard } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import {
  Users, GraduationCap, DollarSign, MessageSquare, Plus, BookOpen,
  Eye, Settings, TrendingUp, ArrowRight, Clock, UserPlus, CreditCard,
  Star, AlertCircle, CheckCircle,
} from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Total Students", value: "156", change: "+12%", icon: GraduationCap },
  { label: "Active Cohorts", value: "3", change: "+1", icon: Users },
  { label: "Revenue This Month", value: "$12,450", change: "+18%", icon: DollarSign },
  { label: "Pending Inquiries", value: "8", change: "-2", icon: MessageSquare },
]

const recentActivity = [
  { id: 1, icon: UserPlus, text: "New student enrolled in Cohort Alpha", time: "12 min ago", color: "text-blue-400" },
  { id: 2, icon: CreditCard, text: "Payment received: $450 from Sarah Chen", time: "28 min ago", color: "text-emerald-400" },
  { id: 3, icon: CheckCircle, text: "Course \"React Fundamentals\" published", time: "1 hour ago", color: "text-purple-400" },
  { id: 4, icon: Star, text: "New 5-star review on \"Python Basics\"", time: "2 hours ago", color: "text-amber-400" },
  { id: 5, icon: AlertCircle, text: "Inquiry from parent about Cohort Beta", time: "3 hours ago", color: "text-rose-400" },
]

const quickActions = [
  { label: "Create Cohort", icon: Plus, href: "/dashboard/admin/cohorts/new", color: "bg-blue-600" },
  { label: "Add Course", icon: BookOpen, href: "/dashboard/admin/content", color: "bg-purple-600" },
  { label: "View Inquiries", icon: Eye, href: "/dashboard/admin/inquiries", color: "bg-amber-600" },
  { label: "Manage Users", icon: Settings, href: "/dashboard/admin/users", color: "bg-emerald-600" },
]

const revenueBars = [
  { label: "Mon", value: 1200 },
  { label: "Tue", value: 1800 },
  { label: "Wed", value: 1400 },
  { label: "Thu", value: 2200 },
  { label: "Fri", value: 1900 },
  { label: "Sat", value: 2600 },
  { label: "Sun", value: 1350 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function AdminDashboard() {
  const maxRevenue = Math.max(...revenueBars.map((b) => b.value))

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader
        title="Admin Dashboard"
        description="Welcome back. Here's your platform overview."
      />

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <StatCard icon={stat.icon} label={stat.label} value={stat.value} change={stat.change} />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions + Revenue Chart */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3.5 rounded-lg border border-border/40 hover:border-accent/40 hover:bg-bg-elevated/50 transition-all group"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.color} shrink-0`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                  {action.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Revenue This Week</h3>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-end gap-2 h-44">
            {revenueBars.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-text-muted font-medium">${(bar.value / 1000).toFixed(1)}k</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(bar.value / maxRevenue) * 140}px` }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" as const }}
                  className="w-full bg-accent/80 rounded-t-md hover:bg-accent transition-colors cursor-pointer"
                />
                <span className="text-[10px] text-text-muted">{bar.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
          <Clock className="h-4 w-4 text-text-muted" />
        </div>
        <div className="space-y-0">
          {recentActivity.map((event, i) => (
            <div
              key={event.id}
              className={`flex items-start gap-3 py-3.5 ${i < recentActivity.length - 1 ? "border-b border-border/20" : ""}`}
            >
              <div className="p-1.5 rounded-lg bg-bg-elevated flex-shrink-0">
                <event.icon className={`h-3.5 w-3.5 ${event.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">{event.text}</p>
                <span className="text-[10px] text-text-muted">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
