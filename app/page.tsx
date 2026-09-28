"use client";

import { useState } from "react";
import AuthScreen from "@/app/components/AuthScreen";
import BirthdayScreen from "@/app/components/BirthdayScreen";
import FinalScreen from "@/app/components/FinalScreen";

export default function Home() {
  const [screen, setScreen] = useState<
    "auth" | "birthday" | "final"
  >("auth");

  return (
    <main className="birthday-app">
      {screen === "auth" && (
        <AuthScreen
          onSuccess={() => setScreen("birthday")}
        />
      )}

      {screen === "birthday" && (
        <BirthdayScreen
          onCandlesOut={() => setScreen("final")}
        />
      )}

      {screen === "final" && <FinalScreen />}
    </main>
  );
}