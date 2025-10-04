import { useState, useRef, KeyboardEvent } from "react";
import { ChevronRight } from "lucide-react";

interface TerminalInputProps {
  onCommand: (command: string) => void;
  isScanning?: boolean;
}

export const TerminalInput = ({ onCommand, isScanning }: TerminalInputProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (input.trim() && !isScanning) {
      onCommand(input.trim());
      setHistory([input.trim(), ...history]);
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-t border-primary/20">
      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
      <span className="text-primary font-mono">cybershield&gt;</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isScanning}
        placeholder="Enter command or type 'help'..."
        className="flex-1 bg-transparent border-none outline-none text-foreground font-mono placeholder:text-muted-foreground disabled:opacity-50"
      />
      <span className="animate-blink text-primary">_</span>
    </div>
  );
};
