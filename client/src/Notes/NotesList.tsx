import NoteItem from "./NoteItem";
import type { Note } from "../types";
import NewNoteForm from "./NewNoteForm";

type Props = {
  notes: Note[];
  deleteNote: (id: string) => void;
  displayForm: () => void;
  showForm?: boolean;
  addNote: (note: Omit<Note, "id">) => void;
};

function NotesList({
  notes,
  deleteNote,
  displayForm,
  showForm,
  addNote,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto my-4">
      {showForm && <NewNoteForm onSubmit={addNote} />}
      <button
        onClick={displayForm}
        className="px-3 py-1 rounded-md text-white bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600"
      >
        {showForm ? "Close" : "Add Note"}
      </button>
      <h2 className="border-b-2 border-b-indigo-500 pb-3 mb-4 mx-2 md:mx-auto text-2xl font-semibold text-center">
        Notes
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        {notes.map((note) => {
          return <NoteItem {...note} key={note.id} deleteNote={deleteNote} />;
        })}
      </div>
    </div>
  );
}

export default NotesList;
