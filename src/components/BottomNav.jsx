import { useState } from "react";

function BottomNav({ currentPage, setCurrentPage }) {
  return (
    <nav className="bottom-nav">
      <button
        onClick={() => setCurrentPage("home")}
        className={currentPage === "home" ? "nav-tab active" : "nav-tab"}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </button>
      <button
        onClick={() => setCurrentPage("manage")}
        className={currentPage === "manage" ? "nav-tab active" : "nav-tab"}
      >
        <span className="nav-icon">⚙️</span>
        <span className="nav-label">Manage</span>
      </button>
    </nav>
  );
}

export default BottomNav;
