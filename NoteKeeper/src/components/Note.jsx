import React, { useState, useEffect, useRef } from "react";

function Note(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(props.position);
  const noteRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - noteRef.current.offsetWidth / 2,
          y: e.clientY - noteRef.current.offsetHeight / 2,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition({
      x: e.clientX - noteRef.current.offsetWidth / 2,
      y: e.clientY - noteRef.current.offsetHeight / 2,
    });
  };

  const handleDoubleClick = () => {
    props.onDelete(props.id);
  };

  return (
    <div
      className="note"
      ref={noteRef}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
