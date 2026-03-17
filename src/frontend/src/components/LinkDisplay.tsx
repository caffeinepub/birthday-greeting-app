import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LinkDisplayProps {
  linkId: string;
  onCreateAnother: () => void;
}

export default function LinkDisplay({
  linkId,
  onCreateAnother,
}: LinkDisplayProps) {
  const [copied, setCopied] = useState(false);
  const shareableLink = `${window.location.origin}/greeting/${linkId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      toast.success("Link copied! 🎀");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div
      className="relative bg-card rounded-3xl p-8 md:p-10 shadow-2xl ribbon-top"
      style={{
        boxShadow:
          "0 0 0 2px oklch(0.52 0.22 25), 0 0 0 9px oklch(0.99 0.015 80), 0 0 0 11px oklch(0.52 0.22 25 / 0.3), 0 12px 50px oklch(0.52 0.22 25 / 0.1)",
      }}
    >
      {/* corner stamp */}
      <div
        className="absolute top-4 right-5 w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-sm"
        style={{
          background: "oklch(0.97 0.02 80)",
          border: "2px dashed oklch(0.52 0.22 25 / 0.4)",
        }}
        aria-hidden="true"
      >
        🍒
      </div>

      {/* header */}
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase font-semibold mb-2"
          style={{ color: "oklch(0.75 0.12 15)" }}
        >
          ✦ your link is ready ✦
        </p>
        <h2 className="font-display italic text-3xl md:text-4xl text-party-primary leading-tight">
          Your Birthday Link
          <br />
          <span className="not-italic font-bold">is Ready!</span> 🎉
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Share this magical link with the birthday person 💌
        </p>
      </div>

      {/* link box */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{
          background: "oklch(0.95 0.03 60)",
          border: "2px dashed oklch(0.52 0.22 25 / 0.35)",
        }}
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: "oklch(0.75 0.12 15)" }}
        >
          Your Shareable Link
        </p>
        <div className="flex items-center gap-2">
          <input
            data-ocid="link.input"
            type="text"
            value={shareableLink}
            readOnly
            className="flex-1 bg-card px-4 py-3 rounded-xl font-mono text-sm focus:outline-none text-party-primary"
            style={{ border: "1.5px solid oklch(0.52 0.22 25 / 0.3)" }}
          />
          <Button
            data-ocid="link.primary_button"
            onClick={handleCopy}
            size="lg"
            className="rounded-xl px-5 h-12 font-bold shadow transition-all hover:scale-105 active:scale-95"
            style={{
              background: copied
                ? "oklch(0.72 0.16 30)"
                : "oklch(0.52 0.22 25)",
              color: "oklch(0.99 0.01 80)",
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1.5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1.5" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* how to share */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{
          background: "oklch(0.97 0.02 80)",
          border: "2px dashed oklch(0.75 0.12 15 / 0.5)",
        }}
      >
        <div className="flex items-start gap-3">
          <Share2
            className="w-5 h-5 mt-0.5 flex-shrink-0"
            style={{ color: "oklch(0.75 0.12 15)" }}
          />
          <div>
            <p className="font-semibold text-party-primary text-sm mb-1.5">
              How to share 🎀
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>🍒 Copy the link & send via WhatsApp, email, or text</li>
              <li>🎂 They'll see a birthday cake with glowing candles</li>
              <li>✨ They blow the candles — your message appears!</li>
            </ul>
          </div>
        </div>
      </div>

      <Button
        data-ocid="link.secondary_button"
        onClick={onCreateAnother}
        variant="outline"
        size="lg"
        className="w-full h-12 rounded-full text-base font-semibold border-2 transition-all hover:scale-[1.02] active:scale-95"
        style={{
          borderColor: "oklch(0.52 0.22 25)",
          color: "oklch(0.52 0.22 25)",
        }}
      >
        Create Another Birthday Greeting 🌸
      </Button>
    </div>
  );
}
