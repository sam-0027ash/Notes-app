import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const validEmail = "demo@notes.com";
    const validPassword = "demo123";

    if (identifier === validEmail && password === validPassword) {
      setError("");
      navigate("/notes");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Enter email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        onKeyDown={handleKeyDown}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "320px",
    margin: "120px auto",
    padding: "25px",
    background: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    backdropFilter: "blur(8px)",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #cabfbf",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#f95a51",
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default Login;