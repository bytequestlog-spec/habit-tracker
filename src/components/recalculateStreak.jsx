
function recalculateStreak(habit, dateString) {
  if (habit.completedDates[dateString]) {
    let streak = 1;
    let checkDate = new Date(dateString);
    checkDate.setDate(checkDate.getDate() - 1);
    let checkString = checkDate.toISOString().split("T")[0];

    while (habit.completedDates[checkString]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
      checkString = checkDate.toISOString().split("T")[0];
    }
    return streak;
  }
  return 0;
}

export default recalculateStreak;
