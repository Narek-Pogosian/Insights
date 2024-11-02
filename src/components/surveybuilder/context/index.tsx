"use client";

import { type SurveybuilderActions, type SurveybuilderState } from "./types";
import { surveySchema, type SurveySchema } from "@/lib/zod/survey-schemas";
import { createContext, useEffect, useReducer } from "react";
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

function getTitleFromStorage() {
  return sessionStorage.getItem("title") ?? "";
}

function getFieldsFromStorage() {
  const fields = sessionStorage.getItem("fields");
  if (!fields) return [];

  try {
    return surveySchema.parse(JSON.parse(fields));
  } catch (err) {
    console.error("Failed to parse fields from sessionStorage", err);
    return [];
  }
}

function SurveybuilderProvider(props: CreateProps | UpdateProps) {
  const [state, dispatch] = useReducer(surveybuilderReducer, {
    title: props.mode === "edit" ? props.defaultTitle : getTitleFromStorage(),
    fields:
      props.mode === "edit" ? props.defaultFields : getFieldsFromStorage(),
  });

  useEffect(() => {
    if (props.mode === "create") {
      sessionStorage.setItem("fields", JSON.stringify(state.fields));
    }
  }, [props.mode, state.fields]);

  useEffect(() => {
    if (props.mode === "create") {
      sessionStorage.setItem("title", state.title);
    }
  }, [props.mode, state.title]);

  return (
    <SurveybuilderContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SurveybuilderContext.Provider>
  );
}

export default SurveybuilderProvider;
