"use client";

import { BarChart3, FileText, Users, PlusCircle, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";

function DashboardContent() {
  const [surveys] = api.survey.getAllSurveys.useSuspenseQuery(undefined, {});

  const stats = [
    { title: "Total Surveys", value: surveys.length, icon: FileText },
    {
      title: "Total Responses",
      value: surveys.reduce((acc, curr) => acc + curr.responseCount, 0),
      icon: Users,
    },
    {
      title: "Drafted Surveys",
      value: surveys.filter((s) => s.status === "DRAFT").length,
      icon: Pencil,
    },
    {
      title: "Active Surveys",
      value: surveys.filter((s) => s.status === "PUBLISHED").length,
      icon: BarChart3,
    },
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/create">
            <PlusCircle /> Create New Survey
          </Link>
        </Button>
        <Button className="bg-background-card" variant="outline" asChild>
          <Link href="/surveys">
            <FileText /> View All Surveys
          </Link>
        </Button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="text-muted-foreground size-5" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>TODO: More info here</div>
    </>
  );
}

export default DashboardContent;
