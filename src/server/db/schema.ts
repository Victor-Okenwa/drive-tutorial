// import "server-only";
import { text, index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";
import { timestamp } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator((name: string) => `drive_tutorial_${name}`,);

// export const users = singlestoreTable("users_table", {
//   id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

export const files_table = createTable("files_table", {
  id: bigint("id", { mode: "bigint", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(), // Owner ID, can be null for public files
  name: text("name").notNull(),
  size: text("size").notNull(), // Size of the file, can be null for folders
  url: text("url").notNull(), // URL for files, null for folders
  parent: bigint("parent", { mode: "bigint", unsigned: true }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (t) => {
  return [index("parent_index").on(t.parent), index("owner_id_index").on(t.ownerId)]
});



export const folders_table = createTable("folders_table", {
  id: bigint("id", { mode: "bigint", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(), // Owner ID, can be null for public folders
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "bigint", unsigned: true }), // Parent folder ID, null for root
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (t) => {
  return [index("parent_index").on(t.parent), index("owner_id_index").on(t.ownerId)]
});
export type DB_FILEType = typeof files_table.$inferSelect;
export type DB_FOLDERType = typeof folders_table.$inferSelect;