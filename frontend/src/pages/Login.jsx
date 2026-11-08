import { useState } from "react";
import api from "../services/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("accounts/login/", {
        username: username,
        password: password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/";

      alert("Login successful!");
      onLogin();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>FrigLab Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
