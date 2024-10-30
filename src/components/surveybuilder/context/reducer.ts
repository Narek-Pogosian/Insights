import { type SurveybuilderActions, type SurveybuilderState } from "./types";

export const surveybuilderReducer = (
  state: SurveybuilderState,
  action: SurveybuilderActions,
): SurveybuilderState => {
  switch (action.type) {
    case "EDIT_TITLE": {
      return {
        ...state,
        title: action.payload,
      };
    }

    case "REMOVE_FIELD": {
      return {
        ...state,
        fields: state.fields.filter((f) => f.id !== action.payload),
      };
    }

    case "ADD_FIELD": {
      return {
        ...state,
        fields: [...state.fields, action.payload],
      };
    }

    case "EDIT_FIELD": {
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id !== action.payload.id ? { ...f } : action.payload,
        ),
      };
    }

    case "SET_FIELDS": {
      return {
        ...state,
        fields: action.payload,
      };
    }

    case "RESET": {
      return {
        title: "",
        fields: [],
      };
    }

    default: {
      return state;
    }
  }
};
