"use client";

import SurveyRendererPreview from "../surveyrenderer/surveyrenderer-preview";
import FieldDialog from "./field-dialog";
import Field from "./field";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { useDragBuilder } from "./hooks/use-dragbuilder";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { ClipboardList, Eye, Hammer, Save } from "lucide-react";
import { api } from "@/trpc/react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface SurveyBuilderProps {
  mode: "create" | "edit";
}

interface SurveyBuilderCreateProps extends SurveyBuilderProps {
  mode: "create";
}

interface SurveyBuilderUpdateProps extends SurveyBuilderProps {
  mode: "edit";
  id: string;
}

function SurveyBuilder(
  props: SurveyBuilderCreateProps | SurveyBuilderUpdateProps,
) {
  const { state, dispatch } = useSurveybuilder();

  const utils = api.useUtils();
  const createMutation = api.survey.createSurvey.useMutation({
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: async (data) => {
      toast("New survey created");
      utils.survey.getAllSurveys.setData(undefined, (oldData) => {
        return [data, ...oldData!];
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

  function handleSave() {
    if (state.title.trim().length === 0) {
      toast("A title is required", { position: "top-center", important: true });
      return;
    }

    if (createMutation.isPending || editMutation.isPending) return;
    if (props.mode === "create") {
      createMutation.mutate({ title: state.title, survey: state.fields });
    } else {
      editMutation.mutate({
        survey: { title: state.title, survey: state.fields },
        id: props.id,
      });
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Tabs defaultValue="builder">
        <div className="sticky top-0 z-50 -mt-2 mb-4 flex flex-col gap-2 bg-background py-2 md:flex-row md:py-3">
          <div className="flex grow gap-1 rounded border bg-background-card p-1 shadow-sm ring-primary has-[:focus-visible]:ring-2 dark:shadow dark:shadow-black">
            <Input
              id="title"
              placeholder="Title of survey"
              className="border-none bg-transparent font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "EDIT_TITLE", payload: e.target.value })
              }
            />
            <Button
              onClick={handleSave}
              className="right-0 top-0"
              loading={createMutation.isPending || editMutation.isPending}
            >
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
          <TabsList className="w-fit justify-start bg-background-card shadow-sm dark:shadow dark:shadow-black">
            <TabsTrigger value="builder" className="h-full">
              <Hammer className="mr-2 size-4" /> Builder
            </TabsTrigger>
            <TabsTrigger value="preview" className="h-full">
              <Eye className="mr-2 size-4" /> Preview
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="builder">
          <SurveyBuilderContent />
        </TabsContent>
        <TabsContent value="preview">
          <SurveyRendererPreview survey={state.fields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SurveyBuilder;

function SurveyBuilderContent() {
  const { state } = useSurveybuilder();
  const { handleDragEnd, handleDragStart, activeId } = useDragBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={state.fields}
        strategy={verticalListSortingStrategy}
      >
        {state.fields.length === 0 ? (
          <div className="mx-auto mb-8 pt-10 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
              <ClipboardList className="size-10 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">
              Start Building Your Survey
            </h2>
            <p className="text-sm text-foreground-muted">
              Create engaging surveys by adding fields
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {state.fields.map((f) => (
              <Field
                key={f.id}
                field={f}
                className={activeId === f.id ? "opacity-25" : ""}
              />
            ))}
          </ul>
        )}
      </SortableContext>
      <DragOverlay>
        <Field
          field={state.fields.find((f) => f.id === activeId)!}
          className="shadow-lg dark:shadow-black/40"
        />
      </DragOverlay>
      <FieldDialog />
    </DndContext>
  );
}
