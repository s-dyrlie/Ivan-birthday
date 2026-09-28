"use client";

import "./FinalScreen.css";

export default function FinalScreen() {
  const confetti = Array.from({ length: 30 });

  return (
    <section className="screen final-screen">
      <div className="confetti-container">
        {confetti.map((_, index) => (
          <div
            key={index}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="final-content">
        <h1 className="final-title">
          Happy Birthday! 
        </h1>

        <p className="final-message">
          I hope your day is great
        </p>

        <p className="final-message">
          I love you lots
        </p>

          <img 
            src="/images/heart.png" 
            alt="heart" 
            className="final-heart"
            />
        

        <img
          src="/images/ivan-1.png"
          alt=""
          className="sticker sticker1"
        />

        <img
          src="/images/ivan-2.png"
          alt=""
          className="sticker sticker2"
        />

        <img
          src="/images/ivan-3.png"
          alt=""
          className="sticker sticker3"
        />

        <img
          src="/images/ivan-4.png"
          alt=""
          className="sticker sticker4"
        />

        <img
          src="/images/ivan-5.png"
          alt=""
          className="sticker sticker5"
        />

        <img
          src="/images/ivan-6.png"
          alt=""
          className="sticker sticker6"
        />
      </div>
    </section>
  );
}