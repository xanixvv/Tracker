export const calculateDisciplineScore = (
  habits: any[],
  completedToday: any,
  streaks: any
) => {
  if (!habits.length) return 0;

  const total = habits.length;

  const completed = habits.filter(
    (h) => completedToday[h.id]
  ).length;

  const completionScore = (completed / total) * 70;

  // Average streak strength (cap at 7 days for fairness)
  const avgStreak =
    habits.reduce((acc, h) => {
      return acc + Math.min(streaks[h.id] || 0, 7);
    }, 0) / total;

  const streakScore = (avgStreak / 7) * 30;

  return Math.round(completionScore + streakScore);
};