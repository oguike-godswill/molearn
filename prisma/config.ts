export default {
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
  migrations: {
    seed: "node --env-file .env prisma/seed.js",
  },
}
