"use client";

import { useEffect, useRef, useState } from "react";
import "./BirthdayScreen.css";

type BirthdayScreenProps = {
  onCandlesOut: () => void;
};

export default function BirthdayScreen({
  onCandlesOut,
}: BirthdayScreenProps) {
  const [micReady, setMicReady] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const blowStartRef = useRef<number | null>(null);

  useEffect(() => {
    startMicrophone();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startMicrophone = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      const audioContext = new AudioContextClass();

      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;

      const microphone =
        audioContext.createMediaStreamSource(stream);

      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setMicReady(true);
      setListening(true);

      detectBlow();
    } catch (err) {
      console.error(err);

      setError(
        "Please allow microphone access so you can blow out the candles."
      );
    }
  };

  const detectBlow = () => {
    const analyser = analyserRef.current;

    if (!analyser) return;

    const data = new Uint8Array(analyser.fftSize);

    const checkVolume = () => {
      const currentAnalyser = analyserRef.current;

      if (!currentAnalyser) return;

      currentAnalyser.getByteTimeDomainData(data);

      let sum = 0;

      for (let i = 0; i < data.length; i++) {
        const normalized = (data[i] - 128) / 128;
        sum += normalized * normalized;
      }

      const volume = Math.sqrt(sum / data.length);

      const blowThreshold = 0.1;

      if (volume > blowThreshold) {
        if (!blowStartRef.current) {
          blowStartRef.current = Date.now();
        }

        const blowDuration =
          Date.now() - blowStartRef.current;

        if (blowDuration > 250) {
          setListening(false);

          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }

          // Change the candle photos to the unlit versions
          setCandlesBlownOut(true);

          //wait before switching to next screen
          setTimeout(() => {
            onCandlesOut();
          }, 2000);

          return;
        }
      } else {
        blowStartRef.current = null;
      }

      animationRef.current =
        requestAnimationFrame(checkVolume);
    };

    checkVolume();
  };

  const candleImage = candlesBlownOut
    ? "/images/candle-unlit.png"
    : "/images/candle-lit.png";

  return (
    <section className="screen birthday-screen">

      <p className="birthday instruction">
        Make a wish!
        <br />
        Blow out the candles
      </p>

      <div className="cake">
        <img
          src="/images/cake.png"
          alt="Birthday cake"
          className="cake-image"
        />

        <div className="candles">
          <div className="candle candle-left">
            <img
              src={candleImage}
              alt={
                candlesBlownOut
                  ? "unlit candle"
                  : "lit candle"
              }
              className="candle-stick left"
            />
          </div>

          <div className="candle candle-middle">
            <img
              src={candleImage}
              alt={
                candlesBlownOut
                  ? "unlit candle"
                  : "lit candle"
              }
              className="candle-stick middle"
            />
          </div>

          <div className="candle candle-right">
            <img
              src={candleImage}
              alt={
                candlesBlownOut
                  ? "unlit candle"
                  : "lit candle"
              }
              className="candle-stick right"
            />
          </div>
        </div>
      </div>

      {candlesBlownOut && (
        <div className="mic-status">
          <p> Excellent blow!</p>
        </div>
      )}

      {error && (
        <div className="mic-error">
          {error}
        </div>
      )}
    </section>
  );
}