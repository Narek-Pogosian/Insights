import { type Metadata } from "next";
import { parsePrismaJson } from "@/lib/utils";
import { surveySchema } from "@/lib/zod/survey-schemas";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import SurveyRendererAnswer from "@/components/surveyrenderer/surveyrenderer-answer";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const survey = await api.survey.getSurveyById(params.id);
  if (!survey) notFound();

  return {
    title: survey.title,
    description: "",
    openGraph: {
      type: "website",
      siteName: "Insights",
      title: survey.title,
      url: process.env.VERCEL_URL + "/survey/" + params.id,
    },
    twitter: {
      title: survey.title,
      site: process.env.VERCEL_URL + "/survey/" + params.id,
    },
  };
}

async function Survey({ params }: { params: { id: string } }) {
  const survey = await api.survey.getSurveyById(params.id);

  if (!survey || survey.status !== "PUBLISHED") notFound();

  const { data, success } = surveySchema.safeParse(
    parsePrismaJson(survey.content),
  );

  if (!data || !success) notFound();

  return (
    <div className="py-8 md:py-10">
      <h1 className="mb-10 text-center text-2xl font-bold md:text-3xl">
        {survey.title}
      </h1>
      <SurveyRendererAnswer id={params.id} survey={data} />
    </div>
  );
}

export default Survey;
