import { useContext } from "react";
import { SurveybuilderContext } from "../context/index";

export const useSurveybuilder = () => {
  const context = useContext(SurveybuilderContext);

  if (!context)
    throw new Error("useSurveybuilder must be inside a SurveybuilderProvider");

  return context;
};
