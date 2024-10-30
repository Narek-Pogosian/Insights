"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Save } from "lucide-react";

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
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center justify-between gap-2">
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
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="builder">
          {/* <FieldList /> */}
          {/* <FieldDialog /> */}
        </TabsContent>
        <TabsContent value="preview">Preview</TabsContent>
      </Tabs>
    </div>
  );
}

export default SurveyBuilder;
