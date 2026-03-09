import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  date,
  jsonb,
  index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ===== Organizations =====
export const organizations = pgTable(
  'organizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    plan: text('plan').notNull().default('free'),
    stripeCustomerId: text('stripe_customer_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_organizations_user_id').on(table.userId),
    index('idx_organizations_deleted_at').on(table.deletedAt),
  ]
)

export const organizationsRelations = relations(organizations, ({ many }) => ({
  clients: many(clients),
  projects: many(projects),
  projectPayments: many(projectPayments),
}))

// ===== Clients =====
export const clients = pgTable(
  'clients',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),
    name: text('name').notNull(),
    phone: text('phone'),
    portalToken: uuid('portal_token').notNull().unique().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_clients_organization_id').on(table.organizationId),
    index('idx_clients_deleted_at').on(table.deletedAt),
    index('idx_clients_portal_token').on(table.portalToken),
  ]
)

export const clientsRelations = relations(clients, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [clients.organizationId],
    references: [organizations.id],
  }),
  projects: many(projects),
}))

// ===== Projects =====
export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clients.id),
    name: text('name').notNull(),
    description: text('description'),
    status: text('status').notNull().default('active'),
    totalValue: numeric('total_value').notNull().default('0'),
    startDate: date('start_date'),
    deliveryDate: date('delivery_date'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_projects_organization_id').on(table.organizationId),
    index('idx_projects_client_id').on(table.clientId),
    index('idx_projects_status').on(table.status),
    index('idx_projects_deleted_at').on(table.deletedAt),
    index('idx_projects_created_at').on(table.createdAt),
  ]
)

export const projectsRelations = relations(projects, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
  phases: many(projectPhases),
  payments: many(projectPayments),
  files: many(projectFiles),
  updates: many(projectUpdates),
  notes: many(projectNotes),
}))

// ===== Project Notes =====
export const projectNotes = pgTable(
  'project_notes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
    name: text('name').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_project_notes_project_id').on(table.projectId),
  ]
)

export const projectNotesRelations = relations(projectNotes, ({ one }) => ({
  project: one(projects, {
    fields: [projectNotes.projectId],
    references: [projects.id],
  }),
}))

// ===== Project Phases =====
export const projectPhases = pgTable(
  'project_phases',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
    name: text('name').notNull(),
    orderIndex: integer('order_index').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_project_phases_project_id').on(table.projectId),
    index('idx_project_phases_order_index').on(table.orderIndex),
    index('idx_project_phases_deleted_at').on(table.deletedAt),
  ]
)

export const projectPhasesRelations = relations(projectPhases, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectPhases.projectId],
    references: [projects.id],
  }),
  tasks: many(tasks),
}))

// ===== Tasks =====
export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    phaseId: uuid('phase_id')
      .notNull()
      .references(() => projectPhases.id),
    name: text('name').notNull(),
    isCompleted: boolean('is_completed').notNull().default(false),
    orderIndex: integer('order_index').notNull().default(0),
    score: integer('score').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_tasks_phase_id').on(table.phaseId),
    index('idx_tasks_is_completed').on(table.isCompleted),
    index('idx_tasks_order_index').on(table.orderIndex),
  ]
)

export const tasksRelations = relations(tasks, ({ one }) => ({
  phase: one(projectPhases, {
    fields: [tasks.phaseId],
    references: [projectPhases.id],
  }),
}))

// ===== Project Payments =====
export const projectPayments = pgTable(
  'project_payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),
    amount: numeric('amount').notNull().default('0'),
    status: text('status').notNull().default('upcoming'),
    dueDate: date('due_date'),
    paidDate: date('paid_date'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_project_payments_project_id').on(table.projectId),
    index('idx_project_payments_organization_id').on(table.organizationId),
    index('idx_project_payments_status').on(table.status),
    index('idx_project_payments_due_date').on(table.dueDate),
  ]
)

export const projectPaymentsRelations = relations(projectPayments, ({ one }) => ({
  project: one(projects, {
    fields: [projectPayments.projectId],
    references: [projects.id],
  }),
  organization: one(organizations, {
    fields: [projectPayments.organizationId],
    references: [organizations.id],
  }),
}))

// ===== Project Files =====
export const projectFiles = pgTable(
  'project_files',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
    name: text('name').notNull(),
    content: jsonb('content').default({}),
    visibility: text('visibility').notNull().default('client'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_project_files_project_id').on(table.projectId),
  ]
)

export const projectFilesRelations = relations(projectFiles, ({ one }) => ({
  project: one(projects, {
    fields: [projectFiles.projectId],
    references: [projects.id],
  }),
}))

// ===== Project Updates =====
export const projectUpdates = pgTable(
  'project_updates',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
    title: text('title').notNull(),
    content: text('content').notNull(),
    imageUrls: text('image_urls').array().default([]),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_project_updates_project_id').on(table.projectId),
    index('idx_project_updates_created_at').on(table.createdAt),
  ]
)

export const projectUpdatesRelations = relations(projectUpdates, ({ one }) => ({
  project: one(projects, {
    fields: [projectUpdates.projectId],
    references: [projects.id],
  }),
}))

// ===== Types =====
export type Organization = typeof organizations.$inferSelect
export type NewOrganization = typeof organizations.$inferInsert
export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type ProjectNote = typeof projectNotes.$inferSelect
export type NewProjectNote = typeof projectNotes.$inferInsert
export type ProjectPhase = typeof projectPhases.$inferSelect
export type NewProjectPhase = typeof projectPhases.$inferInsert
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export type ProjectPayment = typeof projectPayments.$inferSelect
export type NewProjectPayment = typeof projectPayments.$inferInsert
export type ProjectFile = typeof projectFiles.$inferSelect
export type NewProjectFile = typeof projectFiles.$inferInsert
export type ProjectUpdate = typeof projectUpdates.$inferSelect
export type NewProjectUpdate = typeof projectUpdates.$inferInsert