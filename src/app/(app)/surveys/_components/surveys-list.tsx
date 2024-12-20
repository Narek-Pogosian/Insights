"use client";

import { type Status } from "@prisma/client";
import { useMemo, useState } from "react";
import { FileQuestion, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

import SurveyCard from "./survey-card";
import Link from "next/link";

const statusList: { status: Status | ""; label: string }[] = [
  { status: "", label: "All" },
  { status: "PUBLISHED", label: "Published" },
  { status: "DRAFT", label: "Draft" },
  { status: "CLOSED", label: "Closed" },
];

function SurveysList() {
  const [surveys] = api.survey.getAllSurveys.useSuspenseQuery(undefined, {});

  const [titleQuery, setTitleQuery] = useState("");
  const [status, setStatus] = useState("");

  const filteredSurvey = useMemo(() => {
    return surveys.filter((s) => {
      const matchesTitle = s.title
        .toLowerCase()
        .includes(titleQuery.trim().toLowerCase());
      const matchesStatus = status ? s.status === status : true;
      return matchesTitle && matchesStatus;
    });
  }, [surveys, titleQuery, status]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-3 h-4 w-4" />
            <Input
              id="title"
              aria-label="Title"
              placeholder="Search by title"
              className="h-10 w-[280px] bg-background-input pl-8 text-sm shadow-sm dark:bg-background-card dark:shadow dark:shadow-black"
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
            />
          </div>
          <select
            id="status"
            aria-label="Status"
            className="h-10 rounded border bg-background-input px-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-background-card dark:shadow dark:shadow-black"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusList.map((s) => (
              <option key={s.status} value={s.status}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <Button asChild className="w-fit shadow dark:shadow-black">
          <Link href="/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Survey
          </Link>
        </Button>
      </div>

      {filteredSurvey.length === 0 ? (
        <div className="mx-auto mb-8 pt-10 text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
            <FileQuestion className="size-10 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Oops! No Results</h2>
          <p className="text-sm text-foreground-muted">
            Try adjusting your filters to find more surveys!
          </p>
        </div>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2">
          {filteredSurvey.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </ul>
      )}
    </>
  );
}

export default SurveysList;
