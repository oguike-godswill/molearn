"use server"

import { prisma } from "@/lib/db"

export async function getPrograms() {
  try {
    const programs = await prisma.program.findMany({
      where: { published: true },
      include: {
        cohorts: {
          orderBy: { startDate: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    })
    return programs
  } catch (error) {
    console.error("Failed to fetch programs:", error)
    return []
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    const program = await prisma.program.findUnique({
      where: { slug, published: true },
      include: {
        cohorts: {
          orderBy: { startDate: "asc" },
        },
        curriculum: {
          orderBy: { order: "asc" },
        },
      },
    })
    return program
  } catch (error) {
    console.error("Failed to fetch program:", error)
    return null
  }
}

export async function getTestimonials(limit?: number) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
    })
    return testimonials
  } catch (error) {
    console.error("Failed to fetch testimonials:", error)
    return []
  }
}

export async function submitApplication(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  experience: string
  motivation: string
  referral?: string
  programId: string
  cohortId?: string
}) {
  try {
    const application = await prisma.programApplication.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        experience: data.experience,
        motivation: data.motivation,
        referral: data.referral || null,
        programId: data.programId,
        cohortId: data.cohortId || null,
      },
    })

    if (data.cohortId) {
      await prisma.cohort.update({
        where: { id: data.cohortId },
        data: { spotsLeft: { decrement: 1 } },
      })
    }

    return { success: true, applicationId: application.id }
  } catch (error) {
    console.error("Failed to submit application:", error)
    return { success: false, error: "Failed to submit application" }
  }
}

export async function getCohortStats() {
  try {
    const totalPrograms = await prisma.program.count({ where: { published: true } })
    const totalApplications = await prisma.programApplication.count()
    const totalCohorts = await prisma.cohort.count()

    return {
      programs: totalPrograms,
      applications: totalApplications,
      cohorts: totalCohorts,
    }
  } catch (error) {
    console.error("Failed to fetch cohort stats:", error)
    return { programs: 0, applications: 0, cohorts: 0 }
  }
}
