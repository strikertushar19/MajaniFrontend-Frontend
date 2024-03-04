import { useState } from "react";

export default function UpdateContent({ onSubmit }) {
  const [newContent, setNewContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newContent);
    setNewContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button type="submit">Update Content</button>
    </form>
  );
}
