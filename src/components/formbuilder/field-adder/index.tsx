import {
  type FieldType,
  type FormSchemaField,
} from "@/lib/schemas/form-schema";
import {
  CircleCheckBig,
  MousePointer,
  Radio,
  Sigma,
  Type,
  TypeOutline,
  type LucideIcon as LI,
} from "lucide-react";
import { createElement, useState } from "react";
import { useFormbuilder } from "../hooks/use-formbuilder";
import { Button } from "@/components/ui/button";
import TextForm from "./field-forms/text-form";
import TextareaForm from "./field-forms/textarea-form";
import NumberForm from "./field-forms/number-form";
import RadioForm from "./field-forms/radio-form";
import CheckboxForm from "./field-forms/checkbox-form";
import SelectForm from "./field-forms/select-form";

export type FormProps = {
  defaultField?: FormSchemaField;
  handleAdd: (data: FormSchemaField) => void | "Label Error";
};

type V = { label: string; icon: LI; form: React.ComponentType<FormProps> };
type FieldForms = Record<FieldType, V>;

const forms: FieldForms = {
  text: { form: TextForm, icon: Type, label: "Text" },
  textarea: { form: TextareaForm, icon: TypeOutline, label: "Textarea" },
  number: { form: NumberForm, icon: Sigma, label: "Number" },
  radio: { form: RadioForm, icon: Radio, label: "Radio Group" },
  select: { form: SelectForm, icon: MousePointer, label: "Select" },
  checkbox: { form: CheckboxForm, icon: CircleCheckBig, label: "Checkbox" },
};

interface Props {
  defaultField?: FormSchemaField;
  closeDialog: () => void;
}

function FieldAdder({ defaultField, closeDialog }: Props) {
  const { dispatch, state } = useFormbuilder();
  const [fieldType, setFieldType] = useState<FieldType | undefined>(
    defaultField?.type,
  );

  function handleAdd(data: FormSchemaField) {
    if (
      state.fields.find(
        (f) => f.label.trim() === data.label.trim() && f.id !== data.id,
      )
    ) {
      return "Label Error";
    }

    dispatch({
      type: defaultField ? "EDIT_FIELD" : "ADD_FIELD",
      payload: {
        ...data,
      },
    });
    closeDialog();
  }

  if (!fieldType) {
    return (
      <ul className="flex flex-wrap justify-center gap-2">
        {Object.entries(forms).map(([type, value]) => (
          <li key={type}>
            <Button
              className="size-28 flex-col gap-2"
              variant="outline"
              onClick={() => setFieldType(type as FieldType)}
            >
              <value.icon className="size-6" />
              {value.label}
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>{createElement(forms[fieldType].form, { defaultField, handleAdd })}</>
  );
}

export default FieldAdder;
