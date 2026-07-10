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

  function addHabit() {
    if (name.trim() === "") return;
    const newHabit = {
      name,
      completedDates: {},
      startDate,
      endDate,
      days: selectedDays,
      streak: 0,
    };
    setHabits([...habits, newHabit]);

    setName("");
    setStartDate("");
    setEndDate("");
    setSelectedDays([]);
  }
  return (
    <div>
      <div id="manage-list">
        {habits.map((habit, index) => (
          <div key={index} className="habit-card">
            <div>
              {editingIndex === index ? (
                <div className="add-form">
                  <input
                    className="form-inputs"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  start date:
                  <input
                    className="form-inputs"
                    type="date"
                    value={editStartDate}
                    onChange={(e) => {
                      setEditStartDate(e.target.value);
                    }}
                  />
                  end date:
                  <input
                    className="form-inputs"
                    type="date"
                    value={editEndDate}
                    onChange={(e) => {
                      setEditEndDate(e.target.value);
                    }}
                  />
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
                              setEditDays(
                                editDays.filter((day) => day !== item),
                              );
                            }
                          }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>
                  <button
                    onClick={() => {
                      const updatedHabits = habits.map((h, i) =>
                        i === editingIndex
                          ? {
                              ...h,
                              name: editName,
                              startDate: editStartDate,
                              endDate: editEndDate,
                              days: editDays,
                            }
                          : h,
                      );
                      setHabits(updatedHabits);
                      setEditingIndex(null);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <span>
                    {habit.name} | {habit.days.join(", ")}| {habit.startDate} -{" "}
                    {habit.endDate}
                  </span>
                  <button
                    onClick={() => {
                      setHabits(habits.filter((_, i) => i !== index));
                    }}
                    className="remove-btn"
                  >
                    remove
                  </button>
                  <button
                    onClick={() => {
                      setEditingIndex(index);
                      setEditName(habit.name);
                      setEditStartDate(habit.startDate);
                      setEditEndDate(habit.endDate);
                      setEditDays(habit.days);
                    }}
                    className="edit-btn"
                  >
                    edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* add habits form*/}
      <div className="add-form">
        {" "}
        <input
          className="form-inputs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter the habit name"
        />
        start date:{" "}
        <input
          className="form-inputs"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        end date:{" "}
        <input
          className="form-inputs"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
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
      </div>
      <button onClick={addHabit} className="add-btn">
        Add Habit
      </button>
    </div>
  );
}

export default ManagePage;
