import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { surveyRouter } from "./routers/survey";
import { answerRouter } from "./routers/answer";

export const appRouter = createTRPCRouter({
  survey: surveyRouter,
  answer: answerRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
