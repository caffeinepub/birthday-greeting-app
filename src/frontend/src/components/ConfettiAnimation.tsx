import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
}

export default function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const pieces: Confetti[] = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        rotation: Math.random() * 360,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute -top-10 w-3 h-3 opacity-70 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          <img
            src="/assets/generated/confetti.dim_512x512.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
