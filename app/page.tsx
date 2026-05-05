"use client";

import { useEffect, useState } from "react";
import {
  getHabits,
  createHabit,
  logHabit,
  getHabitLogs,
  calculateStreak,
} from "@/lib/habits";
import { calculateDisciplineScore } from "@/lib/score";
import { addNutrition, getTodayNutrition } from "@/lib/nutrition";
import { getGoals, createGoal, updateGoalProgress } from "@/lib/goals";
import { generateInsights } from "@/lib/insights";
import {
  getTrackers,
  createTracker,
  logRelapse,
  updateStreaks,
} from "@/lib/discipline";

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [streaks, setStreaks] = useState<any>({});
  const [completedToday, setCompletedToday] = useState<any>({});
  const [score, setScore] = useState(0);

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [todayNutrition, setTodayNutrition] = useState<any[]>([]);

  const [trackers, setTrackers] = useState<any[]>([]);

  const [goals, setGoals] = useState<any[]>([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");

  const insights = generateInsights(
  habits,
  completedToday,
  todayNutrition
);

  const loadData = async () => {
    // ✅ FIX 1: update streaks BEFORE fetching trackers
    await updateStreaks();

    // HABITS
    const data = await getHabits();
    setHabits(data || []);

    // TRACKERS
    const trackerData = await getTrackers();
    setTrackers(trackerData || []);

    // NUTRITION
    const nutrition = await getTodayNutrition();
    setTodayNutrition(nutrition || []);

    // STREAK + COMPLETION
    const streakData: any = {};
    const completedMap: any = {};
    const today = new Date().toISOString().split("T")[0];

    //GOALS
    const goalData = await getGoals();
    setGoals(goalData);

    for (const habit of data || []) {
      const logs = await getHabitLogs(habit.id);

      streakData[habit.id] = calculateStreak(logs);

      completedMap[habit.id] = logs.some(
        (log) => log.date === today
      );
    }

    setStreaks(streakData);
    setCompletedToday(completedMap);

    // SCORE
    const finalScore = calculateDisciplineScore(
      data || [],
      completedMap,
      streakData
    );

    setScore(finalScore);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="p-4 space-y-4">
      {/* 🔥 DISCIPLINE SCORE */}
      <div className="bg-zinc-900 p-6 rounded-xl text-center">
        <p className="text-sm text-gray-400">Discipline Score</p>
        <p className="text-4xl font-bold mt-2">{score}%</p>

        <div className="w-full bg-zinc-800 h-2 rounded mt-4">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* 🍽 NUTRITION */}
      <div className="bg-zinc-900 p-4 rounded-xl space-y-3">
        <h2 className="font-semibold">Nutrition</h2>

        <div className="flex gap-2">
          <input
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="flex-1 p-2 bg-zinc-800 rounded"
          />
          <input
            placeholder="Protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="flex-1 p-2 bg-zinc-800 rounded"
          />
        </div>

        <button
          onClick={async () => {
            await addNutrition({
              calories: Number(calories),
              protein: Number(protein),
            });

            setCalories("");
            setProtein("");
            loadData();
          }}
          className="bg-green-500 w-full p-2 rounded"
        >
          Add Meal
        </button>

        <div className="text-sm text-gray-400">
          Total Calories:{" "}
          {todayNutrition.reduce((a, b) => a + b.calories, 0)}
          <br />
          Total Protein:{" "}
          {todayNutrition.reduce((a, b) => a + b.protein, 0)}g
        </div>
      </div>

      {/* 🚫 DISCIPLINE TRACKERS */}
      <div className="bg-zinc-900 p-4 rounded-xl space-y-3">
        <h2 className="font-semibold">Discipline</h2>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              await createTracker("nofap");
              loadData(); // ✅ FIXED
            }}
            className="bg-purple-500 px-3 py-1 rounded"
          >
            Add NoFap
          </button>

          <button
            onClick={async () => {
              await createTracker("smoking");
              loadData(); // ✅ FIXED
            }}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Add No Smoking
          </button>
        </div>

        <div className="space-y-2">
          {trackers.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-800 p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="capitalize">{t.type}</p>
                <p className="text-sm text-gray-400">
                  🔥 {t.current_streak} days
                </p>
              </div>

              <button
                onClick={async () => {
                  await logRelapse(t.id);
                  loadData(); // ✅ refresh UI
                }}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Relapse
              </button>
            </div>
          ))}
          {/* 🎯 GOALS */}
<div className="bg-zinc-900 p-4 rounded-xl space-y-3">
  <h2 className="font-semibold">Goals</h2>

  <div className="flex gap-2">
    <input
      placeholder="Goal (e.g. Gain Muscle)"
      value={goalTitle}
      onChange={(e) => setGoalTitle(e.target.value)}
      className="flex-1 p-2 bg-zinc-800 rounded"
    />
    <input
      placeholder="Target"
      value={goalTarget}
      onChange={(e) => setGoalTarget(e.target.value)}
      className="w-24 p-2 bg-zinc-800 rounded"
    />
  </div>

  <button
    onClick={async () => {
      await createGoal(goalTitle, Number(goalTarget));
      setGoalTitle("");
      setGoalTarget("");
      loadData();
    }}
    className="bg-blue-500 w-full p-2 rounded"
  >
    Add Goal
  </button>

  <div className="space-y-2">
    {goals.map((g) => {
      const percent = Math.min(
        100,
        Math.round((g.current_value / g.target_value) * 100)
      );

      return (
        <div key={g.id} className="bg-zinc-800 p-3 rounded">
          <p>{g.title}</p>

          <div className="w-full bg-zinc-700 h-2 rounded mt-2">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Update progress"
              className="flex-1 p-1 bg-zinc-900 rounded"
              onBlur={async (e) => {
                await updateGoalProgress(
                  g.id,
                  Number(e.target.value)
                );
                loadData();
              }}
            />
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {percent}% complete
          </p>
        </div>
      );
    })}
  </div>
</div>
        </div>
      </div>

      {/* 🧠 INSIGHTS */}
<div className="bg-zinc-900 p-4 rounded-xl">
  <h2 className="font-semibold mb-2">Insights</h2>

  {insights.map((i, idx) => (
    <p key={idx} className="text-sm text-gray-400">
      • {i}
    </p>
  ))}
</div>

      {/* 🧠 HABITS */}
      <h1 className="text-xl font-bold">Habits</h1>

      <div className="flex gap-2">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="flex-1 p-2 bg-zinc-900 rounded"
          placeholder="New habit..."
        />
        <button
          onClick={async () => {
            if (!newHabit) return;
            await createHabit(newHabit);
            setNewHabit("");
            loadData();
          }}
          className="bg-white text-black px-4 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-zinc-900 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{habit.name}</p>
              <p className="text-sm text-gray-400">
                🔥 {streaks[habit.id] || 0} day streak
              </p>
            </div>

            <button
              disabled={completedToday[habit.id]}
              onClick={async () => {
                await logHabit(habit.id);
                loadData();
              }}
              className={`px-3 py-1 rounded ${
                completedToday[habit.id]
                  ? "bg-green-700"
                  : "bg-green-500"
              }`}
            >
              {completedToday[habit.id]
                ? "Done ✅"
                : "Mark Done"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}