import { createSurveyScema } from "@/lib/zod/survey-schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const surveyRouter = createTRPCRouter({
  getAllSurveys: protectedProcedure.query(({ ctx }) => {
    return ctx.db.survey.findMany({ where: { userId: ctx.session.user.id } });
  }),

  getSurveyById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.survey.findFirst({ where: { id: input } });
  }),

  createSurvey: protectedProcedure
    .input(createSurveyScema)
    .mutation(({ ctx, input }) => {
      console.log("userID", ctx.session.user.id);
      return ctx.db.survey.create({
        data: {
          title: input.title,
          content: JSON.stringify(input.survey),
          userId: ctx.session.user.id,
          status: "DRAFT",
        },
      });
    }),

  editSurvey: protectedProcedure
    .input(z.object({ id: z.string(), survey: createSurveyScema }))
    .mutation(async ({ ctx, input }) => {
      const survey = await ctx.db.survey.findFirst({ where: { id: input.id } });

      if (!survey) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (survey.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.survey.update({
        where: { id: input.id },
        data: {
          title: input.survey.title,
          content: JSON.stringify(input.survey.survey),
          userId: ctx.session.user.id,
        },
      });
    }),
});
