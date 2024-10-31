import SurveyBuilder from "@/components/surveybuilder";
import SurveybuilderProvider from "@/components/surveybuilder/context";

function Create() {
  return (
    <>
      <SurveybuilderProvider mode="create">
        <SurveyBuilder mode="create" />
      </SurveybuilderProvider>
    </>
  );
}

export default Create;
