import { supabase } from "./supbase";

export const createHabit = async (name: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  return await supabase.from("habits").insert([
    {
      name,
      user_id: user.id,
    },
  ]);
};

export const getHabits = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user.id);

  console.log("habits:", data, error);

  return data;
};

export const logHabit = async (habit_id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  return await supabase.from("habit_logs").insert([
    {
      habit_id,
      user_id: user.id,
      date: today,
      completed: true,
    },
  ]);
};

export const getHabitLogs = async (habit_id: string) => {
  const { data } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habit_id)
    .order("date", { ascending: false });

  return data || [];
};

export const calculateStreak = (logs: any[]) => {
  let streak = 0;

  const today = new Date();

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);

    const diff =
      (today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);

    if (Math.floor(diff) === streak) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};