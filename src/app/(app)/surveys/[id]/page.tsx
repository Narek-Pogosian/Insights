import { formSchema } from "@/lib/schemas/form-schema";
import { getFormById } from "@/server/data-access/form";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { parsePrismaJson } from "@/lib/utils";
import { Suspense } from "react";
import Answers from "./_components/answers";
import PageTitle from "../../_components/page-title";
import CancelFormDialog from "../_components/cancel-form-dialog";
import UncancelButton from "../_components/uncancel-button";
import SurveyInformation from "./_components/survey-information";
import DeleteFormDialog from "../_components/delete-form-dialog";
import SharePopover from "../_components/share-popover";
import PreviewDialog from "@/components/formrenderer/preview-dialog";

async function page({ params }: { params: { id: string } }) {
  const form = await getFormById(params.id);

  if (!form) notFound();
  if (form.status === "DRAFT") redirect(`/surveys/${params.id}/edit`);

  const session = await getServerAuthSession();
  if (form.userId !== session?.user.id) notFound();

  const { data, success } = formSchema.safeParse(parsePrismaJson(form.content));
  if (!data || !success) notFound();

  return (
    <div className="space-y-6">
      <PageTitle>{form?.title}</PageTitle>
      <PreviewDialog form={data} />
      <SurveyInformation form={form} />

      <section aria-describedby="actions">
        <h2
          id="actions"
          className="mb-1 text-lg font-semibold text-foreground-muted"
        >
          Actions
        </h2>
        <div className="flex gap-2">
          {form.status === "PUBLISHED" ? (
            <div className="flex gap-2">
              <CancelFormDialog id={form.id} />
              <SharePopover id={form.id} />
            </div>
          ) : (
            <UncancelButton id={form.id} />
          )}
          <DeleteFormDialog id={form.id} />
        </div>
      </section>

      <section aria-describedby="answers">
        <h2
          id="answers"
          className="mb-1 text-lg font-semibold text-foreground-muted"
        >
          Answers
        </h2>
        <Suspense fallback={<p>Loading answers...</p>}>
          <Answers id={form.id} title={form.title} />
        </Suspense>
      </section>
    </div>
  );
}

export default page;
