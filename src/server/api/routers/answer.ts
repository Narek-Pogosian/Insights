import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { headers } from "next/headers";
import { z } from "zod";

export const answerRouter = createTRPCRouter({
  answer: publicProcedure
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
});
