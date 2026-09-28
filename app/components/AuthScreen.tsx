"use client";

import { useState } from "react";
import "./AuthScreen.css";

type AuthScreenProps = {
  onSuccess: () => void;
};

export default function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [name, setName] = useState("");
  const [wrong, setWrong] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().toLowerCase() === "selma") {
      setWrong(false);
      onSuccess();
    } else {
      setWrong(true);
    }
  };

  return (
    <section className="screen auth-screen">

      <div className="auth-card">
        <h1 className="auth-title">
          Welcome
        </h1>

        <p className="auth-subtitle">
          Enter the name of your best friend
          <br />
          to verify your identity.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <input
            className="auth-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setWrong(false);
            }}
            placeholder="Enter name..."
            autoComplete="off"
            autoFocus
          />

          <button
            type="submit"
            className="verify-button"
          >
            Verify
          </button>
        </form>

        {wrong && (
          <div className="wrong-message">
            WRONG
          </div>
        )}
      </div>
    </section>
  );
}