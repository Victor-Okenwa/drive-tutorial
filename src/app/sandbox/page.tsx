import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders, files } from "~/server/db/schema";
export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          console.log("Seed function called");
        const folderInsert =  await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: BigInt(index + 1),
              name: folder.name,
              parent: BigInt(index !== 0 ? 1 : 0), // Always provide a bigint value
            }))
          );
               console.log("Folder insert result:", folderInsert);   
         const fileInsert =    await db.insert(files).values(mockFiles.map((file, index) => ({
            id: BigInt(index + 1),
            name: file.name,
            size: "5000",
            url: file.url,
            parent: BigInt(String((index % 3) + 1)), // Convert to string before BigInt
         })));
            console.log("File insert result:", fileInsert);
        }}
      >
        <button type="submit">Call Seed</button>
      </form>
    </div>
  );
}
