import { type FormSchemaField } from "@/lib/schemas/form-schema";
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
import FieldAdder from ".";

interface Props {
  defaultField?: FormSchemaField;
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
          size={defaultField ? "sm" : "default"}
          variant="outline"
          className={defaultField ? "" : "w-full bg-background-card"}
        >
          {defaultField ? "Edit" : "Add Field"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-8">
        <DialogHeader>
          <DialogTitle>
            {defaultField ? "Edit field" : "Create field"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FieldAdder defaultField={defaultField} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default FieldDialog;
