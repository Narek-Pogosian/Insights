import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Users, PlusCircle, Send } from "lucide-react";
import PageTitle from "./_components/page-title";
import Link from "next/link";

export default function SurveyDashboard() {
  return (
    <>
      <PageTitle>Survey Dashboard</PageTitle>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Surveys</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-xs">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Responses</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Surveys</CardTitle>
            <Send className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-muted-foreground text-xs">3 closing this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card className="h-fit md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Create or manage your surveys</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Survey
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/surveys">View All Surveys</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Surveys</CardTitle>
            <CardDescription>
              Your 5 most recent surveys and their response rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Customer Satisfaction Q2", responses: 89, total: 100 },
                {
                  name: "Employee Engagement 2023",
                  responses: 145,
                  total: 200,
                },
                { name: "Product Feedback", responses: 56, total: 150 },
                { name: "Website Usability", responses: 78, total: 100 },
                { name: "Event Feedback", responses: 23, total: 50 },
              ].map((survey) => (
                <div key={survey.name} className="flex items-center">
                  <div className="w-1/2">
                    <p className="text-sm font-medium">{survey.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {survey.responses} responses
                    </p>
                  </div>
                  <div className="flex w-1/2 items-center gap-2">
                    <span className="text-sm font-medium">
                      {Math.round((survey.responses / survey.total) * 100)}%
                    </span>
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
