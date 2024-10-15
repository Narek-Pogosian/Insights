import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Status, type Form } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UncancelButton from "./uncancel-button";
import CancelFormDialog from "./cancel-form-dialog";
import DeleteFormDialog from "./delete-form-dialog";
import SharePopover from "./share-popover";
import PublishForm from "./publish-form-dialog";
import Link from "next/link";

interface Props {
  survey: Form;
}

function SurveyCard({ survey }: Props) {
  return (
    <Card key={survey.id}>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Link
            href={
              survey.status !== "DRAFT"
                ? `/surveys/${survey.id}`
                : `/surveys/${survey.id}/edit`
            }
          >
            <CardTitle>{survey.title}</CardTitle>
          </Link>
          <Badge
            className="w-fit capitalize"
            variant={
              survey.status === "PUBLISHED"
                ? "default"
                : survey.status === "DRAFT"
                  ? "outline"
                  : "destructive"
            }
          >
            {survey.status.toLocaleLowerCase()}
          </Badge>
        </div>
        <p className="text-sm text-foreground-muted">
          {survey.createdAt.toDateString()}
        </p>
      </CardHeader>

      <CardFooter className="mt-4 flex justify-between">
        <SurveyActionButtons status={survey.status} id={survey.id} />
        <DeleteFormDialog id={survey.id} />
      </CardFooter>
    </Card>
  );
}

export default SurveyCard;

function SurveyActionButtons({ status, id }: { status: Status; id: string }) {
  if (status == "DRAFT") {
    return (
      <div className="flex gap-2">
        <PublishForm id={id} />
        <Button asChild variant="outline" size="sm">
          <Link href={`/surveys/${id}/edit`} className="relative">
            Edit
          </Link>
        </Button>
      </div>
    );
  }

  if (status == "CANCELLED") {
    return <UncancelButton id={id} />;
  }

  return (
    <div className="flex gap-2">
      <SharePopover id={id} />
      <CancelFormDialog id={id} />
    </div>
  );
}
