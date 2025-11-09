"use client";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FileUpload = ({ onFileUpload, folder }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setShowConfirm(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!folder) {
      toast.error("Folder is not specified.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folder", folder);

    try {
      setIsUploading(true);
      const res = await api.post("/api/util/upload", formData);
      const data = res.data;

      if (res.status === 200) {
        toast.success("File uploaded successfully!");
        onFileUpload(data.url);
        setSelectedFile(null);
        setPreviewURL("");
        setShowConfirm(false);
      } else {
        toast.error("Upload failed: " + (data.error || "Unknown error."));
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <label
          htmlFor="uploadFile"
          className="bg-white text-slate-500 font-semibold text-base rounded-xl h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 mb-3 fill-gray-500"
            viewBox="0 0 32 32"
          >
            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
          </svg>
          {isUploading ? "Uploading..." : "Upload file"}
          <input id="uploadFile" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-center">
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="rounded-md border w-full max-w-xs object-contain"
              />
            )}
            <p className="text-sm text-slate-500">{selectedFile?.name}</p>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileUpload;
