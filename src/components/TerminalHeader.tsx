import { Shield, Settings, History, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TerminalHeaderProps {
  onOpenCommands: () => void;
}

export const TerminalHeader = ({ 
  onOpenCommands 
}: TerminalHeaderProps) => {
  return (
    <header className="border-b border-primary/30 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-10 h-10 text-primary animate-pulse-glow drop-shadow-[0_0_15px_rgba(0,255,102,0.8)]" />
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-primary tracking-wider glow-text">
              CYBERSHIELD
            </h1>
            <p className="text-xs text-secondary/80 font-terminal tracking-wide">
              Advanced Malware Detection Terminal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenCommands}
            className="border-secondary/30 hover:border-secondary hover:bg-secondary/10"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-4 h-4" />
          </Button>
          <Link to="/history">
            <Button
              variant="outline"
              size="icon"
              className="border-secondary/30 hover:border-secondary hover:bg-secondary/10"
            >
              <History className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/settings">
            <Button
              variant="outline"
              size="icon"
              className="border-secondary/30 hover:border-secondary hover:bg-secondary/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
