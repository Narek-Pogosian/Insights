import { api } from "@/trpc/server";

async function Surveys() {
  const surveys = await api.survey.getAllSurveys();

  return <div>{JSON.stringify(surveys, null, 2)}</div>;
}

export default Surveys;
