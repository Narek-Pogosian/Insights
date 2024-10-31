"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Save } from "lucide-react";
import FieldDialog from "./field-dialog";
import Field from "./field";

interface SurveyBuilderProps {
  mode: "create" | "edit";
}

interface SurveyBuilderCreateProps extends SurveyBuilderProps {
  mode: "create";
}

interface SurveyBuilderUpdateProps extends SurveyBuilderProps {
  mode: "edit";
  id: string;
}

function SurveyBuilder(
  props: SurveyBuilderCreateProps | SurveyBuilderUpdateProps,
) {
  console.log(props);
  const { state, dispatch } = useSurveybuilder();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="sticky top-0 z-40 mb-2 flex items-center justify-between gap-2 bg-background py-2">
        <Input
          id="title"
          placeholder="Title of survey"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "EDIT_TITLE", payload: e.target.value })
          }
        />
        <Button>
          <Save className="h-4 w-4" /> Save Survey
        </Button>
      </div>
      <Tabs defaultValue="builder">
        <TabsList className="sticky top-[61px] z-40 mb-2 bg-background-input">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="builder">
          <SurveyBuilderContent />
        </TabsContent>
        <TabsContent value="preview">Preview</TabsContent>
      </Tabs>
    </div>
  );
}

export default SurveyBuilder;

function SurveyBuilderContent() {
  const { state } = useSurveybuilder();

  // Add dnd context here, also add tailwindscrollbar with thin on dialog
  return (
    <>
      <ul className="space-y-6">
        {state.fields.map((field) => (
          <Field key={field.id} field={field} />
        ))}
      </ul>
      <FieldDialog />
    </>
  );
}
