import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import BirthdayCake from "../components/BirthdayCake";
import BirthdayMessage from "../components/BirthdayMessage";
import { useBlowDetection } from "../hooks/useBlowDetection";
import { useGetGreeting } from "../hooks/useQueries";

const BG_DECO = [
  { emoji: "🎀", top: "5%", left: "3%", size: "2.2rem", anim: "animate-float" },
  {
    emoji: "🍒",
    top: "12%",
    right: "4%",
    size: "2rem",
    anim: "animate-float2",
  },
  {
    emoji: "✨",
    top: "60%",
    left: "5%",
    size: "1.8rem",
    anim: "animate-float",
  },
  {
    emoji: "🩷",
    top: "72%",
    right: "5%",
    size: "2rem",
    anim: "animate-float2",
  },
  { emoji: "🧁", top: "85%", left: "3%", size: "2rem", anim: "animate-float" },
  {
    emoji: "⭐",
    top: "88%",
    right: "3%",
    size: "1.8rem",
    anim: "animate-float2",
  },
  {
    emoji: "💌",
    top: "40%",
    left: "2%",
    size: "1.9rem",
    anim: "animate-float2",
  },
  {
    emoji: "🌸",
    top: "30%",
    right: "2%",
    size: "1.9rem",
    anim: "animate-float",
  },
];

export default function RecipientView() {
  const { linkId } = useParams({ from: "/greeting/$linkId" });
  const { data: greeting, isLoading, error } = useGetGreeting(linkId);
  const { isBlown, isListening, permissionGranted, startListening } =
    useBlowDetection();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isBlown) {
      setTimeout(() => setShowMessage(true), 800);
    }
  }, [isBlown]);

  if (isLoading) {
    return (
      <div className="min-h-screen polka-bg flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent mx-auto mb-5 animate-spin"
            style={{
              borderColor: "oklch(0.52 0.22 25)",
              borderTopColor: "transparent",
            }}
          />
          <p className="font-display italic text-3xl text-party-primary">
            Loading your surprise…
          </p>
          <p className="text-party-secondary mt-2">🎀 almost there! 🎀</p>
        </div>
      </div>
    );
  }

  if (error || !greeting) {
    return (
      <div className="min-h-screen polka-bg flex items-center justify-center p-4">
        <div
          className="bg-card rounded-3xl p-10 text-center max-w-sm shadow-xl"
          style={{
            boxShadow:
              "0 0 0 2px oklch(0.52 0.22 25), 0 0 0 9px oklch(0.99 0.015 80), 0 0 0 11px oklch(0.52 0.22 25 / 0.25)",
          }}
        >
          <span className="text-5xl">🍒</span>
          <h2 className="font-display text-2xl text-party-primary mt-4 mb-2">
            Oops!
          </h2>
          <p className="text-muted-foreground">
            We couldn't find this birthday greeting. The link might be incorrect
            or expired.
          </p>
        </div>
      </div>
    );
  }

  if (showMessage) {
    return (
      <BirthdayMessage
        recipientName={greeting.recipientName}
        message={greeting.message}
      />
    );
  }

  return (
    <div className="min-h-screen polka-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* floating bg deco */}
      {BG_DECO.map((d) => (
        <span
          key={d.emoji + d.top}
          className={`pointer-events-none select-none absolute ${d.anim}`}
          style={{
            top: d.top,
            left: d.left,
            right: (d as any).right,
            fontSize: d.size,
            opacity: 0.7,
          }}
          aria-hidden="true"
        >
          {d.emoji}
        </span>
      ))}

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {!isBlown && (
          <div className="text-center mb-8">
            <p className="text-party-secondary tracking-widest uppercase text-xs font-semibold mb-2">
              ✦ a birthday surprise awaits ✦
            </p>
            <h1
              className="font-display italic leading-tight drop-shadow-sm"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 5rem)",
                color: "oklch(0.52 0.22 25)",
              }}
            >
              Blow the candles!
            </h1>
            <p className="mt-3 text-party-secondary font-medium">
              {isListening
                ? "🎙️ Listening… blow into your microphone!"
                : "Tap the button below to start 🎀"}
            </p>
          </div>
        )}

        {/* cake */}
        <div className="my-2">
          <BirthdayCake isLit={!isBlown} />
        </div>

        {/* mic button */}
        {!isBlown && !isListening && (
          <div className="text-center mt-8">
            <Button
              data-ocid="recipient.primary_button"
              onClick={startListening}
              size="lg"
              className="rounded-full px-10 h-14 text-base font-bold tracking-wide shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.52 0.22 25)",
                color: "oklch(0.99 0.01 80)",
              }}
            >
              <Mic className="w-5 h-5 mr-2" />
              {permissionGranted
                ? "Start Blowing Detection"
                : "Enable Microphone"}
            </Button>
            <p className="mt-3 text-xs text-party-muted">
              We need mic access to detect when you blow 🩷
            </p>
          </div>
        )}

        {isListening && !isBlown && (
          <div className="text-center mt-8">
            {/* animated glowing ring */}
            <div className="relative inline-flex items-center justify-center">
              <span
                className="absolute w-20 h-20 rounded-full animate-mic-ring"
                style={{ background: "oklch(0.52 0.22 25 / 0.2)" }}
              />
              <span
                className="absolute w-28 h-28 rounded-full animate-mic-ring"
                style={{
                  background: "oklch(0.52 0.22 25 / 0.1)",
                  animationDelay: "0.4s",
                }}
              />
              <div
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: "oklch(0.52 0.22 25)" }}
              >
                <Mic
                  className="w-7 h-7"
                  style={{ color: "oklch(0.99 0.01 80)" }}
                />
              </div>
            </div>
            <p className="mt-5 font-display italic text-xl text-party-primary animate-pulse-slow">
              Listening for your blow…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
