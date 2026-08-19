import { useState } from "react";
import recalculateStreak from "./recalculateStreak";

function DailyView({ habits, setHabits, token }) {
  const today = new Date();
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayName = dayNames[today.getDay()];
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const visibleHabits = habits.filter((habit) => {
    const start = new Date(habit.start_date);
    const end = new Date(habit.end_date);
    return today >= start && today <= end && habit.days.includes(todayName);
  });

  return (
    <div className="daily-container">
      {visibleHabits.length === 0 && (
        <p className="empty-message">No habits scheduled for today!</p>
      )}
      {visibleHabits.map((habit, index) => (
        <div key={index} className="habit-row">
          <span className="habit-name">{habit.name}</span>
          <div className="habit-action">
            <span className="streak">{habit.streak}🔥</span>
            <input
              type="checkbox"
              checked={habit.completed_dates[todayString] === true}
              className="habit-checkbox"
              onChange={(e) => {
                const updatedHabit = {
                  ...habit,
                  completed_dates: {
                    ...habit.completed_dates,
                    [todayString]: e.target.checked,
                  },
                };

                const withStreak = {
                  ...updatedHabit,
                  streak: recalculateStreak(updatedHabit, todayString),
                };

                const updatedHabits = habits.map((h) =>
                  h === habit ? withStreak : h,
                );

                fetch(`http://localhost:3000/habits/${habit.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name: withStreak.name,
                    days: withStreak.days,
                    start_date: withStreak.start_date,
                    end_date: withStreak.end_date,
                    streak: withStreak.streak,
                    completed_dates: withStreak.completed_dates,
                  }),
                })
                  .then((res) => res.json())
                  .then((updatedHabit) => {
                    setHabits(
                      habits.map((h) =>
                        h.id === updatedHabit.id ? updatedHabit : h,
                      ),
                    );
                  });
              }}
            />

            {/* 
<button
              onClick={() => setHabits(habits.filter((h) => h !== habit))}
              className="remove-btn"
            >
              remove
            </button>
            */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyView;
