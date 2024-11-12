import PageTitle from "./_components/page-title";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  PieChart,
  Users,
  Calendar,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DashboardPage() {
  const stats = [
    { title: "Total Surveys", value: "12", icon: FileText },
    { title: "Total Responses", value: "1,234", icon: Users },
    { title: "Avg. Completion Rate", value: "87%", icon: PieChart },
    { title: "Active Surveys", value: "5", icon: BarChart3 },
  ];

  const recentSurveys = [
    {
      id: 1,
      title: "Customer Satisfaction Q2",
      responses: 234,
      completionRate: 92,
      created: "2023-06-15",
      status: "Active",
    },
    {
      id: 2,
      title: "Employee Engagement 2023",
      responses: 189,
      completionRate: 78,
      created: "2023-06-10",
      status: "Active",
    },
    {
      id: 3,
      title: "Product Feedback Survey",
      responses: 567,
      completionRate: 95,
      created: "2023-06-05",
      status: "Closed",
    },
  ];

  const upcomingSurveys = [
    {
      id: 1,
      title: "Customer Loyalty Program",
      scheduledDate: "2023-07-01",
      estimatedResponses: 500,
    },
    {
      id: 2,
      title: "Website Redesign Feedback",
      scheduledDate: "2023-07-15",
      estimatedResponses: 1000,
    },
    {
      id: 3,
      title: "Employee Benefits Survey",
      scheduledDate: "2023-08-01",
      estimatedResponses: 250,
    },
  ];

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="mb-8 flex space-x-4">
        <Button asChild>
          <Link href="/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Survey
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/surveys">
            <FileText className="mr-2 h-4 w-4" /> View All Surveys
          </Link>
        </Button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Surveys</CardTitle>
            <CardDescription>
              Your most recent survey activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{survey.title}</p>
                    <div className="text-gray-500 flex items-center space-x-2 text-sm">
                      <span>{survey.responses} responses</span>
                      <span>•</span>
                      <span>Created on {survey.created}</span>
                      <span>{survey.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {survey.completionRate}%
                      </div>
                      <div className="text-gray-500 text-xs">Completion</div>
                    </div>
                    {/* <Progress
                        value={survey.completionRate}
                        className="w-[60px]"
                      /> */}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Surveys</CardTitle>
            <CardDescription>Surveys scheduled for launch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {upcomingSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{survey.title}</p>
                    <div className="text-gray-500 flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{survey.scheduledDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {survey.estimatedResponses}
                    </div>
                    <div className="text-gray-500 text-xs">Est. Responses</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default DashboardPage;
