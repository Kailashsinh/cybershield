import { ArrowLeft, Shield, CheckCircle, AlertTriangle, XCircle, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MatrixBackground } from "@/components/MatrixBackground";

interface ScanHistoryItem {
  id: string;
  filename: string;
  timestamp: Date;
  status: "clean" | "suspicious" | "malicious";
  severity: number;
  threats?: string[];
}

// Mock data for demonstration
const mockHistory: ScanHistoryItem[] = [
  {
    id: "0xA4F2E1",
    filename: "document.pdf",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "clean",
    severity: 0,
  },
  {
    id: "0xB7C3D2",
    filename: "suspicious_script.js",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "suspicious",
    severity: 3,
    threats: ["Obfuscated code patterns", "Network calls to unknown domains"],
  },
  {
    id: "0xE8F1A5",
    filename: "malware_sample.exe",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: "malicious",
    severity: 5,
    threats: ["Trojan.Generic", "Keylogger signature detected", "Registry modification attempts"],
  },
  {
    id: "0xC9D4B3",
    filename: "report.docx",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: "clean",
    severity: 0,
  },
  {
    id: "0xF5A2E7",
    filename: "update.bat",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: "suspicious",
    severity: 2,
    threats: ["Batch script with system commands"],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "clean":
      return <CheckCircle className="h-5 w-5 text-primary" />;
    case "suspicious":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "malicious":
      return <XCircle className="h-5 w-5 text-destructive" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "clean":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Clean</Badge>;
    case "suspicious":
      return <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">Suspicious</Badge>;
    case "malicious":
      return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Malicious</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export default function History() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <MatrixBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 glow-text">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Terminal
            </Button>
          </Link>
          <h1 className="text-4xl font-orbitron font-bold glow-text mb-2">
            <Clock className="inline-block mr-3 h-8 w-8" />
            Scan History
          </h1>
          <p className="text-muted-foreground font-terminal">
            Review all previous malware scans and detections
          </p>
        </div>

        {/* History Timeline */}
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="bg-background/80 border border-primary/30 rounded-lg p-6 backdrop-blur-sm glow-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {getStatusIcon(item.status)}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-terminal font-semibold glow-text">
                        {item.filename}
                      </h3>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-terminal mb-3">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        ID: {item.id}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(item.timestamp)}
                      </span>
                    </div>

                    {/* Severity Meter */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-muted-foreground font-terminal">Severity:</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-8 rounded-full transition-all ${
                              i < item.severity
                                ? item.severity >= 4
                                  ? "bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]"
                                  : item.severity >= 2
                                  ? "bg-amber-500 shadow-[0_0_8px_rgb(245,158,11)]"
                                  : "bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                                : "bg-muted/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-terminal">
                        {item.severity}/5
                      </span>
                    </div>

                    {/* Threats Detected */}
                    {item.threats && item.threats.length > 0 && (
                      <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded">
                        <p className="text-sm font-terminal font-semibold text-destructive mb-2">
                          Threats Detected:
                        </p>
                        <ul className="space-y-1">
                          {item.threats.map((threat, idx) => (
                            <li key={idx} className="text-sm text-destructive/80 font-terminal flex items-start gap-2">
                              <span className="text-destructive">▸</span>
                              {threat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:border-primary"
                  >
                    View Details
                  </Button>
                  {item.status === "malicious" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive/30 hover:border-destructive text-destructive"
                    >
                      Quarantine
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no history) */}
        {mockHistory.length === 0 && (
          <div className="text-center py-16">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-terminal font-semibold text-muted-foreground mb-2">
              No Scan History
            </h3>
            <p className="text-sm text-muted-foreground">
              Your scan results will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
