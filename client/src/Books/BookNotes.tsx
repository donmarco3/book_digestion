import { Link, useParams } from "react-router-dom";
import type { Note } from "../types";
import NotesList from "../Notes/NotesList";

type Props = {
  notes: Note[];
  deleteNote: (id: string) => void;
  displayForm: () => void;
  showForm?: boolean;
  addNote: (note: Omit<Note, "id">) => void;
};

function BookNotes({
  notes,
  deleteNote,
  displayForm,
  showForm,
  addNote,
}: Props) {
  const { book } = useParams<{ book: string }>();
  if (!book) return <div className="p-6">No book found</div>;

  const title = decodeURIComponent(book);
  const filtered = notes.filter((n) => n.bookTitle === title);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500">
            {filtered.length} note{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link to="/books" className="text-sm text-indigo-600 hover:underline">
          ← Back to books
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">
          No notes for this book yet.
        </div>
      ) : (
        <NotesList
          notes={filtered}
          deleteNote={deleteNote}
          displayForm={displayForm}
          showForm={showForm}
          addNote={addNote}
        />
      )}
    </div>
  );
}

export default BookNotes;
