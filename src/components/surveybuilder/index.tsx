"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useFormbuilder } from "./hooks/use-formbuilder";
// import FormRenderer from "../formrenderer";
// import FieldDialog from "./field-adder/field-dialog";
// import FieldList from "./field-list";

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

type SurveybuilderProps = SurveyBuilderCreateProps | SurveyBuilderUpdateProps;

function SurveyBuilder(props: SurveybuilderProps) {
  console.log(props);
  // const { state } = useFormbuilder();

  return (
    <div className="max-w-3xl">
      <p>Settings</p>
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
