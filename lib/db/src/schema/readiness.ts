import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { consultingProjects } from "./index";

export const readinessAssessments = pgTable(
  "readiness_assessments",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => consultingProjects.id, { onDelete: "cascade" }),
    needType: text("need_type").notNull(),
    selectedStandards: jsonb("selected_standards")
      .$type<string[]>()
      .notNull(),
    checkedItems: jsonb("checked_items").$type<string[]>().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    projectUnique: uniqueIndex("readiness_assessments_project_unique").on(
      table.projectId,
    ),
  }),
);

export type ReadinessAssessment = typeof readinessAssessments.$inferSelect;