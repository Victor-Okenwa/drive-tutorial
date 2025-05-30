"use client";
import { useMemo, useState } from "react";
import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";
import type { files, folders } from "~/server/db/schema";

export default function DriveContents(props: { files: typeof files.$inferSelect[], folders: typeof folders.$inferSelect[] }) {
  const { files, folders } = props;
  const [currentFolder, setCurrentFolder] = useState<number>(1);


  const handleFolderClick = (folderId: number) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let currentId = BigInt(currentFolder);

    while (currentId !== BigInt(1)) {
      const folder = folders.find((file) => file.id === BigInt(currentId));
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId =BigInt(folder.parent ?? 1);
      } else {
        break;
      }
    }

    return breadcrumbs;
  }, [currentFolder, folders]);

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder(1)}
              variant="ghost"
              className="mr-2 text-gray-300 hover:text-white"
            >
              My Drive
            </Button>
            {breadcrumbs.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(Number(folder.id ?? 1))}
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {folders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => handleFolderClick(Number(folder.id))}
              />
            ))}
            {files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
