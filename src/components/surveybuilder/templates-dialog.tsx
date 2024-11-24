import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSurveybuilder } from "./hooks/use-surveybuilder";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function TemplatesDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Start from template</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl overflow-x-hidden overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">Choose a template</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TemplatesContent />
      </DialogContent>
    </Dialog>
  );
}

export default TemplatesDialog;

function TemplatesContent() {
  const { dispatch } = useSurveybuilder();

  function handleAddPersonalTemplate() {
    // @ts-expect-error It's correct
    dispatch({ type: "SET_FIELDS", payload: personal.fields });
    dispatch({ type: "EDIT_TITLE", payload: personal.title });
  }

  function handleAddCustomerTemplate() {
    // @ts-expect-error It's correct
    dispatch({ type: "SET_FIELDS", payload: customer.fields });
    dispatch({ type: "EDIT_TITLE", payload: customer.title });
  }

  return (
    <div className="flex justify-center gap-4">
      <Button onClick={handleAddPersonalTemplate}>Personal wellbeing</Button>
      <Button onClick={handleAddCustomerTemplate}>Customer satisfaction</Button>
    </div>
  );
}

const personal = {
  title: "Personal Well-Being & Lifestyle",
  fields: [
    {
      id: "feb7d97e-67cf-4da1-84ab-28ed193b7e36",
      type: "options",
      showDescription: false,
      description: "",
      label: "How old are you?",
      required: true,
      options: [
        {
          value: "0-18",
        },
        {
          value: "19-25",
        },
        {
          value: "26-35",
        },
        {
          value: "36-45",
        },
        {
          value: "46+",
        },
      ],
    },
    {
      id: "15e822f4-065f-41cb-b0a8-22cce887e121",
      type: "options",
      showDescription: true,
      description: "On average, how much sleep do you get in a typical night?",
      label: "How many hours of sleep do you usually get each night?",
      required: true,
      options: [
        {
          value: "Less than 5 hours",
        },
        {
          value: "5-7 hours",
        },
        {
          value: "8 hours",
        },
        {
          value: "More than 8 hours",
        },
      ],
    },
    {
      id: "eb9f99bf-ca42-4774-987c-92fa3c8cc86e",
      type: "options",
      showDescription: false,
      description: "",
      label: "How often do you exercise in a typical week?",
      required: true,
      options: [
        {
          value: "Never",
        },
        {
          value: "1-2 times",
        },
        {
          value: "3-4 times",
        },
        {
          value: "5 or more times",
        },
      ],
    },
    {
      id: "84083573-ec49-4d08-b47f-21dce4d1c4b5",
      type: "options",
      showDescription: true,
      description:
        "This refers to how you feel mentally on a regular basis. Consider factors like mood, stress, and emotional well-being.",
      label: "How would you rate your overall mental health?",
      required: true,
      options: [
        {
          value: "Poor",
        },
        {
          value: "Average",
        },
        {
          value: "Good",
        },
        {
          value: "Excellent",
        },
      ],
    },
    {
      id: "65036084-e3d9-44f7-95f5-751b414ee3b0",
      type: "text",
      showDescription: true,
      description:
        "Please briefly describe the source(s) of your stress (work, relationships, finances, etc.).",
      label: "What is one thing that currently causes you the most stress?",
      required: true,
      longAnswer: false,
      placeholder: "Your answer",
    },
    {
      id: "b2148ccf-0ca6-4036-b59d-49e34c339d15",
      type: "options",
      showDescription: true,
      description:
        "Quality time refers to meaningful interaction, not just casual or brief interactions. This could include shared meals, conversations, or activities.",
      label: "How often do you spend quality time with family or friends?",
      required: true,
      options: [
        {
          value: "Daily",
        },
        {
          value: "Weekly",
        },
        {
          value: "Monthly",
        },
        {
          value: "Rarely",
        },
      ],
    },
    {
      id: "4fcea9ec-878a-4197-8aed-2a696052a343",
      type: "options",
      showDescription: true,
      description:
        "Work-life balance refers to how well you are managing the demands of work or school with personal time, family, and relaxation.",
      label: "How would you describe your current work-life balance?",
      required: true,
      options: [
        {
          value: "Poor",
        },
        {
          value: "Average",
        },
        {
          value: "Good",
        },
        {
          value: "Very good",
        },
      ],
    },
    {
      id: "6e181a2b-0273-4d4d-8bd2-49ac73202887",
      type: "text",
      showDescription: true,
      description:
        "Think of a goal you have related to your health, well-being, or personal growth. This could be something like eating healthier, exercising more, or reducing stress.",
      label:
        "What is one habit or lifestyle change you’d like to improve or develop?",
      required: true,
      longAnswer: false,
      placeholder: "Your answer",
    },
    {
      id: "f004c365-172e-4658-bd91-d9ef3b0e005d",
      type: "text",
      showDescription: true,
      description:
        "Consider how you usually relax or unwind. This could include hobbies, leisure activities, or socializing.",
      label: "How do you prefer to spend your free time?",
      required: true,
      longAnswer: true,
      placeholder: "Your answer",
    },
    {
      id: "3a5dca3e-a455-4104-a294-604ba3e440ae",
      type: "text",
      showDescription: true,
      description:
        "Feel free to share anything that wasn’t covered in the previous questions but is important to your well-being or lifestyle.",
      label: "Any additional thoughts on your well-being or lifestyle?",
      required: false,
      longAnswer: true,
      placeholder: "Your answer",
    },
  ],
};

