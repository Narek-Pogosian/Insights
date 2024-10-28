import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          title: input.name,
        },
      });
    }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany();
  }),

  deletePost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.delete({ where: { id: input.id } });
    }),

  toggleComplete: publicProcedure
    .input(z.object({ id: z.number(), isComplete: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return ctx.db.post.update({
        where: { id: input.id },
        data: { isComplete: input.isComplete },
      });
    }),
});
