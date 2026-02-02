import { useState } from "react";

type NewNote = {
  noteTitle: string;
  category: string;
  bookTitle: string;
  pageNumber: number;
  noteText: string;
};

type Props = {
  onSubmit: (note: NewNote) => void;
};

function NewNoteForm({ onSubmit }: Props) {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newPageNumber, setNewPageNumber] = useState<number | "">("");
  const [newNoteText, setNewNoteText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      noteTitle: newNoteTitle,
      category: newCategory,
      bookTitle: newBookTitle,
      pageNumber: newPageNumber === "" ? 0 : Number(newPageNumber),
      noteText: newNoteText,
    });

    setNewNoteTitle("");
    setNewCategory("");
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
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            type="text"
            id="category"
            className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
          />
        </div>
        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="book-title">Book Title</label>
          <input
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            type="text"
            id="book-title"
            className="block w-full mt-1 pl-1 shadow-lg rounded-md border-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:shadow-indigo-500/50 hover:border-indigo-500"
          />
        </div>
        <div className="w-5/6 mx-auto mt-2">
          <label htmlFor="page-number">Page Number</label>
          <input
            value={newPageNumber}
            onChange={(e) =>
              setNewPageNumber(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            type="text"
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
