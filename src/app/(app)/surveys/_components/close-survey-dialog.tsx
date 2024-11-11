"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
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
import { Ban } from "lucide-react";

interface CloseSurveyDialogProps {
  id: string;
}

function CloseSurveyDialog({ id }: CloseSurveyDialogProps) {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const { isPending, mutateAsync } = api.survey.updateSurveyStatus.useMutation({
    onSuccess: async (res) => {
      toast("Survey is now closed");
      utils.survey.getAllSurveys.setData(undefined, (data) => {
        return data?.map((post) => (post.id === res.id ? res : post));
      });
      await utils.survey.getSurveyById.invalidate(id);
    },
    onError: () => {
      toast("Survey could not be closed");
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  async function handleClick() {
    if (isPending) return;
    await mutateAsync({ id, status: "CLOSED" });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="relative" asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:text-red-500"
          title="Close"
        >
          <Ban className="h-4 w-4" />
          <span className="sr-only">Close survey</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This means people can no longer respond to this survey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            loading={isPending}
            aria-disabled={isPending}
            onClick={handleClick}
          >
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CloseSurveyDialog;
