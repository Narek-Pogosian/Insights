import { type FormSchema } from "@/lib/schemas/form-schema";
import FormRenderer from ".";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

function PreviewDialog({ form }: { form: FormSchema }) {
  return (
    <Dialog>
      <DialogTrigger className="!mt-0" asChild>
        <Button>Preview Survey</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>
        <FormRenderer mode="preview" form={form} />
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialog;
