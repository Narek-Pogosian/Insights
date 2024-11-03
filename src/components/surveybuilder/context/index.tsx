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
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("title") ?? "";
}

function getFieldsFromStorage() {
  if (typeof window === "undefined") return [];
  const fields = sessionStorage.getItem("fields");
  if (!fields) return [];

  try {
    return surveySchema.parse(JSON.parse(fields));
    // eslint-disable-next-line
  } catch (e) {
    return [];
  }
}

function SurveybuilderProvider(props: CreateProps | UpdateProps) {
  const [state, dispatch] = useReducer(surveybuilderReducer, {
    title: props.mode === "edit" ? props.defaultTitle : "",
    fields: props.mode === "edit" ? props.defaultFields : [],
  });

  useEffect(() => {
    if (props.mode === "create") {
      const title = getTitleFromStorage();
      const fields = getFieldsFromStorage();

      if (title) {
        dispatch({ type: "EDIT_TITLE", payload: title });
      }
      if (fields.length > 0) {
        dispatch({ type: "SET_FIELDS", payload: fields });
      }
    }
  }, [props.mode]);

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
