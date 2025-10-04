import { useEffect, useState } from "react";
import { Search, Scan, Shield, History, Settings, FileSearch } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

export const CommandPalette = ({ isOpen, onClose, commands }: CommandPaletteProps) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-md border-primary/30 p-0 max-w-2xl">
        <DialogHeader className="p-4 border-b border-primary/20">
          <DialogTitle className="text-primary font-mono flex items-center gap-2">
            <Search className="w-5 h-5" />
            Command Palette
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands..."
            className="bg-muted/30 border-primary/20 focus:border-primary font-mono"
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No commands found</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg transition-all
                    ${
                      index === selectedIndex
                        ? "bg-primary/20 border border-primary/40"
                        : "hover:bg-muted/30 border border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">{cmd.icon}</span>
                    <span className="font-mono text-sm">{cmd.label}</span>
                  </div>
                  {cmd.shortcut && (
                    <kbd className="px-2 py-1 text-xs bg-muted/50 border border-primary/20 rounded font-mono">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
