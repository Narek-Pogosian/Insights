import { useForm } from "react-hook-form";
import { textSchema } from "@/lib/zod/survey-schemas";
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
import { Textarea } from "@/components/ui/textarea";
import { type FieldFormProps } from ".";
import { type z } from "zod";
import { Switch } from "@/components/ui/switch";

const textFormSchema = textSchema.omit({ id: true, type: true });
type TextFormSchemaType = z.infer<typeof textFormSchema>;

function TextForm({ defaultField, handleAdd }: FieldFormProps) {
  if (defaultField && defaultField.type !== "text")
    throw Error("Need to pass in a text field to text form");

  const form = useForm<TextFormSchemaType>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      placeholder: defaultField?.placeholder ?? "",
      description: defaultField?.description ?? "",
      required: defaultField?.required ?? false,
      showDescription: defaultField?.showDescription ?? false,
      longAnswer: defaultField?.longAnswer ?? false,
    },
  });

  function onSubmit(data: TextFormSchemaType) {
    const res = handleAdd({
      id: defaultField?.id ?? crypto.randomUUID(),
      type: "text",
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

        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder*</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
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
            name="longAnswer"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0">Long Answer</FormLabel>
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

        <Button type="submit">{defaultField ? "Edit" : "Add"}</Button>
      </form>
    </Form>
  );
}

export default TextForm;
