import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  severity?: number;
  timestamp: Date;
}

interface TerminalOutputProps {
  messages: Message[];
}

export const TerminalOutput = ({ messages }: TerminalOutputProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [displayedMessages, setDisplayedMessages] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, displayedMessages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role === "user") return;

    const currentDisplayed = displayedMessages.get(lastMessage.id) || "";
    if (currentDisplayed.length < lastMessage.content.length) {
      const timer = setTimeout(() => {
        const nextChar = lastMessage.content[currentDisplayed.length];
        setDisplayedMessages(prev => new Map(prev).set(lastMessage.id, currentDisplayed + nextChar));
      }, 30);

      return () => clearTimeout(timer);
    }
  }, [messages, displayedMessages]);

  const getDisplayedContent = (message: Message) => {
    if (message.role === "user") return message.content;
    return displayedMessages.get(message.id) || "";
  };

  const renderSeverityMeter = (severity?: number) => {
    if (!severity) return null;
    return (
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1.5 w-8 rounded-full transition-all ${
              level <= severity
                ? severity >= 4
                  ? "bg-destructive shadow-[0_0_10px_hsl(var(--destructive))]"
                  : severity >= 3
                  ? "bg-accent shadow-[0_0_10px_hsl(var(--accent))]"
                  : "bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
                : "bg-muted/30"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <ScrollArea className="h-[500px] w-full">
      <div ref={scrollRef} className="space-y-4 p-6 font-terminal">
        {messages.map((message) => {
          const content = getDisplayedContent(message);
          const isTyping = message.role !== "user" && content.length < message.content.length;
          
          return (
            <div key={message.id} className="animate-fade-in">
              {message.role === "user" ? (
                <div className="flex items-start gap-3">
                  <span className="text-secondary font-bold select-none">cybershield&gt;</span>
                  <span className="text-foreground">{content}</span>
                </div>
              ) : (
                <div className="pl-4 border-l-2 border-primary/30">
                  <pre className="whitespace-pre-wrap text-sm text-primary/90 leading-relaxed terminal-text">
                    {content}
                    {isTyping && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink" />}
                  </pre>
                  {renderSeverityMeter(message.severity)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
