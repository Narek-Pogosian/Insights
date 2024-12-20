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
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { createValidationSchema } from "./create-validation";
import { FileQuestion } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface SurveyRendererProps {
  onSubmit: (data: unknown) => void;
  survey: SurveySchema;
  loading?: boolean;
}

function SurveyRenderer({ onSubmit, survey, loading }: SurveyRendererProps) {
  const schema = createValidationSchema(survey);
  const f = useForm<typeof schema>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  if (survey.length === 0) {
    return (
      <div className="mx-auto mb-8 pt-16 text-center">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/5">
          <FileQuestion className="size-10 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Your survey is empty.</h2>
        <p className="text-sm text-foreground-muted">
          Add some questions to see how they&apos;ll appear to your respondents.
        </p>
      </div>
    );
  }

  return (
    <Form {...f}>
      <form
        onSubmit={f.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-2xl gap-y-10"
      >
        {survey.map((formField, i) => {
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
                    {formField.showDescription && formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                    <FormControl>
                      {formField.longAnswer ? (
                        <Textarea
                          placeholder={formField.placeholder}
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      ) : (
                        <Input
                          placeholder={formField.placeholder}
                          {...field}
                          value={(field.value as string) ?? ""}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "email")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    {formField.showDescription && formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                    <FormControl>
                      <Input
                        // eslint-disable-next-line
                        placeholder={formField.placeholder || "Your answer"}
                        {...field}
                        value={(field.value as string) ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "url")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    {formField.showDescription && formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                    <FormControl>
                      <Input
                        // eslint-disable-next-line
                        placeholder={formField.placeholder || "Your answer"}
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
                    {formField.showDescription && formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
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
                      <FormLabel className="mb-0 text-base">{label}</FormLabel>
                    </div>
                    <FormMessage />
                    {formField.showDescription && formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                  </FormItem>
                )}
              />
            );

          if (formField.type === "options")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    {formField.showDescription && formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
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

        <Button type="submit" className="-mt-4" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SurveyRenderer;
