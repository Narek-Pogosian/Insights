import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const surveyRouter = createTRPCRouter({
  getAllSurveys: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.survey.findMany({ where: { userId: ctx.session.user.id } });
  }),
});
