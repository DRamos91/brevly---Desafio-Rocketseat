import { pgTable, text, uuid, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    originalUrl: text("original_url").notNull(),
    shortCode: text("short_code").notNull(),
    accessCount: integer("access_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    shortCodeUnique: uniqueIndex("links_short_code_unique").on(t.shortCode),
  })
);