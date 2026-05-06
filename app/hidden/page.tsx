"use client";

import { useState } from "react";

export default function HiddenPage() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const correctPin = "1234"; // later store securely

  const handleUnlock = () => {
    if (pin === correctPin) {
      setUnlocked(true);
    } else {
      alert("Wrong PIN");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg text-center">
          <h2 className="mb-4 text-lg">Enter PIN</h2>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="bg-black border border-white/20 p-2 rounded w-full mb-4"
          />

          <button
            onClick={handleUnlock}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-black p-6">
      <h1 className="text-2xl font-bold mb-4">Private Tracking</h1>

      <div className="bg-white/10 p-4 rounded-xl mb-4">
        <p>🚬 Smoking Tracker</p>
      </div>

      <div className="bg-white/10 p-4 rounded-xl">
        <p>🔒 Personal Habit</p>
      </div>
    </div>
  );
}