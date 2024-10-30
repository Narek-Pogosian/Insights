"use client";

import { type SurveybuilderActions, type SurveybuilderState } from "./types";
import { type SurveySchema } from "@/lib/zod/survey-schemas";
import { createContext, useReducer } from "react";
import { surveybuilderReducer } from "./reducer";

type ContextType = {
  state: SurveybuilderState;
  dispatch: React.Dispatch<SurveybuilderActions>;
};

export const SurveybuilderContext = createContext<ContextType | null>(null);

interface Props {
  mode: "create" | "edit";
  children: React.ReactNode;
}

interface CreateProps extends Props {
  mode: "create";
}

interface UpdateProps extends Props {
  mode: "edit";
  defaultFields: SurveySchema;
  defaultTitle: string;
}

function SurveybuilderProvider(props: CreateProps | UpdateProps) {
  const [state, dispatch] = useReducer(surveybuilderReducer, {
    title: props.mode === "edit" ? props.defaultTitle : "",
    fields: props.mode === "edit" ? props.defaultFields : [],
  });

  return (
    <SurveybuilderContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SurveybuilderContext.Provider>
  );
}

export default SurveybuilderProvider;
