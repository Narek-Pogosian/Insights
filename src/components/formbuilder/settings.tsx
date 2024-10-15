import { type FormbuilderProps } from ".";
import { saveForm, updateForm } from "@/server/actions/form";
import { useFormbuilder } from "./hooks/use-formbuilder";
import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

function FormbuilderSettings(props: FormbuilderProps) {
  const { dispatch, state } = useFormbuilder();

  const { execute: save, isPending: saving } = useAction(saveForm, {
    onError: (err) => {
      if (err.error.validationErrors) {
        const errors = err.error.validationErrors?.fieldErrors;
        if (errors.title) {
          toast(errors.title[0]);
        } else if (errors.form) {
          toast(errors.form[0]);
        }
      } else {
        toast("Something went wrong");
      }
    },
    onSuccess: () => {
      toast("New survey created");
      dispatch({ type: "RESET" });
    },
  });

  const { execute: update, isPending: updating } = useAction(updateForm, {
    onError: (err) => {
      // For some reason the validation errors don't show up in err.errors.validationErrors,
      if (!err.input.form.title) {
        toast("Title is required");
      } else if (err.input.form.form.length === 0) {
        toast("At least 1 field is required");
      } else {
        toast("Something went wrong");
      }
    },
    onSuccess: () => {
      toast("Saved");
    },
  });

  async function handleSave() {
    if (saving || updating) return;
    if (props.mode === "create") {
      save({ title: state.title, form: state.fields });
    } else {
      update({
        form: { title: state.title, form: state.fields },
        id: props.id,
      });
    }
  }

  return (
    <div className="mb-4 flex gap-2">
      <Input
        id="title"
        type="text"
        aria-label="Title of survey"
        placeholder="Title of survey"
        value={state.title}
        onChange={(e) =>
          dispatch({ type: "EDIT_TITLE", payload: e.target.value })
        }
      />
      <Button
        onClick={handleSave}
        loading={saving || updating}
        disabled={saving || updating}
      >
        Save
      </Button>
    </div>
  );
}

export default FormbuilderSettings;
