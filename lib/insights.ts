export const generateInsights = (
  habits: any[],
  completedToday: any,
  nutrition: any[]
) => {
  const insights = [];

  const completed = habits.filter(
    (h) => completedToday[h.id]
  ).length;

  if (completed < habits.length / 2) {
    insights.push("You’re missing many habits today");
  } else {
    insights.push("Strong consistency today");
  }

  const totalProtein = nutrition.reduce(
    (a, b) => a + b.protein,
    0
  );

  if (totalProtein < 80) {
    insights.push("Protein intake is low");
  }

  return insights;
};