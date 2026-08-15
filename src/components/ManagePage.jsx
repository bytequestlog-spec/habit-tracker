import { useState } from "react";

function ManagePage({ habits, setHabits }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editDays, setEditDays] = useState([]);

  function toggleDay(day, currentDays, setDaysState) {
    if (currentDays.includes(day)) {
      setDaysState(currentDays.filter((d) => d !== day));
    } else {
      setDaysState([...currentDays, day]);
    }
  }

  function addHabit() {
    if (name.trim() === "") return;
    fetch("http://localhost:3000/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        days: selectedDays,
        start_date: startDate,
        end_date: endDate,
      }),
    })
      .then((res) => res.json())
      .then((newHabit) => {
        setHabits([...habits, newHabit]);
        setName("");
        setStartDate("");
        setEndDate("");
        selectedDays([]);
      });
  }

  return (
    <div className="manage-page-container">
      <div id="manage-list">
        {habits.map((habit, index) =>
          editingIndex === index ? (
            <div key={index} className="add-form edit-form-card">
              <input
                className="form-inputs"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Habit Name"
              />
              <label className="form-label">Start Date:</label>
              <input
                className="form-inputs"
                type="date"
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
              />
              <label className="form-label">End Date:</label>
              <input
                className="form-inputs"
                type="date"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
              />
              {/*Day Pills selection*/}
              <label className="form-label">Repeat Days:</label>
              <div className="days-pills-container">
                {days.map((item) => {
                  const active = editDays.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      className={`day-pill ${active ? "active" : ""}`}
                      onClick={() => toggleDay(item, editDays, setEditDays)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              {/*
                 <div className="days-container">
                  {days.map((item, i) => (
                    <label key={i} className="day-label">
                      <input
                        type="checkbox"
                        value={item}
                        checked={editDays.includes(item)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditDays([...editDays, item]);
                          } else {
                            setEditDays(editDays.filter((day) => day !== item));
                          }
                        }}
                      />
                      {item}
                    </label>
                  ))}
                </div>
                */}
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingIndex(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => {
                    fetch(
                      `http://localhost:3000/habits/${habits[editingIndex].id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: editName,
                          days: editDays,
                          start_date: editStartDate,
                          end_date: editEndDate,
                          streak: habits[editingIndex].streak,
                          completed_dates: habits[editingIndex].completed_dates,
                        }),
                      },
                    )
                      .then((res) => res.json())
                      .then((updatedHabits) => {
                        setHabits(
                          habits.map((h) =>
                            h.id === updatedHabit.id ? updatedHabit : h,
                          ),
                        );
                        setEditingIndex(null);
                      });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div key={index} className="habit-card">
              <div className="habit-info">
                <span className="habit-title">{habit.name} </span>
                <span className="habit-meta">
                  {habit.days.join(", ").toUpperCase()}| {habit.startDate} to{" "}
                  {habit.endDate}
                </span>
              </div>

              <div className="habit-card-action">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(index);
                    setEditName(habit.name);
                    setEditStartDate(habit.startDate);
                    setEditEndDate(habit.endDate);
                    setEditDays(habit.days || []);
                  }}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    fetch(`http://localhost:3000/habits/${habit.id}`, {
                      method: "DELETE",
                    }).then(() => {
                      setHabits(habits.filter((h) => h.id !== habit.id));
                    });
                  }}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ),
        )}
      </div>

      {/* add habits form*/}
      <div className="add-form">
        <input
          className="form-inputs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter the habit name"
        />
        <label className="form-label">Start Date: </label>
        <input
          className="form-inputs"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <label className="form-label">End Date:</label>
        <input
          className="form-inputs"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Day pills selection*/}
        <label className="form-label">Repeat Days:</label>
        <div className="days-pills-container">
          {days.map((item) => {
            const active = selectedDays.includes(item);
            return (
              <button
                type="button"
                key={item}
                className={`day-pill ${active ? "active" : ""}`}
                onClick={() => toggleDay(item, selectedDays, setSelectedDays)}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/*
          <div className="days-container">
          {days.map((item, index) => (
            <label key={index} className="day-label">
              <input
                type="checkbox"
                value={item}
                checked={selectedDays.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDays([...selectedDays, item]);
                  } else {
                    setSelectedDays(selectedDays.filter((day) => day !== item));
                  }
                }}
              />
              {item}
            </label>
          ))}
        </div>
        */}

        <button type="button" onClick={addHabit} className="add-btn">
          Add Habit
        </button>
      </div>
    </div>
  );
}

export default ManagePage;
