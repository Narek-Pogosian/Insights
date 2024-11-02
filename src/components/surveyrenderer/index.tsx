"use client";

import { type SurveySchema } from "@/lib/zod/survey-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { createValidationSchema } from "./create-validation";

interface SurveyRendererProps {
  mode: "answer" | "preview";
  form: SurveySchema;
}

interface SurveyRendererAnswerProps extends SurveyRendererProps {
  mode: "answer";
  id: string;
}

interface SurveyRendererPreviewProps extends SurveyRendererProps {
  mode: "preview";
}

type Props = SurveyRendererAnswerProps | SurveyRendererPreviewProps;

function SurveyRenderer(props: Props) {
  const schema = createValidationSchema(props.form);
  const f = useForm<typeof schema>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  async function onSubmit(data: typeof schema) {
    console.log(data);
  }

  if (props.form.length === 0) {
    return (
      <div className="mx-auto mb-8 pt-10 text-center font-medium text-neutral-300 dark:text-neutral-600">
        Empty, no form to show.
      </div>
    );
  }

  return (
    <Form {...f}>
      <form
        onSubmit={f.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-3xl gap-y-8 py-4"
      >
        {props.form.map((formField, i) => {
          const label = formField.label as keyof typeof schema;

          if (formField.type === "text")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormDescription>{formField.description}</FormDescription>
                    <FormControl>
                      <Input
                        placeholder={formField.placeholder}
                        {...field}
                        value={(field.value as string) ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "number")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormDescription>{formField.description}</FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={formField.min}
                        max={formField.max}
                        placeholder={formField.min?.toString() ?? ""}
                        {...field}
                        value={(field.value as number | string) ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "textarea")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormDescription>{formField.description}</FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder={formField.placeholder}
                        {...field}
                        rows={4}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "checkbox")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value as boolean | undefined}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base">{label}</FormLabel>
                    </div>
                    <FormMessage />
                    <FormDescription>{formField.description}</FormDescription>
                  </FormItem>
                )}
              />
            );

          if (formField.type === "select")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormDescription>{formField.description}</FormDescription>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={formField.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formField.options.map((option) => (
                          <SelectItem
                            value={option.value}
                            key={option.value}
                            className="capitalize"
                          >
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "radio")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormDescription>{formField.description}</FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className="flex flex-col space-y-1"
                      >
                        {formField.options.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal capitalize">
                              {option.value}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SurveyRenderer;
