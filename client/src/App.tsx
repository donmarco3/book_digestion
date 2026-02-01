import { useEffect, useState } from "react";
import type { Note } from "./types";
import NewNoteForm from "./components/NewNoteForm";
import NotesList from "./components/NotesList";
import FullNote from "./components/FullNote";
import { Routes, Route } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const localValue = localStorage.getItem("NOTES");
    if (localValue == null) return [];

    return JSON.parse(localValue) as Note[];
  });

  useEffect(() => {
    localStorage.setItem("NOTES", JSON.stringify(notes));
  }, [notes]);

  const [showForm, setShowForm] = useState(false);

  function addNote(note: Omit<Note, "id">) {
    setNotes((currentNotes) => {
      return [
        ...currentNotes,
        {
          id: crypto.randomUUID(),
          ...note,
        },
      ];
    });
    setShowForm(false);
  }

  function deleteNote(id: string) {
    setNotes((currentNotes) => {
      return currentNotes.filter((note) => note.id !== id);
    });
  }

  function displayForm() {
    setShowForm((prev) => !prev);
  }

  function Home() {
    return (
      <>
        <button
          className="block mx-auto my-4 p-2 rounded-md text-white bg-indigo-500 shadow-lg shadow-indigo-500/50"
          onClick={displayForm}
        >
          {showForm ? "Close" : "Add Note"}
        </button>
        {showForm && <NewNoteForm onSubmit={addNote} />}
        <NotesList notes={notes} deleteNote={deleteNote} />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/notes/:id"
        element={<FullNote notes={notes} deleteNote={deleteNote} />}
      />

      <Route
        path="*"
        element={<div className="p-6 text-center">Page not found</div>}
      />
    </Routes>
  );
}

export default App;
