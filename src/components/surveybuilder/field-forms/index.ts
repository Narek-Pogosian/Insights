import {
  type SurveySchemaField,
  type FieldType,
} from "@/lib/zod/survey-schemas";
import {
  CircleCheckBig,
  MousePointer,
  Radio,
  Sigma,
  Type,
  TypeOutline,
  type LucideIcon,
} from "lucide-react";
import TextForm from "./text-form";
import TextareaForm from "./textarea-form";
import NumberForm from "./number-form";
import RadioForm from "./radio-form";
import CheckboxForm from "./checkbox-form";
import SelectForm from "./select-form";

export type FieldFormProps = {
  defaultField?: SurveySchemaField;
  handleAdd: (data: SurveySchemaField) => void | "Label Error";
};

type Value = {
  label: string;
  icon: LucideIcon;
  form: React.ComponentType<FieldFormProps>;
};

type FieldForms = Record<FieldType, Value>;

export const fieldForms: FieldForms = {
  text: { form: TextForm, icon: Type, label: "Text" },
  textarea: { form: TextareaForm, icon: TypeOutline, label: "Textarea" },
  number: { form: NumberForm, icon: Sigma, label: "Number" },
  radio: { form: RadioForm, icon: Radio, label: "Radio Group" },
  select: { form: SelectForm, icon: MousePointer, label: "Select" },
  checkbox: { form: CheckboxForm, icon: CircleCheckBig, label: "Checkbox" },
};
