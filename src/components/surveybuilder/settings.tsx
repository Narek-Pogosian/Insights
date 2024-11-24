import { type BuilderProps } from ".";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { api } from "@/trpc/react";

export default function SurveyBuilderSettings(props: BuilderProps) {
  const { state, dispatch } = useSurveybuilder();
  const [title, setTitle] = useState(state.title ?? "");

  const utils = api.useUtils();
  const createMutation = api.survey.createSurvey.useMutation({
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: async (data) => {
      toast("New survey created");
      utils.survey.getAllSurveys.setData(undefined, (oldData) => {
        return oldData ? [data, ...oldData] : undefined;
      });
      await utils.survey.getAllSurveys.invalidate();
      dispatch({ type: "RESET" });
    },
  });

  const editMutation = api.survey.editSurvey.useMutation({
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: async () => {
      if (props.mode === "edit") {
        await Promise.all([
          utils.survey.getAllSurveys.invalidate(),
          utils.survey.getSurveyById.invalidate(props.id),
        ]);
      }
      toast("Saved");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast("Title is required", { position: "top-center" });
      return;
    }

    if (createMutation.isPending || editMutation.isPending) return;
    if (props.mode === "create") {
      createMutation.mutate({ title, survey: state.fields });
    } else {
      editMutation.mutate({
        survey: { title, survey: state.fields },
        id: props.id,
      });
    }
  }

  useEffect(() => {
    setTitle(state.title);
  }, [state.title]);

  return (
    <form
      className="flex grow gap-1 rounded border bg-background-card p-1 shadow-sm ring-primary has-[:focus-visible]:ring-2 dark:shadow dark:shadow-black"
      onSubmit={handleSubmit}
    >
      <Input
        id="title"
        placeholder="Title of survey"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-none bg-transparent font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        className="right-0 top-0"
        loading={createMutation.isPending || editMutation.isPending}
      >
        <Save className="h-4 w-4" /> Save
      </Button>
    </form>
  );
}
