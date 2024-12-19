/* eslint-disable react/prop-types */
import { Star } from "lucide-react";
import axios from "axios";
import { useState } from "react";

const Note = ({ id, content, date, important, onUpdate }) => {
  const [isImportant, setImportant] = useState(important);
  const noteURL = `https://stormy-inlet-03951-9b968e8f957b.herokuapp.com/api/notes/${id}`;

  const toggleImportant = () => {
    const newImportance = !isImportant;
    setImportant(newImportance);
    axios
      .put(noteURL, { important: newImportance })
      .then((res) => {
        setImportant(res.data.important);
        onUpdate(res.data);
      })
      .catch((err) => {
        console.error(err);
        setImportant(!newImportance);
      });
  };
  return (
    <li
      key={id}
      className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between border-l-4 border-blue-400"
    >
      <div className="flex-grow">
        <p className="text-sm text-gray-800">{content}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {new Date(date).toLocaleString()}
        </span>
      </div>
      <button className="ml-3" onClick={toggleImportant}>
        {isImportant ? (
          <Star fill="CurrentColor" className="text-yellow-500" />
        ) : (
          <Star className="text-gray-400" />
        )}
      </button>
    </li>
  );
};

export default Note;
