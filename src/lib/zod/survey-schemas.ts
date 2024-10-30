import { z } from "zod";

export const MAX_LENGTH = 300;
export const MAX_LENGTH_TEXTAREA = 600;

const FieldTypes = [
  "text",
  "number",
  "textarea",
  "select",
  "checkbox",
  "radio",
] as const;

const baseSchema = z.object({
  id: z.string(),
  type: z.enum(FieldTypes),
  columns: z.coerce.number().optional(),
  description: z.string().optional(),
  label: z
    .string()
    .trim()
    .min(1, { message: "A label is required for every field" }),
  required: z.boolean(),
});

export const textSchema = baseSchema.extend({
  type: z.literal("text"),
  placeholder: z
    .string()
    .trim()
    .min(1, { message: "A placeholder is required" }),
  minLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
  maxLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
});

// export const textFormSchema = textSchema.pick({
//   label: true,
//   placeholder: true,
//   required: true,
//   description: true,
//   minLength: true,
//   maxLength: true,
// });

export const numberSchema = baseSchema.extend({
  type: z.literal("number"),
  min: z.literal("").or(z.coerce.number().optional()),
  max: z.literal("").or(z.coerce.number().optional()),
});

// export const numberFormSchema = numberSchema.pick({
//   label: true,
//   required: true,
//   description: true,
//   min: true,
//   max: true,
// });

export const textAreaSchema = baseSchema.extend({
  type: z.literal("textarea"),
  placeholder: z
    .string()
    .trim()
    .min(1, { message: "A placeholder is required" }),
  minLength: z.coerce.number().min(0).max(MAX_LENGTH_TEXTAREA).optional(),
  maxLength: z.coerce.number().min(0).max(MAX_LENGTH_TEXTAREA).optional(),
});

// export const textareaFormSchema = textAreaSchema.pick({
//   label: true,
//   placeholder: true,
//   required: true,
//   description: true,
//   minLength: true,
//   maxLength: true,
// });

export const selectSchema = baseSchema.extend({
  type: z.literal("select"),
  placeholder: z
    .string()
    .trim()
    .min(1, { message: "A placeholder is required" }),

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

// export const selectFormSchema = selectSchema.pick({
//   label: true,
//   placeholder: true,
//   required: true,
//   description: true,
//   options: true,
// });

export const checkboxSchema = baseSchema.extend({
  type: z.literal("checkbox"),
});

// export const checkboxFormSchema = checkboxSchema.pick({
//   label: true,
//   required: true,
//   description: true,
// });

const radioSchema = baseSchema.extend({
  type: z.literal("radio"),
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

// export const radioFormSchema = radioSchema.pick({
//   label: true,
//   required: true,
//   description: true,
//   options: true,
// });

export const surveySchema = z
  .array(
    z.discriminatedUnion("type", [
      textSchema,
      numberSchema,
      textAreaSchema,
      selectSchema,
      checkboxSchema,
      radioSchema,
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
