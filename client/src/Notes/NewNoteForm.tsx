import { useMemo, useState } from "react";
import type { Note } from "../types";

type Props = {
  onSubmit: (note: Omit<Note, "id">) => void;
  notes?: Note[];
};

function NewNoteForm({ onSubmit, notes }: Props) {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newPageNumber, setNewPageNumber] = useState<number | "">("");
  const [newNoteText, setNewNoteText] = useState("");

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(notes?.map((n) => n.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [notes]);

  const bookOptions = useMemo(() => {
    return Array.from(new Set(notes?.map((n) => n.bookTitle))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [notes]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const category =
      selectedCategory === "__newCategory__" ? newCategory : selectedCategory;
    const bookTitle =
      selectedBook === "__newBookTitle__" ? newBookTitle : selectedBook;

    onSubmit({
      noteTitle: newNoteTitle,
      category,
      bookTitle,
      pageNumber: newPageNumber === "" ? 0 : Number(newPageNumber),
      noteText: newNoteText,
    });

    setNewNoteTitle("");
    setNewCategory("");
    setSelectedBook("");
    setNewBookTitle("");
    setNewPageNumber("");
    setNewNoteText("");
  }

  return (
    <div className="w-3/4 md:w-2/5 p-5 mt-6 mx-auto shadow-lg rounded-md border-2">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl text-extrabold ">New Note</h1>

        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="note-title">Note Title</label>
          <input
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            type="text"
            id="note-title"
            className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
          />
        </div>

        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              if (e.target.value !== "__newCategory__") setNewCategory("");
            }}
            className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2"
          >
            <option value="">--Select a category--</option>
            <option value="__newCategory__">--Add new category--</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory === "__newCategory__" && (
          <div className="w-5/6 mx-auto mt-2">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
            />
          </div>
        )}

        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="book-select">Book title</label>
          <select
            id="book-select"
            value={selectedBook}
            onChange={(e) => {
              setSelectedBook(e.target.value);
              if (e.target.value !== "__newBookTitle__") setNewBookTitle("");
            }}
            className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2"
          >
            <option value="">--Select a book--</option>
            <option value="__newBookTitle__">--Add new book--</option>
            {bookOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {selectedBook === "__newBookTitle__" && (
          <div className="w-5/6 mx-auto mt-2">
            <input
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              type="text"
              autoFocus
              className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
            />
          </div>
        )}

        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="page-number">Page Number</label>
          <input
            value={newPageNumber}
            onChange={(e) =>
              setNewPageNumber(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            type="number"
            id="page-number"
            className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
          />
        </div>

        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="note">Note</label>
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            id="note"
            rows={4}
            className="block w-full mt-1 pl-1 resize-none shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
          ></textarea>
        </div>

        <button className="block mx-auto mt-4 p-2 rounded-md text-white bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default NewNoteForm;