const customer = {
  title: "Customer Satisfaction",
  fields: [
    {
      id: "1246be87-cec3-4abc-a9c8-ff365db2f56a",
      type: "text",
      showDescription: true,
      description: "Please provide your full name for personalization.",
      label: "What is your name?",
      required: true,
      longAnswer: false,
      placeholder: "Your name",
    },
    {
      id: "f0241bcf-30a7-4c86-98f2-1e8505c40cc6",
      type: "email",
      showDescription: true,
      description:
        "We may use your email to send updates or responses related to this survey.",
      label: "What is your email address?",
      required: true,
      placeholder: "",
    },
    {
      id: "ae10f2c0-2979-4ca3-9c5f-8212867585c6",
      type: "options",
      showDescription: true,
      description: "Please select an option",
      label:
        "Overall, how satisfied are you with your recent experience with us?",
      required: true,
      options: [
        {
          value: "Very Satisfied",
        },
        {
          value: "Satisfied",
        },
        {
          value: "Neutral",
        },
        {
          value: "Dissatisfied",
        },
        {
          value: "Very Dissatisfied",
        },
      ],
    },
    {
      id: "cdd77145-5653-4f26-bf47-6c170b474997",
      type: "options",
      showDescription: false,
      description: "",
      label: "How easy was it to find what you were looking for?",
      required: true,
      options: [
        {
          value: "Very Easy",
        },
        {
          value: "Easy",
        },
        {
          value: "Neutral",
        },
        {
          value: "Difficult",
        },
        {
          value: "Very Difficult",
        },
      ],
    },
    {
      id: "5430ca20-7dd5-44dc-9085-f76dce464eb1",
      type: "options",
      showDescription: false,
      description: "",
      label:
        "How would you rate the quality of the product/service you received?",
      required: true,
      options: [
        {
          value: "Excellent",
        },
        {
          value: "Good",
        },
        {
          value: "Average",
        },
        {
          value: "Below Average",
        },
        {
          value: "Poor",
        },
      ],
    },
    {
      id: "7dca86bc-b60c-481c-b2ca-4e2cea625b50",
      type: "text",
      showDescription: false,
      description: "",
      label:
        "How could we improve our product/service to better meet your needs?",
      required: true,
      longAnswer: true,
      placeholder: "...",
    },
    {
      id: "e4a56ee2-5d5e-40db-9ccd-8f17707b11ef",
      type: "text",
      showDescription: false,
      description: "",
      label: "Any additional comments or suggestions?",
      required: false,
      longAnswer: true,
      placeholder: "...",
    },
    {
      id: "f12bd545-0916-4812-b209-f090f8ca0e35",
      type: "options",
      showDescription: false,
      description: "",
      label: "How did you hear about us?",
      required: false,
      options: [
        {
          value: "Word of Mouth",
        },
        {
          value: "Social Media",
        },
        {
          value: "Online Advertisement",
        },
        {
          value: "Search Engine",
        },
        {
          value: "Other",
        },
      ],
    },
  ],
};
