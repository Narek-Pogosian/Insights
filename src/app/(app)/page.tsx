import DashboardContent from "./_components/dashboard-content";
import PageTitle from "./_components/page-title";
import { api, HydrateClient } from "@/trpc/server";

function DashboardPage() {
  void api.survey.getAllSurveys.prefetch();

  return (
    <HydrateClient>
      <PageTitle>Dashboard</PageTitle>
      <DashboardContent />
    </HydrateClient>
  );
}

export default DashboardPage;
