import FieldDialog from "./field-dialog";
import Field from "./field";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { useDragBuilder } from "./hooks/use-dragbuilder";
import { ClipboardList } from "lucide-react";
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
import TemplatesDialog from "./templates-dialog";

export default function BuilderContent() {
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
          <div className="mx-auto mb-8 pt-16 text-center">
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
      <div className="mt-8 flex flex-col items-center gap-4 [&>button]:w-fit">
        {state.fields.length === 0 && <TemplatesDialog />}
        <FieldDialog />
      </div>
    </DndContext>
  );
}
