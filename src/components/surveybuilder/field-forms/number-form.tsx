import { useForm } from "react-hook-form";
import { numberSchema } from "@/lib/zod/survey-schemas";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { type FieldFormProps } from ".";
import { type z } from "zod";

const numberFormSchema = numberSchema.pick({
  label: true,
  required: true,
  description: true,
  min: true,
  max: true,
});

type NumberFormSchemaType = z.infer<typeof numberFormSchema>;

function NumberForm({ defaultField, handleAdd }: FieldFormProps) {
  if (defaultField && defaultField.type !== "number")
    throw Error("Need to pass in a number field to number form");

  const form = useForm<NumberFormSchemaType>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      required: defaultField?.required ?? false,
      description: defaultField?.description ?? "",
      min: defaultField?.min ?? "",
      max: defaultField?.max ?? "",
    },
  });

  function onSubmit(data: NumberFormSchemaType) {
    const res = handleAdd({
      id: defaultField?.id ?? crypto.randomUUID(),
      type: "number",
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
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label*</FormLabel>
              <FormControl>
                <Input placeholder="Age" {...field} />
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
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Required</FormLabel>
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

        <FormField
          control={form.control}
          name="min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{defaultField ? "Edit" : "Add"}</Button>
      </form>
    </Form>
  );
}

export default NumberForm;
