import { Link } from "react-router-dom";
import type { Note } from "../types";

type Props = {
  notes: Note[];
};

function BooksList({ notes }: Props) {
  const noteCountInBook = notes.reduce<Record<string, number>>((count, n) => {
    count[n.bookTitle] = (count[n.bookTitle] || 0) + 1;
    return count;
  }, {});

  const titles = Object.keys(noteCountInBook).sort((a, b) =>
    a.localeCompare(b),
  );

  if (titles.length === 0) {
    return <div className="p-6">No books yet — add a note to create one.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Books</h2>
      <ul className="space-y-2">
        {titles.map((title) => (
          <li key={title} className="flex justify-between items-center">
            <Link
              to={`/books/${encodeURIComponent(title)}`}
              className="text-indigo-600 hover:underline"
            >
              {title}
            </Link>
            <span className="text-sm text-gray-500">
              {noteCountInBook[title]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;
