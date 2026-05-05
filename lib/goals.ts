import { supabase } from "./supbase";

export const getGoals = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("GET GOALS ERROR:", error);
  }

  return data || [];
};
export const createGoal = async (title: string, target: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No user found");
    return;
  }

  const { error } = await supabase.from("goals").insert([
    {
      user_id: user.id, // ✅ CRITICAL
      title,
      target_value: target,
      current_value: 0,
    },
  ]);

  if (error) {
    console.error("CREATE GOAL ERROR:", error);
  }
};

export const updateGoalProgress = async (id: string, value: number) => {
  return await supabase
    .from("goals")
    .update({ current_value: value })
    .eq("id", id);
};