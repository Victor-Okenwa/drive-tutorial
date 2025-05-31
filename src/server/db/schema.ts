import "server-only";
import { text, index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator((name: string) => `drive_tutorial_${name}`,);

// export const users = singlestoreTable("users_table", {
//   id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

export const files = createTable("files_table", {
  id: bigint("id", { mode: "bigint", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  url: text("url").notNull(), // URL for files, null for folders
  parent: bigint("parent", { mode: "bigint", unsigned: true }).notNull(),
  size: text("size").notNull(), // Size of the file, can be null for folders
}, (t) => {
  return [index("parent_index").on(t.parent)]
});

export const folders = createTable("folders_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
   parent: bigint("parent", { mode: "bigint", unsigned: true }).notNull(), // Parent folder ID, null for root
}, (t) => {
  return [index("parent_index").on(t.parent)]
});