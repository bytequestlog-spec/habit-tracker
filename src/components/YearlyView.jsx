import { useState } from "react";

function YearlyView({ habits }) {
  const today = new Date();
  const completed_dates = new Set(
    habits.flatMap((habit) =>
      Object.keys(habit.completed_dates).filter(
        (date) => habit.completed_dates[date],
      ),
    ),
  );

  const year = today.getFullYear();
  const start_date = new Date(year, 0, 1);
  const days = [];
  for (
    let d = new Date(start_date);
    d.getFullYear() === year;
    d.setDate(d.getDate() + 1)
  ) {
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push(dateString);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return (
    <div className="yearly-container">
      {weeks.map((week, wi) => (
        <div
          key={wi}
          style={{ display: "flex", flexDirection: "column", gap: "2px" }}
        >
          {week.map((day) => (
            <div
              key={day}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: completed_dates.has(day)
                  ? "green"
                  : "var(--bg-tertiary)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
export default YearlyView;
