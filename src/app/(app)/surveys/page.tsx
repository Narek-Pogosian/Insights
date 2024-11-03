import { api, HydrateClient } from "@/trpc/server";
import SurveysList from "./_components/surveys-list";
import PageTitle from "../_components/page-title";

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
