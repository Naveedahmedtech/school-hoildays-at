const { PrismaClient } = require("@prisma/client");

const prisma =
  global.prisma ||
  new PrismaClient({ log: ["query", "info", "warn", "error"] });

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
  console.log("Using cached connection.");
}

module.exports = { prisma };
