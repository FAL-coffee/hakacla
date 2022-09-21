import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function seed() {
  await prisma.example.deleteMany()
  for (let i = 0; i < 10; i++) {
    await prisma.example.create({ data: { text: `seed example ${i}` } })
  }
}

seed()
