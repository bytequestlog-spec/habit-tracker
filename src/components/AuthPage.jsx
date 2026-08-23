import { useState } from "react";
import "../styles/Auth.css";
import "../styles/ManagePage.css";
import "../styles/global.css";

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    const url = isLogin
      ? "http://localhost:3000/login"
      : "http://localhost:3000/signup";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("token", data.token);
          onLogin(data.token);
        }
      });
  }
  return (
    <div className="app">
      <div className="auth-container">
        <h1 className="app-title">🌱 Habit Tracker</h1>
        <div className="auth-form">
          <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
          {error && <p className="auth-error">{error}</p>}
          <input
            className="form-inputs"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <input
            className="form-inputs"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button className="add-btn" onClick={handleSubmit}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p className="auth-switch">
            {isLogin ? "Dont't have an account?" : "Already have an account?"}
            <button
              className="auth-switch-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
