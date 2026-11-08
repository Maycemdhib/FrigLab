import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ingredients from "./pages/Ingredients";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access"),
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <Ingredients />
      </div>
    );
  }

  return (
    <div>
      {showLogin ? <Login onLogin={handleLogin} /> : <Register />}

      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Create an account" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default App;
