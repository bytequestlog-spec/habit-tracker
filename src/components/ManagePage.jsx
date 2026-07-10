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
          <div key={index}>
            <div>
              {editingIndex === index ? (
                <div>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  start date:
                  <input
                    type="date"
                    value={editStartDate}
                    onChange={(e) => {
                      setEditStartDate(e.target.value);
                    }}
                  />
                  end date:
                  <input
                    type="date"
                    value={editEndDate}
                    onChange={(e) => {
                      setEditEndDate(e.target.value);
                    }}
                  />
                  {days.map((item, i) => (
                    <label key={i}>
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
      <div className="form-inputs">
        {" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter the habit name"
        />
        start date:{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        end date:{" "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
        {days.map((item, index) => (
          <label key={index}>
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
      <button onClick={addHabit} className="add-btn">
        Add Habit
      </button>
    </div>
  );
}

export default ManagePage;
