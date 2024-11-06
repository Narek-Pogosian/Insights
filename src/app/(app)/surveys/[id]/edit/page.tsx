"use client";

import SurveybuilderProvider from "@/components/surveybuilder/context";
import SurveyBuilder from "@/components/surveybuilder";
import LoadingPage from "@/components/loading-page";
import { parsePrismaJson } from "@/lib/utils";
import { surveySchema } from "@/lib/zod/survey-schemas";
import { notFound } from "next/navigation";
import { api } from "@/trpc/react";

function EditPage({ params }: { params: { id: string } }) {
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
    <SurveybuilderProvider
      mode="edit"
      defaultTitle={data.title}
      defaultFields={fields}
    >
      <SurveyBuilder mode="edit" id={data.id} />
    </SurveybuilderProvider>
  );
}

export default EditPage;
