import { supabase } from "./supbase";

export const addNutrition = async (data: any) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  return await supabase.from("nutrition_logs").insert([
    {
      user_id: user.id,
      date: today,
      ...data,
    },
  ]);
};

export const getTodayNutrition = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("nutrition_logs")
    .select("*")
    .eq("user_id", user?.id)
    .eq("date", today);

  return data || [];
};