import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import NoteView from "./pages/NoteView";
import Profile from "./pages/Profile";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note" element={<NoteView />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;