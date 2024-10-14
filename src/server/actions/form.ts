"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { protectedActionClient } from ".";
import { createFormScema } from "@/lib/schemas/form-schema";
import { revalidatePath } from "next/cache";
import { getFormById } from "../data-access/form";
import { Status } from "@prisma/client";

export const saveForm = protectedActionClient
  .schema(createFormScema)
  .action(async ({ ctx, parsedInput }) => {
    const form = await db.form.create({
      data: {
        title: parsedInput.title,
        content: JSON.stringify(parsedInput.form),
        columns: parsedInput.columns,
        description: parsedInput.description,
        image: parsedInput.image,
        userId: ctx.userId,
        status: "DRAFT",
      },
    });

    if (form) revalidatePath("/surveys");
  });

export const updateForm = protectedActionClient
  .schema(z.object({ id: z.string(), form: createFormScema }))
  .action(async ({ ctx, parsedInput }) => {
    const form = await getFormById(parsedInput.id);
    if (form?.userId !== ctx.userId) return;

    const updatedForm = await db.form.update({
      where: { id: parsedInput.id },
      data: {
        title: parsedInput.form.title,
        columns: parsedInput.form.columns,
        description: parsedInput.form.description,
        image: parsedInput.form.image,
        content: JSON.stringify(parsedInput.form.form),
      },
    });
    if (updatedForm) revalidatePath("/surveys");
  });

export const updateStatus = protectedActionClient
  .schema(z.object({ id: z.string(), status: z.nativeEnum(Status) }))
  .action(async ({ ctx, parsedInput }) => {
    const form = await getFormById(parsedInput.id);
    if (form?.userId !== ctx.userId) return;

    const updatedForm = await db.form.update({
      where: { id: parsedInput.id },
      data: {
        status: parsedInput.status,
      },
    });

    if (updatedForm) revalidatePath("/surveys");
  });

export const deleteForm = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const form = await db.form.findFirst({ where: { id: parsedInput.id } });

    if (!form || form.userId !== ctx.userId) return;

    await db.form.delete({ where: { id: parsedInput.id } });
    revalidatePath("/surveys");
  });
