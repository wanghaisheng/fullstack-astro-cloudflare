import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todo = sqliteTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  oauthId: text("oauth_id", { length: 255 }).unique().notNull(),
  authType: text("oauth_type", { enum: ["google", "github"] }).notNull(),
  username: text("username").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
});
