import { useEffect, useRef, useState } from "react";

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix rain parameters
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    let animationFrameId: number;
    let lastTime = 0;
    const fps = isLowPerformance ? 15 : 30;
    const fpsInterval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
      
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      // Very light fade for maximum brightness
      ctx.fillStyle = "rgba(4, 4, 7, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Maximum brightness neon green
      ctx.fillStyle = "#00ff88";
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Random reset
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    draw(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLowPerformance]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-55"
        style={{ zIndex: 0 }}
      />
      <button
        onClick={() => setIsLowPerformance(!isLowPerformance)}
        className="fixed bottom-4 right-4 z-50 px-3 py-1 text-xs bg-muted/50 border border-primary/30 rounded hover:bg-muted transition-colors"
        title={isLowPerformance ? "Enable full effects" : "Reduce animations"}
      >
        {isLowPerformance ? "🐌 Low FX" : "⚡ Full FX"}
      </button>
    </>
  );
};
