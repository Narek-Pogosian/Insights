import {
  type SurveySchema,
  type SurveySchemaField,
} from "@/lib/zod/survey-schemas";

export type SurveybuilderState = { title: string; fields: SurveySchema };
export type SurveybuilderActions =
  | { type: "EDIT_TITLE"; payload: string }
  | { type: "REMOVE_FIELD"; payload: string }
  | { type: "ADD_FIELD"; payload: SurveySchemaField }
  | { type: "EDIT_FIELD"; payload: SurveySchemaField }
  | { type: "SET_FIELDS"; payload: SurveySchema }
  | { type: "RESET" };
