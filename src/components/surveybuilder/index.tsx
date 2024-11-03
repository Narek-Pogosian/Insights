"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { useDragBuilder } from "./hooks/use-dragbuilder";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Save } from "lucide-react";
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

import FieldDialog from "./field-dialog";
import Field from "./field";
import SurveyRenderer from "../surveyrenderer";

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
  console.log(props);
  const { state, dispatch } = useSurveybuilder();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="sticky top-0 z-40 mb-2 flex items-center justify-between gap-2 bg-background py-2">
        <Input
          id="title"
          placeholder="Title of survey"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "EDIT_TITLE", payload: e.target.value })
          }
        />
        <Button>
          <Save className="h-4 w-4" /> Save Survey
        </Button>
      </div>
      <Tabs defaultValue="builder">
        <TabsList className="sticky top-[61px] z-40 mb-2 bg-background-input">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="builder">
          <SurveyBuilderContent />
        </TabsContent>
        <TabsContent value="preview">
          <SurveyRenderer mode="preview" form={state.fields} />
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
        <ul className="space-y-6">
          {state.fields.map((f) => (
            <Field
              key={f.id}
              field={f}
              className={activeId === f.id ? "opacity-25" : ""}
            />
          ))}
        </ul>
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
