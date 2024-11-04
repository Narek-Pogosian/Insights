import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Status, type Survey } from "@prisma/client";
import { Button } from "@/components/ui/button";
// import CancelFormDialog from "./cancel-form-dialog";
// import DeleteFormDialog from "./delete-form-dialog";
// import UncancelButton from "./uncancel-button";
// import SharePopover from "./share-popover";
// import PublishForm from "./publish-form-dialog";
import Link from "next/link";
import DeleteSurveyDialog from "./delete-survey-dialog";

interface Props {
  survey: Survey;
}

function SurveyCard({ survey }: Props) {
  return (
    <Card key={survey.id}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={
              survey.status !== "DRAFT"
                ? `/surveys/${survey.id}`
                : `/surveys/${survey.id}/edit`
            }
          >
            <CardTitle className="hover:underline">{survey.title}</CardTitle>
          </Link>
          <div className="inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold capitalize">
            {survey.status.toLocaleLowerCase()}
          </div>
        </div>
        <p className="text-sm text-foreground-muted">
          {survey.createdAt.toDateString()}
        </p>
      </CardHeader>

      <CardFooter className="mt-4 flex justify-between">
        <SurveyActionButtons status={survey.status} id={survey.id} />
        <DeleteSurveyDialog id={survey.id} />
      </CardFooter>
    </Card>
  );
}

export default SurveyCard;

function SurveyActionButtons({ status, id }: { status: Status; id: string }) {
  if (status == "DRAFT") {
    return (
      <div className="flex gap-2">
        {/* <PublishForm id={id} /> */}
        <Button asChild variant="outline" size="sm">
          <Link href={`/surveys/${id}/edit`} className="relative">
            Edit
          </Link>
        </Button>
      </div>
    );
  }

  if (status == "CANCELLED") {
    return <p>Uncancel</p>;
    // return <UncancelButton id={id} />;
  }

  return (
    <div className="flex gap-2">
      <span>Share</span>
      <span>Cancel</span>
      {/* <SharePopover id={id} /> */}
      {/* <CancelFormDialog id={id} /> */}
    </div>
  );
}
