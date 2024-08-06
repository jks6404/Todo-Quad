import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon  from '@mui/icons-material/DeleteOutlined';
import man from '../images/man.png'; 

function NotesList({ notes, deleteNote, editNote, toggleComplete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <img src={man} alt="Empty" className="empty-image" />
        <p className="empty-text">Empty...</p>
      </div>
    );
  }

  return (
    <ul className="notes-list space-y-2">
      {notes.map((note, index) => (
        <li key={index} className="flex items-center  space-x-2">
          <Checkbox
            checked={note.completed}
            onChange={() => toggleComplete(index)}
            sx={{ color: 'blue' }}
          />
          <span className={`flex-grow ${note.completed ? 'line-through' : ''}`}>{note.text}</span>
          <EditIcon
            sx={{ color: 'gray', cursor: 'pointer' }}
            onClick={() => editNote(index)}
          />
          <DeleteIcon
            sx={{ color: 'gray', cursor: 'pointer' }}
            onClick={() => deleteNote(index)}
          />
        </li>
      ))}
    </ul>
  );
}

export default NotesList;