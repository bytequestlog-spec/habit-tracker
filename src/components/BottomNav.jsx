import { useState } from "react";

function BottomNav({ currentPage, setCurrentPage }) {
  return (
    <div className="bottom-nav">
      <button
        onClick={() => setCurrentPage("home")}
        className={currentPage === "home" ? "page-btn active" : "page-btn"}
      >
        {" "}
        🏠Home
      </button>
      <button
        onClick={() => setCurrentPage("manage")}
        className={currentPage === "manage" ? "page-btn active" : "page-btn"}
      >
        ⚙️Manage
      </button>
    </div>
  );
}

export default BottomNav;
