"use client";

import SurveyRenderer from ".";
import { type SurveySchema } from "@/lib/zod/survey-schemas";
import { toast } from "sonner";

interface Props {
  survey: SurveySchema;
}

function SurveyRendererPreview({ survey }: Props) {
  function onSubmit() {
    toast("Preview survey submitted without errors", {
      position: "bottom-center",
    });
  }

  return <SurveyRenderer survey={survey} onSubmit={onSubmit} />;
}

export default SurveyRendererPreview;
