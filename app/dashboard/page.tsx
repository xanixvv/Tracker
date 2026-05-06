"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [clicks, setClicks] = useState(0);

  const handleSecretClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);


const router = useRouter();

if (newClicks >= 5) {
  router.push("/hidden");
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex justify-center">
      <div className="w-full max-w-md px-4 py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold">Good morning, Kevin</h1>
            <p className="text-sm text-zinc-400">Stay consistent today</p>
          </div>

          {/* hidden trigger */}
          <div
            onClick={handleSecretClick}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center cursor-pointer"
          >
            ⚙️
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="flex gap-3 mb-6">
          <Stat label="Sleep" value="7.5h" />
          <Stat label="Calories" value="2200" />
          <Stat label="Workout" value="Yes" />
        </div>

        {/* MAIN CARDS */}
        <div className="flex flex-col gap-4">

          <Card title="Sleep" desc="Track your rest" emoji="💤" />
          <Card title="Fitness" desc="Workout & activity" emoji="🏋️" />
          <Card title="Nutrition" desc="Calories & macros" emoji="🥗" />
          <Card title="Goals" desc="Daily targets" emoji="🎯" />

        </div>

        {/* BOTTOM NAV */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-3 flex gap-8">
            <NavItem icon="🏠" active />
            <NavItem icon="📊" />
            <NavItem icon="➕" />
            <NavItem icon="👤" />
          </div>
        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function Card({
  title,
  desc,
  emoji,
}: {
  title: string;
  desc: string;
  emoji: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 active:scale-95 hover:scale-[1.02] cursor-pointer">
      
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-zinc-400">{desc}</p>
      </div>

      <div className="text-2xl">{emoji}</div>
    </div>
  );
}

function NavItem({ icon, active }: { icon: string; active?: boolean }) {
  return (
    <div
      className={`text-xl ${
        active ? "text-white" : "text-zinc-400"
      } cursor-pointer`}
    >
      {icon}
    </div>
  );
}
}