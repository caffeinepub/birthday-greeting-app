import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateGreeting } from '../hooks/useQueries';
import LinkDisplay from '../components/LinkDisplay';
import { Cake, Sparkles } from 'lucide-react';
import ConfettiAnimation from '../components/ConfettiAnimation';

export default function SenderForm() {
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLinkId, setGeneratedLinkId] = useState<string | null>(null);
  
  const createGreeting = useCreateGreeting();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientName.trim() || !message.trim()) {
      return;
    }

    const linkId = crypto.randomUUID();
    
    try {
      await createGreeting.mutateAsync({
        linkId,
        recipientName: recipientName.trim(),
        message: message.trim(),
      });
      
      setGeneratedLinkId(linkId);
    } catch (error) {
      console.error('Error creating greeting:', error);
    }
  };

  const handleReset = () => {
    setRecipientName('');
    setMessage('');
    setGeneratedLinkId(null);
  };

  if (generatedLinkId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <ConfettiAnimation />
        <div className="w-full max-w-2xl relative z-10">
          <LinkDisplay linkId={generatedLinkId} onCreateAnother={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ConfettiAnimation />
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cake className="w-12 h-12 text-party-primary" />
            <h1 className="text-5xl font-bold text-party-primary font-display">
              Birthday Wishes
            </h1>
            <Sparkles className="w-12 h-12 text-party-accent" />
          </div>
          <p className="text-xl text-party-secondary font-medium">
            Create a magical birthday surprise for someone special! 🎉
          </p>
        </div>

        <Card className="shadow-2xl border-4 border-party-border bg-party-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-display text-party-primary">
              Create Your Birthday Greeting
            </CardTitle>
            <CardDescription className="text-lg text-party-secondary">
              Fill in the details below to generate a personalized birthday link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName" className="text-lg font-semibold text-party-primary">
                  Birthday Person's Name
                </Label>
                <Input
                  id="recipientName"
                  type="text"
                  placeholder="Enter their name..."
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                  className="text-lg h-12 border-2 border-party-border focus:border-party-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-semibold text-party-primary">
                  Your Birthday Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Write your heartfelt birthday wishes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="text-lg border-2 border-party-border focus:border-party-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={createGreeting.isPending || !recipientName.trim() || !message.trim()}
                className="w-full h-14 text-xl font-bold"
                size="lg"
              >
                {createGreeting.isPending ? (
                  'Creating Magic...'
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-2" />
                    Generate Birthday Link
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-12 text-center text-party-muted">
          <p className="text-sm">
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-party-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
