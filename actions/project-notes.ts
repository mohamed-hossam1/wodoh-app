"use server";

import { db } from "@/db";
import { projectNotes } from "@/db/schema";
import { handleAction } from "@/lib/action-handler";
import { AppError, NotFoundError } from "@/lib/error";
import { projectNotesSchema } from "@/lib/validations";
import { zodValidate } from "@/lib/zod-validate";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getProject } from "./projects";

type ProjectNoteFormData = z.infer<typeof projectNotesSchema>;

export async function createProjectNote(
  formData: ProjectNoteFormData,
  projectId: string,
) {
  return handleAction(async () => {
    const validatedNoteData = zodValidate(projectNotesSchema, formData);

    await getProject(projectId);

    const [newProjectNote] = await db
      .insert(projectNotes)
      .values({
        projectId,
        name: validatedNoteData.name,
        content: validatedNoteData.content,
      })
      .returning();

    if (!newProjectNote) {
      throw new AppError("Project note was not created");
    }

    return { newProjectNote };
  });
}

export async function getProjectNotes(projectId: string) {
  return handleAction(async () => {
    const allProjectNotes = await db
      .select()
      .from(projectNotes)
      .where(eq(projectNotes.projectId, projectId));

    return { allProjectNotes };
  });
}

export async function updateProjectNote(
  projectNoteId: string,
  formData: Partial<ProjectNoteFormData>,
) {
  return handleAction(async () => {
    const validatedNoteData = zodValidate(
      projectNotesSchema,
      formData,
      "PARTIAL",
    );

    const [projectNote] = await db
      .update(projectNotes)
      .set(validatedNoteData)
      .where(eq(projectNotes.id, projectNoteId))
      .returning();

    if (!projectNote) throw new NotFoundError("projectNote");

    return { projectNote };
  });
}

export async function deleteProjectNote(projectNoteId: string) {
  return handleAction(async () => {
    const [deletedProjectNote] = await db
      .delete(projectNotes)
      .where(eq(projectNotes.id, projectNoteId))
      .returning();

    if (!deletedProjectNote) throw new NotFoundError("projectNote");

    return { deletedProjectNote };
  });
}
