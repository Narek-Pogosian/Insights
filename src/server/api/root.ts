import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { surveyRouter } from "./routers/survey";
import { responseRouter } from "./routers/response";

export const appRouter = createTRPCRouter({
  survey: surveyRouter,
  response: responseRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
