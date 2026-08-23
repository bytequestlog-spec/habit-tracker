import { useState, useEffect, useRef } from "react";
import BottomNav from "./components/BottomNav";
import ManagePage from "./components/ManagePage";
import DailyView from "./components/DailyView";
import MonthlyView from "./components/MonthlyView";
import YearlyView from "./components/YearlyView";
import AuthPage from "./components/AuthPage";
import "./styles/App.css";
import "./styles/BottomNav.css";
import "./styles/DailyView.css";
import "./styles/ManagePage.css";
import "./styles/MonthlyView.css";
import "./styles/YearlyView.css";
import "./styles/Auth.css";

function App() {
  const [habits, setHabits] = useState([]);

  const [currentView, setCurrentView] = useState("daily");
  const [currentPage, setCurrentPage] = useState("home");

  const touchStartX = useRef(null);
  const isDragging = useRef(false);

  const [darkMode, setDarkMode] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(newToken) {
    setToken(newToken);
  }

  useEffect(() => {
    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/habits", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setHabits(data));
  }, [token]);
  if (!token) {
    return <AuthPage onLogin={handleLogin}></AuthPage>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌱 Habit Tracker</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
          }}
          className="theme-toggle"
        >
          Logout
        </button>
      </header>
      <div
        className={`pages-container ${currentPage === "manage" ? "on-manage" : ""}`}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (diff > 50) setCurrentPage("manage");
          if (diff < -50) setCurrentPage("home");
        }}
        onMouseMove={(e) => {
          if (!isDragging.current) return;
        }}
        onMouseLeave={() => {
          isDragging.current = false;
        }}
      >
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
              Monthly
            </button>
            <button
              onClick={() => setCurrentView("yearly")}
              className={
                currentView === "yearly" ? "view-btn active" : "view-btn"
              }
            >
              Yearly
            </button>
          </div>

          {currentView === "daily" && (
            <DailyView habits={habits} setHabits={setHabits} token={token} />
          )}
          {currentView === "monthly" && (
            <MonthlyView habits={habits} setHabits={setHabits} token={token} />
          )}
          {currentView === "yearly" && <YearlyView habits={habits} />}
        </div>
        <div className="page manage-page">
          <ManagePage habits={habits} setHabits={setHabits} token={token} />
        </div>
      </div>
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></BottomNav>
    </div>
  );
}

export default App;
