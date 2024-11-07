"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";
import { BookOpenCheck } from "lucide-react";

interface PublishSurveyDialogProps {
  id: string;
}

function PublishSurveyDialog({ id }: PublishSurveyDialogProps) {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const { mutateAsync, isPending } = api.survey.updateSurveyStatus.useMutation({
    onError: () => {
      toast("Survey could not be published.");
    },
    onSuccess: async (updatedSurvey, input) => {
      utils.survey.getAllSurveys.setData(undefined, (data) => {
        return data?.map((survey) =>
          survey.id == input.id ? updatedSurvey : survey,
        );
      });
      await utils.survey.getSurveyById.invalidate(input.id);
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  async function handleClick() {
    if (isPending) return;
    await mutateAsync({ id, status: "PUBLISHED" });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          <BookOpenCheck />
          Publish Survey
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            After a survey has been published it can no longer be edited and you
            can now share and let people answer your survey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleClick}
            loading={isPending}
            aria-disabled={isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Publish
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishSurveyDialog;
