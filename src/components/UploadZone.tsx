import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFilesAdded: (files: File[]) => void;
  hasImages: boolean;
}

const UploadZone = ({ onFilesAdded, hasImages }: UploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300 cursor-pointer group",
        "hover:border-primary hover:bg-primary/5",
        isDragActive
          ? "border-primary bg-primary/10 scale-[1.02]"
          : "border-border bg-card",
        hasImages ? "py-8" : "min-h-[320px] flex items-center justify-center"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div
          className={cn(
            "p-4 rounded-2xl transition-all duration-300",
            isDragActive
              ? "bg-primary text-primary-foreground scale-110"
              : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
          )}
        >
          {isDragActive ? (
            <Upload className="w-12 h-12 animate-bounce" />
          ) : (
            <ImageIcon className="w-12 h-12" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {hasImages ? "Add More Images" : "Upload Your Images"}
          </h3>
          <p className="text-muted-foreground">
            {isDragActive
              ? "Drop your images here..."
              : "Drag & drop images here, or click to browse"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Supports JPG, PNG, WEBP, GIF
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
