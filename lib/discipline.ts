import { supabase } from "./supbase";

export const getTrackers = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("discipline_trackers")
    .select("*")
    .eq("user_id", user?.id);

  return data || [];
};

export const createTracker = async (type: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase.from("discipline_trackers").insert([
    {
      user_id: user?.id,
      type,
      current_streak: 0,
    },
  ]);
};

export const logRelapse = async (tracker_id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = new Date().toISOString().split("T")[0];

  // reset streak
  await supabase
    .from("discipline_trackers")
    .update({ current_streak: 0, last_reset: today })
    .eq("id", tracker_id);

  // log relapse
  await supabase.from("relapse_logs").insert([
    {
      tracker_id,
      user_id: user?.id,
      date: today,
    },
  ]);
};

export const updateStreaks = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = new Date().toISOString().split("T")[0];

  const { data: trackers } = await supabase
    .from("discipline_trackers")
    .select("*")
    .eq("user_id", user?.id);

  for (const t of trackers || []) {
    // if already updated today, skip
    if (t.last_reset === today) continue;

    await supabase
      .from("discipline_trackers")
      .update({
        current_streak: (t.current_streak || 0) + 1,
      })
      .eq("id", t.id);
  }
};