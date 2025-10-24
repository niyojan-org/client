import { useEffect } from "react";
import confetti from "canvas-confetti";

export function useConfetti(isActive) {
  useEffect(() => {
    if (!isActive) return;

    const colors = ["#A786FF", "#FD8BBC", "#FF9B64", "#FFD66B", "#7A5CFF", "#26C485"];
    const end = Date.now() + 3 * 1000;
    
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    
    frame();
    return () => cancelAnimationFrame(frame);
  }, [isActive]);
}
