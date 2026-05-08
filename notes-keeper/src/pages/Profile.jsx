import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {
  const navigate = useNavigate();

  const defaultUser = {
    name: "Demo User",
    email: "demo@notes.com",
    age: "22",
    occupation: "Student",
    country: "India",
  };

  const [user, setUser] = useState(defaultUser);
  const [original, setOriginal] = useState(defaultUser);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setOriginal(parsed);
    }
  }, []);

  // 🔍 detect changes
  useEffect(() => {
    setIsChanged(JSON.stringify(user) !== JSON.stringify(original));
  }, [user, original]);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setOriginal(user);
    setIsChanged(false);
  };

  return (
    <div style={styles.page}>

      {/* Avatar */}
      <div style={styles.avatarBox}>
        <div style={styles.avatar}>👤</div>
        <h2 style={{ margin: 0 }}>Profile</h2>
      </div>

      {/* Card */}
      <div style={styles.card}>

        <label>Username</label>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={styles.input}
        />

        <label>Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={styles.input}
        />

        <label>Age</label>
        <input
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          style={styles.input}
        />

        <label>Occupation</label>
        <input
          value={user.occupation}
          onChange={(e) =>
            setUser({ ...user, occupation: e.target.value })
          }
          style={styles.input}
        />

        <label>Country</label>
        <input
          value={user.country}
          onChange={(e) =>
            setUser({ ...user, country: e.target.value })
          }
          style={styles.input}
        />

        {/* Bottom Actions */}
        <div style={styles.actions}>
          <button
            onClick={() => navigate("/notes")}
            style={styles.backBtn}
          >
            ← Back
          </button>

          <button
            onClick={handleSave}
            disabled={!isChanged}
            style={{
              ...styles.saveBtn,
              opacity: isChanged ? 1 : 0.5,
              cursor: isChanged ? "pointer" : "not-allowed",
            }}
          >
            💾 Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    paddingTop: "40px",
    background: "linear-gradient(120deg, #f6d365, #fda085)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom:"100px",
  },

  avatarBox: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#fff",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    margin: "0 auto 10px auto",
    backdropFilter: "blur(10px)",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    padding: "25px",
    width: "340px",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    marginBottom: "10px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  backBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#fa4a4a",
    color: "white",
    fontWeight: "600",
  },

  saveBtn: {
    padding: "10px 14px",
    background: "#4cafef",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
  },
};

export default Profile;