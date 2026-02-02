import { Link } from "react-router-dom";
import type { Note } from "../types";

type Props = Note & {
  deleteNote: (id: string) => void;
};

function NoteItem({ id, noteTitle, category, bookTitle }: Props) {
  return (
    <Link
      to={`/notes/${id}`}
      className="block p-3 md:w-4/5 p-5 mx-2 md:mx-auto mb-4 rounded-md border-2 shadow-lg hover:shadow-indigo-500/50 hover:border-indigo-500"
    >
      <h3 className="text-xl md:text-2xl text-bold">{noteTitle}</h3>
      <p className="text-sm text-gray-500">
        {bookTitle} · {category}
      </p>
    </Link>
  );
}

export default NoteItem;

// <button
//   className="block p-2 absolute inset-x-0 bottom-0 rounded-b-md text-white bg-red-500 shadow-lg shadow-red-500/50"
//   onClick={() => deleteNote(id)}
// >
//   Delete Note
// </button>
