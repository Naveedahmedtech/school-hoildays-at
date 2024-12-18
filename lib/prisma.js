const { PrismaClient } = require("../prisma/generated/client");

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

module.exports = prisma;
