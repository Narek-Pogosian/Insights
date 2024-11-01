import { arrayMove } from "@dnd-kit/sortable";
import {
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { useState } from "react";
import { useSurveybuilder } from "./use-surveybuilder";

export function useDragBuilder() {
  const { state, dispatch } = useSurveybuilder();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const oldIndex = state.fields.findIndex((o) => o.id === active.id);
      const newIndex = state.fields.findIndex((o) => o.id === over.id);

      dispatch({
        type: "SET_FIELDS",
        payload: arrayMove(state.fields, oldIndex, newIndex),
      });
    }
    setActiveId(null);
  }

  return { activeId, handleDragStart, handleDragEnd };
}
