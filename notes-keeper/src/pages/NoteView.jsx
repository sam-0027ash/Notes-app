import { useLocation, useNavigate } from "react-router-dom";

function NoteView() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div style={styles.page}>
        <h3>No note selected</h3>
        <button onClick={() => navigate("/notes")} style={styles.backBtn}>
          ← Back
        </button>
      </div>
    );
  }

  const { title, subtitle, content } = state;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/notes")} style={styles.backBtn}>
          ← Back
        </button>
      </div>

      {/* Note Card */}
      <div style={styles.container}>
        <h1 style={styles.title}>{title}</h1>

        {subtitle && <h3 style={styles.subtitle}>{subtitle}</h3>}

        <p style={styles.content}>{content}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(120deg, #f6d365, #fda085)",
  },

  header: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "flex-start",
  },

  container: {
    width: "100%",
    maxWidth: "800px",
    background: "rgba(255,255,255,0.92)",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    backdropFilter: "blur(10px)",
  },

  backBtn: {
    padding: "10px 14px",
    background: "rgb(250, 109, 109)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "white",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    transition: "0.2s ease",
  },

  title: {
    fontSize: "26px",
    marginBottom: "10px",
    wordBreak: "break-word",
  },

  subtitle: {
    color: "#666",
    marginBottom: "15px",
    fontSize: "16px",
  },

  content: {
    marginTop: "10px",
    lineHeight: "1.8",
    fontSize: "16px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};

export default NoteView;