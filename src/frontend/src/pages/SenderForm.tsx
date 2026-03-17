import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import ConfettiAnimation from "../components/ConfettiAnimation";
import LinkDisplay from "../components/LinkDisplay";
import { useCreateGreeting } from "../hooks/useQueries";

/* ── floating deco emojis ── */
const DECO = [
  { emoji: "🎀", top: "8%", left: "4%", size: "2.4rem", anim: "animate-float" },
  {
    emoji: "🍒",
    top: "15%",
    right: "5%",
    size: "2rem",
    anim: "animate-float2",
  },
  {
    emoji: "✨",
    top: "70%",
    left: "6%",
    size: "1.8rem",
    anim: "animate-float",
  },
  {
    emoji: "🎂",
    top: "78%",
    right: "4%",
    size: "2.2rem",
    anim: "animate-float2",
  },
  { emoji: "💌", top: "42%", left: "2%", size: "2rem", anim: "animate-float" },
  {
    emoji: "🩷",
    top: "55%",
    right: "3%",
    size: "1.8rem",
    anim: "animate-float2",
  },
  { emoji: "🧁", top: "28%", left: "3%", size: "2rem", anim: "animate-float2" },
  {
    emoji: "⭐",
    top: "90%",
    left: "50%",
    size: "1.6rem",
    anim: "animate-float",
  },
];

export default function SenderForm() {
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLinkId, setGeneratedLinkId] = useState<string | null>(null);

  const createGreeting = useCreateGreeting();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !message.trim()) return;

    const linkId = crypto.randomUUID();
    try {
      await createGreeting.mutateAsync({
        linkId,
        recipientName: recipientName.trim(),
        message: message.trim(),
      });
      setGeneratedLinkId(linkId);
    } catch (error) {
      console.error("Error creating greeting:", error);
    }
  };

  const handleReset = () => {
    setRecipientName("");
    setMessage("");
    setGeneratedLinkId(null);
  };

  if (generatedLinkId) {
    return (
      <div className="min-h-screen polka-bg flex items-center justify-center p-4 relative overflow-hidden">
        <ConfettiAnimation />
        {DECO.map((d) => (
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
        <div className="w-full max-w-2xl relative z-10">
          <LinkDisplay linkId={generatedLinkId} onCreateAnother={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen polka-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorations */}
      {DECO.map((d) => (
        <span
          key={d.emoji + d.top}
          className={`pointer-events-none select-none absolute ${d.anim}`}
          style={{
            top: d.top,
            left: d.left,
            right: (d as any).right,
            fontSize: d.size,
            opacity: 0.72,
          }}
          aria-hidden="true"
        >
          {d.emoji}
        </span>
      ))}

      <div className="w-full max-w-lg relative z-10">
        {/* Hero heading */}
        <div className="text-center mb-10">
          <p className="text-party-secondary font-medium tracking-widest uppercase text-sm mb-2">
            ✦ a little surprise for someone special ✦
          </p>
          <h1 className="font-display italic text-6xl md:text-7xl text-party-primary leading-tight drop-shadow-sm">
            Birthday
            <br />
            <span className="not-italic font-bold">Wishes</span>
          </h1>
          <p className="mt-3 text-party-secondary text-base">
            Craft a magical moment they'll never forget 🌸
          </p>
        </div>

        {/* Form card — stamp style */}
        <div
          className="relative bg-card rounded-3xl p-8 md:p-10 shadow-2xl ribbon-top"
          style={{
            boxShadow:
              "0 0 0 2px oklch(0.52 0.22 25), 0 0 0 9px oklch(0.99 0.015 80), 0 0 0 11px oklch(0.52 0.22 25 / 0.3), 0 8px 40px oklch(0.52 0.22 25 / 0.12)",
          }}
        >
          {/* corner stamps */}
          <span
            className="absolute top-3 right-4 text-2xl opacity-60 pointer-events-none"
            aria-hidden="true"
          >
            🍒
          </span>
          <span
            className="absolute bottom-3 left-4 text-2xl opacity-60 pointer-events-none"
            aria-hidden="true"
          >
            ✨
          </span>

          <div className="text-center mb-7">
            <h2 className="font-display text-2xl text-party-primary font-semibold">
              Create Your Greeting
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Fill in the sweet details below 🎀
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="recipientName"
                className="text-party-primary font-semibold text-sm tracking-wide uppercase"
              >
                Birthday Person's Name
              </Label>
              <Input
                data-ocid="sender.input"
                id="recipientName"
                type="text"
                placeholder="e.g. Emma 🌸"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
                className="h-12 rounded-xl border-2 border-party-border bg-background focus:border-party-primary text-foreground placeholder:text-muted-foreground transition-colors"
                style={{ borderColor: "oklch(0.84 0.07 20)" }}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="message"
                className="text-party-primary font-semibold text-sm tracking-wide uppercase"
              >
                Your Birthday Message
              </Label>
              <Textarea
                data-ocid="sender.textarea"
                id="message"
                placeholder="Write your heartfelt birthday wishes… 💌"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="rounded-xl border-2 border-party-border bg-background focus:border-party-primary resize-none text-foreground placeholder:text-muted-foreground transition-colors"
                style={{ borderColor: "oklch(0.84 0.07 20)" }}
              />
            </div>

            <Button
              data-ocid="sender.submit_button"
              type="submit"
              disabled={
                createGreeting.isPending ||
                !recipientName.trim() ||
                !message.trim()
              }
              className="w-full h-13 rounded-full text-base font-bold tracking-wide shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: "oklch(0.52 0.22 25)",
                color: "oklch(0.99 0.01 80)",
                height: "3.25rem",
              }}
              size="lg"
            >
              {createGreeting.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating
                  magic…
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" /> Generate Birthday Link
                  ✨
                </>
              )}
            </Button>
          </form>
        </div>

        <footer className="mt-10 text-center text-party-muted text-sm">
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
