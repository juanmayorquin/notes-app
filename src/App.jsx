import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const notesURL = "http://localhost:3000/api/notes";

  const [notes, setNotes] = useState([]);
  const [showImportants, setShowImportants] = useState(false);
  const noteContentInputRef = useRef();
  const noteImportantInputRef = useRef();

  const handleAddNote = (e) => {
    e.preventDefault();
    const newNote = {
      content: noteContentInputRef.current.value,
      important: noteImportantInputRef.current.checked,
    };
    axios
      .post(notesURL, newNote)
      .then((res) => setNotes((prevNotes) => [...prevNotes, res.data]));
    noteContentInputRef.current.value = "";
    noteImportantInputRef.current.checked = false;
  };

  useEffect(() => {
    axios.get(notesURL).then((res) => setNotes(res.data));
  }, []);

  const displayedNotes = showImportants
    ? notes.filter((note) => note.important)
    : notes;

  return (
    <>
      <button onClick={() => setShowImportants(!showImportants)}>
        {!showImportants ? "Mostrar importantes" : "Mostrar todos"}
      </button>
      <div>
        <ul>
          {displayedNotes.map((note) => (
            <li key={note.id}>
              <p>{note.content}</p>
              {note.date}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAddNote} autoComplete="off">
        <label htmlFor="noteInput"></label>
        <input
          ref={noteContentInputRef}
          id="noteInput"
          type="text"
          placeholder="Escribe una nueva nota"
        />
        <input
          ref={noteImportantInputRef}
          type="checkbox"
          name="Important"
          id="noteImportantCheckbox"
        />
        <button>Añadir nota</button>
      </form>
    </>
  );
}

export default App;
