import { Calendar, Share2, Edit, Download, Users } from "lucide-react";
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
import DeleteSurveyDialog from "./delete-survey-dialog";
import Link from "next/link";

interface SurveyCardProps {
  survey: Survey;
}

export default function SurveyCard({ survey }: SurveyCardProps) {
  const handleDownloadCSV = () => {
    console.log("Downloading CSV");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
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
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize">
            {survey.status.toLocaleLowerCase()}
          </div>
          {survey.status !== "DRAFT" && <SurveyResponses />}
        </div>
      </CardContent>

      <CardFooter>
        {survey.status !== "DRAFT" ? (
          <DownloadCSVButton onDownload={handleDownloadCSV} />
        ) : (
          <p>TODO: Publish dialog</p>
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
    <div className="flex space-x-2">
      {status === "DRAFT" && (
        <Button variant="outline" size="icon" asChild>
          <Link href={`/surveys/${surveyId}/edit`}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit survey</span>
          </Link>
        </Button>
      )}

      {status === "PUBLISHED" && (
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share survey</span>
        </Button>
      )}

      <DeleteSurveyDialog id={surveyId} />
    </div>
  );
};

const SurveyResponses = () => (
  <div className="flex items-center">
    <Users className="mr-2 h-5 w-5" />
    <span className="font-semibold">100 Responses</span>
  </div>
);

const DownloadCSVButton = ({ onDownload }: { onDownload: () => void }) => (
  <Button onClick={onDownload} className="w-full">
    <Download className="mr-2 h-4 w-4" />
    Download Responses (CSV)
  </Button>
);
