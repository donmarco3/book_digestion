import NoteItem from "./NoteItem";
import type { Note } from "../types";

type Props = {
  notes: Note[];
  deleteNote: (id: string) => void;
};

function NotesList({ notes, deleteNote }: Props) {
  return (
    <div className="lg:w-4/5 mx-auto my-4">
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
