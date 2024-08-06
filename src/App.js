import React, { useState } from 'react';
import Header from './components/Header';
import NewTask from './components/NewTask';
import Task from './components/Task';
import './index.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';



function App() {
  const [notes, setNotes] = useState([
    { text: 'NOTE #1', completed: false },
    { text: 'NOTE #2', completed: true },
    { text: 'NOTE #3', completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentNote, setCurrentNote] = useState('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentNoteIndex(null);
    setCurrentNote('');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addNote = (note) => {
    if (currentNoteIndex === null) {
      setNotes([...notes, { text: note, completed: false }]);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = { ...updatedNotes[currentNoteIndex], text: note };
      setNotes(updatedNotes);
    }
    handleCloseModal();
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setCurrentNoteIndex(index);
    setCurrentNote(notes[index].text);
    handleOpenModal();
  };

  const toggleComplete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  // Filter notes based on the selected filter
  const filteredNotes = notes
    .filter(note => {
      if (filter === 'completed') return note.completed;
      if (filter === 'incomplete') return !note.completed;
      return true; // 'all' filter
    })
    .filter(note => note.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={darkMode ? 'dark min-h-screen' : 'min-h-screen'}>
      <div className={`container-center ${darkMode ? 'dark' : ''}`}>
        <div className={`flex-area ${darkMode ? 'dark' : ''}  w-full `}>
          <Header />
          <div className="flex items-center mb-4">
            <div className="search-container ">
              <input
                type="text"
                placeholder="Search note..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <SearchIcon sx={{color: darkMode ? 'white' : '#6C63FF', cursor: 'pointer' }}  />
            </div>
            <Button
    aria-controls="simple-menu"
    aria-haspopup="true"
    onClick={handleMenuClick}
    variant="contained"
    sx={{ marginLeft: 2,  backgroundColor: '#6C63FF', color: 'white', 
      position: 'relative',
      // minWidth: 120, // Adjust the min-width as needed
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
      }}
    endIcon={<KeyboardArrowDownIcon />}
  >
              {filter === 'completed' ? 'Completed' : filter === 'incomplete' ? 'Incomplete' : 'All'}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { setFilter('all'); handleMenuClose(); }}>All</MenuItem>
              <MenuItem onClick={() => { setFilter('completed'); handleMenuClose(); }}>Completed</MenuItem>
              <MenuItem onClick={() => { setFilter('incomplete'); handleMenuClose(); }}>Incomplete</MenuItem>
            </Menu>
            <Button
    aria-label="toggle dark mode"
    onClick={() => setDarkMode(!darkMode)}
    
      sx={{ marginLeft: 2,  backgroundColor: '#6C63FF', color:'white', width:"10px", position:'relative' }}
  
  >
    {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
  </Button>
          </div>
          
          <Task notes={filteredNotes} deleteNote={deleteNote} editNote={editNote} toggleComplete={toggleComplete} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'dark' : ''}`}>
            <NewTask
              addNote={addNote}
              closeModal={handleCloseModal}
              currentNote={currentNote}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-20">
      <button
  style={{
    width: '50px',
    height: '50px',
    backgroundColor: '#6C63FF', // Tailwind's blue-500 color
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px' // Adjust the font size if needed
  }}
  onClick={handleOpenModal}
>
  +
</button>

      </div>
    </div>
  );
}

export default App;