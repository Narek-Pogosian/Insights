import { z } from "zod";

export const MAX_TEXT_LENGTH = 600;

const FieldTypes = [
  "text",
  "number",
  "options",
  "checkbox",
  "email",
  "url",
] as const;

const baseSchema = z.object({
  id: z.string(),
  type: z.enum(FieldTypes),
  showDescription: z.boolean(),
  description: z.string().optional(),
  label: z
    .string()
    .trim()
    .min(1, { message: "A label is required for every field" }),
  required: z.boolean(),
});

export const textSchema = baseSchema.extend({
  type: z.literal("text"),
  longAnswer: z.boolean(),
  placeholder: z
    .string()
    .trim()
    .min(1, { message: "A placeholder is required" }),
});

export const numberSchema = baseSchema.extend({
  type: z.literal("number"),
  min: z.literal("").or(z.coerce.number().optional()),
  max: z.literal("").or(z.coerce.number().optional()),
});

export const emailSchema = baseSchema.extend({
  type: z.literal("email"),
  placeholder: z.string().trim().optional(),
});

export const urlSchema = baseSchema.extend({
  type: z.literal("url"),
  placeholder: z.string().trim().optional(),
});

export const checkboxSchema = baseSchema.extend({
  type: z.literal("checkbox"),
});

export const optionsSchema = baseSchema.extend({
  type: z.literal("options"),
  options: z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .min(1, { message: "An option label is required" }),
      }),
    )
    .min(1),
});

export const surveySchema = z
  .array(
    z.discriminatedUnion("type", [
      textSchema,
      emailSchema,
      urlSchema,
      numberSchema,
      checkboxSchema,
      optionsSchema,
    ]),
  )
  .min(1, { message: "At least 1 field is required" })
  .refine(
    (data) => {
      const labels = data.map((item) => item.label);
      const uniqueLabels = new Set(labels);
      return uniqueLabels.size === labels.length;
    },
    {
      message: "Labels must be unique",
      path: [],
    },
  );

export const createSurveyScema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  survey: surveySchema,
});

export type FieldType = (typeof FieldTypes)[number];
export type SurveySchema = z.infer<typeof surveySchema>;
export type SurveySchemaField = SurveySchema[number];
