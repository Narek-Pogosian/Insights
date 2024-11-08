import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { z } from "zod";

export const responseRouter = createTRPCRouter({
  respond: publicProcedure
    .input(
      z.object({
        surveyId: z.string(),
        answers: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ip = headers().get("x-forwarded-for") ?? "kek";

      const answered = await ctx.db.response.findFirst({
        where: { surveyId: input.surveyId, respondent: ip },
      });

      if (answered) return "Answered";

      const [createResponse] = await Promise.all([
        ctx.db.response
          .create({
            data: {
              answers: input.answers,
              surveyId: input.surveyId,
              respondent: ip,
            },
          })
          .catch(() => null),
        ctx.db.survey
          .update({
            where: { id: input.surveyId },
            data: {
              responseCount: { increment: 1 },
            },
          })
          .catch(() => null),
      ]);

      if (createResponse) return "Success";

      return "Failed";
    }),

  getResponses: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const survey = await ctx.db.survey.findFirst({ where: { id: input } });

      if (!survey) throw new TRPCError({ code: "NOT_FOUND" });
      if (survey.userId !== ctx.session.user.id)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      return ctx.db.response.findMany({ where: { surveyId: input } });
    }),
});
