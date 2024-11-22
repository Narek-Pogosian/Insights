import { api, HydrateClient } from "@/trpc/server";
import PageTitle from "./_components/page-title";
import SurveysList from "./surveys/_components/surveys-list";

function Surveys() {
  void api.survey.getAllSurveys.prefetch();

  return (
    <HydrateClient>
      <PageTitle>Your Surveys</PageTitle>
      <SurveysList />
    </HydrateClient>
  );
}

export default Surveys;
