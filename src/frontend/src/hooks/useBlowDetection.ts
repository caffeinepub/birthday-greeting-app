import { useCallback, useEffect, useRef, useState } from "react";

export function useBlowDetection() {
  const [isBlown, setIsBlown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionGranted(true);

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const detectBlow = () => {
        if (!analyserRef.current || isBlown) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average amplitude in low-mid frequency range (typical for blowing)
        let sum = 0;
        const startFreq = 10;
        const endFreq = 100;

        for (let i = startFreq; i < endFreq; i++) {
          sum += dataArray[i];
        }

        const average = sum / (endFreq - startFreq);

        // Detect blow: sustained amplitude above threshold
        if (average > 80) {
          setIsBlown(true);
          stopListening();
          return;
        }

        animationFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setPermissionGranted(false);
    }
  }, [isBlown]);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isBlown,
    isListening,
    permissionGranted,
    startListening,
    stopListening,
  };
}
