import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Gift, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface LinkDisplayProps {
  linkId: string;
  onCreateAnother: () => void;
}

export default function LinkDisplay({ linkId, onCreateAnother }: LinkDisplayProps) {
  const [copied, setCopied] = useState(false);
  const shareableLink = `${window.location.origin}/greeting/${linkId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <Card className="shadow-2xl border-4 border-party-border bg-party-card">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Gift className="w-16 h-16 text-party-primary animate-bounce" />
        </div>
        <CardTitle className="text-4xl font-display text-party-primary">
          Your Birthday Link is Ready! 🎉
        </CardTitle>
        <CardDescription className="text-lg text-party-secondary">
          Share this magical link with the birthday person
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-party-bg-start/50 p-4 rounded-xl border-2 border-party-border">
          <p className="text-sm font-semibold text-party-secondary mb-2">Your Shareable Link:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 bg-white/80 px-4 py-3 rounded-lg text-party-primary font-mono text-sm border-2 border-party-border focus:outline-none focus:border-party-primary"
            />
            <Button
              onClick={handleCopy}
              size="lg"
              variant={copied ? 'secondary' : 'default'}
              className="h-12 px-6"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-party-accent/10 p-4 rounded-xl border-2 border-party-accent/30">
          <div className="flex items-start gap-3">
            <Share2 className="w-6 h-6 text-party-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-party-primary mb-1">How to share:</p>
              <ul className="text-sm text-party-secondary space-y-1">
                <li>• Copy the link and send it via WhatsApp, email, or text</li>
                <li>• When they open it, they'll see a birthday cake with candles</li>
                <li>• They blow the candles and your message appears!</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          onClick={onCreateAnother}
          variant="outline"
          size="lg"
          className="w-full h-12 text-lg font-semibold border-2"
        >
          Create Another Birthday Greeting
        </Button>
      </CardContent>
    </Card>
  );
}
