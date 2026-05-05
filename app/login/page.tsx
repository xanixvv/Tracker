"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault(); // ✅ STOP REFRESH
    const { error } = await signIn(email, password);
    if (!error) router.push("/");
    else alert(error.message);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault(); // ✅ STOP REFRESH
    const { error } = await signUp(email, password);
    if (!error) alert("Signed up! Now login.");
    else alert(error.message);
  };

  return (
    <form className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="p-3 rounded bg-zinc-900"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="p-3 rounded bg-zinc-900"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button" // ✅ IMPORTANT
        onClick={handleLogin}
        className="bg-white text-black p-3 rounded"
      >
        Login
      </button>

      <button
        type="button" // ✅ IMPORTANT
        onClick={handleSignup}
        className="bg-zinc-800 p-3 rounded"
      >
        Sign Up
      </button>
    </form>
  );
}