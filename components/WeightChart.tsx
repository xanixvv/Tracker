"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeightChart({ data }: any) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <h2 className="mb-2">Weight Progress</h2>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}