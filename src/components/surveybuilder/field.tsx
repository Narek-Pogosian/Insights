import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SurveySchemaField } from "@/lib/zod/survey-schemas";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import FieldDialog from "./field-dialog";

type FieldProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  field: SurveySchemaField;
};

function Field({ field, className }: FieldProps) {
  const { dispatch } = useSurveybuilder();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id, data: { type: "field" } });

  function handleRemove() {
    dispatch({
      type: "REMOVE_FIELD",
      payload: field.id,
    });
  }

  return (
    <Card
      className={cn("relative flex justify-between", className)}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
      }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        role="button"
        className="w-full cursor-grab pb-6 pt-4"
      >
        <CardHeader className="flex flex-col gap-4 p-0 pl-4 sm:flex-row">
          <GripVertical className="mt-1.5 size-5 shrink-0 text-foreground-muted" />
          <div className="grow sm:pr-36">
            <CardTitle className="mb-1">{field.label}</CardTitle>
            <p className="font-medium capitalize text-foreground-muted">
              {field.type}
            </p>
          </div>
        </CardHeader>
      </div>

      <CardContent className="absolute right-4 flex h-fit w-32 items-center gap-2 p-0 pt-4">
        <FieldDialog defaultField={field} />
        <Button onClick={handleRemove} variant="destructive" size="sm">
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}

export default Field;
