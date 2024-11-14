"use client";

import SurveyRendererPreview from "../surveyrenderer/surveyrenderer-preview";
import BuilderContent from "./builder-content";
import SurveyBuilderSettings from "./settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { Eye, Hammer } from "lucide-react";

interface BaseProps {
  mode: "create" | "edit";
}
interface SurveyBuilderCreateProps extends BaseProps {
  mode: "create";
}
interface SurveyBuilderUpdateProps extends BaseProps {
  mode: "edit";
  id: string;
}

export type BuilderProps = SurveyBuilderCreateProps | SurveyBuilderUpdateProps;

function SurveyBuilder(props: BuilderProps) {
  const { state } = useSurveybuilder();

  return (
    <div className="mx-auto max-w-2xl">
      <Tabs defaultValue="builder">
        <div className="sticky top-0 z-50 -mt-2 mb-8 flex flex-col gap-2 bg-background py-2 md:flex-row md:py-3">
          <SurveyBuilderSettings {...props} />
          <TabsList className="w-fit justify-start bg-background-card shadow-sm dark:shadow dark:shadow-black">
            <TabsTrigger value="builder" className="h-full">
              <Hammer className="mr-2 size-4" /> Builder
            </TabsTrigger>
            <TabsTrigger value="preview" className="h-full">
              <Eye className="mr-2 size-4" /> Preview
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="builder">
          <BuilderContent />
        </TabsContent>
        <TabsContent value="preview">
          <SurveyRendererPreview survey={state.fields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SurveyBuilder;
