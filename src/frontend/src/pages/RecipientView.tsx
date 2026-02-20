import { useParams } from '@tanstack/react-router';
import { useGetGreeting } from '../hooks/useQueries';
import { useBlowDetection } from '../hooks/useBlowDetection';
import { useState, useEffect } from 'react';
import BirthdayCake from '../components/BirthdayCake';
import BirthdayMessage from '../components/BirthdayMessage';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function RecipientView() {
  const { linkId } = useParams({ from: '/greeting/$linkId' });
  const { data: greeting, isLoading, error } = useGetGreeting(linkId);
  const { isBlown, isListening, permissionGranted, startListening } = useBlowDetection();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isBlown) {
      setTimeout(() => {
        setShowMessage(true);
      }, 800);
    }
  }, [isBlown]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-party-bg-start to-party-bg-end">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-party-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-2xl font-display text-party-primary">Loading your surprise...</p>
        </div>
      </div>
    );
  }

  if (error || !greeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-party-bg-start to-party-bg-end p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-destructive mb-4">Oops!</h2>
          <p className="text-lg text-muted-foreground">
            We couldn't find this birthday greeting. The link might be incorrect or expired.
          </p>
        </Card>
      </div>
    );
  }

  if (showMessage) {
    return <BirthdayMessage recipientName={greeting.recipientName} message={greeting.message} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-party-bg-start to-party-bg-end relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-party-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-party-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-party-secondary rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {!isBlown && (
          <div className="text-center mb-8 animate-bounce">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-party-primary mb-4 drop-shadow-lg">
              <Wind className="inline-block w-12 h-12 md:w-16 md:h-16 mr-4 animate-pulse" />
              Blow the candles!
              <Wind className="inline-block w-12 h-12 md:w-16 md:h-16 ml-4 animate-pulse" />
            </h1>
            <p className="text-xl md:text-2xl text-party-secondary font-medium">
              {isListening ? 'Listening... blow into your microphone!' : 'Click the button below to start'}
            </p>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <BirthdayCake isLit={!isBlown} />
        </div>

        {!isBlown && !isListening && (
          <div className="text-center">
            <Button
              onClick={startListening}
              size="lg"
              className="h-16 px-8 text-xl font-bold shadow-2xl"
            >
              {permissionGranted ? (
                <>
                  <Mic className="w-6 h-6 mr-2" />
                  Start Blowing Detection
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6 mr-2" />
                  Enable Microphone
                </>
              )}
            </Button>
            <p className="mt-4 text-sm text-party-muted">
              We need microphone access to detect when you blow the candles
            </p>
          </div>
        )}

        {isListening && !isBlown && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-party-card px-6 py-3 rounded-full border-2 border-party-border shadow-lg">
              <MicOff className="w-6 h-6 text-party-primary animate-pulse" />
              <span className="text-lg font-semibold text-party-primary">Listening for your blow...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
