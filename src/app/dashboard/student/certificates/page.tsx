"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout, DashboardHeader } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import {
  Award,
  Download,
  Share2,
  Link2,
  ExternalLink,
  CheckCircle,
  Clock,
  ArrowRight,
  Copy,
  GraduationCap,
  Sparkles,
} from "lucide-react"

const earnedCertificates = [
  {
    id: "cert-1",
    title: "Digital Marketing Professional",
    program: "Digital Marketing Fundamentals",
    completionDate: "December 20, 2025",
    certificateId: "MT-DM-2026-0042",
    studentName: "Alex Johnson",
  },
]

const inProgressCertificates = [
  {
    id: "prog-1",
    program: "Design Fundamentals",
    progress: 12,
    completedModules: 3,
    totalModules: 24,
    estimatedCompletion: "March 2026",
  },
  {
    id: "prog-2",
    program: "Advanced SEO & Analytics",
    progress: 0,
    completedModules: 0,
    totalModules: 18,
    estimatedCompletion: "April 2026",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
}

export default function CertificatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyLink = (certId: string) => {
    navigator.clipboard.writeText(`https://mojetech.com/certificates/${certId}`)
    setCopiedId(certId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <DashboardLayout role="STUDENT">
      <DashboardHeader
        title="Certificates"
        description="View your earned certificates and track progress toward new ones."
      />

      {/* Earned Certificates */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Award className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Earned Certificates</h2>
          <span className="text-xs text-text-muted bg-bg-secondary/50 border border-border/60 rounded-full px-2 py-0.5">
            {earnedCertificates.length}
          </span>
        </div>

        <motion.div
          className="grid gap-5 lg:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {earnedCertificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={item}
              className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 shrink-0">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-text-primary">{cert.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{cert.program}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                <div>
                  <p className="text-text-muted mb-0.5">Completion Date</p>
                  <p className="text-text-primary font-medium">{cert.completionDate}</p>
                </div>
                <div>
                  <p className="text-text-muted mb-0.5">Certificate ID</p>
                  <p className="text-text-primary font-mono font-medium">{cert.certificateId}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </Button>
                <Button variant="secondary" size="sm">
                  <Share2 className="h-3.5 w-3.5" />
                  Share on LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyLink(cert.certificateId)}
                >
                  {copiedId === cert.certificateId ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Certificate Preview */}
      {earnedCertificates.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-text-primary">Certificate Preview</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-6 overflow-hidden">
              <div className="relative bg-bg-elevated border border-border/40 rounded-lg p-8 sm:p-10 text-center max-w-2xl mx-auto">
                {/* Decorative border */}
                <div className="absolute inset-3 border border-accent/15 rounded-md pointer-events-none" />
                <div className="absolute inset-5 border border-accent/8 rounded-sm pointer-events-none" />

                {/* Logo placeholder */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <GraduationCap className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm font-bold tracking-wider text-text-primary uppercase">
                    MojeTech
                  </span>
                </div>

                {/* Certificate content */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">
                  Certificate of Completion
                </p>
                <div className="w-16 h-px bg-accent/30 mx-auto mb-4" />

                <p className="text-xs text-text-muted mb-1">This is to certify that</p>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
                  {earnedCertificates[0].studentName}
                </h3>

                <p className="text-xs text-text-muted mb-1">has successfully completed</p>
                <p className="text-base font-semibold text-accent mb-4">
                  {earnedCertificates[0].program}
                </p>

                <div className="flex items-center justify-center gap-6 text-xs text-text-muted mb-6">
                  <span>Date: {earnedCertificates[0].completionDate}</span>
                  <span className="font-mono">ID: {earnedCertificates[0].certificateId}</span>
                </div>

                {/* Signature line */}
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="w-24 h-px bg-border mx-auto mb-1" />
                    <p className="text-[10px] text-text-muted">Program Director</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-px bg-border mx-auto mb-1" />
                    <p className="text-[10px] text-text-muted">CEO, MojeTech</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* In-Progress Certificates */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">In Progress</h2>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {inProgressCertificates.map((prog) => (
            <motion.div
              key={prog.id}
              variants={item}
              className="bg-bg-secondary/50 backdrop-blur-sm border border-border/60 rounded-xl p-5 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary">{prog.program}</h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {prog.completedModules}/{prog.totalModules} modules completed
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-muted">Progress</span>
                  <span className="text-xs font-semibold text-accent">{prog.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${prog.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-text-muted">
                  Est. {prog.estimatedCompletion}
                </span>
                <Button variant="secondary" size="sm">
                  <ArrowRight className="h-3.5 w-3.5" />
                  Continue Learning
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </DashboardLayout>
  )
}
