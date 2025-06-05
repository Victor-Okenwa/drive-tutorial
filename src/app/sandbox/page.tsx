import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table, files_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
export default async function Sandbox() {
  const user = await auth();
  if (!user.userId) throw new Error("User not authenticated");
  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));

  console.log(folders);
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          "use server";
          const user = await auth();
          // console.log(user);
          if (!user.userId) throw new Error("User not authenticated");

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: null, // Assuming root folder has no parent
            })
            .$returningId();
          console.log(rootFolder);

          const insertFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id, // Assuming all mock folders are children of the root
          }));
          await db.insert(folders_table).values(insertFolders);
          
          const insertFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id, // Assuming all mock folders are children of the root
          }));
          await db.insert(folders_table).values(insertFolders);
        
        }}
      >
        <button type="submit">Create File</button>
      </form>
    </div>
  );
}
