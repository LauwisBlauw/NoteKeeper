import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const navbarRef = useRef(null);
  const [nextPosition, setNextPosition] = useState({ x: 20, y: 300 }); // Default starting position

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        const navbarWidth = navbarRef.current.offsetWidth;
        // Calculate next possible note position
        const maxNotesPerRow = Math.floor(navbarWidth / 270);
        setNextPosition({
          x: 20 + (notes.length % maxNotesPerRow) * 270,
          y: 300 + Math.floor(notes.length / maxNotesPerRow) * 120,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize note positions

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [notes.length]);

  function addNote(newNote) {
    if (newNote.title.trim() && newNote.content.trim()) {
      // Ensure title and content are not empty
      setNotes((prevNotes) => [
        ...prevNotes,
        { ...newNote, position: { ...nextPosition } }, // Assign current nextPosition to new note
      ]);
      // Prepare next position for the upcoming new note
      const newLength = notes.length + 1;
      const navbarWidth = navbarRef.current.offsetWidth;
      const maxNotesPerRow = Math.floor(navbarWidth / 270);
      setNextPosition({
        x: 20 + (newLength % maxNotesPerRow) * 270,
        y: 300 + Math.floor(newLength / maxNotesPerRow) * 120,
      });
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note, index) => index !== id));
    // No change in position for remaining notes
  }

  return (
    <div>
      <Header ref={navbarRef} />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          position={note.position}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
