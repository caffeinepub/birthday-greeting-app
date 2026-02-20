import { useEffect, useState } from 'react';
import { Sparkles, Heart, PartyPopper } from 'lucide-react';
import ConfettiAnimation from './ConfettiAnimation';

interface BirthdayMessageProps {
  recipientName: string;
  message: string;
}

export default function BirthdayMessage({ recipientName, message }: BirthdayMessageProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-party-bg-start via-party-bg-mid to-party-bg-end relative overflow-hidden">
      <ConfettiAnimation />
      
      <div className={`relative z-10 max-w-4xl w-full text-center transition-all duration-1000 ${
        showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="mb-8 animate-bounce-slow">
          <PartyPopper className="w-20 h-20 md:w-32 md:h-32 mx-auto text-party-primary drop-shadow-lg" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold font-display text-party-primary mb-6 drop-shadow-2xl animate-pulse-slow">
          Happy Birthday
        </h1>

        <h2 className="text-5xl md:text-7xl font-bold font-display text-party-accent mb-12 drop-shadow-xl">
          {recipientName}!
        </h2>

        <div className="bg-party-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-party-border max-w-2xl mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-party-accent animate-spin-slow" />
            <Heart className="w-8 h-8 text-party-secondary animate-pulse" />
            <Sparkles className="w-8 h-8 text-party-accent animate-spin-slow" />
          </div>

          <p className="text-2xl md:text-3xl text-party-primary font-medium leading-relaxed whitespace-pre-wrap">
            {message}
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Sparkles className="w-8 h-8 text-party-accent animate-spin-slow" />
            <Heart className="w-8 h-8 text-party-secondary animate-pulse" />
            <Sparkles className="w-8 h-8 text-party-accent animate-spin-slow" />
          </div>
        </div>

        <div className="mt-12 text-party-muted">
          <p className="text-lg">🎂 🎈 🎉 🎁 🎊 🎂 🎈 🎉 🎁 🎊</p>
        </div>

        <footer className="mt-12 text-party-muted">
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
