import { useForm } from "react-hook-form";
import { MAX_LENGTH_TEXTAREA, textAreaSchema } from "@/lib/zod/survey-schemas";
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

const textareaFormSchema = textAreaSchema.pick({
  label: true,
  placeholder: true,
  required: true,
  description: true,
  minLength: true,
  maxLength: true,
});

type TextareaFormSchemaType = z.infer<typeof textareaFormSchema>;

function TextAreaForm({ defaultField, handleAdd }: FieldFormProps) {
  if (defaultField && defaultField.type !== "textarea")
    throw Error("Need to pass in a textarea field to textarea form");

  const form = useForm<TextareaFormSchemaType>({
    resolver: zodResolver(textareaFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      placeholder: defaultField?.placeholder ?? "",
      required: defaultField?.required ?? false,
      description: defaultField?.description ?? "",
      minLength: defaultField?.minLength ?? 0,
      maxLength: defaultField?.maxLength ?? MAX_LENGTH_TEXTAREA,
    },
  });

  function onSubmit(data: TextareaFormSchemaType) {
    const res = handleAdd({
      id: defaultField?.id ?? crypto.randomUUID(),
      type: "textarea",
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
                <Input placeholder="Your bio" {...field} />
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
                <Input placeholder="I am a ..." {...field} />
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
          name="minLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum length</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={MAX_LENGTH_TEXTAREA}
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum length</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={MAX_LENGTH_TEXTAREA}
                  placeholder="300"
                  {...field}
                />
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

export default TextAreaForm;
