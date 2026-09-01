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

  // Seed programs
  const programsData = [
    {
      title: "Digital Marketing Cohort",
      slug: "digital-marketing-cohort",
      track: "Marketing",
      description: "Master digital marketing from strategy to execution. Learn SEO, social media, paid advertising, email marketing, and analytics.",
      price: 19900,
      duration: "12 weeks",
      mode: "Cohort",
      startDate: "March 3, 2026",
      learningOutcomes: [
        "Develop comprehensive digital marketing strategies",
        "Execute social media campaigns across platforms",
        "Set up and optimize paid advertising on Google and Meta",
        "Build email marketing funnels that convert",
        "Analyze campaign performance with Google Analytics",
        "Create content that drives organic traffic and engagement",
      ],
      whoIsThisFor: [
        "Aspiring digital marketers looking to break into the industry",
        "Business owners wanting to grow their online presence",
        "Professionals transitioning from traditional to digital marketing",
      ],
      mentorName: "Tunde Akinwale",
      mentorRole: "Head of Digital Strategy, MojeTech",
      mentorBio: "Tunde has over 8 years of experience running digital campaigns for brands like Flutterwave, Piggyvest, and Kuda. He has trained over 500 marketers across West Africa.",
      curriculum: [
        { week: "Week 1–2", title: "Foundations & Strategy", topics: ["Digital marketing landscape in Nigeria", "Setting SMART goals", "Audience research & personas", "Competitive analysis frameworks"], order: 0 },
        { week: "Week 3–4", title: "SEO & Content Marketing", topics: ["Keyword research with free tools", "On-page & technical SEO basics", "Content planning & editorial calendars", "Writing for the web"], order: 1 },
        { week: "Week 5–6", title: "Social Media Marketing", topics: ["Platform strategy (Instagram, TikTok, LinkedIn)", "Content formats & scheduling", "Community management", "Organic growth tactics"], order: 2 },
        { week: "Week 7–8", title: "Paid Advertising", topics: ["Meta Ads Manager deep-dive", "Google Ads fundamentals", "Audience targeting & retargeting", "Budget allocation & bidding strategies"], order: 3 },
        { week: "Week 9–10", title: "Email Marketing & Funnels", topics: ["Building an email list from scratch", "Welcome sequences & nurture flows", "A/B testing subject lines & CTAs", "Tools: Mailchimp, ConvertKit"], order: 4 },
        { week: "Week 11–12", title: "Analytics & Capstone", topics: ["Google Analytics 4 setup & reporting", "Attribution models", "Building a campaign dashboard", "Capstone project presentation"], order: 5 },
      ],
      cohorts: [
        { label: "Cohort 4", startDate: "March 3, 2026", endDate: "May 25, 2026", spots: 30, spotsLeft: 12 },
        { label: "Cohort 5", startDate: "June 2, 2026", endDate: "August 24, 2026", spots: 30, spotsLeft: 30 },
      ],
    },
    {
      title: "Design Fundamentals",
      slug: "design-fundamentals",
      track: "Design",
      description: "Learn color theory, typography, layout, and visual hierarchy through hands-on projects and critiques.",
      price: 14900,
      duration: "8 weeks",
      mode: "Cohort",
      startDate: "April 2026",
      learningOutcomes: [
        "Apply color theory and typography principles",
        "Create wireframes and high-fidelity mockups",
        "Conduct user research and usability testing",
        "Build a professional design portfolio",
      ],
      whoIsThisFor: [
        "Beginners interested in visual design",
        "Career switchers moving into design",
        "Freelancers wanting to improve their design skills",
      ],
      mentorName: "Amina Yusuf",
      mentorRole: "Lead Designer, MojeTech",
      mentorBio: "Amina has 6 years of experience in product design, having worked with startups across fintech and e-commerce. She is passionate about mentoring the next generation of African designers.",
      curriculum: [
        { week: "Week 1–2", title: "Design Principles", topics: ["Color theory", "Typography basics", "Layout & composition", "Visual hierarchy"], order: 0 },
        { week: "Week 3–4", title: "Digital Design Tools", topics: ["Figma fundamentals", "Components & styles", "Prototyping basics", "Design systems intro"], order: 1 },
        { week: "Week 5–6", title: "User Research", topics: ["User interviews", "Personas & journey maps", "Wireframing", "Usability testing"], order: 2 },
        { week: "Week 7–8", title: "Portfolio Project", topics: ["End-to-end design project", "Case study writing", "Portfolio presentation", "Peer review"], order: 3 },
      ],
      cohorts: [
        { label: "Cohort 1", startDate: "April 7, 2026", endDate: "May 31, 2026", spots: 25, spotsLeft: 18 },
      ],
    },
    {
      title: "Social Media Marketing",
      slug: "social-media-marketing",
      track: "Marketing",
      description: "Build and manage social presence across platforms with content calendars, ads, and analytics.",
      price: 4900,
      duration: "Self-paced",
      mode: "Self-paced",
      learningOutcomes: [
        "Create platform-specific content strategies",
        "Manage social media advertising budgets",
        "Analyze engagement metrics and optimize",
      ],
      whoIsThisFor: [
        "Small business owners managing their own social media",
        "Aspiring social media managers",
      ],
      mentorName: "Chidi Okonkwo",
      mentorRole: "Social Media Strategist",
      mentorBio: "Chidi has managed social accounts for brands reaching over 2 million followers combined.",
      curriculum: [],
      cohorts: [],
    },
    {
      title: "UI/UX Design",
      slug: "ui-ux-design",
      track: "Design",
      description: "From wireframes to high-fidelity prototypes—learn user research, interaction design, and usability testing.",
      price: 4900,
      duration: "Self-paced",
      mode: "Self-paced",
      learningOutcomes: [
        "Conduct user research and create personas",
        "Design responsive interfaces in Figma",
        "Build interactive prototypes",
      ],
      whoIsThisFor: [
        "Aspiring UI/UX designers",
        "Developers wanting to improve design skills",
      ],
      mentorName: "Fatima Bello",
      mentorRole: "UX Lead",
      mentorBio: "Fatima has designed products used by millions across Africa and Europe.",
      curriculum: [],
      cohorts: [],
    },
    {
      title: "Content Creation",
      slug: "content-creation",
      track: "Marketing",
      description: "Produce compelling content across formats—blog posts, video scripts, newsletters, and social copy.",
      price: 12900,
      duration: "6 weeks",
      mode: "Cohort",
      startDate: "May 2026",
      learningOutcomes: [
        "Write compelling blog posts and articles",
        "Create video scripts and storyboards",
        "Build and manage email newsletters",
      ],
      whoIsThisFor: [
        "Aspiring content creators",
        "Marketers looking to improve writing skills",
      ],
      mentorName: "Ngozi Igwe",
      mentorRole: "Content Strategist",
      mentorBio: "Ngozi is a freelance content strategist who has worked with top fintech brands.",
      curriculum: [],
      cohorts: [
        { label: "Cohort 1", startDate: "May 5, 2026", endDate: "June 15, 2026", spots: 20, spotsLeft: 20 },
      ],
    },
    {
      title: "Advanced Digital Strategy",
      slug: "advanced-digital-strategy",
      track: "Marketing",
      description: "Develop end-to-end digital strategies covering brand positioning, funnel design, and growth frameworks.",
      price: 24900,
      duration: "10 weeks",
      mode: "Cohort",
      startDate: "June 2026",
      learningOutcomes: [
        "Develop comprehensive digital strategies",
        "Design and optimize marketing funnels",
        "Build growth frameworks for startups",
      ],
      whoIsThisFor: [
        "Experienced marketers looking to level up",
        "Startup founders building growth teams",
      ],
      mentorName: "Tunde Akinwale",
      mentorRole: "Head of Digital Strategy, MojeTech",
      mentorBio: "Tunde brings 8 years of digital strategy experience to this advanced program.",
      curriculum: [],
      cohorts: [
        { label: "Cohort 1", startDate: "June 1, 2026", endDate: "August 10, 2026", spots: 20, spotsLeft: 20 },
      ],
    },
  ]

  for (const programData of programsData) {
    const { curriculum, cohorts, ...programFields } = programData
    const existing = await prisma.program.findUnique({ where: { slug: programFields.slug } })
    if (!existing) {
      const program = await prisma.program.create({
        data: {
          ...programFields,
          curriculum: {
            create: curriculum,
          },
          cohorts: {
            create: cohorts,
          },
        },
      })
      console.log(`Created program: ${program.title}`)
    }
  }

  // Seed testimonials
  const testimonialsData = [
    { name: "Ngozi Igwe", role: "Freelance Digital Marketer", quote: "MojeTech's Digital Marketing program changed my career trajectory. Within two months of graduating, I landed three retainer clients.", rating: 5, program: "Digital Marketing Cohort" },
    { name: "Chukwuemeka Obi", role: "Growth Lead, Fintech Startup", quote: "I came in knowing nothing about paid ads. By week 8, I was running campaigns with real budgets and getting measurable results.", rating: 5, program: "Digital Marketing Cohort" },
    { name: "Amina Yusuf", role: "E-commerce Business Owner", quote: "The ROI on this program is insane. I applied what I learned to my own business and tripled my online sales in three months.", rating: 5, program: "Digital Marketing Cohort" },
    { name: "Kemi Adeyemi", role: "Product Designer at Kuda", quote: "The Design Fundamentals program gave me the foundation I needed to break into fintech design. The mentorship was invaluable.", rating: 5, program: "Design Fundamentals" },
    { name: "David Mensah", role: "Freelance Designer", quote: "From zero design experience to landing my first client in 4 months. The hands-on projects made all the difference.", rating: 5, program: "Design Fundamentals" },
  ]

  for (const testimonial of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({ where: { name: testimonial.name, quote: testimonial.quote } })
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial })
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
