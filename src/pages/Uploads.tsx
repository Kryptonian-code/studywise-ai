import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, File, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const Uploads = () => {
  const [files, setFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map((f) => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      type: f.type,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} file(s) added`);
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const getIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.includes("pdf")) return FileText;
    return File;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">File Upload Center</h1>
          <p className="mt-1 text-muted-foreground">Upload transcripts, CVs, guidelines, and other documents. Supports PDF, images, and more.</p>
        </div>

        {/* Dropzone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center transition-colors hover:border-primary/50 hover:bg-accent/30"
        >
          <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">Drop files here or click to browse</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG, DOCX — up to 20MB each</p>
          <input ref={inputRef} type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png,.docx,.doc" onChange={(e) => handleFiles(e.target.files)} />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-display text-lg font-semibold">Uploaded Files</h2>
            {files.map((f, i) => {
              const Icon = getIcon(f.type);
              return (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3 shadow-sm">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.size}</p>
                  </div>
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Uploads;
