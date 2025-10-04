import { useState, useCallback } from "react";
import { Upload, FileSearch, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ScanCardProps {
  onScan: (file: File) => void;
  isScanning: boolean;
}

export const ScanCard = ({ onScan, isScanning }: ScanCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      onScan(file);
    }
  }, [onScan]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onScan(file);
    }
  };

  return (
    <div className="relative">
      {/* Safety Warning */}
      <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-destructive mb-1">⚠️ Educational Use Only</p>
          <p className="text-muted-foreground text-xs">
            Do not upload real malware except in an isolated VM. This is a demo interface for educational purposes.
          </p>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-12 transition-all duration-300 glow-border
          ${isDragging 
            ? "border-primary bg-primary/5 scale-[1.02] animate-pulse-glow" 
            : "border-primary/50 bg-card/30 animate-pulse"
          }
          ${isScanning ? "opacity-50 pointer-events-none" : "hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"}
        `}
      >
        <div className="flex flex-col items-center gap-6">
          {isScanning ? (
            <>
              <div className="relative">
                <FileSearch className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute inset-0 animate-scan-wave">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-mono text-primary mb-2">Scanning in progress...</p>
                <p className="text-sm text-muted-foreground">Analyzing file for threats</p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-primary transition-transform hover:animate-float glow-text" />
              <div className="text-center terminal-text">
                <p className="text-lg font-mono text-foreground mb-2">
                  Drop file here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-secondary">cybershield&gt; scan file /path/to/file</span>
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isScanning}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isScanning}
                className="border-primary/30 hover:border-primary hover:bg-primary/10 text-primary"
              >
                Select File
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Scanning Effect Overlay */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 animate-pulse-glow" />
        </div>
      )}
    </div>
  );
};
