import SurveyBuilder from "@/components/surveybuilder";
import PageTitle from "../_components/page-title";

function Create() {
  return (
    <>
      <PageTitle>Create</PageTitle>
      <SurveyBuilder mode="create" />
    </>
  );
}

export default Create;
