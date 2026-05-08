import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getNotes, saveNotes } from "../utils/notesStorage";

function CreateNote() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (state) {
      setTitle(state.title || "");
      setSubtitle(state.subtitle || "");
      setContent(state.content || "");
    }
  }, [state]);

  const handleSave = () => {
    if (!title || !content) return;

    const existingNotes = getNotes();

    const newNote = {
      id: state?.id || Date.now(),
      title,
      subtitle,
      content,
      pinned: state?.pinned || false,
    };

    let updatedNotes;

    if (state) {
      updatedNotes = existingNotes.map((note) =>
        note.id === state.id ? newNote : note
      );
    } else {
      updatedNotes = [newNote, ...existingNotes];
    }

    saveNotes(updatedNotes);
    navigate("/notes");
  };

  // ⌨️ ENTER TO SAVE (global handler)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // stop newline
      handleSave();
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/notes")} style={styles.back}>
        ⬅ Back
      </button>

      <h2 style={{ marginBottom: "15px" }}>
        {state ? "Edit Note" : "Create Note"}
      </h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        onKeyDown={handleKeyDown}
      />

      <input
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        style={styles.input}
        onKeyDown={handleKeyDown}
      />

      <textarea
        placeholder="Write your note... (Shift + Enter for new line)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSave} style={styles.button}>
        {state ? "Update Note" : "Save Note"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "440px",
    margin: "60px auto",
    textAlign: "center",
    background: "rgba(255,255,255,0.92)",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    position: "relative",
  },

  back: {
    position: "absolute",
    left: "15px",
    top: "15px",
    padding: "6px 12px",
    background: "#ff5a5f",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  },

  input: {
    width: "90%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  textarea: {
    width: "90%",
    padding: "12px",
    margin: "10px 0",
    height: "130px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    resize: "none",
  },

  button: {
    padding: "10px 18px",
    background: "#fa5858",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CreateNote;