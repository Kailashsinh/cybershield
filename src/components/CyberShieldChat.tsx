import { useState, useEffect, useRef } from "react";
import { Bot, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  severity?: number;
  timestamp: Date;
}

interface CyberShieldChatProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
}

export const CyberShieldChat = ({ isOpen, onClose, messages }: CyberShieldChatProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSeverityColor = (severity?: number) => {
    if (!severity) return "text-primary";
    if (severity >= 4) return "text-destructive";
    if (severity >= 3) return "text-accent";
    if (severity >= 2) return "text-secondary";
    return "text-primary";
  };

  const renderSeverityMeter = (severity: number) => {
    return (
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1.5 w-8 rounded-full transition-all ${
              level <= severity
                ? level >= 4
                  ? "bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]"
                  : level >= 3
                  ? "bg-accent shadow-[0_0_8px_hsl(var(--accent))]"
                  : "bg-secondary shadow-[0_0_8px_hsl(var(--secondary))]"
                : "bg-muted/30"
            }`}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-full md:w-96 bg-card/95 backdrop-blur-md border-l border-primary/30 z-40 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/30 bg-muted/30">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary animate-pulse" />
          <div>
            <h3 className="font-mono font-semibold text-primary">CyberShield AI</h3>
            <p className="text-xs text-muted-foreground">Terminal Assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-destructive/20 hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <Bot className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-sm">CyberShield AI ready 🚀</p>
              <p className="text-xs mt-2">Upload a file to begin analysis</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg border ${
                  msg.role === "assistant"
                    ? "bg-muted/30 border-primary/20"
                    : "bg-card/50 border-secondary/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-xs font-mono ${getSeverityColor(msg.severity)}`}>
                    {msg.role === "assistant" ? "CyberShield" : "You"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {msg.severity !== undefined && renderSeverityMeter(msg.severity)}

                {msg.role === "assistant" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="mt-2 h-7 text-xs hover:bg-primary/10"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
