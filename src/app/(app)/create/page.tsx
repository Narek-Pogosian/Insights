import SurveyBuilder from "@/components/surveybuilder";
import PageTitle from "../_components/page-title";
import SurveybuilderProvider from "@/components/surveybuilder/context";

function Create() {
  return (
    <>
      <PageTitle>Create</PageTitle>
      <SurveybuilderProvider mode="create">
        <SurveyBuilder mode="create" />
      </SurveybuilderProvider>
    </>
  );
}

export default Create;
