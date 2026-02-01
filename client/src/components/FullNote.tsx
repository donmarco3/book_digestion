import type { Note } from "../types";
import { useParams, useNavigate } from "react-router-dom";

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
    <div>
      <h1>{note.noteTitle}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {note.bookTitle} • {note.category} • page {note.pageNumber}
      </p>
      <div>{note.noteText}</div>

      {deleteNote && (
        <button
          onClick={() => {
            deleteNote(note.id);
            navigate("/");
          }}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default FullNote;
