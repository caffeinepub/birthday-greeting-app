import { useEffect, useState } from "react";
import ConfettiAnimation from "./ConfettiAnimation";

interface BirthdayMessageProps {
  recipientName: string;
  message: string;
}

const FLOAT_EMOJIS = [
  { emoji: "🎀", top: "4%", left: "3%", size: "2.4rem", anim: "animate-float" },
  {
    emoji: "🍒",
    top: "8%",
    right: "4%",
    size: "2.2rem",
    anim: "animate-float2",
  },
  { emoji: "✨", top: "55%", left: "2%", size: "2rem", anim: "animate-float" },
  {
    emoji: "🧁",
    top: "70%",
    right: "3%",
    size: "2.2rem",
    anim: "animate-float2",
  },
  { emoji: "💌", top: "85%", left: "5%", size: "2rem", anim: "animate-float" },
  {
    emoji: "🩷",
    top: "80%",
    right: "5%",
    size: "2rem",
    anim: "animate-float2",
  },
  {
    emoji: "🌸",
    top: "40%",
    left: "1%",
    size: "1.9rem",
    anim: "animate-float2",
  },
  {
    emoji: "⭐",
    top: "35%",
    right: "2%",
    size: "1.9rem",
    anim: "animate-float",
  },
];

export default function BirthdayMessage({
  recipientName,
  message,
}: BirthdayMessageProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen polka-bg flex items-center justify-center p-4 relative overflow-hidden">
      <ConfettiAnimation />

      {/* floating emojis */}
      {FLOAT_EMOJIS.map((d) => (
        <span
          key={d.emoji + d.top}
          className={`pointer-events-none select-none absolute ${d.anim}`}
          style={{
            top: d.top,
            left: d.left,
            right: (d as any).right,
            fontSize: d.size,
            opacity: 0.75,
          }}
          aria-hidden="true"
        >
          {d.emoji}
        </span>
      ))}

      <div
        className={`relative z-10 max-w-lg w-full text-center transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* giant heading */}
        <div className="mb-2">
          <span className="text-5xl animate-bounce-slow inline-block">🎂</span>
        </div>

        <h1
          className="font-display italic leading-tight drop-shadow-lg animate-pulse-slow"
          style={{
            fontSize: "clamp(3rem, 10vw, 5.5rem)",
            color: "oklch(0.52 0.22 25)",
          }}
        >
          Happy Birthday
        </h1>

        <h2
          className="font-display font-bold mt-1 mb-8"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 4rem)",
            color: "oklch(0.72 0.16 30)",
          }}
        >
          {recipientName}! 🎀
        </h2>

        {/* postcard / letter card */}
        <div
          className="relative bg-card rounded-3xl p-8 md:p-10 shadow-2xl text-left"
          style={{
            boxShadow:
              "0 0 0 2px oklch(0.75 0.12 15), 0 0 0 9px oklch(0.99 0.015 80), 0 0 0 11px oklch(0.75 0.12 15 / 0.35), 0 12px 50px oklch(0.52 0.22 25 / 0.1)",
          }}
        >
          {/* stamp corner decoration */}
          <div
            className="absolute top-3 right-4 w-14 h-14 rounded-lg flex items-center justify-center text-2xl shadow-sm"
            style={{
              background: "oklch(0.97 0.02 80)",
              border: "2px dashed oklch(0.52 0.22 25 / 0.4)",
            }}
            aria-hidden="true"
          >
            🍒
          </div>

          <div className="mb-4">
            <span
              className="text-xs tracking-widest uppercase font-semibold"
              style={{ color: "oklch(0.75 0.12 15)" }}
            >
              ✦ A message from your friend ✦
            </span>
          </div>

          <p
            className="leading-relaxed whitespace-pre-wrap font-display italic"
            style={{ fontSize: "1.2rem", color: "oklch(0.35 0.08 25)" }}
          >
            {message}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-xl">🎀</span>
            <span className="text-xs tracking-widest uppercase text-party-muted">
              with all the love in the world
            </span>
            <span className="text-xl">🎀</span>
          </div>
        </div>

        <p className="mt-8 text-2xl tracking-widest">🍒 🎀 ✨ 🧁 💌 🩷 ⭐ 🌸</p>

        <footer className="mt-8 text-party-muted text-sm">
          © {new Date().getFullYear()} · Built with 🩷 using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-party-primary transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
