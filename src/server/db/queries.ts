import "server-only"; // Ensure this file is server-only
import {
    files_table as filesSchema,
    folders_table as foldersSchema,
} from "~/server/db/schema";
import { db } from "~/server/db"; // Add this import for db instance
import { eq } from "drizzle-orm";

export const QUERIES = {
    getAllParentsForFolder: async function (folderId: number) {
        console.log(folderId)
        const parents = [];
        let currentId: number | null = folderId;
        const visited = new Set<number>();

        while (currentId !== null) {
            if (visited.has(currentId)) {
                throw new Error(`Detected circular parent reference at folder id ${currentId}`);
            }
            visited.add(currentId);

            const folder = await db
                .selectDistinct()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentId));

            if (!folder[0]) {
                throw new Error(`Parent Folder not found for id ${currentId}`);
            }

            parents.unshift(folder[0]);
            // Stop if we've reached the root folder (id = 1)
            if (currentId === 1) {
                break;
            }
            currentId = (folder[0].parent === null || folder[0].parent === 0)
                ? null
                : Number(folder[0].parent);
        }

        return parents;
    },
    getFiles: function (folderId: number) {
        return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, folderId)).orderBy(filesSchema.id);
    },

    getFolders: function (folderId: number) {
        return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId)).orderBy(foldersSchema.id);
    },
    getFolderById: async function (folderId: number) {
        const folder = await  db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId));
        return folder[0];
    }
}

export const MUTATION = {
    createFile: async function (input: { file: { name: string, size: string, parent: number, url: string }, userId: string }) {
        console.log( "New File", input.file);
        return await db.insert(filesSchema).values({
            ...input.file,
            ownerId: input.userId
        })
    }
}
