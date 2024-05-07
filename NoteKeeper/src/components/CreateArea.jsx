import React, { useState } from "react";

function CreateArea(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd({ title, content });
    setTitle("");
    setContent("");
  }

  return (
    <div>
      <form onSubmit={submitNote}>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={content}
          onChange={handleChange}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default CreateArea;
