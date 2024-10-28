import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { surveyRouter } from "./routers/survey";

export const appRouter = createTRPCRouter({
  survey: surveyRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
