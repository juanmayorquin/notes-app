import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import Note from "./Note";

function App() {
  const notesURL =
    "https://stormy-inlet-03951-9b968e8f957b.herokuapp.com/api/notes";

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ content: "", important: false });
  const [showImportants, setShowImportants] = useState(false);
  const noteContentInputRef = useRef();

  const handleAddNote = (e) => {
    e.preventDefault();
    axios.post(notesURL, newNote).then((res) => setNotes([...notes, res.data]));
    noteContentInputRef.current.value = "";
    setNewNote({ content: "", important: false });
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  useEffect(() => {
    axios.get(notesURL).then((res) => setNotes(res.data));
  }, []);

  const displayedNotes = showImportants
    ? notes.filter((note) => note.important)
    : notes;

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Mis Notas</h1>
          <button
            onClick={() => setShowImportants(!showImportants)}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {!showImportants ? "Mostrar importantes" : "Mostrar todos"}
          </button>
        </header>

        {displayedNotes.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No hay notas para mostrar.</p>
          </div>
        ) : (
          <ul className="space-y-4 h-96 overflow-auto">
            {displayedNotes.map((note) => (
              <Note key={note.id} onUpdate={handleUpdateNote} {...note} />
            ))}
          </ul>
        )}

        <form
          onSubmit={handleAddNote}
          autoComplete="off"
          className="mt-8 space-y-4"
        >
          <div className="flex items-center w-full justify-between gap-1">
            <div className="flex-grow">
              <input
                ref={noteContentInputRef}
                id="noteInput"
                type="text"
                placeholder="Escribe algo memorable"
                className="w-full px-4 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote((prevNote) => ({
                    ...prevNote,
                    content: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <button
                type="button"
                htmlFor="noteImportantCheckbox"
                className="text-sm text-gray-700 cursor-pointer p-2"
                onClick={() => {
                  setNewNote((prevNote) => ({
                    ...prevNote,
                    important: !prevNote.important,
                  }));
                }}
              >
                {newNote.important ? (
                  <Star fill="CurrentColor" className="text-yellow-500" />
                ) : (
                  <Star className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-base text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Añadir Nota
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
