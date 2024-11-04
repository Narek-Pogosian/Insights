"use client";

import SurveyBuilder from "@/components/surveybuilder";
import SurveybuilderProvider from "@/components/surveybuilder/context";
import { parsePrismaJson } from "@/lib/utils";
import { surveySchema } from "@/lib/zod/survey-schemas";
import { notFound } from "next/navigation";
import { api } from "@/trpc/react";

function EditPage({ params }: { params: { id: string } }) {
  const { data, isPending } = api.survey.getSurveyById.useQuery(params.id);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    const { data: fields, success } = surveySchema.safeParse(
      parsePrismaJson(data.content),
    );
    if (!data || !success) notFound();

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
}

export default EditPage;
