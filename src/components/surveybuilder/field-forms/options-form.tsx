import { useFieldArray, useForm } from "react-hook-form";
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

export const optionsFormSchema = optionsSchema.pick({
  label: true,
  required: true,
  description: true,
  options: true,
});

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
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-5"
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

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center gap-1">
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

        <div>
          <FormLabel className="mb-2">Options*</FormLabel>
          {fields.map((option, index) => (
            <div key={option.id} className="mb-2 flex items-center gap-2">
              <FormField
                control={form.control}
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
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append({ value: "" })}>
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
