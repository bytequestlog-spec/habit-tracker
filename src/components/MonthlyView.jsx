import { useState } from "react";
import recalculateStreak from "./recalculateStreak";

function MonthlyView({ habits, setHabits }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const visibleHabits = habits.filter((habit) => {
    const start = new Date(habit.startDate);
    const end = new Date(habit.endDate);
    const viewedDate = new Date(viewYear, viewMonth, 1);
    return start <= new Date(viewYear, viewMonth + 1, 0) && end >= viewedDate;
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <div className="month-nav">
        <button
          onClick={() => {
            if (viewMonth === 0) {
              setViewMonth(11);
              setViewYear(viewYear - 1);
            } else {
              setViewMonth(viewMonth - 1);
            }
          }}
        >
          ←
        </button>
        <span>
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button
          onClick={() => {
            if (viewMonth === 11) {
              setViewMonth(0);
              setViewYear(viewYear + 1);
            } else {
              setViewMonth(viewMonth + 1);
            }
          }}
        >
          →
        </button>
      </div>
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
                  const dateString = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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
    </div>
  );
}

export default MonthlyView;
