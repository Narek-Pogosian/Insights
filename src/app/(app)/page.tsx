import { getForms } from "@/server/data-access/form";
import SurveysList from "./surveys/_components/surveys-list";
import PageTitle from "./_components/page-title";

async function FormsPage() {
  const surveys = await getForms();

  return (
    <>
      <PageTitle>Your Surveys</PageTitle>
      <SurveysList surveys={surveys} />
    </>
  );
}

export default FormsPage;
