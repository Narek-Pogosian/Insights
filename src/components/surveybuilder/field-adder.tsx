import { createElement, useState } from "react";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { Button } from "@/components/ui/button";
import {
  type FieldType,
  type SurveySchemaField,
} from "@/lib/zod/survey-schemas";
import { fieldForms } from "./field-forms";

interface Props {
  defaultField?: SurveySchemaField;
  closeDialog: () => void;
}

function FieldAdder({ defaultField, closeDialog }: Props) {
  const { dispatch, state } = useSurveybuilder();
  const [fieldType, setFieldType] = useState<FieldType | undefined>(
    defaultField?.type,
  );

  function handleAdd(data: SurveySchemaField) {
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
        {Object.entries(fieldForms).map(([type, value]) => (
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
    <>
      {createElement(fieldForms[fieldType].form, { defaultField, handleAdd })}
    </>
  );
}

export default FieldAdder;
