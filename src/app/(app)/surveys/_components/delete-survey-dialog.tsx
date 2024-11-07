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
import { Trash2 } from "lucide-react";

interface DeleteSurveyDialogProps {
  id: string;
}

function DeleteSurveyDialog({ id }: DeleteSurveyDialogProps) {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const { isPending, mutateAsync } = api.survey.deleteSurveyById.useMutation({
    onMutate: (id) => {
      const previous = utils.survey.getAllSurveys.getData();
      utils.survey.getAllSurveys.setData(undefined, (data) => {
        return data?.filter((post) => post.id !== id);
      });

      return { previous };
    },
    onSuccess: async () => {
      toast("Survey deleted");
      setOpen(false);
      await utils.survey.getSurveyById.invalidate(id);
    },
    onError: (err, _, ctx) => {
      setOpen(false);
      utils.survey.getAllSurveys.setData(undefined, () => {
        return ctx?.previous;
      });
      toast("Survey could not be deleted");
    },
  });

  async function handleClick() {
    if (isPending) return;
    await mutateAsync(id);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="relative" asChild>
        <Button variant="outline" size="icon" className="hover:text-red-500">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete survey</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            survey and all related stats will be removed from our servers.
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
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteSurveyDialog;
