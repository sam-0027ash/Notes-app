import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, saveNotes } from "../utils/notesStorage";
import { motion, AnimatePresence } from "framer-motion";

function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = getNotes().map((n) => ({
      ...n,
      pinned: n.pinned ?? false,
    }));
    setNotes(data);
  }, []);

  // 🔍 search filter
  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📌 split pinned / normal
  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const normalNotes = filteredNotes.filter((n) => !n.pinned);

  const handleLogout = () => navigate("/");

  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };

  const togglePin = (id) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    setNotes(updated);
    saveNotes(updated);
  };

  // 🧩 CARD (IMPORTANT: layout added here)
  const renderCard = (note) => (
    <motion.div
      layout
      key={note.id}
      style={styles.card}
      onClick={() => navigate("/note", { state: note })}

      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}

      whileHover={{
        scale: 1.04,
        boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
      }}

      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      <div style={styles.cardActions}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePin(note.id);
          }}
          style={{
            ...styles.iconBtn,
            color: note.pinned ? "#ff9800" : "#bbb",
            fontSize: note.pinned ? "18px" : "16px",
          }}
        >
          📌
        </button>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/create", { state: note });
            }}
            style={styles.iconBtn}
          >
            ✏️
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
            }}
            style={styles.iconBtn}
          >
            🗑️
          </button>
        </div>
      </div>

      <h3>{note.title}</h3>

      {note.subtitle && (
        <h5 style={{ margin: "5px 0", color: "#666" }}>
          {note.subtitle}
        </h5>
      )}

      <p>
        {note.content.length > 80
          ? note.content.slice(0, 80) + "..."
          : note.content}
      </p>
    </motion.div>
  );

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>My Notes</h2>

        <div style={styles.headerRight}>
          <button
            onClick={() => navigate("/profile")}
            style={styles.profileBtn}
          >
            👤 Profile
          </button>

          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        </div>
      </div>

      {/* NEW NOTE */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => navigate("/create")} style={styles.button}>
          + New Note
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 📌 PINNED */}
      {pinnedNotes.length > 0 && (
        <>
          <h3 style={styles.sectionTitle}>📌 Pinned</h3>

          <motion.div layout style={styles.list}>
            <AnimatePresence>
              {pinnedNotes.map(renderCard)}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* 📝 NORMAL */}
      <h3 style={styles.sectionTitle}>📝 All Notes</h3>

      <motion.div layout style={styles.list}>
        <AnimatePresence>
          {normalNotes.length === 0 ? (
            <p>No notes found</p>
          ) : (
            normalNotes.map(renderCard)
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Notes;

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "50px auto",
    padding: "0 20px",
    textAlign: "center",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  profileBtn: {
    padding: "8px 12px",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  logout: {
    padding: "8px 12px",
    background: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  button: {
    padding: "10px 14px",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  search: {
    width: "60%",
    padding: "10px",
    margin: "10px 0 20px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },

  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginTop: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    textAlign: "left",
    cursor: "pointer",
  },

  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  iconBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "5px",
  },

  sectionTitle: {
    textAlign: "left",
    margin: "20px 0 10px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
};