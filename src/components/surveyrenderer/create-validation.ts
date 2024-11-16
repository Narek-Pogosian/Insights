import { type SurveySchema } from "@/lib/zod/survey-schemas";
import { z, type ZodTypeAny } from "zod";

export function createValidationSchema(form: SurveySchema) {
  const shape: Record<string, ZodTypeAny> = {};

  form.forEach((field) => {
    let fieldSchema;

    switch (field.type) {
      case "text":
        fieldSchema = z.string().trim();
        fieldSchema = fieldSchema.max(600, {
          message: `Must be at most 600 characters`,
        });
        if (field.required) {
          fieldSchema = fieldSchema.min(1, {
            message: "This field is required",
          });
        } else {
          fieldSchema = fieldSchema.optional().or(z.literal(""));
        }
        break;

      case "number":
        fieldSchema = z.coerce.number({ message: "Must be a number" });
        if (field.min) {
          fieldSchema = fieldSchema.min(field.min, {
            message: `Must be at least ${field.min}`,
          });
        }
        if (field.max) {
          fieldSchema = fieldSchema.max(field.max, {
            message: `Must be at most ${field.max}`,
          });
        }
        if (field.required) {
          fieldSchema = fieldSchema.refine((val) => !isNaN(val), {
            message: "This field is required and must be a valid number",
          });
        } else {
          fieldSchema = z
            .literal("")
            .transform(() => undefined)
            .or(fieldSchema.optional());
        }
        break;

      case "options":
        fieldSchema = z
          .string()
          .refine((val) => field.options.some((o) => o.value === val), {
            message: "Invalid option",
          });
        if (!field.required) {
          fieldSchema = fieldSchema.optional();
        }
        break;

      case "checkbox":
        fieldSchema = z.boolean();
        if (field.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: "This field is required",
          });
        }
        break;

      default:
        throw new Error(`Unsupported field type`);
    }

    shape[field.label] = fieldSchema;
  });

  return z.object(shape);
}
