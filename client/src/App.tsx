import { useEffect, useState } from "react";
import type { Note } from "./types";
import NotesList from "./Notes/NotesList";
import FullNote from "./Notes/FullNote";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import BooksList from "./Books/BooksList";
import BookNotes from "./Books/BookNotes";

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
      <div className="max-w-6xl mx-auto px-4 py-5">
        <h1>This is the homepage</h1>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<BooksList notes={notes} />} />
          <Route
            path="notes"
            element={
              <NotesList
                notes={notes}
                deleteNote={deleteNote}
                displayForm={displayForm}
                showForm={showForm}
                addNote={addNote}
              />
            }
          />
          <Route
            path="books/:book"
            element={
              <BookNotes
                notes={notes}
                deleteNote={deleteNote}
                displayForm={displayForm}
                showForm={showForm}
                addNote={addNote}
              />
            }
          />
          <Route
            path="/notes/:id"
            element={<FullNote notes={notes} deleteNote={deleteNote} />}
          />
          <Route
            path="*"
            element={<div className="p-6 text-center">Page not found</div>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
