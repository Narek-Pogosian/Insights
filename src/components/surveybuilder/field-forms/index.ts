import {
  type SurveySchemaField,
  type FieldType,
} from "@/lib/zod/survey-schemas";
import {
  CircleCheckBig,
  ListTodo,
  Sigma,
  Type,
  type LucideIcon,
} from "lucide-react";
import TextForm from "./text-form";
import NumberForm from "./number-form";
import OptionsForm from "./options-form";
import CheckboxForm from "./checkbox-form";

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
  number: { form: NumberForm, icon: Sigma, label: "Number" },
  options: { form: OptionsForm, icon: ListTodo, label: "Multi Options" },
  checkbox: { form: CheckboxForm, icon: CircleCheckBig, label: "Checkbox" },
};
