import { type Control, useFieldArray, useForm } from "react-hook-form";
import { optionsSchema } from "@/lib/zod/survey-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type FieldFormProps } from ".";
import { type z } from "zod";
import { GripVertical, Trash2 } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type DragEndEvent,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const optionsFormSchema = optionsSchema.omit({ id: true, type: true });

type RadioFormSchemaType = z.infer<typeof optionsFormSchema>;

function OptionsForm({ defaultField, handleAdd }: FieldFormProps) {
  if (defaultField && defaultField.type !== "options")
    throw Error("Need to pass in a radio field to radio form");

  const form = useForm<RadioFormSchemaType>({
    resolver: zodResolver(optionsFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      required: defaultField?.required ?? false,
      options: defaultField?.options ?? [{ value: "" }],
      description: defaultField?.description ?? "",
      showDescription: defaultField?.showDescription ?? false,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "options",
  });

  function onSubmit(data: RadioFormSchemaType) {
    const res = handleAdd({
      id: defaultField?.id ?? crypto.randomUUID(),
      type: "options",
      ...data,
    });

    if (res === "Label Error") {
      form.setError("label", { message: "Every label needs to be unique" });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-6"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label*</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="col-span-2 flex items-center gap-1">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0">Required</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showDescription"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0">Show Description</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.getValues().showDescription && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Optional description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div>
          <FormLabel className="mb-2">Options*</FormLabel>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((field) => field.id)}>
              <ul className="space-y-3">
                {fields.map((option, index) => (
                  <SortableItem
                    key={option.id}
                    id={option.id}
                    index={index}
                    remove={remove}
                    control={form.control}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-2 bg-background-input"
            onClick={() => append({ value: "" })}
          >
            Add Option
          </Button>
        </div>

        <Button className="mt-4" type="submit">
          {defaultField ? "Edit" : "Add"}
        </Button>
      </form>
    </Form>
  );
}

export default OptionsForm;

const SortableItem = ({
  id,
  index,
  remove,
  control,
}: {
  id: string;
  index: number;
  remove: (index: number) => void;
  control: Control<RadioFormSchemaType>;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
      }}
      className="flex cursor-grab items-start gap-1"
    >
      <GripVertical className="mt-2 size-5 text-foreground-muted" />
      <FormField
        control={control}
        name={`options.${index}.value`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input placeholder={`Option ${index + 1}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        size="icon"
        type="button"
        className="ml-1 size-[38px]"
        variant="destructive"
        onClick={() => remove(index)}
      >
        <Trash2 />
      </Button>
    </li>
  );
};
