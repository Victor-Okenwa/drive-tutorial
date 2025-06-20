"use client";

import type { files_table, folders_table } from "~/server/db/schema";
import { type Folder, type File } from "../../../lib/mock-data";
import { FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { deleteFiles } from "../../../server/actions";

export const FileRow = (props: { file: typeof files_table.$inferSelect }) => {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400"></div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1">
          <Button
            variant="ghost"
            type="button"
            onClick={async () => {
              await deleteFiles(Number(file.id));
              console.log("FILE TO DELETE", file.id);
            }}
            arial-label="delete button"
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
};

export const FolderRow = (props: {
  folder: typeof folders_table.$inferSelect;
}) => {
  const { folder } = props;
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400">
          {/*folder.type === "folder" ? "--" : "2 MB"*/}
        </div>
      </div>
    </li>
  );
};
