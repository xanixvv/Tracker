"use client";

import { useState } from "react";

export default function SleepPage() {
  const [sleep, setSleep] = useState(7.5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex justify-center">
      <div className="w-full max-w-md px-4 py-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-2">Sleep</h1>
        <p className="text-zinc-400 mb-6">Track your rest & recovery</p>

        {/* MAIN CARD */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <p className="text-sm text-zinc-400">Last Night</p>
          <h2 className="text-4xl font-bold">{sleep}h</h2>

          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
            className="w-full mt-4"
          />
        </div>

        {/* INSIGHT CARD */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
          <p className="text-sm text-zinc-400">Insight</p>
          <p className="mt-2">
            {sleep >= 7
              ? "Good recovery. Keep this consistency."
              : "Try improving sleep duration for better performance."}
          </p>
        </div>

      </div>
    </div>
  );
}