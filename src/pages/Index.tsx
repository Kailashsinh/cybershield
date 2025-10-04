import { useState, useEffect } from "react";
import { MatrixBackground } from "@/components/MatrixBackground";
import { TerminalHeader } from "@/components/TerminalHeader";
import { TerminalInput } from "@/components/TerminalInput";
import { ScanCard } from "@/components/ScanCard";
import { TerminalOutput } from "@/components/TerminalOutput";
import { CommandPalette } from "@/components/CommandPalette";
import { toast } from "sonner";
import { Scan, Shield, History, FileSearch } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  severity?: number;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "> Initializing CyberShield Engine...\n> Systems online. All defense protocols active.\n> Ready to analyze files for threats.\n\nWelcome, Operator. 🚀\n\nUpload a file or type 'help' for available commands.",
      timestamp: new Date(),
    },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const simulateScan = async (fileName: string) => {
    setIsScanning(true);

    // Simulate AI analysis with typewriter effect
    const addMessage = (content: string, severity?: number) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content,
          severity,
          timestamp: new Date(),
        },
      ]);
    };

    await new Promise((resolve) => setTimeout(resolve, 800));
    addMessage(`> Initializing deep scan on: ${fileName}...`);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    addMessage("> Scanning file structure and entropy...");

    await new Promise((resolve) => setTimeout(resolve, 1200));
    addMessage("> Checking hash signatures against threat database...");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    addMessage("> Running behavioral analysis...");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Random result for demo
    const isClean = Math.random() > 0.3;
    
    if (isClean) {
      addMessage(
        `> Scan complete.\n\n✅ All Systems Secure | No Threats Found (0/5)\n\nFile: ${fileName}\nStatus: CLEAN\nIntegrity: VERIFIED\n\n"Carry on, Operator. System integrity verified." 🛡️`,
        0
      );
      toast.success("Scan complete - File is clean");
    } else {
      const severity = Math.floor(Math.random() * 3) + 3; // 3-5
      addMessage(
        `> Scan complete.\n\n⚠️ Threat Detected | Risk Level: ${severity}/5\n\nFile: ${fileName}\nStatus: SUSPICIOUS\nThreat Signature: Matched\n\nRemediation: Quarantine recommended.\nCommand: cybershield> quarantine ${fileName}\n\n"Threat neutralization protocol ready. Standing by for orders." 🔍`,
        severity
      );
      toast.error("Threat detected!", {
        description: `Risk level: ${severity}/5`,
      });
    }

    setIsScanning(false);
  };

  const handleFileScan = (file: File) => {
    toast.info("Starting scan...", {
      description: file.name,
    });
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: `scan file ${file.name}`,
        timestamp: new Date(),
      },
    ]);

    simulateScan(file.name);
  };

  const handleCommand = (command: string) => {
    setCommandHistory((prev) => [command, ...prev]);
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: command,
        timestamp: new Date(),
      },
    ]);

    const cmd = command.toLowerCase().trim();

    if (cmd === "help") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content: `> Available commands:\n\n• scan [file] - Scan a file for threats\n• quarantine [file] - Quarantine suspicious file\n• history - View scan history\n• clear - Clear terminal\n• help - Show this message\n\nUse Ctrl+K for command palette. 💻\n\n"All systems operational. Ready for commands."`,
          timestamp: new Date(),
        },
      ]);
    } else if (cmd === "clear") {
      setMessages([
        {
          id: "welcome",
          role: "system",
          content: "> Terminal cleared. All buffers flushed.\n\n\"Ready for next operation, Operator.\"",
          timestamp: new Date(),
        },
      ]);
      toast.success("Terminal cleared");
    } else if (cmd === "history") {
      const historyText = commandHistory.slice(0, 10).join("\n");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content: `> Command history:\n\n${historyText || "No commands yet"}\n\n"History buffer retrieved."`,
          timestamp: new Date(),
        },
      ]);
    } else if (cmd.startsWith("scan")) {
      toast.info("Use drag & drop or file selector to scan files");
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content: `> Error: Unknown command '${command}'\n\nType 'help' for available commands.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const commands = [
    {
      id: "scan",
      label: "Scan File",
      icon: <Scan className="w-4 h-4" />,
      action: () => toast.info("Use drag & drop to scan files"),
    },
    {
      id: "history",
      label: "View History",
      icon: <History className="w-4 h-4" />,
      shortcut: "Ctrl+H",
      action: () => handleCommand("history"),
    },
    {
      id: "clear",
      label: "Clear Terminal",
      icon: <FileSearch className="w-4 h-4" />,
      action: () => handleCommand("clear"),
    },
    {
      id: "help",
      label: "Show Help",
      icon: <Shield className="w-4 h-4" />,
      action: () => handleCommand("help"),
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden crt-effect">
      <MatrixBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <TerminalHeader
          onOpenCommands={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 container mx-auto px-6 py-8 flex flex-col gap-6 pb-20">
          <div className="bg-[#0a0f0a]/80 backdrop-blur-sm border-2 border-primary/50 rounded-lg overflow-hidden shadow-[0_0_30px_hsl(var(--primary)/0.3)] glow-border">
            <div className="border-b border-primary/30 bg-muted/30 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70 shadow-[0_0_8px_hsl(var(--destructive))]" />
                <div className="w-3 h-3 rounded-full bg-accent/70 shadow-[0_0_8px_hsl(var(--accent))]" />
                <div className="w-3 h-3 rounded-full bg-primary/70 shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>
              <span className="text-xs text-secondary/80 font-terminal ml-2 glow-text">
                terminal://cybershield/scan
              </span>
            </div>

            <div className="p-6">
              <ScanCard onScan={handleFileScan} isScanning={isScanning} />
            </div>

            <TerminalOutput messages={messages} />

            <TerminalInput onCommand={handleCommand} isScanning={isScanning} />
          </div>

          <footer className="text-center text-xs text-primary/40 font-terminal mt-4">
            © CyberShield Labs | For Educational Use Only
          </footer>
        </main>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        commands={commands}
      />
    </div>
  );
};

export default Index;
