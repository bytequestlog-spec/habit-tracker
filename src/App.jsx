import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import ManagePage from "./components/ManagePage";
import DailyView from "./components/DailyView";
import MonthlyView from "./components/MonthlyView";
import YearlyView from "./components/YearlyView";
import "./styles/App.css";
import "./styles/BottomNav.css";
import "./styles/DailyView.css";
import "./styles/ManagePage.css";
import "./styles/MonthlyView.css";
import "./styles/YearlyView.css";

function App() {
  const [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("habits")) || [],
  );

  const [currentView, setCurrentView] = useState("daily");
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <div className="app">
      {currentPage === "home" && (
        <div className="page home-page">
          <div className="view-switcher">
            <button
              onClick={() => setCurrentView("daily")}
              className={
                currentView === "daily" ? "view-btn active" : "view-btn"
              }
            >
              Daily
            </button>
            <button
              onClick={() => setCurrentView("monthly")}
              className={
                currentView === "monthly" ? "view-btn active" : "view-btn"
              }
            >
              monthly
            </button>
            <button
              onClick={() => setCurrentView("yearly")}
              className={
                currentView === "yearly" ? "view-btn active" : "view-btn"
              }
            >
              yearly
            </button>
          </div>
          {habits.length === 0 && (
            <p>No habits yet! Add one in the manage page</p>
          )}
          {currentView === "daily" && (
            <DailyView habits={habits} setHabits={setHabits} />
          )}
          {currentView === "monthly" && (
            <MonthlyView habits={habits} setHabits={setHabits} />
          )}
          {currentView === "yearly" && <YearlyView habits={habits} />}
        </div>
      )}
      {currentPage === "manage" && (
        <div className="page manage-page">
          <ManagePage habits={habits} setHabits={setHabits} />
        </div>
      )}
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></BottomNav>
    </div>
  );
}

export default App;
