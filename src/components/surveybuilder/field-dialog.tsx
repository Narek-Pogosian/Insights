import { type SurveySchemaField } from "@/lib/zod/survey-schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import FieldAdder from "./field-adder";

interface Props {
  defaultField?: SurveySchemaField;
}

function FieldDialog({ defaultField }: Props) {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={defaultField ? "icon" : "default"}
          variant={defaultField ? "outline" : "default"}
          className={defaultField ? "size-8" : "mx-auto mt-8 block px-8"}
          aria-label="Edit field"
        >
          {defaultField ? <Pencil className="!size-4" /> : "Add Field"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {defaultField ? "Edit field" : "Add field"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FieldAdder defaultField={defaultField} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default FieldDialog;
