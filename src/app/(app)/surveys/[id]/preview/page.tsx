"use client";

import SurveyRenderer from "@/components/surveyrenderer";
import LoadingPage from "@/components/loading-page";
import { parsePrismaJson } from "@/lib/utils";
import { surveySchema } from "@/lib/zod/survey-schemas";
import { notFound } from "next/navigation";
import { api } from "@/trpc/react";

function PreviewPage({ params }: { params: { id: string } }) {
  const { data, isPending } = api.survey.getSurveyById.useQuery(params.id);

  if (isPending) {
    return <LoadingPage />;
  }

  if (!data) notFound();

  const { data: fields, success } = surveySchema.safeParse(
    parsePrismaJson(data.content),
  );

  if (!success) notFound();

  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        {data.title}
      </h1>
      <SurveyRenderer mode="preview" survey={fields} />
    </>
  );
}

export default PreviewPage;