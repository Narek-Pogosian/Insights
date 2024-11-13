import { Calendar, Edit, Download, Users, Eye } from "lucide-react";
import { type Survey } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PublishSurveyDialog from "./publish-survey-dialog";
import DeleteSurveyDialog from "./delete-survey-dialog";
import CloseSurveyDialog from "./close-survey-dialog";
import SharePopover from "./share-popover";
import Link from "next/link";

import { answersToCsv, cn, downloadCsv } from "@/lib/utils";
import { api } from "@/trpc/react";

interface SurveyCardProps {
  survey: Survey;
}

export default function SurveyCard({ survey }: SurveyCardProps) {
  const utils = api.useUtils();
  utils.survey.getSurveyById.setData(survey.id, survey);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
          <div>
            <CardTitle className="mb-2 text-2xl">{survey.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Created on {survey.createdAt.toDateString()}
            </CardDescription>
          </div>
          <SurveyActions surveyId={survey.id} status={survey.status} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize",
              { "text-red-600 dark:text-red-400": survey.status === "CLOSED" },
            )}
          >
            {survey.status.toLocaleLowerCase()}
          </div>
          {survey.status !== "DRAFT" && (
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span className="font-semibold">
                {survey.responseCount}{" "}
                {survey.responseCount === 1 ? "Response" : "Responses"}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {survey.status !== "DRAFT" ? (
          <DownloadCSVButton id={survey.id} title={survey.title} />
        ) : (
          <PublishSurveyDialog id={survey.id} />
        )}
      </CardFooter>
    </Card>
  );
}

const SurveyActions = ({
  surveyId,
  status,
}: {
  surveyId: string;
  status: string;
}) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" asChild>
        <Link href={`/surveys/${surveyId}/preview`} title="Preview">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Preview survey</span>
        </Link>
      </Button>

      {status === "DRAFT" && (
        <Button variant="outline" size="icon" asChild>
          <Link href={`/surveys/${surveyId}/edit`} title="Edit">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit survey</span>
          </Link>
        </Button>
      )}

      {status === "PUBLISHED" && <SharePopover id={surveyId} />}
      {status === "PUBLISHED" && <CloseSurveyDialog id={surveyId} />}

      <DeleteSurveyDialog id={surveyId} />
    </div>
  );
};

const DownloadCSVButton = ({ id, title }: { id: string; title: string }) => {
  const { refetch, isFetching } = api.response.getResponses.useQuery(id, {
    enabled: false,
  });

  async function handleClick() {
    if (isFetching) return;
    const res = await refetch();

    if (res.data) {
      const csv = answersToCsv(res.data);
      if (!csv) {
        return;
      }

      downloadCsv(title, csv);
    }
  }

  return (
    <Button onClick={handleClick} loading={isFetching} className="w-full">
      <Download className="mr-2 h-4 w-4" />
      Download Responses (CSV)
    </Button>
  );
};
