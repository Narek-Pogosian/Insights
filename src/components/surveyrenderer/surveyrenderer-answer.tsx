"use client";

import { type SurveySchema } from "@/lib/zod/survey-schemas";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import SurveyRenderer from ".";

interface Props {
  survey: SurveySchema;
  id: string;
}

function SurveyRendererAnswer({ survey, id }: Props) {
  const router = useRouter();
  const answer = api.response.respond.useMutation();

  async function onSubmit(data: unknown) {
    if (answer.isPending) return;
    const res = await answer.mutateAsync({
      surveyId: id,
      answers: JSON.stringify(data),
    });

    if (res === "Success") {
      router.replace("/survey/success");
    }

    if (res === "Answered") {
      router.replace("/survey/answered");
    }
  }

  return (
    <SurveyRenderer
      survey={survey}
      onSubmit={onSubmit}
      loading={answer.isPending}
    />
  );
}

export default SurveyRendererAnswer;
