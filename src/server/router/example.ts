import { createRouter } from './context'
import { z } from 'zod'

export const exampleRouter = createRouter()
  .mutation('addExample', {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.example.create({
        data: {
          text: input.text,
        },
      })
    },
  })
  .mutation('deleteAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.example.deleteMany()
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany()
    },
  })
