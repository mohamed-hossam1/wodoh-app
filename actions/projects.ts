"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { cookies } from "next/headers";
import { handleAction } from "@/lib/action-handler";
import { AppError, NotFoundError } from "@/lib/error";
import {
  mapProjectCreateValues,
  mapProjectValues,
  type ProjectFormData,
} from "@/lib/project-values";
import { projectsSchema } from "@/lib/validations";
import { zodValidate } from "@/lib/zod-validate";
import { and, eq } from "drizzle-orm";

export async function createProject(
  projectData: ProjectFormData,
  clientId: string,
) {
  return handleAction(async () => {
    const validated = zodValidate(projectsSchema, projectData);
    const cookieStore = await cookies();
    const organizationId = cookieStore.get("org_id")?.value;
    if (!organizationId) throw new NotFoundError("organizationId");

    const [newProject] = await db
      .insert(projects)
      .values(mapProjectCreateValues(validated, organizationId, clientId))
      .returning();
    if (!newProject) {
      throw new AppError("Project was not created");
    }

    return { newProject };
  });
}

export async function getProjects() {
  return handleAction(async () => {
    const cookieStore = await cookies();
    const organizationId = cookieStore.get("org_id")?.value;

    if (!organizationId) throw new NotFoundError("organizationId");

    const allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, organizationId));

    return { allProjects };
  });
}

export async function getProject(projectId: string) {
  return handleAction(async () => {
    const cookieStore = await cookies();
    const organizationId = cookieStore.get("org_id")?.value;

    if (!organizationId) throw new NotFoundError("organizationId");

    const Project = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.organizationId, organizationId),
          eq(projects.id, projectId),
        ),
      );

    return { Project };
  });
}

export async function updateProject(
  projectId: string,
  formData: Partial<ProjectFormData>,
) {
  return handleAction(async () => {
    const validated = zodValidate(projectsSchema, formData, "PARTIAL");

    const cookieStore = await cookies();
    const organizationId = cookieStore.get("org_id")?.value;

    if (!organizationId) throw new NotFoundError("organizationId");

    const project = await db
      .update(projects)
      .set(mapProjectValues(validated))
      .where(
        and(
          eq(projects.organizationId, organizationId),
          eq(projects.id, projectId),
        ),
      )
      .returning();

    return { project };
  });
}
