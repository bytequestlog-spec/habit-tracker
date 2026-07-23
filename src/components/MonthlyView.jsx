import { useState } from "react";
import recalculateStreak from "./recalculateStreak";

function MonthlyView({ habits, setHabits }) {
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const visibleHabits = habits.filter((habit) => {
    const start = new Date(habit.startDate);
    const end = new Date(habit.endDate);
    return today >= start && today <= end;
  });

  return (
    <div className="monthly-container">
      {" "}
      <table className="monthly-table">
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleHabits.map((habit, index) => (
            <tr key={index}>
              <td>{habit.name}</td>
              {days.map((day) => {
                const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                return (
                  <td
                    key={day}
                    style={{
                      backgroundColor: habit.completedDates[dateString]
                        ? "var(--success)"
                        : "",
                    }}
                    onClick={() => {
                      const updatedHabit = {
                        ...habit,
                        completedDates: {
                          ...habit.completedDates,
                          [dateString]: !habit.completedDates[dateString],
                        },
                      };
                      const withStreak = {
                        ...updatedHabit,
                        streak: recalculateStreak(updatedHabit, dateString),
                      };
                      const updatedHabits = habits.map((h) =>
                        h === habit ? withStreak : h,
                      );
                      setHabits(updatedHabits);
                    }}
                  >
                    {habit.completedDates[dateString] ? "✓" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyView;
