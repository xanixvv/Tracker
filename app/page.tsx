"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supbase";



export default function Home() {

  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from("test").select("*");
      console.log(data, error);
    };
    test();
  }, []);

  return <div className="p-4">Connected</div>;
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}