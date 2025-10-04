import { useState } from "react";
import { ArrowLeft, Zap, ZapOff, Volume2, VolumeX, Eye, EyeOff, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MatrixBackground } from "@/components/MatrixBackground";

export default function Settings() {
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableSound, setEnableSound] = useState(false);
  const [plainMode, setPlainMode] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <MatrixBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 glow-text">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Terminal
            </Button>
          </Link>
          <h1 className="text-4xl font-orbitron font-bold glow-text mb-2">
            <Shield className="inline-block mr-3 h-8 w-8" />
            System Settings
          </h1>
          <p className="text-muted-foreground font-terminal">
            Configure CyberShield terminal preferences
          </p>
        </div>

        {/* Settings Panel */}
        <div className="bg-background/80 border border-primary/30 rounded-lg p-6 backdrop-blur-sm glow-border">
          
          {/* Performance Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-orbitron font-semibold glow-text mb-1">
                Performance & Effects
              </h2>
              <p className="text-sm text-muted-foreground">
                Adjust visual effects and animations
              </p>
            </div>

            <Separator className="bg-primary/20" />

            {/* Full Animations */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {enableAnimations ? (
                  <Zap className="h-5 w-5 text-primary" />
                ) : (
                  <ZapOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="animations" className="text-base font-terminal cursor-pointer">
                    Full Animations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Matrix rain, typing effects, and glows
                  </p>
                </div>
              </div>
              <Switch
                id="animations"
                checked={enableAnimations}
                onCheckedChange={setEnableAnimations}
              />
            </div>

            {/* Plain Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {plainMode ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-primary" />
                )}
                <div>
                  <Label htmlFor="plain-mode" className="text-base font-terminal cursor-pointer">
                    Plain Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Minimal UI for accessibility & performance
                  </p>
                </div>
              </div>
              <Switch
                id="plain-mode"
                checked={plainMode}
                onCheckedChange={setPlainMode}
              />
            </div>
          </div>

          <Separator className="bg-primary/20 my-6" />

          {/* Audio Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-orbitron font-semibold glow-text mb-1">
                Audio
              </h2>
              <p className="text-sm text-muted-foreground">
                Toggle sound effects
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {enableSound ? (
                  <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="sound" className="text-base font-terminal cursor-pointer">
                    Sound Effects
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Scan blips and keystroke sounds
                  </p>
                </div>
              </div>
              <Switch
                id="sound"
                checked={enableSound}
                onCheckedChange={setEnableSound}
              />
            </div>
          </div>

          <Separator className="bg-primary/20 my-6" />

          {/* Demo Mode Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-orbitron font-semibold glow-text mb-1">
                Demo & Testing
              </h2>
              <p className="text-sm text-muted-foreground">
                Enable demonstration mode
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-cyan" />
                <div>
                  <Label htmlFor="demo-mode" className="text-base font-terminal cursor-pointer">
                    Demo Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Simulated scans with preset results
                  </p>
                </div>
              </div>
              <Switch
                id="demo-mode"
                checked={demoMode}
                onCheckedChange={setDemoMode}
              />
            </div>
          </div>

          {/* Footer Warning */}
          <div className="mt-8 p-4 bg-destructive/10 border border-destructive/30 rounded">
            <p className="text-sm text-destructive font-terminal">
              ⚠️ Educational Use Only — Do not upload real malware except in an isolated VM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
