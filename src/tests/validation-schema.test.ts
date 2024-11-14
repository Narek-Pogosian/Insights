import { createValidationSchema } from "../components/surveyrenderer/create-validation";
import { type SurveySchema } from "@/lib/zod/survey-schemas";
import { describe, it, expect } from "vitest";

describe("createValidationSchema", () => {
  it("should create a schema for text and textarea field with min and max length", async () => {
    const survey: SurveySchema = [
      {
        id: "id",
        type: "text",
        label: "username",
        placeholder: "",
        required: true,
      },
      {
        id: "id",
        type: "text",
        label: "bio",
        placeholder: "",
        required: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("username");
    expect(schema.shape).toHaveProperty("bio");

    await expect(
      schema.parseAsync({ username: "a", bio: "okay" }),
    ).rejects.toThrow(/at least 3 characters/);

    await expect(
      schema.parseAsync({ username: "okay", bio: "a" }),
    ).rejects.toThrow(/at least 3 characters/);

    await expect(
      schema.parseAsync({ username: "a".repeat(11), bio: "okay" }),
    ).rejects.toThrow(/at most 10 characters/);

    await expect(
      schema.parseAsync({ username: "okay", bio: "a".repeat(11) }),
    ).rejects.toThrow(/at most 10 characters/);

    await expect(
      schema.parseAsync({ username: "valid", bio: "valid" }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for optional text and number fields", async () => {
    const survey: SurveySchema = [
      {
        id: "id1",
        type: "text",
        label: "nickname",
        required: false,
        placeholder: "",
      },
      {
        id: "id2",
        type: "number",
        label: "age",
        required: false,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("nickname");
    expect(schema.shape).toHaveProperty("age");

    await expect(
      schema.parseAsync({ nickname: "", age: "" }),
    ).resolves.not.toThrow();

    await expect(
      schema.parseAsync({ nickname: undefined, age: undefined }),
    ).resolves.not.toThrow();

    await expect(
      schema.parseAsync({ nickname: "name", age: undefined }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for a number field with min and max", async () => {
    const survey: SurveySchema = [
      {
        id: "id",
        type: "number",
        label: "age",
        min: 18,
        max: 99,
        required: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("age");

    await expect(schema.parseAsync({ age: 17 })).rejects.toThrow(/at least 18/);
    await expect(schema.parseAsync({ age: 100 })).rejects.toThrow(/at most 99/);
    await expect(schema.parseAsync({ age: 50 })).resolves.not.toThrow();
  });

  it("should create a schema for a checkbox that passes", async () => {
    const survey: SurveySchema = [
      {
        id: "id",
        type: "checkbox",
        label: "consent",
        required: false,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("consent");

    await expect(schema.parseAsync({ consent: true })).resolves.not.toThrow();
    await expect(schema.parseAsync({ consent: false })).resolves.not.toThrow();
  });

  it("should create a schema for 2 radio groups where one is required and checks different inputs", async () => {
    const survey: SurveySchema = [
      {
        id: "id",
        type: "options",
        label: "radio1",
        required: false,
        options: [
          { value: "option1" },
          { value: "option2" },
          { value: "option3" },
        ],
      },
      {
        id: "id",
        type: "options",
        label: "radio2",
        required: true,
        options: [
          { value: "option1" },
          { value: "option2" },
          { value: "option3" },
        ],
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("radio1");
    expect(schema.shape).toHaveProperty("radio2");

    await expect(
      schema.parseAsync({ radio1: undefined, radio2: "option1" }),
    ).resolves.not.toThrow();
    await expect(
      schema.parseAsync({ radio1: "option1", radio2: undefined }),
    ).rejects.toThrow(/Required/);
    await expect(
      schema.parseAsync({ radio1: "invalid option", radio2: undefined }),
    ).rejects.toThrow(/Invalid option/);
  });

  it("should throw an error for unsupported field type", () => {
    const survey = [
      {
        id: "id",
        type: "unsupported",
        label: "unsupportedField",
        required: true,
      },
      {
        id: "id",
        type: "number",
        label: "age",
        min: 18,
        max: 99,
        required: true,
      },
    ];

    // @ts-expect-error we are testing a wrong input
    expect(() => createValidationSchema(survey)).toThrow(
      /Unsupported field type/,
    );
  });
});
