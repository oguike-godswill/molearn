const { PrismaClient } = require("@prisma/client")
const { PrismaNeon } = require("@prisma/adapter-neon")
const bcrypt = require("bcryptjs")
const fs = require("fs")
const path = require("path")

const envPath = path.join(__dirname, "..", ".env")
const envContent = fs.readFileSync(envPath, "utf-8")
for (const line of envContent.split("\n")) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) continue
  const eq = trimmed.indexOf("=")
  if (eq === -1) continue
  const key = trimmed.slice(0, eq).trim()
  const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "")
  if (!process.env[key]) process.env[key] = value
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await bcrypt.hash("password123", 10)

  // Seed users
  const admin = await prisma.user.upsert({
    where: { email: "admin@molearn.com" },
    update: {},
    create: {
      email: "admin@molearn.com",
      name: "Alex Thompson",
      password,
      role: "ADMIN",
      bio: "Platform administrator and founder of molearn.",
      image: "https://api.dicebear.com/9.x/initials/svg?seed=AT&backgroundColor=5b6bf7",
    },
  })

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@molearn.com" },
    update: {},
    create: {
      email: "teacher@molearn.com",
      name: "Sarah Chen",
      password,
      role: "TEACHER",
      bio: "Senior full-stack developer with 10+ years of experience. Passionate about teaching and mentoring.",
      image: "https://api.dicebear.com/9.x/initials/svg?seed=SC&backgroundColor=10b981",
      stripeAccountId: "acct_teacher_mock",
    },
  })

  const agent = await prisma.user.upsert({
    where: { email: "agent@molearn.com" },
    update: {},
    create: {
      email: "agent@molearn.com",
      name: "Marcus Rivera",
      password,
      role: "AGENT",
      bio: "Content quality specialist ensuring every course meets our standards.",
      image: "https://api.dicebear.com/9.x/initials/svg?seed=MR&backgroundColor=f59e0b",
    },
  })

  const student = await prisma.user.upsert({
    where: { email: "student@molearn.com" },
    update: {},
    create: {
      email: "student@molearn.com",
      name: "Emily Watson",
      password,
      role: "STUDENT",
      bio: "Lifelong learner exploring web development and design.",
      image: "https://api.dicebear.com/9.x/initials/svg?seed=EW&backgroundColor=8b5cf6",
    },
  })

  // Seed categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "web-development", }, update: {}, create: { name: "Web Development", slug: "web-development", icon: "Globe" } }),
    prisma.category.upsert({ where: { slug: "mobile", }, update: {}, create: { name: "Mobile Development", slug: "mobile", icon: "Code2" } }),
    prisma.category.upsert({ where: { slug: "data-science", }, update: {}, create: { name: "Data Science", slug: "data-science", icon: "Layers" } }),
    prisma.category.upsert({ where: { slug: "design", }, update: {}, create: { name: "Design", slug: "design", icon: "Film" } }),
    prisma.category.upsert({ where: { slug: "devops", }, update: {}, create: { name: "DevOps", slug: "devops", icon: "Users" } }),
  ])

  // Seed products
  const products = [
    { title: "React from Zero to Production", description: "Build and deploy production-ready React applications with hooks, state management, and testing.", type: "VIDEO", price: 4999, status: "APPROVED", level: "Intermediate", duration: "24h", teacherId: teacher.id, categoryId: categories[0].id, thumbnail: "https://picsum.photos/seed/react/400/225" },
    { title: "Advanced TypeScript Patterns", description: "Master advanced TypeScript patterns including generics, conditional types, and mapped types.", type: "BOOK", price: 2999, status: "APPROVED", level: "Advanced", duration: "420p", teacherId: teacher.id, categoryId: categories[0].id, thumbnail: "https://picsum.photos/seed/typescript/400/225" },
    { title: "Python for Data Science", description: "Learn Python programming from scratch with real-world data science projects and exercises.", type: "VIDEO", price: 5999, status: "APPROVED", level: "Beginner", duration: "32h", teacherId: teacher.id, categoryId: categories[2].id, thumbnail: "https://picsum.photos/seed/python/400/225" },
    { title: "UI/UX Design Fundamentals", description: "Master the principles of user interface and user experience design with practical exercises.", type: "VIDEO", price: 3999, status: "APPROVED", level: "Beginner", duration: "18h", teacherId: teacher.id, categoryId: categories[3].id, thumbnail: "https://picsum.photos/seed/design/400/225" },
    { title: "Node.js Microservices", description: "Design, build, and deploy scalable microservices using Node.js, Docker, and Kubernetes.", type: "BOOK", price: 3499, status: "APPROVED", level: "Advanced", duration: "480p", teacherId: teacher.id, categoryId: categories[4].id, thumbnail: "https://picsum.photos/seed/nodejs/400/225" },
    { title: "Flutter Mobile Development", description: "Build beautiful cross-platform mobile apps with Flutter and Dart from scratch.", type: "VIDEO", price: 4499, status: "PENDING", level: "Intermediate", duration: "28h", teacherId: teacher.id, categoryId: categories[1].id, thumbnail: "https://picsum.photos/seed/flutter/400/225" },
    { title: "Machine Learning A-Z", description: "Comprehensive guide to machine learning algorithms, from linear regression to deep learning.", type: "VIDEO", price: 6999, status: "APPROVED", level: "Intermediate", duration: "40h", teacherId: teacher.id, categoryId: categories[2].id, thumbnail: "https://picsum.photos/seed/ml/400/225" },
    { title: "CSS Mastery", description: "Modern CSS techniques including Grid, Flexbox, animations, and custom properties.", type: "BOOK", price: 1999, status: "APPROVED", level: "Intermediate", duration: "320p", teacherId: teacher.id, categoryId: categories[0].id, thumbnail: "https://picsum.photos/seed/css/400/225" },
  ]

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { title: product.title, teacherId: product.teacherId } })
    if (!existing) {
      await prisma.product.create({ data: product })
    }
  }

  // Seed reviews
  const allProducts = await prisma.product.findMany({ where: { status: "APPROVED" } })
  for (const product of allProducts) {
    const existing = await prisma.review.findFirst({ where: { productId: product.id, userId: student.id } })
    if (!existing) {
      await prisma.review.create({
        data: { rating: Math.floor(Math.random() * 2) + 4, comment: "Excellent course! Well-structured and easy to follow.", productId: product.id, userId: student.id },
      })
    }
  }

  // Seed purchases and enrollments
  for (const product of allProducts.slice(0, 4)) {
    const existingPurchase = await prisma.purchase.findFirst({ where: { productId: product.id, buyerId: student.id } })
    if (!existingPurchase) {
      await prisma.purchase.create({
        data: {
          amount: product.price,
          fee: Math.round(product.price * 0.2),
          teacherAmount: Math.round(product.price * 0.8),
          productId: product.id,
          buyerId: student.id,
        },
      })
    }
    const existingEnrollment = await prisma.enrollment.findFirst({ where: { productId: product.id, studentId: student.id } })
    if (!existingEnrollment) {
      await prisma.enrollment.create({
        data: { progress: Math.random(), productId: product.id, studentId: student.id },
      })
    }
  }

  // Seed notifications
  const notifications = [
    { title: "Course Approved", message: "Your course 'React from Zero to Production' has been approved and is now live.", type: "success", userId: teacher.id },
    { title: "New Sale", message: "You made a sale of $49.99 on 'Advanced TypeScript Patterns'.", type: "sale", userId: teacher.id },
    { title: "Pending Review", message: "New course 'Flutter Mobile Development' is awaiting your review.", type: "review", userId: agent.id },
    { title: "Welcome to molearn", message: "Welcome! Start exploring courses and books from expert instructors.", type: "info", userId: student.id },
  ]

  for (const notif of notifications) {
    const existing = await prisma.notification.findFirst({ where: { title: notif.title, userId: notif.userId } })
    if (!existing) {
      await prisma.notification.create({ data: notif })
    }
  }

  console.log("Seed completed successfully!")
  console.log("---")
  console.log("Admin:   admin@molearn.com / password123")
  console.log("Teacher: teacher@molearn.com / password123")
  console.log("Agent:   agent@molearn.com / password123")
  console.log("Student: student@molearn.com / password123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
