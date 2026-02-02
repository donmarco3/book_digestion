import type { Note } from "../types";
import { useParams, useNavigate, Link } from "react-router-dom";

type Props = {
  notes?: Note[];
  deleteNote?: (id: string) => void;
};

function FullNote({ notes, deleteNote }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allNotes: Note[] =
    notes ?? (JSON.parse(localStorage.getItem("NOTES") || "[]") as Note[]);
  const note = allNotes.find((n) => n.id === id);

  if (!note) {
    return <div className="p-6 text-center">Note not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <h1 className="text-2xl font-bold">{note.noteTitle}</h1>
      <div className="text-md text-gray-500 mb-4">
        <Link
          to={`/books/${encodeURIComponent(note.bookTitle)}`}
          className="text-indigo-600 hover:underline"
        >
          {note.bookTitle}
        </Link>{" "}
        • page {note.pageNumber}
        <p>{note.category}</p>
      </div>
      <div>{note.noteText}</div>
      {deleteNote && (
        <button
          onClick={() => {
            deleteNote(note.id);
            navigate("/");
          }}
          className="px-3 py-1 mt-10 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default FullNote;
